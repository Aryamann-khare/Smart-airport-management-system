// React hooks already destructured at top of script

// ═══════════════════════════════════════════════════════
// CONSTANTS & SEED DATA
// ═══════════════════════════════════════════════════════

const EMERGENCY_CATEGORIES = ["Fire / Crash Tender", "Medical Emergency", "Bomb Threat", "Suspicious Object", "Cyber Attack", "Severe Weather / Fog", "Aircraft Incident", "Power / Grid Failure", "Runway Incursion", "Bird Strike", "Fuel Leakage"];
const AAI_AIRPORTS = [{
  code: 'DEL',
  iata: 'DEL',
  icao: 'VIDP',
  name: 'Indira Gandhi International Airport',
  city: 'Delhi',
  lat: 28.5562,
  lon: 77.1000
}, {
  code: 'BOM',
  iata: 'BOM',
  icao: 'VABB',
  name: 'Chhatrapati Shivaji Maharaj Intl Airport',
  city: 'Mumbai',
  lat: 19.0896,
  lon: 72.8656
}, {
  code: 'BLR',
  iata: 'BLR',
  icao: 'VOBL',
  name: 'Kempegowda International Airport',
  city: 'Bengaluru',
  lat: 13.1986,
  lon: 77.7066
}, {
  code: 'MAA',
  iata: 'MAA',
  icao: 'VOMM',
  name: 'Chennai International Airport',
  city: 'Chennai',
  lat: 12.9941,
  lon: 80.1709
}, {
  code: 'CCU',
  iata: 'CCU',
  icao: 'VECC',
  name: 'Netaji Subhash Chandra Bose Intl Airport',
  city: 'Kolkata',
  lat: 22.6520,
  lon: 88.4463
}, {
  code: 'HYD',
  iata: 'HYD',
  icao: 'VOHS',
  name: 'Rajiv Gandhi International Airport',
  city: 'Hyderabad',
  lat: 17.2403,
  lon: 78.4294
}, {
  code: 'JAI',
  iata: 'JAI',
  icao: 'VIJP',
  name: 'Jaipur International Airport',
  city: 'Jaipur',
  lat: 26.8242,
  lon: 75.8122
}, {
  code: 'ATQ',
  iata: 'ATQ',
  icao: 'VIAR',
  name: 'Sri Guru Ram Dass Jee Intl Airport',
  city: 'Amritsar',
  lat: 31.7096,
  lon: 74.7973
}];
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}
const TRANSLATIONS = {
  en: {
    dashboard: "Dashboard",
    airportMap: "Airport Map",
    flightFids: "Flight FIDS",
    intelligentGates: "Intelligent Gates",
    emergencies: "Emergencies",
    fleetHealth: "Fleet Health",
    baggage: "Baggage",
    cctv: "CCTV Grid",
    lostFound: "Lost & Found",
    wheelchair: "Wheelchair",
    dutyRoster: "Duty Roster & Attendance",
    adminConsole: "Admin Console",
    searchPlaceholder: "Search flights, gates, passengers...",
    support: "Support",
    loginButton: "🔑 Staff / Admin Login",
    logoutButton: "Logout",
    opsHeader: "AAI Operations Control Center — DEL VIDP",
    publicDashboard: "Public Dashboard • Login for role-specific access",
    activeFlights: "Active Flights",
    passengersToday: "Passengers Today",
    bagsProcessed: "Bags Processed",
    activeAlerts: "Active Alerts",
    gatesOccupied: "Gates Occupied",
    onTimePerf: "On-Time Perf.",
    securityCleared: "Security Cleared",
    weather: "Weather",
    systemHealth: "System Health",
    recentFlights: "Recent Flights",
    runwayStatus: "Runway & Taxiway Status",
    lostFoundTitle: "Lost & Found Inventory & Passenger Reporting",
    reportLostItem: "+ Report Missing / Lost Item",
    requestWheelchair: "+ Request Wheelchair",
    staffAdminRequired: "Staff & Admin Login Required",
    carParking: "Airport Car Parking",
    cabBooking: "Ola Cabs & Taxi"
  },
  hi: {
    dashboard: "डैशबोर्ड",
    airportMap: "हवाई अड्डा मानचित्र",
    flightFids: "उड़ान सूचना प्रणाली (FIDS)",
    intelligentGates: "इंटेलिजेंट गेट्स",
    carParking: "कार पार्किंग",
    cabBooking: "ओला कैब बुकिंग",
    emergencies: "आपातकालीन सेवाएं",
    fleetHealth: "विमान बेड़ा स्वास्थ्य",
    baggage: "सामान ट्रैकिंग",
    cctv: "सीसीटीवी ग्रिड",
    lostFound: "खोया और पाया",
    wheelchair: "व्हीलचेयर सहायता",
    dutyRoster: "ड्यूटी रोस्टर और उपस्थिति",
    adminConsole: "एडमिन कमांड सेंटर",
    searchPlaceholder: "उड़ानें, गेट, यात्री खोजें...",
    support: "सहायता केंद्र",
    loginButton: "🔑 स्टाफ / एडमिन लॉगिन",
    logoutButton: "लॉगआउट",
    opsHeader: "भा.वि.प्रा. संचालन नियंत्रण केंद्र — दिल्ली (DEL VIDP)",
    publicDashboard: "सार्वजनिक डैशबोर्ड • विशेष पहुंच हेतु लॉगिन करें",
    activeFlights: "सक्रिय उड़ानें",
    passengersToday: "आज के कुल यात्री",
    bagsProcessed: "संसाधित सामान",
    activeAlerts: "सक्रिय अलर्ट",
    gatesOccupied: "व्यस्त गेट",
    onTimePerf: "समय पर प्रदर्शन",
    securityCleared: "सुरक्षा जांच पूर्ण",
    weather: "मौसम स्थिति",
    systemHealth: "सिस्टम स्वास्थ्य",
    recentFlights: "हाल की उड़ानें",
    runwayStatus: "रनवे एवं टैक्सीवे स्थिति",
    lostFoundTitle: "खोया और पाया सामान रजिस्टर एवं यात्री रिपोर्टिंग",
    reportLostItem: "+ खोए सामान की रिपोर्ट करें",
    requestWheelchair: "+ व्हीलचेयर अनुरोध करें",
    staffAdminRequired: "स्टाफ एवं एडमिन लॉगिन अनिवार्य है"
  }
};
const DB_VERSION = 'v2_clean';
const DB_KEY = 'AAI_DEL_AEROSKY_3D_V700';
const SEED = {
  metrics: {
    activeFlights: 124,
    passengersToday: 42315,
    bagsProcessed: 39200,
    activeAlerts: 2,
    gatesOccupied: 27,
    totalGates: 38,
    weatherStatus: "Good (Vis 2500m)",
    systemHealth: "99.8%",
    onTimePerf: "87.3%",
    securityCleared: 41890,
    avgCheckIn: "2m 14s"
  },
  contactInfo: {
    helpline: "+91 8800344794 (Toll Free)",
    email: "admin@delhi.aai",
    address: "Indira Gandhi International Airport, New Delhi – 110037, India"
  },
    cctv: [{
    id: "CAM-DEL-01",
    name: "T3 Departure Gate 42",
    location: "Terminal 3, Concourse B",
    zone: "Gate Area",
    resolution: "4K Ultra HD",
    status: "ONLINE",
    alerts: 0,
    peopleCount: 42,
    aiMode: "Queue Density & Motion Analytics"
  }, {
    id: "CAM-DEL-02",
    name: "T3 Security Checkpoint Lane 4",
    location: "Terminal 3, Security Hold",
    zone: "Security Check",
    resolution: "4K Ultra HD",
    status: "ONLINE",
    alerts: 1,
    peopleCount: 68,
    aiMode: "Unattended Baggage & Intrusion Detection"
  }, {
    id: "CAM-DEL-03",
    name: "Runway 28/10 Threshold",
    location: "Airside Perimeter North",
    zone: "Runway & Taxiway",
    resolution: "4K Thermal InfraRed",
    status: "ONLINE",
    alerts: 0,
    peopleCount: 2,
    aiMode: "Perimeter Breach & Wildlife Detection"
  }, {
    id: "CAM-DEL-04",
    name: "MLCP T3 Parking Level 2",
    location: "Multi-Level Car Parking T3",
    zone: "Car Parking",
    resolution: "1080p Full HD",
    status: "ONLINE",
    alerts: 0,
    peopleCount: 14,
    aiMode: "ANPR License Plate Recognition"
  }, {
    id: "CAM-DEL-05",
    name: "T1 Baggage Reclaim Belt 3",
    location: "Terminal 1, Arrivals",
    zone: "Baggage Claim",
    resolution: "1080p Full HD",
    status: "MAINTENANCE",
    alerts: 0,
    peopleCount: 0,
    aiMode: "Luggage Misplacement Tracking"
  }, {
    id: "CAM-DEL-06",
    name: "T2 Curbside Taxi Hub",
    location: "Terminal 2, Departure Forecourt",
    zone: "Curbside Transit",
    resolution: "4K Ultra HD",
    status: "ONLINE",
    alerts: 0,
    peopleCount: 35,
    aiMode: "Curbside Traffic Congestion AI"
  }],
  users: [{
    id: "USR-001",
    name: "AAI Master Admin",
    email: "admin@delhi.aai",
    password: "admin",
    role: "Admin",
    designation: "Chief Operations Director",
    status: "APPROVED",
    employeeId: "ADM-DEL-001"
  }],
  flights: [{
    id: "FL-001",
    flightNumber: "AI-101",
    airline: "Air India",
    type: "Departure",
    destination: "London Heathrow (LHR)",
    origin: "Delhi (DEL)",
    scheduledTime: "02:15",
    estimatedTime: "02:15",
    terminal: "T3",
    gate: "T3-G42",
    status: "Boarding",
    pax: 285,
    maxPax: 324,
    bags: 410,
    aircraft: "Boeing 787-9 Dreamliner",
    aiDelayRisk: 14,
    boardingPct: 88
  }, {
    id: "FL-002",
    flightNumber: "6E-2015",
    airline: "IndiGo",
    type: "Departure",
    destination: "Mumbai (BOM)",
    origin: "Delhi (DEL)",
    scheduledTime: "06:30",
    estimatedTime: "07:15",
    terminal: "T1",
    gate: "T1-G05",
    status: "Delayed",
    pax: 180,
    maxPax: 186,
    bags: 195,
    aircraft: "Airbus A320neo",
    aiDelayRisk: 82,
    boardingPct: 0
  }, {
    id: "FL-003",
    flightNumber: "UK-811",
    airline: "Vistara",
    type: "Departure",
    destination: "Bengaluru (BLR)",
    origin: "Delhi (DEL)",
    scheduledTime: "07:00",
    estimatedTime: "07:00",
    terminal: "T3",
    gate: "T3-G32",
    status: "On Time",
    pax: 162,
    maxPax: 188,
    bags: 175,
    aircraft: "Airbus A321neo",
    aiDelayRisk: 8,
    boardingPct: 45
  }, {
    id: "FL-004",
    flightNumber: "SG-8102",
    airline: "SpiceJet",
    type: "Arrival",
    destination: "Delhi (DEL)",
    origin: "Jaipur (JAI)",
    scheduledTime: "08:45",
    estimatedTime: "08:40",
    terminal: "T1",
    gate: "T1-G12",
    status: "Landed",
    pax: 145,
    maxPax: 189,
    bags: 152,
    aircraft: "Boeing 737-800",
    aiDelayRisk: 0,
    boardingPct: 100
  }, {
    id: "FL-005",
    flightNumber: "EK-511",
    airline: "Emirates",
    type: "Arrival",
    destination: "Delhi (DEL)",
    origin: "Dubai (DXB)",
    scheduledTime: "09:15",
    estimatedTime: "09:20",
    terminal: "T3",
    gate: "T3-G55",
    status: "In Flight",
    pax: 358,
    maxPax: 398,
    bags: 510,
    aircraft: "Airbus A380-800",
    aiDelayRisk: 12,
    boardingPct: 0
  }, {
    id: "FL-006",
    flightNumber: "LH-761",
    airline: "Lufthansa",
    type: "Arrival",
    destination: "Delhi (DEL)",
    origin: "Frankfurt (FRA)",
    scheduledTime: "10:30",
    estimatedTime: "10:25",
    terminal: "T3",
    gate: "T3-G48",
    status: "In Flight",
    pax: 274,
    maxPax: 297,
    bags: 385,
    aircraft: "Airbus A350-900",
    aiDelayRisk: 5,
    boardingPct: 0
  }, {
    id: "FL-007",
    flightNumber: "AI-302",
    airline: "Air India",
    type: "Departure",
    destination: "Chennai (MAA)",
    origin: "Delhi (DEL)",
    scheduledTime: "11:00",
    estimatedTime: "11:00",
    terminal: "T3",
    gate: "T3-G28",
    status: "Check-in Open",
    pax: 95,
    maxPax: 256,
    bags: 78,
    aircraft: "Boeing 777-300ER",
    aiDelayRisk: 3,
    boardingPct: 0
  }, {
    id: "FL-008",
    flightNumber: "QR-571",
    airline: "Qatar Airways",
    type: "Arrival",
    destination: "Delhi (DEL)",
    origin: "Doha (DOH)",
    scheduledTime: "04:30",
    estimatedTime: "04:25",
    terminal: "T3",
    gate: "T3-G60",
    status: "Landed",
    pax: 312,
    maxPax: 335,
    bags: 440,
    aircraft: "Boeing 787-9",
    aiDelayRisk: 0,
    boardingPct: 100
  }, {
    id: "FL-009",
    flightNumber: "SQ-406",
    airline: "Singapore Airlines",
    type: "Departure",
    destination: "Singapore (SIN)",
    origin: "Delhi (DEL)",
    scheduledTime: "13:55",
    estimatedTime: "13:55",
    terminal: "T3",
    gate: "T3-G38",
    status: "Scheduled",
    pax: 0,
    maxPax: 303,
    bags: 0,
    aircraft: "Airbus A350-900",
    aiDelayRisk: 6,
    boardingPct: 0
  }, {
    id: "FL-010",
    flightNumber: "6E-6145",
    airline: "IndiGo",
    type: "Departure",
    destination: "Kolkata (CCU)",
    origin: "Delhi (DEL)",
    scheduledTime: "14:20",
    estimatedTime: "14:20",
    terminal: "T2",
    gate: "T2-G08",
    status: "Scheduled",
    pax: 0,
    maxPax: 186,
    bags: 0,
    aircraft: "Airbus A320neo",
    aiDelayRisk: 4,
    boardingPct: 0
  }, {
    id: "FL-011",
    flightNumber: "BA-256",
    airline: "British Airways",
    type: "Departure",
    destination: "London (LHR)",
    origin: "Delhi (DEL)",
    scheduledTime: "15:30",
    estimatedTime: "15:30",
    terminal: "T3",
    gate: "T3-G44",
    status: "Scheduled",
    pax: 0,
    maxPax: 332,
    bags: 0,
    aircraft: "Boeing 787-9",
    aiDelayRisk: 9,
    boardingPct: 0
  }, {
    id: "FL-012",
    flightNumber: "TK-717",
    airline: "Turkish Airlines",
    type: "Arrival",
    destination: "Delhi (DEL)",
    origin: "Istanbul (IST)",
    scheduledTime: "16:10",
    estimatedTime: "16:15",
    terminal: "T3",
    gate: "T3-G51",
    status: "In Flight",
    pax: 287,
    maxPax: 310,
    bags: 395,
    aircraft: "Boeing 777-300ER",
    aiDelayRisk: 11,
    boardingPct: 0
  }],
  gates: [{
    id: "T1-G01",
    terminal: "T1",
    status: "Available",
    flight: null,
    type: "Narrowbody",
    pax: 0,
    compat: "A320/B737"
  }, {
    id: "T1-G05",
    terminal: "T1",
    status: "Occupied",
    flight: "6E-2015",
    type: "Narrowbody",
    pax: 180,
    compat: "A320/B737"
  }, {
    id: "T1-G08",
    terminal: "T1",
    status: "Available",
    flight: null,
    type: "Narrowbody",
    pax: 0,
    compat: "A320/B737"
  }, {
    id: "T1-G12",
    terminal: "T1",
    status: "Occupied",
    flight: "SG-8102",
    type: "Narrowbody",
    pax: 145,
    compat: "A320/B737"
  }, {
    id: "T2-G01",
    terminal: "T2",
    status: "Available",
    flight: null,
    type: "Narrowbody",
    pax: 0,
    compat: "A320/A321"
  }, {
    id: "T2-G05",
    terminal: "T2",
    status: "Maintenance",
    flight: null,
    type: "Narrowbody",
    pax: 0,
    compat: "A320/A321"
  }, {
    id: "T2-G08",
    terminal: "T2",
    status: "Available",
    flight: null,
    type: "Narrowbody",
    pax: 0,
    compat: "A320"
  }, {
    id: "T3-G28",
    terminal: "T3",
    status: "Occupied",
    flight: "AI-302",
    type: "Widebody",
    pax: 95,
    compat: "B777/B787"
  }, {
    id: "T3-G32",
    terminal: "T3",
    status: "Occupied",
    flight: "UK-811",
    type: "Widebody",
    pax: 162,
    compat: "A321/B787"
  }, {
    id: "T3-G38",
    terminal: "T3",
    status: "Available",
    flight: null,
    type: "Widebody",
    pax: 0,
    compat: "A350/B787"
  }, {
    id: "T3-G42",
    terminal: "T3",
    status: "Occupied",
    flight: "AI-101",
    type: "Widebody",
    pax: 285,
    compat: "B787/B777"
  }, {
    id: "T3-G44",
    terminal: "T3",
    status: "Available",
    flight: null,
    type: "Widebody",
    pax: 0,
    compat: "B787/A350"
  }, {
    id: "T3-G48",
    terminal: "T3",
    status: "Reserved",
    flight: "LH-761",
    type: "Widebody",
    pax: 0,
    compat: "A350/B787"
  }, {
    id: "T3-G51",
    terminal: "T3",
    status: "Reserved",
    flight: "TK-717",
    type: "Widebody",
    pax: 0,
    compat: "B777/A350"
  }, {
    id: "T3-G55",
    terminal: "T3",
    status: "Reserved",
    flight: "EK-511",
    type: "Widebody",
    pax: 0,
    compat: "A380/B747"
  }, {
    id: "T3-G60",
    terminal: "T3",
    status: "Occupied",
    flight: "QR-571",
    type: "Widebody",
    pax: 312,
    compat: "B787/A350"
  }],
  emergencies: [{
    id: "EMG-001",
    category: "Severe Weather / Fog",
    severity: "Code Yellow",
    title: "CAT-III B Low Visibility Protocol Active",
    location: "DEL Runway 28/10 Threshold",
    responders: "AAI ATC Tower L8 & CISF ASG",
    timestamp: "2026-08-04 06:15 IST",
    status: "ACTIVE",
    notes: "Dense fog reduced RVR to 150m. CAT-III guidance operational.",
    escalated: true
  }, {
    id: "EMG-002",
    category: "Medical Emergency",
    severity: "Code Blue",
    title: "Passenger cardiac arrest at T3 Gate 42",
    location: "Terminal 3, Gate 42 Boarding Area",
    responders: "DIAL Medical Team, CISF QRT",
    timestamp: "2026-08-04 07:45 IST",
    status: "ACTIVE",
    notes: "68yo male passenger. AED deployed. Ambulance dispatched to airside.",
    escalated: false
  }, {
    id: "EMG-003",
    category: "Bird Strike",
    severity: "Code Green",
    title: "Bird strike reported on AI-302 during taxi",
    location: "Taxiway Bravo, near RWY 29",
    responders: "Wildlife Control, Ground Ops",
    timestamp: "2026-08-04 05:30 IST",
    status: "RESOLVED",
    notes: "Minor impact. Engine inspection completed. Aircraft cleared for ops.",
    escalated: false
  }, {
    id: "EMG-004",
    category: "Suspicious Object",
    severity: "Code Orange",
    title: "Unattended bag at T1 Security Hold",
    location: "Terminal 1, Security Hold Area Lane 4",
    responders: "CISF Bomb Disposal Squad, Dog Squad",
    timestamp: "2026-08-03 22:10 IST",
    status: "RESOLVED",
    notes: "Bag scanned & cleared. Passenger identified and counseled.",
    escalated: true
  }],
  baggage: [{
    id: "BAG-001",
    tagId: "DEL-LHR-88401",
    pnr: "PNR-DEL-9081",
    flight: "AI-101",
    passenger: "Ananya Sharma",
    origin: "DEL",
    destination: "LHR",
    weight: "23.4 kg",
    status: "Loading",
    steps: [{
      loc: "Check-in Counter T3-C12",
      time: "01:15",
      done: true
    }, {
      loc: "Security X-Ray Belt 3",
      time: "01:28",
      done: true
    }, {
      loc: "Sorting Hub A (DEL)",
      time: "01:45",
      done: true
    }, {
      loc: "Loading Bay T3-G42",
      time: "02:05",
      done: false
    }, {
      loc: "Aircraft Cargo Hold",
      time: "—",
      done: false
    }]
  }, {
    id: "BAG-002",
    tagId: "DEL-BOM-20151",
    pnr: "PNR-DEL-5512",
    flight: "6E-2015",
    passenger: "Rahul Mehta",
    origin: "DEL",
    destination: "BOM",
    weight: "15.2 kg",
    status: "In Sorting",
    steps: [{
      loc: "Check-in Counter T1-C04",
      time: "05:30",
      done: true
    }, {
      loc: "Security X-Ray Belt 1",
      time: "05:42",
      done: true
    }, {
      loc: "Sorting Hub B (DEL)",
      time: "06:00",
      done: false
    }, {
      loc: "Loading Bay T1-G05",
      time: "—",
      done: false
    }, {
      loc: "Aircraft Cargo Hold",
      time: "—",
      done: false
    }]
  }, {
    id: "BAG-003",
    tagId: "DXB-DEL-51101",
    pnr: "PNR-EK-7823",
    flight: "EK-511",
    passenger: "Ahmed Al-Rashid",
    origin: "DXB",
    destination: "DEL",
    weight: "28.1 kg",
    status: "In Transit",
    steps: [{
      loc: "Loaded at DXB Terminal 3",
      time: "05:00",
      done: true
    }, {
      loc: "In Flight (EK-511)",
      time: "05:45",
      done: true
    }, {
      loc: "Arrival Belt DEL",
      time: "—",
      done: false
    }, {
      loc: "Customs Screening",
      time: "—",
      done: false
    }, {
      loc: "Collection Carousel 7",
      time: "—",
      done: false
    }]
  }, {
    id: "BAG-004",
    tagId: "DEL-BLR-81105",
    pnr: "PNR-UK-4491",
    flight: "UK-811",
    passenger: "Priya Nair",
    origin: "DEL",
    destination: "BLR",
    weight: "12.8 kg",
    status: "Loaded",
    steps: [{
      loc: "Check-in Counter T3-C08",
      time: "05:45",
      done: true
    }, {
      loc: "Security X-Ray Belt 2",
      time: "06:01",
      done: true
    }, {
      loc: "Sorting Hub A (DEL)",
      time: "06:18",
      done: true
    }, {
      loc: "Loading Bay T3-G32",
      time: "06:35",
      done: true
    }, {
      loc: "Aircraft Cargo Hold",
      time: "06:42",
      done: true
    }]
  }, {
    id: "BAG-005",
    tagId: "JAI-DEL-81021",
    pnr: "PNR-SG-6601",
    flight: "SG-8102",
    passenger: "Vikram Joshi",
    origin: "JAI",
    destination: "DEL",
    weight: "19.5 kg",
    status: "Delivered",
    steps: [{
      loc: "Loaded at JAI",
      time: "07:15",
      done: true
    }, {
      loc: "In Flight (SG-8102)",
      time: "07:30",
      done: true
    }, {
      loc: "Arrival Belt DEL T1",
      time: "08:45",
      done: true
    }, {
      loc: "Customs Screening",
      time: "08:52",
      done: true
    }, {
      loc: "Collection Carousel 3",
      time: "08:58",
      done: true
    }]
  }, {
    id: "BAG-006",
    tagId: "DOH-DEL-57101",
    pnr: "PNR-QR-8812",
    flight: "QR-571",
    passenger: "Fatima Hassan",
    origin: "DOH",
    destination: "DEL",
    weight: "31.2 kg",
    status: "At Carousel",
    steps: [{
      loc: "Loaded at DOH Hamad Intl",
      time: "23:30",
      done: true
    }, {
      loc: "In Flight (QR-571)",
      time: "00:15",
      done: true
    }, {
      loc: "Arrival Belt DEL T3",
      time: "04:30",
      done: true
    }, {
      loc: "Customs Screening",
      time: "04:38",
      done: true
    }, {
      loc: "Collection Carousel 11",
      time: "04:45",
      done: true
    }]
  }],
  lostAndFound: [{
    id: "LF-001",
    item: "Leather Wallet (Black)",
    category: "Personal Item",
    location: "T3 CISF Security Lane B",
    dateFound: "2026-08-04",
    status: "UNCLAIMED",
    description: "Black leather bifold wallet with ICICI debit card and approx ₹2,500 cash.",
    claimedBy: null
  }, {
    id: "LF-002",
    item: "Apple iPad Pro 12.9\"",
    category: "Electronics",
    location: "T3 Departure Lounge Gate 38",
    dateFound: "2026-08-04",
    status: "UNCLAIMED",
    description: "Space gray iPad Pro with blue Smart Folio case. Locked with passcode.",
    claimedBy: null
  }, {
    id: "LF-003",
    item: "Gold Necklace with Ruby Pendant",
    category: "Jewelry",
    location: "T1 Ladies Washroom near Gate 08",
    dateFound: "2026-08-03",
    status: "CLAIMED",
    description: "22K gold chain with single ruby pendant. Weight approx 12g.",
    claimedBy: "Mrs. Sunita Agarwal (PNR: PNR-6E-2201)"
  }, {
    id: "LF-004",
    item: "Samsonite Carry-on (Red)",
    category: "Luggage",
    location: "T3 Arrival Carousel 7",
    dateFound: "2026-08-03",
    status: "UNCLAIMED",
    description: "Red Samsonite hardshell carry-on. Tag partially torn. Contains clothing.",
    claimedBy: null
  }, {
    id: "LF-005",
    item: "Child's Stuffed Toy (Elephant)",
    category: "Personal Item",
    location: "T2 Play Area",
    dateFound: "2026-08-04",
    status: "UNCLAIMED",
    description: "Grey plush elephant toy, approx 30cm. Well-loved condition.",
    claimedBy: null
  }, {
    id: "LF-006",
    item: "Canon EOS R5 Camera Body",
    category: "Electronics",
    location: "T3 Duty Free Shopping Area",
    dateFound: "2026-08-02",
    status: "CLAIMED",
    description: "Canon EOS R5 body with RF 24-70mm lens. Serial: 012345678. Found in shopping bag.",
    claimedBy: "Mr. James Wilson (Passport: GB7891234)"
  }, {
    id: "LF-007",
    item: "Prescription Glasses (Ray-Ban)",
    category: "Personal Item",
    location: "T1 Check-in Counter 12",
    dateFound: "2026-08-04",
    status: "UNCLAIMED",
    description: "Ray-Ban tortoiseshell frame with progressive lenses. Brown leather case.",
    claimedBy: null
  }, {
    id: "LF-008",
    item: "HP Laptop Backpack",
    category: "Luggage",
    location: "T3 CISF Security Belt 5",
    dateFound: "2026-08-04",
    status: "UNCLAIMED",
    description: "Black HP laptop bag with HP Pavilion laptop, charger, and documents inside.",
    claimedBy: null
  }],
  wheelchairRequests: [{
    id: "WC-001",
    passengerName: "Savitri Devi",
    airlineName: "Air India",
    pnrNumber: "PNR-DEL-7781",
    mobileNumber: "+91 9876543210",
    timestamp: "08:15 IST",
    status: "DISPATCHED"
  }, {
    id: "WC-002",
    passengerName: "Mohammad Iqbal",
    airlineName: "Emirates",
    pnrNumber: "PNR-EK-5512",
    mobileNumber: "+91 8765432109",
    timestamp: "09:02 IST",
    status: "COMPLETED"
  }, {
    id: "WC-003",
    passengerName: "Catherine D'Souza",
    airlineName: "Vistara",
    pnrNumber: "PNR-UK-3390",
    mobileNumber: "+91 7654321098",
    timestamp: "09:30 IST",
    status: "PENDING"
  }],
  cctv: [{
    id: "CAM-001",
    name: "T3 Main Entrance",
    location: "Terminal 3, Entry Gate A",
    status: "ONLINE",
    peopleCount: 342,
    alerts: 0,
    zone: "Public"
  }, {
    id: "CAM-002",
    name: "T3 Security Checkpoint",
    location: "Terminal 3, CISF Security Lane",
    status: "ONLINE",
    peopleCount: 128,
    alerts: 1,
    zone: "Restricted"
  }, {
    id: "CAM-003",
    name: "T1 Departure Gates",
    location: "Terminal 1, Gates 1-8",
    status: "ONLINE",
    peopleCount: 215,
    alerts: 0,
    zone: "Secure"
  }, {
    id: "CAM-004",
    name: "T3 Baggage Claim",
    location: "Terminal 3, Carousel Area",
    status: "ONLINE",
    peopleCount: 89,
    alerts: 0,
    zone: "Arrival"
  }, {
    id: "CAM-005",
    name: "Runway 28/10",
    location: "Airside, Runway Threshold 28",
    status: "ONLINE",
    peopleCount: 0,
    alerts: 0,
    zone: "Airside"
  }, {
    id: "CAM-006",
    name: "T2 Check-in Hall",
    location: "Terminal 2, Check-in Area",
    status: "OFFLINE",
    peopleCount: 0,
    alerts: 2,
    zone: "Public"
  }, {
    id: "CAM-007",
    name: "T3 Parking Structure P5",
    location: "Multi-level Parking P5",
    status: "ONLINE",
    peopleCount: 15,
    alerts: 0,
    zone: "Public"
  }, {
    id: "CAM-008",
    name: "ATC Tower Perimeter",
    location: "ATC Tower Compound",
    status: "ONLINE",
    peopleCount: 4,
    alerts: 0,
    zone: "Restricted"
  }, {
    id: "CAM-009",
    name: "T3 Duty Free Zone",
    location: "Terminal 3, Duty Free Mall",
    status: "ONLINE",
    peopleCount: 176,
    alerts: 0,
    zone: "Secure"
  }],
  fleetHealth: [{
    id: "FH-001",
    aircraft: "Boeing 787-9 (VT-ANB)",
    flight: "AI-101",
    engine: "98%",
    hydraulic: "96%",
    tyre: "88% (Good)",
    brake: "Optimal",
    fuel: "99.2%",
    nextMaint: "2026-08-10",
    status: "Airworthy"
  }, {
    id: "FH-002",
    aircraft: "Airbus A320neo (VT-ITE)",
    flight: "6E-2015",
    engine: "92%",
    hydraulic: "88%",
    tyre: "55% (Moderate)",
    brake: "Inspect Next",
    fuel: "97.5%",
    nextMaint: "2026-08-05",
    status: "Conditional"
  }, {
    id: "FH-003",
    aircraft: "Airbus A321neo (VT-TVA)",
    flight: "UK-811",
    engine: "96%",
    hydraulic: "94%",
    tyre: "82% (Good)",
    brake: "Good",
    fuel: "98.8%",
    nextMaint: "2026-08-15",
    status: "Airworthy"
  }, {
    id: "FH-004",
    aircraft: "Boeing 737-800 (VT-SYC)",
    flight: "SG-8102",
    engine: "89%",
    hydraulic: "85%",
    tyre: "42% (Replace Soon)",
    brake: "Worn",
    fuel: "95.1%",
    nextMaint: "2026-08-06",
    status: "Needs Attention"
  }, {
    id: "FH-005",
    aircraft: "Airbus A380-800 (A6-EUG)",
    flight: "EK-511",
    engine: "99%",
    hydraulic: "97%",
    tyre: "91% (Excellent)",
    brake: "Optimal",
    fuel: "99.5%",
    nextMaint: "2026-08-20",
    status: "Airworthy"
  }, {
    id: "FH-006",
    aircraft: "Airbus A350-900 (D-AIXA)",
    flight: "LH-761",
    engine: "97%",
    hydraulic: "95%",
    tyre: "78% (Good)",
    brake: "Good",
    fuel: "98.9%",
    nextMaint: "2026-08-12",
    status: "Airworthy"
  }],
  auditLogs: [{
    id: "LOG-001",
    timestamp: "2026-08-04 06:15:22 IST",
    actor: "SYSTEM",
    action: "SYSTEM_BOOT",
    details: "AOCC Platform initialized successfully."
  }, {
    id: "LOG-002",
    timestamp: "2026-08-04 06:16:01 IST",
    actor: "AAI Master Admin (Admin)",
    action: "FLIGHT_UPDATE",
    details: "Updated AI-101 status to Boarding."
  }, {
    id: "LOG-003",
    timestamp: "2026-08-04 06:20:15 IST",
    actor: "SYSTEM",
    action: "EMERGENCY_CREATE",
    details: "EMG-001: Severe Weather / Fog protocol activated."
  }, {
    id: "LOG-004",
    timestamp: "2026-08-04 07:45:30 IST",
    actor: "CISF Lead (CISF-DEL-881)",
    action: "EMERGENCY_CREATE",
    details: "EMG-002: Medical emergency at T3 Gate 42."
  }],
  dutyRosters: [{
    id: "DR-001",
    userId: "USR-010",
    name: "AAI Master Admin",
    role: "Admin",
    location: "Terminal 3 - Master Command Center",
    shift: "General Shift (09:00 - 17:00 IST)",
    status: "ON_DUTY",
    clockInTime: "09:00 IST"
  }],
  attendanceLogs: [{
    id: "ATT-001",
    userId: "USR-010",
    name: "AAI Master Admin",
    role: "Admin",
    date: "2026-08-08",
    clockIn: "09:00 IST",
    clockOut: null,
    status: "PRESENT"
  }],
  parkingData: {
    rates: {
      fourWheeler: [{
        duration: "0 - 30 mins",
        rate: 120,
        label: "Short Term / Express Drop"
      }, {
        duration: "30 mins - 2 hours",
        rate: 250,
        label: "Standard Parking"
      }, {
        duration: "2 hours - 4 hours",
        rate: 400,
        label: "Extended Parking"
      }, {
        duration: "Up to 24 hours (Full Day)",
        rate: 600,
        label: "24-Hour Overnight"
      }],
      twoWheeler: [{
        duration: "0 - 30 mins",
        rate: 30,
        label: "Short Term Drop"
      }, {
        duration: "30 mins - 2 hours",
        rate: 60,
        label: "Standard Parking"
      }, {
        duration: "2 hours - 4 hours",
        rate: 100,
        label: "Extended Parking"
      }, {
        duration: "Up to 24 hours (Full Day)",
        rate: 200,
        label: "24-Hour Overnight"
      }]
    },
    lots: [{
      id: 'MLCP-T3',
      name: 'Multi-Level Car Parking (MLCP) - Terminal 3',
      type: 'Covered Automated',
      total4w: 4500,
      filled4w: 3120,
      reserved4w: 450,
      total2w: 2000,
      filled2w: 1240,
      reserved2w: 210,
      status: 'OPEN'
    }, {
      id: 'PRK-T1',
      name: 'Premium Surface Parking - Terminal 1',
      type: 'Open Air Surface',
      total4w: 1800,
      filled4w: 1420,
      reserved4w: 180,
      total2w: 1000,
      filled2w: 680,
      reserved2w: 90,
      status: 'OPEN'
    }, {
      id: 'PRK-T2',
      name: 'Express Car Park - Terminal 2',
      type: 'Covered Deck',
      total4w: 2200,
      filled4w: 1750,
      reserved4w: 230,
      total2w: 1200,
      filled2w: 810,
      reserved2w: 140,
      status: 'OPEN'
    }, {
      id: 'VALET-T3',
      name: 'VIP Valet Parking - T3 Departures',
      type: 'VIP Valet Service',
      total4w: 500,
      filled4w: 410,
      reserved4w: 65,
      total2w: 0,
      filled2w: 0,
      reserved2w: 0,
      status: 'OPEN'
    }],
    reservations: [{
      id: 'RES-PRK-8901',
      passengerName: 'Rajesh Malhotra',
      mobile: '+91 9810123456',
      vehicleType: '4 Wheeler (Car / SUV)',
      vehicleNumber: 'DL-01-AB-1234',
      terminal: 'T3',
      parkingLot: 'Multi-Level Car Parking (MLCP) - Terminal 3',
      startDate: '2026-08-08',
      durationHours: 4,
      slotNumber: 'MLCP-Level 2-B42',
      amountPaid: 400,
      paymentStatus: 'SUCCESS',
      paymentMode: 'UPI (GPay)',
      timestamp: '2026-08-08 08:30 IST',
      qrCode: 'PASS-MLCP-T3-DL01AB1234'
    }, {
      id: 'RES-PRK-8902',
      passengerName: 'Kavita Sundaram',
      mobile: '+91 9876543210',
      vehicleType: '2 Wheeler (Scooter / Bike)',
      vehicleNumber: 'DL-04-XY-9876',
      terminal: 'T1',
      parkingLot: 'Premium Surface Parking - Terminal 1',
      startDate: '2026-08-08',
      durationHours: 24,
      slotNumber: 'T1-2W-Slot-18',
      amountPaid: 200,
      paymentStatus: 'SUCCESS',
      paymentMode: 'FASTag Auto-Debit',
      timestamp: '2026-08-08 07:15 IST',
      qrCode: 'PASS-T1-2W-DL04XY9876'
    }],
    vehicleLogs: [{
      id: 'ANPR-1092',
      timestamp: '2026-08-08 09:12 IST',
      hoursAgo: 0.2,
      vehicleNumber: 'DL-01-AB-1234',
      vehicleType: '4 Wheeler',
      parkingLot: 'Multi-Level Car Parking (MLCP) - Terminal 3',
      eventType: 'ENTRY',
      gateId: 'GATE-T3-ANPR-01',
      cameraSensor: 'CAM-T3-ENTRY-01 (HD 4K)',
      confidenceScore: '99.4%',
      status: 'INSIDE'
    }, {
      id: 'ANPR-1091',
      timestamp: '2026-08-08 08:45 IST',
      hoursAgo: 0.7,
      vehicleNumber: 'HR-26-DQ-5511',
      vehicleType: '4 Wheeler',
      parkingLot: 'Multi-Level Car Parking (MLCP) - Terminal 3',
      eventType: 'EXIT',
      gateId: 'GATE-T3-ANPR-02',
      cameraSensor: 'CAM-T3-EXIT-02 (HD 4K)',
      confidenceScore: '98.9%',
      status: 'LEFT'
    }, {
      id: 'ANPR-1090',
      timestamp: '2026-08-08 07:30 IST',
      hoursAgo: 2.0,
      vehicleNumber: 'DL-04-XY-9876',
      vehicleType: '2 Wheeler',
      parkingLot: 'Premium Surface Parking - Terminal 1',
      eventType: 'ENTRY',
      gateId: 'GATE-T1-ANPR-01',
      cameraSensor: 'CAM-T1-ENTRY-01 (HD 4K)',
      confidenceScore: '99.7%',
      status: 'INSIDE'
    }, {
      id: 'ANPR-1089',
      timestamp: '2026-08-08 05:15 IST',
      hoursAgo: 4.2,
      vehicleNumber: 'UP-16-BZ-7700',
      vehicleType: '4 Wheeler',
      parkingLot: 'Express Car Park - Terminal 2',
      eventType: 'ENTRY',
      gateId: 'GATE-T2-ANPR-01',
      cameraSensor: 'CAM-T2-ENTRY-01 (HD 4K)',
      confidenceScore: '99.1%',
      status: 'INSIDE'
    }, {
      id: 'ANPR-1088',
      timestamp: '2026-08-07 22:10 IST',
      hoursAgo: 11.3,
      vehicleNumber: 'DL-03-CC-4040',
      vehicleType: '4 Wheeler',
      parkingLot: 'VIP Valet Parking - T3 Departures',
      eventType: 'EXIT',
      gateId: 'GATE-T3-VALET-01',
      cameraSensor: 'CAM-T3-VALET-02 (HD 4K)',
      confidenceScore: '99.8%',
      status: 'LEFT'
    }, {
      id: 'ANPR-1087',
      timestamp: '2026-08-07 18:40 IST',
      hoursAgo: 14.8,
      vehicleNumber: 'HR-51-AK-1122',
      vehicleType: '4 Wheeler',
      parkingLot: 'Multi-Level Car Parking (MLCP) - Terminal 3',
      eventType: 'ENTRY',
      gateId: 'GATE-T3-ANPR-01',
      cameraSensor: 'CAM-T3-ENTRY-01 (HD 4K)',
      confidenceScore: '98.5%',
      status: 'INSIDE'
    }, {
      id: 'ANPR-1086',
      timestamp: '2026-08-07 12:00 IST',
      hoursAgo: 21.4,
      vehicleNumber: 'DL-08-EV-9900',
      vehicleType: '4 Wheeler',
      parkingLot: 'Multi-Level Car Parking (MLCP) - Terminal 3',
      eventType: 'EXIT',
      gateId: 'GATE-T3-ANPR-02',
      cameraSensor: 'CAM-T3-EXIT-02 (HD 4K)',
      confidenceScore: '99.9%',
      status: 'LEFT'
    }, {
      id: 'ANPR-1085',
      timestamp: '2026-08-06 15:30 IST',
      hoursAgo: 41.9,
      vehicleNumber: 'UK-07-TA-3344',
      vehicleType: '4 Wheeler',
      parkingLot: 'Express Car Park - Terminal 2',
      eventType: 'ENTRY',
      gateId: 'GATE-T2-ANPR-01',
      cameraSensor: 'CAM-T2-ENTRY-01 (HD 4K)',
      confidenceScore: '99.2%',
      status: 'INSIDE'
    }]
  },
  cabBookings: [{
    id: 'OLA-9081',
    passengerName: 'Aman Verma',
    mobile: '+91 9988776655',
    pickupPoint: 'Terminal 3 - Arrival Gate 4 (MLCP Taxi Hub)',
    dropLocation: 'Connaught Place, Central Delhi',
    cabCategory: 'Ola Sedan',
    fare: 450,
    status: 'REDIRECTED_TO_OLA',
    timestamp: '09:00 IST'
  }, {
    id: 'OLA-9082',
    passengerName: 'Dr. Meera Sen',
    mobile: '+91 9711224466',
    pickupPoint: 'Terminal 1 - Arrival Exit Gate 2',
    dropLocation: 'Cyber City, Gurugram',
    cabCategory: 'Ola SUV',
    fare: 680,
    status: 'REDIRECTED_TO_OLA',
    timestamp: '09:04 IST'
  }]
};
function loadDB() {
  try {
    const ver = localStorage.getItem('AEROSKY_DB_VERSION');
    if (ver !== DB_VERSION) {
      localStorage.removeItem(DB_KEY);
      localStorage.setItem('AEROSKY_DB_VERSION', DB_VERSION);
    }
  } catch(e) {}
  try {
    const d = localStorage.getItem(DB_KEY);
    if (d) {
      const parsed = JSON.parse(d);
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.terminals) && Array.isArray(parsed.flights)) {
        return {
          ...SEED,
          ...parsed,
          metrics: {
            ...SEED.metrics,
            ...(parsed.metrics || {})
          },
          terminals: parsed.terminals && parsed.terminals.length > 0 ? parsed.terminals : SEED.terminals,
          gates: parsed.gates && parsed.gates.length > 0 ? parsed.gates : SEED.gates,
          runways: parsed.runways && parsed.runways.length > 0 ? parsed.runways : SEED.runways,
          shops: parsed.shops && parsed.shops.length > 0 ? parsed.shops : SEED.shops,
          flights: parsed.flights && parsed.flights.length > 0 ? parsed.flights : SEED.flights,
          emergencies: (Array.isArray(parsed.emergencies) && parsed.emergencies.length > 0) ? parsed.emergencies : SEED.emergencies,
          wheelchairRequests: Array.isArray(parsed.wheelchairRequests) ? parsed.wheelchairRequests : SEED.wheelchairRequests,
          lostFoundItems: Array.isArray(parsed.lostFoundItems) ? parsed.lostFoundItems : SEED.lostFoundItems,
          auditLogs: Array.isArray(parsed.auditLogs) ? parsed.auditLogs : SEED.auditLogs,
          users: (() => {
            const list = Array.isArray(parsed.users) && parsed.users.length > 0 ? parsed.users : SEED.users;
            const hasMaster = list.some(u => u.email === 'admin@delhi.aai' || u.id === 'USR-001');
            return hasMaster ? list : [SEED.users[0], ...list];
          })(),
          cabBookings: Array.isArray(parsed.cabBookings) ? parsed.cabBookings : SEED.cabBookings,
          parkingData: {
            ...SEED.parkingData,
            ...(typeof parsed.parkingData === 'object' ? parsed.parkingData : {}),
            lots: parsed.parkingData?.lots && Array.isArray(parsed.parkingData.lots) ? parsed.parkingData.lots : SEED.parkingData.lots,
            rates: parsed.parkingData?.rates || SEED.parkingData.rates,
            reservations: Array.isArray(parsed.parkingData?.reservations) ? parsed.parkingData.reservations : SEED.parkingData.reservations,
            vehicleLogs: parsed.parkingData?.vehicleLogs && Array.isArray(parsed.parkingData.vehicleLogs) ? parsed.parkingData.vehicleLogs : SEED.parkingData.vehicleLogs
          }
        };
      }
    }
  } catch (e) {
    console.warn("Corrupted localStorage detected, resetting key", e);
    try {
      localStorage.removeItem(DB_KEY);
    } catch (err) {}
  }
  const fresh = JSON.parse(JSON.stringify(SEED));
  try {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(fresh));
    } catch (e) {}
  } catch (e) {}
  return fresh;
}
function saveDB(db) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (e) {}
}

// ═══════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════
// AI CHAT BOT ASSISTANT COMPONENT
// ═══════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════
// FLOATING WAIT TIMES BAR COMPONENT
// ═══════════════════════════════════════════════════════
function FloatingWaitTimesBar({
  activeAirport
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [waitData] = useState({
    T3: {
      security: 12,
      checkin: 9,
      digiyatra: 2,
      immigration: 14,
      status: 'Moderate'
    },
    T2: {
      security: 8,
      checkin: 6,
      digiyatra: 1,
      immigration: 0,
      status: 'Low Wait'
    },
    T1: {
      security: 15,
      checkin: 11,
      digiyatra: 3,
      immigration: 0,
      status: 'Peak Flow'
    }
  });
  const getBadgeStyle = minutes => {
    if (minutes <= 5) return {
      background: 'rgba(16, 185, 129, 0.2)',
      color: '#34d399',
      border: '1px solid rgba(52, 211, 153, 0.4)'
    };
    if (minutes <= 12) return {
      background: 'rgba(245, 158, 11, 0.2)',
      color: '#fbbf24',
      border: '1px solid rgba(251, 191, 36, 0.4)'
    };
    return {
      background: 'rgba(239, 68, 68, 0.2)',
      color: '#f87171',
      border: '1px solid rgba(248, 113, 113, 0.4)'
    };
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "floating-wait-times-bar",
    style: {
      margin: '0.75rem 1.5rem 0.25rem 1.5rem',
      padding: '0.6rem 1.25rem',
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
      gap: '1rem',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: '#10b981',
      boxShadow: '0 0 10px #10b981',
      animation: 'pulse 2s infinite'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: '0.85rem',
      color: '#f8fafc',
      letterSpacing: '0.02em'
    }
  }, "\u23F1\uFE0F Live Terminal Queue Telemetry:"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--brand-cyan)',
      fontWeight: 600
    }
  }, activeAirport ? activeAirport.code : 'DEL')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
      flexWrap: 'wrap'
    }
  }, Object.entries(waitData).map(([term, data]) => /*#__PURE__*/React.createElement("div", {
    key: term,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
      fontSize: '0.8rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      color: 'var(--text-primary)'
    }
  }, term, ":"), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '0.15rem 0.5rem',
      borderRadius: '6px',
      fontSize: '0.75rem',
      fontWeight: 700,
      ...getBadgeStyle(data.security)
    }
  }, "Sec ", data.security, "m"), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '0.15rem 0.5rem',
      borderRadius: '6px',
      fontSize: '0.75rem',
      fontWeight: 700,
      background: 'rgba(6, 182, 212, 0.15)',
      color: '#38bdf8',
      border: '1px solid rgba(56, 189, 248, 0.3)'
    }
  }, "\uD83D\uDE80 DigiYatra ", data.digiyatra, "m")))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.75rem',
      padding: '0.25rem 0.65rem',
      borderRadius: '6px'
    },
    onClick: () => setIsExpanded(!isExpanded)
  }, isExpanded ? 'Hide Details ▲' : 'View Breakdown ▼'), isExpanded && /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      marginTop: '0.5rem',
      paddingTop: '0.75rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '0.75rem'
    }
  }, Object.entries(waitData).map(([term, data]) => /*#__PURE__*/React.createElement("div", {
    key: term,
    style: {
      background: 'rgba(255, 255, 255, 0.03)',
      padding: '0.6rem 0.8rem',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: 'var(--brand-cyan)',
      marginBottom: '0.3rem',
      fontSize: '0.85rem'
    }
  }, term, " Full Terminal Wait Times"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0.2rem 0'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Security Checkpoint:"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, data.security, " mins")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0.2rem 0'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Airline Check-In:"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, data.checkin, " mins")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0.2rem 0'
    }
  }, /*#__PURE__*/React.createElement("span", null, "DigiYatra Express:"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: '#38bdf8'
    }
  }, data.digiyatra, " mins")), data.immigration > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0.2rem 0'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Immigration Control:"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, data.immigration, " mins"))))));
}
function AeroSkyAiBot({
  db,
  setActiveTab,
  activeAirport,
  isAdmin
}) {
  const [isOpen, setIsOpen] = useState(false);
  const GEMINI_PERMANENT_KEY = 'AIzaSyBO-J7oWdntnLA5-eBc8O4RblnVkWXNEos';
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
  const aptCode = activeAirport?.code || 'DEL';
  const [messages, setMessages] = useState([{
    id: 'welcome-1',
    sender: 'bot',
    text: `👋 Namaste! I'm **AeroSky ✈️✨**, your cute 3D AI Flight & Airport Buddy for **${aptName} (${aptCode})**!\n\nI am powered by **Google Gemini 1.5 Pro AI**! Ask me about live flights, parking charges, Delhi Metro, Ola cabs, math, science, travel tips, or general trivia!`,
    timestamp: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    }),
    quickActions: [{
      label: '✈️ Flight Status',
      query: 'What is my flight status?'
    }, {
      label: '🅿️ Parking Charges',
      query: 'How much are the car parking rates?'
    }, {
      label: '🚇 Metro Timings',
      query: 'When is the next Delhi Metro train?'
    }, {
      label: '🚕 Book Ola Cab',
      query: 'How do I book an Ola Cab?'
    }, {
      label: '🧠 General Knowledge',
      query: 'What is the speed of light?'
    }]
  }]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async textToSend => {
    const query = (textToSend || inputMsg).trim();
    if (!query) return;
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');
    setIsTyping(true);

    try {
      const apiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_PERMANENT_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are AeroSky ✈️✨, an intelligent airport AI assistant for ${aptName} (${aptCode}). Answer this user question accurately, helpfully and politely: ${query}`
            }]
          }]
        })
      });
      const data = await apiRes.json();
      const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setIsTyping(false);
      if (replyText) {
        setMessages(prev => [...prev, {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `✨ **AeroSky (Gemini AI)**:\n\n${replyText}`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        }]);
        return;
      }
    } catch (err) {
      console.warn("API Call Error, falling back to Universal Engine", err);
    }
    setTimeout(() => {
      const botResponse = generateUniversalAiAnswer(query, db, setActiveTab, aptName, aptCode);
      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    }, 900);
  };
  const generateUniversalAiAnswer = (q, db, setActiveTab, aptName, aptCode) => {
    const qLower = q.toLowerCase();
    const nowTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    if (qLower.match(/\d+\s*[\+\-\*/]\s*\d+/) || qLower.includes('calculate') || qLower.includes('math') || qLower.includes('plus') || qLower.includes('minus')) {
      try {
        const expr = q.replace(/[^0-9\+\-\*/\.\(\)]/g, '');
        if (expr) {
          const res = Function(`"use strict"; return (${expr})`)();
          return {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `🧮 **AeroSky Math Calculator**:\n\n` + `${expr} = ${res}`,
            timestamp: nowTime
          };
        }
      } catch (e) {}
    }
    if (qLower.includes('flight') || qLower.includes('gate') || qLower.includes('status') || qLower.includes('terminal')) {
      const topFlight = db?.flights?.[0] || {
        flightNumber: 'AI-101',
        destination: 'London (LHR)',
        status: 'Boarding',
        gate: 'T3-G42',
        scheduledTime: '14:30'
      };
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `✈️ **Live Flight Status — ${aptName} (${aptCode})**\n\n• **Active Flights Monitored**: ${db?.metrics?.activeFlights || 142} Flights\n• **On-Time Performance**: ${db?.metrics?.onTimePerf || '94.2%'}\n• **Sample Flight**: ${topFlight.flightNumber} to ${topFlight.destination} is **${topFlight.status}** at **Gate ${topFlight.gate || 'T3-G42'}** (${topFlight.scheduledTime}).`,
        timestamp: nowTime,
        actionBtn: {
          label: '📋 Open Live Flight Board',
          tab: 'flights'
        }
      };
    }
    if (qLower.includes('parking') || qLower.includes('car') || qLower.includes('rate') || qLower.includes('slot') || qLower.includes('park')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `🅿️ **Car Parking Rates & AI ANPR Availability**\n\n• **4-Wheeler (Car/SUV)**: ₹120 (0-30m) | ₹250 (1-2h) | ₹400 (2-4h) | ₹600 (Daily)\n• **2-Wheeler**: ₹30 (1h) | ₹60 (2h) | ₹100 (4h) | ₹200 (Daily)\n• **Locations**: MLCP T3, T2 & T1 Surface Parking.\n• **Features**: FASTag Auto-Debit & 48h AI Vehicle Entry Logs.`,
        timestamp: nowTime,
        actionBtn: {
          label: '🎟️ Reserve Parking Slot Now',
          tab: 'carParking'
        }
      };
    }
    if (qLower.includes('metro') || qLower.includes('train') || qLower.includes('orange line')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `🚇 **Delhi Metro Express Line (Orange Line)**\n\n• **Airport Station**: Connected directly via underground concourse to T3.\n• **Next Departure**: ⏱️ **2 mins** (Frequency: Every 10 mins)\n• **ETAs & Fares**: Aerocity 3m (₹20) | Dhaula Kuan 11m (₹40) | New Delhi Station 19m (₹60).`,
        timestamp: nowTime,
        actionBtn: {
          label: '🚆 View Ground Transit Map',
          tab: 'map'
        }
      };
    }
    if (qLower.includes('ola') || qLower.includes('cab') || qLower.includes('taxi') || qLower.includes('ride')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `🚕 **Ola Airport Cab Booking**\n\n• **Pickup Zone**: T3 MLCP Level 2 Cab Hub & T1 Express Pickup Lane 3.\n• **Options**: Ola Mini (₹350 est), Sedan (₹450 est), SUV Prime (₹650 est).\n• **Google Maps**: Live location search integrated.`,
        timestamp: nowTime,
        actionBtn: {
          label: '🚕 Open Ola Cab Booking',
          tab: 'olaCab'
        }
      };
    }
    if (qLower.includes('digiyatra') || qLower.includes('face') || qLower.includes('biometric')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `🪪 **DigiYatra Face Recognition Entry**\n\n• Skip queues using paperless face ID gates at T3 & T1 Departure Gates 1, 2, 3.\n• Clearance Time: Under 5 seconds!`,
        timestamp: nowTime,
        actionBtn: {
          label: '🪪 View DigiYatra Pass',
          tab: 'digiyatra'
        }
      };
    }
    if (qLower.includes('wheelchair') || qLower.includes('handicap') || qLower.includes('assistance')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `♿ **PRM Wheelchair & Mobility Assistance**\n\n• Free wheelchair assistants available at all Terminal Curbsides.\n• Dispatch Time: 4 mins average.`,
        timestamp: nowTime,
        actionBtn: {
          label: '♿ Request Wheelchair Assistance',
          tab: 'wheelchair'
        }
      };
    }
    if (qLower.includes('who created') || qLower.includes('who made') || qLower.includes('what are you') || qLower.includes('who are you')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `✈️✨ I am **AeroSky**, your 3D Animated AI Flight & Airport Assistant! I am trained on general world knowledge and smart airport telemetry for ${aptName} (${aptCode}).`,
        timestamp: nowTime
      };
    }
    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `✈️✨ **AeroSky Universal AI Assistant**:\n\nI can answer **ANY question in the world**!\n\n• Ask about flights, gates, parking charges, or Ola cabs.\n• Ask general knowledge questions (math, science, geography, trivia).`,
      timestamp: nowTime
    };
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "ai-bot-floating-container"
  }, isOpen && /*#__PURE__*/React.createElement("div", {
    className: "ai-bot-drawer"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0.9rem 1rem',
      background: 'linear-gradient(135deg, #002B5C 0%, #001530 100%)',
      color: '#fff',
      display: 'flex',
      justify: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid rgba(0, 242, 254, 0.3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #00f2fe, #0284c7)',
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      boxShadow: '0 0 10px rgba(0, 242, 254, 0.6)'
    }
  }, "\u2708\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: '0.95rem',
      color: '#fff'
    }
  }, "AeroSky \u2708\uFE0F\u2728"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.68rem',
      color: 'var(--accent-cyan)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: '#10b981',
      display: 'inline-block'
    }
  }), "Cute AI Flight & Airport Buddy \u2022 ", aptCode))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.3rem'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      padding: '0.2rem 0.5rem',
      fontSize: '0.85rem',
      color: '#fff',
      borderColor: 'rgba(255,255,255,0.2)'
    },
    onClick: () => setIsOpen(false)
  }, "\u2715"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '1rem',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.85rem',
      background: 'rgba(0,0,0,0.15)'
    }
  }, messages.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    style: {
      alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
      maxWidth: '88%',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.3rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0.75rem 0.9rem',
      borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
      background: m.sender === 'user' ? 'linear-gradient(135deg, #00f2fe, #0284c7)' : 'rgba(255,255,255,0.08)',
      color: m.sender === 'user' ? '#000' : 'var(--text-main)',
      border: m.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.1)',
      fontSize: '0.82rem',
      lineHeight: '1.45',
      boxShadow: m.sender === 'user' ? '0 4px 12px rgba(0,242,254,0.3)' : '0 2px 8px rgba(0,0,0,0.2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      whiteSpace: 'pre-wrap',
      fontWeight: m.sender === 'user' ? 600 : 400
    }
  }, m.text), m.actionBtn && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      marginTop: '0.6rem',
      width: '100%',
      fontSize: '0.75rem',
      padding: '0.45rem',
      fontWeight: 800,
      justify: 'center'
    },
    onClick: () => {
      setActiveTab(m.actionBtn.tab);
      setIsOpen(false);
    }
  }, m.actionBtn.label, " \u2192")), m.quickActions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.35rem',
      marginTop: '0.3rem'
    }
  }, m.quickActions.map((qa, idx) => /*#__PURE__*/React.createElement("button", {
    key: idx,
    className: "btn btn-secondary",
    style: {
      fontSize: '0.68rem',
      padding: '0.25rem 0.55rem',
      borderRadius: '12px',
      borderColor: 'rgba(0,242,254,0.4)',
      color: 'var(--accent-cyan)',
      background: 'rgba(0,242,254,0.06)'
    },
    onClick: () => handleSendMessage(qa.query)
  }, qa.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.62rem',
      color: 'var(--text-muted)',
      alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
      padding: '0 0.2rem'
    }
  }, m.timestamp))), isTyping && /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'flex-start',
      padding: '0.6rem 0.9rem',
      borderRadius: '16px 16px 16px 2px',
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
      fontSize: '0.75rem',
      color: 'var(--accent-cyan)'
    }
  }, "\u2708\uFE0F\u2728 AeroSky is thinking..."), /*#__PURE__*/React.createElement("div", {
    ref: messagesEndRef
  })), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      handleSendMessage();
    },
    style: {
      padding: '0.75rem',
      background: 'rgba(0,0,0,0.3)',
      borderTop: '1px solid var(--border-color)',
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "Ask AeroSky any question in the world...",
    value: inputMsg,
    onChange: e => setInputMsg(e.target.value),
    style: {
      fontSize: '0.8rem',
      padding: '0.6rem 0.8rem',
      borderRadius: '20px'
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      borderRadius: '50%',
      width: '38px',
      height: '38px',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      fontSize: '1rem',
      flexShrink: 0
    },
    title: "Send Message"
  }, "\uD83D\uDE80"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "ai-3d-bot-launcher",
    onClick: () => setIsOpen(!isOpen),
    title: "Open AeroSky 3D AI Assistant"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cute-sparkle-badge"
  }, "AeroSky"), /*#__PURE__*/React.createElement("svg", {
    width: "42",
    height: "42",
    viewBox: "0 0 100 100",
    fill: "none"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "planeGrad1",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#ffffff"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "50%",
    stopColor: "#00f2fe"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#0284c7"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "wingGrad1",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "0%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#f59e0b"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#ec4899"
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "44",
    stroke: "#00f2fe",
    strokeWidth: "2.5",
    strokeDasharray: "8 6",
    opacity: "0.85"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "22",
    cy: "72",
    r: "4.5",
    fill: "#f59e0b"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "78",
    r: "3",
    fill: "#00f2fe"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M78 22 C82 18, 86 20, 82 26 L56 52 L54 78 L44 84 L46 62 L26 82 L18 80 L32 54 L14 44 L18 36 L40 44 L64 20 Z",
    fill: "url(#planeGrad1)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M52 46 L76 22 L68 18 L44 38 Z",
    fill: "url(#wingGrad1)",
    opacity: "0.9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "68",
    cy: "30",
    r: "2.5",
    fill: "#10b981"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "73",
    cy: "27",
    r: "2.5",
    fill: "#10b981"
  })))));
}

// -------------------------------------------------------------
// -------------------------------------------------------------
// 📁 LOCAL DISK DATABASE SYNC ENGINE (LocalStorage + CSV & JSON)
// -------------------------------------------------------------

async function fetchCloudDatabase() {
  try {
    const res = await fetch('/api/db');
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.users) && data.users.length > 0) {
        console.log('📁 Loaded database state from Local Disk Engine!');
        return data;
      }
    }
  } catch (err) {}
  return null;
}

async function syncCloudDatabase(dbData) {
  if (!dbData) return;
  try {
    await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: dbData })
    });
    console.log('💾 Database state synced to Local Disk Engine!');
  } catch(e) {}

  if (dbData && dbData.users) {
    syncMongoDBData(dbData.users);
    syncCSVData(dbData.users);
  }
}


function App() {
  const [db, setDb] = useState(loadDB());
  const [lang, setLang] = useState('en');
  const [activeAirport, setActiveAirport] = useState(() => {
    try {
      const saved = localStorage.getItem('AEROSKY_ACTIVE_AIRPORT');
      if (saved) {
        const parsed = JSON.parse(saved);
        const match = AAI_AIRPORTS.find(a => a.code === parsed.code);
        if (match) return match;
      }
    } catch(e) {}
    return AAI_AIRPORTS[0];
  });
  const [isGpsDetected, setIsGpsDetected] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toasts, setToasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('AEROSKY_CURRENT_USER');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch(e) { return null; }
  });

  useEffect(() => {
    try {
      if (activeAirport) localStorage.setItem('AEROSKY_ACTIVE_AIRPORT', JSON.stringify(activeAirport));
    } catch(e) {}
  }, [activeAirport]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('AEROSKY_CURRENT_USER', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('AEROSKY_CURRENT_USER');
      }
    } catch(e) {}
  }, [currentUser]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showWheelchairModal, setShowWheelchairModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const t = key => TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;
  useEffect(() => {
    saveDB(db);
  }, [db]);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const detectDeviceLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const uLat = pos.coords.latitude;
        const uLon = pos.coords.longitude;
        let closest = AAI_AIRPORTS[0];
        let minDist = Infinity;
        AAI_AIRPORTS.forEach(apt => {
          const dist = getDistanceKm(uLat, uLon, apt.lat, apt.lon);
          if (dist < minDist) {
            minDist = dist;
            closest = {
              ...apt,
              distKm: dist
            };
          }
        });
        setActiveAirport(closest);
        setIsGpsDetected(true);
        addToast(`📍 GPS Auto-Detected: Nearest AAI Airport is ${closest.name} (${closest.code}) — ${closest.distKm} km away.`, 'success');
      }, err => {
        console.log("Geolocation fallback to Delhi", err);
      }, {
        timeout: 8000
      });
    }
  }, []);
  useEffect(() => {
    detectDeviceLocation();
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setDb(prev => ({
        ...prev,
        metrics: {
          ...prev.metrics,
          passengersToday: prev.metrics.passengersToday + Math.floor(Math.random() * 3),
          bagsProcessed: prev.metrics.bagsProcessed + Math.floor(Math.random() * 2)
        }
      }));
    }, 5000);
    return () => clearInterval(timer);
  }, [detectDeviceLocation]);

  // Sync with Cloud DB on load & state updates
  useEffect(() => {
    fetchCloudDatabase().then(cloudDb => {
      if (cloudDb && Array.isArray(cloudDb.users) && cloudDb.users.length > 0) {
        setDb(prev => {
          const existingEmails = new Set((prev?.users || []).map(u => u.email));
          const newUsers = cloudDb.users.filter(u => !existingEmails.has(u.email));
          const mergedUsers = [...(prev?.users || []), ...newUsers];
          
          const merged = {
            ...prev,
            users: mergedUsers,
            fleetHealth: (Array.isArray(cloudDb.fleetHealth) && cloudDb.fleetHealth.length > 0) ? cloudDb.fleetHealth : prev.fleetHealth,
            lostFoundItems: (Array.isArray(cloudDb.lostFoundItems) && cloudDb.lostFoundItems.length > 0) ? cloudDb.lostFoundItems : prev.lostFoundItems,
            lostFoundClaims: (Array.isArray(cloudDb.lostFoundClaims) && cloudDb.lostFoundClaims.length > 0) ? cloudDb.lostFoundClaims : prev.lostFoundClaims,
            cabBookings: (Array.isArray(cloudDb.cabBookings) && cloudDb.cabBookings.length > 0) ? cloudDb.cabBookings : prev.cabBookings,
            wheelchairRequests: (Array.isArray(cloudDb.wheelchairRequests) && cloudDb.wheelchairRequests.length > 0) ? cloudDb.wheelchairRequests : prev.wheelchairRequests,
            emergencyAlerts: (Array.isArray(cloudDb.emergencyAlerts) && cloudDb.emergencyAlerts.length > 0) ? cloudDb.emergencyAlerts : prev.emergencyAlerts
          };
          try { localStorage.setItem(DB_KEY, JSON.stringify(merged)); } catch(e){}
          return merged;
        });
      }
    });
  }, []);

  // Sync to Cloud DB on db state changes
  useEffect(() => {
    syncCloudDatabase(db); try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch(e){}
  }, [db.users, db.cabBookings, db.wheelchairRequests, db.emergencyAlerts]);
  const addToast = (msg, type = 'info') => {
    const id = Date.now();
    setToasts(p => [...p, {
      id,
      msg,
      type
    }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  };
  const appendAuditLog = (action, details) => {
    const log = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleString() + ' IST',
      actor: currentUser ? `${currentUser.name} (${currentUser.role})` : 'Anonymous',
      action,
      details
    };
    setDb(prev => ({
      ...prev,
      auditLogs: [log, ...prev.auditLogs]
    }));
  };

  // Auth System with 2-Step Face Verification Password Reset (No OTP)
  const [authMode, setAuthMode] = useState('staff'); // 'staff' | 'admin' | 'register' | 'forgot'
  const [loginForm, setLoginForm] = useState({
    identifier: '',
    password: ''
  });
  const [regForm, setRegForm] = useState({
    name: '',
    employeeId: '',
    email: '',
    mobile: '',
    role: 'Ground and Terminal Operations',
    designation: '',
    password: '',
    confirmPassword: ''
  });
  const [forgotState, setForgotState] = useState({
    step: 1,
    // 1: ID & Proof, 2: Face Capture, 3: Password Set (if approved)
    identifier: '',
    docName: '',
    faceData: null,
    captured: false,
    newPassword: ''
  });
  const handleStaffLogin = e => {
    e.preventDefault();
    const idClean = loginForm.identifier.toLowerCase().trim();
    const found = db.users.find(u => (u.email.toLowerCase() === idClean || u.employeeId && u.employeeId.toLowerCase() === idClean) && u.password === loginForm.password);
    if (!found) {
      addToast('Invalid Staff Credentials', 'danger');
      return;
    }
    const staffRoles = ['Ground and Terminal Operations', 'Air Traffic Control and Flight Operations', 'Security and Safety', 'Customer Service', 'Staff', 'Admin'];
    if (!staffRoles.includes(found.role)) {
      addToast('Only Staff accounts can log in here', 'danger');
      return;
    }
    if (found.status === 'BLOCKED') {
      addToast('🛑 Account is BLOCKED by Admin. Contact AAI Master Admin to unblock.', 'danger');
      return;
    }
    if (found.status === 'PENDING_APPROVAL' || found.status === 'PENDING_RESET_APPROVAL') {
      addToast('⚠️ Account Pending Admin Approval! AAI Master Admin must approve your request before login.', 'warning');
      return;
    }
    if (found.status === 'PENDING_DOCUMENTS') {
      addToast('⚠️ Verification Documents Required! Please submit your official ID to Master Admin.', 'warning');
      return;
    }
    if (found.status === 'REJECTED') {
      addToast('🛑 Registration Rejected. Contact AAI Master Admin.', 'danger');
      return;
    }
    setCurrentUser(found);
    setShowAuthModal(false);
    setLoginForm({
      identifier: '',
      password: ''
    });
    appendAuditLog('STAFF_LOGIN', `${found.name} (${found.role}) logged in.`);
    addToast(`Welcome Staff Member, ${found.name}!`, 'success');
  };
  const handleAdminLogin = e => {
    e.preventDefault();
    const idClean = loginForm.identifier.toLowerCase().trim();
    const found = db.users.find(u => (u.email.toLowerCase() === idClean || u.employeeId && u.employeeId.toLowerCase() === idClean) && u.password === loginForm.password);
    if (!found || found.role !== 'Admin') {
      addToast('Invalid Admin Credentials', 'danger');
      return;
    }
    setCurrentUser(found);
    setShowAuthModal(false);
    setLoginForm({
      identifier: '',
      password: ''
    });
    appendAuditLog('ADMIN_LOGIN', `${found.name} logged in as Master Admin.`);
    addToast(`Welcome AAI Master Admin, ${found.name}!`, 'success');
  };
  const handleRegister = e => {
    e.preventDefault();
    if (regForm.password !== regForm.confirmPassword) {
      addToast('Passwords do not match', 'warning');
      return;
    }
    if (db.users.some(u => u.email.toLowerCase() === regForm.email.toLowerCase().trim())) {
      addToast('Email already registered', 'warning');
      return;
    }
    const newUser = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: regForm.name,
      email: regForm.email,
      mobile: regForm.mobile,
      employeeId: regForm.employeeId || `STF-DEL-${Date.now().toString().slice(-3)}`,
      role: regForm.role || 'Ground and Terminal Operations',
      designation: regForm.designation || 'Operations Specialist',
      password: regForm.password,
      status: 'PENDING_APPROVAL'
    };
    setDb(prev => ({
      ...prev,
      users: [...prev.users, newUser]
    }));
    appendAuditLog('USER_REGISTER', `New Staff registration submitted: ${newUser.name} (${newUser.email})`);
    addToast('Registration Submitted! Your account is PENDING ADMIN APPROVAL before first login.', 'success');
    setAuthMode('staff');
    setLoginForm({
      identifier: newUser.email,
      password: ''
    });
  };
  const handleForgotStep1 = e => {
    e.preventDefault();
    const idClean = forgotState.identifier.toLowerCase().trim();
    const found = db.users.find(u => u.email.toLowerCase() === idClean || u.mobile === idClean || u.employeeId && u.employeeId.toLowerCase() === idClean);
    if (!found) {
      addToast('No account found with this Email / Mobile / Employee ID', 'danger');
      return;
    }
    if (found.status === 'BLOCKED') {
      addToast('🛑 Account is BLOCKED by Admin. Contact AAI Master Admin to unblock.', 'danger');
      return;
    }
    if (found.status === 'RESET_APPROVED') {
      setForgotState(prev => ({
        ...prev,
        step: 3
      }));
      addToast('✅ Verification approved by Admin! Enter your new password below.', 'success');
      return;
    }
    setForgotState(prev => ({
      ...prev,
      step: 2
    }));
    addToast('Identity details verified! Proceed to Live Face Scan Capture.', 'info');
  };
  const handleCaptureFace = () => {
    setForgotState(prev => ({
      ...prev,
      captured: true,
      faceData: 'VERIFIED_BIOMETRIC_FACE_SNAPSHOT'
    }));
    addToast('📸 Live Biometric Face Snapshot Captured & Encrypted!', 'success');
  };
  const handleForgotSubmitRequest = e => {
    e.preventDefault();
    if (!forgotState.captured) {
      addToast('Please capture your live face scan before submitting', 'warning');
      return;
    }
    const idClean = forgotState.identifier.toLowerCase().trim();
    setDb(prev => ({
      ...prev,
      users: prev.users.map(u => u.email.toLowerCase() === idClean || u.mobile === idClean || u.employeeId && u.employeeId.toLowerCase() === idClean ? {
        ...u,
        status: 'PENDING_RESET_APPROVAL',
        resetRequest: {
          identifier: forgotState.identifier,
          docName: forgotState.docName || 'AAI Employee Badge',
          faceCaptured: true,
          timestamp: new Date().toLocaleString() + ' IST'
        }
      } : u)
    }));
    appendAuditLog('PASSWORD_RESET_SUBMIT', `Submitted 2-Step Reset request with Face Capture for ${forgotState.identifier}`);
    addToast('🔑 Request & Face Scan sent to AAI Master Admin! Account will unlock for password change upon Admin Approval.', 'success');
    setShowAuthModal(false);
    setForgotState({
      step: 1,
      identifier: '',
      docName: '',
      faceData: null,
      captured: false,
      newPassword: ''
    });
  };
  const handleResetPasswordFinal = e => {
    e.preventDefault();
    if (!forgotState.newPassword) {
      addToast('Password cannot be empty', 'warning');
      return;
    }
    const idClean = forgotState.identifier.toLowerCase().trim();
    setDb(prev => ({
      ...prev,
      users: prev.users.map(u => u.email.toLowerCase() === idClean || u.mobile === idClean || u.employeeId && u.employeeId.toLowerCase() === idClean ? {
        ...u,
        password: forgotState.newPassword,
        status: 'APPROVED',
        resetRequest: null
      } : u)
    }));
    appendAuditLog('PASSWORD_RESET_COMPLETE', `Password updated & account activated for ${forgotState.identifier}`);
    addToast('✅ Password changed successfully! You can now log in with your new password.', 'success');
    setAuthMode('staff');
    setLoginForm({
      identifier: forgotState.identifier,
      password: forgotState.newPassword
    });
    setForgotState({
      step: 1,
      identifier: '',
      docName: '',
      faceData: null,
      captured: false,
      newPassword: ''
    });
  };

  // Password Change Self Handler (For logged in Staff / Admin)
  const [showPwdSection, setShowPwdSection] = useState(false);
  const [changePwdForm, setChangePwdForm] = useState({
    currentPwd: '',
    newPwd: '',
    confirmPwd: ''
  });
  const handleChangeOwnPassword = e => {
    e.preventDefault();
    if (!currentUser) return;
    if (changePwdForm.currentPwd !== currentUser.password) {
      addToast('Incorrect Current Password', 'danger');
      return;
    }
    if (!changePwdForm.newPwd || changePwdForm.newPwd.length < 3) {
      addToast('New Password must be at least 3 characters long', 'warning');
      return;
    }
    if (changePwdForm.newPwd !== changePwdForm.confirmPwd) {
      addToast('New Passwords do not match', 'danger');
      return;
    }
    const updatedUsers = db.users.map(u => u.id === currentUser.id ? {
      ...u,
      password: changePwdForm.newPwd
    } : u);
    setDb(prev => ({
      ...prev,
      users: updatedUsers
    }));
    setCurrentUser(prev => ({
      ...prev,
      password: changePwdForm.newPwd
    }));
    appendAuditLog('PASSWORD_CHANGE_SELF', `${currentUser.name} (${currentUser.role}) updated their account password.`);
    addToast('✅ Password changed successfully!', 'success');
    setChangePwdForm({
      currentPwd: '',
      newPwd: '',
      confirmPwd: ''
    });
    setShowPwdSection(false);
  };

  // Wheelchair
  const [wcForm, setWcForm] = useState({
    passengerName: '',
    airlineName: 'Air India',
    pnrNumber: '',
    mobileNumber: ''
  });
  const handleWcSubmit = e => {
    e.preventDefault();
    const req = {
      id: `WC-${Date.now().toString().slice(-3)}`,
      ...wcForm,
      timestamp: new Date().toLocaleTimeString() + ' IST',
      status: 'DISPATCHED'
    };
    setDb(prev => ({
      ...prev,
      wheelchairRequests: [req, ...prev.wheelchairRequests]
    }));
    appendAuditLog('WHEELCHAIR_DISPATCH', `Wheelchair for ${wcForm.passengerName}`);
    setShowWheelchairModal(false);
    setWcForm({
      passengerName: '',
      airlineName: 'Air India',
      pnrNumber: '',
      mobileNumber: ''
    });
    addToast('♿ Wheelchair Dispatched!', 'success');
  };
    const isAdmin = currentUser?.role === 'Admin';
  const isGroundOps = currentUser?.role === 'Ground and Terminal Operations' || currentUser?.role === 'Staff';
  const isAtcOps = currentUser?.role === 'Air Traffic Control and Flight Operations';
  const isSecurityOps = currentUser?.role === 'Security and Safety';
  const isCustomerOps = currentUser?.role === 'Customer Service';
  const isStaff = isAdmin || isGroundOps || isAtcOps || isSecurityOps || isCustomerOps;
  const isStaffOrAdmin = isAdmin || isStaff;

  const canManageFlights = isAdmin || isGroundOps || isAtcOps;
  const canManageEmergencies = isAdmin || isAtcOps || isSecurityOps;
  const canAccessCctv = isAdmin || isSecurityOps || isAtcOps;
  const canAccessFleetHealth = isAdmin || isStaffOrAdmin || isGroundOps || isAtcOps;
  const canAccessDutyRoster = isAdmin || isStaffOrAdmin || isStaff;
  const canManageCctv = isAdmin || isSecurityOps;
  const canManageLostFound = isAdmin || isGroundOps || isCustomerOps;
  const canManageParking = isAdmin || isGroundOps || isCustomerOps;
  const canManageCabs = isAdmin || isGroundOps || isCustomerOps;
  const canManageBaggage = isAdmin || isGroundOps || isCustomerOps;
  const canManageWheelchair = isAdmin || isGroundOps || isCustomerOps;
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const sidebarItems = [{
    key: 'dashboard',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "7",
      height: "9"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "3",
      width: "7",
      height: "5"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "12",
      width: "7",
      height: "9"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "16",
      width: "7",
      height: "5"
    })),
    label: t('dashboard')
  }, {
    key: 'map',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("polygon", {
      points: "3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "9",
      y1: "3",
      x2: "9",
      y2: "18"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "15",
      y1: "6",
      x2: "15",
      y2: "21"
    })),
    label: t('airportMap')
  }, {
    key: 'flights',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l6 4-4 4-2.8-.9c-.4-.1-.8.1-1 .5L1 17l4 2.2L7.2 23l1.4-.2c.4-.2.6-.6.5-1l-.9-2.8 4-4 4 6l1.2-.7c.4-.2.7-.6.6-1.1z"
    })),
    label: t('flightFids')
  }, {
    key: 'gates',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 22v-9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M15.17 2.38a1 1 0 0 0-1.06.66l-2.07 6A1 1 0 0 1 11.1 9.7l-4.58-1a1 1 0 0 0-1.18.77l-1 4.54a1 1 0 0 0 .78 1.18l4.58 1a1 1 0 0 1 .66 1.05l-2 6a1 1 0 0 0 1 1.3h4a1 1 0 0 0 .95-.68l2.06-6a1 1 0 0 1 .95-.66h5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-4a1 1 0 0 1-1-.68l-1.06-3a1 1 0 0 0-1.9-.3z"
    })),
    label: t('intelligentGates')
  }, {
    key: 'carParking',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "2",
      y: "5",
      width: "20",
      height: "14",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 17V7h4a3 3 0 0 1 0 6H9"
    })),
    label: t('carParking')
  }, {
    key: 'cabBooking',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2 11 2 11.3 2 11.6V16c0 .6.4 1 1 1h2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "7",
      cy: "17",
      r: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "17",
      cy: "17",
      r: "2"
    })),
    label: t('cabBooking')
  }, {
    key: 'emergency',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M2 12h4l2-9 5 18 3-9h6"
    })),
    label: t('emergencies')
  }, {
    key: 'baggage',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 7h-3V4c0-1.1-.9-2-2-2h-6c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 7V4h6v3"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "11",
      x2: "8",
      y2: "18"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "16",
      y1: "11",
      x2: "16",
      y2: "18"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "11",
      x2: "12",
      y2: "18"
    })),
    label: t('baggage')
  }, {
    key: 'lostFound',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "8"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "21",
      y1: "21",
      x2: "16.65",
      y2: "16.65"
    })),
    label: t('lostFound')
  }, {
    key: 'wheelchair',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "8",
      cy: "16",
      r: "5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M15 19H8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 11h6.5a2.5 2.5 0 0 1 0 5H13"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 5h3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 5v6"
    })),
    label: t('wheelchair')
  }];

  if (canAccessFleetHealth) {
    sidebarItems.push({
      key: 'fleetHealth',
      icon: /*#__PURE__*/React.createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2"
      }, /*#__PURE__*/React.createElement("rect", {
        x: "4",
        y: "4",
        width: "16",
        height: "16",
        rx: "2",
        ry: "2"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "9",
        y: "9",
        width: "6",
        height: "6"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "9",
        y1: "1",
        x2: "9",
        y2: "4"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "15",
        y1: "1",
        x2: "15",
        y2: "4"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "9",
        y1: "20",
        x2: "9",
        y2: "23"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "15",
        y1: "20",
        x2: "15",
        y2: "23"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "20",
        y1: "9",
        x2: "23",
        y2: "9"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "20",
        y1: "14",
        x2: "23",
        y2: "14"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "1",
        y1: "9",
        x2: "4",
        y2: "9"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "1",
        y1: "14",
        x2: "4",
        y2: "14"
      })),
      label: t('fleetHealth')
    });
  }

  if (canAccessCctv) {
    sidebarItems.push({
      key: 'cctv',
      icon: /*#__PURE__*/React.createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M15.6 11.6L22 7v10l-6.4-4.5v-1z"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "2",
        y: "5",
        width: "14",
        height: "14",
        rx: "2",
        ry: "2"
      })),
      label: t('cctv')
    });
  }

  if (canAccessDutyRoster) {
    sidebarItems.push({
      key: 'dutyRoster',
      icon: /*#__PURE__*/React.createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2"
      }, /*#__PURE__*/React.createElement("rect", {
        x: "3",
        y: "4",
        width: "18",
        height: "18",
        rx: "2",
        ry: "2"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "16",
        y1: "2",
        x2: "16",
        y2: "6"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "8",
        y1: "2",
        x2: "8",
        y2: "6"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "3",
        y1: "10",
        x2: "21",
        y2: "10"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M9 16l2 2 4-4"
      })),
      label: t('dutyRoster')
    });
  }

  sidebarItems.push({
    key: 'reportIssue',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "14 2 14 8 20 8"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "18",
      x2: "12",
      y2: "12"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "9",
      x2: "12.01",
      y2: "9"
    })),
    label: "Report Issue / Ticket"
  });

  if (isAdmin) {
    sidebarItems.push({
      key: 'adminCommand',
      icon: /*#__PURE__*/React.createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      })),
      label: t('adminConsole')
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "app-container",
    "data-theme": theme
  }, /*#__PURE__*/React.createElement("aside", {
    className: `sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand",
    onClick: () => setActiveTab('dashboard'),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand-logo"
  }, "A"), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "AeroPulse OS")), /*#__PURE__*/React.createElement("nav", {
    className: "sidebar-nav"
  }, sidebarItems.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.key,
    href: "#",
    className: `nav-link ${activeTab === item.key ? 'active' : ''}`,
    onClick: e => {
      e.preventDefault();
      setActiveTab(item.key);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-icon"
  }, item.icon), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", {
    className: "nav-label"
  }, item.label)))), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-theme-panel",
    style: {
      alignItems: isSidebarCollapsed ? 'center' : 'stretch'
    }
  }, !isSidebarCollapsed ? /*#__PURE__*/React.createElement("div", {
    className: "theme-toggle-track",
    onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    title: "Click to toggle Dark / Light Theme"
  }, /*#__PURE__*/React.createElement("div", {
    className: "theme-toggle-thumb",
    style: {
      transform: theme === 'light' ? 'translateX(100%)' : 'translateX(0%)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `theme-toggle-btn ${theme === 'dark' ? 'active' : ''}`,
    onClick: e => {
      e.stopPropagation();
      setTheme('dark');
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
  })), /*#__PURE__*/React.createElement("span", null, "Dark")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `theme-toggle-btn ${theme === 'light' ? 'active' : ''}`,
    onClick: e => {
      e.stopPropagation();
      setTheme('light');
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "1",
    x2: "12",
    y2: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "21",
    x2: "12",
    y2: "23"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4.22",
    y1: "4.22",
    x2: "5.64",
    y2: "5.64"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18.36",
    y1: "18.36",
    x2: "19.78",
    y2: "19.78"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "12",
    x2: "3",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "12",
    x2: "23",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4.22",
    y1: "19.78",
    x2: "5.64",
    y2: "18.36"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18.36",
    y1: "5.64",
    x2: "19.78",
    y2: "4.22"
  })), /*#__PURE__*/React.createElement("span", null, "Light"))) : /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "theme-collapsed-btn",
    onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`
  }, theme === 'dark' ? /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "1",
    x2: "12",
    y2: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "21",
    x2: "12",
    y2: "23"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4.22",
    y1: "4.22",
    x2: "5.64",
    y2: "5.64"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18.36",
    y1: "18.36",
    x2: "19.78",
    y2: "19.78"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "12",
    x2: "3",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "12",
    x2: "23",
    y2: "12"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0.85rem 0.75rem',
      borderTop: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
      background: 'rgba(0,0,0,0.2)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    onClick: () => setIsSidebarCollapsed(!isSidebarCollapsed),
    style: {
      width: isSidebarCollapsed ? '42px' : '100%',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.65rem',
      padding: '0 0.75rem',
      background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.12), rgba(79, 172, 254, 0.12))',
      border: '1px solid rgba(0, 242, 254, 0.4)',
      color: 'var(--brand-cyan)',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 700,
      fontSize: '0.82rem',
      boxShadow: '0 0 12px rgba(0, 242, 254, 0.15)',
      whiteSpace: 'nowrap'
    },
    title: isSidebarCollapsed ? "Expand Navigation Sidebar" : "Collapse Navigation Sidebar"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "21",
    y2: "18"
  })), !isSidebarCollapsed && /*#__PURE__*/React.createElement("span", null, "☰ Collapse Sidebar")))), /*#__PURE__*/React.createElement("div", {
    className: "main-wrapper"
  }, /*#__PURE__*/React.createElement("header", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "topbar-actions",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      flexWrap: 'wrap',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-input",
    placeholder: t('searchPlaceholder'),
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    style: { flex: '0 1 220px', minWidth: '130px', maxWidth: '280px' }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.35rem',
      background: 'rgba(0,242,254,0.08)',
      padding: '0.3rem 0.65rem',
      borderRadius: '20px',
      border: '1px solid rgba(0,242,254,0.3)',
      fontSize: '0.78rem'
    }
  }, /*#__PURE__*/React.createElement("span", null, "📍"), /*#__PURE__*/React.createElement("select", {
    value: activeAirport.code,
    onChange: e => {
      const selected = AAI_AIRPORTS.find(a => a.code === e.target.value);
      if (selected) {
        setActiveAirport(selected);
        setIsGpsDetected(false);
        addToast(`Airport location switched to: ${selected.name} (${selected.code})`, 'info');
      }
    },
    style: {
      background: 'transparent',
      border: 'none',
      color: 'var(--accent-cyan)',
      fontWeight: 700,
      cursor: 'pointer',
      outline: 'none'
    }
  }, AAI_AIRPORTS.map(a => /*#__PURE__*/React.createElement("option", {
    key: a.code,
    value: a.code,
    style: {
      background: '#07090e',
      color: '#fff'
    }
  }, a.city, " (", a.code, ")"))), isGpsDetected && /*#__PURE__*/React.createElement("span", {
    className: "badge badge-success",
    style: {
      fontSize: '0.6rem',
      padding: '0.1rem 0.35rem'
    }
  }, "GPS Auto"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      padding: '0.1rem 0.3rem',
      fontSize: '0.7rem',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer'
    },
    title: "Re-detect Device Location via GPS",
    onClick: detectDeviceLocation
  }, "🛰️")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    style: { cursor: 'pointer', whiteSpace: 'nowrap' },
    onClick: () => setShowContactModal(true)
  }, t('support')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
      background: 'rgba(0,242,254,0.06)',
      padding: '0.3rem 0.75rem',
      borderRadius: '20px',
      border: '1px solid rgba(0,242,254,0.2)',
      fontSize: '0.75rem',
      color: 'var(--brand-cyan)',
      fontWeight: 600,
      whiteSpace: 'nowrap'
    }
  },
    /*#__PURE__*/React.createElement("span", null, "🕐"),
    /*#__PURE__*/React.createElement("span", null, new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })),
    /*#__PURE__*/React.createElement("span", { style: { color: 'var(--text-muted)' } }, "|"),
    /*#__PURE__*/React.createElement("span", null, currentTime)
  ), /*#__PURE__*/React.createElement("select", {
    className: "form-control",
    value: lang,
    onChange: e => setLang(e.target.value),
    style: {
      width: 'auto',
      padding: '0.4rem 0.6rem',
      border: '1px solid var(--border-color)',
      borderRadius: '6px',
      background: 'var(--bg-card)',
      color: 'var(--text-main)',
      cursor: 'pointer',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "en"
  }, "\uD83C\uDDFA\uD83C\uDDF8 English"), /*#__PURE__*/React.createElement("option", {
    value: "hi"
  }, "\uD83C\uDDEE\uD83C\uDDF3 \u0939\u093F\u0902\u0926\u0940")), currentUser ? /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setShowProfileModal(true),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.55rem',
      padding: '0.35rem 0.75rem',
      background: 'rgba(0, 242, 254, 0.08)',
      border: '1px solid rgba(0, 242, 254, 0.3)',
      borderRadius: '24px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '26px',
      height: '26px',
      borderRadius: '50%',
      background: currentUser.role === 'Admin' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #00f2fe, #4facfe)',
      color: '#000',
      fontWeight: 800,
      fontSize: '0.78rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, currentUser.role === 'Admin' ? '👑' : currentUser.name.charAt(0).toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'left',
      lineHeight: '1.2'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: '0.82rem',
      color: '#fff'
    }
  }, currentUser.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.68rem',
      color: 'var(--brand-cyan)'
    }
  }, currentUser.role)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.65rem',
      color: 'var(--text-secondary)',
      marginLeft: '0.15rem'
    }
  }, "\u25BC")) : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      fontSize: '0.85rem',
      padding: '0.4rem 0.9rem',
      fontWeight: 600
    },
    onClick: () => {
      setAuthMode('staff');
      setShowAuthModal(true);
    }
  }, t('loginButton')))), /*#__PURE__*/React.createElement(FloatingWaitTimesBar, {
    activeAirport: activeAirport
  }), /*#__PURE__*/React.createElement(AeroSkyAiBot, {
    db: db,
    setActiveTab: setActiveTab,
    activeAirport: activeAirport,
    isAdmin: isAdmin
  }), /*#__PURE__*/React.createElement("main", {
    className: "main-content"
  }, activeTab === 'dashboard' && /*#__PURE__*/React.createElement(DashboardView, {
    db: db,
    currentUser: currentUser,
    setActiveTab: setActiveTab,
    t: t,
    activeAirport: activeAirport
  }), activeTab === 'map' && /*#__PURE__*/React.createElement(MapView, {
    db: db,
    setDb: setDb,
    isAdmin: isAdmin,
    isStaff: isStaffOrAdmin,
    addToast: addToast,
    appendAuditLog: appendAuditLog,
    activeAirport: activeAirport
  }), activeTab === 'flights' && /*#__PURE__*/React.createElement(FlightsView, {
      canManageFlights: canManageFlights,
    db: db,
    setDb: setDb,
    isAdmin: isAdmin,
    isStaff: isStaffOrAdmin,
    addToast: addToast,
    appendAuditLog: appendAuditLog,
    searchQuery: searchQuery,
    activeAirport: activeAirport
  }), activeTab === 'gates' && /*#__PURE__*/React.createElement(GatesView, {
    db: db,
    setDb: setDb,
    isAdmin: isAdmin,
    isStaff: isStaffOrAdmin,
    addToast: addToast,
    appendAuditLog: appendAuditLog,
    activeAirport: activeAirport
  }), activeTab === 'carParking' && /*#__PURE__*/React.createElement(CarParkingView, {
      canManageParking: canManageParking,
    db: db,
    setDb: setDb,
    currentUser: currentUser,
    isAdmin: isAdmin,
    isStaff: isStaffOrAdmin,
    addToast: addToast,
    appendAuditLog: appendAuditLog,
    activeAirport: activeAirport
  }), activeTab === 'cabBooking' && /*#__PURE__*/React.createElement(OlaCabBookingView, {
      canManageCabs: canManageCabs,
    db: db,
    setDb: setDb,
    currentUser: currentUser,
    isAdmin: isAdmin,
    isStaff: isStaffOrAdmin,
    addToast: addToast,
    appendAuditLog: appendAuditLog,
    activeAirport: activeAirport
  }), activeTab === 'emergency' && /*#__PURE__*/React.createElement(EmergencyView, {
    db: db,
    setDb: setDb,
    isAdmin: isAdmin,
    isStaff: isStaffOrAdmin,
    canManageEmergencies: canManageEmergencies,
    addToast: addToast,
    appendAuditLog: appendAuditLog,
    activeAirport: activeAirport
  }), activeTab === 'fleetHealth' && React.createElement(FleetHealthView, {
    db: db,
    setDb: setDb,
    isAdmin: isAdmin,
    isStaff: isStaffOrAdmin,
    addToast: addToast,
    appendAuditLog: appendAuditLog,
    activeAirport: activeAirport
  }), activeTab === 'baggage' && /*#__PURE__*/React.createElement(BaggageView, {
      canManageBaggage: canManageBaggage,
    db: db,
    setDb: setDb,
    isAdmin: isAdmin,
    isStaff: isStaffOrAdmin,
    addToast: addToast,
    appendAuditLog: appendAuditLog,
    activeAirport: activeAirport
  }), activeTab === 'cctv' && (canAccessCctv ? /*#__PURE__*/React.createElement(CctvView, {
    db: db,
    setDb: setDb,
    isAdmin: isAdmin,
    isStaff: isStaffOrAdmin,
    canManageCctv: canManageCctv,
    addToast: addToast,
    appendAuditLog: appendAuditLog,
    activeAirport: activeAirport
  }) : /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      textAlign: 'center',
      padding: '3rem 1.5rem',
      maxWidth: '600px',
      margin: '2rem auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '3rem',
      marginBottom: '1rem'
    }
  }, "🔒"), /*#__PURE__*/React.createElement("h2", {
    style: {
      color: 'var(--accent-amber)',
      fontWeight: 800,
      marginBottom: '0.5rem'
    }
  }, "CCTV Surveillance Grid — Restricted Access"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: '0.9rem',
      marginBottom: '1.5rem'
    }
  }, "Real-time airport CCTV surveillance grid access is strictly restricted to Security & Safety, Air Traffic Control, and System Admins."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => {
      setAuthMode('staff');
      setShowAuthModal(true);
    }
  }, "🔑 Staff / Admin Login"))), activeTab === 'lostFound' && /*#__PURE__*/React.createElement(LostFoundView, {
      canManageLostFound: canManageLostFound,
    db: db,
    setDb: setDb,
    isAdmin: isAdmin,
    isStaff: isStaffOrAdmin,
    currentUser: currentUser,
    addToast: addToast,
    appendAuditLog: appendAuditLog,
    activeAirport: activeAirport
  }), activeTab === 'wheelchair' && /*#__PURE__*/React.createElement(WheelchairView, {
      canManageWheelchair: canManageWheelchair,
    db: db,
    setDb: setDb,
    isAdmin: isAdmin,
    isStaff: isStaffOrAdmin,
    addToast: addToast,
    appendAuditLog: appendAuditLog,
    activeAirport: activeAirport
  }), activeTab === 'reportIssue' && /*#__PURE__*/React.createElement(ReportIssueView, {
    db: db,
    setDb: setDb,
    currentUser: currentUser,
    isAdmin: isAdmin,
    isStaff: isStaffOrAdmin,
    addToast: addToast,
    appendAuditLog: appendAuditLog,
    activeAirport: activeAirport
  }), activeTab === 'dutyRoster' && canAccessDutyRoster && /*#__PURE__*/React.createElement(DutyRosterView, {
    db: db,
    setDb: setDb,
    currentUser: currentUser,
    isAdmin: isAdmin,
    isStaff: isStaffOrAdmin,
    addToast: addToast,
    appendAuditLog: appendAuditLog,
    activeAirport: activeAirport
  }), activeTab === 'adminCommand' && (isAdmin ? /*#__PURE__*/React.createElement(AdminView, {
    db: db,
    setDb: setDb,
    addToast: addToast,
    appendAuditLog: appendAuditLog,
    activeAirport: activeAirport
  }) : /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      textAlign: 'center',
      padding: '3rem 1.5rem',
      maxWidth: '600px',
      margin: '2rem auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '3rem',
      marginBottom: '1rem'
    }
  }, "\uD83D\uDC51"), /*#__PURE__*/React.createElement("h2", {
    style: {
      color: 'var(--accent-rose)',
      fontWeight: 800,
      marginBottom: '0.5rem'
    }
  }, "AAI Admin Command Center"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: '0.9rem',
      marginBottom: '1.5rem'
    }
  }, "Master system administration, user management, and configuration are restricted exclusively to AAI Master Admin."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      background: 'linear-gradient(135deg, var(--accent-amber), #d97706)',
      color: '#000'
    },
    onClick: () => {
      setAuthMode('admin');
      setShowAuthModal(true);
    }
  }, "\uD83D\uDD12 Admin Login"))))), /*#__PURE__*/React.createElement("div", {
    className: "toast-container"
  }, toasts.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: "toast",
    style: {
      borderColor: t.type === 'success' ? 'var(--accent-emerald)' : t.type === 'warning' ? 'var(--accent-amber)' : t.type === 'danger' ? 'var(--accent-rose)' : 'var(--accent-cyan)'
    }
  }, t.msg))), showContactModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) setShowContactModal(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)'
    }
  }, "\uD83D\uDCDE Delhi Airport Support"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setShowContactModal(false)
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      padding: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-secondary)'
    }
  }, "Toll Free Helpline"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.2rem',
      fontWeight: 700,
      color: 'var(--accent-emerald)',
      marginTop: '0.25rem'
    }
  }, db.contactInfo.helpline)), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      padding: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-secondary)'
    }
  }, "Email"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1rem',
      fontWeight: 600,
      marginTop: '0.25rem'
    }
  }, db.contactInfo.email)), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      padding: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-secondary)'
    }
  }, "Address"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.9rem',
      marginTop: '0.25rem'
    }
  }, db.contactInfo.address))))), showWheelchairModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) setShowWheelchairModal(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)'
    }
  }, "\u267F Wheelchair Dispatch"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setShowWheelchairModal(false)
  }, "\u2715")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleWcSubmit,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    className: "form-input",
    placeholder: "Passenger Name",
    value: wcForm.passengerName,
    onChange: e => setWcForm({
      ...wcForm,
      passengerName: e.target.value
    })
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    className: "form-input",
    placeholder: "Airline Name",
    value: wcForm.airlineName,
    onChange: e => setWcForm({
      ...wcForm,
      airlineName: e.target.value
    })
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-input",
    placeholder: "PNR Number",
    value: wcForm.pnrNumber,
    onChange: e => setWcForm({
      ...wcForm,
      pnrNumber: e.target.value
    })
  }), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    required: true,
    className: "form-input",
    placeholder: "Mobile Contact",
    value: wcForm.mobileNumber,
    onChange: e => setWcForm({
      ...wcForm,
      mobileNumber: e.target.value
    })
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Dispatch Wheelchair")), db.wheelchairRequests.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '1rem'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      marginBottom: '0.5rem',
      color: 'var(--text-secondary)',
      fontSize: '0.85rem'
    }
  }, "Recent Requests"), db.wheelchairRequests.slice(0, 3).map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.5rem',
      borderBottom: '1px solid var(--border-color)',
      fontSize: '0.8rem'
    }
  }, /*#__PURE__*/React.createElement("span", null, r.passengerName, " (", r.airlineName, ")"), /*#__PURE__*/React.createElement("span", {
    className: `badge ${r.status === 'COMPLETED' ? 'badge-success' : r.status === 'DISPATCHED' ? 'badge-warning' : 'badge-info'}`
  }, r.status)))))), showProfileModal && currentUser && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) setShowProfileModal(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '440px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.25rem',
      borderBottom: '1px solid var(--border-color)',
      paddingBottom: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.65rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '42px',
      height: '42px',
      borderRadius: '50%',
      background: currentUser.role === 'Admin' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #00f2fe, #4facfe)',
      color: '#000',
      fontWeight: 800,
      fontSize: '1.1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, currentUser.role === 'Admin' ? '👑' : currentUser.name.charAt(0).toUpperCase()), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: '1.05rem',
      color: 'var(--accent-cyan)'
    }
  }, currentUser.name), /*#__PURE__*/React.createElement("span", {
    className: `badge ${currentUser.role === 'Admin' ? 'badge-danger' : 'badge-info'}`,
    style: {
      fontSize: '0.7rem'
    }
  }, currentUser.role, " Account"))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setShowProfileModal(false)
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      fontSize: '0.85rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(0,0,0,0.25)',
      padding: '0.85rem',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.45rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: '0.78rem'
    }
  }, "Employee / User ID:"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, currentUser.employeeId || currentUser.id)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: '0.78rem'
    }
  }, "Official Email:"), /*#__PURE__*/React.createElement("strong", null, currentUser.email)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: '0.78rem'
    }
  }, "Assigned Airport:"), /*#__PURE__*/React.createElement("strong", null, activeAirport.name, " (", activeAirport.code, ")")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: '0.78rem'
    }
  }, "Account Access Status:"), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-success"
  }, "\u2705 APPROVED"))), (currentUser.role === 'Staff' || currentUser.role === 'Admin') && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      justifyContent: 'center',
      padding: '0.5rem',
      fontSize: '0.82rem'
    },
    onClick: () => {
      setActiveTab(currentUser.role === 'Admin' ? 'adminCommand' : 'dutyRoster');
      setShowProfileModal(false);
    }
  }, currentUser.role === 'Admin' ? '👑 Admin Command Center' : '📅 View Duty Roster & My Shift'), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      justifyContent: 'center',
      padding: '0.5rem',
      fontSize: '0.82rem',
      color: 'var(--accent-amber)',
      borderColor: 'rgba(245,158,11,0.3)'
    },
    onClick: () => setShowPwdSection(!showPwdSection)
  }, "\uD83D\uDD11 ", showPwdSection ? 'Close Password Form' : 'Change My Password'), showPwdSection && /*#__PURE__*/React.createElement("form", {
    onSubmit: handleChangeOwnPassword,
    style: {
      background: 'rgba(0,0,0,0.3)',
      padding: '0.85rem',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.55rem',
      border: '1px solid rgba(245,158,11,0.2)'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontSize: '0.82rem',
      color: 'var(--accent-amber)',
      fontWeight: 700
    }
  }, "\uD83D\uDD12 Update Account Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    required: true,
    className: "form-input",
    style: {
      fontSize: '0.8rem',
      padding: '0.4rem 0.6rem'
    },
    placeholder: "Current Password",
    value: changePwdForm.currentPwd,
    onChange: e => setChangePwdForm({
      ...changePwdForm,
      currentPwd: e.target.value
    })
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    required: true,
    className: "form-input",
    style: {
      fontSize: '0.8rem',
      padding: '0.4rem 0.6rem'
    },
    placeholder: "New Password",
    value: changePwdForm.newPwd,
    onChange: e => setChangePwdForm({
      ...changePwdForm,
      newPwd: e.target.value
    })
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    required: true,
    className: "form-input",
    style: {
      fontSize: '0.8rem',
      padding: '0.4rem 0.6rem'
    },
    placeholder: "Confirm New Password",
    value: changePwdForm.confirmPwd,
    onChange: e => setChangePwdForm({
      ...changePwdForm,
      confirmPwd: e.target.value
    })
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      fontSize: '0.8rem',
      padding: '0.45rem',
      background: 'linear-gradient(135deg, var(--accent-amber), #d97706)',
      color: '#000',
      fontWeight: 800
    }
  }, "\uD83D\uDCBE Save New Password")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      justifyContent: 'center',
      padding: '0.6rem',
      fontSize: '0.85rem',
      background: 'rgba(244,63,94,0.15)',
      color: 'var(--accent-rose)',
      border: '1px solid rgba(244,63,94,0.3)',
      fontWeight: 700,
      marginTop: '0.35rem'
    },
    onClick: () => {
      setCurrentUser(null);
      setShowProfileModal(false);
      addToast('Logged out of account.', 'info');
    }
  }, "\uD83D\uDEAA Logout of Account")))), showAuthModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) setShowAuthModal(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '500px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)',
      fontWeight: 800,
      fontSize: '1.15rem'
    }
  }, "AAI AeroPulse Security Portal"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setShowAuthModal(false)
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.25rem',
      marginBottom: '1.25rem',
      borderBottom: '1px solid var(--border-color)',
      paddingBottom: '0.5rem',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: `btn ${authMode === 'staff' ? 'btn-primary' : 'btn-secondary'}`,
    style: {
      fontSize: '0.75rem',
      padding: '0.3rem 0.6rem'
    },
    onClick: () => setAuthMode('staff')
  }, "Staff Login"), /*#__PURE__*/React.createElement("button", {
    className: `btn ${authMode === 'admin' ? 'btn-primary' : 'btn-secondary'}`,
    style: {
      fontSize: '0.75rem',
      padding: '0.3rem 0.6rem'
    },
    onClick: () => setAuthMode('admin')
  }, "Admin Login"), /*#__PURE__*/React.createElement("button", {
    className: `btn ${authMode === 'register' ? 'btn-primary' : 'btn-secondary'}`,
    style: {
      fontSize: '0.75rem',
      padding: '0.3rem 0.6rem'
    },
    onClick: () => setAuthMode('register')
  }, "Register Staff"), /*#__PURE__*/React.createElement("button", {
    className: `btn ${authMode === 'forgot' ? 'btn-primary' : 'btn-secondary'}`,
    style: {
      fontSize: '0.75rem',
      padding: '0.3rem 0.6rem'
    },
    onClick: () => setAuthMode('forgot')
  }, "Forgot Password")), authMode === 'staff' && /*#__PURE__*/React.createElement("form", {
    onSubmit: handleStaffLogin,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.85rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-secondary)'
    }
  }, "Staff Email or Employee ID"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "cisf.lead@delhi.aai or CISF-DEL-881",
    value: loginForm.identifier,
    onChange: e => setLoginForm({
      ...loginForm,
      identifier: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-secondary)'
    }
  }, "Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    required: true,
    className: "form-input",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    value: loginForm.password,
    onChange: e => setLoginForm({
      ...loginForm,
      password: e.target.value
    })
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      padding: '0.6rem'
    }
  }, "Login to Staff Workspace")), authMode === 'admin' && /*#__PURE__*/React.createElement("form", {
    onSubmit: handleAdminLogin,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.85rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(245,158,11,0.1)',
      padding: '0.65rem',
      borderRadius: '6px',
      border: '1px solid rgba(245,158,11,0.3)',
      fontSize: '0.78rem',
      color: 'var(--accent-amber)'
    }
  }, "\uD83D\uDD12 Restricted to AAI Airport Operations Master Administrators."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-secondary)'
    }
  }, "Admin Email or Employee ID"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "admin@delhi.aai",
    value: loginForm.identifier,
    onChange: e => setLoginForm({
      ...loginForm,
      identifier: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-secondary)'
    }
  }, "Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    required: true,
    className: "form-input",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    value: loginForm.password,
    onChange: e => setLoginForm({
      ...loginForm,
      password: e.target.value
    })
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      padding: '0.6rem',
      background: 'linear-gradient(135deg, var(--accent-amber), #d97706)',
      color: '#000'
    }
  }, "Login as Admin")), authMode === 'register' && /*#__PURE__*/React.createElement("form", {
    onSubmit: handleRegister,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Full Name"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: regForm.name,
    onChange: e => setRegForm({
      ...regForm,
      name: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Employee ID"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "STF-DEL-101",
    value: regForm.employeeId,
    onChange: e => setRegForm({
      ...regForm,
      employeeId: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Email Address"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    required: true,
    className: "form-input",
    placeholder: "staff@delhi.aai",
    value: regForm.email,
    onChange: e => setRegForm({
      ...regForm,
      email: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Mobile Number (for OTP)"), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    required: true,
    className: "form-input",
    placeholder: "+91 9876543210",
    value: regForm.mobile,
    onChange: e => setRegForm({
      ...regForm,
      mobile: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Staff Operational Role"), /*#__PURE__*/React.createElement("select", {
    required: true,
    className: "form-input",
    value: regForm.role || "Ground and Terminal Operations",
    onChange: e => setRegForm({
      ...regForm,
      role: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", { value: "Ground and Terminal Operations" }, "🛫 Ground and Terminal Operations"),
     /*#__PURE__*/React.createElement("option", { value: "Air Traffic Control and Flight Operations" }, "🛰️ Air Traffic Control and Flight Operations"),
     /*#__PURE__*/React.createElement("option", { value: "Security and Safety" }, "🛡️ Security and Safety"),
     /*#__PURE__*/React.createElement("option", { value: "Customer Service" }, "🎧 Customer Service"))),
     /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Official Designation"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "e.g. Operations Manager / Senior ATC / Security Lead",
    value: regForm.designation || "",
    onChange: e => setRegForm({
      ...regForm,
      designation: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    required: true,
    className: "form-input",
    value: regForm.password,
    onChange: e => setRegForm({
      ...regForm,
      password: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Confirm Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    required: true,
    className: "form-input",
    value: regForm.confirmPassword,
    onChange: e => setRegForm({
      ...regForm,
      confirmPassword: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      width: '100%'
    }
  }, "Submit Registration for Admin Approval"))), authMode === 'forgot' && /*#__PURE__*/React.createElement("div", null, forgotState.step === 1 && /*#__PURE__*/React.createElement("form", {
    onSubmit: handleForgotStep1,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.85rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-secondary)'
    }
  }, "Step 1 of 2: Enter registered Email, Phone, or Employee ID and specify your official ID Proof document name."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Account Email / Mobile / Employee ID"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "admin@delhi.aai or STF-DEL-101",
    value: forgotState.identifier,
    onChange: e => setForgotState({
      ...forgotState,
      identifier: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Verification Document Proof Name / Ref"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "AAI Airport Badge / Aadhaar / Passport Ref",
    value: forgotState.docName,
    onChange: e => setForgotState({
      ...forgotState,
      docName: e.target.value
    })
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      padding: '0.6rem'
    }
  }, "Proceed to Live Face Scan \u2794")), forgotState.step === 2 && /*#__PURE__*/React.createElement("form", {
    onSubmit: handleForgotSubmitRequest,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.85rem',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: 'var(--accent-cyan)'
    }
  }, "Step 2 of 2: Biometric Live Face Scan Capture"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(0,0,0,0.5)',
      border: '2px dashed var(--accent-cyan)',
      borderRadius: '12px',
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      border: '3px solid var(--accent-cyan)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2.5rem',
      background: 'rgba(0,242,254,0.1)'
    }
  }, forgotState.captured ? '👤' : '📸'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, forgotState.captured ? '✅ Biometric Live Face Scan Captured & Encrypted!' : 'Align your face inside the camera oval frame and click capture.'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    style: {
      fontSize: '0.78rem',
      padding: '0.35rem 0.8rem'
    },
    onClick: handleCaptureFace
  }, forgotState.captured ? '🔄 Re-capture Live Face' : '📸 Capture Live Face')), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      padding: '0.6rem'
    },
    disabled: !forgotState.captured
  }, "Submit Reset Request & Face Scan to Admin")), forgotState.step === 3 && /*#__PURE__*/React.createElement("form", {
    onSubmit: handleResetPasswordFinal,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.85rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: 'var(--accent-emerald)',
      fontWeight: 600
    }
  }, "\u2705 One-Time Password Change Approved by AAI Master Admin! Set your new password below."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "New Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    required: true,
    className: "form-input",
    placeholder: "Enter New Password",
    value: forgotState.newPassword,
    onChange: e => setForgotState({
      ...forgotState,
      newPassword: e.target.value
    })
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      padding: '0.6rem'
    }
  }, "Update Password & Activate Account"))))));
}

// ═══════════════════════════════════════════════════════
// 1. DASHBOARD VIEW
// ═══════════════════════════════════════════════════════

function DashboardView({
  db,
  currentUser,
  setActiveTab,
  t,
  activeAirport
}) {
  const safeT = typeof t === 'function' ? t : (k => TRANSLATIONS?.en?.[k] || k);
  const aptCode = activeAirport?.code || 'DEL';
  const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
  const aptIcao = activeAirport?.icao || 'VIDP';

  const airportKpiPreset = {
    DEL: { activeFlights: 142, passengersToday: 42387, bagsProcessed: 39241, activeAlerts: 2, gatesOccupied: "12/24", onTimePerf: "94.2%", securityCleared: 41890, weatherStatus: "Good (Vis 2500m)", systemHealth: "99.8%" },
    BOM: { activeFlights: 118, passengersToday: 38920, bagsProcessed: 35110, activeAlerts: 1, gatesOccupied: "14/20", onTimePerf: "91.8%", securityCleared: 37400, weatherStatus: "Clear (Vis 3000m)", systemHealth: "99.5%" },
    BLR: { activeFlights: 96, passengersToday: 31450, bagsProcessed: 28900, activeAlerts: 0, gatesOccupied: "9/16", onTimePerf: "95.6%", securityCleared: 30800, weatherStatus: "Pleasant 24°C", systemHealth: "99.9%" },
    MAA: { activeFlights: 74, passengersToday: 24800, bagsProcessed: 22100, activeAlerts: 1, gatesOccupied: "8/14", onTimePerf: "89.4%", securityCleared: 24100, weatherStatus: "Humid 31°C", systemHealth: "99.2%" },
    CCU: { activeFlights: 62, passengersToday: 19500, bagsProcessed: 17800, activeAlerts: 0, gatesOccupied: "6/12", onTimePerf: "92.1%", securityCleared: 19100, weatherStatus: "Light Rain 27°C", systemHealth: "99.6%" },
    HYD: { activeFlights: 88, passengersToday: 28400, bagsProcessed: 25600, activeAlerts: 0, gatesOccupied: "10/18", onTimePerf: "96.2%", securityCleared: 27900, weatherStatus: "Sunny 29°C", systemHealth: "99.7%" },
    AMD: { activeFlights: 48, passengersToday: 15200, bagsProcessed: 13900, activeAlerts: 0, gatesOccupied: "5/10", onTimePerf: "93.8%", securityCleared: 14800, weatherStatus: "Warm 33°C", systemHealth: "99.4%" }
  };
  const activeMetrics = airportKpiPreset[aptCode] || airportKpiPreset.DEL;

  const kpis = [{
    label: safeT('activeFlights'),
    val: activeMetrics.activeFlights,
    icon: "✈️",
    color: "var(--accent-cyan)",
    tab: "flights"
  }, {
    label: safeT('passengersToday'),
    val: activeMetrics.passengersToday.toLocaleString(),
    icon: "👥",
    color: "var(--accent-emerald)",
    tab: "flights"
  }, {
    label: safeT('bagsProcessed'),
    val: activeMetrics.bagsProcessed.toLocaleString(),
    icon: "🛄",
    color: "var(--accent-blue)",
    tab: "baggage"
  }, {
    label: safeT('activeAlerts'),
    val: activeMetrics.activeAlerts,
    icon: "🚨",
    color: "var(--accent-rose)",
    tab: "emergency"
  }, {
    label: safeT('gatesOccupied'),
    val: activeMetrics.gatesOccupied,
    icon: "🚪",
    color: "var(--accent-purple)",
    tab: "gates"
  }, {
    label: safeT('onTimePerf'),
    val: activeMetrics.onTimePerf,
    icon: "⏱️",
    color: "var(--accent-amber)",
    tab: "flights"
  }, {
    label: safeT('securityCleared'),
    val: activeMetrics.securityCleared.toLocaleString(),
    icon: "🛡️",
    color: "var(--accent-emerald)"
  }, {
    label: safeT('weather'),
    val: activeMetrics.weatherStatus,
    icon: "🌤️",
    color: "var(--accent-blue)"
  }, {
    label: safeT('systemHealth'),
    val: activeMetrics.systemHealth,
    icon: "💚",
    color: "var(--accent-emerald)"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: '1.7rem',
      fontWeight: 800
    }
  }, "AAI Operations Control Center \u2014 ", aptName, " (", aptCode, " / ", aptIcao, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--accent-cyan)',
      fontSize: '0.85rem',
      marginTop: '0.25rem'
    }
  }, "\uD83D\uDCCD Airport Location: ", /*#__PURE__*/React.createElement("strong", null, activeAirport?.city, " (", aptCode, ")"), " \u2022 Lat ", activeAirport?.lat, ", Lon ", activeAirport?.lon), currentUser && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: '0.85rem',
      marginTop: '0.25rem'
    }
  }, "Authenticated: ", /*#__PURE__*/React.createElement("strong", null, currentUser.name), " (", currentUser.role, ")"), !currentUser && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: '0.85rem',
      marginTop: '0.25rem'
    }
  }, safeT('publicDashboard'))), /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, kpis.map((k, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "kpi-card",
    style: {
      cursor: k.tab ? 'pointer' : 'default'
    },
    onClick: () => k.tab && setActiveTab(k.tab)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      fontWeight: 600
    }
  }, k.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.8rem',
      fontWeight: 800,
      color: k.color,
      marginTop: '0.25rem',
      fontFamily: 'var(--font-mono)'
    }
  }, k.val)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '2rem',
      opacity: 0.6
    }
  }, k.icon))))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\u2708\uFE0F Recent Flights (", aptCode, ")")), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      fontSize: '0.82rem',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '1px solid var(--border-color)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '0.5rem',
      textAlign: 'left'
    }
  }, "Flight"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Route"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Time"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Status"))), /*#__PURE__*/React.createElement("tbody", null, db.flights.slice(0, 6).map(f => /*#__PURE__*/React.createElement("tr", {
    key: f.id,
    style: {
      borderBottom: '1px solid rgba(255,255,255,0.04)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0.5rem',
      fontWeight: 600
    }
  }, f.flightNumber), /*#__PURE__*/React.createElement("td", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, f.type === 'Departure' ? `${aptCode} → ${f.destination.match(/\((\w+)\)/)?.[1] || f.destination}` : `${f.origin.match(/\((\w+)\)/)?.[1] || f.origin} → ${aptCode}`), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.78rem'
    }
  }, f.scheduledTime), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `badge ${f.status === 'Delayed' ? 'badge-danger' : f.status === 'Boarding' || f.status === 'Landed' ? 'badge-success' : f.status === 'In Flight' ? 'badge-warning' : 'badge-info'}`
  }, f.status))))))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\uD83D\uDEA8 Active Incidents")), (db?.emergencies || SEED.emergencies || []).filter(e => e.status === 'ACTIVE').length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '2rem',
      color: 'var(--accent-emerald)'
    }
  }, "\u2705 No active incidents") : (db?.emergencies || SEED.emergencies || []).filter(e => e.status === 'ACTIVE').map(e => /*#__PURE__*/React.createElement("div", {
    key: e.id,
    className: "glass-card",
    style: {
      padding: '0.85rem',
      marginBottom: '0.75rem',
      borderColor: 'var(--accent-rose)',
      animation: 'pulse 2s infinite'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--accent-rose)'
    }
  }, e.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)',
      marginTop: '0.2rem'
    }
  }, e.location, " \u2022 ", e.severity)), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-danger"
  }, e.status)))))));
}

// ═══════════════════════════════════════════════════════
// 2. AIRPORT MAP VIEW
// ═══════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════
// 2. AIRPORT MAP VIEW & ADMIN MAP EDITOR
// ═══════════════════════════════════════════════════════

function MapView({
  db,
  setDb,
  isAdmin,
  isStaff,
  addToast,
  appendAuditLog,
  activeAirport
}) {
  const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
  const aptCode = activeAirport?.code || 'DEL';
  const canManage = isAdmin || isStaff;
  const [mapSection, setMapSection] = useState('transportation'); // 'transportation' | 'terminals' | 'runways' | 'shops'

  // Admin Modal States
  const [showTerminalModal, setShowTerminalModal] = useState(false);
  const [showGateModal, setShowGateModal] = useState(false);
  const [showRunwayModal, setShowRunwayModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [editTerminalId, setEditTerminalId] = useState(null);
  const [editGateId, setEditGateId] = useState(null);
  const [editRunwayId, setEditRunwayId] = useState(null);
  const [editShopId, setEditShopId] = useState(null);

  // Forms
  const [terminalForm, setTerminalForm] = useState({
    id: '',
    name: '',
    code: 'T4',
    type: 'Domestic',
    status: 'Active',
    description: ''
  });
  const [gateForm, setGateForm] = useState({
    id: '',
    terminal: 'T3',
    type: 'Widebody',
    status: 'Available',
    flight: '',
    compat: 'A320/B787',
    pax: 0,
    mapUrl: ''
  });
  const [runwayForm, setRunwayForm] = useState({
    id: '',
    name: '',
    length: '3,500m',
    ilsCategory: 'CAT-II',
    status: 'Active',
    trafficLevel: 'Moderate'
  });
  const [shopForm, setShopForm] = useState({
    id: '',
    name: '',
    category: 'Retail',
    terminal: 'T3',
    location: '',
    status: 'OPEN',
    operatingHours: '24/7',
    mapUrl: ''
  });

  // Live AI Transportation ETAs State
  const [transitData, setTransitData] = useState([{
    id: 'TRN-METRO-01',
    name: 'Delhi Metro Express Line (Orange Line)',
    type: 'Metro Rail',
    icon: '🚇',
    terminal: 'T3 Airside Concourse & T1 Walkway',
    location: 'Airport Metro Station (Direct T3 Underground Concourse)',
    nextDepartureSec: 140,
    // 2m 20s
    frequency: 'Every 10 mins (04:45 - 23:30)',
    destinations: [{
      station: 'Delhi Aerocity',
      travelTime: '3 mins',
      fare: '₹20'
    }, {
      station: 'Dhaula Kuan',
      travelTime: '11 mins',
      fare: '₹40'
    }, {
      station: 'New Delhi Railway Stn',
      travelTime: '19 mins',
      fare: '₹60'
    }],
    aiCrowdIndex: 'Light (32% Occupancy)',
    status: '🟢 OPERATIONAL ON-TIME',
    aiConfidence: '99.8%',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Airport+Metro+Station+Delhi+T3'
  }, {
    id: 'TRN-BUS-02',
    name: 'DTC Airport Express Buses (Routes 534A, 780, Express 4)',
    type: 'City Bus',
    icon: '🚌',
    terminal: 'T3 Ground Transportation Center & T1 Bus Bay',
    location: 'T3 Bus Station Pillar 10 & T1 Exit Gate 2',
    nextDepartureSec: 260,
    // 4m 20s
    frequency: 'Every 15 mins (24/7 Service)',
    destinations: [{
      station: 'ISBT Kashmere Gate',
      travelTime: '45 mins',
      fare: '₹50'
    }, {
      station: 'Connaught Place (CP)',
      travelTime: '35 mins',
      fare: '₹40'
    }, {
      station: 'AIIMS / Dhaula Kuan',
      travelTime: '25 mins',
      fare: '₹30'
    }, {
      station: 'Gurgaon IFFCO Chowk',
      travelTime: '30 mins',
      fare: '₹35'
    }],
    aiCrowdIndex: 'Moderate Traffic Delay (+2 mins)',
    status: '🟢 LIVE AI TRAFFIC UPDATED',
    aiConfidence: '98.5%',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=DTC+Bus+Stop+Delhi+Airport+T3'
  }, {
    id: 'TRN-SHUTTLE-03',
    name: 'Inter-Terminal Airport Transfer Shuttle',
    type: 'Airport Shuttle',
    icon: '🚐',
    terminal: 'Connects T1 ↔ T2 ↔ T3',
    location: 'T1 Gate 4, T2 Gate 2 & T3 Arrival Pillar 6',
    nextDepartureSec: 180,
    // 3 mins
    frequency: 'Every 10 mins (24 Hours Continuous)',
    destinations: [{
      station: 'Terminal 1 Departure Ramp',
      travelTime: '12 mins',
      fare: 'FREE for Transfer Passengers'
    }, {
      station: 'Terminal 2 Gate 1',
      travelTime: '5 mins',
      fare: 'FREE'
    }, {
      station: 'Terminal 3 International Arrival',
      travelTime: '8 mins',
      fare: 'FREE'
    }],
    aiCrowdIndex: 'Smooth Transit Flow',
    status: '🟢 FREE SHUTTLE RUNNING',
    aiConfidence: '99.9%',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Inter+Terminal+Shuttle+Delhi+Airport'
  }, {
    id: 'TRN-TAXI-04',
    name: 'Pre-Paid Taxi & Auto Rickshaw Hub',
    type: 'Prepaid Taxi',
    icon: '🚕',
    terminal: 'All Terminals (T1, T2, T3)',
    location: 'MLCP Building Level 1 & T1 Arrival Exit Booth',
    nextDepartureSec: 60,
    // 1 min wait
    frequency: 'Immediate Dispatch (Over 150 Cabs Queued)',
    destinations: [{
      station: 'South Delhi / Saket',
      travelTime: '25 mins',
      fare: '₹350 (Flat Rate)'
    }, {
      station: 'Noida Sector 62',
      travelTime: '55 mins',
      fare: '₹650 (Flat Rate)'
    }, {
      station: 'Gurugram Cyber City',
      travelTime: '20 mins',
      fare: '₹300 (Flat Rate)'
    }],
    aiCrowdIndex: 'Low Wait Time (1-2 mins)',
    status: '🟢 94 VEHICLES READY',
    aiConfidence: '99.5%',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Prepaid+Taxi+Booth+Delhi+Airport+T3'
  }]);

  // AI Live Countdown Effect (Updates ETAs in real time)
  useEffect(() => {
    const timer = setInterval(() => {
      setTransitData(prev => prev.map(t => {
        let nextSec = t.nextDepartureSec - 1;
        if (nextSec <= 0) {
          nextSec = t.type === 'Metro Rail' ? 600 : t.type === 'City Bus' ? 900 : t.type === 'Airport Shuttle' ? 600 : 120;
        }
        return {
          ...t,
          nextDepartureSec: nextSec
        };
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const formatETA = totalSec => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };
  const handleManualRefreshAI = () => {
    setTransitData(prev => prev.map(t => ({
      ...t,
      nextDepartureSec: Math.floor(60 + Math.random() * 300),
      aiConfidence: (98.5 + Math.random() * 1.4).toFixed(1) + '%'
    })));
    addToast('⚡ AI Transit ETAs recalculated using live GPS & traffic telemetry!', 'info');
    appendAuditLog('TRANSIT_AI_REFRESH', 'User refreshed AI live transit schedules');
  };
  const openGoogleMap = (item, type, e) => {
    if (e) e.stopPropagation();
    const mapUrl = item.mapUrl && item.mapUrl.trim() ? item.mapUrl.startsWith('http') ? item.mapUrl : `https://${item.mapUrl}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(type === 'gate' ? `${aptName} Terminal ${item.terminal || ''} Gate ${item.id}` : `${item.name} ${item.location || ''} ${aptName}`)}`;
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };

  // Default arrays with fallbacks
  const terminals = db.terminals && db.terminals.length > 0 ? db.terminals : [{
    id: "T1",
    name: "Terminal 1 (Domestic & Low-Cost)",
    code: "T1",
    type: "Domestic",
    status: "Active",
    description: "Domestic low-cost carriers Terminal 1A & 1C"
  }, {
    id: "T2",
    name: "Terminal 2 (Domestic Regional)",
    code: "T2",
    type: "Domestic",
    status: "Active",
    description: "Regional domestic operations"
  }, {
    id: "T3",
    name: "Terminal 3 (International & Domestic)",
    code: "T3",
    type: "International",
    status: "Active",
    description: "Integrated primary terminal with CAT-III B runway access"
  }];
  const runways = db.runways && db.runways.length > 0 ? db.runways : [{
    id: "RWY-01",
    name: "Runway 28/10",
    length: "4,430m",
    ilsCategory: "CAT-III B",
    status: "Active",
    trafficLevel: "High"
  }, {
    id: "RWY-02",
    name: "Runway 29/11",
    length: "3,810m",
    ilsCategory: "CAT-I",
    status: "Active",
    trafficLevel: "Moderate"
  }, {
    id: "RWY-03",
    name: "Runway 27/09",
    length: "2,871m",
    ilsCategory: "N/A",
    status: "Under Maintenance",
    trafficLevel: "Closed"
  }];
  const shops = db.shops && db.shops.length > 0 ? db.shops : [{
    id: "SHP-001",
    name: "Delhi Duty Free Flagship Store",
    category: "Duty Free",
    terminal: "T3",
    location: "T3 Airside Departure Mall",
    status: "OPEN",
    operatingHours: "24/7"
  }, {
    id: "SHP-002",
    name: "Starbucks Coffee Concourse",
    category: "Food & Beverage",
    terminal: "T3",
    location: "T3 Gate 32 Concourse",
    status: "OPEN",
    operatingHours: "05:00 - 23:00"
  }, {
    id: "SHP-003",
    name: "FabIndia Heritage Craft Store",
    category: "Retail & Apparel",
    terminal: "T1",
    location: "T1 Departure Gate Area",
    status: "OPEN",
    operatingHours: "06:00 - 22:00"
  }, {
    id: "SHP-004",
    name: "Plaza Premium Executive Lounge",
    category: "Lounge & Hospitality",
    terminal: "T3",
    location: "T3 International Mezzanine Level 2",
    status: "OPEN",
    operatingHours: "24/7"
  }, {
    id: "SHP-005",
    name: "Bikanervala Express Food Court",
    category: "Food & Beverage",
    terminal: "T2",
    location: "T2 Food Court Hall",
    status: "OPEN",
    operatingHours: "06:00 - 22:30"
  }];

  // Terminal Handlers
  const handleSaveTerminal = e => {
    e.preventDefault();
    if (editTerminalId) {
      setDb(prev => ({
        ...prev,
        terminals: terminals.map(t => t.id === editTerminalId ? {
          ...t,
          ...terminalForm
        } : t)
      }));
      appendAuditLog('MAP_TERMINAL_UPDATE', `Updated terminal ${terminalForm.name}`);
      addToast(`Terminal ${terminalForm.name} updated!`, 'success');
    } else {
      const nt = {
        id: terminalForm.code || `T-${Date.now().toString().slice(-3)}`,
        ...terminalForm
      };
      setDb(prev => ({
        ...prev,
        terminals: [...terminals, nt]
      }));
      appendAuditLog('MAP_TERMINAL_CREATE', `Added new terminal ${terminalForm.name}`);
      addToast(`Terminal ${terminalForm.name} added to airport map!`, 'success');
    }
    setShowTerminalModal(false);
    setEditTerminalId(null);
  };
  const handleDeleteTerminal = (id, name) => {
    if (!isAdmin) return;
    setDb(prev => ({
      ...prev,
      terminals: terminals.filter(t => t.id !== id),
      gates: (prev.gates || []).filter(g => g.terminal !== id)
    }));
    appendAuditLog('MAP_TERMINAL_DELETE', `Deleted terminal ${name} (${id})`);
    addToast(`Terminal ${name} removed from map`, 'danger');
  };

  // Gate Handlers
  const handleSaveGate = e => {
    e.preventDefault();
    if (editGateId) {
      setDb(prev => ({
        ...prev,
        gates: (prev.gates || []).map(g => g.id === editGateId ? {
          ...g,
          ...gateForm
        } : g)
      }));
      appendAuditLog('MAP_GATE_UPDATE', `Updated gate ${gateForm.id}`);
      addToast(`Gate ${gateForm.id} updated!`, 'success');
    } else {
      const ng = {
        id: `${gateForm.terminal}-G${Date.now().toString().slice(-2)}`,
        ...gateForm
      };
      setDb(prev => ({
        ...prev,
        gates: [...(prev.gates || []), ng]
      }));
      appendAuditLog('MAP_GATE_CREATE', `Added gate ${ng.id} to terminal ${gateForm.terminal}`);
      addToast(`Gate ${ng.id} added!`, 'success');
    }
    setShowGateModal(false);
    setEditGateId(null);
  };
  const handleDeleteGate = id => {
    if (!canManage) return;
    setDb(prev => ({
      ...prev,
      gates: (prev.gates || []).filter(g => g.id !== id)
    }));
    appendAuditLog('MAP_GATE_DELETE', `Deleted gate ${id}`);
    addToast(`Gate ${id} deleted`, 'danger');
  };

  // Runway Handlers
  const handleSaveRunway = e => {
    e.preventDefault();
    if (editRunwayId) {
      setDb(prev => ({
        ...prev,
        runways: runways.map(r => r.id === editRunwayId ? {
          ...r,
          ...runwayForm
        } : r)
      }));
      appendAuditLog('MAP_RUNWAY_UPDATE', `Updated runway ${runwayForm.name}`);
      addToast(`Runway ${runwayForm.name} updated!`, 'success');
    } else {
      const nr = {
        id: `RWY-${Date.now().toString().slice(-3)}`,
        ...runwayForm
      };
      setDb(prev => ({
        ...prev,
        runways: [...runways, nr]
      }));
      appendAuditLog('MAP_RUNWAY_CREATE', `Created runway ${runwayForm.name}`);
      addToast(`Runway ${runwayForm.name} added!`, 'success');
    }
    setShowRunwayModal(false);
    setEditRunwayId(null);
  };
  const handleDeleteRunway = (id, name) => {
    if (!isAdmin) return;
    setDb(prev => ({
      ...prev,
      runways: runways.filter(r => r.id !== id)
    }));
    appendAuditLog('MAP_RUNWAY_DELETE', `Deleted runway ${name}`);
    addToast(`Runway ${name} deleted`, 'danger');
  };

  // Shop Handlers
  const handleSaveShop = e => {
    e.preventDefault();
    if (editShopId) {
      setDb(prev => ({
        ...prev,
        shops: shops.map(s => s.id === editShopId ? {
          ...s,
          ...shopForm
        } : s)
      }));
      appendAuditLog('MAP_SHOP_UPDATE', `Updated store ${shopForm.name}`);
      addToast(`Store ${shopForm.name} updated!`, 'success');
    } else {
      const ns = {
        id: `SHP-${Date.now().toString().slice(-3)}`,
        ...shopForm
      };
      setDb(prev => ({
        ...prev,
        shops: [...shops, ns]
      }));
      appendAuditLog('MAP_SHOP_CREATE', `Added store ${shopForm.name}`);
      addToast(`Store ${shopForm.name} added to airport layout!`, 'success');
    }
    setShowShopModal(false);
    setEditShopId(null);
  };
  const handleDeleteShop = (id, name) => {
    if (!canManage) return;
    setDb(prev => ({
      ...prev,
      shops: shops.filter(s => s.id !== id)
    }));
    appendAuditLog('MAP_SHOP_DELETE', `Deleted store ${name}`);
    addToast(`Store ${name} removed from layout`, 'danger');
  };
  const toggleShopStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'OPEN' ? 'CLOSED' : 'OPEN';
    setDb(prev => ({
      ...prev,
      shops: shops.map(s => s.id === id ? {
        ...s,
        status: nextStatus
      } : s)
    }));
    addToast(`Store status set to ${nextStatus}`, 'info');
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontWeight: 800,
      margin: 0
    }
  }, "\uD83D\uDDFA\uFE0F Airport Layout & AI Live Transportation ETAs \u2014 ", aptName, " (", aptCode, ")"), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-success",
    style: {
      fontSize: '0.7rem'
    }
  }, "\uD83E\uDD16 AI Realtime ETAs Active")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--accent-cyan)',
      marginTop: '0.2rem'
    }
  }, "Nearest Metro, Express Bus, Inter-Terminal Shuttle & Taxi Hubs with live AI arrival countdowns")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.4rem',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: `btn ${mapSection === 'transportation' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setMapSection('transportation')
  }, "\uD83D\uDE86 Nearest Transit & AI ETAs"), /*#__PURE__*/React.createElement("button", {
    className: `btn ${mapSection === 'terminals' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setMapSection('terminals')
  }, "\uD83C\uDFE2 Terminals & Gates"), /*#__PURE__*/React.createElement("button", {
    className: `btn ${mapSection === 'runways' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setMapSection('runways')
  }, "\uD83D\uDEEB Runways & Taxiways"), /*#__PURE__*/React.createElement("button", {
    className: `btn ${mapSection === 'shops' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setMapSection('shops')
  }, "\uD83D\uDECD\uFE0F Commercial Outlets"))), canManage && /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      background: 'rgba(245,158,11,0.06)',
      border: '1px solid rgba(245,158,11,0.3)',
      padding: '0.85rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.85rem',
      color: 'var(--accent-amber)',
      fontWeight: 700
    }
  }, "\uD83D\uDC51 Admin Map Editor & Layout Creator Active"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.78rem',
      color: 'var(--accent-cyan)',
      borderColor: 'rgba(0,242,254,0.3)'
    },
    onClick: () => {
      setTerminalForm({
        id: '',
        name: '',
        code: `T${terminals.length + 1}`,
        type: 'Domestic',
        status: 'Active',
        description: ''
      });
      setEditTerminalId(null);
      setShowTerminalModal(true);
    }
  }, "+ Add New Terminal"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.78rem',
      color: 'var(--accent-emerald)',
      borderColor: 'rgba(16,185,129,0.3)'
    },
    onClick: () => {
      setGateForm({
        id: '',
        terminal: terminals[0]?.code || 'T3',
        type: 'Widebody',
        status: 'Available',
        flight: '',
        compat: 'A320/B787',
        pax: 0,
        mapUrl: ''
      });
      setEditGateId(null);
      setShowGateModal(true);
    }
  }, "+ Add New Gate"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.78rem',
      color: 'var(--accent-amber)',
      borderColor: 'rgba(245,158,11,0.3)'
    },
    onClick: () => {
      setRunwayForm({
        id: '',
        name: `Runway 0${runways.length + 1}`,
        length: '3,800m',
        ilsCategory: 'CAT-II',
        status: 'Active',
        trafficLevel: 'Moderate'
      });
      setEditRunwayId(null);
      setShowRunwayModal(true);
    }
  }, "+ Add New Runway"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      fontSize: '0.78rem',
      background: 'linear-gradient(135deg, var(--accent-amber), #d97706)',
      color: '#000',
      fontWeight: 800
    },
    onClick: () => {
      setShopForm({
        id: '',
        name: '',
        category: 'Retail',
        terminal: terminals[0]?.code || 'T3',
        location: '',
        status: 'OPEN',
        operatingHours: '24/7',
        mapUrl: ''
      });
      setEditShopId(null);
      setShowShopModal(true);
    }
  }, "+ Add New Shop / Store"))), mapSection === 'transportation' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      border: '2px solid var(--accent-cyan)',
      background: 'rgba(0,242,254,0.03)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDDFA\uFE0F"), " Airport Ground Transit Map & Live AI Arrival ETAs"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-secondary)',
      marginTop: '0.25rem'
    }
  }, "Real-time AI prediction algorithm updating departure countdowns every second based on GPS telemetry & traffic data.")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      fontSize: '0.8rem',
      background: 'linear-gradient(135deg, var(--accent-cyan), #0284c7)'
    },
    onClick: handleManualRefreshAI
  }, "\u26A1 Recalculate AI ETAs Now")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#070a12',
      borderRadius: '10px',
      padding: '1.25rem',
      border: '1px dashed var(--accent-cyan)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--accent-cyan)',
      fontWeight: 700,
      letterSpacing: '1px',
      textTransform: 'uppercase',
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCCD INTERACTIVE AIRPORT GROUND TRANSPORT SCHEMATIC"), /*#__PURE__*/React.createElement("span", null, "AI PRECISION MODEL v4.2 (ACCURACY 99.8%)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '1rem'
    }
  }, transitData.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.id,
    style: {
      background: 'rgba(0,0,0,0.6)',
      border: '1px solid var(--accent-cyan)',
      borderRadius: '8px',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      position: 'relative',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: '0 4px 15px rgba(0,242,254,0.08)',
      cursor: 'pointer'
    },
    onClick: e => openGoogleMap(item, 'transit', e),
    title: "Click to open this Transit Station location on Google Maps"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.4rem'
    }
  }, item.icon), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '0.9rem',
      color: '#fff'
    }
  }, item.type)), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-success",
    style: {
      fontSize: '0.62rem'
    }
  }, item.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--accent-cyan)',
      fontWeight: 700
    }
  }, item.name), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'linear-gradient(135deg, rgba(0,242,254,0.15), rgba(16,185,129,0.15))',
      border: '1px solid var(--accent-emerald)',
      padding: '0.5rem',
      borderRadius: '6px',
      display: 'flex',
      justify: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-secondary)'
    }
  }, "NEXT DEPARTURE ETA:"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.1rem',
      fontFamily: 'var(--font-mono)',
      fontWeight: 800,
      color: 'var(--accent-emerald)',
      letterSpacing: '1px'
    }
  }, "\u23F1\uFE0F ", formatETA(item.nextDepartureSec))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)'
    }
  }, "\uD83D\uDCCD ", item.location), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.68rem',
      color: 'var(--accent-cyan)',
      fontWeight: 600,
      marginTop: '0.2rem'
    }
  }, "\uD83D\uDCCC Click to open station location on Google Maps \u2192")))))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, transitData.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.id,
    className: "glass-card",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.85rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid var(--border-color)',
      paddingBottom: '0.6rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.6rem'
    }
  }, item.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '1.05rem',
      color: 'var(--accent-cyan)'
    }
  }, item.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Terminal Hub: ", item.terminal))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.2rem',
      fontFamily: 'var(--font-mono)',
      fontWeight: 800,
      color: 'var(--accent-emerald)'
    }
  }, formatETA(item.nextDepartureSec)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.68rem',
      color: 'var(--text-muted)'
    }
  }, "Next Live Departure"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(0,0,0,0.2)',
      padding: '0.75rem',
      borderRadius: '6px',
      fontSize: '0.8rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.3rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Frequency:"), /*#__PURE__*/React.createElement("strong", null, item.frequency)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "AI Congestion / Traffic Index:"), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--accent-amber)'
    }
  }, item.aiCrowdIndex)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "AI Telemetry Accuracy:"), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--accent-emerald)'
    }
  }, item.aiConfidence))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      fontWeight: 700,
      color: 'var(--accent-cyan)',
      marginBottom: '0.4rem'
    }
  }, "\uD83C\uDFC1 Key Destinations & Travel Times:"), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      fontSize: '0.78rem',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: 'var(--text-secondary)',
      borderBottom: '1px solid var(--border-color)',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '0.35rem 0'
    }
  }, "Destination"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'center'
    }
  }, "Travel Time"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, "Fare (\u20B9)"))), /*#__PURE__*/React.createElement("tbody", null, item.destinations.map((d, idx) => /*#__PURE__*/React.createElement("tr", {
    key: idx,
    style: {
      borderBottom: '1px solid rgba(255,255,255,0.04)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0.4rem 0',
      fontWeight: 600
    }
  }, d.station), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'center',
      color: 'var(--accent-cyan)',
      fontFamily: 'var(--font-mono)',
      fontWeight: 700
    }
  }, d.travelTime), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right',
      color: 'var(--accent-emerald)',
      fontWeight: 800
    }
  }, d.fare)))))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      marginTop: 'auto',
      justifyContent: 'center',
      fontSize: '0.8rem',
      color: 'var(--accent-cyan)',
      borderColor: 'rgba(0,242,254,0.3)'
    },
    onClick: e => openGoogleMap(item, 'transit', e)
  }, "\uD83D\uDCCD Open ", item.name, " Location on Google Maps"))))), mapSection === 'terminals' && /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, terminals.map(term => {
    const tGates = (db.gates || []).filter(g => g.terminal === term.code || g.terminal === term.id);
    const occupied = tGates.filter(g => g.status === 'Occupied').length;
    return /*#__PURE__*/React.createElement("div", {
      key: term.id,
      className: "glass-card",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-header",
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-title",
      style: {
        fontSize: '1rem',
        color: 'var(--accent-cyan)'
      }
    }, "\uD83C\uDFE2 ", term.name), /*#__PURE__*/React.createElement("span", {
      className: `badge ${term.status === 'Active' ? 'badge-success' : 'badge-danger'}`
    }, term.status)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.78rem',
        color: 'var(--text-secondary)'
      }
    }, term.description), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-around',
        textAlign: 'center',
        background: 'rgba(0,0,0,0.2)',
        padding: '0.5rem',
        borderRadius: '8px'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '1.2rem',
        fontWeight: 800,
        color: 'var(--accent-cyan)'
      }
    }, tGates.length), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.65rem',
        color: 'var(--text-secondary)'
      }
    }, "Gates")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '1.2rem',
        fontWeight: 800,
        color: 'var(--accent-emerald)'
      }
    }, occupied), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.65rem',
        color: 'var(--text-secondary)'
      }
    }, "Occupied")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '1.2rem',
        fontWeight: 800,
        color: 'var(--accent-amber)'
      }
    }, tGates.filter(g => g.status === 'Available').length), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.65rem',
        color: 'var(--text-secondary)'
      }
    }, "Available"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.75rem',
        fontWeight: 700,
        color: 'var(--text-secondary)',
        marginBottom: '0.35rem'
      }
    }, "Concourse Boarding Gates:"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.4rem'
      }
    }, tGates.map(g => /*#__PURE__*/React.createElement("div", {
      key: g.id,
      style: {
        padding: '0.45rem 0.3rem',
        borderRadius: 'var(--radius-sm)',
        textAlign: 'center',
        fontSize: '0.68rem',
        fontWeight: 700,
        background: g.status === 'Occupied' ? 'rgba(16,185,129,0.2)' : g.status === 'Maintenance' ? 'rgba(244,63,94,0.2)' : g.status === 'Reserved' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${g.status === 'Occupied' ? 'rgba(16,185,129,0.4)' : g.status === 'Maintenance' ? 'rgba(244,63,94,0.4)' : g.status === 'Reserved' ? 'rgba(245,158,11,0.4)' : 'var(--border-color)'}`,
        color: g.status === 'Occupied' ? 'var(--accent-emerald)' : g.status === 'Maintenance' ? 'var(--accent-rose)' : g.status === 'Reserved' ? 'var(--accent-amber)' : 'var(--text-secondary)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.15s, border-color 0.15s'
      },
      onClick: e => openGoogleMap(g, 'gate', e),
      title: `Click to open Gate ${g.id} location on Google Maps`
    }, /*#__PURE__*/React.createElement("div", null, g.id), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.6rem',
        opacity: 0.85,
        marginTop: '1px'
      }
    }, g.flight || g.status), canManage && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        gap: '3px',
        marginTop: '4px'
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-secondary",
      style: {
        padding: '1px 4px',
        fontSize: '0.58rem'
      },
      onClick: e => {
        e.stopPropagation();
        setGateForm({
          ...g,
          flight: g.flight || '',
          compat: g.compat || '',
          pax: g.pax || 0,
          mapUrl: g.mapUrl || ''
        });
        setEditGateId(g.id);
        setShowGateModal(true);
      },
      title: "Edit Gate Details"
    }, "\u270F\uFE0F Edit"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-secondary",
      style: {
        padding: '1px 4px',
        fontSize: '0.58rem',
        color: 'var(--accent-rose)'
      },
      onClick: e => {
        e.stopPropagation();
        handleDeleteGate(g.id);
      },
      title: "Delete Gate"
    }, "\u2715")))))), canManage && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'auto',
        paddingTop: '0.5rem',
        borderTop: '1px dashed var(--border-color)',
        display: 'flex',
        gap: '0.35rem'
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-secondary",
      style: {
        fontSize: '0.7rem',
        padding: '0.2rem 0.4rem',
        flex: 1
      },
      onClick: () => {
        setTerminalForm({
          ...term
        });
        setEditTerminalId(term.id);
        setShowTerminalModal(true);
      }
    }, "\u270F\uFE0F Edit Terminal"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-secondary",
      style: {
        fontSize: '0.7rem',
        padding: '0.2rem 0.4rem',
        color: 'var(--accent-emerald)'
      },
      onClick: () => {
        setGateForm({
          id: `${term.code}-G${Date.now().toString().slice(-2)}`,
          terminal: term.code,
          type: 'Narrowbody',
          status: 'Available',
          flight: '',
          compat: 'A320/B737',
          pax: 0,
          mapUrl: ''
        });
        setEditGateId(null);
        setShowGateModal(true);
      }
    }, "+ Add Gate"), isAdmin && /*#__PURE__*/React.createElement("button", {
      className: "btn btn-secondary",
      style: {
        fontSize: '0.7rem',
        padding: '0.2rem 0.4rem',
        color: 'var(--accent-rose)'
      },
      onClick: () => handleDeleteTerminal(term.id, term.name)
    }, "\uD83D\uDDD1\uFE0F")));
  })), mapSection === 'runways' && /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, "\uD83D\uDEEB Active Airside Runways & Taxiway Layout"), canManage && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      fontSize: '0.78rem'
    },
    onClick: () => {
      setRunwayForm({
        id: '',
        name: `Runway 0${runways.length + 1}`,
        length: '3,800m',
        ilsCategory: 'CAT-II',
        status: 'Active',
        trafficLevel: 'Moderate'
      });
      setEditRunwayId(null);
      setShowRunwayModal(true);
    }
  }, "+ Add Runway")), /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, runways.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
      padding: '1rem',
      border: `1px solid ${r.status === 'Active' ? 'rgba(16,185,129,0.3)' : 'rgba(244,63,94,0.3)'}`,
      borderRadius: 'var(--radius-md)',
      background: 'rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '0.95rem',
      color: 'var(--accent-cyan)'
    }
  }, r.name), /*#__PURE__*/React.createElement("span", {
    className: `badge ${r.status === 'Active' ? 'badge-success' : 'badge-danger'}`
  }, r.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-secondary)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Length: ", /*#__PURE__*/React.createElement("strong", null, r.length)), /*#__PURE__*/React.createElement("div", null, "ILS Navigation: ", /*#__PURE__*/React.createElement("strong", null, r.ilsCategory)), /*#__PURE__*/React.createElement("div", null, "Traffic Density: ", /*#__PURE__*/React.createElement("strong", null, r.trafficLevel))), canManage && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '0.5rem',
      display: 'flex',
      gap: '0.35rem',
      paddingTop: '0.5rem',
      borderTop: '1px dashed var(--border-color)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.4rem',
      flex: 1
    },
    onClick: () => {
      setRunwayForm({
        ...r
      });
      setEditRunwayId(r.id);
      setShowRunwayModal(true);
    }
  }, "\u270F\uFE0F Edit"), isAdmin && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.4rem',
      color: 'var(--accent-rose)'
    },
    onClick: () => handleDeleteRunway(r.id, r.name)
  }, "\uD83D\uDDD1\uFE0F Delete")))))), mapSection === 'shops' && /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      flexWrap: 'wrap',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-amber)'
    }
  }, "\uD83D\uDECD\uFE0F Retail Shops, Dining & Commercial Directory (", shops.length, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)',
      marginTop: '0.15rem'
    }
  }, "Explore commercial outlets, duty-free stores, food courts, and lounges across all airport terminals")), canManage && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      background: 'linear-gradient(135deg, var(--accent-amber), #d97706)',
      color: '#000',
      fontWeight: 800
    },
    onClick: () => {
      setShopForm({
        id: '',
        name: '',
        category: 'Retail',
        terminal: terminals[0]?.code || 'T3',
        location: '',
        status: 'OPEN',
        operatingHours: '24/7',
        mapUrl: ''
      });
      setEditShopId(null);
      setShowShopModal(true);
    }
  }, "+ Add New Shop / Restaurant")), /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, shops.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    className: "glass-card",
    style: {
      padding: '0.9rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      borderColor: s.status === 'OPEN' ? 'rgba(16,185,129,0.3)' : 'rgba(244,63,94,0.3)',
      cursor: 'pointer'
    },
    onClick: e => openGoogleMap(s, 'shop', e),
    title: `Click to open ${s.name} location on Google Maps`
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '0.95rem',
      color: 'var(--accent-cyan)'
    }
  }, s.name), /*#__PURE__*/React.createElement("span", {
    className: `badge ${s.status === 'OPEN' ? 'badge-success' : 'badge-danger'}`
  }, s.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.2rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--accent-amber)',
      fontWeight: 600
    }
  }, "Category: ", s.category), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Terminal & Location: ", /*#__PURE__*/React.createElement("strong", null, s.terminal, " \u2022 ", s.location)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "Hours: ", /*#__PURE__*/React.createElement("strong", null, s.operatingHours))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--accent-cyan)',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: '0.2rem',
      marginTop: '0.1rem'
    }
  }, /*#__PURE__*/React.createElement("em", null, "Click tile to view on Google Maps")), canManage && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '0.3rem',
      display: 'flex',
      gap: '0.35rem',
      paddingTop: '0.5rem',
      borderTop: '1px dashed var(--border-color)'
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.4rem',
      flex: 1
    },
    onClick: e => {
      e.stopPropagation();
      toggleShopStatus(s.id, s.status);
    }
  }, s.status === 'OPEN' ? '🔒 Mark Closed' : '🟢 Mark Open'), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.4rem'
    },
    onClick: e => {
      e.stopPropagation();
      setShopForm({
        ...s
      });
      setEditShopId(s.id);
      setShowShopModal(true);
    }
  }, "\u270F\uFE0F Edit"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.4rem',
      color: 'var(--accent-rose)'
    },
    onClick: e => {
      e.stopPropagation();
      handleDeleteShop(s.id, s.name);
    }
  }, "\uD83D\uDDD1\uFE0F")))))), showTerminalModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) setShowTerminalModal(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '480px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      borderBottom: '1px solid var(--border-color)',
      paddingBottom: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)'
    }
  }, editTerminalId ? '✏️ Edit Terminal' : '🏢 Add New Terminal to Airport Map'), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setShowTerminalModal(false)
  }, "\xD7")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveTerminal,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Terminal Name"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "e.g. Terminal 4 (Executive VIP)",
    value: terminalForm.name,
    onChange: e => setTerminalForm({
      ...terminalForm,
      name: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Terminal Code"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "T4",
    value: terminalForm.code,
    onChange: e => setTerminalForm({
      ...terminalForm,
      code: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Terminal Type"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: terminalForm.type,
    onChange: e => setTerminalForm({
      ...terminalForm,
      type: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "Domestic"), /*#__PURE__*/React.createElement("option", null, "International"), /*#__PURE__*/React.createElement("option", null, "Cargo & Executive")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Description"), /*#__PURE__*/React.createElement("textarea", {
    className: "form-input",
    rows: "2",
    value: terminalForm.description,
    onChange: e => setTerminalForm({
      ...terminalForm,
      description: e.target.value
    })
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, editTerminalId ? 'Save Changes' : 'Create Terminal')))), showGateModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) setShowGateModal(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '480px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      borderBottom: '1px solid var(--border-color)',
      paddingBottom: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-emerald)'
    }
  }, editGateId ? `✏️ Edit Gate ${editGateId}` : '🚪 Add New Boarding Gate'), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setShowGateModal(false)
  }, "\xD7")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveGate,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Gate Identifier / Code"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "e.g. T3-G45",
    value: gateForm.id,
    onChange: e => setGateForm({
      ...gateForm,
      id: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Assigned Terminal"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: gateForm.terminal,
    onChange: e => setGateForm({
      ...gateForm,
      terminal: e.target.value
    })
  }, terminals.map(t => /*#__PURE__*/React.createElement("option", {
    key: t.id,
    value: t.code
  }, t.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Gate Type"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: gateForm.type,
    onChange: e => setGateForm({
      ...gateForm,
      type: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "Narrowbody"), /*#__PURE__*/React.createElement("option", null, "Widebody"), /*#__PURE__*/React.createElement("option", null, "Regional Jet"), /*#__PURE__*/React.createElement("option", null, "Super Jumbo (A380)")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Gate Status"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: gateForm.status,
    onChange: e => setGateForm({
      ...gateForm,
      status: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "Available"), /*#__PURE__*/React.createElement("option", null, "Occupied"), /*#__PURE__*/React.createElement("option", null, "Reserved"), /*#__PURE__*/React.createElement("option", null, "Maintenance"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Assigned Flight"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "e.g. AI-101 or None",
    value: gateForm.flight || '',
    onChange: e => setGateForm({
      ...gateForm,
      flight: e.target.value || null
    })
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Aircraft Compatibility"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "e.g. A320/B787/A350",
    value: gateForm.compat || '',
    onChange: e => setGateForm({
      ...gateForm,
      compat: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Passengers Count"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "form-input",
    value: gateForm.pax || 0,
    onChange: e => setGateForm({
      ...gateForm,
      pax: parseInt(e.target.value) || 0
    })
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Google Maps Location Link / Map URL (Optional)"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "https://maps.google.com/?q=Delhi+Airport+T3+Gate+42",
    value: gateForm.mapUrl || '',
    onChange: e => setGateForm({
      ...gateForm,
      mapUrl: e.target.value
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.65rem',
      color: 'var(--text-muted)',
      marginTop: '0.15rem'
    }
  }, "*If left blank, Google Maps pinpoints this gate automatically.*")), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, editGateId ? 'Save Gate Changes' : 'Create Boarding Gate')))), showRunwayModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) setShowRunwayModal(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '450px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      borderBottom: '1px solid var(--border-color)',
      paddingBottom: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-amber)'
    }
  }, editRunwayId ? '✏️ Edit Runway' : '🛫 Add New Runway / Taxiway'), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setShowRunwayModal(false)
  }, "\xD7")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveRunway,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Runway Name"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "Runway 28R/10L",
    value: runwayForm.name,
    onChange: e => setRunwayForm({
      ...runwayForm,
      name: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Length"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "4,200m",
    value: runwayForm.length,
    onChange: e => setRunwayForm({
      ...runwayForm,
      length: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "ILS Category"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: runwayForm.ilsCategory,
    onChange: e => setRunwayForm({
      ...runwayForm,
      ilsCategory: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "CAT-III B"), /*#__PURE__*/React.createElement("option", null, "CAT-III A"), /*#__PURE__*/React.createElement("option", null, "CAT-II"), /*#__PURE__*/React.createElement("option", null, "CAT-I"), /*#__PURE__*/React.createElement("option", null, "N/A")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Status"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: runwayForm.status,
    onChange: e => setRunwayForm({
      ...runwayForm,
      status: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "Active"), /*#__PURE__*/React.createElement("option", null, "Under Maintenance"), /*#__PURE__*/React.createElement("option", null, "Closed"))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, editRunwayId ? 'Save Changes' : 'Create Runway')))), showShopModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) setShowShopModal(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '480px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      borderBottom: '1px solid var(--border-color)',
      paddingBottom: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-amber)'
    }
  }, editShopId ? '✏️ Edit Commercial Store / Restaurant' : '🛍️ Add New Shop / Restaurant Outlet'), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setShowShopModal(false)
  }, "\xD7")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveShop,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Store / Restaurant Name"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "e.g. Costa Coffee, Nike Retail",
    value: shopForm.name,
    onChange: e => setShopForm({
      ...shopForm,
      name: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Category"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: shopForm.category,
    onChange: e => setShopForm({
      ...shopForm,
      category: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "Retail"), /*#__PURE__*/React.createElement("option", null, "Duty Free"), /*#__PURE__*/React.createElement("option", null, "Food & Beverage"), /*#__PURE__*/React.createElement("option", null, "Lounge & Hospitality"), /*#__PURE__*/React.createElement("option", null, "Pharmacy & Health"), /*#__PURE__*/React.createElement("option", null, "Currency Exchange"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Terminal"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: shopForm.terminal,
    onChange: e => setShopForm({
      ...shopForm,
      terminal: e.target.value
    })
  }, terminals.map(t => /*#__PURE__*/React.createElement("option", {
    key: t.id,
    value: t.code
  }, t.name))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Specific Location / Gate Area"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "T3 Departure Airside Concourse Gate 28",
    value: shopForm.location,
    onChange: e => setShopForm({
      ...shopForm,
      location: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Operating Hours"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "24/7 or 06:00 - 23:00",
    value: shopForm.operatingHours,
    onChange: e => setShopForm({
      ...shopForm,
      operatingHours: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Status"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: shopForm.status,
    onChange: e => setShopForm({
      ...shopForm,
      status: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "OPEN"), /*#__PURE__*/React.createElement("option", null, "CLOSED"), /*#__PURE__*/React.createElement("option", null, "RENOVATING")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Google Maps Location Link / Map URL (Optional)"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "https://maps.google.com/?q=Delhi+Duty+Free+T3",
    value: shopForm.mapUrl || '',
    onChange: e => setShopForm({
      ...shopForm,
      mapUrl: e.target.value
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.65rem',
      color: 'var(--text-muted)',
      marginTop: '0.15rem'
    }
  }, "*If left blank, Google Maps pinpoints this store automatically.*")), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      background: 'linear-gradient(135deg, var(--accent-amber), #d97706)',
      color: '#000',
      fontWeight: 800
    }
  }, editShopId ? 'Save Changes' : 'Create Shop Entry')))));
}
function FlightsView({
  db,
  setDb,
  isAdmin,
  canManageFlights,
  addToast,
  appendAuditLog,
  searchQuery,
  activeAirport
}) {
  const aptCode = activeAirport?.code || 'DEL';
  const aptCity = activeAirport?.city || 'Delhi';
  const [showAddModal, setShowAddModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [flightForm, setFlightForm] = useState({
    flightNumber: '',
    airline: '',
    type: 'Departure',
    destination: '',
    origin: `${aptCity} (${aptCode})`,
    scheduledTime: '',
    estimatedTime: '',
    terminal: 'T3',
    gate: '',
    status: 'Scheduled',
    pax: 0,
    maxPax: 186,
    bags: 0,
    aircraft: '',
    aiDelayRisk: 0,
    boardingPct: 0
  });
  const [filterType, setFilterType] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const filtered = db.flights.filter(f => {
    if (filterType !== 'ALL' && f.type !== filterType) return false;
    if (filterStatus !== 'ALL' && f.status !== filterStatus) return false;
    if (searchQuery && !f.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) && !f.airline.toLowerCase().includes(searchQuery.toLowerCase()) && !f.destination.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });
  const handleSaveFlight = e => {
    e.preventDefault();
    if (editId) {
      setDb(prev => ({
        ...prev,
        flights: prev.flights.map(f => f.id === editId ? {
          ...f,
          ...flightForm
        } : f)
      }));
      appendAuditLog('FLIGHT_UPDATE', `Updated ${flightForm.flightNumber}`);
      addToast(`Flight ${flightForm.flightNumber} updated!`, 'success');
    } else {
      const nf = {
        id: `FL-${Date.now().toString().slice(-3)}`,
        ...flightForm
      };
      setDb(prev => ({
        ...prev,
        flights: [...prev.flights, nf]
      }));
      appendAuditLog('FLIGHT_CREATE', `Created flight ${flightForm.flightNumber}`);
      addToast(`Flight ${flightForm.flightNumber} added!`, 'success');
    }
    setShowAddModal(false);
    setEditId(null);
  };
  const handleDeleteFlight = (id, fn) => {
    setDb(prev => ({
      ...prev,
      flights: prev.flights.filter(f => f.id !== id)
    }));
    appendAuditLog('FLIGHT_DELETE', `Deleted flight ${fn}`);
    addToast(`Flight ${fn} deleted`, 'danger');
  };
  const openEdit = f => {
    setFlightForm({
      flightNumber: f.flightNumber,
      airline: f.airline,
      type: f.type,
      destination: f.destination,
      origin: f.origin,
      scheduledTime: f.scheduledTime,
      estimatedTime: f.estimatedTime,
      terminal: f.terminal,
      gate: f.gate,
      status: f.status,
      pax: f.pax,
      maxPax: f.maxPax,
      bags: f.bags,
      aircraft: f.aircraft,
      aiDelayRisk: f.aiDelayRisk,
      boardingPct: f.boardingPct
    });
    setEditId(f.id);
    setShowAddModal(true);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontWeight: 800
    }
  }, "\u2708\uFE0F Flight Information Display System (FIDS) \u2014 ", aptCity, " (", aptCode, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--accent-cyan)',
      marginTop: '0.2rem'
    }
  }, "Showing active flights for AAI ", activeAirport?.name || 'Indira Gandhi International Airport')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: filterType,
    onChange: e => setFilterType(e.target.value),
    style: {
      width: 'auto'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "ALL"
  }, "All Types"), /*#__PURE__*/React.createElement("option", {
    value: "Departure"
  }, "Departures"), /*#__PURE__*/React.createElement("option", {
    value: "Arrival"
  }, "Arrivals")), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: filterStatus,
    onChange: e => setFilterStatus(e.target.value),
    style: {
      width: 'auto'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "ALL"
  }, "All Status"), /*#__PURE__*/React.createElement("option", {
    value: "Boarding"
  }, "Boarding"), /*#__PURE__*/React.createElement("option", {
    value: "Delayed"
  }, "Delayed"), /*#__PURE__*/React.createElement("option", {
    value: "On Time"
  }, "On Time"), /*#__PURE__*/React.createElement("option", {
    value: "Landed"
  }, "Landed"), /*#__PURE__*/React.createElement("option", {
    value: "In Flight"
  }, "In Flight"), /*#__PURE__*/React.createElement("option", {
    value: "Scheduled"
  }, "Scheduled"), /*#__PURE__*/React.createElement("option", {
    value: "Check-in Open"
  }, "Check-in Open")), isAdmin && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => {
      setFlightForm({
        flightNumber: '',
        airline: '',
        type: 'Departure',
        destination: '',
        origin: `${aptCity} (${aptCode})`,
        scheduledTime: '',
        estimatedTime: '',
        terminal: 'T3',
        gate: '',
        status: 'Scheduled',
        pax: 0,
        maxPax: 186,
        bags: 0,
        aircraft: '',
        aiDelayRisk: 0,
        boardingPct: 0
      });
      setEditId(null);
      setShowAddModal(true);
    }
  }, "+ Add Flight"))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      fontSize: '0.82rem',
      borderCollapse: 'collapse',
      minWidth: '900px'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '2px solid var(--border-color)',
      color: 'var(--text-secondary)',
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '0.75rem',
      textAlign: 'left'
    }
  }, "Flight"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Airline"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Route"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "STD/STA"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "ETD/ETA"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Terminal"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Gate"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Aircraft"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Status"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Pax"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "AI Risk"), isAdmin && /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'center'
    }
  }, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, filtered.map(f => /*#__PURE__*/React.createElement("tr", {
    key: f.id,
    style: {
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      transition: 'background 0.2s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0.75rem',
      fontWeight: 700,
      color: 'var(--accent-cyan)'
    }
  }, f.flightNumber), /*#__PURE__*/React.createElement("td", null, f.airline), /*#__PURE__*/React.createElement("td", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, f.type === 'Departure' ? `DEL → ${f.destination.match(/\((\w+)\)/)?.[1] || ''}` : `${f.origin.match(/\((\w+)\)/)?.[1] || ''} → DEL`), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, f.scheduledTime), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: f.estimatedTime !== f.scheduledTime ? 'var(--accent-rose)' : 'var(--accent-emerald)'
    }
  }, f.estimatedTime), /*#__PURE__*/React.createElement("td", null, f.terminal), /*#__PURE__*/React.createElement("td", null, f.gate), /*#__PURE__*/React.createElement("td", {
    style: {
      fontSize: '0.76rem',
      color: 'var(--text-secondary)'
    }
  }, f.aircraft), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `badge ${f.status === 'Delayed' ? 'badge-danger' : f.status === 'Boarding' || f.status === 'Landed' ? 'badge-success' : f.status === 'In Flight' ? 'badge-warning' : 'badge-info'}`
  }, f.status)), /*#__PURE__*/React.createElement("td", null, f.pax, "/", f.maxPax), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '40px',
      height: '6px',
      borderRadius: '3px',
      background: 'rgba(255,255,255,0.1)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${f.aiDelayRisk}%`,
      height: '100%',
      background: f.aiDelayRisk > 50 ? 'var(--accent-rose)' : f.aiDelayRisk > 20 ? 'var(--accent-amber)' : 'var(--accent-emerald)',
      borderRadius: '3px'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.7rem',
      color: 'var(--text-muted)'
    }
  }, f.aiDelayRisk, "%")), isAdmin && /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      padding: '0.2rem 0.5rem',
      fontSize: '0.7rem',
      marginRight: '0.25rem'
    },
    onClick: () => openEdit(f)
  }, "\u270F\uFE0F Edit"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      padding: '0.2rem 0.5rem',
      fontSize: '0.7rem',
      color: 'var(--accent-rose)'
    },
    onClick: () => handleDeleteFlight(f.id, f.flightNumber)
  }, "\uD83D\uDDD1\uFE0F Delete"))))))), showAddModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) {
        setShowAddModal(false);
        setEditId(null);
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '700px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)'
    }
  }, editId ? '✏️ Edit Flight' : '➕ Add New Flight'), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => {
      setShowAddModal(false);
      setEditId(null);
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveFlight,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Flight Number"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: flightForm.flightNumber,
    onChange: e => setFlightForm({
      ...flightForm,
      flightNumber: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Airline"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: flightForm.airline,
    onChange: e => setFlightForm({
      ...flightForm,
      airline: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Type"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: flightForm.type,
    onChange: e => setFlightForm({
      ...flightForm,
      type: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: "Departure"
  }, "Departure"), /*#__PURE__*/React.createElement("option", {
    value: "Arrival"
  }, "Arrival"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Status"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: flightForm.status,
    onChange: e => setFlightForm({
      ...flightForm,
      status: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "Scheduled"), /*#__PURE__*/React.createElement("option", null, "Check-in Open"), /*#__PURE__*/React.createElement("option", null, "Boarding"), /*#__PURE__*/React.createElement("option", null, "Delayed"), /*#__PURE__*/React.createElement("option", null, "In Flight"), /*#__PURE__*/React.createElement("option", null, "Landed"), /*#__PURE__*/React.createElement("option", null, "On Time"), /*#__PURE__*/React.createElement("option", null, "Cancelled"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Origin"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: flightForm.origin,
    onChange: e => setFlightForm({
      ...flightForm,
      origin: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Destination"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: flightForm.destination,
    onChange: e => setFlightForm({
      ...flightForm,
      destination: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Scheduled Time"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: flightForm.scheduledTime,
    onChange: e => setFlightForm({
      ...flightForm,
      scheduledTime: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Estimated Time"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: flightForm.estimatedTime,
    onChange: e => setFlightForm({
      ...flightForm,
      estimatedTime: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Terminal"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: flightForm.terminal,
    onChange: e => setFlightForm({
      ...flightForm,
      terminal: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "T1"), /*#__PURE__*/React.createElement("option", null, "T2"), /*#__PURE__*/React.createElement("option", null, "T3"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Gate"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    value: flightForm.gate,
    onChange: e => setFlightForm({
      ...flightForm,
      gate: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Aircraft"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    value: flightForm.aircraft,
    onChange: e => setFlightForm({
      ...flightForm,
      aircraft: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "AI Delay Risk %"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "form-input",
    value: flightForm.aiDelayRisk,
    onChange: e => setFlightForm({
      ...flightForm,
      aiDelayRisk: parseInt(e.target.value) || 0
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Passengers"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "form-input",
    value: flightForm.pax,
    onChange: e => setFlightForm({
      ...flightForm,
      pax: parseInt(e.target.value) || 0
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Max Capacity"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "form-input",
    value: flightForm.maxPax,
    onChange: e => setFlightForm({
      ...flightForm,
      maxPax: parseInt(e.target.value) || 0
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      width: '100%'
    }
  }, editId ? 'Save Changes' : 'Add Flight'))))));
}

// ═══════════════════════════════════════════════════════
// 4. GATES VIEW
// ═══════════════════════════════════════════════════════

function GatesView({
  db,
  setDb,
  isAdmin,
  isStaff,
  addToast,
  appendAuditLog,
  activeAirport
}) {
  const aptCode = activeAirport?.code || 'DEL';
  const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
  const canManage = isAdmin || isStaff;
  const [showAddModal, setShowAddModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [gateForm, setGateForm] = useState({
    id: '',
    terminal: 'T3',
    status: 'Available',
    flight: '',
    type: 'Widebody',
    pax: 0,
    compat: '',
    mapUrl: ''
  });
  const openGoogleMap = (item, type, e) => {
    if (e) e.stopPropagation();
    const mapUrl = item.mapUrl && item.mapUrl.trim() ? item.mapUrl.startsWith('http') ? item.mapUrl : `https://${item.mapUrl}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(type === 'gate' ? `${aptName} Terminal ${item.terminal || ''} Gate ${item.id}` : `${item.name} ${item.location || ''} ${aptName}`)}`;
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };
  const handleSaveGate = e => {
    e.preventDefault();
    if (editId) {
      setDb(prev => ({
        ...prev,
        gates: prev.gates.map(g => g.id === editId ? {
          ...g,
          ...gateForm,
          id: gateForm.id || editId
        } : g)
      }));
      appendAuditLog('GATE_UPDATE', `Updated gate ${gateForm.id || editId}`);
      addToast(`Gate ${gateForm.id || editId} updated!`, 'success');
    } else {
      const ng = {
        ...gateForm,
        id: gateForm.id || `G-${Date.now().toString().slice(-3)}`
      };
      setDb(prev => ({
        ...prev,
        gates: [...prev.gates, ng]
      }));
      appendAuditLog('GATE_CREATE', `Created gate ${ng.id}`);
      addToast(`Gate ${ng.id} added!`, 'success');
    }
    setShowAddModal(false);
    setEditId(null);
  };
  const handleDeleteGate = id => {
    setDb(prev => ({
      ...prev,
      gates: prev.gates.filter(g => g.id !== id)
    }));
    appendAuditLog('GATE_DELETE', `Deleted gate ${id}`);
    addToast(`Gate ${id} deleted`, 'danger');
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontWeight: 800
    }
  }, "\uD83D\uDEAA Intelligent Gate Allocation Matrix \u2014 ", aptName, " (", aptCode, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--accent-cyan)',
      marginTop: '0.2rem'
    }
  }, "Managing airside gates & apron stands for ", aptCode)), canManage && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => {
      setGateForm({
        id: '',
        terminal: 'T3',
        status: 'Available',
        flight: '',
        type: 'Widebody',
        pax: 0,
        compat: '',
        mapUrl: ''
      });
      setEditId(null);
      setShowAddModal(true);
    }
  }, "+ Add Gate")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    }
  }, ['Available', 'Occupied', 'Reserved', 'Maintenance'].map(s => {
    const count = db.gates.filter(g => g.status === s).length;
    return /*#__PURE__*/React.createElement("div", {
      key: s,
      className: "glass-card",
      style: {
        padding: '0.75rem 1.25rem',
        flex: '1',
        minWidth: '120px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '1.5rem',
        fontWeight: 800,
        color: s === 'Available' ? 'var(--accent-emerald)' : s === 'Occupied' ? 'var(--accent-cyan)' : s === 'Reserved' ? 'var(--accent-amber)' : 'var(--accent-rose)'
      }
    }, count), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.75rem',
        color: 'var(--text-secondary)',
        marginTop: '0.2rem'
      }
    }, s));
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid-4"
  }, db.gates.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.id,
    className: "glass-card",
    style: {
      padding: '1rem',
      borderColor: g.status === 'Occupied' ? 'rgba(16,185,129,0.4)' : g.status === 'Maintenance' ? 'rgba(244,63,94,0.4)' : g.status === 'Reserved' ? 'rgba(245,158,11,0.4)' : 'var(--border-color)',
      cursor: 'pointer'
    },
    onClick: e => openGoogleMap(g, 'gate', e),
    title: `Click to open Gate ${g.id} location on Google Maps`
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '1rem',
      color: 'var(--accent-cyan)'
    }
  }, "Gate ", g.id), /*#__PURE__*/React.createElement("span", {
    className: `badge ${g.status === 'Occupied' ? 'badge-success' : g.status === 'Available' ? 'badge-info' : g.status === 'Reserved' ? 'badge-warning' : 'badge-danger'}`
  }, g.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-secondary)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.2rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Terminal: ", /*#__PURE__*/React.createElement("strong", null, g.terminal)), /*#__PURE__*/React.createElement("div", null, "Type: ", /*#__PURE__*/React.createElement("strong", null, g.type)), /*#__PURE__*/React.createElement("div", null, "Compat: ", /*#__PURE__*/React.createElement("strong", null, g.compat || 'N/A')), g.flight && /*#__PURE__*/React.createElement("div", null, "Flight: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--accent-emerald)'
    }
  }, g.flight)), g.pax > 0 && /*#__PURE__*/React.createElement("div", null, "Passengers: ", /*#__PURE__*/React.createElement("strong", null, g.pax))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--accent-cyan)',
      fontWeight: 600,
      marginTop: '0.4rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.2rem'
    }
  }, /*#__PURE__*/React.createElement("em", null, "Click card to view on Google Maps")), canManage && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.3rem',
      marginTop: '0.5rem',
      paddingTop: '0.4rem',
      borderTop: '1px dashed var(--border-color)'
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      flex: 1,
      padding: '0.25rem',
      fontSize: '0.7rem'
    },
    onClick: e => {
      e.stopPropagation();
      setGateForm({
        ...g,
        flight: g.flight || '',
        compat: g.compat || '',
        pax: g.pax || 0,
        mapUrl: g.mapUrl || ''
      });
      setEditId(g.id);
      setShowAddModal(true);
    }
  }, "\u270F\uFE0F Edit Gate"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      padding: '0.25rem 0.5rem',
      fontSize: '0.7rem',
      color: 'var(--accent-rose)'
    },
    onClick: e => {
      e.stopPropagation();
      handleDeleteGate(g.id);
    }
  }, "\uD83D\uDDD1\uFE0F"))))), showAddModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) {
        setShowAddModal(false);
        setEditId(null);
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '480px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      borderBottom: '1px solid var(--border-color)',
      paddingBottom: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)'
    }
  }, editId ? `✏️ Edit Gate ${editId}` : '➕ Add Gate'), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => {
      setShowAddModal(false);
      setEditId(null);
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveGate,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Gate Identifier / Code"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "T3-G99",
    value: gateForm.id,
    onChange: e => setGateForm({
      ...gateForm,
      id: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Terminal"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: gateForm.terminal,
    onChange: e => setGateForm({
      ...gateForm,
      terminal: e.target.value
    })
  }, (db.terminals && db.terminals.length > 0 ? db.terminals : [{
    code: 'T1'
  }, {
    code: 'T2'
  }, {
    code: 'T3'
  }]).map(t => /*#__PURE__*/React.createElement("option", {
    key: t.code || t.id,
    value: t.code || t.id
  }, t.name || t.code)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Gate Type"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: gateForm.type,
    onChange: e => setGateForm({
      ...gateForm,
      type: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "Narrowbody"), /*#__PURE__*/React.createElement("option", null, "Widebody"), /*#__PURE__*/React.createElement("option", null, "Regional Jet"), /*#__PURE__*/React.createElement("option", null, "Super Jumbo (A380)")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Status"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: gateForm.status,
    onChange: e => setGateForm({
      ...gateForm,
      status: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "Available"), /*#__PURE__*/React.createElement("option", null, "Occupied"), /*#__PURE__*/React.createElement("option", null, "Reserved"), /*#__PURE__*/React.createElement("option", null, "Maintenance"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Assigned Flight"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "e.g. AI-101",
    value: gateForm.flight || '',
    onChange: e => setGateForm({
      ...gateForm,
      flight: e.target.value || null
    })
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Aircraft Compatibility"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "e.g. A320/B787",
    value: gateForm.compat || '',
    onChange: e => setGateForm({
      ...gateForm,
      compat: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Passenger Count"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "form-input",
    value: gateForm.pax || 0,
    onChange: e => setGateForm({
      ...gateForm,
      pax: parseInt(e.target.value) || 0
    })
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Google Maps Location Link / Map URL (Optional)"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "https://maps.google.com/?q=Delhi+Airport+T3+Gate+42",
    value: gateForm.mapUrl || '',
    onChange: e => setGateForm({
      ...gateForm,
      mapUrl: e.target.value
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.65rem',
      color: 'var(--text-muted)',
      marginTop: '0.15rem'
    }
  }, "*If left blank, Google Maps pinpoints this gate automatically.*")), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, editId ? 'Save Gate Changes' : 'Add Boarding Gate')))));
}

// ═══════════════════════════════════════════════════════
// 5. EMERGENCY VIEW
// ═══════════════════════════════════════════════════════

function EmergencyView({
  db,
  setDb,
  isAdmin,
  canManageEmergencies,
  addToast,
  appendAuditLog
}) {
  const emgList = (Array.isArray(db?.emergencies) && db.emergencies.length > 0) ? db.emergencies : (SEED.emergencies || []);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [emgForm, setEmgForm] = useState({
    category: 'Medical Emergency',
    severity: 'Code Yellow',
    title: '',
    location: '',
    responders: '',
    notes: '',
    status: 'ACTIVE',
    escalated: false
  });
  const handleSaveEmg = e => {
    e.preventDefault();
    if (editId) {
      setDb(prev => ({
        ...prev,
        emergencies: (prev.emergencies || emgList).map(em => em.id === editId ? {
          ...em,
          ...emgForm
        } : em)
      }));
      appendAuditLog('EMERGENCY_UPDATE', `Updated ${emgForm.title}`);
      addToast('Emergency updated!', 'success');
    } else {
      const ne = {
        id: `EMG-${Date.now().toString().slice(-3)}`,
        ...emgForm,
        timestamp: new Date().toLocaleString() + ' IST'
      };
      setDb(prev => ({
        ...prev,
        emergencies: [ne, ...(prev.emergencies || emgList)]
      }));
      appendAuditLog('EMERGENCY_CREATE', `Created: ${emgForm.title}`);
      addToast('🚨 Emergency incident created!', 'danger');
    }
    setShowAddModal(false);
    setEditId(null);
  };
  const handleDeleteEmg = id => {
    setDb(prev => ({
      ...prev,
      emergencies: (prev.emergencies || emgList).filter(e => e.id !== id)
    }));
    appendAuditLog('EMERGENCY_DELETE', `Deleted incident ${id}`);
    addToast('Emergency archived', 'info');
  };
  const resolveEmg = id => {
    setDb(prev => ({
      ...prev,
      emergencies: prev.emergencies.map(e => e.id === id ? {
        ...e,
        status: 'RESOLVED'
      } : e)
    }));
    appendAuditLog('EMERGENCY_RESOLVE', `Resolved incident ${id}`);
    addToast('✅ Emergency resolved!', 'success');
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontWeight: 800
    }
  }, "\uD83D\uDEA8 Emergency Command Center"), (isAdmin || canManageEmergencies) && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => {
      setEmgForm({
        category: 'Medical Emergency',
        severity: 'Code Yellow',
        title: '',
        location: '',
        responders: '',
        notes: '',
        status: 'ACTIVE',
        escalated: false
      });
      setEditId(null);
      setShowAddModal(true);
    }
  }, "+ Report Incident")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    }
  }, [{
    label: 'Active',
    filter: 'ACTIVE',
    color: 'var(--accent-rose)'
  }, {
    label: 'Resolved',
    filter: 'RESOLVED',
    color: 'var(--accent-emerald)'
  }, {
    label: 'Escalated',
    filter: null,
    color: 'var(--accent-amber)'
  }].map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    className: "glass-card",
    style: {
      padding: '0.75rem 1.25rem',
      flex: 1,
      minWidth: '120px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.5rem',
      fontWeight: 800,
      color: s.color
    }
  }, s.filter ? emgList.filter(e => e.status === s.filter).length : emgList.filter(e => e.escalated).length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, s.label)))), emgList.map(e => /*#__PURE__*/React.createElement("div", {
    key: e.id,
    className: "glass-card",
    style: {
      borderColor: e.status === 'ACTIVE' ? 'rgba(244,63,94,0.5)' : 'rgba(16,185,129,0.3)',
      borderWidth: e.status === 'ACTIVE' ? '2px' : '1px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.3rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: `badge ${e.status === 'ACTIVE' ? 'badge-danger' : 'badge-success'}`
  }, e.status), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-warning"
  }, e.severity), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-info"
  }, e.category), e.escalated && /*#__PURE__*/React.createElement("span", {
    className: "badge badge-danger"
  }, "ESCALATED")), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: '1.1rem',
      marginTop: '0.3rem'
    }
  }, e.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: 'var(--text-secondary)',
      marginTop: '0.3rem',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.25rem 1rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, "\uD83D\uDCCD Location: ", e.location), /*#__PURE__*/React.createElement("div", null, "\uD83D\uDC64 Responders: ", e.responders), /*#__PURE__*/React.createElement("div", null, "\uD83D\uDD50 Reported: ", e.timestamp), /*#__PURE__*/React.createElement("div", null, "\uD83D\uDCCB ID: ", e.id)), e.notes && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '0.5rem',
      padding: '0.5rem',
      background: 'rgba(0,0,0,0.2)',
      borderRadius: 'var(--radius-sm)',
      fontSize: '0.82rem',
      color: 'var(--text-secondary)',
      borderLeft: '3px solid var(--accent-amber)'
    }
  }, e.notes)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.3rem'
    }
  }, e.status === 'ACTIVE' && (isAdmin || canManageEmergencies) && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      fontSize: '0.75rem',
      padding: '0.3rem 0.6rem'
    },
    onClick: () => resolveEmg(e.id)
  }, "\u2705 Resolve"), isAdmin && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.75rem',
      padding: '0.3rem 0.5rem'
    },
    onClick: () => {
      setEmgForm({
        category: e.category,
        severity: e.severity,
        title: e.title,
        location: e.location,
        responders: e.responders,
        notes: e.notes,
        status: e.status,
        escalated: e.escalated
      });
      setEditId(e.id);
      setShowAddModal(true);
    }
  }, "\u270F\uFE0F Edit"), isAdmin && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.75rem',
      padding: '0.3rem 0.5rem',
      color: 'var(--accent-rose)'
    },
    onClick: () => handleDeleteEmg(e.id)
  }, "\uD83D\uDDD1\uFE0F Delete"))))), showAddModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) {
        setShowAddModal(false);
        setEditId(null);
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '600px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-rose)'
    }
  }, editId ? '✏️ Edit Incident' : '🚨 Report New Incident'), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => {
      setShowAddModal(false);
      setEditId(null);
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveEmg,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Category"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: emgForm.category,
    onChange: e => setEmgForm({
      ...emgForm,
      category: e.target.value
    })
  }, EMERGENCY_CATEGORIES.map(c => /*#__PURE__*/React.createElement("option", {
    key: c
  }, c)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Severity"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: emgForm.severity,
    onChange: e => setEmgForm({
      ...emgForm,
      severity: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "Code Green"), /*#__PURE__*/React.createElement("option", null, "Code Yellow"), /*#__PURE__*/React.createElement("option", null, "Code Orange"), /*#__PURE__*/React.createElement("option", null, "Code Red"), /*#__PURE__*/React.createElement("option", null, "Code Blue"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Title"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: emgForm.title,
    onChange: e => setEmgForm({
      ...emgForm,
      title: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Location"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: emgForm.location,
    onChange: e => setEmgForm({
      ...emgForm,
      location: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Assigned Responders"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    value: emgForm.responders,
    onChange: e => setEmgForm({
      ...emgForm,
      responders: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Notes"), /*#__PURE__*/React.createElement("textarea", {
    className: "form-input",
    rows: "3",
    value: emgForm.notes,
    onChange: e => setEmgForm({
      ...emgForm,
      notes: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.8rem'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: emgForm.escalated,
    onChange: e => setEmgForm({
      ...emgForm,
      escalated: e.target.checked
    })
  }), " Escalated")), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, editId ? 'Save Changes' : 'Report Incident')))));
}

// ═══════════════════════════════════════════════════════
// 6. FLEET HEALTH VIEW
// ═══════════════════════════════════════════════════════

function FleetHealthView({
  db,
  setDb,
  isAdmin,
  isStaff,
  canAccessFleetHealth,
  addToast,
  appendAuditLog,
  activeAirport
}) {
  const aptCode = activeAirport?.code || 'DEL';
  const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
  const canModify = isStaff || isAdmin || canAccessFleetHealth;

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAircraft, setEditingAircraft] = useState(null);
  const [formData, setFormData] = useState({
    aircraft: '',
    flight: '',
    status: 'Airworthy',
    engine: '98%',
    hydraulic: '95%',
    fuel: '95%',
    brake: 'Optimal',
    tyre: 'Optimal',
    nextMaint: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
  });

  if (!canModify) {
    return React.createElement("div", {
      className: "glass-card",
      style: {
        textAlign: 'center',
        padding: '3.5rem 1.5rem',
        maxWidth: '620px',
        margin: '2.5rem auto',
        border: '1px solid rgba(245,158,11,0.3)',
        background: 'rgba(15, 23, 42, 0.85)'
      }
    }, React.createElement("div", {
      style: { fontSize: '3.5rem', marginBottom: '1rem' }
    }, "🔒"), React.createElement("h2", {
      style: { color: 'var(--accent-amber)', fontWeight: 800, marginBottom: '0.5rem' }
    }, "Fleet Health & Telematics — Restricted Access"), React.createElement("p", {
      style: { color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.75rem', lineHeight: '1.5' }
    }, "Real-time aircraft engineering diagnostics, hydraulic telemetry, and airworthiness status monitoring are strictly reserved for Ground Engineering, ATC Ops, and System Admins."), React.createElement("button", {
      className: "btn btn-primary",
      style: { padding: '0.8rem 1.5rem', fontWeight: 700 },
      onClick: () => {
        const authBtn = document.querySelector('[data-auth-trigger="staff"]');
        if (authBtn) authBtn.click();
        else alert('Please click "Login" in the top bar to sign in as Ground Engineering / Admin.');
      }
    }, "🔑 Staff / Admin Login"));
  }

  const defaultFleet = [
    { id: "FH-001", aircraft: "Boeing 787-9 Dreamliner (VT-ANP)", flight: "AI-102 (DEL ✈ JFK)", status: "Airworthy", engine: "98%", hydraulic: "95%", tyre: "Optimal", brake: "Optimal", fuel: "94%", nextMaint: "2026-08-28" },
    { id: "FH-002", aircraft: "Airbus A350-900 (VT-JRA)", flight: "AI-173 (DEL ✈ SFO)", status: "Airworthy", engine: "99%", hydraulic: "97%", tyre: "Optimal", brake: "Optimal", fuel: "98%", nextMaint: "2026-09-12" },
    { id: "FH-003", aircraft: "Airbus A320neo (VT-EXV)", flight: "6E-204 (DEL ✈ BOM)", status: "Minor Maintenance", engine: "91%", hydraulic: "88%", tyre: "Check Pressure", brake: "Optimal", fuel: "65%", nextMaint: "2026-08-10" },
    { id: "FH-004", aircraft: "Boeing 777-300ER (VT-ALN)", flight: "AI-127 (DEL ✈ ORD)", status: "Airworthy", engine: "96%", hydraulic: "94%", tyre: "Optimal", brake: "Optimal", fuel: "91%", nextMaint: "2026-09-02" }
  ];

  const fleet = (Array.isArray(db?.fleetHealth) && db.fleetHealth.length > 0) ? db.fleetHealth : defaultFleet;

  const openAddModal = () => {
    setEditingAircraft(null);
    setFormData({
      aircraft: '',
      flight: '',
      status: 'Airworthy',
      engine: '98%',
      hydraulic: '95%',
      fuel: '95%',
      brake: 'Optimal',
      tyre: 'Optimal',
      nextMaint: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
    });
    setShowAddModal(true);
  };

  const openEditModal = (item) => {
    setEditingAircraft(item);
    setFormData({
      aircraft: item.aircraft || '',
      flight: item.flight || '',
      status: item.status || 'Airworthy',
      engine: item.engine || '95%',
      hydraulic: item.hydraulic || '95%',
      fuel: item.fuel || '95%',
      brake: item.brake || 'Optimal',
      tyre: item.tyre || 'Optimal',
      nextMaint: item.nextMaint || new Date().toISOString().split('T')[0]
    });
    setShowAddModal(true);
  };

  const handleSaveAircraft = (e) => {
    e.preventDefault();
    if (!formData.aircraft.trim()) {
      if (addToast) addToast('Please enter aircraft tail number & model', 'warning');
      return;
    }

    if (editingAircraft) {
      // Edit mode
      const updatedList = fleet.map(f => f.id === editingAircraft.id ? { ...f, ...formData } : f);
      setDb(prev => ({ ...prev, fleetHealth: updatedList }));
      if (appendAuditLog) appendAuditLog('FLEET_HEALTH_EDITED', 'Updated fleet telematics for ' + formData.aircraft);
      if (addToast) addToast('✏️ Updated aircraft record ' + formData.aircraft, 'success');
    } else {
      // Add mode
      const newAircraft = {
        id: 'FH-' + Math.floor(100 + Math.random() * 900),
        ...formData
      };
      setDb(prev => ({ ...prev, fleetHealth: [newAircraft, ...fleet] }));
      if (appendAuditLog) appendAuditLog('FLEET_HEALTH_ADDED', 'Added aircraft ' + formData.aircraft + ' to fleet telematics');
      if (addToast) addToast('➕ Added aircraft ' + formData.aircraft + ' to fleet health database!', 'success');
    }
    setShowAddModal(false);
  };

  const handleDeleteAircraft = (id, aircraftName) => {
    if (confirm('Are you sure you want to delete aircraft ' + aircraftName + ' from Fleet Health diagnostics?')) {
      const updatedList = fleet.filter(f => f.id !== id);
      setDb(prev => ({ ...prev, fleetHealth: updatedList }));
      if (appendAuditLog) appendAuditLog('FLEET_HEALTH_DELETED', 'Deleted aircraft ' + aircraftName);
      if (addToast) addToast('🗑️ Deleted aircraft record ' + aircraftName, 'warning');
    }
  };

  return React.createElement("div", {
    style: { display: 'flex', flexDirection: 'column', gap: '1.5rem' }
  }, React.createElement("div", {
    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }
  }, React.createElement("div", null, React.createElement("h2", {
    style: { fontWeight: 800, margin: 0 }
  }, "🛠️ Aircraft Fleet Health & Telematics — " + aptName + " (" + aptCode + ")"), React.createElement("div", {
    style: { fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }
  }, "Live Airworthiness, Engineering Status & Telematics Diagnostics for " + aptCode)), React.createElement("div", {
    style: { display: 'flex', gap: '0.75rem', alignItems: 'center' }
  }, React.createElement("div", {
    className: "badge badge-success",
    style: { fontSize: '0.85rem', padding: '0.45rem 0.85rem' }
  }, "● " + fleet.length + " Fleet Aircraft Tracked"), React.createElement("button", {
    className: "btn btn-primary",
    style: { background: 'linear-gradient(135deg, var(--accent-cyan), #0284c7)', color: '#000', fontWeight: 800 },
    onClick: openAddModal
  }, "➕ Add Aircraft Record"))), React.createElement("div", {
    className: "grid-2",
    style: { gap: '1.25rem' }
  }, fleet.map(item => React.createElement("div", {
    key: item.id,
    className: "glass-card",
    style: { borderLeft: '4px solid ' + (item.status === 'Airworthy' ? 'var(--accent-emerald)' : 'var(--accent-amber)') }
  }, React.createElement("div", {
    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }
  }, React.createElement("div", null, React.createElement("h4", {
    style: { color: '#fff', margin: 0, fontSize: '1rem', fontWeight: 700 }
  }, item.aircraft), React.createElement("div", {
    style: { fontSize: '0.78rem', color: 'var(--accent-cyan)', marginTop: '0.15rem' }
  }, item.flight)), React.createElement("div", {
    style: { display: 'flex', alignItems: 'center', gap: '0.5rem' }
  }, React.createElement("span", {
    className: "badge " + (item.status === 'Airworthy' ? 'badge-success' : 'badge-warning')
  }, item.status), React.createElement("button", {
    title: "Edit Aircraft",
    onClick: () => openEditModal(item),
    style: { background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', padding: '0.25rem 0.5rem', cursor: 'pointer', color: '#fff', fontSize: '0.8rem' }
  }, "✏️"), React.createElement("button", {
    title: "Delete Aircraft",
    onClick: () => handleDeleteAircraft(item.id, item.aircraft),
    style: { background: 'rgba(244,63,94,0.2)', border: '1px solid rgba(244,63,94,0.4)', borderRadius: '4px', padding: '0.25rem 0.5rem', cursor: 'pointer', color: '#f43f5e', fontSize: '0.8rem' }
  }, "🗑️"))), React.createElement("div", {
    style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem', margin: '0.85rem 0', fontSize: '0.75rem' }
  }, React.createElement("div", {
    style: { background: 'rgba(0,0,0,0.25)', padding: '0.5rem', borderRadius: '6px', textAlign: 'center' }
  }, React.createElement("div", { style: { color: 'var(--text-muted)' } }, "Engine"), React.createElement("strong", { style: { color: 'var(--accent-emerald)', fontSize: '0.9rem' } }, item.engine)), React.createElement("div", {
    style: { background: 'rgba(0,0,0,0.25)', padding: '0.5rem', borderRadius: '6px', textAlign: 'center' }
  }, React.createElement("div", { style: { color: 'var(--text-muted)' } }, "Hydraulics"), React.createElement("strong", { style: { color: 'var(--accent-cyan)', fontSize: '0.9rem' } }, item.hydraulic)), React.createElement("div", {
    style: { background: 'rgba(0,0,0,0.25)', padding: '0.5rem', borderRadius: '6px', textAlign: 'center' }
  }, React.createElement("div", { style: { color: 'var(--text-muted)' } }, "Fuel"), React.createElement("strong", { style: { color: 'var(--accent-amber)', fontSize: '0.9rem' } }, item.fuel))), React.createElement("div", {
    style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }
  }, React.createElement("span", null, "Brakes: ", React.createElement("strong", { style: { color: '#fff' } }, item.brake)), React.createElement("span", null, "Next Inspection: ", React.createElement("strong", { style: { color: 'var(--accent-cyan)' } }, item.nextMaint)))))),

  // ADD / EDIT AIRCRAFT MODAL
  showAddModal && React.createElement("div", {
    style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }
  }, React.createElement("div", {
    className: "glass-card",
    style: { width: '100%', maxWidth: '520px', background: '#0f172a', border: '1px solid var(--accent-cyan)', borderRadius: '12px', padding: '1.5rem' }
  }, React.createElement("div", {
    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }
  }, React.createElement("h3", {
    style: { margin: 0, color: 'var(--accent-cyan)', fontWeight: 800 }
  }, editingAircraft ? '✏️ Edit Aircraft Telematics' : '➕ Add New Fleet Aircraft'), React.createElement("button", {
    onClick: () => setShowAddModal(false),
    style: { background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }
  }, "✖")), React.createElement("form", {
    onSubmit: handleSaveAircraft,
    style: { display: 'flex', flexDirection: 'column', gap: '0.85rem' }
  }, React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "Aircraft Tail & Model"), React.createElement("input", {
    className: "form-input",
    placeholder: "e.g. Boeing 787-9 Dreamliner (VT-ANP)",
    value: formData.aircraft,
    onChange: e => setFormData({ ...formData, aircraft: e.target.value }),
    required: true
  })), React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "Assigned Flight Number & Route"), React.createElement("input", {
    className: "form-input",
    placeholder: "e.g. AI-102 (DEL ✈ JFK)",
    value: formData.flight,
    onChange: e => setFormData({ ...formData, flight: e.target.value }),
    required: true
  })), React.createElement("div", { className: "grid-2", style: { gap: '0.75rem' } }, React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "Airworthiness Status"), React.createElement("select", {
    className: "form-input",
    value: formData.status,
    onChange: e => setFormData({ ...formData, status: e.target.value }),
    style: { background: '#0f172a', color: '#fff' }
  }, React.createElement("option", { value: "Airworthy" }, "Airworthy"), React.createElement("option", { value: "Minor Maintenance" }, "Minor Maintenance"), React.createElement("option", { value: "AOG - Grounded" }, "AOG - Grounded"))), React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "Engine Health (%)"), React.createElement("input", {
    className: "form-input",
    value: formData.engine,
    onChange: e => setFormData({ ...formData, engine: e.target.value })
  }))), React.createElement("div", { className: "grid-3", style: { gap: '0.5rem' } }, React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.72rem', color: 'var(--text-secondary)' } }, "Hydraulics"), React.createElement("input", {
    className: "form-input",
    value: formData.hydraulic,
    onChange: e => setFormData({ ...formData, hydraulic: e.target.value })
  })), React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.72rem', color: 'var(--text-secondary)' } }, "Fuel Level"), React.createElement("input", {
    className: "form-input",
    value: formData.fuel,
    onChange: e => setFormData({ ...formData, fuel: e.target.value })
  })), React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.72rem', color: 'var(--text-secondary)' } }, "Brakes"), React.createElement("input", {
    className: "form-input",
    value: formData.brake,
    onChange: e => setFormData({ ...formData, brake: e.target.value })
  }))), React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "Next Inspection Date"), React.createElement("input", {
    type: "date",
    className: "form-input",
    value: formData.nextMaint,
    onChange: e => setFormData({ ...formData, nextMaint: e.target.value })
  })), React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: { marginTop: '0.5rem', padding: '0.75rem', fontWeight: 800 }
  }, editingAircraft ? '✏️ Save Aircraft Changes' : '➕ Register Aircraft to Fleet')))));
}

function BaggageView({
  db,
  setDb,
  isAdmin,
  isStaff,
  addToast,
  appendAuditLog,
  activeAirport
}) {
  const aptCode = activeAirport?.code || 'DEL';
  const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
  const canManage = isStaff || isAdmin;
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [selectedBagForMilestone, setSelectedBagForMilestone] = useState(null);
  const [newMilestoneLoc, setNewMilestoneLoc] = useState('');
  const [editId, setEditId] = useState(null);
  const [bagForm, setBagForm] = useState({
    tagId: '',
    pnr: '',
    flight: '',
    passenger: '',
    origin: aptCode,
    destination: 'BOM',
    weight: '23.0 kg',
    status: 'In Sorting'
  });
  const get24HrTime = () => {
    const d = new Date();
    const hrs = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${hrs}:${mins}`;
  };
  const format24HrTimeDisplay = timeStr => {
    if (!timeStr || timeStr === 'Pending' || timeStr === '—' || timeStr === 'Active') return timeStr;
    let cleaned = String(timeStr).replace(/\s*IST/gi, '').trim();
    if (/am|pm/i.test(cleaned)) {
      const parts = cleaned.match(/(\d+):(\d+)(?::\d+)?\s*(am|pm)?/i);
      if (parts) {
        let h = parseInt(parts[1], 10);
        const m = String(parts[2]).padStart(2, '0');
        const pm = parts[3] && parts[3].toLowerCase() === 'pm';
        if (pm && h < 12) h += 12;
        if (!pm && h === 12) h = 0;
        return `${String(h).padStart(2, '0')}:${m}`;
      }
    }
    return cleaned;
  };
  const handleSaveBag = e => {
    e.preventDefault();
    const currentTime24 = get24HrTime();
    if (editId) {
      setDb(prev => ({
        ...prev,
        baggage: prev.baggage.map(b => b.id === editId ? {
          ...b,
          ...bagForm
        } : b)
      }));
      appendAuditLog('BAGGAGE_UPDATE', `Updated baggage ${bagForm.tagId}`);
      addToast(`Baggage ${bagForm.tagId} updated!`, 'success');
    } else {
      const nbag = {
        id: `BAG-${Date.now().toString().slice(-3)}`,
        ...bagForm,
        steps: [{
          loc: `Check-in Counter ${aptCode}-C01`,
          time: currentTime24,
          done: true
        }, {
          loc: `Security Screening Belt 1`,
          time: currentTime24,
          done: true
        }, {
          loc: `Sorting Hub (${aptCode})`,
          time: 'Active',
          done: true
        }, {
          loc: `Aircraft Loading Bay`,
          time: 'Pending',
          done: false
        }, {
          loc: `Arrival Belt ${bagForm.destination}`,
          time: 'Pending',
          done: false
        }]
      };
      setDb(prev => ({
        ...prev,
        baggage: [...prev.baggage, nbag]
      }));
      appendAuditLog('BAGGAGE_CREATE', `Logged new baggage ${bagForm.tagId}`);
      addToast(`Baggage ${bagForm.tagId} logged!`, 'success');
    }
    setShowAddModal(false);
    setEditId(null);
  };
  const openEdit = b => {
    setBagForm({
      ...b
    });
    setEditId(b.id);
    setShowAddModal(true);
  };
  const updateStatus = (id, newStatus, tagId) => {
    setDb(prev => ({
      ...prev,
      baggage: prev.baggage.map(b => b.id === id ? {
        ...b,
        status: newStatus
      } : b)
    }));
    appendAuditLog('BAGGAGE_STATUS', `Updated ${tagId} to ${newStatus}`);
    addToast(`Baggage ${tagId} status updated to ${newStatus}`, 'info');
  };
  const toggleStepDone = (bagId, stepIndex) => {
    if (!canManage) return;
    const timeNow = get24HrTime();
    setDb(prev => ({
      ...prev,
      baggage: prev.baggage.map(b => {
        if (b.id !== bagId) return b;
        const updatedSteps = (b.steps || []).map((st, idx) => {
          if (idx === stepIndex) {
            const nextDone = !st.done;
            return {
              ...st,
              done: nextDone,
              time: nextDone ? timeNow : 'Pending'
            };
          }
          return st;
        });
        return {
          ...b,
          steps: updatedSteps
        };
      })
    }));
    appendAuditLog('BAGGAGE_MILESTONE_TOGGLE', `Updated milestone step for baggage ${bagId}`);
    addToast('Tracking milestone updated!', 'success');
  };
  const deleteMilestoneStep = (bagId, stepIndex) => {
    if (!canManage) return;
    setDb(prev => ({
      ...prev,
      baggage: prev.baggage.map(b => {
        if (b.id !== bagId) return b;
        const updatedSteps = (b.steps || []).filter((_, idx) => idx !== stepIndex);
        return {
          ...b,
          steps: updatedSteps
        };
      })
    }));
    appendAuditLog('BAGGAGE_MILESTONE_DELETE', `Deleted milestone step from baggage ${bagId}`);
    addToast('Milestone location deleted!', 'danger');
  };
  const handleAddMilestone = e => {
    e.preventDefault();
    if (!selectedBagForMilestone || !newMilestoneLoc.trim()) return;
    const timeNow = get24HrTime();
    const newStepObj = {
      loc: newMilestoneLoc.trim(),
      time: timeNow,
      done: true
    };
    setDb(prev => ({
      ...prev,
      baggage: prev.baggage.map(b => b.id === selectedBagForMilestone.id ? {
        ...b,
        steps: [...(b.steps || []), newStepObj]
      } : b)
    }));
    appendAuditLog('BAGGAGE_MILESTONE_ADD', `Added milestone "${newMilestoneLoc}" for baggage ${selectedBagForMilestone.tagId}`);
    addToast(`Added milestone location for ${selectedBagForMilestone.tagId}!`, 'success');
    setNewMilestoneLoc('');
    setShowMilestoneModal(false);
    setSelectedBagForMilestone(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontWeight: 800
    }
  }, "\uD83D\uDEC4 IoT Baggage Tracking & Handling Hub \u2014 ", aptName, " (", aptCode, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--accent-cyan)',
      marginTop: '0.2rem'
    }
  }, "Automated Sorting & Baggage Carousel Operations at ", aptCode)), canManage && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => {
      setBagForm({
        tagId: `${aptCode}-BAG-${Date.now().toString().slice(-4)}`,
        pnr: `PNR-${aptCode}-101`,
        flight: 'AI-101',
        passenger: 'Rohan Sharma',
        origin: aptCode,
        destination: 'BOM',
        weight: '20.0 kg',
        status: 'In Sorting'
      });
      setEditId(null);
      setShowAddModal(true);
    }
  }, "+ Manual Baggage Entry")), /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, db.baggage.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.id,
    className: "glass-card",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.65rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      color: 'var(--accent-cyan)',
      fontSize: '0.9rem'
    }
  }, "\uD83C\uDFF7\uFE0F ", b.tagId), /*#__PURE__*/React.createElement("span", {
    className: `badge ${b.status === 'Loaded' ? 'badge-success' : b.status === 'In Sorting' ? 'badge-warning' : b.status === 'Delayed' ? 'badge-danger' : 'badge-info'}`
  }, b.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.85rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Passenger: ", /*#__PURE__*/React.createElement("strong", null, b.passenger)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Flight: ", /*#__PURE__*/React.createElement("strong", null, b.flight), " (PNR: ", b.pnr, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-muted)'
    }
  }, "Route: ", b.origin, " \u2794 ", b.destination, " \u2022 Weight: ", b.weight)), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px dashed var(--border-color)',
      paddingTop: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.35rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.75rem',
      fontWeight: 600,
      color: 'var(--text-secondary)'
    }
  }, "\uD83D\uDCCD Tracking Milestones:"), canManage && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.68rem',
      padding: '0.15rem 0.4rem'
    },
    onClick: () => {
      setSelectedBagForMilestone(b);
      setShowMilestoneModal(true);
    }
  }, "+ Add Location")), (b.steps || []).map((st, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '0.72rem',
      color: st.done ? 'var(--accent-emerald)' : 'var(--text-muted)',
      marginBottom: '0.3rem',
      background: 'rgba(0,0,0,0.15)',
      padding: '0.2rem 0.4rem',
      borderRadius: '4px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.35rem'
    }
  }, canManage ? /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: st.done,
    onChange: () => toggleStepDone(b.id, i),
    style: {
      cursor: 'pointer'
    }
  }) : /*#__PURE__*/React.createElement("span", null, st.done ? '✓' : '○'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: st.done ? 600 : 400
    }
  }, st.loc)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.68rem',
      opacity: 0.8,
      fontFamily: 'var(--font-mono)'
    }
  }, format24HrTimeDisplay(st.time)), canManage && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      padding: '0 0.25rem',
      fontSize: '0.65rem',
      border: 'none',
      color: 'var(--accent-rose)'
    },
    title: "Delete milestone location",
    onClick: () => deleteMilestoneStep(b.id, i)
  }, "\u2715"))))), canManage && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '0.5rem',
      display: 'flex',
      gap: '0.35rem',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.4rem',
      flex: 1
    },
    onClick: () => openEdit(b)
  }, "\u270F\uFE0F Edit Details"), b.status !== 'Loaded' && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.4rem'
    },
    onClick: () => updateStatus(b.id, 'Loaded', b.tagId)
  }, "\u2713 Mark Loaded"), b.status !== 'Delayed' && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.4rem',
      color: 'var(--accent-rose)'
    },
    onClick: () => updateStatus(b.id, 'Delayed', b.tagId)
  }, "\u26A0\uFE0F Flag Delayed"))))), showAddModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) {
        setShowAddModal(false);
        setEditId(null);
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '550px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)'
    }
  }, editId ? 'Edit Baggage Record' : 'Manual Baggage Tracking Entry'), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => {
      setShowAddModal(false);
      setEditId(null);
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveBag,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Baggage Tag ID"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: bagForm.tagId,
    onChange: e => setBagForm({
      ...bagForm,
      tagId: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "PNR Code"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: bagForm.pnr,
    onChange: e => setBagForm({
      ...bagForm,
      pnr: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Flight Number"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: bagForm.flight,
    onChange: e => setBagForm({
      ...bagForm,
      flight: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Passenger Name"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: bagForm.passenger,
    onChange: e => setBagForm({
      ...bagForm,
      passenger: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Origin Airport"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: bagForm.origin,
    onChange: e => setBagForm({
      ...bagForm,
      origin: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Destination Airport"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: bagForm.destination,
    onChange: e => setBagForm({
      ...bagForm,
      destination: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Weight"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: bagForm.weight,
    onChange: e => setBagForm({
      ...bagForm,
      weight: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Status"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: bagForm.status,
    onChange: e => setBagForm({
      ...bagForm,
      status: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "In Sorting"), /*#__PURE__*/React.createElement("option", null, "Loaded"), /*#__PURE__*/React.createElement("option", null, "On Conveyor"), /*#__PURE__*/React.createElement("option", null, "Claimed"), /*#__PURE__*/React.createElement("option", null, "Delayed"))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      width: '100%'
    }
  }, editId ? 'Save Changes' : 'Log Baggage'))))), showMilestoneModal && selectedBagForMilestone && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) setShowMilestoneModal(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '420px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)'
    }
  }, "Add Milestone Checkpoint"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setShowMilestoneModal(false)
  }, "\xD7")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleAddMilestone,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: 'var(--text-secondary)'
    }
  }, "Baggage Tag: ", /*#__PURE__*/React.createElement("strong", null, selectedBagForMilestone.tagId), " (", selectedBagForMilestone.passenger, ")"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Checkpoint Location Name"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "e.g. Customs Vault Gate 4 / Ramp Cart T3-09",
    value: newMilestoneLoc,
    onChange: e => setNewMilestoneLoc(e.target.value)
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Save Checkpoint Milestone")))));
}

// ═══════════════════════════════════════════════════════
// 8. CCTV VIEW
// ═══════════════════════════════════════════════════════

function CctvView({
  db,
  setDb,
  isAdmin,
  isStaff,
  canManageCctv,
  addToast,
  appendAuditLog,
  activeAirport
}) {
  const aptCode = activeAirport?.code || 'DEL';
  const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
  const canModify = isAdmin || canManageCctv || isStaff;

  const defaultCctv = [
    {
      id: "CAM-DEL-01",
      name: "T3 Departure Gate 42",
      location: "Terminal 3, Concourse B",
      zone: "Gate Area",
      resolution: "4K Ultra HD",
      status: "ONLINE",
      alerts: 0,
      peopleCount: 42,
      aiMode: "Queue Density & Motion Analytics",
      bgImage: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80",
      streamUrl: "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/people-detection.mp4"
    },
    {
      id: "CAM-DEL-02",
      name: "T3 Security Checkpoint Lane 4",
      location: "Terminal 3, Security Hold",
      zone: "Security Check",
      resolution: "4K Ultra HD",
      status: "ONLINE",
      alerts: 1,
      peopleCount: 68,
      aiMode: "Unattended Baggage Detection",
      bgImage: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80",
      streamUrl: "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/face-demographics-walking-and-pause.mp4"
    },
    {
      id: "CAM-DEL-03",
      name: "Runway 28/10 Threshold",
      location: "Airside Perimeter North",
      zone: "Runway & Taxiway",
      resolution: "4K Thermal IR",
      status: "ONLINE",
      alerts: 0,
      peopleCount: 2,
      aiMode: "Perimeter Breach AI",
      bgImage: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=80",
      streamUrl: "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/head-pose-face-detection-female.mp4"
    },
    {
      id: "CAM-DEL-04",
      name: "MLCP T3 Parking Level 2",
      location: "Multi-Level Car Parking T3",
      zone: "Car Parking",
      resolution: "1080p Full HD",
      status: "ONLINE",
      alerts: 0,
      peopleCount: 14,
      aiMode: "ANPR Plate Recognition",
      bgImage: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80",
      streamUrl: "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/person-bicycle-car-detection.mp4"
    },
    {
      id: "CAM-DEL-05",
      name: "T1 Baggage Reclaim Belt 3",
      location: "Terminal 1, Arrivals",
      zone: "Baggage Claim",
      resolution: "1080p Full HD",
      status: "MAINTENANCE",
      alerts: 0,
      peopleCount: 0,
      aiMode: "Luggage Tracking Sensor",
      bgImage: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1200&q=80",
      streamUrl: "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/store-aisle-detection.mp4"
    },
    {
      id: "CAM-DEL-06",
      name: "T2 Curbside Taxi Hub",
      location: "Terminal 2, Departure Forecourt",
      zone: "Curbside Transit",
      resolution: "4K Ultra HD",
      status: "ONLINE",
      alerts: 0,
      peopleCount: 35,
      aiMode: "Curbside Traffic AI",
      bgImage: "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?auto=format&fit=crop&w=1200&q=80",
      streamUrl: "https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/people-detection.mp4"
    }
  ];

  const cctvList = (Array.isArray(db?.cctv) && db.cctv.length > 0) ? db.cctv : defaultCctv;
  const [selectedCam, setSelectedCam] = useState(cctvList[0] || defaultCctv[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCamId, setEditCamId] = useState(null);
  const [ptzModalCam, setPtzModalCam] = useState(null);
  const [gridViewMode, setGridViewMode] = useState('grid');

  const [sensorTick, setSensorTick] = useState(0);
  const [liveTimeString, setLiveTimeString] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setSensorTick(prev => prev + 1);
      setLiveTimeString(new Date().toLocaleTimeString());

      setDb(prev => {
        if (!prev || !Array.isArray(prev.cctv)) return prev;
        const updated = prev.cctv.map(c => {
          if (c.status !== 'ONLINE') return c;
          const delta = Math.floor(Math.random() * 5) - 2;
          const nextCount = Math.max(1, (c.peopleCount || 10) + delta);
          return {
            ...c,
            peopleCount: nextCount
          };
        });
        return { ...prev, cctv: updated };
      });
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const [camForm, setCamForm] = useState({
    name: '',
    location: 'Terminal 3, ' + aptCode,
    zone: 'Gate Area',
    resolution: '4K Ultra HD',
    status: 'ONLINE',
    aiMode: 'Queue & Motion Analytics',
    alerts: 0,
    peopleCount: 18,
    streamUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/people-detection.mp4',
    bgImage: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80'
  });

  const handleSaveCamera = (e) => {
    e.preventDefault();
    if (!canModify) {
      if (addToast) addToast('🔒 Admin access required to modify CCTV feeds!', 'danger');
      return;
    }
    if (editCamId) {
      const updated = cctvList.map(c => c.id === editCamId ? { ...c, ...camForm } : c);
      setDb(prev => ({ ...prev, cctv: updated }));
      if (appendAuditLog) appendAuditLog('CCTV_EDIT', 'Admin modified CCTV feed ' + camForm.name + ' (' + editCamId + ')');
      if (addToast) addToast('🎥 CCTV Camera ' + camForm.name + ' updated cleanly!', 'success');
    } else {
      const newCam = {
        id: 'CAM-' + aptCode + '-' + Date.now().toString().slice(-3),
        ...camForm
      };
      const updated = [newCam, ...cctvList];
      setDb(prev => ({ ...prev, cctv: updated }));
      if (appendAuditLog) appendAuditLog('CCTV_ADD', 'Admin added new CCTV camera ' + newCam.name + ' (' + newCam.id + ')');
      if (addToast) addToast('📹 New CCTV Camera ' + newCam.name + ' added to Grid!', 'success');
    }
    setShowAddModal(false);
    setEditCamId(null);
  };

  const handleDeleteCamera = (camId, camName) => {
    if (!canModify) {
      if (addToast) addToast('🔒 Admin access required to delete CCTV feeds!', 'danger');
      return;
    }
    if (!window.confirm('Are you sure you want to delete CCTV feed ' + camName + ' (' + camId + ')?')) return;
    const updated = cctvList.filter(c => c.id !== camId);
    setDb(prev => ({ ...prev, cctv: updated }));
    if (selectedCam?.id === camId) setSelectedCam(updated[0] || defaultCctv[0]);
    if (appendAuditLog) appendAuditLog('CCTV_DELETE', 'Admin deleted CCTV camera ' + camName + ' (' + camId + ')');
    if (addToast) addToast('🗑️ CCTV Camera ' + camName + ' deleted from system', 'warning');
  };

  const handlePtzAction = (actionName) => {
    if (addToast) addToast('🕹️ PTZ Command ' + actionName + ' executed on ' + (ptzModalCam?.name || 'Camera'), 'info');
  };

  // Clean, realistic CCTV Video Feed renderer WITHOUT colored bounding box rectangles
  const renderCctvVideoFeed = (cam, isLargeMode = false) => {
    const isOnline = cam.status === 'ONLINE';
    const stream = cam.streamUrl || defaultCctv[0].streamUrl;
    const photo = cam.bgImage || defaultCctv[0].bgImage;

    return React.createElement("div", {
      style: {
        position: "relative",
        width: "100%",
        height: isLargeMode ? "420px" : "210px",
        borderRadius: "10px",
        overflow: "hidden",
        background: "#07090e",
        border: isOnline ? "1px solid rgba(0, 242, 254, 0.5)" : "1px solid rgba(244, 63, 94, 0.5)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.8)"
      }
    },
      // 1. Photo Background of Real People in Airport
      React.createElement("img", {
        src: photo,
        alt: cam.name,
        style: {
          position: "absolute",
          top: 0, left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: cam.resolution?.includes("Thermal") ? "contrast(1.4) hue-rotate(150deg) saturate(2)" : "brightness(0.85) contrast(1.1)",
          opacity: isOnline ? 0.95 : 0.2
        }
      }),

      // 2. Video Stream of Real People
      React.createElement("video", {
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        src: stream,
        style: {
          position: "absolute",
          top: 0, left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: cam.resolution?.includes("Thermal") ? "contrast(1.5) hue-rotate(150deg) saturate(2.5)" : "none",
          opacity: isOnline ? 0.85 : 0.15
        }
      }),

      // 3. CCTV CRT Scanline Overlay
      React.createElement("div", { className: "cctv-scanline" }),

      // 4. Offline / Maintenance Overlay
      !isOnline && React.createElement("div", {
        style: {
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(7, 9, 14, 0.85)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem"
        }
      },
        React.createElement("div", { style: { fontSize: "2.5rem" } }, "⚠️"),
        React.createElement("div", { style: { color: "#f43f5e", fontWeight: 800, fontSize: "0.95rem" } }, "CAMERA CHANNEL " + cam.status),
        React.createElement("div", { style: { color: "var(--text-secondary)", fontSize: "0.75rem" } }, "AI Sensors Calibrating Channel Frequency...")
      ),

      // 5. Top Left Badge: Status & FPS
      React.createElement("div", {
        style: {
          position: "absolute",
          top: "0.5rem",
          left: "0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          background: "rgba(0,0,0,0.8)",
          padding: "0.2rem 0.55rem",
          borderRadius: "4px",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255,255,255,0.1)"
        }
      },
        React.createElement("span", {
          style: {
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: isOnline ? "#10b981" : "#f43f5e",
            boxShadow: isOnline ? "0 0 8px #10b981" : "0 0 8px #f43f5e"
          }
        }),
        React.createElement("span", {
          style: { fontSize: "0.68rem", color: "#fff", fontWeight: 800 }
        }, cam.status),
        isOnline && React.createElement("span", {
          style: { fontSize: "0.62rem", color: "var(--accent-cyan)", marginLeft: "0.2rem" }
        }, "• " + (29.7 + (sensorTick % 5) / 10).toFixed(1) + " FPS")
      ),

      // 6. Top Right Badge: Live REC Timestamp
      React.createElement("div", {
        style: {
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          background: "rgba(0,0,0,0.8)",
          padding: "0.2rem 0.55rem",
          borderRadius: "4px",
          fontSize: "0.65rem",
          color: "#f43f5e",
          fontWeight: 800,
          fontFamily: "var(--font-mono)",
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
          border: "1px solid rgba(244,63,94,0.3)"
        }
      }, "● LIVE REC • " + liveTimeString),

      // 7. Bottom Sensor Telemetry Bar
      React.createElement("div", {
        style: {
          position: "absolute",
          bottom: "0.4rem",
          left: "0.5rem",
          right: "0.5rem",
          display: "flex",
          justify: "space-between",
          alignItems: "center",
          background: "rgba(7, 9, 14, 0.9)",
          padding: "0.25rem 0.6rem",
          borderRadius: "4px",
          fontSize: "0.68rem",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(0, 242, 254, 0.2)"
        }
      },
        React.createElement("span", { style: { color: "var(--accent-cyan)", fontWeight: 700 } },
          "👥 Real Passengers Tracked: " + (cam.peopleCount || 0)
        ),
        React.createElement("span", { style: { color: (cam.alerts || 0) > 0 ? "#f43f5e" : "#10b981", fontWeight: 700 } },
          (cam.alerts || 0) > 0 ? "⚠️ ALARM: " + cam.alerts : "✓ AI Conf: 98.9%"
        )
      )
    );
  };

  return React.createElement("div", {
    style: { display: 'flex', flexDirection: 'column', gap: '1.5rem' }
  },
    React.createElement("div", {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }
    },
      React.createElement("div", null,
        React.createElement("h2", {
          style: { fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }
        }, "📹 AI CCTV Surveillance Grid — " + aptName + " (" + aptCode + ")"),
        React.createElement("div", {
          style: { fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }
        }, "Real-time Airport Surveillance Video Feeds of Real Passengers for " + aptCode)
      ),
      React.createElement("div", {
        style: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }
      },
        React.createElement("button", {
          className: "btn " + (gridViewMode === 'grid' ? 'btn-primary' : 'btn-secondary'),
          onClick: () => setGridViewMode('grid'),
          style: { fontSize: '0.78rem', padding: '0.4rem 0.8rem' }
        }, "🔲 Grid View (" + cctvList.length + ")"),
        React.createElement("button", {
          className: "btn " + (gridViewMode === 'single' ? 'btn-primary' : 'btn-secondary'),
          onClick: () => setGridViewMode('single'),
          style: { fontSize: '0.78rem', padding: '0.4rem 0.8rem' }
        }, "🔍 Single Focus"),
        canModify && React.createElement("button", {
          className: "btn btn-primary",
          style: { fontSize: '0.78rem', padding: '0.4rem 0.9rem', background: 'linear-gradient(135deg, var(--accent-amber), #d97706)', color: '#000', fontWeight: 800 },
          onClick: () => {
            setCamForm({
              name: '',
              location: 'Terminal 3, ' + aptCode,
              zone: 'Gate Area',
              resolution: '4K Ultra HD',
              status: 'ONLINE',
              aiMode: 'Queue & Motion Analytics',
              alerts: 0,
              peopleCount: 18,
              streamUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/people-detection.mp4',
              bgImage: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80'
            });
            setEditCamId(null);
            setShowAddModal(true);
          }
        }, "+ Add CCTV Camera")
      )
    ),

    React.createElement("div", { style: { display: 'flex', gap: '1rem', flexWrap: 'wrap' } },
      React.createElement("div", { className: "glass-card", style: { padding: '0.65rem 1.25rem', flex: 1, minWidth: '120px', textAlign: 'center' } },
        React.createElement("div", { style: { fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' } }, cctvList.filter(c => c.status === 'ONLINE').length),
        React.createElement("div", { style: { fontSize: '0.72rem', color: 'var(--text-secondary)' } }, "Online AI Streams")
      ),
      React.createElement("div", { className: "glass-card", style: { padding: '0.65rem 1.25rem', flex: 1, minWidth: '120px', textAlign: 'center' } },
        React.createElement("div", { style: { fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-rose)' } }, cctvList.filter(c => c.status === 'OFFLINE' || c.status === 'MAINTENANCE').length),
        React.createElement("div", { style: { fontSize: '0.72rem', color: 'var(--text-secondary)' } }, "Offline / Maintenance")
      ),
      React.createElement("div", { className: "glass-card", style: { padding: '0.65rem 1.25rem', flex: 1, minWidth: '120px', textAlign: 'center' } },
        React.createElement("div", { style: { fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-amber)' } }, cctvList.reduce((a, c) => a + (c.alerts || 0), 0)),
        React.createElement("div", { style: { fontSize: '0.72rem', color: 'var(--text-secondary)' } }, "Active Security Alarms")
      ),
      React.createElement("div", { className: "glass-card", style: { padding: '0.65rem 1.25rem', flex: 1, minWidth: '120px', textAlign: 'center' } },
        React.createElement("div", { style: { fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)' } }, cctvList.reduce((a, c) => a + (c.peopleCount || 0), 0)),
        React.createElement("div", { style: { fontSize: '0.72rem', color: 'var(--text-secondary)' } }, "AI Sensor Live Count")
      )
    ),

    gridViewMode === 'single' ?
      React.createElement("div", { className: "glass-card", style: { padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' } },
        React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' } },
          React.createElement("div", null,
            React.createElement("h3", { style: { margin: 0, color: '#fff', fontSize: '1.1rem' } }, "📹 " + selectedCam?.name),
            React.createElement("div", { style: { fontSize: '0.8rem', color: 'var(--text-secondary)' } }, selectedCam?.location + " • " + selectedCam?.resolution)
          ),
          React.createElement("select", {
            className: "form-input",
            value: selectedCam?.id,
            onChange: (e) => {
              const found = cctvList.find(c => c.id === e.target.value);
              if (found) setSelectedCam(found);
            },
            style: { padding: '0.4rem 0.8rem', maxWidth: '280px' }
          }, cctvList.map(c => React.createElement("option", { key: c.id, value: c.id }, c.name + " (" + c.status + ")")))
        ),

        renderCctvVideoFeed(selectedCam, true)
      )
    :
      React.createElement("div", { className: "grid-3", style: { gap: '1rem' } },
        cctvList.map(cam => React.createElement("div", {
          key: cam.id,
          className: "glass-card",
          style: {
            borderColor: cam.status === 'OFFLINE' ? 'rgba(244,63,94,0.5)' : 'var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between'
          }
        },
          React.createElement("div", null,
            renderCctvVideoFeed(cam, false),

            React.createElement("div", { style: { fontWeight: 700, fontSize: '0.9rem', color: '#fff', marginTop: '0.75rem' } }, cam.name),
            React.createElement("div", { style: { fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' } }, cam.location),
            React.createElement("div", { style: { fontSize: '0.72rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' } }, "AI Mode: " + cam.aiMode),

            React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', marginTop: '0.6rem', fontSize: '0.75rem' } },
              React.createElement("span", null, "👥 Real Passengers: " + (cam.peopleCount || 0) + " detected"),
              React.createElement("span", { style: { color: (cam.alerts || 0) > 0 ? '#f43f5e' : '#10b981', fontWeight: 700 } }, "⚠️ " + (cam.alerts || 0) + " alerts")
            )
          ),

          canModify && React.createElement("div", { style: { display: 'flex', gap: '0.3rem', marginTop: '0.85rem', paddingTop: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.08)' } },
            React.createElement("button", {
              className: "btn btn-secondary",
              style: { flex: 1, fontSize: '0.7rem', padding: '0.25rem 0.4rem', color: 'var(--accent-cyan)' },
              onClick: () => setPtzModalCam(cam),
              title: "PTZ Pan/Tilt/Zoom Control"
            }, "🕹️ PTZ"),
            React.createElement("button", {
              className: "btn btn-secondary",
              style: { flex: 1, fontSize: '0.7rem', padding: '0.25rem 0.4rem', color: 'var(--accent-amber)' },
              onClick: () => {
                setCamForm({
                  name: cam.name,
                  location: cam.location,
                  zone: cam.zone || 'Gate Area',
                  resolution: cam.resolution || '4K Ultra HD',
                  status: cam.status || 'ONLINE',
                  aiMode: cam.aiMode || 'Queue Density Analytics',
                  alerts: cam.alerts || 0,
                  peopleCount: cam.peopleCount || 12,
                  streamUrl: cam.streamUrl || defaultCctv[0].streamUrl,
                  bgImage: cam.bgImage || defaultCctv[0].bgImage
                });
                setEditCamId(cam.id);
                setShowAddModal(true);
              },
              title: "Edit CCTV Camera Config"
            }, "✏️ Edit"),
            React.createElement("button", {
              className: "btn btn-secondary",
              style: { fontSize: '0.7rem', padding: '0.25rem 0.4rem', color: 'var(--accent-rose)' },
              onClick: () => handleDeleteCamera(cam.id, cam.name),
              title: "Delete CCTV Feed"
            }, "🗑️")
          )
        ))
      ),

    showAddModal && React.createElement("div", { className: "modal-overlay", onClick: (e) => { if (e.target.className.includes('modal-overlay')) setShowAddModal(false); } },
      React.createElement("div", { className: "modal-card", style: { maxWidth: '520px' } },
        React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' } },
          React.createElement("h3", { style: { margin: 0, color: '#fff' } }, "📹 " + (editCamId ? 'Edit CCTV Camera' : 'Add New CCTV Camera')),
          React.createElement("button", { className: "btn btn-secondary", style: { padding: '0.2rem 0.5rem', border: 'none' }, onClick: () => setShowAddModal(false) }, "✕")
        ),

        React.createElement("form", { onSubmit: handleSaveCamera, style: { display: 'flex', flexDirection: 'column', gap: '0.85rem' } },
          React.createElement("div", null,
            React.createElement("label", { style: { fontSize: '0.78rem', color: 'var(--text-secondary)' } }, "Camera Name / Title"),
            React.createElement("input", {
              required: true,
              className: "form-input",
              placeholder: "e.g. T3 Gate 42 Security Camera",
              value: camForm.name,
              onChange: (e) => setCamForm({ ...camForm, name: e.target.value })
            })
          ),

          React.createElement("div", null,
            React.createElement("label", { style: { fontSize: '0.78rem', color: 'var(--text-secondary)' } }, "Terminal & Physical Location"),
            React.createElement("input", {
              required: true,
              className: "form-input",
              placeholder: "e.g. Terminal 3, Concourse B",
              value: camForm.location,
              onChange: (e) => setCamForm({ ...camForm, location: e.target.value })
            })
          ),

          React.createElement("div", null,
            React.createElement("label", { style: { fontSize: '0.78rem', color: 'var(--text-secondary)' } }, "Live Surveillance Video Stream URL"),
            React.createElement("input", {
              className: "form-input",
              placeholder: "https://raw.githubusercontent.com/.../people-detection.mp4",
              value: camForm.streamUrl,
              onChange: (e) => setCamForm({ ...camForm, streamUrl: e.target.value })
            })
          ),

          React.createElement("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' } },
            React.createElement("div", null,
              React.createElement("label", { style: { fontSize: '0.78rem', color: 'var(--text-secondary)' } }, "Zone Category"),
              React.createElement("select", {
                className: "form-input",
                value: camForm.zone,
                onChange: (e) => setCamForm({ ...camForm, zone: e.target.value })
              },
                React.createElement("option", { value: "Gate Area" }, "Gate Area"),
                React.createElement("option", { value: "Security Check" }, "Security Check"),
                React.createElement("option", { value: "Runway & Taxiway" }, "Runway & Taxiway"),
                React.createElement("option", { value: "Car Parking" }, "Car Parking"),
                React.createElement("option", { value: "Baggage Claim" }, "Baggage Claim"),
                React.createElement("option", { value: "Curbside Transit" }, "Curbside Transit")
              )
            ),

            React.createElement("div", null,
              React.createElement("label", { style: { fontSize: '0.78rem', color: 'var(--text-secondary)' } }, "Resolution Quality"),
              React.createElement("select", {
                className: "form-input",
                value: camForm.resolution,
                onChange: (e) => setCamForm({ ...camForm, resolution: e.target.value })
              },
                React.createElement("option", { value: "4K Ultra HD" }, "4K Ultra HD"),
                React.createElement("option", { value: "4K Thermal IR" }, "4K Thermal IR"),
                React.createElement("option", { value: "1080p Full HD" }, "1080p Full HD")
              )
            )
          ),

          React.createElement("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' } },
            React.createElement("div", null,
              React.createElement("label", { style: { fontSize: '0.78rem', color: 'var(--text-secondary)' } }, "Feed Operational Status"),
              React.createElement("select", {
                className: "form-input",
                value: camForm.status,
                onChange: (e) => setCamForm({ ...camForm, status: e.target.value })
              },
                React.createElement("option", { value: "ONLINE" }, "ONLINE"),
                React.createElement("option", { value: "MAINTENANCE" }, "MAINTENANCE"),
                React.createElement("option", { value: "OFFLINE" }, "OFFLINE")
              )
            ),

            React.createElement("div", null,
              React.createElement("label", { style: { fontSize: '0.78rem', color: 'var(--text-secondary)' } }, "AI Video Analytics Mode"),
              React.createElement("input", {
                className: "form-input",
                placeholder: "Queue & Motion Analytics",
                value: camForm.aiMode,
                onChange: (e) => setCamForm({ ...camForm, aiMode: e.target.value })
              })
            )
          ),

          React.createElement("div", { style: { display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' } },
            React.createElement("button", { type: "button", className: "btn btn-secondary", onClick: () => setShowAddModal(false) }, "Cancel"),
            React.createElement("button", { type: "submit", className: "btn btn-primary" }, "💾 " + (editCamId ? 'Update Camera' : 'Add Camera Feed'))
          )
        )
      )
    ),

    ptzModalCam && React.createElement("div", { className: "modal-overlay", onClick: (e) => { if (e.target.className.includes('modal-overlay')) setPtzModalCam(null); } },
      React.createElement("div", { className: "modal-card", style: { maxWidth: '420px', textAlign: 'center' } },
        React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' } },
          React.createElement("h3", { style: { margin: 0, color: '#fff' } }, "🕹️ PTZ Controls — " + ptzModalCam.name),
          React.createElement("button", { className: "btn btn-secondary", style: { padding: '0.2rem 0.5rem', border: 'none' }, onClick: () => setPtzModalCam(null) }, "✕")
        ),

        React.createElement("div", { style: { background: '#000', padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem', border: '1px solid rgba(0,242,254,0.3)' } },
          React.createElement("div", { style: { fontSize: '0.78rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem', fontWeight: 700 } }, "MOTORIZED PTZ CONTROLLER (" + ptzModalCam.resolution + ")"),

          React.createElement("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem', maxWidth: '220px', margin: '0 auto' } },
            React.createElement("div", null),
            React.createElement("button", { className: "btn btn-secondary", onClick: () => handlePtzAction('PAN UP') }, "▲ UP"),
            React.createElement("div", null),

            React.createElement("button", { className: "btn btn-secondary", onClick: () => handlePtzAction('TILT LEFT') }, "◄ LEFT"),
            React.createElement("button", { className: "btn btn-primary", onClick: () => handlePtzAction('RECENTER') }, "AUTO"),
            React.createElement("button", { className: "btn btn-secondary", onClick: () => handlePtzAction('TILT RIGHT') }, "RIGHT ►"),

            React.createElement("div", null),
            React.createElement("button", { className: "btn btn-secondary", onClick: () => handlePtzAction('PAN DOWN') }, "▼ DOWN"),
            React.createElement("div", null)
          ),

          React.createElement("div", { style: { display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' } },
            React.createElement("button", { className: "btn btn-secondary", style: { fontSize: '0.75rem' }, onClick: () => handlePtzAction('ZOOM IN 2X') }, "🔍 ZOOM IN (+)"),
            React.createElement("button", { className: "btn btn-secondary", style: { fontSize: '0.75rem' }, onClick: () => handlePtzAction('ZOOM OUT 1X') }, "🔎 ZOOM OUT (-)")
          )
        ),

        React.createElement("button", { className: "btn btn-primary", style: { width: '100%' }, onClick: () => setPtzModalCam(null) }, "Done")
      )
    )
  );
}

function LostFoundView(props) {
  var db = props.db;
  var setDb = props.setDb;
  var isAdmin = props.isAdmin;
  var isStaff = props.isStaff;
  var currentUser = props.currentUser;
  var addToast = props.addToast;
  var appendAuditLog = props.appendAuditLog;
  var activeAirport = props.activeAirport;

  var aptCode = (activeAirport && activeAirport.code) ? activeAirport.code : 'DEL';
  var aptName = (activeAirport && activeAirport.name) ? activeAirport.name : 'Indira Gandhi International Airport';
  var canManage = isStaff || isAdmin;

  // Independent Modal Control States
  var reportModalState = useState(false);
  var showReportModal = reportModalState[0];
  var setShowReportModal = reportModalState[1];

  var appealModalState = useState(false);
  var showAppealModal = appealModalState[0];
  var setShowAppealModal = appealModalState[1];

  var selectedItemState = useState(null);
  var selectedItemForAppeal = selectedItemState[0];
  var setSelectedItemForAppeal = selectedItemState[1];

  // Independent Tab Section & Filter States
  var tabSectionState = useState('GALLERY');
  var activeTabSection = tabSectionState[0];
  var setActiveTabSection = tabSectionState[1];

  var filterTagState = useState('ALL');
  var filterTag = filterTagState[0];
  var setFilterTag = filterTagState[1];

  // Form states
  var reportFormState = useState({
    title: '',
    category: 'Electronics',
    type: 'LOST',
    location: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    contactName: currentUser ? (currentUser.name || '') : '',
    contactInfo: currentUser ? (currentUser.mobile || currentUser.email || '') : ''
  });
  var reportForm = reportFormState[0];
  var setReportForm = reportFormState[1];

  var appealFormState = useState({
    itemId: '',
    claimantName: currentUser ? (currentUser.name || '') : '',
    claimantContact: currentUser ? (currentUser.mobile || currentUser.email || '') : '',
    flightNo: '',
    proofDetails: ''
  });
  var appealForm = appealFormState[0];
  var setAppealForm = appealFormState[1];

  var defaultItems = [
    { id: "LFI-001", title: "Apple iPad Pro 11-inch (Space Gray)", category: "Electronics", type: "LOST", location: "Terminal 3 Gate 42 Lounge", date: "2026-08-08", description: "In dark blue folio case with airport sticker on back.", status: "UNCLAIMED", reporter: "Passenger A" },
    { id: "LFI-002", title: "Samsonite Black Hard Spinner Suitcase", category: "Luggage", type: "FOUND", location: "Baggage Belt 4", date: "2026-08-08", description: "Red ribbon tied to top handle, contains clothing.", status: "UNCLAIMED", reporter: "CISF Security" },
    { id: "LFI-003", title: "Bose QuietComfort 45 Headphones", category: "Electronics", type: "LOST", location: "Terminal 1 Departure Gate 12", date: "2026-08-07", description: "Black carrying case with audio cable and charger.", status: "PENDING_REVIEW", claimPending: true, pendingClaimant: "Rohan Sharma", reporter: "Traveler B" },
    { id: "LFI-004", title: "Indian Passport & Travel Leather Wallet", category: "Documents", type: "FOUND", location: "T3 Security Checkpoint Gate 3", date: "2026-08-06", description: "Verified by Duty Officer and returned to passenger.", status: "CLAIMED", reporter: "Staff Duty Officer" },
    { id: "LFI-005", title: "Sony Alpha A7 Camera in Black Pouch", category: "Electronics", type: "FOUND", location: "Terminal 3 Food Court", date: "2026-08-05", description: "Verified ownership proof matched serial number.", status: "CLAIMED", reporter: "Terminal Ops" }
  ];

  var items = (db && Array.isArray(db.lostFoundItems) && db.lostFoundItems.length > 0) ? db.lostFoundItems : defaultItems;
  var claimsList = (db && Array.isArray(db.lostFoundClaims)) ? db.lostFoundClaims : [];

  // Group items by status
  var unclaimedItems = items.filter(function(item) { return item.status === 'UNCLAIMED'; });
  var pendingReviewItems = items.filter(function(item) { return item.status === 'PENDING_REVIEW' || item.status === 'IN_VERIFICATION'; });
  var claimedItems = items.filter(function(item) { return item.status === 'CLAIMED' || item.status === 'RETURNED'; });

  var filteredUnclaimedItems = unclaimedItems.filter(function(item) {
    if (filterTag === 'LOST') return item.type === 'LOST';
    if (filterTag === 'FOUND') return item.type === 'FOUND';
    return true;
  });

  // Direct Open Report Modal Handler
  var openReportModal = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    setShowReportModal(true);
  };

  // Direct Open Appeal Modal Handler
  var openAppealModal = function(itemOrEvent, possibleItem) {
    var item = null;
    var event = null;

    if (itemOrEvent && itemOrEvent.id && itemOrEvent.title) {
      item = itemOrEvent;
      event = possibleItem;
    } else if (possibleItem && possibleItem.id && possibleItem.title) {
      item = possibleItem;
      event = itemOrEvent;
    }

    if (event && event.preventDefault) event.preventDefault();
    if (event && event.stopPropagation) event.stopPropagation();

    var targetItem = item || (unclaimedItems.length > 0 ? unclaimedItems[0] : null);

    setSelectedItemForAppeal(targetItem);
    setAppealForm({
      itemId: targetItem ? targetItem.id : '',
      claimantName: currentUser ? (currentUser.name || '') : '',
      claimantContact: currentUser ? (currentUser.mobile || currentUser.email || '') : '',
      flightNo: '',
      proofDetails: ''
    });
    setShowAppealModal(true);
  };

  // Submit new report
  var handleReportSubmit = function(e) {
    e.preventDefault();
    if (!reportForm.title.trim() || !reportForm.description.trim()) {
      if (addToast) addToast('Please enter item title and detailed description', 'warning');
      return;
    }

    var newItem = {
      id: 'LFI-' + Math.floor(100 + Math.random() * 900),
      title: reportForm.title,
      category: reportForm.category,
      type: reportForm.type,
      location: reportForm.location || (aptCode + ' Concourse Zone'),
      date: reportForm.date,
      description: reportForm.description,
      status: 'PENDING_REVIEW',
      claimPending: false,
      reporter: reportForm.contactName || 'Airport Traveler',
      contactInfo: reportForm.contactInfo
    };

    var newLostFoundList = [newItem].concat(items);
    setDb(function(prev) {
      var nextDb = Object.assign({}, prev, { lostFoundItems: newLostFoundList });
      try { localStorage.setItem(DB_KEY, JSON.stringify(nextDb)); } catch(err){}
      return nextDb;
    });

    if (appendAuditLog) appendAuditLog('LOST_FOUND_SUBMITTED', 'Submitted ' + reportForm.type + ' report for ' + reportForm.title);
    if (addToast) addToast('⏳ Report submitted! Navigated to Pending Staff Review Queue.', 'success');

    setReportForm({
      title: '',
      category: 'Electronics',
      type: 'LOST',
      location: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      contactName: currentUser ? (currentUser.name || '') : '',
      contactInfo: ''
    });
    setShowReportModal(false);
    setActiveTabSection('PENDING_QUEUE');
  };

  // Public Claim Appeal Submission
  var handleAppealSubmit = function(e) {
    e.preventDefault();
    var targetItemId = appealForm.itemId || (selectedItemForAppeal ? selectedItemForAppeal.id : '');
    var targetItem = items.find(function(i) { return i.id === targetItemId; }) || selectedItemForAppeal;

    if (!targetItem) {
      if (addToast) addToast('Please select an item to claim', 'warning');
      return;
    }

    if (!appealForm.claimantName.trim() || !appealForm.claimantContact.trim() || !appealForm.proofDetails.trim()) {
      if (addToast) addToast('Please enter your name, contact info, and proof of ownership details', 'warning');
      return;
    }

    var newClaim = {
      id: 'CLM-' + Math.floor(1000 + Math.random() * 9000),
      itemId: targetItem.id,
      itemTitle: targetItem.title,
      claimantName: appealForm.claimantName,
      claimantContact: appealForm.claimantContact,
      flightNo: appealForm.flightNo,
      proofDetails: appealForm.proofDetails,
      mediaUrl: appealForm.mediaUrl || '',
      mediaType: appealForm.mediaType || '',
      status: 'PENDING_VERIFICATION',
      timestamp: new Date().toLocaleTimeString()
    };

    var updatedItems = items.map(function(i) {
      return i.id === targetItem.id ? Object.assign({}, i, {
        status: 'PENDING_REVIEW',
        claimPending: true,
        pendingClaimant: appealForm.claimantName
      }) : i;
    });

    var newClaimsList = [newClaim].concat(claimsList);

    setDb(function(prev) {
      var nextDb = Object.assign({}, prev, {
        lostFoundClaims: newClaimsList,
        lostFoundItems: updatedItems
      });
      try { localStorage.setItem(DB_KEY, JSON.stringify(nextDb)); } catch(err){}
      return nextDb;
    });

    if (appendAuditLog) appendAuditLog('ITEM_CLAIM_APPEALED', 'Claim appeal submitted for item ' + targetItem.title);
    if (addToast) addToast('⏳ Claim appeal submitted! Item moved to Pending Review Queue.', 'success');

    setShowAppealModal(false);
    setActiveTabSection('PENDING_QUEUE');
  };

  // Staff Approve Pending Review Item
  var handleApproveReport = function(itemId, itemTitle, isClaimPending) {
    var nextStatus = isClaimPending ? 'CLAIMED' : 'UNCLAIMED';
    var updated = items.map(function(item) {
      return item.id === itemId ? Object.assign({}, item, { status: nextStatus, claimPending: false }) : item;
    });
    setDb(function(prev) {
      var nextDb = Object.assign({}, prev, { lostFoundItems: updated });
      try { localStorage.setItem(DB_KEY, JSON.stringify(nextDb)); } catch(err){}
      return nextDb;
    });
    if (appendAuditLog) appendAuditLog('LOST_FOUND_APPROVED', 'Approved item ' + itemTitle + ' -> ' + nextStatus);
    if (addToast) addToast('✅ Approved ' + itemTitle + '! Status set to ' + nextStatus + '.', 'success');
  };

  // Staff Reject Pending Review Item
  var handleRejectReport = function(itemId, itemTitle, isClaimPending) {
    var nextStatus = isClaimPending ? 'UNCLAIMED' : 'REJECTED';
    var updated = items.map(function(item) {
      return item.id === itemId ? Object.assign({}, item, { status: nextStatus, claimPending: false }) : item;
    });
    setDb(function(prev) {
      var nextDb = Object.assign({}, prev, { lostFoundItems: updated });
      try { localStorage.setItem(DB_KEY, JSON.stringify(nextDb)); } catch(err){}
      return nextDb;
    });
    if (appendAuditLog) appendAuditLog('LOST_FOUND_REJECTED', 'Rejected review for ' + itemTitle);
    if (addToast) addToast('❌ Rejected review for ' + itemTitle + '.', 'warning');
  };

  // Staff Approve Passenger Claim Appeal directly
  var handleApproveClaim = function(claimId, itemId, itemTitle) {
    var updatedClaims = claimsList.map(function(c) { return c.id === claimId ? Object.assign({}, c, { status: 'APPROVED' }) : c; });
    var updatedItems = items.map(function(i) { return i.id === itemId ? Object.assign({}, i, { status: 'CLAIMED', claimPending: false }) : i; });
    setDb(function(prev) {
      var nextDb = Object.assign({}, prev, { lostFoundClaims: updatedClaims, lostFoundItems: updatedItems });
      try { localStorage.setItem(DB_KEY, JSON.stringify(nextDb)); } catch(err){}
      return nextDb;
    });
    if (appendAuditLog) appendAuditLog('CLAIM_APPEAL_APPROVED', 'Verified & approved claim for ' + itemTitle);
    if (addToast) addToast('✅ Claim approved! Item ' + itemTitle + ' marked as CLAIMED.', 'success');
  };

  var handleDismissClaim = function(claimId) {
    var updatedClaims = claimsList.map(function(c) { return c.id === claimId ? Object.assign({}, c, { status: 'DISMISSED' }) : c; });
    setDb(function(prev) {
      var nextDb = Object.assign({}, prev, { lostFoundClaims: updatedClaims });
      try { localStorage.setItem(DB_KEY, JSON.stringify(nextDb)); } catch(err){}
      return nextDb;
    });
    if (addToast) addToast('Dismissed claim appeal', 'info');
  };

  // Admin Delete Claimed Item
  var handleDeleteClaimedItem = function(itemId, itemTitle) {
    var updatedItems = items.filter(function(i) { return i.id !== itemId; });
    var updatedClaims = claimsList.filter(function(c) { return c.itemId !== itemId; });
    setDb(function(prev) {
      var nextDb = Object.assign({}, prev, { lostFoundItems: updatedItems, lostFoundClaims: updatedClaims });
      try { localStorage.setItem(DB_KEY, JSON.stringify(nextDb)); } catch(err){}
      return nextDb;
    });
    if (appendAuditLog) appendAuditLog('ADMIN_DELETE_CLAIMED_ITEM', 'Permanently deleted claimed item ' + itemTitle);
    if (addToast) addToast('🗑️ Permanently deleted claimed item: ' + itemTitle, 'warning');
  };

  var renderPortalModal = function(modalElement) {
    if (!modalElement) return null;
    if (typeof ReactDOM !== 'undefined' && ReactDOM.createPortal && typeof document !== 'undefined' && document.body) {
      return ReactDOM.createPortal(modalElement, document.body);
    }
    return modalElement;
  };

  var reportModalJSX = showReportModal ? React.createElement("div", {
    style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }
  }, React.createElement("div", {
    className: "glass-card",
    style: { width: '100%', maxWidth: '520px', background: '#0f172a', border: '1px solid var(--accent-amber)', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.9)' }
  }, React.createElement("div", {
    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }
  }, React.createElement("h3", {
    style: { margin: 0, color: 'var(--accent-amber)', fontWeight: 800 }
  }, "+ Report Missing or Found Item"), React.createElement("button", {
    type: "button",
    onClick: function() { setShowReportModal(false); },
    style: { background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }
  }, "✖")), React.createElement("form", {
    onSubmit: handleReportSubmit,
    style: { display: 'flex', flexDirection: 'column', gap: '0.85rem' }
  }, React.createElement("div", { className: "grid-2", style: { gap: '0.75rem' } }, React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "Report Type"), React.createElement("select", {
    className: "form-input",
    value: reportForm.type,
    onChange: function(e) { setReportForm(Object.assign({}, reportForm, { type: e.target.value })); },
    style: { background: '#0f172a', color: '#fff' }
  }, React.createElement("option", { value: "LOST" }, "🔴 Lost Item"), React.createElement("option", { value: "FOUND" }, "🟢 Found Item"))), React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "Item Category"), React.createElement("select", {
    className: "form-input",
    value: reportForm.category,
    onChange: function(e) { setReportForm(Object.assign({}, reportForm, { category: e.target.value })); },
    style: { background: '#0f172a', color: '#fff' }
  }, React.createElement("option", { value: "Electronics" }, "Electronics"), React.createElement("option", { value: "Luggage" }, "Luggage / Bags"), React.createElement("option", { value: "Documents" }, "Passport / Documents"), React.createElement("option", { value: "Clothing" }, "Clothing / Accessories"), React.createElement("option", { value: "Keys" }, "Keys / Wallet")))), React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "Item Title / Name"), React.createElement("input", {
    className: "form-input",
    placeholder: "e.g. Apple iPad Pro 11-inch (Space Gray)",
    value: reportForm.title,
    onChange: function(e) { setReportForm(Object.assign({}, reportForm, { title: e.target.value })); },
    required: true
  })), React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "Location Lost / Found"), React.createElement("input", {
    className: "form-input",
    placeholder: "e.g. Terminal 3 Gate 42 Security Area",
    value: reportForm.location,
    onChange: function(e) { setReportForm(Object.assign({}, reportForm, { location: e.target.value })); }
  })), React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "Detailed Description & Identifying Marks"), React.createElement("textarea", {
    className: "form-input",
    rows: 3,
    placeholder: "Describe colors, stickers, case type, contents...",
    value: reportForm.description,
    onChange: function(e) { setReportForm(Object.assign({}, reportForm, { description: e.target.value })); },
    required: true
  })), React.createElement("div", { className: "grid-2", style: { gap: '0.75rem' } }, React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "Your Name"), React.createElement("input", {
    className: "form-input",
    placeholder: "Full Name",
    value: reportForm.contactName,
    onChange: function(e) { setReportForm(Object.assign({}, reportForm, { contactName: e.target.value })); },
    required: true
  })), React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "Contact Phone / Email"), React.createElement("input", {
    className: "form-input",
    placeholder: "+91 9876543210",
    value: reportForm.contactInfo,
    onChange: function(e) { setReportForm(Object.assign({}, reportForm, { contactInfo: e.target.value })); },
    required: true
  }))), React.createElement("div", {
    style: { fontSize: '0.7rem', color: 'var(--accent-amber)', background: 'rgba(245,158,11,0.1)', padding: '0.5rem', borderRadius: '6px' }
  }, "ℹ️ Submitted reports will be sent to Pending Staff Review Queue before being published."), React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: { marginTop: '0.35rem', padding: '0.75rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--accent-amber), #d97706)', color: '#000', cursor: 'pointer' }
  }, "📤 Submit Report for Staff Review")))) : null;

  var appealModalJSX = showAppealModal ? React.createElement("div", {
    style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }
  }, React.createElement("div", {
    className: "glass-card",
    style: { width: '100%', maxWidth: '520px', background: '#0f172a', border: '1px solid var(--accent-cyan)', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.9)' }
  }, React.createElement("div", {
    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }
  }, React.createElement("h3", {
    style: { margin: 0, color: 'var(--accent-cyan)', fontWeight: 800 }
  }, "🙋‍♂️ Appeal Ownership for Unclaimed Item"), React.createElement("button", {
    type: "button",
    onClick: function() { setShowAppealModal(false); },
    style: { background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }
  }, "✖")), React.createElement("form", {
    onSubmit: handleAppealSubmit,
    style: { display: 'flex', flexDirection: 'column', gap: '0.85rem' }
  }, React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "Select Item to Claim"), React.createElement("select", {
    className: "form-input",
    value: appealForm.itemId,
    onChange: function(e) {
      var selected = items.find(function(i) { return i.id === e.target.value; });
      setSelectedItemForAppeal(selected);
      setAppealForm(Object.assign({}, appealForm, { itemId: e.target.value }));
    },
    style: { background: '#0f172a', color: '#fff', fontWeight: 700 }
  }, unclaimedItems.map(function(un) { return React.createElement("option", { key: un.id, value: un.id }, un.title + " (" + un.location + ")"); }))), React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "Your Full Name"), React.createElement("input", {
    className: "form-input",
    placeholder: "Enter your full name...",
    value: appealForm.claimantName,
    onChange: function(e) { setAppealForm(Object.assign({}, appealForm, { claimantName: e.target.value })); },
    required: true
  })), React.createElement("div", { className: "grid-2", style: { gap: '0.75rem' } }, React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "Contact Phone / Email"), React.createElement("input", {
    className: "form-input",
    placeholder: "+91 9876543210 / email",
    value: appealForm.claimantContact,
    onChange: function(e) { setAppealForm(Object.assign({}, appealForm, { claimantContact: e.target.value })); },
    required: true
  })), React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "Flight Number (If Applicable)"), React.createElement("input", {
    className: "form-input",
    placeholder: "e.g. AI-102",
    value: appealForm.flightNo,
    onChange: function(e) { setAppealForm(Object.assign({}, appealForm, { flightNo: e.target.value })); }
  }))), React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "Proof of Ownership / Unique Identifying Features"), React.createElement("textarea", {
    className: "form-input",
    rows: 2,
    placeholder: "Provide serial numbers, passcode description, stickers, unique scratches, or exact item contents...",
    value: appealForm.proofDetails,
    onChange: function(e) { setAppealForm(Object.assign({}, appealForm, { proofDetails: e.target.value })); },
    required: true
  })), React.createElement("div", null, React.createElement("label", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' } }, "📷 Upload Photo / Video Proof of Ownership (Optional)"), React.createElement("input", {
    type: "file",
    accept: "image/*,video/*",
    className: "form-input",
    onChange: function(e) {
      var file = e.target.files && e.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function(evt) {
          setAppealForm(Object.assign({}, appealForm, {
            mediaUrl: evt.target.result,
            mediaType: file.type.startsWith('video') ? 'video' : 'image'
          }));
        };
        reader.readAsDataURL(file);
      }
    },
    style: { background: '#0f172a', color: '#fff' }
  }), appealForm.mediaUrl && React.createElement("div", { style: { marginTop: '0.5rem' } }, appealForm.mediaType === 'video' ? React.createElement("video", { src: appealForm.mediaUrl, controls: true, style: { width: '100%', maxHeight: '140px', borderRadius: '8px' } }) : React.createElement("img", { src: appealForm.mediaUrl, alt: "Proof Preview", style: { width: '100%', maxHeight: '140px', objectFit: 'cover', borderRadius: '8px' } }))), React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: { marginTop: '0.35rem', padding: '0.75rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--accent-cyan), #0284c7)', color: '#000', cursor: 'pointer' }
  }, "🙋‍♂️ Submit Claim Appeal for Staff Verification")))) : null;

  return React.createElement("div", {
    style: { display: 'flex', flexDirection: 'column', gap: '1.5rem' }
  }, React.createElement("div", {
    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }
  }, React.createElement("div", null, React.createElement("h2", {
    style: { fontWeight: 800, margin: 0 }
  }, "🔍 Lost & Found Inventory & Claims Vault — " + aptName + " (" + aptCode + ")"), React.createElement("div", {
    style: { fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }
  }, "Public Unclaimed Gallery, Pending Staff Review Queue & Verified Claimed Vault")), React.createElement("div", {
    style: { display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }
  }, React.createElement("button", {
    className: "btn btn-primary",
    style: { background: 'linear-gradient(135deg, var(--accent-amber), #d97706)', color: '#000', fontWeight: 800, cursor: 'pointer' },
    onClick: openReportModal
  }, "+ Report Missing / Found Item"))), 

  // TAB NAVIGATION (ALL PUBLIC TABS VISIBLE TO EVERYONE)
  React.createElement("div", {
    style: { display: 'flex', gap: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', flexWrap: 'wrap' }
  }, React.createElement("button", {
    className: "btn " + (activeTabSection === 'GALLERY' ? 'btn-primary' : 'btn-secondary'),
    onClick: function() { setActiveTabSection('GALLERY'); },
    style: { fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer' }
  }, "📦 Public Unclaimed Gallery (" + unclaimedItems.length + ")"), React.createElement("button", {
    className: "btn " + (activeTabSection === 'PENDING_QUEUE' ? 'btn-primary' : 'btn-secondary'),
    onClick: function() { setActiveTabSection('PENDING_QUEUE'); },
    style: { fontSize: '0.88rem', fontWeight: 700, background: activeTabSection === 'PENDING_QUEUE' ? 'var(--accent-amber)' : 'rgba(245,158,11,0.15)', color: activeTabSection === 'PENDING_QUEUE' ? '#000' : 'var(--accent-amber)', border: '1px solid rgba(245,158,11,0.4)', cursor: 'pointer' }
  }, "⏳ Pending Staff Review Queue (" + pendingReviewItems.length + ")"), React.createElement("button", {
    className: "btn " + (activeTabSection === 'CLAIMED_QUEUE' ? 'btn-primary' : 'btn-secondary'),
    onClick: function() { setActiveTabSection('CLAIMED_QUEUE'); },
    style: { fontSize: '0.88rem', fontWeight: 700, background: activeTabSection === 'CLAIMED_QUEUE' ? 'var(--accent-emerald)' : 'rgba(16,185,129,0.15)', color: activeTabSection === 'CLAIMED_QUEUE' ? '#000' : 'var(--accent-emerald)', border: '1px solid rgba(16,185,129,0.4)', cursor: 'pointer' }
  }, "✅ Claimed Items Vault (" + claimedItems.length + ")"), canManage && React.createElement("button", {
    className: "btn " + (activeTabSection === 'CLAIMS_QUEUE' ? 'btn-primary' : 'btn-secondary'),
    onClick: function() { setActiveTabSection('CLAIMS_QUEUE'); },
    style: { fontSize: '0.88rem', fontWeight: 700, background: activeTabSection === 'CLAIMS_QUEUE' ? 'var(--accent-cyan)' : 'rgba(0,242,254,0.15)', color: activeTabSection === 'CLAIMS_QUEUE' ? '#000' : 'var(--accent-cyan)', border: '1px solid rgba(0,242,254,0.4)', cursor: 'pointer' }
  }, "🙋‍♂️ Received Claim Appeals (" + claimsList.filter(function(c) { return c.status === 'PENDING_VERIFICATION'; }).length + ")")),

  // SECTION 1: PUBLIC UNCLAIMED GALLERY
  activeTabSection === 'GALLERY' && React.createElement("div", {
    style: { display: 'flex', flexDirection: 'column', gap: '1.25rem' }
  }, React.createElement("div", {
    style: { display: 'flex', gap: '0.5rem', alignItems: 'center' }
  }, React.createElement("span", { style: { fontSize: '0.8rem', color: 'var(--text-secondary)' } }, "Filter Tag:"), React.createElement("button", {
    className: "btn " + (filterTag === 'ALL' ? 'btn-primary' : 'btn-secondary'),
    onClick: function() { setFilterTag('ALL'); },
    style: { fontSize: '0.75rem', padding: '0.3rem 0.65rem', cursor: 'pointer' }
  }, "All Items"), React.createElement("button", {
    className: "btn " + (filterTag === 'LOST' ? 'btn-primary' : 'btn-secondary'),
    onClick: function() { setFilterTag('LOST'); },
    style: { fontSize: '0.75rem', padding: '0.3rem 0.65rem', background: filterTag === 'LOST' ? 'var(--accent-amber)' : '', color: filterTag === 'LOST' ? '#000' : '', cursor: 'pointer' }
  }, "🔴 Reported Lost"), React.createElement("button", {
    className: "btn " + (filterTag === 'FOUND' ? 'btn-primary' : 'btn-secondary'),
    onClick: function() { setFilterTag('FOUND'); },
    style: { fontSize: '0.75rem', padding: '0.3rem 0.65rem', background: filterTag === 'FOUND' ? 'var(--accent-emerald)' : '', color: filterTag === 'FOUND' ? '#000' : '', cursor: 'pointer' }
  }, "🟢 Found / Recovered")), React.createElement("div", {
    className: "grid-3",
    style: { gap: '1.25rem' }
  }, filteredUnclaimedItems.map(function(item) {
    return React.createElement("div", {
      key: item.id,
      className: "glass-card",
      style: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '3px solid ' + (item.type === 'LOST' ? 'var(--accent-amber)' : 'var(--accent-emerald)') }
    }, React.createElement("div", null, React.createElement("div", {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }
    }, React.createElement("span", {
      className: "badge " + (item.type === 'LOST' ? 'badge-warning' : 'badge-success')
    }, item.type === 'LOST' ? '🔴 LOST' : '🟢 FOUND'), React.createElement("span", {
      style: { fontSize: '0.7rem', color: 'var(--text-muted)' }
    }, item.date)), React.createElement("h4", {
      style: { color: '#fff', margin: '0 0 0.4rem 0', fontSize: '0.95rem', fontWeight: 700 }
    }, item.title), React.createElement("div", {
      style: { fontSize: '0.78rem', color: 'var(--accent-cyan)', marginBottom: '0.4rem' }
    }, "📍 Location: " + item.location), React.createElement("p", {
      style: { fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0 0 0.85rem 0', lineHeight: '1.4' }
    }, item.description)), React.createElement("div", {
      style: { borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }
    }, React.createElement("div", {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
    }, React.createElement("span", {
      className: "badge badge-info",
      style: { fontSize: '0.7rem', fontWeight: 800, padding: '0.3rem 0.6rem' }
    }, item.status), React.createElement("span", {
      style: { fontSize: '0.7rem', color: '#fbbf24', fontWeight: 700 }
    }, "Ownership Claim Open")), React.createElement("div", {
      style: {
        padding: '0.6rem 0.75rem',
        borderRadius: '8px',
        background: 'rgba(245, 158, 11, 0.15)',
        border: '1.5px solid rgba(245, 158, 11, 0.55)',
        boxShadow: '0 4px 14px rgba(245, 158, 11, 0.2)',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        gap: '0.5rem'
      }
    }, React.createElement("span", {
      style: { fontSize: '0.73rem', color: '#fff', fontWeight: 600 }
    }, "Belongs to you?"), React.createElement("button", {
      className: "btn btn-primary",
      onClick: function(e) { openAppealModal(item, e); },
      style: {
        fontSize: '0.8rem',
        padding: '0.5rem 0.9rem',
        background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
        color: '#000000',
        fontWeight: 900,
        border: 'none',
        borderRadius: '6px',
        boxShadow: '0 0 12px rgba(245, 158, 11, 0.6)',
        cursor: 'pointer'
      }
    }, "🙋‍♂️ Appeal / Claim Item"))));
  })), filteredUnclaimedItems.length === 0 && React.createElement("div", {
    className: "glass-card",
    style: { textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }
  }, "No unclaimed items matching filter.")),

  // SECTION 2: PUBLIC PENDING STAFF REVIEW QUEUE TAB
  activeTabSection === 'PENDING_QUEUE' && React.createElement("div", {
    style: { display: 'flex', flexDirection: 'column', gap: '1rem' }
  }, React.createElement("h3", { style: { color: 'var(--accent-amber)', margin: 0, fontSize: '1.1rem' } }, "⏳ Items & Claim Appeals Awaiting Staff Verification (" + pendingReviewItems.length + ")"), pendingReviewItems.map(function(item) {
    return React.createElement("div", {
      key: item.id,
      className: "glass-card",
      style: { borderLeft: '4px solid var(--accent-amber)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }
    }, React.createElement("div", { style: { flex: 1 } }, React.createElement("div", { style: { display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' } }, React.createElement("span", { className: "badge " + (item.claimPending ? 'badge-info' : item.type === 'LOST' ? 'badge-warning' : 'badge-success') }, item.claimPending ? '🙋‍♂️ CLAIM VERIFICATION UNDER REVIEW' : item.type === 'LOST' ? '🔴 LOST REPORT REVIEW' : '🟢 FOUND REPORT REVIEW'), React.createElement("strong", { style: { color: '#fff', fontSize: '0.95rem' } }, item.title)), React.createElement("div", { style: { fontSize: '0.78rem', color: 'var(--text-secondary)' } }, item.claimPending ? "Claimant: " + (item.pendingClaimant || 'Passenger') + " • Status: Claim Appeal Received" : "Reported by: " + item.reporter + " (" + (item.contactInfo || 'No Contact') + ") • Date: " + item.date), React.createElement("div", { style: { fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' } }, "Location: ", item.location, " — ", item.description)), canManage ? React.createElement("div", { style: { display: 'flex', gap: '0.5rem' } }, React.createElement("button", {
      className: "btn btn-primary",
      onClick: function() { handleApproveReport(item.id, item.title, item.claimPending); },
      style: { background: 'var(--accent-emerald)', color: '#000', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }
    }, item.claimPending ? "✅ Approve & Mark CLAIMED" : "✅ Approve & Publish"), React.createElement("button", {
      className: "btn btn-secondary",
      onClick: function() { handleRejectReport(item.id, item.title, item.claimPending); },
      style: { color: 'var(--accent-rose)', border: '1px solid var(--accent-rose)', fontSize: '0.8rem', cursor: 'pointer' }
    }, "❌ Reject")) : React.createElement("div", {
      style: { fontSize: '0.78rem', color: 'var(--accent-amber)', background: 'rgba(245,158,11,0.15)', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(245,158,11,0.3)' }
    }, "⏳ Under Staff & Admin Verification Review"));
  }), pendingReviewItems.length === 0 && React.createElement("div", {
    className: "glass-card",
    style: { textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }
  }, "No item reports or claim appeals currently in Pending Staff Review Queue.")),

  // SECTION 3: DEDICATED CLAIMED ITEMS VAULT TAB
  activeTabSection === 'CLAIMED_QUEUE' && React.createElement("div", {
    style: { display: 'flex', flexDirection: 'column', gap: '1rem' }
  }, React.createElement("h3", { style: { color: 'var(--accent-emerald)', margin: 0, fontSize: '1.1rem' } }, "✅ Verified & Claimed Items Vault (" + claimedItems.length + ")"), React.createElement("div", {
    className: "grid-3",
    style: { gap: '1.25rem' }
  }, claimedItems.map(function(item) {
    return React.createElement("div", {
      key: item.id,
      className: "glass-card",
      style: { borderTop: '3px solid var(--accent-emerald)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }
    }, React.createElement("div", null, React.createElement("div", {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }
    }, React.createElement("span", {
      className: "badge badge-success",
      style: { fontSize: '0.7rem', fontWeight: 800, padding: '0.3rem 0.65rem' }
    }, "✅ CLAIMED"), React.createElement("span", {
      style: { fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 700 }
    }, "Verified by Staff")), React.createElement("h4", {
      style: { color: '#fff', margin: '0 0 0.4rem 0', fontSize: '0.95rem', fontWeight: 700 }
    }, item.title), React.createElement("div", {
      style: { fontSize: '0.78rem', color: 'var(--accent-cyan)', marginBottom: '0.4rem' }
    }, "📍 Location: " + item.location), React.createElement("p", {
      style: { fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0 0 0.85rem 0', lineHeight: '1.4' }
    }, item.description)), React.createElement("div", {
      style: {
        padding: '0.65rem 0.85rem',
        borderRadius: '8px',
        background: 'rgba(16, 185, 129, 0.15)',
        border: '1.5px solid rgba(16, 185, 129, 0.55)',
        boxShadow: '0 0 12px rgba(16, 185, 129, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        gap: '0.5rem',
        color: 'var(--accent-emerald)',
        fontWeight: 800,
        fontSize: '0.82rem',
        marginTop: '0.5rem'
      }
    }, "🎉 ITEM CLAIMED & VERIFIED BY STAFF"), isAdmin && React.createElement("button", {
      className: "btn btn-secondary",
      onClick: function() { handleDeleteClaimedItem(item.id, item.title); },
      style: { background: 'rgba(244,63,94,0.15)', color: 'var(--accent-rose)', border: '1px solid var(--accent-rose)', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer', marginTop: '0.5rem', width: '100%' }
    }, "🗑️ Delete Claimed Item"));
  })), claimedItems.length === 0 && React.createElement("div", {
    className: "glass-card",
    style: { textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }
  }, "No claimed items archived yet.")),

  renderPortalModal(reportModalJSX),
  renderPortalModal(appealModalJSX)
  );
}

function WheelchairView({
  db,
  setDb,
  isAdmin,
  isStaff,
  addToast,
  appendAuditLog,
  activeAirport
}) {
  const aptCode = activeAirport?.code || 'DEL';
  const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
  const [showAddModal, setShowAddModal] = useState(false);
  const [wcForm, setWcForm] = useState({
    passengerName: '',
    airlineName: 'Air India',
    pnrNumber: `PNR-${aptCode}-`,
    mobileNumber: ''
  });
  const handleSaveWc = e => {
    e.preventDefault();
    const req = {
      id: `WC-${Date.now().toString().slice(-3)}`,
      ...wcForm,
      timestamp: new Date().toLocaleTimeString() + ' IST',
      status: 'DISPATCHED'
    };
    setDb(prev => ({
      ...prev,
      wheelchairRequests: [req, ...prev.wheelchairRequests]
    }));
    appendAuditLog('WHEELCHAIR_DISPATCH', `Dispatched wheelchair for ${wcForm.passengerName}`);
    setShowAddModal(false);
    setWcForm({
      passengerName: '',
      airlineName: 'Air India',
      pnrNumber: `PNR-${aptCode}-`,
      mobileNumber: ''
    });
    addToast(`♿ Wheelchair dispatched for ${wcForm.passengerName}`, 'success');
  };
  const updateStatus = (id, newStatus, passenger) => {
    setDb(prev => ({
      ...prev,
      wheelchairRequests: prev.wheelchairRequests.map(r => r.id === id ? {
        ...r,
        status: newStatus
      } : r)
    }));
    appendAuditLog('WHEELCHAIR_STATUS', `Updated wheelchair ${id} to ${newStatus}`);
    addToast(`Wheelchair status updated to ${newStatus}`, 'info');
  };
  const deleteWc = (id, passenger) => {
    setDb(prev => ({
      ...prev,
      wheelchairRequests: prev.wheelchairRequests.filter(r => r.id !== id)
    }));
    appendAuditLog('WHEELCHAIR_DELETE', `Deleted wheelchair request ${id}`);
    addToast(`Wheelchair request for ${passenger} deleted.`, 'danger');
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontWeight: 800
    }
  }, "\u267F Wheelchair Assistance Service \u2014 ", aptName, " (", aptCode, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--accent-cyan)',
      marginTop: '0.2rem'
    }
  }, "Special Assistance & Mobility Operations Desk at ", aptCode)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setShowAddModal(true)
  }, "+ Request Wheelchair")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    }
  }, [{
    s: 'PENDING',
    c: 'var(--accent-amber)',
    l: 'Pending'
  }, {
    s: 'DISPATCHED',
    c: 'var(--accent-cyan)',
    l: 'Dispatched'
  }, {
    s: 'COMPLETED',
    c: 'var(--accent-emerald)',
    l: 'Completed'
  }, {
    s: 'REJECTED',
    c: 'var(--accent-rose)',
    l: 'Rejected'
  }].map(st => /*#__PURE__*/React.createElement("div", {
    key: st.s,
    className: "glass-card",
    style: {
      padding: '0.6rem 1.25rem',
      flex: 1,
      minWidth: '100px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.4rem',
      fontWeight: 800,
      color: st.c
    }
  }, db.wheelchairRequests.filter(r => r.status === st.s).length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-secondary)'
    }
  }, st.l)))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      fontSize: '0.82rem',
      borderCollapse: 'collapse',
      minWidth: '750px'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '2px solid var(--border-color)',
      color: 'var(--text-secondary)',
      fontSize: '0.75rem',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '0.75rem',
      textAlign: 'left'
    }
  }, "ID"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Passenger"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Airline"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "PNR"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Mobile"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Requested"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Status"), isStaff && /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'center'
    }
  }, "Staff Actions"))), /*#__PURE__*/React.createElement("tbody", null, db.wheelchairRequests.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.id,
    style: {
      borderBottom: '1px solid rgba(255,255,255,0.04)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0.75rem',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.78rem',
      color: 'var(--text-muted)'
    }
  }, r.id), /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 600
    }
  }, r.passengerName), /*#__PURE__*/React.createElement("td", null, r.airlineName), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.78rem'
    }
  }, r.pnrNumber || '—'), /*#__PURE__*/React.createElement("td", {
    style: {
      fontSize: '0.78rem'
    }
  }, r.mobileNumber), /*#__PURE__*/React.createElement("td", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, r.timestamp), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `badge ${r.status === 'COMPLETED' ? 'badge-success' : r.status === 'DISPATCHED' ? 'badge-warning' : r.status === 'REJECTED' ? 'badge-danger' : 'badge-info'}`
  }, r.status)), isStaff && /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.25rem',
      justifyContent: 'center'
    }
  }, r.status === 'PENDING' && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.5rem'
    },
    onClick: () => updateStatus(r.id, 'DISPATCHED', r.passengerName)
  }, "\uD83D\uDE80 Dispatch"), (r.status === 'DISPATCHED' || r.status === 'PENDING') && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.5rem',
      color: 'var(--accent-emerald)'
    },
    onClick: () => updateStatus(r.id, 'COMPLETED', r.passengerName)
  }, "\u2705 Complete"), r.status === 'PENDING' && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.5rem',
      color: 'var(--accent-rose)'
    },
    onClick: () => updateStatus(r.id, 'REJECTED', r.passengerName)
  }, "\u2715 Reject"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.5rem',
      color: 'var(--accent-rose)'
    },
    onClick: () => deleteWc(r.id, r.passengerName)
  }, "\uD83D\uDDD1\uFE0F")))))))), showAddModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) setShowAddModal(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '450px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)'
    }
  }, "\u267F Request Wheelchair Service"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setShowAddModal(false)
  }, "\xD7")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveWc,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Passenger Full Name"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "e.g. Ramesh Kumar",
    value: wcForm.passengerName,
    onChange: e => setWcForm({
      ...wcForm,
      passengerName: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Airline Name"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "e.g. Air India / IndiGo",
    value: wcForm.airlineName,
    onChange: e => setWcForm({
      ...wcForm,
      airlineName: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "PNR Number"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: wcForm.pnrNumber,
    onChange: e => setWcForm({
      ...wcForm,
      pnrNumber: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Passenger Contact Mobile"), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    required: true,
    className: "form-input",
    placeholder: "+91 9876543210",
    value: wcForm.mobileNumber,
    onChange: e => setWcForm({
      ...wcForm,
      mobileNumber: e.target.value
    })
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Submit Wheelchair Request")))));
}

// ═══════════════════════════════════════════════════════
// 11. DUTY ROSTER & ATTENDANCE VIEW
// ═══════════════════════════════════════════════════════

function DutyRosterView({
  db,
  setDb,
  currentUser,
  isAdmin,
  isStaff,
  addToast,
  appendAuditLog,
  activeAirport
}) {
  const aptCode = activeAirport?.code || 'DEL';
  const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
  const [rosterTab, setRosterTab] = useState(isAdmin ? 'allRosters' : 'myDuty');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [leaveForm, setLeaveForm] = useState({
    leaveType: 'Casual Leave',
    fromDate: new Date().toISOString().slice(0, 10),
    toDate: new Date().toISOString().slice(0, 10),
    reason: ''
  });
  const [rosterForm, setRosterForm] = useState({
    location: `${aptName} - Terminal 3 CISF Command`,
    shift: 'Morning Shift (06:00 - 14:00 IST)'
  });
  const myRoster = (db.dutyRosters || []).find(r => r.userId === currentUser?.id) || {
    location: `${aptName} - Terminal 3 Command`,
    shift: 'General Shift (09:00 - 17:00 IST)',
    status: 'ON_DUTY',
    clockInTime: '09:00 IST'
  };

  // Find active attendance session (un-clocked-out attendance entry)
  const activeAttendance = (db.attendanceLogs || []).find(a => a.userId === currentUser?.id && !a.clockOut);
  const isCurrentlyActiveOnDuty = Boolean(activeAttendance);
  const [isOnBreak, setIsOnBreak] = useState(myRoster.status === 'ON_BREAK');
  const handleToggleBreak = () => {
    const timeNow = new Date().toLocaleTimeString() + ' IST';
    const nextBreakState = !isOnBreak;
    setIsOnBreak(nextBreakState);
    const newStatus = nextBreakState ? 'ON_BREAK' : 'ON_DUTY';
    setDb(prev => ({
      ...prev,
      dutyRosters: (prev.dutyRosters || []).map(r => r.userId === currentUser?.id ? {
        ...r,
        status: newStatus
      } : r)
    }));
    appendAuditLog('ATTENDANCE_BREAK', `${currentUser?.name} ${nextBreakState ? 'started break' : 'ended break'} at ${timeNow}`);
    addToast(nextBreakState ? `☕ Break started at ${timeNow}. Duty status: ON_BREAK` : `🟢 Break ended! Resumed active duty (ON_DUTY)`, 'info');
  };
  const handleClockIn = () => {
    const timeNow = new Date().toLocaleTimeString() + ' IST';
    const dateToday = new Date().toISOString().slice(0, 10);
    const newAtt = {
      id: `ATT-${Date.now().toString().slice(-4)}`,
      userId: currentUser.id,
      name: currentUser.name,
      role: currentUser.role,
      date: dateToday,
      clockIn: timeNow,
      clockOut: null,
      status: 'PRESENT'
    };
    setIsOnBreak(false);
    setDb(prev => {
      const existingRosters = prev.dutyRosters || [];
      const userRosterExists = existingRosters.some(r => r.userId === currentUser.id);
      const updatedRosters = userRosterExists ? existingRosters.map(r => r.userId === currentUser.id ? {
        ...r,
        status: 'ON_DUTY',
        clockInTime: timeNow
      } : r) : [...existingRosters, {
        id: `DR-${Date.now().toString().slice(-3)}`,
        userId: currentUser.id,
        name: currentUser.name,
        role: currentUser.role,
        location: `${aptName} - Terminal 3 Command`,
        shift: 'General Shift (09:00 - 17:00 IST)',
        status: 'ON_DUTY',
        clockInTime: timeNow
      }];
      return {
        ...prev,
        attendanceLogs: [newAtt, ...(prev.attendanceLogs || [])],
        dutyRosters: updatedRosters
      };
    });
    appendAuditLog('ATTENDANCE_CLOCK_IN', `${currentUser.name} clocked in at ${timeNow}`);
    addToast(`⏱️ Clocked IN successfully at ${timeNow}! Duty Status updated to ON_DUTY`, 'success');
  };
  const handleClockOut = () => {
    const timeNow = new Date().toLocaleTimeString() + ' IST';
    setIsOnBreak(false);
    setDb(prev => ({
      ...prev,
      attendanceLogs: (prev.attendanceLogs || []).map(a => a.userId === currentUser.id && !a.clockOut ? {
        ...a,
        clockOut: timeNow
      } : a),
      dutyRosters: (prev.dutyRosters || []).map(r => r.userId === currentUser.id ? {
        ...r,
        status: 'OFF_DUTY'
      } : r)
    }));
    appendAuditLog('ATTENDANCE_CLOCK_OUT', `${currentUser.name} clocked out at ${timeNow}`);
    addToast(`🚪 Clocked OUT successfully at ${timeNow}. Duty Status updated to OFF_DUTY`, 'info');
  };
  const handleApplyLeave = e => {
    e.preventDefault();
    const newApp = {
      id: `LV-${Date.now().toString().slice(-4)}`,
      userId: currentUser?.id || 'USR-ANON',
      applicantName: currentUser?.name || 'Staff Member',
      role: currentUser?.role || 'Staff',
      ...leaveForm,
      status: 'PENDING_ADMIN_REVIEW',
      appliedOn: new Date().toLocaleDateString()
    };
    setDb(prev => ({
      ...prev,
      leaveApplications: [newApp, ...(prev.leaveApplications || [])]
    }));
    appendAuditLog('LEAVE_APPLICATION_SUBMIT', `${currentUser?.name} applied for ${leaveForm.leaveType}`);
    addToast('Leave application submitted for Admin Review!', 'success');
    setShowLeaveModal(false);
    setLeaveForm({
      leaveType: 'Casual Leave',
      fromDate: new Date().toISOString().slice(0, 10),
      toDate: new Date().toISOString().slice(0, 10),
      reason: ''
    });
  };
  const handleApproveLeave = id => {
    setDb(prev => ({
      ...prev,
      leaveApplications: (prev.leaveApplications || []).map(l => l.id === id ? {
        ...l,
        status: 'APPROVED'
      } : l)
    }));
    appendAuditLog('LEAVE_APPROVE', `Admin approved leave application ${id}`);
    addToast('Leave Application APPROVED!', 'success');
  };
  const handleRejectLeave = id => {
    setDb(prev => ({
      ...prev,
      leaveApplications: (prev.leaveApplications || []).map(l => l.id === id ? {
        ...l,
        status: 'REJECTED'
      } : l)
    }));
    appendAuditLog('LEAVE_REJECT', `Admin rejected leave application ${id}`);
    addToast('Leave Application REJECTED.', 'danger');
  };
  const handleSaveRoster = e => {
    e.preventDefault();
    if (!selectedUser) return;
    setDb(prev => {
      const existing = (prev.dutyRosters || []).filter(r => r.userId !== selectedUser.id);
      const updated = {
        id: `DR-${Date.now().toString().slice(-3)}`,
        userId: selectedUser.id,
        name: selectedUser.name,
        role: selectedUser.role,
        location: rosterForm.location,
        shift: rosterForm.shift,
        status: 'OFF_DUTY'
      };
      return {
        ...prev,
        dutyRosters: [...existing, updated]
      };
    });
    appendAuditLog('ROSTER_ASSIGN', `Assigned roster for ${selectedUser.name} to ${rosterForm.location}`);
    addToast(`Roster updated for ${selectedUser.name}!`, 'success');
    setShowAssignModal(false);
    setSelectedUser(null);
  };

  // Filter leave applications: For staff, show their own; for Admin, show all
  const userLeaveApps = isAdmin ? db.leaveApplications || [] : (db.leaveApplications || []).filter(l => l.userId === currentUser?.id);

  // Current real-time duty status
  const currentDutyStatus = myRoster.status || 'OFF_DUTY';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontWeight: 800,
      color: 'var(--brand-cyan)'
    }
  }, "\uD83D\uDCC5 Staff Duty Roster & Attendance \u2014 ", aptName, " (", aptCode, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: 'var(--text-secondary)'
    }
  }, "Log daily shift attendance, check duty postings, and manage staff leave applications for ", aptCode)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap'
    }
  }, !isAdmin && /*#__PURE__*/React.createElement("button", {
    className: `btn ${rosterTab === 'myDuty' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setRosterTab('myDuty')
  }, "My Shift & Clock In"), /*#__PURE__*/React.createElement("button", {
    className: `btn ${rosterTab === 'leaveApp' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setRosterTab('leaveApp')
  }, "Leave Applications"), /*#__PURE__*/React.createElement("button", {
    className: `btn ${rosterTab === 'allRosters' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setRosterTab('allRosters')
  }, "Staff Roster Manager"), isAdmin && /*#__PURE__*/React.createElement("button", {
    className: `btn ${rosterTab === 'allAttendance' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setRosterTab('allAttendance')
  }, "All Staff Attendance Logs"))), rosterTab === 'myDuty' && !isAdmin && /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--brand-cyan)',
      marginBottom: '1rem'
    }
  }, "\uD83D\uDCCC My Assigned Posting & Shift"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.9rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Location: ", /*#__PURE__*/React.createElement("strong", null, myRoster.location)), /*#__PURE__*/React.createElement("div", null, "Shift: ", /*#__PURE__*/React.createElement("strong", null, myRoster.shift)), /*#__PURE__*/React.createElement("div", null, "Live Duty Status: ", /*#__PURE__*/React.createElement("span", {
    className: `badge ${currentDutyStatus === 'ON_DUTY' ? 'badge-success' : currentDutyStatus === 'ON_BREAK' ? 'badge-amber' : 'badge-warning'}`
  }, currentDutyStatus))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '1.5rem',
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap'
    }
  }, !isCurrentlyActiveOnDuty ? /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 1
    },
    onClick: handleClockIn
  }, "\u23F1\uFE0F Clock IN for Shift") : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      flex: 1,
      color: 'var(--accent-rose)'
    },
    onClick: handleClockOut
  }, "\uD83D\uDEAA Clock OUT of Shift"), isCurrentlyActiveOnDuty && /*#__PURE__*/React.createElement("button", {
    className: `btn ${isOnBreak ? 'btn-primary' : 'btn-secondary'}`,
    style: {
      color: isOnBreak ? '#fff' : 'var(--accent-amber)'
    },
    onClick: handleToggleBreak
  }, isOnBreak ? '🟢 End Break (Resume ON_DUTY)' : '☕ Take Break'))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginBottom: '1rem'
    }
  }, "\uD83D\uDCDC My Attendance Log History"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: '250px',
      overflowY: 'auto'
    }
  }, (db.attendanceLogs || []).filter(a => a.userId === currentUser?.id).length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: 'var(--text-muted)'
    }
  }, "No attendance logs recorded yet.") : (db.attendanceLogs || []).filter(a => a.userId === currentUser?.id).map(a => /*#__PURE__*/React.createElement("div", {
    key: a.id,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.4rem 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      fontSize: '0.8rem'
    }
  }, /*#__PURE__*/React.createElement("span", null, a.date), /*#__PURE__*/React.createElement("span", null, "IN: ", a.clockIn), /*#__PURE__*/React.createElement("span", null, "OUT: ", a.clockOut || 'Active')))))), rosterTab === 'leaveApp' && /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      flexWrap: 'wrap',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)'
    }
  }, "\uD83D\uDCDD Leave Applications & Approval Logs"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)',
      marginTop: '0.15rem'
    }
  }, isAdmin ? 'Review, approve, or reject staff leave requests' : 'Track your submitted leave application status (Approved / Rejected / Pending)')), !isAdmin && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setShowLeaveModal(true)
  }, "+ Apply New Leave")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, userLeaveApps.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '2rem',
      color: 'var(--text-muted)',
      fontSize: '0.85rem'
    }
  }, isAdmin ? 'No staff leave applications submitted yet.' : 'You have not submitted any leave applications yet. Click "+ Apply New Leave" to apply.') : userLeaveApps.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.id,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.85rem',
      background: 'rgba(0,0,0,0.25)',
      borderRadius: '8px',
      borderLeft: l.status === 'APPROVED' ? '4px solid var(--accent-emerald)' : l.status === 'REJECTED' ? '4px solid var(--accent-rose)' : '4px solid var(--accent-amber)',
      flexWrap: 'wrap',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '0.95rem'
    }
  }, l.applicantName), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-info"
  }, l.leaveType)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: 'var(--text-secondary)',
      marginTop: '0.2rem'
    }
  }, "\uD83D\uDCC5 Dates: ", /*#__PURE__*/React.createElement("strong", null, l.fromDate), " to ", /*#__PURE__*/React.createElement("strong", null, l.toDate), " \u2022 Applied on: ", l.appliedOn || 'Today'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-muted)',
      marginTop: '0.15rem'
    }
  }, "Reason: \"", l.reason, "\"")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: `badge ${l.status === 'APPROVED' ? 'badge-success' : l.status === 'REJECTED' ? 'badge-danger' : 'badge-warning'}`,
    style: {
      padding: '0.3rem 0.6rem',
      fontSize: '0.78rem'
    }
  }, l.status === 'APPROVED' ? '✅ Approved by Admin' : l.status === 'REJECTED' ? '🛑 Rejected by Admin' : '⏳ Pending Admin Review'), isAdmin && l.status === 'PENDING_ADMIN_REVIEW' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      fontSize: '0.75rem',
      padding: '0.25rem 0.55rem'
    },
    onClick: () => handleApproveLeave(l.id)
  }, "\u2713 Approve"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.75rem',
      padding: '0.25rem 0.55rem',
      color: 'var(--accent-rose)'
    },
    onClick: () => handleRejectLeave(l.id)
  }, "\u2715 Reject"))))))), rosterTab === 'allRosters' && /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--brand-cyan)'
    }
  }, "\uD83D\uDC51 Staff Duty Roster Posting Schedules \u2014 ", aptName), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)',
      marginTop: '0.15rem'
    }
  }, "View and manage active duty postings and shift schedules for airport staff"))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "data-table",
    style: {
      fontSize: '0.82rem',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '2px solid var(--border-color)',
      color: 'var(--text-secondary)',
      fontSize: '0.75rem',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '0.75rem',
      textAlign: 'left'
    }
  }, "Staff Member"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Role"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Assigned Posting / Location"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Shift Timings"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Duty Status"), isAdmin && /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'center'
    }
  }, "Admin Action"))), /*#__PURE__*/React.createElement("tbody", null, db.users.filter(u => u.role !== 'Passenger').map(u => {
    const rost = (db.dutyRosters || []).find(r => r.userId === u.id) || {
      location: `${aptName} - Terminal 3 Command`,
      shift: 'Morning Shift (06:00 - 14:00 IST)',
      status: 'OFF_DUTY'
    };
    return /*#__PURE__*/React.createElement("tr", {
      key: u.id,
      style: {
        borderBottom: '1px solid rgba(255,255,255,0.04)'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '0.75rem'
      }
    }, /*#__PURE__*/React.createElement("strong", null, u.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.7rem',
        color: 'var(--text-muted)'
      }
    }, u.email, " (", u.employeeId || u.id, ")")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: `badge ${u.role === 'Admin' ? 'badge-danger' : 'badge-info'}`
    }, u.role)), /*#__PURE__*/React.createElement("td", null, rost.location), /*#__PURE__*/React.createElement("td", null, rost.shift), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: `badge ${rost.status === 'ON_DUTY' ? 'badge-success' : 'badge-warning'}`
    }, rost.status)), isAdmin && /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary",
      style: {
        fontSize: '0.72rem',
        padding: '0.25rem 0.6rem'
      },
      onClick: () => {
        setSelectedUser(u);
        setRosterForm({
          location: rost.location,
          shift: rost.shift
        });
        setShowAssignModal(true);
      }
    }, "+ Schedule Posting")));
  }))))), rosterTab === 'allAttendance' && isAdmin && /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-emerald)'
    }
  }, "\uD83D\uDCDC All Staff Attendance Logs"), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-info"
  }, db.attendanceLogs?.length || 0, " Total Entries")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "data-table",
    style: {
      width: '100%',
      fontSize: '0.82rem',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '2px solid var(--border-color)',
      color: 'var(--text-secondary)',
      fontSize: '0.75rem',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '0.75rem',
      textAlign: 'left'
    }
  }, "Staff Member"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Role"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Date"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Clock IN Time"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Clock OUT Time"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Status"))), /*#__PURE__*/React.createElement("tbody", null, (db.attendanceLogs || []).length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "6",
    style: {
      textAlign: 'center',
      padding: '1.5rem',
      color: 'var(--text-muted)'
    }
  }, "No staff attendance records logged yet.")) : (db.attendanceLogs || []).map(a => /*#__PURE__*/React.createElement("tr", {
    key: a.id,
    style: {
      borderBottom: '1px solid rgba(255,255,255,0.04)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0.75rem',
      fontWeight: 600
    }
  }, a.name), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "badge badge-info"
  }, a.role)), /*#__PURE__*/React.createElement("td", null, a.date), /*#__PURE__*/React.createElement("td", {
    style: {
      color: 'var(--accent-emerald)',
      fontWeight: 600
    }
  }, a.clockIn), /*#__PURE__*/React.createElement("td", {
    style: {
      color: a.clockOut ? 'var(--accent-rose)' : 'var(--accent-amber)',
      fontWeight: 600
    }
  }, a.clockOut || 'Active Shift'), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `badge ${a.clockOut ? 'badge-success' : 'badge-warning'}`
  }, a.clockOut ? 'COMPLETED' : 'PRESENT')))))))), showLeaveModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) setShowLeaveModal(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '450px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)'
    }
  }, "Apply for Leave"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setShowLeaveModal(false)
  }, "\xD7")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleApplyLeave,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Leave Type"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: leaveForm.leaveType,
    onChange: e => setLeaveForm({
      ...leaveForm,
      leaveType: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "Casual Leave"), /*#__PURE__*/React.createElement("option", null, "Earned Leave"), /*#__PURE__*/React.createElement("option", null, "Medical / Sick Leave"), /*#__PURE__*/React.createElement("option", null, "Duty Off Exemption"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "From Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    required: true,
    className: "form-input",
    value: leaveForm.fromDate,
    onChange: e => setLeaveForm({
      ...leaveForm,
      fromDate: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "To Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    required: true,
    className: "form-input",
    value: leaveForm.toDate,
    onChange: e => setLeaveForm({
      ...leaveForm,
      toDate: e.target.value
    })
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Reason"), /*#__PURE__*/React.createElement("textarea", {
    required: true,
    className: "form-input",
    rows: "3",
    value: leaveForm.reason,
    onChange: e => setLeaveForm({
      ...leaveForm,
      reason: e.target.value
    })
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Submit Leave Application")))), showAssignModal && selectedUser && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) setShowAssignModal(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '500px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)'
    }
  }, "Assign Duty Roster for ", selectedUser.name), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setShowAssignModal(false)
  }, "\xD7")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveRoster,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Duty Location / Posting"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: rosterForm.location,
    onChange: e => setRosterForm({
      ...rosterForm,
      location: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, aptName, " - Terminal 3 CISF Security Hold A"), /*#__PURE__*/React.createElement("option", null, aptName, " - Terminal 1 Security Lane 4"), /*#__PURE__*/React.createElement("option", null, aptName, " - Terminal 2 Check-in Area"), /*#__PURE__*/React.createElement("option", null, aptName, " - ATC Tower Level 8 Command"), /*#__PURE__*/React.createElement("option", null, aptName, " - Terminal 3 Airside Apron Gate T3-G42"), /*#__PURE__*/React.createElement("option", null, aptName, " - Terminal 3 Air India Check-in Row C"), /*#__PURE__*/React.createElement("option", null, aptName, " - Baggage Sorting Hub A"), /*#__PURE__*/React.createElement("option", null, aptName, " - Arrival Carousel 7 Desk"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Shift Timings"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: rosterForm.shift,
    onChange: e => setRosterForm({
      ...rosterForm,
      shift: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "Morning Shift (06:00 - 14:00 IST)"), /*#__PURE__*/React.createElement("option", null, "Evening Shift (14:00 - 22:00 IST)"), /*#__PURE__*/React.createElement("option", null, "Night Shift (22:00 - 06:00 IST)"), /*#__PURE__*/React.createElement("option", null, "General Shift (09:00 - 17:00 IST)"))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Save Roster Assignment")))));
}

// ═══════════════════════════════════════════════════════
// 10. ADMIN COMMAND CENTER
// ═══════════════════════════════════════════════════════

function AdminView({
  db,
  setDb,
  addToast,
  appendAuditLog,
  activeAirport
}) {
  const aptCode = activeAirport?.code || 'DEL';
  const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
  const [adminTab, setAdminTab] = useState('users');
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [newAdminForm, setNewAdminForm] = useState({
    name: '',
    email: '',
    designation: 'Airport Operations Director',
    password: ''
  });
  const [contactForm, setContactForm] = useState({
    helpline: db.contactInfo?.helpline || '+91 8800344794 (Toll Free)',
    email: db.contactInfo?.email || 'admin@delhi.aai',
    address: db.contactInfo?.address || `${aptName}, ${activeAirport?.city} – India`
  });

  // Passwords visibility and Admin Password Reset state
  const [showPasswords, setShowPasswords] = useState({});
  const [showAllPasswords, setShowAllPasswords] = useState(false);
  const [resetTargetUser, setResetTargetUser] = useState(null);
  const [adminNewPasswordInput, setAdminNewPasswordInput] = useState('');
  const handleCreateAdmin = e => {
    e.preventDefault();
    const nu = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: newAdminForm.name,
      email: newAdminForm.email,
      password: newAdminForm.password,
      role: 'Admin',
      designation: newAdminForm.designation || 'Master Admin Director',
      status: 'APPROVED',
      employeeId: `AAI-ADM-${Date.now().toString().slice(-3)}`
    };
    setDb(prev => ({
      ...prev,
      users: [...prev.users, nu]
    }));
    appendAuditLog('ADMIN_CREATE', `Created new Admin: ${newAdminForm.name}`);
    addToast(`Admin ${newAdminForm.name} created!`, 'success');
    setShowCreateAdmin(false);
    setNewAdminForm({
      name: '',
      email: '',
      password: ''
    });
  };
  const approveUser = id => {
    setDb(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === id ? {
        ...u,
        status: 'APPROVED'
      } : u)
    }));
    appendAuditLog('USER_APPROVE', `AAI Master Admin approved staff user ${id}`);
    addToast('Staff login access APPROVED! User can now log in.', 'success');
  };
  const requestDocsUser = id => {
    setDb(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === id ? {
        ...u,
        status: 'PENDING_DOCUMENTS'
      } : u)
    }));
    appendAuditLog('USER_DOCS_REQ', `Master Admin requested verification documents from user ${id}`);
    addToast('Verification documents requested from staff user.', 'info');
  };
  const rejectUser = id => {
    setDb(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === id ? {
        ...u,
        status: 'REJECTED'
      } : u)
    }));
    appendAuditLog('USER_REJECT', `Master Admin rejected staff user ${id}`);
    addToast('Staff registration REJECTED. Access blocked.', 'danger');
  };
  const deleteUser = (id, name) => {
    const target = db.users.find(u => u.id === id);
    if (target && (target.email === 'admin@delhi.aai' || target.id === 'USR-001' || target.employeeId === 'ADM-DEL-001')) {
      addToast('🔒 Action Denied: Primary AAI Master Admin account is protected and cannot be deleted!', 'danger');
      return;
    }
    setDb(prev => ({
      ...prev,
      users: prev.users.filter(u => u.id !== id)
    }));
    appendAuditLog('USER_DELETE', `Deleted user ${name} (${id})`);
    addToast(`User ${name} deleted`, 'danger');
  };
  const resetDB = () => {
    if (!window.confirm("⚠️ Are you sure you want to reset system telemetry to factory defaults? All Admin accounts and credentials will be preserved.")) return;
    const fresh = JSON.parse(JSON.stringify(SEED));
    // Preserve existing Admin user accounts & credentials
    const existingAdmins = (db.users || []).filter(u => u.role === 'Admin' || u.email === 'admin@delhi.aai' || u.id === 'USR-001');
    const mergedUsers = [...existingAdmins];
    (fresh.users || []).forEach(u => {
      if (!mergedUsers.some(m => m.id === u.id || m.email === u.email)) {
        mergedUsers.push(u);
      }
    });
    fresh.users = mergedUsers;
    setDb(fresh);
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(fresh));
    } catch (e) {}
    addToast('🔄 System telemetry reset to factory defaults! Admin credentials preserved.', 'warning');
    appendAuditLog('SYSTEM_RESET', 'System telemetry reset from Admin System Configuration. Admin accounts preserved.');
  };
  const handleSaveContact = e => {
    e.preventDefault();
    setDb(prev => ({
      ...prev,
      contactInfo: {
        ...contactForm
      }
    }));
    appendAuditLog('SYSTEM_CONFIG_UPDATE', 'Updated Airport Support & Contact Information');
    addToast('System contact information updated!', 'success');
  };
  const exportDatabase = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `AAI_AeroPulse_DB_Backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('Database exported as JSON file', 'success');
  };
  const approveResetUser = id => {
    setDb(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === id ? {
        ...u,
        status: 'RESET_APPROVED'
      } : u)
    }));
    appendAuditLog('USER_RESET_APPROVE', `AAI Master Admin approved password reset for user ${id}`);
    addToast('Password Reset APPROVED! One-time password change enabled for staff member.', 'success');
  };
  const blockUser = id => {
    setDb(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === id ? {
        ...u,
        status: 'BLOCKED'
      } : u)
    }));
    appendAuditLog('USER_BLOCK', `AAI Master Admin BLOCKED user ${id}`);
    addToast('🛑 Account BLOCKED until further unblock by Admin.', 'danger');
  };
  const unblockUser = id => {
    setDb(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === id ? {
        ...u,
        status: 'APPROVED'
      } : u)
    }));
    appendAuditLog('USER_UNBLOCK', `AAI Master Admin unblocked user ${id}`);
    addToast('🔓 Account UNBLOCKED successfully!', 'success');
  };
  const handleAdminChangeUserPassword = e => {
    e.preventDefault();
    if (!resetTargetUser || !adminNewPasswordInput) return;
    if (adminNewPasswordInput.length < 3) {
      addToast('Password must be at least 3 characters', 'warning');
      return;
    }
    setDb(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === resetTargetUser.id ? {
        ...u,
        password: adminNewPasswordInput,
        status: 'APPROVED'
      } : u)
    }));
    appendAuditLog('ADMIN_PASSWORD_RESET', `Master Admin changed password for user ${resetTargetUser.name} (${resetTargetUser.id})`);
    addToast(`✅ Password for ${resetTargetUser.name} updated to "${adminNewPasswordInput}"!`, 'success');
    setResetTargetUser(null);
    setAdminNewPasswordInput('');
  };
  const adminTabs = [{
    key: 'users',
    label: '🔑 Account Credentials & Passwords'
  }, {
    key: 'pendingApprovals',
    label: '⏳ Staff Approvals'
  }, {
    key: 'auditLogs',
    label: '📜 Audit Logs'
  }, {
    key: 'systemConfig',
    label: '⚙️ System Config'
  }, {
    key: 'dataOverview',
    label: '📊 Data Overview'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontWeight: 800,
      color: 'var(--accent-amber)'
    }
  }, "\uD83D\uDC51 Admin Master Command Center \u2014 ", aptName, " (", aptCode, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-secondary)',
      marginTop: '0.2rem'
    }
  }, "System Administration & Location Control for ", aptCode, " Hub")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
      background: 'rgba(0,0,0,0.3)',
      padding: '0.25rem',
      borderRadius: 'var(--radius-md)'
    }
  }, adminTabs.map(tab => /*#__PURE__*/React.createElement("button", {
    key: tab.key,
    className: `btn ${adminTab === tab.key ? 'btn-primary' : 'btn-secondary'}`,
    style: {
      fontSize: '0.8rem',
      padding: '0.4rem 0.8rem'
    },
    onClick: () => setAdminTab(tab.key)
  }, tab.label))), adminTab === 'users' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      flexWrap: 'wrap',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-amber)'
    }
  }, "\uD83D\uDD11 Staff & Admin Account Directory (", db.users.length, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)',
      marginTop: '0.15rem'
    }
  }, "View account login credentials, employee IDs, roles, and plaintext passwords for all users")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.78rem',
      padding: '0.35rem 0.75rem'
    },
    onClick: () => setShowAllPasswords(!showAllPasswords)
  }, showAllPasswords ? '🙈 Hide Passwords' : '👁️ Show All Passwords'), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setShowCreateAdmin(true)
  }, "+ Create Admin Account"))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      fontSize: '0.82rem',
      borderCollapse: 'collapse',
      minWidth: '850px'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '2px solid var(--border-color)',
      color: 'var(--text-secondary)',
      fontSize: '0.75rem',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '0.75rem',
      textAlign: 'left'
    }
  }, "Emp ID / User ID"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Full Name"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Email / Login ID"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Role"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Access Status"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Account Password"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'center'
    }
  }, "Admin Actions"))), /*#__PURE__*/React.createElement("tbody", null, db.users.map(u => /*#__PURE__*/React.createElement("tr", {
    key: u.id,
    style: {
      borderBottom: '1px solid rgba(255,255,255,0.04)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0.75rem',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.78rem',
      color: 'var(--accent-cyan)'
    }
  }, u.employeeId || u.id), /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 600
    }
  }, u.name), /*#__PURE__*/React.createElement("td", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, u.email), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `badge ${u.role === 'Admin' ? 'badge-danger' : 'badge-info'}`
  }, u.role)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `badge ${u.status === 'APPROVED' ? 'badge-success' : u.status === 'BLOCKED' ? 'badge-danger' : 'badge-warning'}`
  }, u.status)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0.75rem',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.82rem',
      color: 'var(--accent-amber)',
      fontWeight: 700
    }
  }, showAllPasswords || showPasswords[u.id] ? u.password : '••••••••', /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      padding: '0.1rem 0.35rem',
      fontSize: '0.65rem',
      marginLeft: '0.4rem',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer'
    },
    onClick: () => setShowPasswords(prev => ({
      ...prev,
      [u.id]: !prev[u.id]
    })),
    title: "Toggle password visibility"
  }, showAllPasswords || showPasswords[u.id] ? '🙈' : '👁️')), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.25rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.5rem',
      color: 'var(--accent-amber)',
      borderColor: 'rgba(245,158,11,0.3)'
    },
    onClick: () => {
      setResetTargetUser(u);
      setAdminNewPasswordInput(u.password);
    },
    title: "Reset Password for this account"
  }, "\uD83D\uDD11 Reset Pwd"), u.status === 'PENDING_APPROVAL' && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.5rem'
    },
    onClick: () => approveUser(u.id)
  }, "\u2713 Approve"), u.status === 'BLOCKED' ? /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.5rem'
    },
    onClick: () => unblockUser(u.id)
  }, "\uD83D\uDD13 Unblock") : u.role !== 'Admin' && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.5rem',
      color: 'var(--accent-rose)'
    },
    onClick: () => blockUser(u.id)
  }, "\uD83D\uDED1 Block"), (u.email === 'admin@delhi.aai' || u.id === 'USR-001' || u.employeeId === 'ADM-DEL-001') ? /*#__PURE__*/React.createElement("span", {
    className: "badge badge-warning",
    style: {
      fontSize: '0.68rem',
      padding: '0.25rem 0.55rem'
    }
  }, "\uD83D\uDD12 Protected Master Admin") : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.4rem',
      color: 'var(--accent-rose)'
    },
    onClick: () => deleteUser(u.id, u.name)
  }, "\uD83D\uDDD1️ Delete"))))))))), resetTargetUser && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) setResetTargetUser(null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '420px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      borderBottom: '1px solid var(--border-color)',
      paddingBottom: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-amber)',
      fontSize: '1.05rem'
    }
  }, "\uD83D\uDD11 Admin Reset Password for ", resetTargetUser.name), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setResetTargetUser(null)
  }, "\xD7")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleAdminChangeUserPassword,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-secondary)'
    }
  }, "Target Account: ", /*#__PURE__*/React.createElement("strong", null, resetTargetUser.email), " (", resetTargetUser.role, ")"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Current Password on File:"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      color: 'var(--accent-cyan)',
      fontSize: '0.9rem',
      marginTop: '0.15rem'
    }
  }, resetTargetUser.password)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, "Enter New Password for User:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    className: "form-input",
    style: {
      marginTop: '0.2rem'
    },
    placeholder: "New Password (e.g. Pass123)",
    value: adminNewPasswordInput,
    onChange: e => setAdminNewPasswordInput(e.target.value)
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      background: 'linear-gradient(135deg, var(--accent-amber), #d97706)',
      color: '#000',
      fontWeight: 800
    }
  }, "\uD83D\uDCBE Update User Password")))), adminTab === 'pendingApprovals' && /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginBottom: '0.75rem',
      color: 'var(--accent-amber)'
    }
  }, "\u23F3 Staff Registrations & Password Reset Verification Approvals"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.82rem',
      color: 'var(--text-secondary)',
      marginBottom: '1.25rem'
    }
  }, "Inspect new staff registrations and 2-Step Password Reset Requests (ID Proof + Biometric Face Scan)."), db.users.filter(u => u.status === 'PENDING_APPROVAL' || u.status === 'PENDING_DOCUMENTS' || u.status === 'PENDING_RESET_APPROVAL' || u.status === 'REJECTED' || u.status === 'BLOCKED').length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '2rem',
      color: 'var(--accent-emerald)'
    }
  }, "\u2705 All staff registration and password reset requests are processed!") : db.users.filter(u => u.status === 'PENDING_APPROVAL' || u.status === 'PENDING_DOCUMENTS' || u.status === 'PENDING_RESET_APPROVAL' || u.status === 'REJECTED' || u.status === 'BLOCKED').map(u => /*#__PURE__*/React.createElement("div", {
    key: u.id,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.85rem',
      borderBottom: '1px solid var(--border-color)',
      flexWrap: 'wrap',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, u.name), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: '0.82rem'
    }
  }, "(", u.email, " \u2022 Employee ID: ", u.employeeId || u.id, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      marginTop: '0.2rem',
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: `badge ${u.status === 'PENDING_DOCUMENTS' ? 'badge-warning' : u.status === 'PENDING_RESET_APPROVAL' ? 'badge-cyan' : u.status === 'BLOCKED' ? 'badge-danger' : 'badge-info'}`
  }, u.status === 'PENDING_DOCUMENTS' ? '📄 Pending Verification Documents' : u.status === 'PENDING_RESET_APPROVAL' ? '🔑 Password Reset Request (Face Captured)' : u.status === 'BLOCKED' ? '🛑 Account Blocked' : u.status === 'REJECTED' ? '🛑 Access Rejected' : '⏳ Pending Initial Approval'), u.resetRequest && /*#__PURE__*/React.createElement("span", {
    className: "badge badge-success",
    style: {
      fontSize: '0.68rem'
    }
  }, "\uD83D\uDCC4 ID Proof: ", u.resetRequest.docName, " \u2022 \uD83D\uDCF8 Biometric Face Verified"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.35rem'
    }
  }, u.status === 'PENDING_RESET_APPROVAL' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      fontSize: '0.75rem',
      padding: '0.3rem 0.65rem'
    },
    onClick: () => approveResetUser(u.id)
  }, "\u2713 Approve Reset"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.75rem',
      padding: '0.3rem 0.65rem',
      color: 'var(--accent-rose)'
    },
    onClick: () => blockUser(u.id)
  }, "\uD83D\uDED1 Reject & Block")) : u.status === 'BLOCKED' ? /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      fontSize: '0.75rem',
      padding: '0.3rem 0.65rem'
    },
    onClick: () => unblockUser(u.id)
  }, "\uD83D\uDD13 Unblock Account") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      fontSize: '0.75rem',
      padding: '0.3rem 0.65rem'
    },
    onClick: () => approveUser(u.id)
  }, "\u2713 Approve Login"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.75rem',
      padding: '0.3rem 0.65rem',
      color: 'var(--accent-amber)'
    },
    onClick: () => requestDocsUser(u.id)
  }, "\uD83D\uDCC4 Ask Docs"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.75rem',
      padding: '0.3rem 0.65rem',
      color: 'var(--accent-rose)'
    },
    onClick: () => rejectUser(u.id)
  }, "\u2715 Reject")))))), adminTab === 'auditLogs' && /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginBottom: '1rem'
    }
  }, "\uD83D\uDCDC System Audit Logs (", db.auditLogs.length, " entries)"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: '500px',
      overflowY: 'auto'
    }
  }, db.auditLogs.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.id,
    style: {
      display: 'flex',
      gap: '1rem',
      padding: '0.5rem 0',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      fontSize: '0.8rem',
      fontFamily: 'var(--font-mono)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      minWidth: '180px',
      fontSize: '0.75rem'
    }
  }, l.timestamp), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent-cyan)',
      minWidth: '200px'
    }
  }, l.actor), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-info",
    style: {
      minWidth: '120px',
      justifyContent: 'center'
    }
  }, l.action), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)',
      flex: 1
    }
  }, l.details))))), adminTab === 'systemConfig' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginBottom: '1rem',
      color: 'var(--accent-cyan)'
    }
  }, "\uD83D\uDCDE Update Contact & Support Info"), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveContact,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.85rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Helpline Number"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    value: contactForm.helpline,
    onChange: e => setContactForm({
      ...contactForm,
      helpline: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Support Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    required: true,
    className: "form-input",
    value: contactForm.email,
    onChange: e => setContactForm({
      ...contactForm,
      email: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Airport Address"), /*#__PURE__*/React.createElement("textarea", {
    required: true,
    className: "form-input",
    rows: "3",
    value: contactForm.address,
    onChange: e => setContactForm({
      ...contactForm,
      address: e.target.value
    })
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      marginTop: '0.25rem'
    }
  }, "Save Contact Info"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginBottom: '0.75rem',
      color: 'var(--accent-amber)'
    }
  }, "\u2699\uFE0F Database & Backup Operations"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.65rem'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: exportDatabase
  }, "\uD83D\uDCE5 Export Database (JSON Backup)"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      color: 'var(--accent-amber)'
    },
    onClick: resetDB
  }, "\uD83D\uDD04 Reset Database to Factory Defaults"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      color: 'var(--accent-rose)'
    },
    onClick: () => {
      localStorage.removeItem(DB_KEY);
      addToast('LocalStorage cleared. Reloading page...', 'warning');
      setTimeout(() => window.location.reload(), 1000);
    }
  }, "\uD83D\uDDD1\uFE0F Clear LocalStorage & Reload"))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginBottom: '0.75rem',
      color: 'var(--accent-emerald)'
    }
  }, "\uD83C\uDF24\uFE0F Weather & Diagnostics Controls"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.65rem'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => {
      const nextWeather = db.metrics.weatherStatus.includes('Fog') ? 'Good (Vis 2500m)' : 'Low Visibility Fog (CAT-III B)';
      setDb(prev => ({
        ...prev,
        metrics: {
          ...prev.metrics,
          weatherStatus: nextWeather
        }
      }));
      addToast(`Weather mode updated to: ${nextWeather}`, 'info');
    }
  }, "\u26C5 Toggle Fog / CAT-III Weather Mode"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => {
      setDb(prev => ({
        ...prev,
        metrics: {
          ...prev.metrics,
          systemHealth: '100% Operational'
        }
      }));
      addToast('Ran Full System Diagnostics — 100% Operational!', 'success');
    }
  }, "\uD83D\uDC9A Run System Diagnostics Check")))))), adminTab === 'wheelchair' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("h3", null, "\u267F Wheelchair Assistance Requests (", db.wheelchairRequests.length, ")")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      marginBottom: '1.25rem'
    }
  }, [{
    s: 'PENDING',
    c: 'var(--accent-amber)',
    l: 'Pending'
  }, {
    s: 'DISPATCHED',
    c: 'var(--accent-cyan)',
    l: 'Dispatched'
  }, {
    s: 'COMPLETED',
    c: 'var(--accent-emerald)',
    l: 'Completed'
  }, {
    s: 'REJECTED',
    c: 'var(--accent-rose)',
    l: 'Rejected'
  }].map(st => /*#__PURE__*/React.createElement("div", {
    key: st.s,
    className: "glass-card",
    style: {
      padding: '0.6rem 1.25rem',
      flex: 1,
      minWidth: '100px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.4rem',
      fontWeight: 800,
      color: st.c
    }
  }, db.wheelchairRequests.filter(r => r.status === st.s).length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-secondary)'
    }
  }, st.l)))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      fontSize: '0.82rem',
      borderCollapse: 'collapse',
      minWidth: '750px'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '2px solid var(--border-color)',
      color: 'var(--text-secondary)',
      fontSize: '0.75rem',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '0.75rem',
      textAlign: 'left'
    }
  }, "ID"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Passenger"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Airline"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "PNR"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Mobile"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Requested"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left'
    }
  }, "Status"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'center'
    }
  }, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, db.wheelchairRequests.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.id,
    style: {
      borderBottom: '1px solid rgba(255,255,255,0.04)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0.75rem',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.78rem',
      color: 'var(--text-muted)'
    }
  }, r.id), /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 600
    }
  }, r.passengerName), /*#__PURE__*/React.createElement("td", null, r.airlineName), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.78rem'
    }
  }, r.pnrNumber || '—'), /*#__PURE__*/React.createElement("td", {
    style: {
      fontSize: '0.78rem'
    }
  }, r.mobileNumber), /*#__PURE__*/React.createElement("td", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, r.timestamp), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `badge ${r.status === 'COMPLETED' ? 'badge-success' : r.status === 'DISPATCHED' ? 'badge-warning' : r.status === 'REJECTED' ? 'badge-danger' : 'badge-info'}`
  }, r.status)), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.25rem',
      justifyContent: 'center'
    }
  }, r.status === 'PENDING' && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.5rem'
    },
    onClick: () => {
      setDb(prev => ({
        ...prev,
        wheelchairRequests: prev.wheelchairRequests.map(w => w.id === r.id ? {
          ...w,
          status: 'DISPATCHED'
        } : w)
      }));
      appendAuditLog('WHEELCHAIR_DISPATCH', `Dispatched wheelchair for ${r.passengerName}`);
      addToast(`♿ Wheelchair dispatched for ${r.passengerName}`, 'success');
    }
  }, "\uD83D\uDE80 Dispatch"), (r.status === 'DISPATCHED' || r.status === 'PENDING') && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.5rem',
      color: 'var(--accent-emerald)'
    },
    onClick: () => {
      setDb(prev => ({
        ...prev,
        wheelchairRequests: prev.wheelchairRequests.map(w => w.id === r.id ? {
          ...w,
          status: 'COMPLETED'
        } : w)
      }));
      appendAuditLog('WHEELCHAIR_COMPLETE', `Wheelchair service completed for ${r.passengerName}`);
      addToast(`✅ Wheelchair service completed for ${r.passengerName}`, 'success');
    }
  }, "\u2705 Complete"), r.status === 'PENDING' && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.5rem',
      color: 'var(--accent-rose)'
    },
    onClick: () => {
      setDb(prev => ({
        ...prev,
        wheelchairRequests: prev.wheelchairRequests.map(w => w.id === r.id ? {
          ...w,
          status: 'REJECTED'
        } : w)
      }));
      appendAuditLog('WHEELCHAIR_REJECT', `Wheelchair request rejected for ${r.passengerName}`);
      addToast(`Wheelchair request rejected for ${r.passengerName}`, 'warning');
    }
  }, "\u2715 Reject"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.5rem',
      color: 'var(--accent-rose)'
    },
    onClick: () => {
      setDb(prev => ({
        ...prev,
        wheelchairRequests: prev.wheelchairRequests.filter(w => w.id !== r.id)
      }));
      appendAuditLog('WHEELCHAIR_DELETE', `Deleted wheelchair request ${r.id}`);
      addToast('Wheelchair request deleted', 'danger');
    }
  }, "\uD83D\uDDD1\uFE0F Delete"))))))), db.wheelchairRequests.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '2rem',
      color: 'var(--text-muted)'
    }
  }, "No wheelchair requests yet"))), adminTab === 'dataOverview' && /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, [{
    label: 'Flights',
    count: db.flights.length,
    icon: '✈️',
    color: 'var(--accent-cyan)'
  }, {
    label: 'Gates',
    count: db.gates.length,
    icon: '🚪',
    color: 'var(--accent-emerald)'
  }, {
    label: 'Emergencies',
    count: (db?.emergencies || SEED.emergencies || []).length,
    icon: '🚨',
    color: 'var(--accent-rose)'
  }, {
    label: 'Baggage',
    count: db.baggage.length,
    icon: '🛄',
    color: 'var(--accent-blue)'
  }, {
    label: 'Lost & Found',
    count: db.lostAndFound.length,
    icon: '🔍',
    color: 'var(--accent-amber)'
  }, {
    label: 'CCTV Cams',
    count: db.cctv.length,
    icon: '🎥',
    color: 'var(--accent-purple)'
  }, {
    label: 'Fleet Health',
    count: db.fleetHealth.length,
    icon: '🛠️',
    color: 'var(--accent-cyan)'
  }, {
    label: 'Wheelchair',
    count: db.wheelchairRequests.length,
    icon: '♿',
    color: 'var(--accent-purple)'
  }, {
    label: 'Users',
    count: db.users.length,
    icon: '👥',
    color: 'var(--accent-emerald)'
  }, {
    label: 'Audit Logs',
    count: db.auditLogs.length,
    icon: '📜',
    color: 'var(--accent-amber)'
  }].map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "kpi-card",
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '2rem',
      marginBottom: '0.25rem'
    }
  }, d.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.5rem',
      fontWeight: 800,
      color: d.color
    }
  }, d.count), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)'
    }
  }, d.label)))), showCreateAdmin && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) setShowCreateAdmin(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-amber)'
    }
  }, "\uD83D\uDC51 Create New Admin Account"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setShowCreateAdmin(false)
  }, "\u2715")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleCreateAdmin,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "Full Name",
    value: newAdminForm.name,
    onChange: e => setNewAdminForm({
      ...newAdminForm,
      name: e.target.value
    })
  }), /*#__PURE__*/React.createElement("input", {
    required: true,
    type: "email",
    className: "form-input",
    placeholder: "Email",
    value: newAdminForm.email,
    onChange: e => setNewAdminForm({
      ...newAdminForm,
      email: e.target.value
    })
  }), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "Admin Designation (e.g. Chief Operations Director)",
    value: newAdminForm.designation || "",
    onChange: e => setNewAdminForm({
      ...newAdminForm,
      designation: e.target.value
    })
  }), /*#__PURE__*/React.createElement("input", {
    required: true,
    type: "password",
    className: "form-input",
    placeholder: "Password",
    value: newAdminForm.password,
    onChange: e => setNewAdminForm({
      ...newAdminForm,
      password: e.target.value
    })
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Create Admin")))));
}

// ═══════════════════════════════════════════════════════
// CAR PARKING MANAGEMENT VIEW
// ═══════════════════════════════════════════════════════

function CarParkingView({
  db,
  setDb,
  currentUser,
  isAdmin,
  isStaff,
  addToast,
  appendAuditLog,
  activeAirport
}) {
  const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
  const aptCode = activeAirport?.code || 'DEL';
  const [parkingTab, setParkingTab] = useState('overview'); // 'overview' | 'aiSensors' | 'vehicleLogs' | 'book' | 'myPasses' | 'adminEdit'

  const [resForm, setResForm] = useState({
    passengerName: currentUser?.name || '',
    mobile: currentUser?.mobile || '',
    vehicleType: '4 Wheeler (Car / SUV)',
    vehicleNumber: '',
    terminal: 'T3',
    parkingLot: 'Multi-Level Car Parking (MLCP) - Terminal 3',
    startDate: new Date().toISOString().split('T')[0],
    durationHours: 4
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [activePassModal, setActivePassModal] = useState(null);
  const [verifyModal, setVerifyModal] = useState(null);
  const [verifyInput, setVerifyInput] = useState('');
  const [verifyError, setVerifyError] = useState('');

  // Vehicle Logs Filter State
  const [logSearchQuery, setLogSearchQuery] = useState('');
  const [logTypeFilter, setLogTypeFilter] = useState('ALL'); // 'ALL' | 'ENTRY' | 'EXIT'
  const [logLotFilter, setLogLotFilter] = useState('ALL');

  // Admin Manual Controls State
  const [selectedAdminLotId, setSelectedAdminLotId] = useState('MLCP-T3');
  const [adminLotEditForm, setAdminLotEditForm] = useState({
    total4w: 4500,
    filled4w: 3120,
    reserved4w: 450,
    total2w: 2000,
    filled2w: 1240,
    reserved2w: 210,
    status: 'OPEN'
  });

  // Admin Manual Vehicle Log Form State
  const [manualLogForm, setManualLogForm] = useState({
    vehicleNumber: '',
    vehicleType: '4 Wheeler',
    parkingLot: 'Multi-Level Car Parking (MLCP) - Terminal 3',
    eventType: 'ENTRY',
    gateId: 'GATE-T3-ANPR-01'
  });
  const lots = db.parkingData?.lots || [];
  const rates = db.parkingData?.rates || {
    fourWheeler: [],
    twoWheeler: []
  };
  const reservations = db.parkingData?.reservations || [];
  const vehicleLogs = db.parkingData?.vehicleLogs || [];

  // Selected Admin Lot Object
  const activeAdminLot = lots.find(l => l.id === selectedAdminLotId) || lots[0];

  // Update local admin lot edit form whenever selected lot changes
  useEffect(() => {
    if (activeAdminLot) {
      setAdminLotEditForm({
        total4w: activeAdminLot.total4w,
        filled4w: activeAdminLot.filled4w,
        reserved4w: activeAdminLot.reserved4w,
        total2w: activeAdminLot.total2w,
        filled2w: activeAdminLot.filled2w,
        reserved2w: activeAdminLot.reserved2w,
        status: activeAdminLot.status
      });
    }
  }, [selectedAdminLotId]);

  // Calculate totals
  const totalAvailable4w = lots.reduce((acc, l) => acc + (l.total4w - l.filled4w - l.reserved4w), 0);
  const totalAvailable2w = lots.reduce((acc, l) => acc + (l.total2w - l.filled2w - l.reserved2w), 0);
  const totalReserved = reservations.length;
  const totalEntries24h = vehicleLogs.filter(l => l.eventType === 'ENTRY').length;
  const totalExits24h = vehicleLogs.filter(l => l.eventType === 'EXIT').length;

  // Filtered 48-Hour Vehicle Logs
  const filteredVehicleLogs = vehicleLogs.filter(l => {
    const matchesQuery = !logSearchQuery.trim() || l.vehicleNumber.toLowerCase().includes(logSearchQuery.toLowerCase()) || l.id.toLowerCase().includes(logSearchQuery.toLowerCase()) || l.gateId.toLowerCase().includes(logSearchQuery.toLowerCase());
    const matchesType = logTypeFilter === 'ALL' || l.eventType === logTypeFilter;
    const matchesLot = logLotFilter === 'ALL' || l.parkingLot.includes(logLotFilter);
    return matchesQuery && matchesType && matchesLot;
  });

  // AI ANPR Sensor Simulation Handler
  const handleSimulateAiDetection = eventType => {
    const samplePlates = ['DL-01-AB-8822', 'HR-26-CP-4400', 'UP-14-EV-1080', 'DL-03-CC-9911', 'MH-02-EE-3344', 'UK-07-ZZ-5050'];
    const randomPlate = samplePlates[Math.floor(Math.random() * samplePlates.length)];
    const lotObj = lots[0]; // MLCP T3
    const conf = (98.5 + Math.random() * 1.4).toFixed(1) + '%';
    const nowStr = new Date().toLocaleString() + ' IST';
    const logId = `ANPR-${Math.floor(1100 + Math.random() * 8900)}`;
    const newLogEntry = {
      id: logId,
      timestamp: nowStr,
      hoursAgo: 0.1,
      vehicleNumber: randomPlate,
      vehicleType: '4 Wheeler',
      parkingLot: lotObj.name,
      eventType,
      gateId: eventType === 'ENTRY' ? 'GATE-T3-ANPR-01' : 'GATE-T3-ANPR-02',
      cameraSensor: eventType === 'ENTRY' ? 'CAM-T3-ENTRY-01 (HD 4K AI)' : 'CAM-T3-EXIT-02 (HD 4K AI)',
      confidenceScore: conf,
      status: eventType === 'ENTRY' ? 'INSIDE' : 'LEFT'
    };

    // Update lots filled count
    const updatedLots = lots.map(l => {
      if (l.id === lotObj.id) {
        const delta = eventType === 'ENTRY' ? 1 : -1;
        const newFilled = Math.max(0, l.filled4w + delta);
        return {
          ...l,
          filled4w: newFilled
        };
      }
      return l;
    });
    setDb(prev => ({
      ...prev,
      parkingData: {
        ...prev.parkingData,
        lots: updatedLots,
        vehicleLogs: [newLogEntry, ...(prev.parkingData?.vehicleLogs || [])]
      }
    }));
    appendAuditLog('AI_ANPR_SENSOR_TRIGGER', `AI ANPR Camera detected vehicle ${eventType}: ${randomPlate} (Accuracy ${conf})`);
    addToast(`🤖 AI ANPR Sensor Detected ${eventType}: ${randomPlate} at ${lotObj.name}`, eventType === 'ENTRY' ? 'info' : 'success');
  };

  // Admin Telemetry Update Handler
  const handleSaveAdminLotEdit = e => {
    e.preventDefault();
    const updatedLots = lots.map(l => {
      if (l.id === selectedAdminLotId) {
        return {
          ...l,
          total4w: parseInt(adminLotEditForm.total4w),
          filled4w: parseInt(adminLotEditForm.filled4w),
          reserved4w: parseInt(adminLotEditForm.reserved4w),
          total2w: parseInt(adminLotEditForm.total2w),
          filled2w: parseInt(adminLotEditForm.filled2w),
          reserved2w: parseInt(adminLotEditForm.reserved2w),
          status: adminLotEditForm.status
        };
      }
      return l;
    });
    setDb(prev => ({
      ...prev,
      parkingData: {
        ...prev.parkingData,
        lots: updatedLots
      }
    }));
    appendAuditLog('ADMIN_PARKING_LOT_EDIT', `Admin manually updated parking telemetry for lot ID ${selectedAdminLotId}`);
    addToast(`💾 Parking Lot Telemetry updated cleanly by Admin!`, 'success');
  };

  // Admin Manual Log Entry Submit
  const handleManualLogSubmit = e => {
    e.preventDefault();
    if (!manualLogForm.vehicleNumber.trim()) {
      addToast('Please enter vehicle registration number', 'warning');
      return;
    }
    const nowStr = new Date().toLocaleString() + ' IST';
    const logId = `MANUAL-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLog = {
      id: logId,
      timestamp: nowStr,
      hoursAgo: 0.0,
      vehicleNumber: manualLogForm.vehicleNumber.toUpperCase(),
      vehicleType: manualLogForm.vehicleType,
      parkingLot: manualLogForm.parkingLot,
      eventType: manualLogForm.eventType,
      gateId: manualLogForm.gateId,
      cameraSensor: 'MANUAL_ADMIN_OVERRIDE',
      confidenceScore: '100% (Manual)',
      status: manualLogForm.eventType === 'ENTRY' ? 'INSIDE' : 'LEFT'
    };
    setDb(prev => ({
      ...prev,
      parkingData: {
        ...prev.parkingData,
        vehicleLogs: [newLog, ...(prev.parkingData?.vehicleLogs || [])]
      }
    }));
    appendAuditLog('ADMIN_MANUAL_VEHICLE_LOG', `Admin manually logged vehicle ${manualLogForm.eventType} for ${manualLogForm.vehicleNumber}`);
    addToast(`📝 Vehicle movement ${manualLogForm.eventType} logged manually by Admin!`, 'success');
    setManualLogForm({
      ...manualLogForm,
      vehicleNumber: ''
    });
  };
  const handleConfirmVerification = e => {
    e.preventDefault();
    if (!verifyModal || !verifyInput.trim()) return;
    const target = verifyModal.reservation;
    const inputClean = verifyInput.trim().toUpperCase().replace(/[\s-]/g, '');
    const mobileClean = (target.mobile || '').replace(/[\s-]/g, '');
    const vehClean = (target.vehicleNumber || '').toUpperCase().replace(/[\s-]/g, '');
    const idClean = (target.id || '').toUpperCase().replace(/[\s-]/g, '');
    const isMatch = inputClean.length >= 3 && (inputClean === mobileClean || inputClean === vehClean || inputClean === idClean);
    if (isMatch) {
      if (verifyModal.actionType === 'view') {
        setActivePassModal(target);
        addToast(`🔑 Identity Verified! Unlocked Pass ${target.id}`, 'success');
        appendAuditLog('STAFF_PASS_VERIFY_SUCCESS', `Staff/Admin verified identity for pass ${target.id} (${target.vehicleNumber})`);
      } else if (verifyModal.actionType === 'delete') {
        handleCancelReservation(target.id);
        addToast(`🔑 Identity Verified! Cancelled Pass ${target.id}`, 'warning');
        appendAuditLog('STAFF_PASS_DELETE_VERIFIED', `Staff/Admin verified & cancelled pass ${target.id}`);
      }
      setVerifyModal(null);
      setVerifyInput('');
      setVerifyError('');
    } else {
      setVerifyError('❌ Verification Failed: Entered Mobile Number or Vehicle Registration does not match record.');
      addToast('❌ Verification Failed: Passenger details do not match', 'danger');
    }
  };

  // Rate calculation helper
  const calculateEstimatedRate = () => {
    const is4w = resForm.vehicleType.includes('4');
    const hrs = parseInt(resForm.durationHours) || 4;
    if (hrs <= 1) return is4w ? 120 : 30;
    if (hrs <= 2) return is4w ? 250 : 60;
    if (hrs <= 4) return is4w ? 400 : 100;
    if (hrs <= 24) return is4w ? 600 : 200;
    const days = Math.ceil(hrs / 24);
    return days * (is4w ? 600 : 200);
  };
  const handleInitiateBooking = e => {
    e.preventDefault();
    if (!resForm.vehicleNumber.trim()) {
      addToast('Please enter your vehicle registration number', 'warning');
      return;
    }
    setShowPaymentModal(true);
  };
  const handleConfirmPayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setShowPaymentModal(false);
      const estimatedAmount = calculateEstimatedRate();
      const slotId = `Slot-${resForm.terminal}-${Math.floor(10 + Math.random() * 89)}`;
      const newReservation = {
        id: `RES-PRK-${Date.now().toString().slice(-4)}`,
        passengerName: resForm.passengerName || 'Airport Visitor',
        mobile: resForm.mobile || '+91 9876543210',
        vehicleType: resForm.vehicleType,
        vehicleNumber: resForm.vehicleNumber.toUpperCase(),
        terminal: resForm.terminal,
        parkingLot: resForm.parkingLot,
        startDate: resForm.startDate,
        durationHours: resForm.durationHours,
        slotNumber: `${resForm.terminal} Level ${Math.floor(1 + Math.random() * 4)} - ${slotId}`,
        amountPaid: estimatedAmount,
        paymentStatus: 'SUCCESS',
        paymentMode: paymentMethod === 'UPI' ? 'UPI (GPay/PhonePe)' : paymentMethod === 'FASTAG' ? 'FASTag Auto-Debit' : paymentMethod === 'CARD' ? 'Credit/Debit Card' : 'NetBanking',
        timestamp: new Date().toLocaleString() + ' IST',
        qrCode: `PASS-${resForm.terminal}-${resForm.vehicleNumber.toUpperCase()}`
      };

      // Also auto-add an ANPR Entry movement log
      const newLogEntry = {
        id: `ANPR-${Math.floor(2000 + Math.random() * 8000)}`,
        timestamp: new Date().toLocaleString() + ' IST',
        hoursAgo: 0.0,
        vehicleNumber: resForm.vehicleNumber.toUpperCase(),
        vehicleType: resForm.vehicleType,
        parkingLot: resForm.parkingLot,
        eventType: 'ENTRY',
        gateId: `GATE-${resForm.terminal}-ANPR-01`,
        cameraSensor: `CAM-${resForm.terminal}-ANPR (HD 4K)`,
        confidenceScore: '99.8%',
        status: 'INSIDE'
      };
      setDb(prev => ({
        ...prev,
        parkingData: {
          ...prev.parkingData,
          reservations: [newReservation, ...(prev.parkingData?.reservations || [])],
          vehicleLogs: [newLogEntry, ...(prev.parkingData?.vehicleLogs || [])]
        }
      }));
      appendAuditLog('PARKING_RESERVATION_CREATE', `Reserved slot ${newReservation.slotNumber} for ${newReservation.vehicleNumber} (₹${estimatedAmount})`);
      addToast(`🅿️ Parking Reserved & Paid! Slot: ${newReservation.slotNumber}`, 'success');
      setActivePassModal(newReservation);
      setResForm({
        passengerName: currentUser?.name || '',
        mobile: currentUser?.mobile || '',
        vehicleType: '4 Wheeler (Car / SUV)',
        vehicleNumber: '',
        terminal: 'T3',
        parkingLot: 'Multi-Level Car Parking (MLCP) - Terminal 3',
        startDate: new Date().toISOString().split('T')[0],
        durationHours: 4
      });
    }, 2000);
  };
  const handleCancelReservation = id => {
    setDb(prev => ({
      ...prev,
      parkingData: {
        ...prev.parkingData,
        reservations: prev.parkingData.reservations.filter(r => r.id !== id)
      }
    }));
    appendAuditLog('PARKING_RESERVATION_CANCEL', `Cancelled parking pass ${id}`);
    addToast(`Parking reservation ${id} cancelled`, 'warning');
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontWeight: 800,
      margin: 0
    }
  }, "\uD83C\uDD7F\uFE0F AI Smart Vehicle Parking \u2014 ", aptName, " (", aptCode, ")"), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-success",
    style: {
      fontSize: '0.7rem'
    }
  }, "\uD83E\uDD16 AI Computer Vision Sensors Active")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: 'var(--accent-cyan)',
      marginTop: '0.2rem'
    }
  }, "ANPR AI License Plate Sensors \u2022 48-Hour Vehicle Entry/Exit Logs \u2022 FASTag Auto Barrier System")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.4rem',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: `btn ${parkingTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setParkingTab('overview')
  }, "\uD83D\uDCCA Lots & Tariffs"), /*#__PURE__*/React.createElement("button", {
    className: `btn ${parkingTab === 'aiSensors' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setParkingTab('aiSensors')
  }, "\uD83E\uDD16 AI ANPR Sensors"), /*#__PURE__*/React.createElement("button", {
    className: `btn ${parkingTab === 'vehicleLogs' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setParkingTab('vehicleLogs')
  }, "\uD83D\uDCCB 48h Logs (", vehicleLogs.length, ")"), /*#__PURE__*/React.createElement("button", {
    className: `btn ${parkingTab === 'book' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setParkingTab('book')
  }, "\u2795 Reserve Slot"), /*#__PURE__*/React.createElement("button", {
    className: `btn ${parkingTab === 'myPasses' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setParkingTab('myPasses')
  }, "\uD83C\uDF9F\uFE0F Passes (", reservations.length, ")"), (isAdmin || isStaff) && /*#__PURE__*/React.createElement("button", {
    className: `btn ${parkingTab === 'adminEdit' ? 'btn-primary' : 'btn-secondary'}`,
    style: {
      background: parkingTab === 'adminEdit' ? 'linear-gradient(135deg, var(--accent-amber), #d97706)' : undefined,
      color: parkingTab === 'adminEdit' ? '#000' : 'var(--accent-amber)',
      fontWeight: 700
    },
    onClick: () => setParkingTab('adminEdit')
  }, "\u2699\uFE0F Admin Controls"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      flex: 1,
      minWidth: '150px',
      padding: '1rem',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.8rem',
      fontWeight: 800,
      color: 'var(--accent-emerald)'
    }
  }, totalAvailable4w.toLocaleString()), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)',
      marginTop: '0.2rem'
    }
  }, "\uD83D\uDE98 4W Free Slots")), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      flex: 1,
      minWidth: '150px',
      padding: '1rem',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.8rem',
      fontWeight: 800,
      color: 'var(--accent-cyan)'
    }
  }, totalAvailable2w.toLocaleString()), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)',
      marginTop: '0.2rem'
    }
  }, "\uD83D\uDEF5 2W Free Slots")), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      flex: 1,
      minWidth: '150px',
      padding: '1rem',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.8rem',
      fontWeight: 800,
      color: 'var(--accent-amber)'
    }
  }, totalEntries24h), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)',
      marginTop: '0.2rem'
    }
  }, "\uD83D\uDFE2 Entries (48h AI)")), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      flex: 1,
      minWidth: '150px',
      padding: '1rem',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.8rem',
      fontWeight: 800,
      color: 'var(--accent-rose)'
    }
  }, totalExits24h), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)',
      marginTop: '0.2rem'
    }
  }, "\uD83D\uDD34 Exits (48h AI)"))), parkingTab === 'overview' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginBottom: '1rem',
      color: 'var(--accent-cyan)'
    }
  }, "\uD83C\uDFE2 Terminal Parking Facilities & Live AI Availability"), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, lots.map(lot => {
    const avail4w = lot.total4w - lot.filled4w - lot.reserved4w;
    const pct4w = Math.round((lot.filled4w + lot.reserved4w) / lot.total4w * 100);
    return /*#__PURE__*/React.createElement("div", {
      key: lot.id,
      className: "glass-card",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        fontSize: '1.05rem',
        color: 'var(--accent-cyan)'
      }
    }, lot.name), /*#__PURE__*/React.createElement("span", {
      className: "badge badge-success"
    }, lot.status)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.8rem',
        color: 'var(--text-secondary)'
      }
    }, "Type: ", /*#__PURE__*/React.createElement("strong", null, lot.type)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.78rem',
        marginBottom: '0.25rem'
      }
    }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDE98 4-Wheeler Slots (Car / SUV):"), /*#__PURE__*/React.createElement("strong", null, avail4w, " / ", lot.total4w, " Free (", pct4w, "% Full)")), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        height: '8px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '4px',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${pct4w}%`,
        height: '100%',
        background: pct4w > 85 ? 'var(--accent-rose)' : pct4w > 65 ? 'var(--accent-amber)' : 'var(--accent-emerald)',
        transition: 'width 0.5s'
      }
    }))), lot.total2w > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.78rem',
        marginBottom: '0.25rem'
      }
    }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDEF5 2-Wheeler Slots (Scooter / Bike):"), /*#__PURE__*/React.createElement("strong", null, lot.total2w - lot.filled2w - lot.reserved2w, " / ", lot.total2w, " Free")), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        height: '6px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '3px',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${Math.round((lot.filled2w + lot.reserved2w) / lot.total2w * 100)}%`,
        height: '100%',
        background: 'var(--accent-cyan)'
      }
    }))), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-secondary",
      style: {
        marginTop: '0.5rem',
        justifyContent: 'center',
        fontSize: '0.8rem'
      },
      onClick: () => {
        setResForm({
          ...resForm,
          parkingLot: lot.name,
          terminal: lot.id.includes('T1') ? 'T1' : lot.id.includes('T2') ? 'T2' : 'T3'
        });
        setParkingTab('book');
      }
    }, "\uD83D\uDCCC Reserve Slot in ", lot.id));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginBottom: '1rem',
      color: 'var(--accent-amber)'
    }
  }, "\uD83C\uDFF7\uFE0F Official Airport Parking Tariff Charges"), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(0,0,0,0.2)',
      padding: '1rem',
      borderRadius: '8px',
      border: '1px solid var(--border-color)'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      color: 'var(--accent-cyan)',
      marginBottom: '0.75rem'
    }
  }, "\uD83D\uDE98 4-Wheeler Parking Charges (Car / SUV / EV)"), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      fontSize: '0.82rem'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: 'var(--text-secondary)',
      borderBottom: '1px solid var(--border-color)'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '0.5rem 0'
    }
  }, "Duration"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, "Tariff Rate (\u20B9)"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, "Category"))), /*#__PURE__*/React.createElement("tbody", null, rates.fourWheeler.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0.5rem 0'
    }
  }, r.duration), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right',
      fontWeight: 800,
      color: 'var(--accent-emerald)'
    }
  }, "\u20B9", r.rate), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right',
      color: 'var(--text-muted)',
      fontSize: '0.75rem'
    }
  }, r.label)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(0,0,0,0.2)',
      padding: '1rem',
      borderRadius: '8px',
      border: '1px solid var(--border-color)'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      color: 'var(--accent-cyan)',
      marginBottom: '0.75rem'
    }
  }, "\uD83D\uDEF5 2-Wheeler Parking Charges (Scooter / Bike)"), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      fontSize: '0.82rem'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: 'var(--text-secondary)',
      borderBottom: '1px solid var(--border-color)'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '0.5rem 0'
    }
  }, "Duration"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, "Tariff Rate (\u20B9)"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, "Category"))), /*#__PURE__*/React.createElement("tbody", null, rates.twoWheeler.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0.5rem 0'
    }
  }, r.duration), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right',
      fontWeight: 800,
      color: 'var(--accent-emerald)'
    }
  }, "\u20B9", r.rate), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right',
      color: 'var(--text-muted)',
      fontSize: '0.75rem'
    }
  }, r.label))))))))), parkingTab === 'aiSensors' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      border: '2px solid var(--accent-cyan)',
      background: 'rgba(0,242,254,0.04)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.6rem'
    }
  }, "\uD83E\uDD16"), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)',
      margin: 0
    }
  }, "AI Computer Vision ANPR Sensor Integration")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: 'var(--text-secondary)',
      marginTop: '0.3rem'
    }
  }, "Automated Optical Character Recognition (ANPR) scanning license plates & vehicle movement in real time.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      fontSize: '0.8rem',
      background: 'linear-gradient(135deg, var(--accent-emerald), #059669)'
    },
    onClick: () => handleSimulateAiDetection('ENTRY')
  }, "\u26A1 Simulate AI Vehicle ENTRY"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      fontSize: '0.8rem',
      background: 'linear-gradient(135deg, var(--accent-rose), #e11d48)'
    },
    onClick: () => handleSimulateAiDetection('EXIT')
  }, "\u26A1 Simulate AI Vehicle EXIT")))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      background: '#000',
      border: '1px solid var(--accent-cyan)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      paddingBottom: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--accent-cyan)',
      fontSize: '0.85rem'
    }
  }, "\uD83D\uDCF7 ANPR CAM-01: Terminal 3 Entry Barrier"), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-success",
    style: {
      fontSize: '0.62rem'
    }
  }, "\uD83D\uDD34 LIVE 60 FPS")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '160px',
      borderRadius: '6px',
      background: 'radial-gradient(circle, rgba(0,242,254,0.15) 0%, rgba(0,0,0,0.9) 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px dashed var(--accent-cyan)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px solid var(--accent-emerald)',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      background: 'rgba(0,0,0,0.8)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.65rem',
      color: 'var(--accent-emerald)'
    }
  }, "[ANPR OCR BOUNDING BOX MATCH]"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.2rem',
      fontFamily: 'var(--font-mono)',
      fontWeight: 800,
      color: '#fff',
      letterSpacing: '2px'
    }
  }, "DL-01-AB-1234")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '0.5rem',
      left: '0.75rem',
      fontSize: '0.7rem',
      color: 'var(--accent-cyan)'
    }
  }, "Confidence Score: ", /*#__PURE__*/React.createElement("strong", null, "99.4%"), " \u2022 OCR Latency: ", /*#__PURE__*/React.createElement("strong", null, "14ms")))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      background: '#000',
      border: '1px solid var(--accent-amber)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      paddingBottom: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--accent-amber)',
      fontSize: '0.85rem'
    }
  }, "\uD83D\uDCF7 ANPR CAM-02: Terminal 3 Exit Barrier"), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-success",
    style: {
      fontSize: '0.62rem'
    }
  }, "\uD83D\uDD34 LIVE 60 FPS")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '160px',
      borderRadius: '6px',
      background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(0,0,0,0.9) 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px dashed var(--accent-amber)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px solid var(--accent-amber)',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      background: 'rgba(0,0,0,0.8)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.65rem',
      color: 'var(--accent-amber)'
    }
  }, "[ANPR OCR BOUNDING BOX MATCH]"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.2rem',
      fontFamily: 'var(--font-mono)',
      fontWeight: 800,
      color: '#fff',
      letterSpacing: '2px'
    }
  }, "HR-26-DQ-5511")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '0.5rem',
      left: '0.75rem',
      fontSize: '0.7rem',
      color: 'var(--accent-amber)'
    }
  }, "Confidence Score: ", /*#__PURE__*/React.createElement("strong", null, "98.9%"), " \u2022 OCR Latency: ", /*#__PURE__*/React.createElement("strong", null, "18ms"))))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)',
      marginBottom: '0.75rem'
    }
  }, "\u26A1 Live AI Sensor Detection Stream"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }
  }, vehicleLogs.slice(0, 5).map(log => /*#__PURE__*/React.createElement("div", {
    key: log.id,
    style: {
      padding: '0.75rem',
      borderRadius: '8px',
      background: 'rgba(0,0,0,0.2)',
      border: '1px solid var(--border-color)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.3rem'
    }
  }, log.eventType === 'ENTRY' ? '🟢' : '🔴'), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '0.9rem',
      color: 'var(--accent-cyan)'
    }
  }, log.vehicleNumber), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-secondary)'
    }
  }, log.parkingLot, " \u2022 Gate: ", log.gateId))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: `badge ${log.eventType === 'ENTRY' ? 'badge-success' : 'badge-danger'}`
  }, log.eventType), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.68rem',
      color: 'var(--text-muted)',
      marginTop: '0.2rem'
    }
  }, "AI Acc: ", log.confidenceScore, " \u2022 ", log.timestamp))))))), parkingTab === 'vehicleLogs' && /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-amber)',
      margin: 0
    }
  }, "\uD83D\uDCCB 48-Hour Vehicle Entry & Exit Movement Logs"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)',
      marginTop: '0.2rem'
    }
  }, "Complete AI ANPR sensor audit trail for all vehicles entering & leaving airport facilities over the last 48 hours.")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.78rem'
    },
    onClick: () => window.print()
  }, "\uD83D\uDDA8\uFE0F Export / Print Movement Log Report")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap',
      marginBottom: '1rem',
      background: 'rgba(0,0,0,0.2)',
      padding: '0.75rem',
      borderRadius: '8px',
      border: '1px solid var(--border-color)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 2,
      minWidth: '200px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "\uD83D\uDD0D Search Vehicle Reg Number (e.g. DL-01) or ANPR ID...",
    value: logSearchQuery,
    onChange: e => setLogSearchQuery(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: '130px'
    }
  }, /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: logTypeFilter,
    onChange: e => setLogTypeFilter(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: "ALL"
  }, "All Events (Entry + Exit)"), /*#__PURE__*/React.createElement("option", {
    value: "ENTRY"
  }, "\uD83D\uDFE2 ENTRY Only"), /*#__PURE__*/React.createElement("option", {
    value: "EXIT"
  }, "\uD83D\uDD34 EXIT Only"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: '150px'
    }
  }, /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: logLotFilter,
    onChange: e => setLogLotFilter(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: "ALL"
  }, "All Facilities"), /*#__PURE__*/React.createElement("option", {
    value: "Terminal 3"
  }, "Terminal 3 MLCP"), /*#__PURE__*/React.createElement("option", {
    value: "Terminal 1"
  }, "Terminal 1 Surface"), /*#__PURE__*/React.createElement("option", {
    value: "Terminal 2"
  }, "Terminal 2 Express"), /*#__PURE__*/React.createElement("option", {
    value: "Valet"
  }, "VIP Valet")))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      fontSize: '0.82rem',
      borderCollapse: 'collapse',
      minWidth: '750px'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '2px solid var(--border-color)',
      color: 'var(--text-secondary)',
      fontSize: '0.75rem',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '0.75rem'
    }
  }, "Log ID"), /*#__PURE__*/React.createElement("th", null, "Timestamp (48h)"), /*#__PURE__*/React.createElement("th", null, "Event Type"), /*#__PURE__*/React.createElement("th", null, "Vehicle Reg Number"), /*#__PURE__*/React.createElement("th", null, "Type"), /*#__PURE__*/React.createElement("th", null, "Parking Facility & Gate"), /*#__PURE__*/React.createElement("th", null, "AI Sensor / Accuracy"), /*#__PURE__*/React.createElement("th", null, "Status"))), /*#__PURE__*/React.createElement("tbody", null, filteredVehicleLogs.map(log => /*#__PURE__*/React.createElement("tr", {
    key: log.id,
    style: {
      borderBottom: '1px solid rgba(255,255,255,0.04)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0.75rem',
      fontFamily: 'var(--font-mono)',
      color: 'var(--accent-cyan)',
      fontWeight: 700
    }
  }, log.id), /*#__PURE__*/React.createElement("td", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: '0.75rem'
    }
  }, log.timestamp), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `badge ${log.eventType === 'ENTRY' ? 'badge-success' : 'badge-danger'}`,
    style: {
      fontWeight: 800
    }
  }, log.eventType === 'ENTRY' ? '🟢 ENTRY' : '🔴 EXIT')), /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 800,
      fontFamily: 'var(--font-mono)',
      fontSize: '0.9rem',
      color: 'var(--accent-cyan)'
    }
  }, log.vehicleNumber), /*#__PURE__*/React.createElement("td", null, log.vehicleType), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600
    }
  }, log.parkingLot), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.7rem',
      color: 'var(--text-muted)'
    }
  }, "Gate: ", log.gateId)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--accent-emerald)'
    }
  }, log.confidenceScore), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.68rem',
      color: 'var(--text-muted)'
    }
  }, log.cameraSensor)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "badge badge-warning",
    style: {
      fontSize: '0.65rem'
    }
  }, log.status)))))), filteredVehicleLogs.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '2.5rem',
      color: 'var(--text-muted)'
    }
  }, "No vehicle movement logs found matching search filter."))), parkingTab === 'book' && /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      maxWidth: '650px',
      margin: '0 auto',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)',
      marginBottom: '0.5rem'
    }
  }, "\uD83C\uDF9F\uFE0F Reserve Airport Parking Slot in Advance"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: '0.85rem',
      marginBottom: '1.25rem'
    }
  }, "Guarantee your vehicle parking spot prior to arrival. Includes automated FASTag gate access & digital pass."), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleInitiateBooking,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.85rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Full Name"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "e.g. Rajesh Sharma",
    value: resForm.passengerName,
    onChange: e => setResForm({
      ...resForm,
      passengerName: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Mobile Number (for SMS Pass)"), /*#__PURE__*/React.createElement("input", {
    required: true,
    type: "tel",
    className: "form-input",
    placeholder: "+91 9876543210",
    value: resForm.mobile,
    onChange: e => setResForm({
      ...resForm,
      mobile: e.target.value
    })
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.85rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Vehicle Category"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: resForm.vehicleType,
    onChange: e => setResForm({
      ...resForm,
      vehicleType: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", null, "4 Wheeler (Car / SUV)"), /*#__PURE__*/React.createElement("option", null, "2 Wheeler (Scooter / Bike)"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Vehicle Number Plate"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "e.g. DL-01-AB-1234",
    value: resForm.vehicleNumber,
    onChange: e => setResForm({
      ...resForm,
      vehicleNumber: e.target.value
    }),
    style: {
      textTransform: 'uppercase'
    }
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Select Parking Facility"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: resForm.parkingLot,
    onChange: e => {
      const lotName = e.target.value;
      const term = lotName.includes('T1') ? 'T1' : lotName.includes('T2') ? 'T2' : 'T3';
      setResForm({
        ...resForm,
        parkingLot: lotName,
        terminal: term
      });
    }
  }, lots.map(l => /*#__PURE__*/React.createElement("option", {
    key: l.id,
    value: l.name
  }, l.name, " (", l.type, ")")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.85rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Parking Start Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    required: true,
    className: "form-input",
    value: resForm.startDate,
    onChange: e => setResForm({
      ...resForm,
      startDate: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Duration (Hours)"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: resForm.durationHours,
    onChange: e => setResForm({
      ...resForm,
      durationHours: parseInt(e.target.value)
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: 1
  }, "1 Hour (\u20B9", resForm.vehicleType.includes('4') ? '120' : '30', ")"), /*#__PURE__*/React.createElement("option", {
    value: 2
  }, "2 Hours (\u20B9", resForm.vehicleType.includes('4') ? '250' : '60', ")"), /*#__PURE__*/React.createElement("option", {
    value: 4
  }, "4 Hours (\u20B9", resForm.vehicleType.includes('4') ? '400' : '100', ")"), /*#__PURE__*/React.createElement("option", {
    value: 12
  }, "12 Hours (\u20B9", resForm.vehicleType.includes('4') ? '500' : '150', ")"), /*#__PURE__*/React.createElement("option", {
    value: 24
  }, "24 Hours Full Day (\u20B9", resForm.vehicleType.includes('4') ? '600' : '200', ")"), /*#__PURE__*/React.createElement("option", {
    value: 48
  }, "48 Hours (2 Days) (\u20B9", resForm.vehicleType.includes('4') ? '1,200' : '400', ")")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(0,242,254,0.08)',
      padding: '1rem',
      borderRadius: '8px',
      border: '1px solid rgba(0,242,254,0.25)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-secondary)'
    }
  }, "Estimated Tariff Rate:"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.4rem',
      fontWeight: 800,
      color: 'var(--accent-emerald)'
    }
  }, "\u20B9", calculateEstimatedRate())), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-muted)',
      textAlign: 'right'
    }
  }, "Includes 18% GST & FASTag Gate Clearance Pass")), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      padding: '0.8rem',
      fontSize: '0.95rem',
      fontWeight: 800
    }
  }, "\uD83D\uDCB3 Proceed to Pay \u20B9", calculateEstimatedRate(), " & Reserve Slot"))), parkingTab === 'myPasses' && /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginBottom: '1rem',
      color: 'var(--accent-cyan)'
    }
  }, "\uD83C\uDF9F\uFE0F Digital Airport Parking Passes (", reservations.length, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      fontSize: '0.82rem',
      borderCollapse: 'collapse',
      minWidth: '700px'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '2px solid var(--border-color)',
      color: 'var(--text-secondary)',
      fontSize: '0.75rem',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '0.75rem'
    }
  }, "Pass ID"), /*#__PURE__*/React.createElement("th", null, "Vehicle Number"), /*#__PURE__*/React.createElement("th", null, "Category"), /*#__PURE__*/React.createElement("th", null, "Facility & Slot"), /*#__PURE__*/React.createElement("th", null, "Duration"), /*#__PURE__*/React.createElement("th", null, "Amount"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'center'
    }
  }, isAdmin || isStaff ? 'Actions (Identity Verified)' : 'Access Level'))), /*#__PURE__*/React.createElement("tbody", null, reservations.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.id,
    style: {
      borderBottom: '1px solid rgba(255,255,255,0.04)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0.75rem',
      fontFamily: 'var(--font-mono)',
      color: 'var(--accent-cyan)',
      fontWeight: 700
    }
  }, r.id), /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 800,
      fontFamily: 'var(--font-mono)'
    }
  }, r.vehicleNumber), /*#__PURE__*/React.createElement("td", null, r.vehicleType), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600
    }
  }, r.parkingLot), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--accent-emerald)'
    }
  }, "Allocated: ", r.slotNumber)), /*#__PURE__*/React.createElement("td", null, r.durationHours, " Hours"), /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 800,
      color: 'var(--accent-emerald)'
    }
  }, "\u20B9", r.amountPaid), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "badge badge-success"
  }, r.paymentStatus)), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'center'
    }
  }, isAdmin || isStaff ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.3rem',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.5rem',
      color: 'var(--accent-cyan)'
    },
    onClick: () => {
      setVerifyModal({
        reservation: r,
        actionType: 'view'
      });
      setVerifyInput('');
      setVerifyError('');
    }
  }, "\uD83D\uDC41\uFE0F View Pass"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.5rem',
      color: 'var(--accent-rose)'
    },
    onClick: () => {
      setVerifyModal({
        reservation: r,
        actionType: 'delete'
      });
      setVerifyInput('');
      setVerifyError('');
    }
  }, "\uD83D\uDDD1\uFE0F")) : /*#__PURE__*/React.createElement("span", {
    className: "badge badge-warning",
    style: {
      fontSize: '0.65rem'
    }
  }, "\uD83D\uDD12 Staff/Admin Only")))))), reservations.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '2.5rem',
      color: 'var(--text-muted)'
    }
  }, "No parking reservations found. Click \"+ Reserve Parking Slot\" to book your parking spot!"))), parkingTab === 'adminEdit' && (isAdmin || isStaff) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card",
    style: {
      border: '2px solid var(--accent-amber)',
      background: 'rgba(245,158,11,0.06)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.5rem'
    }
  }, "\u2699\uFE0F"), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-amber)',
      margin: 0
    }
  }, "Admin Manual Control & Sensor Calibration Panel")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: 'var(--text-secondary)',
      marginTop: '0.3rem'
    }
  }, "Authorized Admin Override for modifying slot telemetry, calibrating AI sensors, and manually logging vehicle movements.")), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-warning",
    style: {
      fontWeight: 800
    }
  }, "\u26A1 ADMIN PRIVILEGES GRANTED"))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)',
      marginBottom: '1rem'
    }
  }, "\uD83D\uDEE0\uFE0F Modify Parking Lot Telemetry"), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveAdminLotEdit,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Select Parking Facility to Edit"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: selectedAdminLotId,
    onChange: e => setSelectedAdminLotId(e.target.value)
  }, lots.map(l => /*#__PURE__*/React.createElement("option", {
    key: l.id,
    value: l.id
  }, l.name, " (", l.type, ")")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-secondary)'
    }
  }, "Total 4W Capacity"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    required: true,
    className: "form-input",
    value: adminLotEditForm.total4w,
    onChange: e => setAdminLotEditForm({
      ...adminLotEditForm,
      total4w: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-secondary)'
    }
  }, "Filled 4W Slots"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    required: true,
    className: "form-input",
    value: adminLotEditForm.filled4w,
    onChange: e => setAdminLotEditForm({
      ...adminLotEditForm,
      filled4w: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-secondary)'
    }
  }, "Reserved 4W Slots"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    required: true,
    className: "form-input",
    value: adminLotEditForm.reserved4w,
    onChange: e => setAdminLotEditForm({
      ...adminLotEditForm,
      reserved4w: e.target.value
    })
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-secondary)'
    }
  }, "Total 2W Capacity"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    required: true,
    className: "form-input",
    value: adminLotEditForm.total2w,
    onChange: e => setAdminLotEditForm({
      ...adminLotEditForm,
      total2w: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-secondary)'
    }
  }, "Filled 2W Slots"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    required: true,
    className: "form-input",
    value: adminLotEditForm.filled2w,
    onChange: e => setAdminLotEditForm({
      ...adminLotEditForm,
      filled2w: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-secondary)'
    }
  }, "Reserved 2W Slots"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    required: true,
    className: "form-input",
    value: adminLotEditForm.reserved2w,
    onChange: e => setAdminLotEditForm({
      ...adminLotEditForm,
      reserved2w: e.target.value
    })
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Facility Status"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: adminLotEditForm.status,
    onChange: e => setAdminLotEditForm({
      ...adminLotEditForm,
      status: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: "OPEN"
  }, "\uD83D\uDFE2 OPEN (Operational)"), /*#__PURE__*/React.createElement("option", {
    value: "FULL"
  }, "\uD83D\uDD34 FULL (Occupied)"), /*#__PURE__*/React.createElement("option", {
    value: "MAINTENANCE"
  }, "\uD83D\uDFE1 MAINTENANCE (Closed)"))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      padding: '0.8rem',
      background: 'linear-gradient(135deg, var(--accent-amber), #d97706)',
      color: '#000',
      fontWeight: 800
    }
  }, "\uD83D\uDCBE Save Parking Lot Telemetry Overrides"))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-amber)',
      marginBottom: '1rem'
    }
  }, "\u270D\uFE0F Manual Vehicle Entry / Exit Logger"), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleManualLogSubmit,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Vehicle Registration Number"), /*#__PURE__*/React.createElement("input", {
    required: true,
    className: "form-input",
    placeholder: "e.g. DL-01-AB-1234",
    value: manualLogForm.vehicleNumber,
    onChange: e => setManualLogForm({
      ...manualLogForm,
      vehicleNumber: e.target.value
    }),
    style: {
      textTransform: 'uppercase'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.85rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Movement Type"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: manualLogForm.eventType,
    onChange: e => setManualLogForm({
      ...manualLogForm,
      eventType: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: "ENTRY"
  }, "\uD83D\uDFE2 ENTRY (Vehicle In)"), /*#__PURE__*/React.createElement("option", {
    value: "EXIT"
  }, "\uD83D\uDD34 EXIT (Vehicle Out)"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Vehicle Type"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: manualLogForm.vehicleType,
    onChange: e => setManualLogForm({
      ...manualLogForm,
      vehicleType: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: "4 Wheeler"
  }, "4 Wheeler (Car / SUV)"), /*#__PURE__*/React.createElement("option", {
    value: "2 Wheeler"
  }, "2 Wheeler (Bike / Scooter)")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)'
    }
  }, "Parking Facility & Gate"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: manualLogForm.parkingLot,
    onChange: e => setManualLogForm({
      ...manualLogForm,
      parkingLot: e.target.value
    })
  }, lots.map(l => /*#__PURE__*/React.createElement("option", {
    key: l.id,
    value: l.name
  }, l.name)))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      padding: '0.8rem',
      fontWeight: 800
    }
  }, "\uD83D\uDCDD Manually Log Movement & Recalculate Slots"))))), showPaymentModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) setShowPaymentModal(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '480px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      borderBottom: '1px solid var(--border-color)',
      paddingBottom: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)'
    }
  }, "\uD83D\uDCB3 AAI Airport Payment Gateway"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setShowPaymentModal(false)
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(0,0,0,0.25)',
      padding: '0.85rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      fontSize: '0.82rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.3rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Vehicle Reg:"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, resForm.vehicleNumber.toUpperCase())), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Facility:"), /*#__PURE__*/React.createElement("strong", null, resForm.parkingLot)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Duration & Rate:"), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--accent-emerald)',
      fontSize: '1rem'
    }
  }, "\u20B9", calculateEstimatedRate()))), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: '0.85rem',
      color: 'var(--text-secondary)',
      marginBottom: '0.5rem'
    }
  }, "Select Payment Method:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem',
      marginBottom: '1.25rem'
    }
  }, [{
    id: 'UPI',
    label: '📱 UPI (GPay/PhonePe)',
    icon: '⚡'
  }, {
    id: 'FASTAG',
    label: '🚘 FASTag Auto-Debit',
    icon: '🚙'
  }, {
    id: 'CARD',
    label: '💳 Credit / Debit Card',
    icon: '💳'
  }, {
    id: 'NETBANKING',
    label: '🏦 Net Banking',
    icon: '🏛️'
  }].map(m => /*#__PURE__*/React.createElement("button", {
    key: m.id,
    type: "button",
    className: `btn ${paymentMethod === m.id ? 'btn-primary' : 'btn-secondary'}`,
    style: {
      padding: '0.6rem',
      fontSize: '0.75rem',
      justifyContent: 'center'
    },
    onClick: () => setPaymentMethod(m.id)
  }, /*#__PURE__*/React.createElement("span", null, m.icon), " ", m.label))), paymentMethod === 'UPI' && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "Enter Virtual Payment Address (e.g. user@okicici)",
    defaultValue: "passenger@gpay"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.68rem',
      color: 'var(--text-muted)',
      marginTop: '0.25rem'
    }
  }, "*You will receive an instant UPI collect mandate on your app.*")), paymentMethod === 'FASTAG' && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '1rem',
      background: 'rgba(16,185,129,0.08)',
      padding: '0.75rem',
      borderRadius: '6px',
      border: '1px solid rgba(16,185,129,0.25)',
      fontSize: '0.78rem'
    }
  }, "\uD83D\uDE98 FASTag tag linked to ", /*#__PURE__*/React.createElement("strong", null, resForm.vehicleNumber.toUpperCase() || 'DL-01-AB-1234'), " will be automatically debited at airport exit barrier."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      width: '100%',
      padding: '0.75rem',
      fontWeight: 800,
      fontSize: '0.9rem'
    },
    onClick: handleConfirmPayment,
    disabled: paymentProcessing
  }, paymentProcessing ? '⏳ Processing Payment...' : `✅ Pay ₹${calculateEstimatedRate()} Now`))), activePassModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) setActivePassModal(null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '440px',
      background: 'var(--bg-main)',
      border: '2px solid var(--accent-cyan)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      borderBottom: '1px dashed var(--border-color)',
      paddingBottom: '0.75rem',
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '2rem',
      marginBottom: '0.2rem'
    }
  }, "\uD83C\uDD7F\uFE0F"), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-cyan)',
      margin: 0
    }
  }, "OFFICIAL AIRPORT PARKING PASS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)',
      marginTop: '0.2rem'
    }
  }, activeAirport?.name || 'Indira Gandhi International Airport', " (", activeAirport?.code || 'DEL', ")")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.6rem',
      fontSize: '0.85rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Pass Reference ID:"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: 'var(--accent-amber)'
    }
  }, activePassModal.id)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Vehicle Number:"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '1rem',
      color: 'var(--accent-cyan)'
    }
  }, activePassModal.vehicleNumber)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Allocated Slot:"), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--accent-emerald)',
      fontSize: '0.95rem'
    }
  }, activePassModal.slotNumber)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Facility:"), /*#__PURE__*/React.createElement("strong", null, activePassModal.parkingLot)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Amount Paid:"), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--accent-emerald)'
    }
  }, "\u20B9", activePassModal.amountPaid))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      color: '#000',
      padding: '1rem',
      borderRadius: '8px',
      marginTop: '1.25rem',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      fontWeight: 800,
      letterSpacing: '2px',
      marginBottom: '0.3rem'
    }
  }, "||| | |||| | ||| |||| | |||"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.7rem',
      fontFamily: 'monospace',
      fontWeight: 700
    }
  }, activePassModal.qrCode || 'PASS-' + Math.random().toString(36).substr(2, 9).toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.65rem',
      color: '#555',
      marginTop: '0.3rem'
    }
  }, "*Scan this QR / FASTag barcode at airport parking boom barrier*")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: '1.25rem'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 1,
      justifyContent: 'center'
    },
    onClick: () => {
      window.print();
    }
  }, "\uD83D\uDDA8\uFE0F Print / Download Pass"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setActivePassModal(null)
  }, "\u2715 Close")))), verifyModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target.className.includes('modal-overlay')) {
        setVerifyModal(null);
        setVerifyInput('');
        setVerifyError('');
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    style: {
      maxWidth: '440px',
      border: '2px solid var(--accent-amber)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      borderBottom: '1px solid var(--border-color)',
      paddingBottom: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--accent-amber)',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem'
    }
  }, "\uD83D\uDD12 Identity Verification Required"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => {
      setVerifyModal(null);
      setVerifyInput('');
      setVerifyError('');
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(245,158,11,0.08)',
      padding: '0.85rem',
      borderRadius: '8px',
      border: '1px solid rgba(245,158,11,0.25)',
      marginBottom: '1rem',
      fontSize: '0.82rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      marginBottom: '0.3rem'
    }
  }, "Target Pass ID: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--accent-cyan)',
      fontFamily: 'var(--font-mono)'
    }
  }, verifyModal.reservation.id)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Action Requested: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: verifyModal.actionType === 'delete' ? 'var(--accent-rose)' : 'var(--accent-emerald)'
    }
  }, verifyModal.actionType === 'delete' ? '🗑️ Cancel Parking Reservation' : '👁️ Unlock & View Digital Pass'))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleConfirmVerification,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-secondary)',
      display: 'block',
      marginBottom: '0.3rem'
    }
  }, "Enter Passenger's Mobile Number or Vehicle Reg. Number:"), /*#__PURE__*/React.createElement("input", {
    required: true,
    autoFocus: true,
    className: "form-input",
    placeholder: "e.g. +91 9876543210 or DL-01-AB-1234",
    value: verifyInput,
    onChange: e => {
      setVerifyInput(e.target.value);
      setVerifyError('');
    },
    style: {
      textTransform: 'uppercase'
    }
  }), verifyError && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--accent-rose)',
      fontSize: '0.75rem',
      marginTop: '0.4rem',
      fontWeight: 600
    }
  }, verifyError)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)'
    }
  }, "*Security mandate: Staff and Admins must verify passenger identity against registered records before inspecting or deleting passes.*"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      flex: 1,
      background: 'linear-gradient(135deg, var(--accent-amber), #d97706)',
      color: '#000',
      fontWeight: 800,
      justifyContent: 'center'
    }
  }, "\uD83D\uDD10 Verify Identity & ", verifyModal.actionType === 'delete' ? 'Delete' : 'Unlock'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    onClick: () => {
      setVerifyModal(null);
      setVerifyInput('');
      setVerifyError('');
    }
  }, "Cancel"))))));
}
function OlaCabBookingView({
  db,
  setDb,
  currentUser,
  isAdmin,
  isStaff,
  addToast,
  appendAuditLog,
  activeAirport
}) {
  const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
  const aptCode = activeAirport?.code || 'DEL';

  const AIRPORT_LOCATION_DATA = {
    DEL: {
      city: "Delhi NCR",
      pickups: [
        "Terminal 3 - Arrival Gate 4 (MLCP Taxi Hub)",
        "Terminal 3 - Executive Canopy Zone",
        "Terminal 1D - Arrivals Taxi Bay",
        "Terminal 2 - Forecourt Cab Zone"
      ],
      destinations: [
        { name: "Aerocity Hotels & Hospitality District", km: 3.5, mins: 10 },
        { name: "Dwarka Sector 21 Metro Station", km: 7.8, mins: 18 },
        { name: "Vasant Kunj / Saket Mall District", km: 12.4, mins: 25 },
        { name: "DLF Cyber City, Gurugram", km: 13.5, mins: 22 },
        { name: "Connaught Place, Central Delhi", km: 16.8, mins: 32 },
        { name: "New Delhi Railway Station (NDLS)", km: 18.5, mins: 38 },
        { name: "Old Delhi Railway Station (DLI)", km: 21.2, mins: 45 },
        { name: "ISBT Kashmiri Gate Bus Terminal", km: 24.6, mins: 50 },
        { name: "Noida Sector 62 / Electronic City", km: 34.5, mins: 55 },
        { name: "Greater Noida Pari Chowk", km: 52.0, mins: 70 },
        { name: "Faridabad NIT / Badarpur Border", km: 36.8, mins: 60 }
      ]
    },
    BOM: {
      city: "Mumbai",
      pickups: [
        "Terminal 2 (T2) - Arrival Gate 7 Cab Zone",
        "Terminal 2 (T2) - Level P10 Taxi Hub",
        "Terminal 1 (T1) - Domestic Arrivals Forecourt"
      ],
      destinations: [
        { name: "Bandra Kurla Complex (BKC) Financial Hub", km: 7.2, mins: 20 },
        { name: "Juhu Beach & Marine Drive Hotels", km: 8.5, mins: 22 },
        { name: "Andheri East MIDC / SEEPZ", km: 4.8, mins: 15 },
        { name: "Powai Hiranandani Gardens", km: 9.1, mins: 25 },
        { name: "Lower Parel High Street Phoenix", km: 14.6, mins: 35 },
        { name: "Marine Drive / Nariman Point, South Mumbai", km: 24.8, mins: 50 },
        { name: "Thane West Majiwada Junction", km: 22.5, mins: 45 },
        { name: "Navi Mumbai Vashi Station", km: 21.4, mins: 42 }
      ]
    },
    BLR: {
      city: "Bengaluru",
      pickups: [
        "Terminal 1 - Arrival Curb Taxi Stand 2",
        "Terminal 2 - Garden City Canopy Zone"
      ],
      destinations: [
        { name: "Hebbal Flyover & Manyata Tech Park", km: 26.5, mins: 40 },
        { name: "MG Road / Brigade Road, Central Bengaluru", km: 34.8, mins: 55 },
        { name: "Indiranagar 100 Feet Road", km: 38.2, mins: 60 },
        { name: "Koramangala 80 Feet Road Hub", km: 41.5, mins: 65 },
        { name: "Electronic City Phase 1 IT Park", km: 54.2, mins: 80 },
        { name: "Whitefield ITPL Main Road", km: 43.8, mins: 70 },
        { name: "Bengaluru City Railway Station (SBC)", km: 35.6, mins: 58 }
      ]
    },
    MAA: {
      city: "Chennai",
      pickups: [
        "International Terminal T2 Arrivals Forecourt",
        "Domestic Terminal T1 Multi-Level Car Parking"
      ],
      destinations: [
        { name: "Guindy Industrial Estate & Olympia Tech Park", km: 4.5, mins: 12 },
        { name: "T. Nagar Shopping Hub & Pondy Bazaar", km: 11.8, mins: 28 },
        { name: "Anna Nagar West Bus Depot", km: 16.2, mins: 35 },
        { name: "Marina Beach & Santhome High Road", km: 17.5, mins: 40 },
        { name: "Chennai Central Railway Station (MAS)", km: 19.8, mins: 45 },
        { name: "OMR IT Corridor, Thoraipakkam", km: 14.2, mins: 30 }
      ]
    },
    HYD: {
      city: "Hyderabad",
      pickups: [
        "RGI Arrivals Ramp - Gate 3 Cab Hub",
        "RGI Car Park Level 1 Taxi Canopy"
      ],
      destinations: [
        { name: "Gachibowli Financial District IT Hub", km: 28.4, mins: 35 },
        { name: "HITECH City Cyber Towers", km: 32.8, mins: 42 },
        { name: "Banjara Hills Road No 1", km: 29.5, mins: 38 },
        { name: "Jubilee Hills Checkpost", km: 33.2, mins: 45 },
        { name: "Secunderabad Railway Station", km: 36.4, mins: 52 },
        { name: "Charminar & Old City Heritage Zone", km: 18.2, mins: 30 }
      ]
    },
    CCU: {
      city: "Kolkata",
      pickups: [
        "Arrivals Gate 3 OLA App Cab Zone",
        "Domestic Terminal Canopy Walkway"
      ],
      destinations: [
        { name: "New Town Eco Park & Financial Hub", km: 9.5, mins: 20 },
        { name: "Salt Lake Sector V IT Hub", km: 13.8, mins: 28 },
        { name: "Park Street & Esplanade Central", km: 16.4, mins: 38 },
        { name: "Howrah Railway Station", km: 18.2, mins: 45 },
        { name: "Ballygunge Phari / South Kolkata", km: 21.5, mins: 50 }
      ]
    }
  };

  const activeData = AIRPORT_LOCATION_DATA[aptCode] || AIRPORT_LOCATION_DATA.DEL;
  const pickupPoints = activeData.pickups;
  const popularDestinations = activeData.destinations;

  const [pickupPoint, setPickupPoint] = useState(pickupPoints[0]);
  const [dropLocation, setDropLocation] = useState(popularDestinations[0].name);
  const [selectedCategory, setSelectedCategory] = useState('Ola Sedan');

  useEffect(() => {
    if (pickupPoints && pickupPoints.length > 0) {
      setPickupPoint(pickupPoints[0]);
    }
    if (popularDestinations && popularDestinations.length > 0) {
      setDropLocation(popularDestinations[0].name);
    }
  }, [aptCode]);

  // Calculate distance in KM dynamically based on destination string
  const calculateDistanceKm = (locationStr) => {
    if (!locationStr || !locationStr.trim()) return 10.0;
    const query = locationStr.toLowerCase().trim();

    // Match known preset destinations
    const matched = popularDestinations.find(d => 
      query.includes(d.name.toLowerCase().split(' ')[0]) || 
      d.name.toLowerCase().includes(query)
    );
    if (matched) return matched.km;

    // Deterministic string hash for custom typed destinations
    let hash = 0;
    for (let i = 0; i < query.length; i++) {
      hash = ((hash << 5) - hash) + query.charCodeAt(i);
      hash |= 0;
    }
    const minKm = 6.0;
    const maxKm = 48.0;
    const calculated = minKm + (Math.abs(hash) % (maxKm - minKm + 1));
    return parseFloat(calculated.toFixed(1));
  };

  const currentDistanceKm = calculateDistanceKm(dropLocation);
  const estMins = Math.round(currentDistanceKm * 1.9 + 5);

  const bookings = db?.cabBookings || [];

  // Dynamic cab category rates per KM
  const cabCategories = [
    {
      id: 'Ola Mini',
      name: 'Ola Mini',
      icon: '🚗',
      baseRate: 50,
      perKmRate: 12,
      minFare: 100,
      eta: '3 mins',
      desc: 'Comfy hatchback for 4 passengers'
    },
    {
      id: 'Ola Sedan',
      name: 'Ola Sedan',
      icon: '🚕',
      baseRate: 70,
      perKmRate: 15,
      minFare: 130,
      eta: '2 mins',
      desc: 'Top-rated sedan (Dzire / Etios) with extra boot space'
    },
    {
      id: 'Ola SUV',
      name: 'Ola SUV',
      icon: '🚙',
      baseRate: 110,
      perKmRate: 22,
      minFare: 220,
      eta: '4 mins',
      desc: 'Spacious 6-seater (Ertiga / Innova) for families & luggage'
    },
    {
      id: 'Ola Prime',
      name: 'Ola Prime / EV',
      icon: '⚡',
      baseRate: 85,
      perKmRate: 18,
      minFare: 160,
      eta: '3 mins',
      desc: 'Premium EV & top-rated drivers with free Wi-Fi'
    },
    {
      id: 'Ola Executive',
      name: 'Ola Executive Lux',
      icon: '🚘',
      baseRate: 200,
      perKmRate: 35,
      minFare: 350,
      eta: '5 mins',
      desc: 'Luxury sedan (Mercedes / Audi / BMW) with VIP service'
    },
    {
      id: 'Ola Outstation',
      name: 'Ola Outstation',
      icon: '🛣️',
      baseRate: 350,
      perKmRate: 18,
      minFare: 1200,
      eta: '10 mins',
      desc: 'Intercity travel from ' + aptCode + ' to nearby cities'
    }
  ].map(c => {
    const rawFare = Math.round(c.baseRate + (currentDistanceKm * c.perKmRate));
    const finalFare = Math.max(c.minFare, rawFare);
    return {
      ...c,
      estFare: finalFare
    };
  });

  const chosenCat = cabCategories.find(c => c.id === selectedCategory) || cabCategories[1];

  const handleBookCab = e => {
    e.preventDefault();
    if (!dropLocation.trim()) {
      if (addToast) addToast('Please enter your drop location', 'warning');
      return;
    }
    const newBooking = {
      id: 'OLA-' + aptCode + '-' + Math.floor(1000 + Math.random() * 9000),
      passengerName: currentUser?.name || 'Airport Traveler',
      mobile: currentUser?.mobile || '+91 9876543210',
      pickupPoint,
      dropLocation,
      distanceKm: currentDistanceKm,
      cabCategory: chosenCat.name,
      fare: chosenCat.estFare,
      status: 'DISPATCHED',
      timestamp: new Date().toLocaleTimeString()
    };
    setDb(prev => ({
      ...prev,
      cabBookings: [newBooking, ...(prev.cabBookings || [])]
    }));
    if (appendAuditLog) appendAuditLog('CAB_BOOKED', 'Booked ' + chosenCat.name + ' from ' + aptCode + ' to ' + dropLocation + ' (' + currentDistanceKm + ' km, ₹' + chosenCat.estFare + ')');
    if (addToast) addToast('🚕 ' + chosenCat.name + ' booked from ' + aptCode + ' to ' + dropLocation + '! (' + currentDistanceKm + ' km — ₹' + chosenCat.estFare + ')', 'success');
  };

  return React.createElement("div", {
    style: { display: 'flex', flexDirection: 'column', gap: '1.5rem' }
  }, React.createElement("div", {
    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }
  }, React.createElement("div", null, React.createElement("h2", {
    style: { fontWeight: 800, margin: 0 }
  }, "🚕 Official Ola Airport Taxi & Cab Hub — " + aptName + " (" + aptCode + ")"), React.createElement("div", {
    style: { fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }
  }, "Airport-Specific Pickup Points, Preset Destinations & Live Per-KM Fare Calculations for " + aptCode + " (" + activeData.city + ")")), React.createElement("a", {
    href: "https://book.olacabs.com",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-primary",
    style: {
      background: 'linear-gradient(135deg, #00f2fe, #4facfe)',
      color: '#000',
      fontWeight: 900,
      fontSize: '0.88rem',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.65rem 1.25rem',
      borderRadius: '8px',
      boxShadow: '0 0 15px rgba(0, 242, 254, 0.4)',
      cursor: 'pointer'
    }
  }, "🚖 Open Official Ola Cab App ↗")), React.createElement("div", {
    className: "grid-2",
    style: { gap: '1.5rem' }
  }, React.createElement("div", {
    className: "glass-card"
  }, React.createElement("h3", {
    style: { color: 'var(--accent-amber)', marginBottom: '1rem', fontSize: '1.1rem' }
  }, "🚖 Book Your Ride at " + aptCode + " (" + activeData.city + ")"), React.createElement("form", {
    onSubmit: handleBookCab,
    style: { display: 'flex', flexDirection: 'column', gap: '1rem' }
  }, React.createElement("div", null, React.createElement("label", {
    style: { fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }
  }, "Airport Pickup Point (" + aptCode + ")"), React.createElement("select", {
    className: "form-input",
    value: pickupPoint,
    onChange: e => setPickupPoint(e.target.value),
    style: {
      background: '#0f172a',
      color: '#ffffff',
      border: '1px solid rgba(0, 242, 254, 0.4)',
      borderRadius: '8px',
      padding: '0.65rem 0.85rem',
      fontSize: '0.88rem',
      fontWeight: 600,
      width: '100%',
      outline: 'none',
      cursor: 'pointer'
    }
  }, pickupPoints.map((p, i) => React.createElement("option", { key: i, value: p, style: { background: '#0f172a', color: '#ffffff' } }, p)))), React.createElement("div", null, React.createElement("label", {
    style: { fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }
  }, "Popular Preset Destinations in " + activeData.city + " (" + aptCode + ")"), React.createElement("select", {
    className: "form-input",
    value: dropLocation,
    onChange: e => setDropLocation(e.target.value),
    style: {
      background: '#0f172a',
      color: '#00f2fe',
      border: '1px solid rgba(0, 242, 254, 0.5)',
      borderRadius: '8px',
      padding: '0.7rem 0.85rem',
      fontSize: '0.9rem',
      fontWeight: 700,
      width: '100%',
      outline: 'none',
      cursor: 'pointer',
      marginBottom: '0.5rem'
    }
  }, popularDestinations.map((d, i) => React.createElement("option", {
    key: i,
    value: d.name,
    style: { background: '#0f172a', color: '#ffffff', padding: '0.5rem' }
  }, "📍 " + d.name + " (" + d.km + " km • ~" + d.mins + " mins)")))), React.createElement("div", null, React.createElement("label", {
    style: { fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }
  }, "Or Type Custom Address in " + activeData.city), React.createElement("input", {
    className: "form-input",
    placeholder: "Type hotel, address, or landmark in " + activeData.city + "...",
    value: dropLocation,
    onChange: e => setDropLocation(e.target.value),
    style: {
      background: 'rgba(15, 23, 42, 0.6)',
      color: '#ffffff',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '0.65rem 0.85rem',
      fontSize: '0.88rem',
      width: '100%'
    }
  })), React.createElement("div", {
    style: {
      background: 'rgba(0, 242, 254, 0.1)',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      border: '1px solid rgba(0, 242, 254, 0.4)',
      display: 'flex',
      justify: 'space-between',
      alignItems: 'center',
      fontSize: '0.85rem'
    }
  }, React.createElement("span", {
    style: { color: 'var(--accent-cyan)', fontWeight: 800 }
  }, "📍 Distance from " + aptCode + ": " + currentDistanceKm + " km"), React.createElement("span", {
    style: { color: 'var(--accent-emerald)', fontWeight: 800 }
  }, "⏱️ Est. Time: " + estMins + " mins")), React.createElement("div", null, React.createElement("label", {
    style: { fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }
  }, "Select Cab Vehicle Category (Fares Update Live for " + aptCode + ")"), React.createElement("div", {
    style: { display: 'flex', flexDirection: 'column', gap: '0.55rem' }
  }, cabCategories.map(cat => React.createElement("div", {
    key: cat.id,
    onClick: () => setSelectedCategory(cat.id),
    style: {
      padding: '0.8rem',
      borderRadius: '8px',
      border: '1px solid ' + (selectedCategory === cat.id ? 'var(--accent-amber)' : 'var(--border-color)'),
      background: selectedCategory === cat.id ? 'rgba(245,158,11,0.14)' : 'rgba(15,23,42,0.6)',
      cursor: 'pointer',
      display: 'flex',
      justify: 'space-between',
      alignItems: 'center',
      transition: 'all 0.2s'
    }
  }, React.createElement("div", {
    style: { display: 'flex', alignItems: 'center', gap: '0.7rem' }
  }, React.createElement("span", {
    style: { fontSize: '1.5rem' }
  }, cat.icon), React.createElement("div", null, React.createElement("strong", {
    style: { fontSize: '0.9rem', color: '#fff' }
  }, cat.name), React.createElement("div", {
    style: { fontSize: '0.72rem', color: 'var(--text-secondary)' }
  }, cat.desc), React.createElement("div", {
    style: { fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.1rem' }
  }, "Rate: ₹" + cat.baseRate + " Base + ₹" + cat.perKmRate + "/km"))), React.createElement("div", {
    style: { textAlign: 'right' }
  }, React.createElement("div", {
    style: { fontWeight: 800, color: 'var(--accent-emerald)', fontSize: '1.15rem' }
  }, "₹" + cat.estFare), React.createElement("div", {
    style: { fontSize: '0.68rem', color: 'var(--accent-cyan)' }
  }, "ETA: " + cat.eta)))))), React.createElement("div", {
    style: {
      background: 'rgba(245,158,11,0.1)',
      padding: '1rem',
      borderRadius: '8px',
      border: '1px solid rgba(245,158,11,0.35)',
      display: 'flex',
      justify: 'space-between',
      alignItems: 'center'
    }
  }, React.createElement("div", null, React.createElement("div", {
    style: { fontSize: '0.78rem', color: 'var(--text-secondary)' }
  }, "Ride Fare Estimate for " + currentDistanceKm + " km at " + aptCode + ":"), React.createElement("div", {
    style: { fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-amber)' }
  }, "₹" + chosenCat.estFare + " ", React.createElement("span", {
    style: { fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-secondary)' }
  }, "(" + chosenCat.name + ")"))), React.createElement("div", {
    style: { textAlign: 'right', fontSize: '0.75rem', color: 'var(--accent-cyan)' }
  }, "Driver ETA: ", React.createElement("strong", null, chosenCat.eta))), React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      padding: '0.85rem',
      background: 'linear-gradient(135deg, var(--accent-amber), #d97706)',
      color: '#000',
      fontWeight: 800,
      fontSize: '0.95rem'
    }
  }, "🚕 Book " + chosenCat.name + " (₹" + chosenCat.estFare + " for " + currentDistanceKm + " km) ➔"))), React.createElement("div", {
    style: { display: 'flex', flexDirection: 'column', gap: '1.25rem' }
  }, React.createElement("div", {
    className: "glass-card"
  }, React.createElement("h3", {
    style: { color: 'var(--accent-amber)', marginBottom: '0.75rem' }
  }, "🚖 Recent Cab Requests at " + aptCode + " (" + bookings.length + ")"), React.createElement("div", {
    style: { display: 'flex', flexDirection: 'column', gap: '0.65rem' }
  }, bookings.map(b => React.createElement("div", {
    key: b.id,
    style: {
      padding: '0.75rem',
      borderRadius: '8px',
      background: 'rgba(0,0,0,0.25)',
      border: '1px solid var(--border-color)'
    }
  }, React.createElement("div", {
    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
  }, React.createElement("strong", {
    style: { color: 'var(--accent-cyan)', fontSize: '0.85rem' }
  }, b.passengerName), React.createElement("span", {
    className: "badge badge-success",
    style: { fontSize: '0.62rem' }
  }, b.cabCategory)), React.createElement("div", {
    style: { fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }
  }, "Pickup: ", React.createElement("strong", null, b.pickupPoint)), React.createElement("div", {
    style: { fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }
  }, "Drop: ", React.createElement("strong", null, b.dropLocation + " (" + (b.distanceKm || '16.8') + " km)")), React.createElement("div", {
    style: { fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 700, marginTop: '0.3rem', display: 'flex', justifyContent: 'space-between' }
  }, React.createElement("span", null, "Est. Fare: ₹" + b.fare), React.createElement("span", {
    style: { color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 400 }
  }, b.timestamp)))), bookings.length === 0 && React.createElement("div", {
    style: { textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }
  }, "No cab requests logged yet."))))));
}

function ReportIssueView({
  db,
  setDb,
  currentUser,
  isAdmin,
  isStaff,
  addToast,
  appendAuditLog,
  activeAirport
}) {
  const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
  const aptCode = activeAirport?.code || 'DEL';

  const [form, setForm] = useState({
    name: currentUser ? (currentUser.name || '') : '',
    phone: currentUser ? (currentUser.mobile || '') : '',
    email: currentUser ? (currentUser.email || '') : '',
    category: 'General Inquiry',
    urgency: 'Medium',
    description: '',
    notifySms: true,
    notifyEmail: true
  });

  const [replyInput, setReplyInput] = useState({});

  const tickets = (db && Array.isArray(db.tickets)) ? db.tickets : [
    {
      id: "TCK-84920",
      name: "Rahul Verma",
      phone: "+91 9876543210",
      email: "rahul.v@gmail.com",
      location: "Indira Gandhi International Airport (DEL)",
      category: "Baggage & Luggage",
      urgency: "High",
      description: "My checked baggage from AI-102 has not arrived at Belt 4 after 45 minutes.",
      status: "OPEN",
      adminReply: null,
      createdAt: "2026-08-11 14:20"
    },
    {
      id: "TCK-84919",
      name: "Priya Sharma",
      phone: "+91 9123456789",
      email: "priya.s@outlook.com",
      location: "Chhatrapati Shivaji Maharaj International Airport (BOM)",
      category: "Terminal Facility",
      urgency: "Normal",
      description: "Restroom near Gate 14 T2 requires maintenance.",
      status: "RESOLVED",
      adminReply: "Verified with Housekeeping Supervisor. Maintenance team dispatched and issue resolved.",
      createdAt: "2026-08-11 11:05"
    }
  ];

  const handleSubmitTicket = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.description.trim()) {
      if (addToast) addToast('Please fill out your Name, Phone Number, Email, and Issue Details', 'warning');
      return;
    }

    const ticketId = 'TCK-' + Math.floor(10000 + Math.random() * 90000);
    const newTicket = {
      id: ticketId,
      name: form.name,
      phone: form.phone,
      email: form.email,
      location: `${aptName} (${aptCode})`,
      category: form.category,
      urgency: form.urgency,
      description: form.description,
      notifySms: form.notifySms,
      notifyEmail: form.notifyEmail,
      status: 'OPEN',
      adminReply: null,
      createdAt: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    const updatedTickets = [newTicket, ...tickets];
    setDb(prev => {
      const nextDb = { ...prev, tickets: updatedTickets };
      try { localStorage.setItem(DB_KEY, JSON.stringify(nextDb)); } catch(e){}
      return nextDb;
    });

    if (appendAuditLog) appendAuditLog('TICKET_CREATED', `Ticket ${ticketId} created by ${form.name} (${form.email})`);
    if (addToast) addToast(`✅ Complaint Ticket ${ticketId} Logged! Admins notified via SMS & Email.`, 'success');

    setForm({
      name: currentUser ? (currentUser.name || '') : '',
      phone: currentUser ? (currentUser.mobile || '') : '',
      email: currentUser ? (currentUser.email || '') : '',
      category: 'General Inquiry',
      urgency: 'Medium',
      description: '',
      notifySms: true,
      notifyEmail: true
    });
  };

  const handleAdminReply = (ticketId, ticketName, ticketPhone, ticketEmail) => {
    const replyText = replyInput[ticketId];
    if (!replyText || !replyText.trim()) {
      if (addToast) addToast('Please enter your response message to send', 'warning');
      return;
    }

    const updated = tickets.map(t => t.id === ticketId ? {
      ...t,
      status: 'RESOLVED',
      adminReply: replyText.trim(),
      repliedAt: new Date().toLocaleString()
    } : t);

    setDb(prev => {
      const nextDb = { ...prev, tickets: updated };
      try { localStorage.setItem(DB_KEY, JSON.stringify(nextDb)); } catch(e){}
      return nextDb;
    });

    if (appendAuditLog) appendAuditLog('TICKET_RESOLVED', `Admin replied to Ticket ${ticketId} -> Sent SMS to ${ticketPhone} & Email to ${ticketEmail}`);
    if (addToast) addToast(`📩 Response dispatched to ${ticketName} via SMS (${ticketPhone}) & Email (${ticketEmail})!`, 'success');

    setReplyInput(prev => ({ ...prev, [ticketId]: '' }));
  };

  return React.createElement("div", {
    style: { display: 'flex', flexDirection: 'column', gap: '1.5rem' }
  }, React.createElement("div", {
    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }
  }, React.createElement("div", null, React.createElement("h2", {
    style: { fontWeight: 800, margin: 0 }
  }, "📝 Passenger & Airport Support Ticket System — " + aptName + " (" + aptCode + ")"), React.createElement("div", {
    style: { fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }
  }, "Log Complaints or Technical Issues • Admins Respond Direct via Automated SMS & Email Alerts"))), 

  React.createElement("div", {
    className: "grid-2",
    style: { gap: '1.5rem' }
  }, React.createElement("div", {
    className: "glass-card"
  }, React.createElement("h3", {
    style: { color: 'var(--accent-amber)', marginBottom: '1rem', fontSize: '1.1rem' }
  }, "📩 Create New Complaint / Report Issue"), React.createElement("form", {
    onSubmit: handleSubmitTicket,
    style: { display: 'flex', flexDirection: 'column', gap: '0.85rem' }
  }, React.createElement("div", null, React.createElement("label", {
    style: { fontSize: '0.78rem', color: 'var(--text-secondary)' }
  }, "Full Name *"), React.createElement("input", {
    className: "form-input",
    placeholder: "Enter your full name",
    value: form.name,
    onChange: e => setForm({ ...form, name: e.target.value }),
    required: true
  })), React.createElement("div", {
    className: "grid-2",
    style: { gap: '0.75rem' }
  }, React.createElement("div", null, React.createElement("label", {
    style: { fontSize: '0.78rem', color: 'var(--text-secondary)' }
  }, "Phone Number (SMS Alert) *"), React.createElement("input", {
    className: "form-input",
    placeholder: "+91 9876543210",
    value: form.phone,
    onChange: e => setForm({ ...form, phone: e.target.value }),
    required: true
  })), React.createElement("div", null, React.createElement("label", {
    style: { fontSize: '0.78rem', color: 'var(--text-secondary)' }
  }, "Email ID (Email Reply) *"), React.createElement("input", {
    type: "email",
    className: "form-input",
    placeholder: "user@domain.com",
    value: form.email,
    onChange: e => setForm({ ...form, email: e.target.value }),
    required: true
  }))), React.createElement("div", {
    className: "grid-2",
    style: { gap: '0.75rem' }
  }, React.createElement("div", null, React.createElement("label", {
    style: { fontSize: '0.78rem', color: 'var(--text-secondary)' }
  }, "Issue Category"), React.createElement("select", {
    className: "form-input",
    value: form.category,
    onChange: e => setForm({ ...form, category: e.target.value }),
    style: { background: '#0f172a', color: '#fff' }
  }, React.createElement("option", { value: "Baggage & Luggage" }, "🧳 Baggage & Luggage"), React.createElement("option", { value: "Flight Delay / Gate" }, "✈️ Flight Delay / Gate Issue"), React.createElement("option", { value: "Terminal Facility" }, "🏛️ Terminal Facility & Cleanliness"), React.createElement("option", { value: "Parking & Cab Service" }, "🚗 Parking & Cab Service"), React.createElement("option", { value: "Security & Safety" }, "🛡️ Security & Safety"), React.createElement("option", { value: "General Inquiry" }, "ℹ️ General Inquiry"))), React.createElement("div", null, React.createElement("label", {
    style: { fontSize: '0.78rem', color: 'var(--text-secondary)' }
  }, "Urgency Level"), React.createElement("select", {
    className: "form-input",
    value: form.urgency,
    onChange: e => setForm({ ...form, urgency: e.target.value }),
    style: { background: '#0f172a', color: '#fff' }
  }, React.createElement("option", { value: "Normal" }, "🟢 Normal"), React.createElement("option", { value: "High" }, "🟡 High"), React.createElement("option", { value: "Urgent" }, "🟠 Urgent"), React.createElement("option", { value: "Critical Emergency" }, "🔴 Critical Emergency")))), React.createElement("div", null, React.createElement("label", {
    style: { fontSize: '0.78rem', color: 'var(--text-secondary)' }
  }, "Detailed Complaint / Issue Description *"), React.createElement("textarea", {
    className: "form-input",
    rows: 4,
    placeholder: "Explain what happened, location details, flight numbers, or specific assistance required...",
    value: form.description,
    onChange: e => setForm({ ...form, description: e.target.value }),
    required: true
  })), React.createElement("div", {
    style: { display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.78rem', color: 'var(--accent-cyan)' }
  }, React.createElement("label", { style: { cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' } }, React.createElement("input", {
    type: "checkbox",
    checked: form.notifySms,
    onChange: e => setForm({ ...form, notifySms: e.target.checked })
  }), "📲 Receive Response via SMS"), React.createElement("label", { style: { cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' } }, React.createElement("input", {
    type: "checkbox",
    checked: form.notifyEmail,
    onChange: e => setForm({ ...form, notifyEmail: e.target.checked })
  }), "✉️ Receive Response via Email")), React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: { padding: '0.75rem', fontWeight: 900, background: 'linear-gradient(135deg, var(--accent-amber), #d97706)', color: '#000', cursor: 'pointer' }
  }, "📩 Submit Complaint Ticket"))), 

  React.createElement("div", {
    style: { display: 'flex', flexDirection: 'column', gap: '1rem' }
  }, React.createElement("div", {
    className: "glass-card"
  }, React.createElement("h3", {
    style: { color: 'var(--accent-cyan)', marginBottom: '1rem', fontSize: '1.1rem' }
  }, "🎟️ Support Ticket Desk & Admin Reply Vault (" + tickets.length + ")"), React.createElement("div", {
    style: { display: 'flex', flexDirection: 'column', gap: '1rem' }
  }, tickets.map(function(t) {
    return React.createElement("div", {
      key: t.id,
      style: {
        padding: '1rem',
        borderRadius: '10px',
        background: 'rgba(15,23,42,0.8)',
        borderLeft: '4px solid ' + (t.status === 'RESOLVED' ? 'var(--accent-emerald)' : t.urgency === 'Critical Emergency' || t.urgency === 'Urgent' ? 'var(--accent-rose)' : 'var(--accent-amber)')
      }
    }, React.createElement("div", {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }
    }, React.createElement("div", { style: { display: 'flex', gap: '0.5rem', alignItems: 'center' } }, React.createElement("strong", { style: { color: 'var(--brand-cyan)', fontSize: '0.92rem' } }, t.id), React.createElement("span", { className: "badge " + (t.status === 'RESOLVED' ? 'badge-success' : 'badge-warning') }, t.status === 'RESOLVED' ? '✅ RESOLVED' : '⏳ OPEN')), React.createElement("span", { style: { fontSize: '0.72rem', color: 'var(--text-muted)' } }, t.createdAt)), React.createElement("div", {
      style: { fontWeight: 700, color: '#fff', fontSize: '0.88rem', marginBottom: '0.2rem' }
    }, t.name, " • 📞 ", t.phone, " • ✉️ ", t.email), React.createElement("div", {
      style: { fontSize: '0.76rem', color: 'var(--accent-amber)', marginBottom: '0.4rem' }
    }, "Category: ", t.category, " • Urgency: ", t.urgency, " • Location: ", t.location), React.createElement("p", {
      style: { fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 0.6rem 0', lineHeight: 1.4 }
    }, t.description), t.adminReply ? React.createElement("div", {
      style: { padding: '0.6rem 0.85rem', borderRadius: '8px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.4)', color: 'var(--accent-emerald)', fontSize: '0.78rem' }
    }, "💬 Admin Reply (Sent to SMS & Email): ", t.adminReply) : (isAdmin || isStaff) ? React.createElement("div", {
      style: { marginTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.65rem' }
    }, React.createElement("label", { style: { fontSize: '0.73rem', color: 'var(--accent-cyan)' } }, "💬 Admin Reply via SMS & Email:"), React.createElement("div", { style: { display: 'flex', gap: '0.5rem' } }, React.createElement("input", {
      className: "form-input",
      placeholder: "Type your official response to passenger...",
      value: replyInput[t.id] || '',
      onChange: function(e) {
        var val = e.target.value;
        setReplyInput(function(prev) { return Object.assign({}, prev, { [t.id]: val }); });
      },
      style: { flex: 1, fontSize: '0.8rem', background: '#07090e' }
    }), React.createElement("button", {
      className: "btn btn-primary",
      onClick: function() { handleAdminReply(t.id, t.name, t.phone, t.email); },
      style: { background: 'var(--accent-emerald)', color: '#000', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer', whiteSpace: 'nowrap' }
    }, "📤 Send SMS & Email Reply"))) : React.createElement("div", {
      style: { fontSize: '0.72rem', color: 'var(--accent-amber)', fontStyle: 'italic', marginTop: '0.3rem' }
    }, "⏳ Ticket logged. Admin team will respond via SMS / Email shortly."));
  }), tickets.length === 0 && React.createElement("div", {
    style: { textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }
  }, "No support tickets logged yet."))))));
}

// RENDER
function ErrorBoundary(props) {
  if (typeof React !== 'undefined' && React.Component) {
    React.Component.call(this, props);
  }
  this.state = { hasError: false, error: null };
}

if (typeof React !== 'undefined' && React.Component && React.Component.prototype) {
  ErrorBoundary.prototype = Object.create(React.Component.prototype);
  ErrorBoundary.prototype.constructor = ErrorBoundary;
  ErrorBoundary.getDerivedStateFromError = function(error) {
    return { hasError: true, error: error };
  };
  ErrorBoundary.prototype.componentDidCatch = function(error, errorInfo) {
    console.error("ErrorBoundary caught error:", error, errorInfo);
  };
  ErrorBoundary.prototype.render = function() {
    if (this.state.hasError) {
      return React.createElement("div", {
        style: {
          padding: '3rem',
          textAlign: 'center',
          background: '#070a12',
          color: '#fff',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Outfit, sans-serif'
        }
      }, React.createElement("h2", { style: { color: 'var(--accent-amber)' } }, "⚠️ AeroPulse OS Component Error"), React.createElement("p", null, String(this.state.error?.message || "An unexpected error occurred.")), React.createElement("button", {
        className: "btn btn-primary",
        onClick: () => window.location.reload(),
        style: { marginTop: '1rem' }
      }, "🔄 Refresh AeroPulse OS"));
    }
    return this.props.children;
  };
} else {
  ErrorBoundary.prototype = {
    render: function() { return this.props ? this.props.children : null; }
  };
}

const {
  useState,
  useEffect,
  useRef,
  useCallback
} = React;

// ═══════════════════════════════════════════════════════
// CONSTANTS & SEED DATA
// ═══════════════════════════════════════════════════════



var container = document.getElementById('root');
if (container) {
  if (typeof ReactDOM !== 'undefined' && ReactDOM.createRoot) {
    var root = ReactDOM.createRoot(container);
    root.render(React.createElement(ErrorBoundary, null, React.createElement(App, null)));
  } else if (typeof ReactDOM !== 'undefined' && ReactDOM.render) {
    ReactDOM.render(React.createElement(ErrorBoundary, null, React.createElement(App, null)), container);
  }
}
