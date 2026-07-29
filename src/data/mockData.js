// Airport Authority of India (AAI) & DIAL (Delhi International Airport Limited) Mock Dataset

export const INITIAL_FLIGHTS = [
  {
    id: "FL-DEL-101",
    flightNumber: "AI-101",
    airline: "Air India",
    type: "Departure",
    destination: "London Heathrow (LHR)",
    origin: "Delhi (DEL)",
    scheduledTime: "02:15",
    estimatedTime: "02:15",
    terminal: "Terminal 3",
    gate: "T3-Gate 42",
    status: "Boarding",
    passengersCount: 324,
    maxCapacity: 342,
    baggageCount: 410,
    aircraft: "Boeing 787-9 Dreamliner",
    aiDelayRisk: 14,
    delayReason: null,
    weatherContext: "Haze, Vis 2500m, Wind 06kts E",
    boardingProgress: 285
  },
  {
    id: "FL-DEL-102",
    flightNumber: "6E-2015",
    airline: "IndiGo",
    type: "Departure",
    destination: "Mumbai (BOM)",
    origin: "Delhi (DEL)",
    scheduledTime: "06:30",
    estimatedTime: "07:15",
    terminal: "Terminal 1",
    gate: "T1-Gate 05",
    status: "Delayed",
    passengersCount: 180,
    maxCapacity: 186,
    baggageCount: 195,
    aircraft: "Airbus A320neo",
    aiDelayRisk: 82,
    delayReason: "Morning Fog CAT-III Standby & Runway Hold Queue",
    weatherContext: "Dense Fog, Vis 150m (CAT-III Low Visibility Protocol)",
    boardingProgress: 0
  },
  {
    id: "FL-DEL-103",
    flightNumber: "UK-811",
    airline: "Vistara (Air India)",
    type: "Departure",
    destination: "Bengaluru (BLR)",
    origin: "Delhi (DEL)",
    scheduledTime: "08:00",
    estimatedTime: "08:00",
    terminal: "Terminal 3",
    gate: "T3-Gate 32",
    status: "On Time",
    passengersCount: 162,
    maxCapacity: 164,
    baggageCount: 178,
    aircraft: "Airbus A321neo",
    aiDelayRisk: 22,
    delayReason: null,
    weatherContext: "Scattered Haze",
    boardingProgress: 45
  },
  {
    id: "FL-DEL-104",
    flightNumber: "EK-513",
    airline: "Emirates",
    type: "Arrival",
    destination: "Delhi (DEL)",
    origin: "Dubai (DXB)",
    scheduledTime: "09:20",
    estimatedTime: "09:20",
    terminal: "Terminal 3",
    gate: "T3-Gate 45",
    status: "Landed",
    passengersCount: 490,
    maxCapacity: 517,
    baggageCount: 620,
    aircraft: "Airbus A380-800",
    aiDelayRisk: 8,
    delayReason: null,
    weatherContext: "Clear Sky",
    boardingProgress: 490
  },
  {
    id: "FL-DEL-105",
    flightNumber: "QP-1102",
    airline: "Akasa Air",
    type: "Departure",
    destination: "Ahmedabad (AMD)",
    origin: "Delhi (DEL)",
    scheduledTime: "10:15",
    estimatedTime: "10:15",
    terminal: "Terminal 2",
    gate: "T2-Gate 14",
    status: "On Time",
    passengersCount: 172,
    maxCapacity: 189,
    baggageCount: 180,
    aircraft: "Boeing 737 MAX 8",
    aiDelayRisk: 18,
    delayReason: null,
    weatherContext: "Clear",
    boardingProgress: 0
  },
  {
    id: "FL-DEL-106",
    flightNumber: "SG-8191",
    airline: "SpiceJet",
    type: "Departure",
    destination: "Goa (GOX)",
    origin: "Delhi (DEL)",
    scheduledTime: "11:45",
    estimatedTime: "12:30",
    terminal: "Terminal 1",
    gate: "T1-Gate 02",
    status: "Delayed",
    passengersCount: 182,
    maxCapacity: 189,
    baggageCount: 205,
    aircraft: "Boeing 737-800",
    aiDelayRisk: 76,
    delayReason: "Late Inbound Turnaround & Apron Refueling Slot",
    weatherContext: "Crosswind 14kts",
    boardingProgress: 0
  },
  {
    id: "FL-DEL-107",
    flightNumber: "SQ-403",
    airline: "Singapore Airlines",
    type: "Departure",
    destination: "Singapore (SIN)",
    origin: "Delhi (DEL)",
    scheduledTime: "21:55",
    estimatedTime: "21:55",
    terminal: "Terminal 3",
    gate: "T3-Gate 40",
    status: "On Time",
    passengersCount: 295,
    maxCapacity: 303,
    baggageCount: 380,
    aircraft: "Airbus A350-900",
    aiDelayRisk: 12,
    delayReason: null,
    weatherContext: "Clear Sky",
    boardingProgress: 0
  },
  {
    id: "FL-DEL-108",
    flightNumber: "IX-145",
    airline: "Air India Express",
    type: "Arrival",
    destination: "Delhi (DEL)",
    origin: "Doha (DOH)",
    scheduledTime: "05:10",
    estimatedTime: "05:10",
    terminal: "Terminal 3",
    gate: "T3-Gate 36",
    status: "Gate Closed",
    passengersCount: 174,
    maxCapacity: 180,
    baggageCount: 210,
    aircraft: "Boeing 737-800",
    aiDelayRisk: 0,
    delayReason: null,
    weatherContext: "Haze",
    boardingProgress: 174
  }
];

export const INITIAL_GATES = [
  { id: "T1-Gate 01", terminal: "Terminal 1", status: "Available", assignedFlight: null, size: "Narrowbody (A320/B737)", jetbridge: "Connected" },
  { id: "T1-Gate 02", terminal: "Terminal 1", status: "Occupied", assignedFlight: "SG-8191", size: "Narrowbody (A320/B737)", jetbridge: "Connected" },
  { id: "T1-Gate 05", terminal: "Terminal 1", status: "Occupied", assignedFlight: "6E-2015", size: "Narrowbody (A320/B737)", jetbridge: "Connected" },
  { id: "T1-Gate 08", terminal: "Terminal 1", status: "Turnaround", assignedFlight: null, size: "Narrowbody (A320/B737)", jetbridge: "Retracted" },

  { id: "T2-Gate 10", terminal: "Terminal 2", status: "Available", assignedFlight: null, size: "Narrowbody (A320/B737)", jetbridge: "Standby" },
  { id: "T2-Gate 14", terminal: "Terminal 2", status: "Occupied", assignedFlight: "QP-1102", size: "Narrowbody (A320/B737)", jetbridge: "Connected" },
  { id: "T2-Gate 18", terminal: "Terminal 2", status: "Maintenance", assignedFlight: null, size: "Narrowbody (A320/B737)", jetbridge: "Maintenance" },

  { id: "T3-Gate 32", terminal: "Terminal 3", status: "Occupied", assignedFlight: "UK-811", size: "Narrowbody / Widebody", jetbridge: "Connected" },
  { id: "T3-Gate 36", terminal: "Terminal 3", status: "Occupied", assignedFlight: "IX-145", size: "Narrowbody", jetbridge: "Connected" },
  { id: "T3-Gate 40", terminal: "Terminal 3", status: "Occupied", assignedFlight: "SQ-403", size: "Widebody (A350/B777)", jetbridge: "Connected" },
  { id: "T3-Gate 42", terminal: "Terminal 3", status: "Occupied", assignedFlight: "AI-101", size: "Widebody (B787/B777)", jetbridge: "Connected" },
  { id: "T3-Gate 45", terminal: "Terminal 3", status: "Occupied", assignedFlight: "EK-513", size: "Heavy CODE-F (A380)", jetbridge: "Dual Jetbridge Connected" },
  { id: "T3-Gate 48", terminal: "Terminal 3", status: "Available", assignedFlight: null, size: "Widebody (B787/B777)", jetbridge: "Standby" }
];

export const INITIAL_STAFF = [
  { id: "AAI-DEL-101", name: "Inspector Rajesh Kumar", role: "CISF Security Lead", team: "CISF Terminal 3 Aviation Security", shiftStatus: "On Duty", location: "T3 Departure Security Checkpoint", assignedTask: "Biometric DigiYatra Passenger Screening" },
  { id: "AAI-DEL-102", name: "Vikram Sharma", role: "AAI ATC Controller", team: "AAI Air Traffic Control Tower (VIDP)", shiftStatus: "On Duty", location: "DEL ATC Tower Level 8", assignedTask: "Runway 29L/11R Departure Sequencing" },
  { id: "AAI-DEL-103", name: "Sunita Patel", role: "Celebi Ground Handler", team: "Celebi NAS Aviation Logistics", shiftStatus: "On Duty", location: "Baggage Belt 08 (T3)", assignedTask: "Air India AI-101 ULD Loading" },
  { id: "AAI-DEL-104", name: "Amit Verma", role: "Avionics Maintenance Engineer", team: "Air India Engineering Services (AIESL)", shiftStatus: "On Duty", location: "T3 Gate 42", assignedTask: "B787 Pre-flight Avionics Audit" },
  { id: "AAI-DEL-105", name: "Meera Nair", role: "Immigration & Customs Officer", team: "Bureau of Immigration (BOI India)", shiftStatus: "On Duty", location: "T3 International Departure Counter", assignedTask: "Passport Clearance Control" }
];

export const INITIAL_PASSENGERS = [
  { pnr: "PNR-DEL-9081", name: "Rajeshwar Singhania", flightNumber: "AI-101", seat: "03A", class: "First / Business", baggageCount: 2, status: "Boarded", tagId: "TAG-AAI-DEL-90812" },
  { pnr: "PNR-DEL-4412", name: "Priya Sharma", flightNumber: "6E-2015", seat: "12C", class: "Economy", baggageCount: 1, status: "Security Cleared", tagId: "TAG-AAI-DEL-44102" },
  { pnr: "PNR-DEL-8820", name: "Vikramaditya Rao", flightNumber: "UK-811", seat: "08D", class: "Premium Economy", baggageCount: 2, status: "Checked-In", tagId: "TAG-AAI-DEL-88200" },
  { pnr: "PNR-DEL-3391", name: "Ananya Iyer", flightNumber: "AI-101", seat: "24K", class: "Economy", baggageCount: 1, status: "Boarded", tagId: "TAG-AAI-DEL-33910" }
];

export const INITIAL_BAGGAGE = [
  {
    tagId: "TAG-AAI-DEL-90812",
    pnr: "PNR-DEL-9081",
    passengerName: "Rajeshwar Singhania",
    flightNumber: "AI-101",
    weightKg: 24.5,
    currentStep: "Aircraft Cargo Hold (T3 Gate 42)",
    status: "Loaded",
    batteryPct: 96,
    tempC: 19.4,
    shockG: 0.1,
    locationHistory: [
      { step: "Check-in Counter AI-12 (T3)", time: "00:15", verified: true },
      { step: "CISF Inline X-Ray Screening B", time: "00:35", verified: true },
      { step: "Celebi Automated BHS Sorting Carousel 4", time: "01:05", verified: true },
      { step: "Aircraft Hold Container (AI-101)", time: "01:45", verified: true }
    ]
  },
  {
    tagId: "TAG-AAI-DEL-44102",
    pnr: "PNR-DEL-4412",
    passengerName: "Priya Sharma",
    flightNumber: "6E-2015",
    weightKg: 14.8,
    currentStep: "Inline BHS Sorting (T1)",
    status: "Normal",
    batteryPct: 91,
    tempC: 22.1,
    shockG: 0.3,
    locationHistory: [
      { step: "DigiYatra Express Drop Counter T1", time: "05:15", verified: true },
      { step: "CISF High-Speed Baggage Scanner", time: "05:35", verified: true },
      { step: "Staging Area T1 Gate 05", time: "06:10", verified: true }
    ]
  },
  {
    tagId: "TAG-AAI-DEL-88200",
    pnr: "PNR-DEL-8820",
    passengerName: "Vikramaditya Rao",
    flightNumber: "UK-811",
    weightKg: 21.0,
    currentStep: "Rerouted / Manual Audit",
    status: "Misplaced Alert",
    batteryPct: 78,
    tempC: 25.2,
    shockG: 2.4,
    locationHistory: [
      { step: "Vistara Check-in Counter Island F (T3)", time: "06:30", verified: true },
      { step: "CISF Security Clearance Node", time: "06:50", verified: true },
      { step: "Celebi Transfer Loop 9 (Mismatch MUX)", time: "07:25", verified: false }
    ]
  }
];

export const INITIAL_EMERGENCY_ALERTS = [
  {
    id: "ALERT-AAI-DEL-01",
    severity: "Code Yellow",
    title: "CAT-III B Dense Winter Fog / Low Visibility Protocol",
    message: "RVR (Runway Visual Range) on Runway 28/10 dropped below 150 meters. AAI Air Traffic Control has activated Low Visibility Procedures (LVP) for all departing & arriving aircraft.",
    timestamp: "06:15:00",
    affectedTerminals: ["Terminal 1", "Terminal 2", "Terminal 3"],
    status: "Active",
    actionRequired: "Enforce 20-minute separation interval for non-CAT-III certified aircraft pushbacks."
  }
];
