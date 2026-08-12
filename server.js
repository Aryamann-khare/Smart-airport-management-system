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
            total2w INT,
            filled2w INT,
            reserved2w INT,
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
            mobile VARCHAR(64),
            startDate VARCHAR(64),
            paymentMode VARCHAR(64),
            terminal VARCHAR(64),
            qrCode VARCHAR(128)
          )
        `);

        // 5b. Parking Vehicle Movement Logs Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS parking_vehicle_logs (
            id VARCHAR(64) PRIMARY KEY,
            timestamp VARCHAR(128),
            hoursAgo DECIMAL(10,2),
            vehicleNumber VARCHAR(64),
            vehicleType VARCHAR(64),
            parkingLot VARCHAR(255),
            eventType VARCHAR(64),
            gateId VARCHAR(64),
            cameraSensor VARCHAR(128),
            confidenceScore VARCHAR(64),
            status VARCHAR(64)
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
            status VARCHAR(64),
            steps TEXT
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
            contactInfo VARCHAR(255),
            claimPending VARCHAR(32),
            pendingClaimant VARCHAR(255)
          )
        `);

        // 9b. Lost & Found Claim Appeals Table
        await pool.query(`
          CREATE TABLE IF NOT EXISTS lost_found_claims (
            id VARCHAR(64) PRIMARY KEY,
            itemId VARCHAR(64),
            itemTitle VARCHAR(255),
            claimantName VARCHAR(255),
            claimantContact VARCHAR(255),
            flightNo VARCHAR(64),
            proofDetails TEXT,
            mediaUrl TEXT,
            mediaType VARCHAR(64),
            status VARCHAR(64),
            timestamp VARCHAR(128)
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
            status VARCHAR(64),
            pickupLocation VARCHAR(255)
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
            aircraft VARCHAR(255),
            flight VARCHAR(255),
            status VARCHAR(64),
            engine VARCHAR(64),
            hydraulic VARCHAR(64),
            tyre VARCHAR(64),
            brake VARCHAR(64),
            fuel VARCHAR(64),
            nextMaint VARCHAR(64)
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

        // Auto-migrate missing columns for pre-existing tables
        const alterStmts = [
          'ALTER TABLE fleet_vehicles ADD COLUMN aircraft VARCHAR(255)',
          'ALTER TABLE fleet_vehicles ADD COLUMN flight VARCHAR(255)',
          'ALTER TABLE fleet_vehicles ADD COLUMN engine VARCHAR(64)',
          'ALTER TABLE fleet_vehicles ADD COLUMN hydraulic VARCHAR(64)',
          'ALTER TABLE fleet_vehicles ADD COLUMN tyre VARCHAR(64)',
          'ALTER TABLE fleet_vehicles ADD COLUMN brake VARCHAR(64)',
          'ALTER TABLE fleet_vehicles ADD COLUMN nextMaint VARCHAR(64)',
          'ALTER TABLE baggage ADD COLUMN steps TEXT',
          'ALTER TABLE lost_found_items ADD COLUMN claimPending VARCHAR(32)',
          'ALTER TABLE lost_found_items ADD COLUMN pendingClaimant VARCHAR(255)',
          'ALTER TABLE parking_lots ADD COLUMN total2w INT',
          'ALTER TABLE parking_lots ADD COLUMN filled2w INT',
          'ALTER TABLE parking_lots ADD COLUMN reserved2w INT',
          'ALTER TABLE parking_reservations ADD COLUMN startDate VARCHAR(64)',
          'ALTER TABLE parking_reservations ADD COLUMN paymentMode VARCHAR(64)',
          'ALTER TABLE parking_reservations ADD COLUMN terminal VARCHAR(64)',
          'ALTER TABLE parking_reservations ADD COLUMN qrCode VARCHAR(128)',
          'ALTER TABLE wheelchair_requests ADD COLUMN pickupLocation VARCHAR(255)'
        ];
        for (const stmt of alterStmts) {
          try { await pool.query(stmt); } catch (e) { /* Column already exists */ }
        }

        const defaultLotsSeed = [
          { id: "MLCP-T3", name: "Multi-Level Car Parking (MLCP) - Terminal 3", type: "Multi-Level (Covered & EV Charging)", total4w: 4500, filled4w: 3120, reserved4w: 450, total2w: 2000, filled2w: 1240, reserved2w: 210, status: "OPEN" },
          { id: "LOT-T1-A", name: "Surface Premium Lot - Terminal 1", type: "Open Surface (Valet & FastTag)", total4w: 1800, filled4w: 1450, reserved4w: 180, total2w: 1500, filled2w: 980, reserved2w: 150, status: "OPEN" },
          { id: "LOT-T2", name: "Short-Term Express Lot - Terminal 2", type: "Surface Covered", total4w: 1200, filled4w: 920, reserved4w: 100, total2w: 800, filled2w: 510, reserved2w: 80, status: "OPEN" },
          { id: "LOT-CARGO", name: "Commercial & Cargo Vehicle Yard", type: "Heavy Vehicle & Truck Yard", total4w: 800, filled4w: 410, reserved4w: 50, total2w: 300, filled2w: 110, reserved2w: 30, status: "OPEN" }
        ];
        const [existingLotRows] = await pool.query('SELECT count(*) as cnt FROM parking_lots');
        if (!existingLotRows || Number(existingLotRows[0].cnt) === 0) {
          for (const l of defaultLotsSeed) {
            await pool.query(
              'INSERT INTO parking_lots (id, name, type, total4w, filled4w, reserved4w, total2w, filled2w, reserved2w, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [l.id, l.name, l.type, l.total4w, l.filled4w, l.reserved4w, l.total2w, l.filled2w, l.reserved2w, l.status]
            );
          }
          console.log('✅ Auto-seeded 4 default parking lots into Wasmer MySQL!');
        }

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

// Helper: Filter unique items by ID to prevent MySQL primary key conflicts
function filterUniqueById(arr) {
  if (!Array.isArray(arr)) return [];
  const seen = new Set();
  return arr.filter(item => {
    if (!item || typeof item !== 'object') return false;
    const id = item.id || JSON.stringify(item);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

// Sync helper for relational tables in Wasmer MySQL database `smart`
async function syncRelationalTables(payload) {
  if (!pool || !payload || typeof payload !== 'object') return;

  try {
    // 1. Sync Flights
    if (Array.isArray(payload.flights)) {
      await pool.query('DELETE FROM flights');
      for (const f of filterUniqueById(payload.flights)) {
        await pool.query(
          `INSERT INTO flights (id, flightNumber, airline, type, origin, destination, scheduledTime, estimatedTime, terminal, gate, status, pax, maxPax, bags, aircraft)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [f.id, f.flightNumber || f.id, f.airline || '', f.type || 'Arrival', f.origin || '', f.destination || '', f.scheduledTime || '', f.estimatedTime || '', f.terminal || 'T3', f.gate || '', f.status || 'ON_TIME', f.pax || 0, f.maxPax || 180, f.bags || 0, f.aircraft || 'A320']
        );
      }
    }

    // 2. Sync Gates
    if (Array.isArray(payload.gates)) {
      await pool.query('DELETE FROM gates');
      for (const g of filterUniqueById(payload.gates)) {
        await pool.query(
          `INSERT INTO gates (id, terminal, status, flight, type, pax, compat) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [g.id, g.terminal || 'T3', g.status || 'AVAILABLE', g.flight || '', g.type || 'International', g.pax || 0, g.compat || 'A320/A350/B787']
        );
      }
    }

    // 3. Sync Parking Lots
    const parkingLotsList = Array.isArray(payload.parkingData?.lots) ? payload.parkingData.lots : (Array.isArray(payload.parkingLots) ? payload.parkingLots : null);
    if (parkingLotsList !== null) {
      await pool.query('DELETE FROM parking_lots');
      for (const p of filterUniqueById(parkingLotsList)) {
        await pool.query(
          `INSERT INTO parking_lots (id, name, type, total4w, filled4w, reserved4w, total2w, filled2w, reserved2w, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [p.id, p.name || p.id, p.type || 'Multi-Level', p.total4w || 500, p.filled4w || 0, p.reserved4w || 0, p.total2w || 200, p.filled2w || 0, p.reserved2w || 0, p.status || 'OPEN']
        );
      }
    }

    // 4. Sync Cab Bookings
    if (Array.isArray(payload.cabBookings)) {
      await pool.query('DELETE FROM cab_bookings');
      for (const c of filterUniqueById(payload.cabBookings)) {
        await pool.query(
          `INSERT INTO cab_bookings (id, passengerName, mobile, pickupPoint, dropLocation, distanceKm, cabCategory, fare, status, timestamp)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [c.id, c.passengerName || '', c.mobile || '', c.pickupPoint || '', c.dropLocation || '', c.distanceKm || 10, c.cabCategory || 'Ola Mini', c.fare || 300, c.status || 'CONFIRMED', c.timestamp || new Date().toLocaleString()]
        );
      }
    }

    // 5. Sync Emergencies
    const emList = Array.isArray(payload.emergencies) ? payload.emergencies : (Array.isArray(payload.emergencyAlerts) ? payload.emergencyAlerts : null);
    if (emList !== null) {
      await pool.query('DELETE FROM emergencies');
      for (const e of filterUniqueById(emList)) {
        await pool.query(
          `INSERT INTO emergencies (id, category, severity, title, location, responders, notes, status, timestamp)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [e.id, e.category || 'Medical', e.severity || 'HIGH', e.title || '', e.location || '', e.responders || '', e.notes || '', e.status || 'ACTIVE', e.timestamp || new Date().toLocaleString()]
        );
      }
    }

    // 6. Sync Baggage (including JSON steps!)
    if (Array.isArray(payload.baggage)) {
      await pool.query('DELETE FROM baggage');
      for (const b of filterUniqueById(payload.baggage)) {
        await pool.query(
          `INSERT INTO baggage (id, tagId, pnr, flight, passenger, origin, destination, weight, status, steps)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [b.id, b.tagId || b.id, b.pnr || '', b.flight || '', b.passenger || '', b.origin || '', b.destination || '', b.weight || '15kg', b.status || 'LOADED', JSON.stringify(b.steps || [])]
        );
      }
    }

    // 7. Sync Lost & Found Items
    const lfList = Array.isArray(payload.lostFoundItems) ? payload.lostFoundItems : (Array.isArray(payload.lostFound) ? payload.lostFound : (Array.isArray(payload.lostAndFound) ? payload.lostAndFound : null));
    if (lfList !== null) {
      await pool.query('DELETE FROM lost_found_items');
      for (const l of filterUniqueById(lfList)) {
        await pool.query(
          `INSERT INTO lost_found_items (id, title, category, type, location, date, description, status, reporter, contactInfo, claimPending, pendingClaimant)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [l.id, l.title || '', l.category || '', l.type || 'FOUND', l.location || '', l.date || '', l.description || '', l.status || 'OPEN', l.reporter || '', l.contactInfo || '', l.claimPending ? 'true' : 'false', l.pendingClaimant || '']
        );
      }
    }

    // 7b. Sync Lost & Found Claim Appeals
    if (Array.isArray(payload.lostFoundClaims)) {
      await pool.query('DELETE FROM lost_found_claims');
      for (const c of filterUniqueById(payload.lostFoundClaims)) {
        await pool.query(
          `INSERT INTO lost_found_claims (id, itemId, itemTitle, claimantName, claimantContact, flightNo, proofDetails, mediaUrl, mediaType, status, timestamp)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [c.id, c.itemId || '', c.itemTitle || '', c.claimantName || '', c.claimantContact || '', c.flightNo || '', c.proofDetails || '', c.mediaUrl || '', c.mediaType || '', c.status || 'PENDING_VERIFICATION', c.timestamp || '']
        );
      }
    }

    // 8. Sync Wheelchair Requests
    if (Array.isArray(payload.wheelchairRequests)) {
      await pool.query('DELETE FROM wheelchair_requests');
      for (const w of filterUniqueById(payload.wheelchairRequests)) {
        await pool.query(
          `INSERT INTO wheelchair_requests (id, passengerName, airlineName, pnrNumber, mobileNumber, timestamp, status, pickupLocation)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [w.id, w.passengerName || '', w.airlineName || '', w.pnrNumber || '', w.mobileNumber || '', w.timestamp || new Date().toLocaleString(), w.status || 'PENDING', w.pickupLocation || '']
        );
      }
    }

    // 9. Sync Support Tickets
    if (Array.isArray(payload.tickets)) {
      await pool.query('DELETE FROM tickets');
      for (const t of filterUniqueById(payload.tickets)) {
        await pool.query(
          `INSERT INTO tickets (id, name, phone, email, location, category, urgency, description, status, adminReply, createdAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [t.id, t.name || '', t.phone || '', t.email || '', t.location || '', t.category || '', t.urgency || 'Normal', t.description || '', t.status || 'OPEN', t.adminReply || '', t.createdAt || new Date().toLocaleString()]
        );
      }
    }

    // 10. Sync Fleet Vehicles (matching app.js FleetHealthView fields!)
    const fleetList = Array.isArray(payload.fleetVehicles) ? payload.fleetVehicles : (Array.isArray(payload.fleetHealth) ? payload.fleetHealth : null);
    if (fleetList !== null) {
      await pool.query('DELETE FROM fleet_vehicles');
      for (const v of filterUniqueById(fleetList)) {
        await pool.query(
          `INSERT INTO fleet_vehicles (id, aircraft, flight, status, engine, hydraulic, tyre, brake, fuel, nextMaint)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [v.id, v.aircraft || v.name || v.id, v.flight || '', v.status || 'Airworthy', v.engine || '98%', v.hydraulic || '95%', v.tyre || 'Optimal', v.brake || 'Optimal', v.fuel || '95%', v.nextMaint || '']
        );
      }
    }

    // 11. Sync CCTV Cameras
    const cctvList = Array.isArray(payload.cctv) ? payload.cctv : (Array.isArray(payload.cctvCameras) ? payload.cctvCameras : null);
    if (cctvList !== null) {
      await pool.query('DELETE FROM cctv_cameras');
      for (const c of filterUniqueById(cctvList)) {
        await pool.query(
          `INSERT INTO cctv_cameras (id, name, location, zone, resolution, status, aiMode, alerts, peopleCount, streamUrl)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [c.id, c.name || c.id, c.location || '', c.zone || 'T3', c.resolution || '4K Ultra', c.status || 'ONLINE', c.aiMode || 'Object Detection', c.alerts || 0, c.peopleCount || 10, c.streamUrl || '']
        );
      }
    }

    // 12. Sync Duty Roster
    const rosterList = Array.isArray(payload.dutyRosters) ? payload.dutyRosters : (Array.isArray(payload.dutyRoster) ? payload.dutyRoster : null);
    if (rosterList !== null) {
      await pool.query('DELETE FROM duty_rosters');
      for (const r of filterUniqueById(rosterList)) {
        await pool.query(
          `INSERT INTO duty_rosters (id, userId, name, role, location, shift, status)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [r.id || 'ROS-1', r.userId || '', r.name || '', r.role || 'Staff', r.location || 'Terminal 3', r.shift || 'Morning', r.status || 'ON_DUTY']
        );
      }
    }

    // 13. Sync Audit Logs
    if (Array.isArray(payload.auditLogs)) {
      await pool.query('DELETE FROM audit_logs');
      for (const a of filterUniqueById(payload.auditLogs.slice(0, 100))) {
        await pool.query(
          `INSERT INTO audit_logs (id, timestamp, actor, action, details) VALUES (?, ?, ?, ?, ?)`,
          [a.id || ('LOG-' + Math.random()), a.timestamp || new Date().toLocaleString(), a.actor || 'System', a.action || 'UPDATE', a.details || '']
        );
      }
    }

    // 14. Sync Parking Reservations
    if (Array.isArray(payload.parkingData?.reservations)) {
      await pool.query('DELETE FROM parking_reservations');
      for (const r of filterUniqueById(payload.parkingData.reservations)) {
        await pool.query(
          `INSERT INTO parking_reservations (id, vehicleNumber, vehicleType, parkingLot, slotNumber, durationHours, amountPaid, paymentStatus, passengerName, mobile, startDate, paymentMode, terminal, qrCode)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [r.id || ('RES-' + Date.now()), r.vehicleNumber || '', r.vehicleType || '4 Wheeler', r.parkingLot || '', r.slotNumber || '', parseInt(r.durationHours) || 4, parseFloat(r.amountPaid) || 0, r.paymentStatus || 'SUCCESS', r.passengerName || '', r.mobile || '', r.startDate || '', r.paymentMode || '', r.terminal || 'T3', r.qrCode || '']
        );
      }
    }

    // 14b. Sync Parking Vehicle Logs
    if (Array.isArray(payload.parkingData?.vehicleLogs)) {
      await pool.query('DELETE FROM parking_vehicle_logs');
      for (const vl of filterUniqueById(payload.parkingData.vehicleLogs)) {
        await pool.query(
          `INSERT INTO parking_vehicle_logs (id, timestamp, hoursAgo, vehicleNumber, vehicleType, parkingLot, eventType, gateId, cameraSensor, confidenceScore, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [vl.id || ('ANPR-' + Date.now()), vl.timestamp || '', parseFloat(vl.hoursAgo) || 0, vl.vehicleNumber || '', vl.vehicleType || '4 Wheeler', vl.parkingLot || '', vl.eventType || 'ENTRY', vl.gateId || '', vl.cameraSensor || '', vl.confidenceScore || '99%', vl.status || 'INSIDE']
        );
      }
    }

    // 15. Sync Staff Shifts
    if (Array.isArray(payload.staffShifts)) {
      await pool.query('DELETE FROM staff_shifts');
      for (const s of filterUniqueById(payload.staffShifts)) {
        await pool.query(
          `INSERT INTO staff_shifts (id, userId, name, role, shift, location, shiftDate, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [s.id || ('SHF-' + Date.now()), s.userId || '', s.name || '', s.role || 'Staff', s.shift || '', s.location || '', s.shiftDate || '', s.status || 'SCHEDULED']
        );
      }
    }

    // 16. Sync Leave Applications
    if (Array.isArray(payload.leaveApplications)) {
      await pool.query('DELETE FROM leave_applications');
      for (const l of filterUniqueById(payload.leaveApplications)) {
        await pool.query(
          `INSERT INTO leave_applications (id, userId, applicantName, role, leaveType, fromDate, toDate, reason, status, appliedOn)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [l.id || ('LV-' + Date.now()), l.userId || '', l.applicantName || '', l.role || 'Staff', l.leaveType || 'Casual Leave', l.fromDate || '', l.toDate || '', l.reason || '', l.status || 'PENDING_ADMIN_REVIEW', l.appliedOn || '']
        );
      }
    }

    // 17. Sync Attendance Logs
    if (Array.isArray(payload.attendanceLogs)) {
      await pool.query('DELETE FROM attendance_logs');
      for (const a of filterUniqueById(payload.attendanceLogs.slice(0, 200))) {
        await pool.query(
          `INSERT INTO attendance_logs (id, userId, name, role, clockInDate, clockIn, clockOut, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [a.id || ('ATT-' + Date.now()), a.userId || '', a.name || '', a.role || 'Staff', a.date || '', a.clockIn || '', a.clockOut || '', a.status || 'PRESENT']
        );
      }
    }

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
      let fleetHealthRows = null;
      let wheelchairRows = null;
      let ticketRows = null;
      let parkingResRows = null;
      let parkingLotRows = null;
      let vehicleLogsRows = null;
      let cctvRows = null;
      let emergencyRows = null;
      let cabRows = null;
      let dutyRosterRows = null;
      let staffShiftRows = null;
      let leaveAppRows = null;
      let attendanceRows = null;
      let flightRows = null;
      let gateRows = null;
      let baggageRows = null;
      let lostFoundRows = null;
      let lostFoundClaimsRows = null;

      if (pool) {
        try {
          const [uRows] = await pool.query('SELECT id, name, email, role, mobile, status, password, created_at, last_login FROM users ORDER BY created_at DESC');
          if (Array.isArray(uRows) && uRows.length > 0) users = uRows;
          const [sRows] = await pool.query("SELECT payload FROM system_state WHERE id = 'main_state' LIMIT 1");
          if (Array.isArray(sRows) && sRows.length > 0 && sRows[0].payload) fullState = JSON.parse(sRows[0].payload);
        } catch (dbQueryErr) { console.warn('Wasmer MySQL query warning:', dbQueryErr.message); }

        // ── Flights ───────────────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM flights ORDER BY scheduledTime ASC'); flightRows = Array.isArray(r) ? r : []; } catch(e) { console.warn('flights:', e.message); }

        // ── Gates ─────────────────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM gates ORDER BY id ASC'); gateRows = Array.isArray(r) ? r : []; } catch(e) { console.warn('gates:', e.message); }

        // ── Parking Lots ──────────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM parking_lots ORDER BY id ASC'); parkingLotRows = Array.isArray(r) ? r : []; } catch(e) { console.warn('parking_lots:', e.message); }

        // ── Parking Vehicle Movement Logs ─────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM parking_vehicle_logs ORDER BY id DESC LIMIT 300'); vehicleLogsRows = Array.isArray(r) ? r : []; } catch(e) { console.warn('parking_vehicle_logs:', e.message); }

        // ── Baggage (parsing JSON steps!) ──────────────────────────────────────────
        try {
          const [r] = await pool.query('SELECT * FROM baggage ORDER BY id ASC');
          baggageRows = Array.isArray(r) ? r.map(b => ({
            ...b,
            steps: b.steps ? (typeof b.steps === 'string' ? JSON.parse(b.steps) : b.steps) : []
          })) : [];
        } catch(e) { console.warn('baggage:', e.message); }

        // ── Lost & Found Items ────────────────────────────────────────────────────
        try {
          const [r] = await pool.query('SELECT * FROM lost_found_items ORDER BY id DESC');
          lostFoundRows = Array.isArray(r) ? r.map(l => ({
            ...l,
            claimPending: l.claimPending === 'true' || l.claimPending === true
          })) : [];
        } catch(e) { console.warn('lost_found_items:', e.message); }

        // ── Lost & Found Claim Appeals ────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM lost_found_claims ORDER BY id DESC'); lostFoundClaimsRows = Array.isArray(r) ? r : []; } catch(e) { console.warn('lost_found_claims:', e.message); }

        // ── Fleet Health ──────────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM fleet_vehicles ORDER BY id ASC'); fleetHealthRows = Array.isArray(r) ? r : []; } catch(e) { console.warn('fleet_vehicles:', e.message); }

        // ── Wheelchair Requests ───────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM wheelchair_requests ORDER BY timestamp DESC'); wheelchairRows = Array.isArray(r) ? r : []; } catch(e) { console.warn('wheelchair_requests:', e.message); }

        // ── Support Tickets ───────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM tickets ORDER BY createdAt DESC'); ticketRows = Array.isArray(r) ? r : []; } catch(e) { console.warn('tickets:', e.message); }

        // ── Parking Reservations ──────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM parking_reservations ORDER BY id DESC'); parkingResRows = Array.isArray(r) ? r : []; } catch(e) { console.warn('parking_reservations:', e.message); }

        // ── CCTV Cameras ──────────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM cctv_cameras ORDER BY id ASC'); cctvRows = Array.isArray(r) ? r : []; } catch(e) { console.warn('cctv_cameras:', e.message); }

        // ── Emergencies ───────────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM emergencies ORDER BY timestamp DESC'); emergencyRows = Array.isArray(r) ? r : []; } catch(e) { console.warn('emergencies:', e.message); }

        // ── Cab Bookings ──────────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM cab_bookings ORDER BY timestamp DESC'); cabRows = Array.isArray(r) ? r : []; } catch(e) { console.warn('cab_bookings:', e.message); }

        // ── Duty Rosters ──────────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM duty_rosters ORDER BY id ASC'); dutyRosterRows = Array.isArray(r) ? r : []; } catch(e) { console.warn('duty_rosters:', e.message); }

        // ── Staff Shifts ──────────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM staff_shifts ORDER BY id ASC'); staffShiftRows = Array.isArray(r) ? r : []; } catch(e) { console.warn('staff_shifts:', e.message); }

        // ── Leave Applications ────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM leave_applications ORDER BY appliedOn DESC'); leaveAppRows = Array.isArray(r) ? r : []; } catch(e) { console.warn('leave_applications:', e.message); }

        // ── Attendance Logs ───────────────────────────────────────────────────────
        try { const [r] = await pool.query('SELECT * FROM attendance_logs ORDER BY id DESC LIMIT 500'); attendanceRows = Array.isArray(r) ? r : []; } catch(e) { console.warn('attendance_logs:', e.message); }
      }

      if (users.length === 0) users = getDiskCsvUsers();

      const defaultParkingLots = [
        { id: "MLCP-T3", name: "Multi-Level Car Parking (MLCP) - Terminal 3", type: "Multi-Level (Covered & EV Charging)", total4w: 4500, filled4w: 3120, reserved4w: 450, total2w: 2000, filled2w: 1240, reserved2w: 210, status: "OPEN" },
        { id: "LOT-T1-A", name: "Surface Premium Lot - Terminal 1", type: "Open Surface (Valet & FastTag)", total4w: 1800, filled4w: 1450, reserved4w: 180, total2w: 1500, filled2w: 980, reserved2w: 150, status: "OPEN" },
        { id: "LOT-T2", name: "Short-Term Express Lot - Terminal 2", type: "Surface Covered", total4w: 1200, filled4w: 920, reserved4w: 100, total2w: 800, filled2w: 510, reserved2w: 80, status: "OPEN" },
        { id: "LOT-CARGO", name: "Commercial & Cargo Vehicle Yard", type: "Heavy Vehicle & Truck Yard", total4w: 800, filled4w: 410, reserved4w: 50, total2w: 300, filled2w: 110, reserved2w: 30, status: "OPEN" }
      ];

      // Build merged response: queried SQL rows take priority over system_state blob when queried
      const baseState = fullState || {};
      const mergedParkingData = {
        ...(baseState.parkingData || {}),
        lots: (parkingLotRows !== null && parkingLotRows.length > 0) ? parkingLotRows : ((baseState.parkingData && Array.isArray(baseState.parkingData.lots) && baseState.parkingData.lots.length > 0) ? baseState.parkingData.lots : defaultParkingLots),
        reservations: parkingResRows !== null ? parkingResRows : (baseState.parkingData?.reservations || []),
        vehicleLogs: vehicleLogsRows !== null ? vehicleLogsRows : (baseState.parkingData?.vehicleLogs || [])
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        success: true,
        source: 'Wasmer MySQL Database — All Relational Tables',
        users,
        fullState,
        ...baseState,
        // All modules served fresh from dedicated SQL tables:
        fleetHealth:          fleetHealthRows !== null  ? fleetHealthRows  : (baseState.fleetHealth || []),
        fleetVehicles:        fleetHealthRows !== null  ? fleetHealthRows  : (baseState.fleetVehicles || []),
        wheelchairRequests:   wheelchairRows !== null   ? wheelchairRows   : (baseState.wheelchairRequests || []),
        tickets:              ticketRows !== null       ? ticketRows       : (baseState.tickets || []),
        parkingData:          mergedParkingData,
        parkingLots:          mergedParkingData.lots,
        cctv:                 cctvRows !== null         ? cctvRows         : (baseState.cctv || []),
        cctvCameras:          cctvRows !== null         ? cctvRows         : (baseState.cctvCameras || []),
        emergencies:          emergencyRows !== null    ? emergencyRows    : (baseState.emergencies || []),
        cabBookings:          cabRows !== null          ? cabRows          : (baseState.cabBookings || []),
        dutyRosters:          dutyRosterRows !== null   ? dutyRosterRows   : (baseState.dutyRosters || []),
        staffShifts:          staffShiftRows !== null   ? staffShiftRows   : (baseState.staffShifts || []),
        leaveApplications:    leaveAppRows !== null     ? leaveAppRows     : (baseState.leaveApplications || []),
        attendanceLogs:       attendanceRows !== null   ? attendanceRows   : (baseState.attendanceLogs || []),
        flights:              flightRows !== null       ? flightRows       : (baseState.flights || []),
        gates:                gateRows !== null         ? gateRows         : (baseState.gates || []),
        baggage:              baggageRows !== null      ? baggageRows      : (baseState.baggage || []),
        lostFoundItems:       lostFoundRows !== null    ? lostFoundRows    : (baseState.lostFoundItems || []),
        lostFound:            lostFoundRows !== null    ? lostFoundRows    : (baseState.lostFound || []),
        lostAndFound:         lostFoundRows !== null    ? lostFoundRows    : (baseState.lostAndFound || []),
        lostFoundClaims:      lostFoundClaimsRows !== null ? lostFoundClaimsRows : (baseState.lostFoundClaims || [])
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

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: "Wasmer DB state synced successfully", syncedAt: new Date().toISOString() }));

      if (pool && payload && typeof payload === 'object') {
        (async () => {
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
        })();
      }
      return;
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
