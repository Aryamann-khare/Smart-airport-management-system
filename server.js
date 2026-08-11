const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = __dirname;

const DB_CONFIG = {
    host: "db.fr-roub1.bengt.wasmernet.com",
    port: 20184,
    database: "smart",
    user: "user_4c375953",
    password: "pw_HIkhyS1CEhUotu79mNWNSFEeQonpjqQh",
    ssl: {
        rejectUnauthorized: false
    }
};

let pool = null;

try {
  pool = mysql.createPool(DB_CONFIG);
  console.log('✅ Initialized Wasmer MySQL Connection Pool -> db.fr-roub1.bengt.wasmernet.com:20184 (smart)');
  (async () => {
    try {
      if (pool) {
        // 1. Users Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(64) PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE,
            role VARCHAR(64),
            mobile VARCHAR(64),
            status VARCHAR(64),
            password VARCHAR(255),
            created_at DATETIME,
            last_login DATETIME
          )
        `);

        // 2. Flights Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS flights (
            id VARCHAR(64) PRIMARY KEY,
            flightNumber VARCHAR(64),
            airline VARCHAR(255),
            type VARCHAR(64),
            origin VARCHAR(128),
            destination VARCHAR(128),
            scheduledTime VARCHAR(64),
            estimatedTime VARCHAR(64),
            terminal VARCHAR(64),
            gate VARCHAR(64),
            status VARCHAR(64),
            pax INT,
            maxPax INT,
            bags INT,
            aircraft VARCHAR(128)
          )
        `);

        // 3. Gates Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS gates (
            id VARCHAR(64) PRIMARY KEY,
            terminal VARCHAR(64),
            status VARCHAR(64),
            flight VARCHAR(64),
            type VARCHAR(64),
            pax INT,
            compat VARCHAR(128)
          )
        `);

        // 4. Parking Lots Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS parking_lots (
            id VARCHAR(64) PRIMARY KEY,
            name VARCHAR(255),
            type VARCHAR(64),
            total4w INT,
            filled4w INT,
            reserved4w INT,
            status VARCHAR(64)
          )
        `);

        // 5. Parking Reservations Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS parking_reservations (
            id VARCHAR(64) PRIMARY KEY,
            vehicleNumber VARCHAR(64),
            vehicleType VARCHAR(64),
            parkingLot VARCHAR(128),
            slotNumber VARCHAR(64),
            durationHours INT,
            amountPaid DECIMAL(10,2),
            paymentStatus VARCHAR(64),
            passengerName VARCHAR(255),
            mobile VARCHAR(64)
          )
        `);

        // 6. Cab Bookings Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS cab_bookings (
            id VARCHAR(64) PRIMARY KEY,
            passengerName VARCHAR(255),
            mobile VARCHAR(64),
            pickupPoint VARCHAR(255),
            dropLocation VARCHAR(255),
            distanceKm DECIMAL(10,1),
            cabCategory VARCHAR(64),
            fare DECIMAL(10,2),
            status VARCHAR(64),
            timestamp VARCHAR(128)
          )
        `);

        // 7. Emergencies Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS emergencies (
            id VARCHAR(64) PRIMARY KEY,
            category VARCHAR(128),
            severity VARCHAR(64),
            title VARCHAR(255),
            location VARCHAR(255),
            responders VARCHAR(255),
            notes TEXT,
            status VARCHAR(64),
            timestamp VARCHAR(128)
          )
        `);

        // 8. Baggage Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS baggage (
            id VARCHAR(64) PRIMARY KEY,
            tagId VARCHAR(64),
            pnr VARCHAR(64),
            flight VARCHAR(64),
            passenger VARCHAR(255),
            origin VARCHAR(128),
            destination VARCHAR(128),
            weight VARCHAR(64),
            status VARCHAR(64)
          )
        `);

        // 9. Lost & Found Items Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS lost_found_items (
            id VARCHAR(64) PRIMARY KEY,
            title VARCHAR(255),
            category VARCHAR(128),
            type VARCHAR(64),
            location VARCHAR(255),
            date VARCHAR(64),
            description TEXT,
            status VARCHAR(64),
            reporter VARCHAR(255),
            contactInfo VARCHAR(255)
          )
        `);

        // 10. Wheelchair Requests Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS wheelchair_requests (
            id VARCHAR(64) PRIMARY KEY,
            passengerName VARCHAR(255),
            airlineName VARCHAR(128),
            pnrNumber VARCHAR(64),
            mobileNumber VARCHAR(64),
            timestamp VARCHAR(128),
            status VARCHAR(64)
          )
        `);

        // 11. Support Tickets Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS tickets (
            id VARCHAR(64) PRIMARY KEY,
            name VARCHAR(255),
            phone VARCHAR(64),
            email VARCHAR(255),
            location VARCHAR(255),
            category VARCHAR(128),
            urgency VARCHAR(64),
            description TEXT,
            status VARCHAR(64),
            adminReply TEXT,
            createdAt VARCHAR(128)
          )
        `);

        // 12. Fleet Health Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS fleet_vehicles (
            id VARCHAR(64) PRIMARY KEY,
            name VARCHAR(255),
            type VARCHAR(64),
            status VARCHAR(64),
            batteryPct INT,
            fuelPct INT,
            location VARCHAR(255),
            driver VARCHAR(255),
            healthScore INT
          )
        `);

        // 13. CCTV Cameras Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS cctv_cameras (
            id VARCHAR(64) PRIMARY KEY,
            name VARCHAR(255),
            location VARCHAR(255),
            zone VARCHAR(128),
            resolution VARCHAR(64),
            status VARCHAR(64),
            aiMode VARCHAR(128),
            alerts INT,
            peopleCount INT,
            streamUrl TEXT
          )
        `);

        // 14. Duty Roster Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS duty_rosters (
            id VARCHAR(64) PRIMARY KEY,
            userId VARCHAR(64),
            name VARCHAR(255),
            role VARCHAR(64),
            location VARCHAR(255),
            shift VARCHAR(64),
            status VARCHAR(64)
          )
        `);

        // 15. Audit Logs Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS audit_logs (
            id VARCHAR(64) PRIMARY KEY,
            timestamp VARCHAR(128),
            actor VARCHAR(255),
            action VARCHAR(128),
            details TEXT
          )
        `);

        // 16. System State Backup Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS system_state (
            id VARCHAR(64) PRIMARY KEY,
            payload LONGTEXT,
            updated_at DATETIME
          )
        `);

        // 17. Staff Shifts Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS staff_shifts (
            id VARCHAR(64) PRIMARY KEY,
            userId VARCHAR(64),
            name VARCHAR(255),
            role VARCHAR(64),
            shift VARCHAR(128),
            location VARCHAR(255),
            shiftDate VARCHAR(64),
            status VARCHAR(64)
          )
        `);

        // 18. Leave Applications Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS leave_applications (
            id VARCHAR(64) PRIMARY KEY,
            userId VARCHAR(64),
            applicantName VARCHAR(255),
            role VARCHAR(64),
            leaveType VARCHAR(128),
            fromDate VARCHAR(64),
            toDate VARCHAR(64),
            reason TEXT,
            status VARCHAR(64),
            appliedOn VARCHAR(64)
          )
        `);

        // 19. Attendance Logs Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS attendance_logs (
            id VARCHAR(64) PRIMARY KEY,
            userId VARCHAR(64),
            name VARCHAR(255),
            role VARCHAR(64),
            clockInDate VARCHAR(64),
            clockIn VARCHAR(64),
            clockOut VARCHAR(64),
            status VARCHAR(64)
          )
        `);

        console.log('✅ Created & Verified all 19 relational tables in Wasmer MySQL database smart!');
      }
    } catch (dbMigrateErr) {
      console.warn('Wasmer MySQL Relational Table Init Notice:', dbMigrateErr.message);
    }
  })();
} catch (e) {
  console.error('❌ Failed to create Wasmer MySQL Pool:', e.message);
}

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

// Helper: Read users from CSV disk file
function getDiskCsvUsers() {
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
  return users;
}

// Helper: Save users to CSV and JSON disk files
function saveDiskUsers(usersList) {
  const csvPath = path.join(PUBLIC_DIR, 'user_credentials.csv');
  const mongoPath = path.join(PUBLIC_DIR, 'mongodb_credentials.json');

  const headers = "id,name,email,role,mobile,status,created_at,last_login,password";
  const rows = usersList.map(u => {
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

  const mongoData = {
    _meta: {
      dbName: "aeropulse_db",
      collection: "credentials",
      engine: "MongoDB JSON Sync Engine v2.0",
      lastSynced: new Date().toISOString()
    },
    credentials: usersList.map(u => ({
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
}

// Sync helper for relational tables in Wasmer MySQL database `smart`
async function syncRelationalTables(payload) {
  if (!pool || !payload || typeof payload !== 'object') return;

  try {
    // 1. Sync Flights
    const flightsList = Array.isArray(payload.flights) ? payload.flights : [];
    if (flightsList.length > 0) {
      await pool.query('DELETE FROM flights');
      for (const f of flightsList) {
        await pool.query(
          `INSERT INTO flights (id, flightNumber, airline, type, origin, destination, scheduledTime, estimatedTime, terminal, gate, status, pax, maxPax, bags, aircraft)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [f.id, f.flightNumber || f.id, f.airline || '', f.type || 'Arrival', f.origin || '', f.destination || '', f.scheduledTime || '', f.estimatedTime || '', f.terminal || 'T3', f.gate || '', f.status || 'ON_TIME', f.pax || 0, f.maxPax || 180, f.bags || 0, f.aircraft || 'A320']
        );
      }
    }

    // 2. Sync Gates
    const gatesList = Array.isArray(payload.gates) ? payload.gates : [];
    if (gatesList.length > 0) {
      await pool.query('DELETE FROM gates');
      for (const g of gatesList) {
        await pool.query(
          `INSERT INTO gates (id, terminal, status, flight, type, pax, compat) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [g.id, g.terminal || 'T3', g.status || 'AVAILABLE', g.flight || '', g.type || 'International', g.pax || 0, g.compat || 'A320/A350/B787']
        );
      }
    }

    // 3. Sync Parking Lots
    const parkingLotsList = Array.isArray(payload.parkingData?.lots) ? payload.parkingData.lots : (Array.isArray(payload.parkingLots) ? payload.parkingLots : []);
    if (parkingLotsList.length > 0) {
      await pool.query('DELETE FROM parking_lots');
      for (const p of parkingLotsList) {
        await pool.query(
          `INSERT INTO parking_lots (id, name, type, total4w, filled4w, reserved4w, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [p.id, p.name || p.id, p.type || 'Multi-Level', p.total4w || 500, p.filled4w || 0, p.reserved4w || 0, p.status || 'OPEN']
        );
      }
    }

    // 4. Sync Cab Bookings
    const cabList = Array.isArray(payload.cabBookings) ? payload.cabBookings : [];
    if (cabList.length > 0) {
      await pool.query('DELETE FROM cab_bookings');
      for (const c of cabList) {
        await pool.query(
          `INSERT INTO cab_bookings (id, passengerName, mobile, pickupPoint, dropLocation, distanceKm, cabCategory, fare, status, timestamp)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [c.id, c.passengerName || '', c.mobile || '', c.pickupPoint || '', c.dropLocation || '', c.distanceKm || 10, c.cabCategory || 'Ola Mini', c.fare || 300, c.status || 'CONFIRMED', c.timestamp || new Date().toLocaleString()]
        );
      }
    }

    // 5. Sync Emergencies
    const emList = Array.isArray(payload.emergencies) ? payload.emergencies : (Array.isArray(payload.emergencyAlerts) ? payload.emergencyAlerts : []);
    if (emList.length > 0) {
      await pool.query('DELETE FROM emergencies');
      for (const e of emList) {
        await pool.query(
          `INSERT INTO emergencies (id, category, severity, title, location, responders, notes, status, timestamp)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [e.id, e.category || 'Medical', e.severity || 'HIGH', e.title || '', e.location || '', e.responders || '', e.notes || '', e.status || 'ACTIVE', e.timestamp || new Date().toLocaleString()]
        );
      }
    }

    // 6. Sync Baggage
    const bagList = Array.isArray(payload.baggage) ? payload.baggage : [];
    if (bagList.length > 0) {
      await pool.query('DELETE FROM baggage');
      for (const b of bagList) {
        await pool.query(
          `INSERT INTO baggage (id, tagId, pnr, flight, passenger, origin, destination, weight, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [b.id, b.tagId || b.id, b.pnr || '', b.flight || '', b.passenger || '', b.origin || '', b.destination || '', b.weight || '15kg', b.status || 'LOADED']
        );
      }
    }

    // 7. Sync Lost & Found Items
    const lfList = Array.isArray(payload.lostFoundItems) ? payload.lostFoundItems : (Array.isArray(payload.lostFound) ? payload.lostFound : []);
    if (lfList.length > 0) {
      await pool.query('DELETE FROM lost_found_items');
      for (const l of lfList) {
        await pool.query(
          `INSERT INTO lost_found_items (id, title, category, type, location, date, description, status, reporter, contactInfo)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [l.id, l.title || '', l.category || '', l.type || 'FOUND', l.location || '', l.date || '', l.description || '', l.status || 'OPEN', l.reporter || '', l.contactInfo || '']
        );
      }
    }

    // 8. Sync Wheelchair Requests
    const wcList = Array.isArray(payload.wheelchairRequests) ? payload.wheelchairRequests : [];
    if (wcList.length > 0) {
      await pool.query('DELETE FROM wheelchair_requests');
      for (const w of wcList) {
        await pool.query(
          `INSERT INTO wheelchair_requests (id, passengerName, airlineName, pnrNumber, mobileNumber, timestamp, status)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [w.id, w.passengerName || '', w.airlineName || '', w.pnrNumber || '', w.mobileNumber || '', w.timestamp || new Date().toLocaleString(), w.status || 'PENDING']
        );
      }
    }

    // 9. Sync Support Tickets
    const ticketList = Array.isArray(payload.tickets) ? payload.tickets : [];
    if (ticketList.length > 0) {
      await pool.query('DELETE FROM tickets');
      for (const t of ticketList) {
        await pool.query(
          `INSERT INTO tickets (id, name, phone, email, location, category, urgency, description, status, adminReply, createdAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [t.id, t.name || '', t.phone || '', t.email || '', t.location || '', t.category || '', t.urgency || 'Normal', t.description || '', t.status || 'OPEN', t.adminReply || '', t.createdAt || new Date().toLocaleString()]
        );
      }
    }

    // 10. Sync Fleet Vehicles
    const fleetList = Array.isArray(payload.fleetVehicles) ? payload.fleetVehicles : (Array.isArray(payload.fleetHealth) ? payload.fleetHealth : []);
    if (fleetList.length > 0) {
      await pool.query('DELETE FROM fleet_vehicles');
      for (const v of fleetList) {
        await pool.query(
          `INSERT INTO fleet_vehicles (id, name, type, status, batteryPct, fuelPct, location, driver, healthScore)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [v.id, v.name || v.id, v.type || 'Electric Bus', v.status || 'IN_SERVICE', v.batteryPct || 90, v.fuelPct || 100, v.location || 'T3', v.driver || '', v.healthScore || 95]
        );
      }
    }

    // 11. Sync CCTV Cameras
    const cctvList = Array.isArray(payload.cctv) ? payload.cctv : (Array.isArray(payload.cctvCameras) ? payload.cctvCameras : []);
    if (cctvList.length > 0) {
      await pool.query('DELETE FROM cctv_cameras');
      for (const c of cctvList) {
        await pool.query(
          `INSERT INTO cctv_cameras (id, name, location, zone, resolution, status, aiMode, alerts, peopleCount, streamUrl)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [c.id, c.name || c.id, c.location || '', c.zone || 'T3', c.resolution || '4K Ultra', c.status || 'ONLINE', c.aiMode || 'Object Detection', c.alerts || 0, c.peopleCount || 10, c.streamUrl || '']
        );
      }
    }

    // 12. Sync Duty Roster
    const rosterList = Array.isArray(payload.dutyRosters) ? payload.dutyRosters : (Array.isArray(payload.dutyRoster) ? payload.dutyRoster : []);
    if (rosterList.length > 0) {
      await pool.query('DELETE FROM duty_rosters');
      for (const r of rosterList) {
        await pool.query(
          `INSERT INTO duty_rosters (id, userId, name, role, location, shift, status)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [r.id || 'ROS-1', r.userId || '', r.name || '', r.role || 'Staff', r.location || 'Terminal 3', r.shift || 'Morning', r.status || 'ON_DUTY']
        );
      }
    }

    // 13. Sync Audit Logs
    const logList = Array.isArray(payload.auditLogs) ? payload.auditLogs : [];
    if (logList.length > 0) {
      await pool.query('DELETE FROM audit_logs');
      for (const a of logList.slice(0, 100)) {
        await pool.query(
          `INSERT INTO audit_logs (id, timestamp, actor, action, details) VALUES (?, ?, ?, ?, ?)`,
          [a.id || ('LOG-' + Math.random()), a.timestamp || new Date().toLocaleString(), a.actor || 'System', a.action || 'UPDATE', a.details || '']
        );
      }
    }

    // 14. Sync Parking Reservations (dedicated table — was missing before)
    const parkResv = Array.isArray(payload.parkingData?.reservations) ? payload.parkingData.reservations : [];
    if (parkResv.length > 0) {
      await pool.query('DELETE FROM parking_reservations');
      for (const r of parkResv) {
        await pool.query(
          `INSERT INTO parking_reservations (id, vehicleNumber, vehicleType, parkingLot, slotNumber, durationHours, amountPaid, paymentStatus, passengerName, mobile)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [r.id || ('RES-' + Date.now()), r.vehicleNumber || '', r.vehicleType || '4 Wheeler', r.parkingLot || '', r.slotNumber || '', parseInt(r.durationHours) || 4, parseFloat(r.amountPaid) || 0, r.paymentStatus || 'SUCCESS', r.passengerName || '', r.mobile || '']
        );
      }
    }

    // 15. Sync Staff Shifts
    const shiftList = Array.isArray(payload.staffShifts) ? payload.staffShifts : [];
    if (shiftList.length > 0) {
      await pool.query('DELETE FROM staff_shifts');
      for (const s of shiftList) {
        await pool.query(
          `INSERT INTO staff_shifts (id, userId, name, role, shift, location, shiftDate, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [s.id || ('SHF-' + Date.now()), s.userId || '', s.name || '', s.role || 'Staff', s.shift || '', s.location || '', s.shiftDate || '', s.status || 'SCHEDULED']
        );
      }
    }

    // 16. Sync Leave Applications
    const leaveList = Array.isArray(payload.leaveApplications) ? payload.leaveApplications : [];
    if (leaveList.length > 0) {
      await pool.query('DELETE FROM leave_applications');
      for (const l of leaveList) {
        await pool.query(
          `INSERT INTO leave_applications (id, userId, applicantName, role, leaveType, fromDate, toDate, reason, status, appliedOn)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [l.id || ('LV-' + Date.now()), l.userId || '', l.applicantName || '', l.role || 'Staff', l.leaveType || 'Casual Leave', l.fromDate || '', l.toDate || '', l.reason || '', l.status || 'PENDING_ADMIN_REVIEW', l.appliedOn || '']
        );
      }
    }

    // 17. Sync Attendance Logs
    const attList = Array.isArray(payload.attendanceLogs) ? payload.attendanceLogs : [];
    if (attList.length > 0) {
      await pool.query('DELETE FROM attendance_logs');
      for (const a of attList.slice(0, 200)) {
        await pool.query(
          `INSERT INTO attendance_logs (id, userId, name, role, clockInDate, clockIn, clockOut, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [a.id || ('ATT-' + Date.now()), a.userId || '', a.name || '', a.role || 'Staff', a.date || '', a.clockIn || '', a.clockOut || '', a.status || 'PRESENT']
        );
      }
    }

    // 18. Sync CCTV Cameras (also synced in block 11 via main syncRelationalTables — kept here for completeness)
    // (handled already by block 11 above)

    // 19. Sync Emergencies + Cab Bookings already handled in blocks 5 and 4 above.

  } catch (err) {
    console.warn('Relational sync notice:', err.message);
  }
}

const server = http.createServer(async (req, res) => {
  // CORS Headers for cross-device web app connectivity
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
  // ROUTE: GET /api/credentials/csv & /user_credentials.csv
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
  // ROUTE: GET /api/credentials/mongo & /mongodb_credentials.json
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
  // ROUTE: GET /api/db & /api/users (Fetch live state from Wasmer MySQL with Disk Fallback)
  // ----------------------------------------------------
  if ((pathname === '/api/db' || pathname === '/api/users') && req.method === 'GET') {
    try {
      let users = [];
      let fullState = null;

      // Direct per-table reads for ALL synced modules
      let fleetHealthRows = [];
      let wheelchairRows = [];
      let ticketRows = [];
      let parkingResRows = [];
      let cctvRows = [];
      let emergencyRows = [];
      let cabRows = [];
      let dutyRosterRows = [];
      let staffShiftRows = [];
      let leaveAppRows = [];
      let attendanceRows = [];

      if (pool) {
        try {
          const [uRows] = await pool.query('SELECT id, name, email, role, mobile, status, password, created_at, last_login FROM users ORDER BY created_at DESC');
          if (Array.isArray(uRows) && uRows.length > 0) users = uRows;
          const [sRows] = await pool.query("SELECT payload FROM system_state WHERE id = 'main_state' LIMIT 1");
          if (Array.isArray(sRows) && sRows.length > 0 && sRows[0].payload) fullState = JSON.parse(sRows[0].payload);
        } catch (dbQueryErr) { console.warn('Wasmer MySQL query warning:', dbQueryErr.message); }

        // ── Fleet Health ──────────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM fleet_vehicles ORDER BY id ASC'); if (Array.isArray(r) && r.length > 0) fleetHealthRows = r; } catch(e) { console.warn('fleet_vehicles:', e.message); }

        // ── Wheelchair Requests ───────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM wheelchair_requests ORDER BY timestamp DESC'); if (Array.isArray(r) && r.length > 0) wheelchairRows = r; } catch(e) { console.warn('wheelchair_requests:', e.message); }

        // ── Support Tickets ───────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM tickets ORDER BY createdAt DESC'); if (Array.isArray(r) && r.length > 0) ticketRows = r; } catch(e) { console.warn('tickets:', e.message); }

        // ── Parking Reservations ──────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM parking_reservations ORDER BY id DESC'); if (Array.isArray(r) && r.length > 0) parkingResRows = r; } catch(e) { console.warn('parking_reservations:', e.message); }

        // ── CCTV Cameras ──────────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM cctv_cameras ORDER BY id ASC'); if (Array.isArray(r) && r.length > 0) cctvRows = r; } catch(e) { console.warn('cctv_cameras:', e.message); }

        // ── Emergencies ───────────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM emergencies ORDER BY timestamp DESC'); if (Array.isArray(r) && r.length > 0) emergencyRows = r; } catch(e) { console.warn('emergencies:', e.message); }

        // ── Cab Bookings ──────────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM cab_bookings ORDER BY timestamp DESC'); if (Array.isArray(r) && r.length > 0) cabRows = r; } catch(e) { console.warn('cab_bookings:', e.message); }

        // ── Duty Rosters ──────────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM duty_rosters ORDER BY id ASC'); if (Array.isArray(r) && r.length > 0) dutyRosterRows = r; } catch(e) { console.warn('duty_rosters:', e.message); }

        // ── Staff Shifts ──────────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM staff_shifts ORDER BY id ASC'); if (Array.isArray(r) && r.length > 0) staffShiftRows = r; } catch(e) { console.warn('staff_shifts:', e.message); }

        // ── Leave Applications ────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM leave_applications ORDER BY appliedOn DESC'); if (Array.isArray(r) && r.length > 0) leaveAppRows = r; } catch(e) { console.warn('leave_applications:', e.message); }

        // ── Attendance Logs ───────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM attendance_logs ORDER BY id DESC LIMIT 500'); if (Array.isArray(r) && r.length > 0) attendanceRows = r; } catch(e) { console.warn('attendance_logs:', e.message); }
      }

      if (users.length === 0) users = getDiskCsvUsers();

      // Build merged response: individual table reads always take priority over system_state blob
      const baseState = fullState || {};
      const mergedParkingData = {
        ...(baseState.parkingData || {}),
        reservations: parkingResRows.length > 0 ? parkingResRows : (baseState.parkingData?.reservations || [])
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        success: true,
        source: 'Wasmer MySQL Database — All Relational Tables',
        users,
        fullState,
        ...baseState,
        // All modules served fresh from dedicated tables (fallback to blob if table is empty):
        fleetHealth:          fleetHealthRows.length > 0  ? fleetHealthRows  : (baseState.fleetHealth || []),
        fleetVehicles:        fleetHealthRows.length > 0  ? fleetHealthRows  : (baseState.fleetVehicles || []),
        wheelchairRequests:   wheelchairRows.length > 0   ? wheelchairRows   : (baseState.wheelchairRequests || []),
        tickets:              ticketRows.length > 0        ? ticketRows       : (baseState.tickets || []),
        parkingData:          mergedParkingData,
        cctv:                 cctvRows.length > 0          ? cctvRows         : (baseState.cctv || []),
        cctvCameras:          cctvRows.length > 0          ? cctvRows         : (baseState.cctvCameras || []),
        emergencies:          emergencyRows.length > 0     ? emergencyRows    : (baseState.emergencies || []),
        cabBookings:          cabRows.length > 0           ? cabRows          : (baseState.cabBookings || []),
        dutyRosters:          dutyRosterRows.length > 0   ? dutyRosterRows   : (baseState.dutyRosters || []),
        staffShifts:          staffShiftRows.length > 0   ? staffShiftRows   : (baseState.staffShifts || []),
        leaveApplications:    leaveAppRows.length > 0     ? leaveAppRows     : (baseState.leaveApplications || []),
        attendanceLogs:       attendanceRows.length > 0   ? attendanceRows   : (baseState.attendanceLogs || [])
      }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // ----------------------------------------------------
  // ROUTE: POST /api/sync (Sync all modules & state to Wasmer MySQL & Disk)
  // ----------------------------------------------------
  if (pathname === '/api/sync' && req.method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      const payload = body.payload || body;
      console.log("☁️ /api/sync invoked with keys:", payload ? Object.keys(payload) : "none");

      if (payload && Array.isArray(payload.users)) {
        // Save to disk CSV & JSON
        saveDiskUsers(payload.users);

        if (pool) {
          // 1. Upsert incoming users
          const validIds = [];
          const validEmails = [];
          for (const u of payload.users) {
            try {
              if (u.id) validIds.push(u.id);
              if (u.email) validEmails.push(u.email);
              await pool.query(
                `INSERT INTO users (id, name, email, role, mobile, status, password, created_at, last_login)
                 VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
                 ON DUPLICATE KEY UPDATE
                 name=VALUES(name), email=VALUES(email), role=VALUES(role), mobile=VALUES(mobile),
                 status=VALUES(status), password=VALUES(password), last_login=NOW()`,
                [u.id || 'USR-001', u.name, u.email, u.role || 'user', u.mobile || '', u.status || 'ACTIVE', u.password || 'user123']
              );
            } catch (userErr) {}
          }

          // 2. HARD DELETE any user in MySQL table whose ID or Email is no longer present in payload.users (except admin@delhi.aai)
          if (validIds.length > 0) {
            try {
              const placeholders = validIds.map(() => '?').join(',');
              await pool.query(
                `DELETE FROM users WHERE id NOT IN (${placeholders}) AND email != 'admin@delhi.aai'`,
                validIds
              );
            } catch (delSyncErr) {}
          }
        }
      }

      if (pool && payload && typeof payload === 'object') {
        try {
          // Save relational tables into Wasmer MySQL
          await syncRelationalTables(payload);

          // Save main state JSON payload as secondary backup
          const payloadStr = JSON.stringify(payload);
          await pool.query(
            "INSERT INTO system_state (id, payload, updated_at) VALUES ('main_state', ?, NOW()) ON DUPLICATE KEY UPDATE payload=VALUES(payload), updated_at=NOW()",
            [payloadStr]
          );
        } catch (sysErr) {
          console.warn("Wasmer system_state save warning:", sysErr.message);
        }
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, message: "Wasmer DB state synced successfully", syncedAt: new Date().toISOString() }));
    } catch (err) {
      console.error("Wasmer DB /api/sync error:", err.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // ----------------------------------------------------
  // ROUTE: DELETE /api/users/:id & POST /api/users/delete (Permanent Deletion from Wasmer & Disk)
  // ----------------------------------------------------
  if ((pathname.startsWith('/api/users/') || pathname === '/api/users/delete') && (req.method === 'DELETE' || req.method === 'POST')) {
    try {
      const body = req.method === 'POST' ? await parseRequestBody(req) : {};
      const urlParts = pathname.split('/');
      const targetId = (pathname.startsWith('/api/users/') && urlParts[3] && urlParts[3] !== 'delete') ? urlParts[3] : (body.id || body.userId);
      const targetEmail = body.email;

      console.log(`🗑️ Deleting user permanent request: ID=${targetId}, Email=${targetEmail}`);

      // 1. Delete from Disk Files (user_credentials.csv & mongodb_credentials.json)
      let currentUsers = getDiskCsvUsers();
      currentUsers = currentUsers.filter(u => {
        if (targetId && String(u.id) === String(targetId)) return false;
        if (targetEmail && u.email.toLowerCase() === targetEmail.toLowerCase()) return false;
        return true;
      });
      saveDiskUsers(currentUsers);

      // 2. Delete from Wasmer MySQL Database
      if (pool) {
        if (targetId) {
          await pool.query('DELETE FROM users WHERE id = ?', [targetId]);
        }
        if (targetEmail) {
          await pool.query('DELETE FROM users WHERE email = ?', [targetEmail]);
        }

        // Also purge user from system_state payload if present
        try {
          const [sRows] = await pool.query("SELECT payload FROM system_state WHERE id = 'main_state' LIMIT 1");
          if (Array.isArray(sRows) && sRows.length > 0 && sRows[0].payload) {
            let stateObj = JSON.parse(sRows[0].payload);
            if (Array.isArray(stateObj.users)) {
              stateObj.users = stateObj.users.filter(u => String(u.id) !== String(targetId) && u.email !== targetEmail);
              await pool.query(
                "UPDATE system_state SET payload = ?, updated_at = NOW() WHERE id = 'main_state'",
                [JSON.stringify(stateObj)]
              );
            }
          }
        } catch (purgeErr) {}
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, message: `User ${targetId || targetEmail} permanently deleted from Wasmer MySQL and disk stores.` }));
    } catch (err) {
      console.error("Delete user error:", err.message);
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
  console.log(`\n🚀 AAI AeroPulse OS Node Server running on http://localhost:${PORT}`);
  console.log(`🔗 Wasmer MySQL Connected: db.fr-roub1.bengt.wasmernet.com:20184 (smart)\n`);
});
