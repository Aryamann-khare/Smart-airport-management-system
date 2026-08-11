const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = __dirname;

// Helper to parse JSON request body
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', err => reject(err));
  });
}

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.csv': 'text/csv; charset=UTF-8'
};

const server = http.createServer(async (req, res) => {
  // CORS Headers for local development & cross-origin access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // ----------------------------------------------------
  // LOCAL DISK ROUTE 1: GET /api/credentials/csv & /user_credentials.csv
  // ----------------------------------------------------
  if ((pathname === '/api/credentials/csv' || pathname === '/user_credentials.csv') && req.method === 'GET') {
    try {
      const csvPath = path.join(PUBLIC_DIR, 'user_credentials.csv');
      let csvData = "id,name,email,role,mobile,status,created_at,last_login,password\nUSR-001,\"AAI Master Admin\",admin@delhi.aai,admin,+91 9876543210,ACTIVE,2026-01-01,2026-08-10T01:24:00Z,admin";
      if (fs.existsSync(csvPath)) {
        csvData = fs.readFileSync(csvPath, 'utf8');
      }
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=UTF-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      return res.end(csvData);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // ----------------------------------------------------
  // LOCAL DISK ROUTE 2: GET /api/credentials/mongo & /mongodb_credentials.json
  // ----------------------------------------------------
  if ((pathname === '/api/credentials/mongo' || pathname === '/mongodb_credentials.json') && req.method === 'GET') {
    try {
      const mongoPath = path.join(PUBLIC_DIR, 'mongodb_credentials.json');
      let mongoData = { _meta: { dbName: "aeropulse_db", collection: "credentials" }, credentials: [] };
      if (fs.existsSync(mongoPath)) {
        mongoData = JSON.parse(fs.readFileSync(mongoPath, 'utf8'));
      }
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify(mongoData, null, 2));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // ----------------------------------------------------
  // LOCAL DISK ROUTE 3: POST /api/credentials/csv (Sync users to CSV & JSON)
  // ----------------------------------------------------
  if ((pathname === '/api/credentials/csv' || pathname === '/api/users' || pathname === '/api/sync') && req.method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const csvPath = path.join(PUBLIC_DIR, 'user_credentials.csv');
      const mongoPath = path.join(PUBLIC_DIR, 'mongodb_credentials.json');
      
      let usersToSave = [];
      if (body.payload && Array.isArray(body.payload.users)) {
        usersToSave = body.payload.users;
      } else if (Array.isArray(body.users)) {
        usersToSave = body.users;
      } else if (body.email && body.name) {
        let existingUsers = [];
        if (fs.existsSync(csvPath)) {
          const rawCsv = fs.readFileSync(csvPath, 'utf8');
          const lines = rawCsv.split('\n').filter(l => l.trim());
          if (lines.length > 1) {
            for (let i = 1; i < lines.length; i++) {
              const parts = lines[i].split(',');
              if (parts.length >= 3) {
                existingUsers.push({
                  id: parts[0].trim(),
                  name: parts[1] ? parts[1].replace(/"/g, '').trim() : '',
                  email: parts[2].trim(),
                  role: parts[3] ? parts[3].trim() : 'user',
                  mobile: parts[4] ? parts[4].trim() : '',
                  status: parts[5] ? parts[5].trim() : 'ACTIVE',
                  created_at: parts[6] ? parts[6].trim() : '',
                  last_login: parts[7] ? parts[7].trim() : '',
                  password: parts[8] ? parts[8].trim() : 'user123'
                });
              }
            }
          }
        }

        const targetId = body.id || ('USR-' + Math.floor(1000 + Math.random() * 9000));
        let found = false;
        existingUsers = existingUsers.map(u => {
          if (u.email.toLowerCase() === String(body.email).toLowerCase() || (body.id && u.id === body.id)) {
            found = true;
            return Object.assign({}, u, body, { id: u.id || targetId });
          }
          return u;
        });

        if (!found) {
          existingUsers.push(Object.assign({
            id: targetId,
            role: 'user',
            status: 'ACTIVE',
            created_at: new Date().toISOString().split('T')[0],
            last_login: new Date().toISOString(),
            password: body.password || 'user123'
          }, body));
        }

        usersToSave = existingUsers;
      }

      if (usersToSave.length > 0) {
        // Save to user_credentials.csv
        const headers = "id,name,email,role,mobile,status,created_at,last_login,password";
        const rows = usersToSave.map(u => {
          const id = String(u.id || '').replace(/"/g, '""');
          const name = '"' + String(u.name || '').replace(/"/g, '""') + '"';
          const email = String(u.email || '').replace(/"/g, '""');
          const role = String(u.role || 'user').replace(/"/g, '""');
          const mobile = String(u.mobile || '').replace(/"/g, '""');
          const status = String(u.status || (u.blocked ? 'BLOCKED' : 'ACTIVE')).replace(/"/g, '""');
          const createdAt = String(u.created_at || new Date().toISOString().split('T')[0]).replace(/"/g, '""');
          const lastLogin = String(u.last_login || new Date().toISOString()).replace(/"/g, '""');
          const password = String(u.password || 'user123').replace(/"/g, '""');
          return [id, name, email, role, mobile, status, createdAt, lastLogin, password].join(',');
        });

        const finalCsvContent = [headers].concat(rows).join('\n');
        fs.writeFileSync(csvPath, finalCsvContent, 'utf8');
        console.log(`💾 Saved ${usersToSave.length} User Records to user_credentials.csv on Local Disk!`);

        // Save to mongodb_credentials.json
        const mongoData = {
          _meta: {
            dbName: "aeropulse_db",
            collection: "credentials",
            engine: "Local MongoDB JSON Sync Engine v2.0",
            lastSynced: new Date().toISOString()
          },
          credentials: usersToSave.map(u => ({
            userId: u.id,
            name: u.name,
            email: u.email,
            password: u.password || 'user123',
            role: u.role || 'user',
            mobile: u.mobile || '',
            status: u.status || 'ACTIVE',
            updatedAt: new Date().toISOString()
          }))
        };
        fs.writeFileSync(mongoPath, JSON.stringify(mongoData, null, 2), 'utf8');
        console.log(`💾 Synced MongoDB JSON Credentials to mongodb_credentials.json on Local Disk!`);
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, count: usersToSave.length, source: 'Local Disk Data Store (CSV & JSON)' }));
    } catch (err) {
      console.error('Error writing local credentials:', err.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // ----------------------------------------------------
  // LOCAL DISK ROUTE 4: GET /api/users & /api/db
  // ----------------------------------------------------
  if ((pathname === '/api/users' || pathname === '/api/db') && req.method === 'GET') {
    try {
      const csvPath = path.join(PUBLIC_DIR, 'user_credentials.csv');
      let users = [];
      if (fs.existsSync(csvPath)) {
        const rawCsv = fs.readFileSync(csvPath, 'utf8');
        const lines = rawCsv.split('\n').filter(l => l.trim());
        if (lines.length > 1) {
          for (let i = 1; i < lines.length; i++) {
            const parts = lines[i].split(',');
            if (parts.length >= 3) {
              users.push({
                id: parts[0].trim(),
                name: parts[1] ? parts[1].replace(/"/g, '').trim() : '',
                email: parts[2].trim(),
                role: parts[3] ? parts[3].trim() : 'user',
                mobile: parts[4] ? parts[4].trim() : '',
                status: parts[5] ? parts[5].trim() : 'ACTIVE',
                created_at: parts[6] ? parts[6].trim() : '',
                last_login: parts[7] ? parts[7].trim() : '',
                password: parts[8] ? parts[8].trim() : 'user123'
              });
            }
          }
        }
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, users, source: 'Local Disk CSV & JSON Engine' }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // ----------------------------------------------------
  // STATIC FILE SERVING
  // ----------------------------------------------------
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end('<h1>404 Not Found</h1>', 'utf-8');
      }
      res.writeHead(500);
      return res.end(`Server Error: ${err.code}`);
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Local Airport Operations Node Server running on http://localhost:${PORT}`);
  console.log(`📁 Local Data Storage Engine Active: user_credentials.csv & mongodb_credentials.json\n`);
});
