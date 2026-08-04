// AAI Delhi International Airport (DEL / VIDP) 10-Level Designation Hierarchy & Data Store

export const INITIAL_SEED_DATA = {
  metrics: {
    activeFlights: 124,
    passengersToday: 42315,
    bagsProcessed: 39200,
    activeAlerts: 2,
    gatesOccupied: 27,
    totalGates: 38,
    weatherStatus: "Good (Vis 2500m)",
    systemHealth: "99.8% Nominal"
  },
  contactInfo: {
    helpline: "+91 8800344794 (Toll Free)",
    email: "admin@delhi.aai",
    address: "Indira Gandhi International Airport, New Delhi 110037, India"
  },
  users: [
    { id: "USR-001", name: "Ananya Sharma", email: "passenger@delhi.aai", password: "123", role: "Passenger", status: "APPROVED", pnr: "PNR-DEL-9081" },
    { id: "USR-002", name: "Inspector Rajesh Kumar", email: "cisf.lead@delhi.aai", password: "123", role: "CISF Lead", status: "APPROVED", employeeId: "CISF-DEL-881" },
    { id: "USR-003", name: "Sub-Inspector Vikram Singh", email: "cisf.officer@delhi.aai", password: "123", role: "CISF Officer", status: "APPROVED", employeeId: "CISF-DEL-904" },
    { id: "USR-004", name: "Sunita Patel", email: "housekeeping@delhi.aai", password: "123", role: "Housekeeping", status: "APPROVED", employeeId: "HK-DEL-102" },
    { id: "USR-005", name: "ATC Chief Controller Sharma", email: "atc.command@delhi.aai", password: "123", role: "AAI ATC Command", status: "APPROVED", employeeId: "ATC-DEL-001" },
    { id: "USR-006", name: "ATC Officer Priya Verma", email: "atc.controller@delhi.aai", password: "123", role: "AAI ATC Controller", status: "APPROVED", employeeId: "ATC-DEL-045" },
    { id: "USR-007", name: "Amitabh Roy", email: "ground@delhi.aai", password: "123", role: "AAI Ground Staff", status: "APPROVED", employeeId: "GND-DEL-311" },
    { id: "USR-008", name: "Karan Malhotra", email: "airline@delhi.aai", password: "123", role: "Airline Staff", status: "APPROVED", employeeId: "AI-DEL-771" },
    { id: "USR-009", name: "Airport Manager Rajiv Kapoor", email: "manager@delhi.aai", password: "123", role: "Airport Manager", status: "APPROVED", employeeId: "AAI-MGR-001" },
    { id: "USR-010", name: "AAI Master Admin", email: "admin@delhi.aai", password: "123", role: "Admin", status: "APPROVED", employeeId: "AAI-ADM-001" }
  ],
  flights: [
    { id: "FL-DEL-101", flightNumber: "AI-101", airline: "Air India", type: "Departure", destination: "London Heathrow (LHR)", origin: "Delhi (DEL)", scheduledTime: "02:15", estimatedTime: "02:15", terminal: "Terminal 3", gate: "T3-Gate 42", status: "Boarding", passengersCount: 285, maxCapacity: 324, baggageCount: 410, aircraft: "Boeing 787-9", aiDelayRisk: 14, predictedDelayMinutes: 0, boardingProgress: 88, engineHealth: 98, hydraulicHealth: 96, tyreWear: "12% (Good)", brakeCondition: "Optimal", fuelEfficiency: "99.2%", maintenanceRec: "Routine Pre-flight Passed" },
    { id: "FL-DEL-102", flightNumber: "6E-2015", airline: "IndiGo", type: "Departure", destination: "Mumbai (BOM)", origin: "Delhi (DEL)", scheduledTime: "06:30", estimatedTime: "07:15", terminal: "Terminal 1", gate: "T1-Gate 05", status: "Delayed", passengersCount: 180, maxCapacity: 186, baggageCount: 195, aircraft: "Airbus A320neo", aiDelayRisk: 82, predictedDelayMinutes: 45, boardingProgress: 0, engineHealth: 92, hydraulicHealth: 88, tyreWear: "45% (Moderate)", brakeCondition: "Inspect Next", fuelEfficiency: "97.5%", maintenanceRec: "Check Brake Pad Wear at BOM" }
  ],
  gates: [
    { id: "T1-Gate 01", terminal: "Terminal 1", status: "Available", assignedFlight: null, size: "Narrowbody", passengers: 0, boardingPct: 0, compatibility: "A320 / B737" },
    { id: "T1-Gate 05", terminal: "Terminal 1", status: "Occupied", assignedFlight: "6E-2015", size: "Narrowbody", passengers: 180, boardingPct: 0, compatibility: "A320 / B737" },
    { id: "T3-Gate 32", terminal: "Terminal 3", status: "Occupied", assignedFlight: "UK-811", size: "Widebody", passengers: 162, boardingPct: 45, compatibility: "A321 / B787" },
    { id: "T3-Gate 42", terminal: "Terminal 3", status: "Occupied", assignedFlight: "AI-101", size: "Widebody", passengers: 285, boardingPct: 88, compatibility: "B787 / B777" }
  ],
  emergencies: [
    { id: "EMG-DEL-501", category: "Severe Weather / Fog", severity: "Code Yellow", title: "CAT-III B Low Visibility Protocol Active", location: "DEL Runway 28/10 Threshold", assignedResponders: "AAI ATC Tower Level 8 & CISF ASG Lead", timestamp: "2026-08-04 06:15 IST", status: "ACTIVE", notes: "Dense fog reduced RVR to 150m. CAT-III instrument guidance operational.", escalated: true }
  ],
  lostAndFound: [
    { id: "LF-901", item: "Leather Wallet (Black)", category: "Personal Item", location: "T3 CISF Security Lane B", dateFound: "2026-08-04", status: "UNCLAIMED", claimedBy: null, claimStatus: null, aiConfidence: 96 }
  ],
  wheelchairRequests: [
    { id: "WC-101", passengerName: "Savitri Devi", airlineName: "Air India", pnrNumber: "PNR-DEL-7781", mobileNumber: "+91 9876543210", timestamp: "08:15 IST", status: "DISPATCHED" }
  ],
  auditLogs: [
    { id: "LOG-1001", timestamp: "2026-08-04 06:15:22 IST", actor: "AAI Master Admin (AAI-ADM-001)", action: "SYSTEM_BOOT", details: "AOCC Designation Hierarchy initialized." }
  ]
};
