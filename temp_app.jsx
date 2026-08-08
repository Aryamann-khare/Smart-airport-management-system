


    const { useState, useEffect, useRef, useCallback } = React;

    // ═══════════════════════════════════════════════════════
    // CONSTANTS & SEED DATA
    // ═══════════════════════════════════════════════════════

    const EMERGENCY_CATEGORIES = [
      "Fire / Crash Tender","Medical Emergency","Bomb Threat","Suspicious Object",
      "Cyber Attack","Severe Weather / Fog","Aircraft Incident","Power / Grid Failure",
      "Runway Incursion","Bird Strike","Fuel Leakage"
    ];

    const AAI_AIRPORTS = [
      { code: 'DEL', iata: 'DEL', icao: 'VIDP', name: 'Indira Gandhi International Airport', city: 'Delhi', lat: 28.5562, lon: 77.1000 },
      { code: 'BOM', iata: 'BOM', icao: 'VABB', name: 'Chhatrapati Shivaji Maharaj Intl Airport', city: 'Mumbai', lat: 19.0896, lon: 72.8656 },
      { code: 'BLR', iata: 'BLR', icao: 'VOBL', name: 'Kempegowda International Airport', city: 'Bengaluru', lat: 13.1986, lon: 77.7066 },
      { code: 'MAA', iata: 'MAA', icao: 'VOMM', name: 'Chennai International Airport', city: 'Chennai', lat: 12.9941, lon: 80.1709 },
      { code: 'CCU', iata: 'CCU', icao: 'VECC', name: 'Netaji Subhash Chandra Bose Intl Airport', city: 'Kolkata', lat: 22.6520, lon: 88.4463 },
      { code: 'HYD', iata: 'HYD', icao: 'VOHS', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', lat: 17.2403, lon: 78.4294 },
      { code: 'JAI', iata: 'JAI', icao: 'VIJP', name: 'Jaipur International Airport', city: 'Jaipur', lat: 26.8242, lon: 75.8122 },
      { code: 'ATQ', iata: 'ATQ', icao: 'VIAR', name: 'Sri Guru Ram Dass Jee Intl Airport', city: 'Amritsar', lat: 31.7096, lon: 74.7973 }
    ];

    function getDistanceKm(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
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

    const DB_KEY = 'AAI_DEL_AEROSKY_3D_V700';

    const SEED = {
      metrics: { activeFlights:124, passengersToday:42315, bagsProcessed:39200, activeAlerts:2, gatesOccupied:27, totalGates:38, weatherStatus:"Good (Vis 2500m)", systemHealth:"99.8%", onTimePerf:"87.3%", securityCleared:41890, avgCheckIn:"2m 14s" },
      contactInfo: { helpline:"+91 8800344794 (Toll Free)", email:"admin@delhi.aai", address:"Indira Gandhi International Airport, New Delhi – 110037, India" },
      users: [
        { id:"USR-010", name:"AAI Master Admin", email:"admin@delhi.aai", password:"123", role:"Admin", status:"APPROVED", employeeId:"AAI-ADM-001" }
      ],
      flights: [
        { id:"FL-001", flightNumber:"AI-101", airline:"Air India", type:"Departure", destination:"London Heathrow (LHR)", origin:"Delhi (DEL)", scheduledTime:"02:15", estimatedTime:"02:15", terminal:"T3", gate:"T3-G42", status:"Boarding", pax:285, maxPax:324, bags:410, aircraft:"Boeing 787-9 Dreamliner", aiDelayRisk:14, boardingPct:88 },
        { id:"FL-002", flightNumber:"6E-2015", airline:"IndiGo", type:"Departure", destination:"Mumbai (BOM)", origin:"Delhi (DEL)", scheduledTime:"06:30", estimatedTime:"07:15", terminal:"T1", gate:"T1-G05", status:"Delayed", pax:180, maxPax:186, bags:195, aircraft:"Airbus A320neo", aiDelayRisk:82, boardingPct:0 },
        { id:"FL-003", flightNumber:"UK-811", airline:"Vistara", type:"Departure", destination:"Bengaluru (BLR)", origin:"Delhi (DEL)", scheduledTime:"07:00", estimatedTime:"07:00", terminal:"T3", gate:"T3-G32", status:"On Time", pax:162, maxPax:188, bags:175, aircraft:"Airbus A321neo", aiDelayRisk:8, boardingPct:45 },
        { id:"FL-004", flightNumber:"SG-8102", airline:"SpiceJet", type:"Arrival", destination:"Delhi (DEL)", origin:"Jaipur (JAI)", scheduledTime:"08:45", estimatedTime:"08:40", terminal:"T1", gate:"T1-G12", status:"Landed", pax:145, maxPax:189, bags:152, aircraft:"Boeing 737-800", aiDelayRisk:0, boardingPct:100 },
        { id:"FL-005", flightNumber:"EK-511", airline:"Emirates", type:"Arrival", destination:"Delhi (DEL)", origin:"Dubai (DXB)", scheduledTime:"09:15", estimatedTime:"09:20", terminal:"T3", gate:"T3-G55", status:"In Flight", pax:358, maxPax:398, bags:510, aircraft:"Airbus A380-800", aiDelayRisk:12, boardingPct:0 },
        { id:"FL-006", flightNumber:"LH-761", airline:"Lufthansa", type:"Arrival", destination:"Delhi (DEL)", origin:"Frankfurt (FRA)", scheduledTime:"10:30", estimatedTime:"10:25", terminal:"T3", gate:"T3-G48", status:"In Flight", pax:274, maxPax:297, bags:385, aircraft:"Airbus A350-900", aiDelayRisk:5, boardingPct:0 },
        { id:"FL-007", flightNumber:"AI-302", airline:"Air India", type:"Departure", destination:"Chennai (MAA)", origin:"Delhi (DEL)", scheduledTime:"11:00", estimatedTime:"11:00", terminal:"T3", gate:"T3-G28", status:"Check-in Open", pax:95, maxPax:256, bags:78, aircraft:"Boeing 777-300ER", aiDelayRisk:3, boardingPct:0 },
        { id:"FL-008", flightNumber:"QR-571", airline:"Qatar Airways", type:"Arrival", destination:"Delhi (DEL)", origin:"Doha (DOH)", scheduledTime:"04:30", estimatedTime:"04:25", terminal:"T3", gate:"T3-G60", status:"Landed", pax:312, maxPax:335, bags:440, aircraft:"Boeing 787-9", aiDelayRisk:0, boardingPct:100 },
        { id:"FL-009", flightNumber:"SQ-406", airline:"Singapore Airlines", type:"Departure", destination:"Singapore (SIN)", origin:"Delhi (DEL)", scheduledTime:"13:55", estimatedTime:"13:55", terminal:"T3", gate:"T3-G38", status:"Scheduled", pax:0, maxPax:303, bags:0, aircraft:"Airbus A350-900", aiDelayRisk:6, boardingPct:0 },
        { id:"FL-010", flightNumber:"6E-6145", airline:"IndiGo", type:"Departure", destination:"Kolkata (CCU)", origin:"Delhi (DEL)", scheduledTime:"14:20", estimatedTime:"14:20", terminal:"T2", gate:"T2-G08", status:"Scheduled", pax:0, maxPax:186, bags:0, aircraft:"Airbus A320neo", aiDelayRisk:4, boardingPct:0 },
        { id:"FL-011", flightNumber:"BA-256", airline:"British Airways", type:"Departure", destination:"London (LHR)", origin:"Delhi (DEL)", scheduledTime:"15:30", estimatedTime:"15:30", terminal:"T3", gate:"T3-G44", status:"Scheduled", pax:0, maxPax:332, bags:0, aircraft:"Boeing 787-9", aiDelayRisk:9, boardingPct:0 },
        { id:"FL-012", flightNumber:"TK-717", airline:"Turkish Airlines", type:"Arrival", destination:"Delhi (DEL)", origin:"Istanbul (IST)", scheduledTime:"16:10", estimatedTime:"16:15", terminal:"T3", gate:"T3-G51", status:"In Flight", pax:287, maxPax:310, bags:395, aircraft:"Boeing 777-300ER", aiDelayRisk:11, boardingPct:0 }
      ],
      gates: [
        { id:"T1-G01", terminal:"T1", status:"Available", flight:null, type:"Narrowbody", pax:0, compat:"A320/B737" },
        { id:"T1-G05", terminal:"T1", status:"Occupied", flight:"6E-2015", type:"Narrowbody", pax:180, compat:"A320/B737" },
        { id:"T1-G08", terminal:"T1", status:"Available", flight:null, type:"Narrowbody", pax:0, compat:"A320/B737" },
        { id:"T1-G12", terminal:"T1", status:"Occupied", flight:"SG-8102", type:"Narrowbody", pax:145, compat:"A320/B737" },
        { id:"T2-G01", terminal:"T2", status:"Available", flight:null, type:"Narrowbody", pax:0, compat:"A320/A321" },
        { id:"T2-G05", terminal:"T2", status:"Maintenance", flight:null, type:"Narrowbody", pax:0, compat:"A320/A321" },
        { id:"T2-G08", terminal:"T2", status:"Available", flight:null, type:"Narrowbody", pax:0, compat:"A320" },
        { id:"T3-G28", terminal:"T3", status:"Occupied", flight:"AI-302", type:"Widebody", pax:95, compat:"B777/B787" },
        { id:"T3-G32", terminal:"T3", status:"Occupied", flight:"UK-811", type:"Widebody", pax:162, compat:"A321/B787" },
        { id:"T3-G38", terminal:"T3", status:"Available", flight:null, type:"Widebody", pax:0, compat:"A350/B787" },
        { id:"T3-G42", terminal:"T3", status:"Occupied", flight:"AI-101", type:"Widebody", pax:285, compat:"B787/B777" },
        { id:"T3-G44", terminal:"T3", status:"Available", flight:null, type:"Widebody", pax:0, compat:"B787/A350" },
        { id:"T3-G48", terminal:"T3", status:"Reserved", flight:"LH-761", type:"Widebody", pax:0, compat:"A350/B787" },
        { id:"T3-G51", terminal:"T3", status:"Reserved", flight:"TK-717", type:"Widebody", pax:0, compat:"B777/A350" },
        { id:"T3-G55", terminal:"T3", status:"Reserved", flight:"EK-511", type:"Widebody", pax:0, compat:"A380/B747" },
        { id:"T3-G60", terminal:"T3", status:"Occupied", flight:"QR-571", type:"Widebody", pax:312, compat:"B787/A350" }
      ],
      emergencies: [
        { id:"EMG-001", category:"Severe Weather / Fog", severity:"Code Yellow", title:"CAT-III B Low Visibility Protocol Active", location:"DEL Runway 28/10 Threshold", responders:"AAI ATC Tower L8 & CISF ASG", timestamp:"2026-08-04 06:15 IST", status:"ACTIVE", notes:"Dense fog reduced RVR to 150m. CAT-III guidance operational.", escalated:true },
        { id:"EMG-002", category:"Medical Emergency", severity:"Code Blue", title:"Passenger cardiac arrest at T3 Gate 42", location:"Terminal 3, Gate 42 Boarding Area", responders:"DIAL Medical Team, CISF QRT", timestamp:"2026-08-04 07:45 IST", status:"ACTIVE", notes:"68yo male passenger. AED deployed. Ambulance dispatched to airside.", escalated:false },
        { id:"EMG-003", category:"Bird Strike", severity:"Code Green", title:"Bird strike reported on AI-302 during taxi", location:"Taxiway Bravo, near RWY 29", responders:"Wildlife Control, Ground Ops", timestamp:"2026-08-04 05:30 IST", status:"RESOLVED", notes:"Minor impact. Engine inspection completed. Aircraft cleared for ops.", escalated:false },
        { id:"EMG-004", category:"Suspicious Object", severity:"Code Orange", title:"Unattended bag at T1 Security Hold", location:"Terminal 1, Security Hold Area Lane 4", responders:"CISF Bomb Disposal Squad, Dog Squad", timestamp:"2026-08-03 22:10 IST", status:"RESOLVED", notes:"Bag scanned & cleared. Passenger identified and counseled.", escalated:true }
      ],
      baggage: [
        { id:"BAG-001", tagId:"DEL-LHR-88401", pnr:"PNR-DEL-9081", flight:"AI-101", passenger:"Ananya Sharma", origin:"DEL", destination:"LHR", weight:"23.4 kg", status:"Loading", steps:[{loc:"Check-in Counter T3-C12",time:"01:15",done:true},{loc:"Security X-Ray Belt 3",time:"01:28",done:true},{loc:"Sorting Hub A (DEL)",time:"01:45",done:true},{loc:"Loading Bay T3-G42",time:"02:05",done:false},{loc:"Aircraft Cargo Hold",time:"—",done:false}] },
        { id:"BAG-002", tagId:"DEL-BOM-20151", pnr:"PNR-DEL-5512", flight:"6E-2015", passenger:"Rahul Mehta", origin:"DEL", destination:"BOM", weight:"15.2 kg", status:"In Sorting", steps:[{loc:"Check-in Counter T1-C04",time:"05:30",done:true},{loc:"Security X-Ray Belt 1",time:"05:42",done:true},{loc:"Sorting Hub B (DEL)",time:"06:00",done:false},{loc:"Loading Bay T1-G05",time:"—",done:false},{loc:"Aircraft Cargo Hold",time:"—",done:false}] },
        { id:"BAG-003", tagId:"DXB-DEL-51101", pnr:"PNR-EK-7823", flight:"EK-511", passenger:"Ahmed Al-Rashid", origin:"DXB", destination:"DEL", weight:"28.1 kg", status:"In Transit", steps:[{loc:"Loaded at DXB Terminal 3",time:"05:00",done:true},{loc:"In Flight (EK-511)",time:"05:45",done:true},{loc:"Arrival Belt DEL",time:"—",done:false},{loc:"Customs Screening",time:"—",done:false},{loc:"Collection Carousel 7",time:"—",done:false}] },
        { id:"BAG-004", tagId:"DEL-BLR-81105", pnr:"PNR-UK-4491", flight:"UK-811", passenger:"Priya Nair", origin:"DEL", destination:"BLR", weight:"12.8 kg", status:"Loaded", steps:[{loc:"Check-in Counter T3-C08",time:"05:45",done:true},{loc:"Security X-Ray Belt 2",time:"06:01",done:true},{loc:"Sorting Hub A (DEL)",time:"06:18",done:true},{loc:"Loading Bay T3-G32",time:"06:35",done:true},{loc:"Aircraft Cargo Hold",time:"06:42",done:true}] },
        { id:"BAG-005", tagId:"JAI-DEL-81021", pnr:"PNR-SG-6601", flight:"SG-8102", passenger:"Vikram Joshi", origin:"JAI", destination:"DEL", weight:"19.5 kg", status:"Delivered", steps:[{loc:"Loaded at JAI",time:"07:15",done:true},{loc:"In Flight (SG-8102)",time:"07:30",done:true},{loc:"Arrival Belt DEL T1",time:"08:45",done:true},{loc:"Customs Screening",time:"08:52",done:true},{loc:"Collection Carousel 3",time:"08:58",done:true}] },
        { id:"BAG-006", tagId:"DOH-DEL-57101", pnr:"PNR-QR-8812", flight:"QR-571", passenger:"Fatima Hassan", origin:"DOH", destination:"DEL", weight:"31.2 kg", status:"At Carousel", steps:[{loc:"Loaded at DOH Hamad Intl",time:"23:30",done:true},{loc:"In Flight (QR-571)",time:"00:15",done:true},{loc:"Arrival Belt DEL T3",time:"04:30",done:true},{loc:"Customs Screening",time:"04:38",done:true},{loc:"Collection Carousel 11",time:"04:45",done:true}] }
      ],
      lostAndFound: [
        { id:"LF-001", item:"Leather Wallet (Black)", category:"Personal Item", location:"T3 CISF Security Lane B", dateFound:"2026-08-04", status:"UNCLAIMED", description:"Black leather bifold wallet with ICICI debit card and approx ₹2,500 cash.", claimedBy:null },
        { id:"LF-002", item:"Apple iPad Pro 12.9\"", category:"Electronics", location:"T3 Departure Lounge Gate 38", dateFound:"2026-08-04", status:"UNCLAIMED", description:"Space gray iPad Pro with blue Smart Folio case. Locked with passcode.", claimedBy:null },
        { id:"LF-003", item:"Gold Necklace with Ruby Pendant", category:"Jewelry", location:"T1 Ladies Washroom near Gate 08", dateFound:"2026-08-03", status:"CLAIMED", description:"22K gold chain with single ruby pendant. Weight approx 12g.", claimedBy:"Mrs. Sunita Agarwal (PNR: PNR-6E-2201)" },
        { id:"LF-004", item:"Samsonite Carry-on (Red)", category:"Luggage", location:"T3 Arrival Carousel 7", dateFound:"2026-08-03", status:"UNCLAIMED", description:"Red Samsonite hardshell carry-on. Tag partially torn. Contains clothing.", claimedBy:null },
        { id:"LF-005", item:"Child's Stuffed Toy (Elephant)", category:"Personal Item", location:"T2 Play Area", dateFound:"2026-08-04", status:"UNCLAIMED", description:"Grey plush elephant toy, approx 30cm. Well-loved condition.", claimedBy:null },
        { id:"LF-006", item:"Canon EOS R5 Camera Body", category:"Electronics", location:"T3 Duty Free Shopping Area", dateFound:"2026-08-02", status:"CLAIMED", description:"Canon EOS R5 body with RF 24-70mm lens. Serial: 012345678. Found in shopping bag.", claimedBy:"Mr. James Wilson (Passport: GB7891234)" },
        { id:"LF-007", item:"Prescription Glasses (Ray-Ban)", category:"Personal Item", location:"T1 Check-in Counter 12", dateFound:"2026-08-04", status:"UNCLAIMED", description:"Ray-Ban tortoiseshell frame with progressive lenses. Brown leather case.", claimedBy:null },
        { id:"LF-008", item:"HP Laptop Backpack", category:"Luggage", location:"T3 CISF Security Belt 5", dateFound:"2026-08-04", status:"UNCLAIMED", description:"Black HP laptop bag with HP Pavilion laptop, charger, and documents inside.", claimedBy:null }
      ],
      wheelchairRequests: [
        { id:"WC-001", passengerName:"Savitri Devi", airlineName:"Air India", pnrNumber:"PNR-DEL-7781", mobileNumber:"+91 9876543210", timestamp:"08:15 IST", status:"DISPATCHED" },
        { id:"WC-002", passengerName:"Mohammad Iqbal", airlineName:"Emirates", pnrNumber:"PNR-EK-5512", mobileNumber:"+91 8765432109", timestamp:"09:02 IST", status:"COMPLETED" },
        { id:"WC-003", passengerName:"Catherine D'Souza", airlineName:"Vistara", pnrNumber:"PNR-UK-3390", mobileNumber:"+91 7654321098", timestamp:"09:30 IST", status:"PENDING" }
      ],
      cctv: [
        { id:"CAM-001", name:"T3 Main Entrance", location:"Terminal 3, Entry Gate A", status:"ONLINE", peopleCount:342, alerts:0, zone:"Public" },
        { id:"CAM-002", name:"T3 Security Checkpoint", location:"Terminal 3, CISF Security Lane", status:"ONLINE", peopleCount:128, alerts:1, zone:"Restricted" },
        { id:"CAM-003", name:"T1 Departure Gates", location:"Terminal 1, Gates 1-8", status:"ONLINE", peopleCount:215, alerts:0, zone:"Secure" },
        { id:"CAM-004", name:"T3 Baggage Claim", location:"Terminal 3, Carousel Area", status:"ONLINE", peopleCount:89, alerts:0, zone:"Arrival" },
        { id:"CAM-005", name:"Runway 28/10", location:"Airside, Runway Threshold 28", status:"ONLINE", peopleCount:0, alerts:0, zone:"Airside" },
        { id:"CAM-006", name:"T2 Check-in Hall", location:"Terminal 2, Check-in Area", status:"OFFLINE", peopleCount:0, alerts:2, zone:"Public" },
        { id:"CAM-007", name:"T3 Parking Structure P5", location:"Multi-level Parking P5", status:"ONLINE", peopleCount:15, alerts:0, zone:"Public" },
        { id:"CAM-008", name:"ATC Tower Perimeter", location:"ATC Tower Compound", status:"ONLINE", peopleCount:4, alerts:0, zone:"Restricted" },
        { id:"CAM-009", name:"T3 Duty Free Zone", location:"Terminal 3, Duty Free Mall", status:"ONLINE", peopleCount:176, alerts:0, zone:"Secure" }
      ],
      fleetHealth: [
        { id:"FH-001", aircraft:"Boeing 787-9 (VT-ANB)", flight:"AI-101", engine:"98%", hydraulic:"96%", tyre:"88% (Good)", brake:"Optimal", fuel:"99.2%", nextMaint:"2026-08-10", status:"Airworthy" },
        { id:"FH-002", aircraft:"Airbus A320neo (VT-ITE)", flight:"6E-2015", engine:"92%", hydraulic:"88%", tyre:"55% (Moderate)", brake:"Inspect Next", fuel:"97.5%", nextMaint:"2026-08-05", status:"Conditional" },
        { id:"FH-003", aircraft:"Airbus A321neo (VT-TVA)", flight:"UK-811", engine:"96%", hydraulic:"94%", tyre:"82% (Good)", brake:"Good", fuel:"98.8%", nextMaint:"2026-08-15", status:"Airworthy" },
        { id:"FH-004", aircraft:"Boeing 737-800 (VT-SYC)", flight:"SG-8102", engine:"89%", hydraulic:"85%", tyre:"42% (Replace Soon)", brake:"Worn", fuel:"95.1%", nextMaint:"2026-08-06", status:"Needs Attention" },
        { id:"FH-005", aircraft:"Airbus A380-800 (A6-EUG)", flight:"EK-511", engine:"99%", hydraulic:"97%", tyre:"91% (Excellent)", brake:"Optimal", fuel:"99.5%", nextMaint:"2026-08-20", status:"Airworthy" },
        { id:"FH-006", aircraft:"Airbus A350-900 (D-AIXA)", flight:"LH-761", engine:"97%", hydraulic:"95%", tyre:"78% (Good)", brake:"Good", fuel:"98.9%", nextMaint:"2026-08-12", status:"Airworthy" }
      ],
      auditLogs: [
        { id:"LOG-001", timestamp:"2026-08-04 06:15:22 IST", actor:"SYSTEM", action:"SYSTEM_BOOT", details:"AOCC Platform initialized successfully." },
        { id:"LOG-002", timestamp:"2026-08-04 06:16:01 IST", actor:"AAI Master Admin (Admin)", action:"FLIGHT_UPDATE", details:"Updated AI-101 status to Boarding." },
        { id:"LOG-003", timestamp:"2026-08-04 06:20:15 IST", actor:"SYSTEM", action:"EMERGENCY_CREATE", details:"EMG-001: Severe Weather / Fog protocol activated." },
        { id:"LOG-004", timestamp:"2026-08-04 07:45:30 IST", actor:"CISF Lead (CISF-DEL-881)", action:"EMERGENCY_CREATE", details:"EMG-002: Medical emergency at T3 Gate 42." }
      ],
      dutyRosters: [
        { id:"DR-001", userId:"USR-010", name:"AAI Master Admin", role:"Admin", location:"Terminal 3 - Master Command Center", shift:"General Shift (09:00 - 17:00 IST)", status:"ON_DUTY", clockInTime:"09:00 IST" }
      ],
      attendanceLogs: [
        { id:"ATT-001", userId:"USR-010", name:"AAI Master Admin", role:"Admin", date:"2026-08-08", clockIn:"09:00 IST", clockOut:null, status:"PRESENT" }
      ],
      parkingData: {
        rates: {
          fourWheeler: [
            { duration: "0 - 30 mins", rate: 120, label: "Short Term / Express Drop" },
            { duration: "30 mins - 2 hours", rate: 250, label: "Standard Parking" },
            { duration: "2 hours - 4 hours", rate: 400, label: "Extended Parking" },
            { duration: "Up to 24 hours (Full Day)", rate: 600, label: "24-Hour Overnight" }
          ],
          twoWheeler: [
            { duration: "0 - 30 mins", rate: 30, label: "Short Term Drop" },
            { duration: "30 mins - 2 hours", rate: 60, label: "Standard Parking" },
            { duration: "2 hours - 4 hours", rate: 100, label: "Extended Parking" },
            { duration: "Up to 24 hours (Full Day)", rate: 200, label: "24-Hour Overnight" }
          ]
        },
        lots: [
          { id: 'MLCP-T3', name: 'Multi-Level Car Parking (MLCP) - Terminal 3', type: 'Covered Automated', total4w: 4500, filled4w: 3120, reserved4w: 450, total2w: 2000, filled2w: 1240, reserved2w: 210, status: 'OPEN' },
          { id: 'PRK-T1', name: 'Premium Surface Parking - Terminal 1', type: 'Open Air Surface', total4w: 1800, filled4w: 1420, reserved4w: 180, total2w: 1000, filled2w: 680, reserved2w: 90, status: 'OPEN' },
          { id: 'PRK-T2', name: 'Express Car Park - Terminal 2', type: 'Covered Deck', total4w: 2200, filled4w: 1750, reserved4w: 230, total2w: 1200, filled2w: 810, reserved2w: 140, status: 'OPEN' },
          { id: 'VALET-T3', name: 'VIP Valet Parking - T3 Departures', type: 'VIP Valet Service', total4w: 500, filled4w: 410, reserved4w: 65, total2w: 0, filled2w: 0, reserved2w: 0, status: 'OPEN' }
        ],
        reservations: [
          { id: 'RES-PRK-8901', passengerName: 'Rajesh Malhotra', mobile: '+91 9810123456', vehicleType: '4 Wheeler (Car / SUV)', vehicleNumber: 'DL-01-AB-1234', terminal: 'T3', parkingLot: 'Multi-Level Car Parking (MLCP) - Terminal 3', startDate: '2026-08-08', durationHours: 4, slotNumber: 'MLCP-Level 2-B42', amountPaid: 400, paymentStatus: 'SUCCESS', paymentMode: 'UPI (GPay)', timestamp: '2026-08-08 08:30 IST', qrCode: 'PASS-MLCP-T3-DL01AB1234' },
          { id: 'RES-PRK-8902', passengerName: 'Kavita Sundaram', mobile: '+91 9876543210', vehicleType: '2 Wheeler (Scooter / Bike)', vehicleNumber: 'DL-04-XY-9876', terminal: 'T1', parkingLot: 'Premium Surface Parking - Terminal 1', startDate: '2026-08-08', durationHours: 24, slotNumber: 'T1-2W-Slot-18', amountPaid: 200, paymentStatus: 'SUCCESS', paymentMode: 'FASTag Auto-Debit', timestamp: '2026-08-08 07:15 IST', qrCode: 'PASS-T1-2W-DL04XY9876' }
        ],
        vehicleLogs: [
          { id: 'ANPR-1092', timestamp: '2026-08-08 09:12 IST', hoursAgo: 0.2, vehicleNumber: 'DL-01-AB-1234', vehicleType: '4 Wheeler', parkingLot: 'Multi-Level Car Parking (MLCP) - Terminal 3', eventType: 'ENTRY', gateId: 'GATE-T3-ANPR-01', cameraSensor: 'CAM-T3-ENTRY-01 (HD 4K)', confidenceScore: '99.4%', status: 'INSIDE' },
          { id: 'ANPR-1091', timestamp: '2026-08-08 08:45 IST', hoursAgo: 0.7, vehicleNumber: 'HR-26-DQ-5511', vehicleType: '4 Wheeler', parkingLot: 'Multi-Level Car Parking (MLCP) - Terminal 3', eventType: 'EXIT', gateId: 'GATE-T3-ANPR-02', cameraSensor: 'CAM-T3-EXIT-02 (HD 4K)', confidenceScore: '98.9%', status: 'LEFT' },
          { id: 'ANPR-1090', timestamp: '2026-08-08 07:30 IST', hoursAgo: 2.0, vehicleNumber: 'DL-04-XY-9876', vehicleType: '2 Wheeler', parkingLot: 'Premium Surface Parking - Terminal 1', eventType: 'ENTRY', gateId: 'GATE-T1-ANPR-01', cameraSensor: 'CAM-T1-ENTRY-01 (HD 4K)', confidenceScore: '99.7%', status: 'INSIDE' },
          { id: 'ANPR-1089', timestamp: '2026-08-08 05:15 IST', hoursAgo: 4.2, vehicleNumber: 'UP-16-BZ-7700', vehicleType: '4 Wheeler', parkingLot: 'Express Car Park - Terminal 2', eventType: 'ENTRY', gateId: 'GATE-T2-ANPR-01', cameraSensor: 'CAM-T2-ENTRY-01 (HD 4K)', confidenceScore: '99.1%', status: 'INSIDE' },
          { id: 'ANPR-1088', timestamp: '2026-08-07 22:10 IST', hoursAgo: 11.3, vehicleNumber: 'DL-03-CC-4040', vehicleType: '4 Wheeler', parkingLot: 'VIP Valet Parking - T3 Departures', eventType: 'EXIT', gateId: 'GATE-T3-VALET-01', cameraSensor: 'CAM-T3-VALET-02 (HD 4K)', confidenceScore: '99.8%', status: 'LEFT' },
          { id: 'ANPR-1087', timestamp: '2026-08-07 18:40 IST', hoursAgo: 14.8, vehicleNumber: 'HR-51-AK-1122', vehicleType: '4 Wheeler', parkingLot: 'Multi-Level Car Parking (MLCP) - Terminal 3', eventType: 'ENTRY', gateId: 'GATE-T3-ANPR-01', cameraSensor: 'CAM-T3-ENTRY-01 (HD 4K)', confidenceScore: '98.5%', status: 'INSIDE' },
          { id: 'ANPR-1086', timestamp: '2026-08-07 12:00 IST', hoursAgo: 21.4, vehicleNumber: 'DL-08-EV-9900', vehicleType: '4 Wheeler', parkingLot: 'Multi-Level Car Parking (MLCP) - Terminal 3', eventType: 'EXIT', gateId: 'GATE-T3-ANPR-02', cameraSensor: 'CAM-T3-EXIT-02 (HD 4K)', confidenceScore: '99.9%', status: 'LEFT' },
          { id: 'ANPR-1085', timestamp: '2026-08-06 15:30 IST', hoursAgo: 41.9, vehicleNumber: 'UK-07-TA-3344', vehicleType: '4 Wheeler', parkingLot: 'Express Car Park - Terminal 2', eventType: 'ENTRY', gateId: 'GATE-T2-ANPR-01', cameraSensor: 'CAM-T2-ENTRY-01 (HD 4K)', confidenceScore: '99.2%', status: 'INSIDE' }
        ]
      },
      cabBookings: [
        { id: 'OLA-9081', passengerName: 'Aman Verma', mobile: '+91 9988776655', pickupPoint: 'Terminal 3 - Arrival Gate 4 (MLCP Taxi Hub)', dropLocation: 'Connaught Place, Central Delhi', cabCategory: 'Ola Sedan', fare: 450, status: 'REDIRECTED_TO_OLA', timestamp: '09:00 IST' },
        { id: 'OLA-9082', passengerName: 'Dr. Meera Sen', mobile: '+91 9711224466', pickupPoint: 'Terminal 1 - Arrival Exit Gate 2', dropLocation: 'Cyber City, Gurugram', cabCategory: 'Ola SUV', fare: 680, status: 'REDIRECTED_TO_OLA', timestamp: '09:04 IST' }
      ]
    };

        function loadDB() {
      try {
        const d = localStorage.getItem(DB_KEY);
        if (d) {
          const parsed = JSON.parse(d);
          if (parsed && typeof parsed === 'object' && Array.isArray(parsed.terminals) && Array.isArray(parsed.flights)) {
            return {
              ...SEED,
              ...parsed,
              metrics: { ...SEED.metrics, ...(parsed.metrics || {}) },
              terminals: (parsed.terminals && parsed.terminals.length > 0) ? parsed.terminals : SEED.terminals,
              gates: (parsed.gates && parsed.gates.length > 0) ? parsed.gates : SEED.gates,
              runways: (parsed.runways && parsed.runways.length > 0) ? parsed.runways : SEED.runways,
              shops: (parsed.shops && parsed.shops.length > 0) ? parsed.shops : SEED.shops,
              flights: (parsed.flights && parsed.flights.length > 0) ? parsed.flights : SEED.flights,
              emergencies: Array.isArray(parsed.emergencies) ? parsed.emergencies : SEED.emergencies,
              wheelchairRequests: Array.isArray(parsed.wheelchairRequests) ? parsed.wheelchairRequests : SEED.wheelchairRequests,
              lostFoundItems: Array.isArray(parsed.lostFoundItems) ? parsed.lostFoundItems : SEED.lostFoundItems,
              auditLogs: Array.isArray(parsed.auditLogs) ? parsed.auditLogs : SEED.auditLogs,
              users: (Array.isArray(parsed.users) && parsed.users.length > 0) ? parsed.users : SEED.users,
              cabBookings: Array.isArray(parsed.cabBookings) ? parsed.cabBookings : SEED.cabBookings,
              parkingData: {
                ...SEED.parkingData,
                ...(typeof parsed.parkingData === 'object' ? parsed.parkingData : {}),
                lots: (parsed.parkingData?.lots && Array.isArray(parsed.parkingData.lots)) ? parsed.parkingData.lots : SEED.parkingData.lots,
                rates: parsed.parkingData?.rates || SEED.parkingData.rates,
                reservations: Array.isArray(parsed.parkingData?.reservations) ? parsed.parkingData.reservations : SEED.parkingData.reservations,
                vehicleLogs: (parsed.parkingData?.vehicleLogs && Array.isArray(parsed.parkingData.vehicleLogs)) ? parsed.parkingData.vehicleLogs : SEED.parkingData.vehicleLogs
              }
            };
          }
        }
      } catch(e) {
        console.warn("Corrupted localStorage detected, resetting key", e);
        try { localStorage.removeItem(DB_KEY); } catch(err) {}
      }
      const fresh = JSON.parse(JSON.stringify(SEED));
      try { try { localStorage.setItem(DB_KEY, JSON.stringify(fresh)); } catch(e){} } catch(e){}
      return fresh;
    }
    function saveDB(db) { try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch(e){} }


    // ═══════════════════════════════════════════════════════
    // MAIN APP
    // ═══════════════════════════════════════════════════════


    // ═══════════════════════════════════════════════════════
    // AI CHAT BOT ASSISTANT COMPONENT
    // ═══════════════════════════════════════════════════════

    
    // ═══════════════════════════════════════════════════════
    // FLOATING WAIT TIMES BAR COMPONENT
    // ═══════════════════════════════════════════════════════
    function FloatingWaitTimesBar({ activeAirport }) {
      const [isExpanded, setIsExpanded] = useState(false);
      const [waitData] = useState({
        T3: { security: 12, checkin: 9, digiyatra: 2, immigration: 14, status: 'Moderate' },
        T2: { security: 8, checkin: 6, digiyatra: 1, immigration: 0, status: 'Low Wait' },
        T1: { security: 15, checkin: 11, digiyatra: 3, immigration: 0, status: 'Peak Flow' }
      });

      const getBadgeStyle = (minutes) => {
        if (minutes <= 5) return { background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.4)' };
        if (minutes <= 12) return { background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.4)' };
        return { background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid rgba(248, 113, 113, 0.4)' };
      };

      return (
        <div className="floating-wait-times-bar" style={{
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
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '10px', height: '10px', borderRadius: '50%', background: '#10b981',
              boxShadow: '0 0 10px #10b981', animation: 'pulse 2s infinite'
            }}></div>
            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#f8fafc', letterSpacing: '0.02em' }}>
              ⏱️ Live Terminal Queue Telemetry:
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--brand-cyan)', fontWeight: 600 }}>
              {activeAirport ? activeAirport.code : 'DEL'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            {Object.entries(waitData).map(([term, data]) => (
              <div key={term} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{term}:</span>
                <span style={{
                  padding: '0.15rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700,
                  ...getBadgeStyle(data.security)
                }}>
                  Sec {data.security}m
                </span>
                <span style={{
                  padding: '0.15rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700,
                  background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)'
                }}>
                  🚀 DigiYatra {data.digiyatra}m
                </span>
              </div>
            ))}
          </div>

          <button 
            className="btn btn-secondary" 
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem', borderRadius: '6px' }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide Details ▲' : 'View Breakdown ▼'}
          </button>

          {isExpanded && (
            <div style={{
              width: '100%',
              marginTop: '0.5rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '0.75rem'
            }}>
              {Object.entries(waitData).map(([term, data]) => (
                <div key={term} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '0.6rem 0.8rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <div style={{ fontWeight: 700, color: 'var(--brand-cyan)', marginBottom: '0.3rem', fontSize: '0.85rem' }}>
                    {term} Full Terminal Wait Times
                  </div>
                  <div style={{ fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', margin: '0.2rem 0' }}>
                    <span>Security Checkpoint:</span>
                    <span style={{ fontWeight: 700 }}>{data.security} mins</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', margin: '0.2rem 0' }}>
                    <span>Airline Check-In:</span>
                    <span style={{ fontWeight: 700 }}>{data.checkin} mins</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', margin: '0.2rem 0' }}>
                    <span>DigiYatra Express:</span>
                    <span style={{ fontWeight: 700, color: '#38bdf8' }}>{data.digiyatra} mins</span>
                  </div>
                  {data.immigration > 0 && (
                    <div style={{ fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', margin: '0.2rem 0' }}>
                      <span>Immigration Control:</span>
                      <span style={{ fontWeight: 700 }}>{data.immigration} mins</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    
    function AeroSkyAiBot({ db, setActiveTab, activeAirport, isAdmin }) {
      const [isOpen, setIsOpen] = useState(false);
      const [showKeyModal, setShowKeyModal] = useState(false);
      const [apiKey, setApiKey] = useState(() => {
        try { return localStorage.getItem('AEROSKY_GEMINI_KEY') || ''; } catch(e){ return ''; }
      });
      const [tempKeyInput, setTempKeyInput] = useState('');
      const [inputMsg, setInputMsg] = useState('');
      const [isTyping, setIsTyping] = useState(false);
      const messagesEndRef = useRef(null);

      const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
      const aptCode = activeAirport?.code || 'DEL';

      const [messages, setMessages] = useState([
        {
          id: 'welcome-1',
          sender: 'bot',
          text: `👋 Namaste! I'm **AeroSky ✈️✨**, your cute 3D AI Flight & Airport Buddy for **${aptName} (${aptCode})**!\n\nI can answer **ANY question in the world**! Ask me about live flights, parking charges, Delhi Metro, Ola cabs, math, science, travel tips, or general trivia!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickActions: [
            { label: '✈️ Flight Status', query: 'What is my flight status?' },
            { label: '🅿️ Parking Charges', query: 'How much are the car parking rates?' },
            { label: '🚇 Metro Timings', query: 'When is the next Delhi Metro train?' },
            { label: '🚕 Book Ola Cab', query: 'How do I book an Ola Cab?' },
            { label: '🧠 General Knowledge', query: 'What is the speed of light?' }
          ]
        }
      ]);

      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };

      useEffect(() => {
        if (isOpen) scrollToBottom();
      }, [messages, isOpen, isTyping]);

      const saveApiKey = (e) => {
        e.preventDefault();
        const keyClean = tempKeyInput.trim();
        setApiKey(keyClean);
        try {
          if (keyClean) {
            localStorage.setItem('AEROSKY_GEMINI_KEY', keyClean);
          } else {
            localStorage.removeItem('AEROSKY_GEMINI_KEY');
          }
        } catch(err){}
        setShowKeyModal(false);
      };

      const handleSendMessage = async (textToSend) => {
        const query = (textToSend || inputMsg).trim();
        if (!query) return;

        const userMsg = {
          id: `usr-${Date.now()}`,
          sender: 'user',
          text: query,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        if (!textToSend) setInputMsg('');
        setIsTyping(true);

        if (apiKey) {
          try {
            const apiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: `You are AeroSky ✈️✨, a cute airport AI buddy for Indira Gandhi International Airport (DEL). Answer this user question accurately, helpfully and politely: ${query}` }] }]
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
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }]);
              return;
            }
          } catch(err) {
            console.warn("API Call Error, falling back to Universal Engine", err);
          }
        }

        setTimeout(() => {
          const botResponse = generateUniversalAiAnswer(query, db, setActiveTab, aptName, aptCode);
          setIsTyping(false);
          setMessages(prev => [...prev, botResponse]);
        }, 900);
      };

      const generateUniversalAiAnswer = (q, db, setActiveTab, aptName, aptCode) => {
        const qLower = q.toLowerCase();
        const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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
          } catch(e){}
        }

        if (qLower.includes('flight') || qLower.includes('gate') || qLower.includes('status') || qLower.includes('terminal')) {
          const topFlight = db?.flights?.[0] || { flightNumber: 'AI-101', destination: 'London (LHR)', status: 'Boarding', gate: 'T3-G42', scheduledTime: '14:30' };
          return {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `✈️ **Live Flight Status — ${aptName} (${aptCode})**\n\n• **Active Flights Monitored**: ${db?.metrics?.activeFlights || 142} Flights\n• **On-Time Performance**: ${db?.metrics?.onTimePerf || '94.2%'}\n• **Sample Flight**: ${topFlight.flightNumber} to ${topFlight.destination} is **${topFlight.status}** at **Gate ${topFlight.gate || 'T3-G42'}** (${topFlight.scheduledTime}).`,
            timestamp: nowTime,
            actionBtn: { label: '📋 Open Live Flight Board', tab: 'flights' }
          };
        }

        if (qLower.includes('parking') || qLower.includes('car') || qLower.includes('rate') || qLower.includes('slot') || qLower.includes('park')) {
          return {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `🅿️ **Car Parking Rates & AI ANPR Availability**\n\n• **4-Wheeler (Car/SUV)**: ₹120 (0-30m) | ₹250 (1-2h) | ₹400 (2-4h) | ₹600 (Daily)\n• **2-Wheeler**: ₹30 (1h) | ₹60 (2h) | ₹100 (4h) | ₹200 (Daily)\n• **Locations**: MLCP T3, T2 & T1 Surface Parking.\n• **Features**: FASTag Auto-Debit & 48h AI Vehicle Entry Logs.`,
            timestamp: nowTime,
            actionBtn: { label: '🎟️ Reserve Parking Slot Now', tab: 'carParking' }
          };
        }

        if (qLower.includes('metro') || qLower.includes('train') || qLower.includes('orange line')) {
          return {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `🚇 **Delhi Metro Express Line (Orange Line)**\n\n• **Airport Station**: Connected directly via underground concourse to T3.\n• **Next Departure**: ⏱️ **2 mins** (Frequency: Every 10 mins)\n• **ETAs & Fares**: Aerocity 3m (₹20) | Dhaula Kuan 11m (₹40) | New Delhi Station 19m (₹60).`,
            timestamp: nowTime,
            actionBtn: { label: '🚆 View Ground Transit Map', tab: 'map' }
          };
        }

        if (qLower.includes('ola') || qLower.includes('cab') || qLower.includes('taxi') || qLower.includes('ride')) {
          return {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `🚕 **Ola Airport Cab Booking**\n\n• **Pickup Zone**: T3 MLCP Level 2 Cab Hub & T1 Express Pickup Lane 3.\n• **Options**: Ola Mini (₹350 est), Sedan (₹450 est), SUV Prime (₹650 est).\n• **Google Maps**: Live location search integrated.`,
            timestamp: nowTime,
            actionBtn: { label: '🚕 Open Ola Cab Booking', tab: 'olaCab' }
          };
        }

        if (qLower.includes('digiyatra') || qLower.includes('face') || qLower.includes('biometric')) {
          return {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `🪪 **DigiYatra Face Recognition Entry**\n\n• Skip queues using paperless face ID gates at T3 & T1 Departure Gates 1, 2, 3.\n• Clearance Time: Under 5 seconds!`,
            timestamp: nowTime,
            actionBtn: { label: '🪪 View DigiYatra Pass', tab: 'digiyatra' }
          };
        }

        if (qLower.includes('wheelchair') || qLower.includes('handicap') || qLower.includes('assistance')) {
          return {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `♿ **PRM Wheelchair & Mobility Assistance**\n\n• Free wheelchair assistants available at all Terminal Curbsides.\n• Dispatch Time: 4 mins average.`,
            timestamp: nowTime,
            actionBtn: { label: '♿ Request Wheelchair Assistance', tab: 'wheelchair' }
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
          text: `✈️✨ **AeroSky Universal AI Assistant**:\n\nI can answer **ANY question in the world**!\n\n• Ask about flights, gates, parking charges, or Ola cabs.\n• Ask general knowledge questions (math, science, geography, trivia).\n\n*(Optional: Click the ⚙️ Key button above to enter a Google Gemini API Key for live AI reasoning!)*`,
          timestamp: nowTime
        };
      };

      return (
        <div className="ai-bot-floating-container">
          {showKeyModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              padding: '1rem'
            }}>
              <div style={{
                background: '#0f172a',
                border: '1px solid rgba(0, 242, 254, 0.4)',
                borderRadius: '16px',
                padding: '1.5rem',
                maxWidth: '420px',
                width: '100%',
                color: '#fff',
                boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
              }}>
                <h3 style={{ color: '#00f2fe', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  ⚙️ Google Gemini API Key
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '1rem' }}>
                  Optional: Enter your Google Gemini API Key to enable live LLM intelligence for any question in the world!
                </p>
                <form onSubmit={saveApiKey}>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="AIzaSy..."
                    value={tempKeyInput}
                    onChange={(e) => setTempKeyInput(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', marginBottom: '1rem', borderRadius: '8px' }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowKeyModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      💾 Save Key
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {isOpen && (
            <div className="ai-bot-drawer">
              <div style={{
                padding: '0.9rem 1rem',
                background: 'linear-gradient(135deg, #002B5C 0%, #001530 100%)',
                color: '#fff',
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(0, 242, 254, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00f2fe, #0284c7)',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    boxShadow: '0 0 10px rgba(0, 242, 254, 0.6)'
                  }}>
                    ✈️
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff' }}>AeroSky ✈️✨</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                      Cute AI Flight & Airport Buddy • {aptCode}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  {isAdmin && (
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', color: 'var(--accent-cyan)', borderColor: 'rgba(255,255,255,0.2)' }}
                    onClick={() => { setTempKeyInput(apiKey); setShowKeyModal(true); }}
                    title="API Key Configuration (Admin Only)"
                  >
                    ⚙️ Key
                  </button>
                )}
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.85rem', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
                    onClick={() => setIsOpen(false)}
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div style={{
                flex: 1,
                padding: '1rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                background: 'rgba(0,0,0,0.15)'
              }}>
                {messages.map(m => (
                  <div
                    key={m.id}
                    style={{
                      alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '88%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.3rem'
                    }}
                  >
                    <div style={{
                      padding: '0.75rem 0.9rem',
                      borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                      background: m.sender === 'user'
                        ? 'linear-gradient(135deg, #00f2fe, #0284c7)'
                        : 'rgba(255,255,255,0.08)',
                      color: m.sender === 'user' ? '#000' : 'var(--text-main)',
                      border: m.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                      fontSize: '0.82rem',
                      lineHeight: '1.45',
                      boxShadow: m.sender === 'user' ? '0 4px 12px rgba(0,242,254,0.3)' : '0 2px 8px rgba(0,0,0,0.2)'
                    }}>
                      <div style={{ whiteSpace: 'pre-wrap', fontWeight: m.sender === 'user' ? 600 : 400 }}>{m.text}</div>

                      {m.actionBtn && (
                        <button
                          className="btn btn-primary"
                          style={{
                            marginTop: '0.6rem',
                            width: '100%',
                            fontSize: '0.75rem',
                            padding: '0.45rem',
                            fontWeight: 800,
                            justify: 'center'
                          }}
                          onClick={() => {
                            setActiveTab(m.actionBtn.tab);
                            setIsOpen(false);
                          }}
                        >
                          {m.actionBtn.label} →
                        </button>
                      )}
                    </div>

                    {m.quickActions && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.3rem' }}>
                        {m.quickActions.map((qa, idx) => (
                          <button
                            key={idx}
                            className="btn btn-secondary"
                            style={{
                              fontSize: '0.68rem',
                              padding: '0.25rem 0.55rem',
                              borderRadius: '12px',
                              borderColor: 'rgba(0,242,254,0.4)',
                              color: 'var(--accent-cyan)',
                              background: 'rgba(0,242,254,0.06)'
                            }}
                            onClick={() => handleSendMessage(qa.query)}
                          >
                            {qa.label}
                          </button>
                        ))}
                      </div>
                    )}

                    <div style={{
                      fontSize: '0.62rem',
                      color: 'var(--text-muted)',
                      alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                      padding: '0 0.2rem'
                    }}>
                      {m.timestamp}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div style={{
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
                  }}>
                    ✈️✨ AeroSky is thinking...
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(0,0,0,0.3)',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center'
                }}
              >
                <input
                  className="form-input"
                  placeholder="Ask AeroSky any question in the world..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  style={{ fontSize: '0.8rem', padding: '0.6rem 0.8rem', borderRadius: '20px' }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    fontSize: '1rem',
                    flexShrink: 0
                  }}
                  title="Send Message"
                >
                  🚀
                </button>
              </form>
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <button
              className="ai-3d-bot-launcher"
              onClick={() => setIsOpen(!isOpen)}
              title="Open AeroSky 3D AI Assistant"
            >
              <div className="cute-sparkle-badge">AeroSky</div>
              <svg width="42" height="42" viewBox="0 0 100 100" fill="none">
                <defs>
                  <linearGradient id="planeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#00f2fe" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                  <linearGradient id="wingGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="44" stroke="#00f2fe" strokeWidth="2.5" strokeDasharray="8 6" opacity="0.85" />
                <circle cx="22" cy="72" r="4.5" fill="#f59e0b" />
                <circle cx="16" cy="78" r="3" fill="#00f2fe" />
                <path d="M78 22 C82 18, 86 20, 82 26 L56 52 L54 78 L44 84 L46 62 L26 82 L18 80 L32 54 L14 44 L18 36 L40 44 L64 20 Z" fill="url(#planeGrad1)" />
                <path d="M52 46 L76 22 L68 18 L44 38 Z" fill="url(#wingGrad1)" opacity="0.9" />
                <circle cx="68" cy="30" r="2.5" fill="#10b981" />
                <circle cx="73" cy="27" r="2.5" fill="#10b981" />
              </svg>
            </button>
          </div>
        </div>
      );
    }


function App() {
      const [db, setDb] = useState(loadDB());
      const [lang, setLang] = useState('en');
      const [activeAirport, setActiveAirport] = useState(AAI_AIRPORTS[0]); // default Delhi
      const [isGpsDetected, setIsGpsDetected] = useState(false);
      const [theme, setTheme] = useState('dark');
      const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
      const [activeTab, setActiveTab] = useState('dashboard');
      const [toasts, setToasts] = useState([]);
      const [searchQuery, setSearchQuery] = useState('');
      const [currentUser, setCurrentUser] = useState(null);
      const [showAuthModal, setShowAuthModal] = useState(false);
      const [showProfileModal, setShowProfileModal] = useState(false);
      const [showContactModal, setShowContactModal] = useState(false);
      const [showWheelchairModal, setShowWheelchairModal] = useState(false);
      const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
      const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;

      useEffect(() => { saveDB(db); }, [db]);
      useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

      const detectDeviceLocation = useCallback(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const uLat = pos.coords.latitude;
              const uLon = pos.coords.longitude;
              let closest = AAI_AIRPORTS[0];
              let minDist = Infinity;
              AAI_AIRPORTS.forEach(apt => {
                const dist = getDistanceKm(uLat, uLon, apt.lat, apt.lon);
                if (dist < minDist) {
                  minDist = dist;
                  closest = { ...apt, distKm: dist };
                }
              });
              setActiveAirport(closest);
              setIsGpsDetected(true);
              addToast(`📍 GPS Auto-Detected: Nearest AAI Airport is ${closest.name} (${closest.code}) — ${closest.distKm} km away.`, 'success');
            },
            (err) => {
              console.log("Geolocation fallback to Delhi", err);
            },
            { timeout: 8000 }
          );
        }
      }, []);

      useEffect(() => {
        detectDeviceLocation();
        const timer = setInterval(() => {
          setCurrentTime(new Date().toLocaleTimeString());
          setDb(prev => ({...prev, metrics:{...prev.metrics, passengersToday:prev.metrics.passengersToday+Math.floor(Math.random()*3), bagsProcessed:prev.metrics.bagsProcessed+Math.floor(Math.random()*2)}}));
        }, 5000);
        return () => clearInterval(timer);
      }, [detectDeviceLocation]);

      const addToast = (msg, type='info') => { const id=Date.now(); setToasts(p=>[...p,{id,msg,type}]); setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),4000); };
      const appendAuditLog = (action, details) => {
        const log = { id:`LOG-${Date.now().toString().slice(-4)}`, timestamp:new Date().toLocaleString()+' IST', actor:currentUser?`${currentUser.name} (${currentUser.role})`:'Anonymous', action, details };
        setDb(prev=>({...prev, auditLogs:[log,...prev.auditLogs]}));
      };

      // Auth System with 2-Step Face Verification Password Reset (No OTP)
      const [authMode, setAuthMode] = useState('staff'); // 'staff' | 'admin' | 'register' | 'forgot'
      const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
      const [regForm, setRegForm] = useState({ name: '', employeeId: '', email: '', mobile: '', role: 'Staff', password: '', confirmPassword: '' });
      
      const [forgotState, setForgotState] = useState({
        step: 1, // 1: ID & Proof, 2: Face Capture, 3: Password Set (if approved)
        identifier: '',
        docName: '',
        faceData: null,
        captured: false,
        newPassword: ''
      });

      const handleStaffLogin = (e) => {
        e.preventDefault();
        const idClean = loginForm.identifier.toLowerCase().trim();
        const found = db.users.find(u =>
          (u.email.toLowerCase() === idClean || (u.employeeId && u.employeeId.toLowerCase() === idClean)) &&
          u.password === loginForm.password
        );
        if (!found) { addToast('Invalid Staff Credentials', 'danger'); return; }
        if (found.role !== 'Staff' && found.role !== 'Admin') { addToast('Only Staff accounts can log in here', 'danger'); return; }
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
        setLoginForm({ identifier: '', password: '' });
        appendAuditLog('STAFF_LOGIN', `${found.name} (${found.role}) logged in.`);
        addToast(`Welcome Staff Member, ${found.name}!`, 'success');
      };

      const handleAdminLogin = (e) => {
        e.preventDefault();
        const idClean = loginForm.identifier.toLowerCase().trim();
        const found = db.users.find(u =>
          (u.email.toLowerCase() === idClean || (u.employeeId && u.employeeId.toLowerCase() === idClean)) &&
          u.password === loginForm.password
        );
        if (!found || found.role !== 'Admin') { addToast('Invalid Admin Credentials', 'danger'); return; }
        setCurrentUser(found);
        setShowAuthModal(false);
        setLoginForm({ identifier: '', password: '' });
        appendAuditLog('ADMIN_LOGIN', `${found.name} logged in as Master Admin.`);
        addToast(`Welcome AAI Master Admin, ${found.name}!`, 'success');
      };

      const handleRegister = (e) => {
        e.preventDefault();
        if (regForm.password !== regForm.confirmPassword) {
          addToast('Passwords do not match', 'warning'); return;
        }
        if (db.users.some(u => u.email.toLowerCase() === regForm.email.toLowerCase().trim())) {
          addToast('Email already registered', 'warning'); return;
        }
        const newUser = {
          id: `USR-${Date.now().toString().slice(-4)}`,
          name: regForm.name,
          email: regForm.email,
          mobile: regForm.mobile,
          employeeId: regForm.employeeId || `STF-DEL-${Date.now().toString().slice(-3)}`,
          role: 'Staff',
          password: regForm.password,
          status: 'PENDING_APPROVAL'
        };
        setDb(prev => ({ ...prev, users: [...prev.users, newUser] }));
        appendAuditLog('USER_REGISTER', `New Staff registration submitted: ${newUser.name} (${newUser.email})`);
        addToast('Registration Submitted! Your account is PENDING ADMIN APPROVAL before first login.', 'success');
        setAuthMode('staff');
        setLoginForm({ identifier: newUser.email, password: '' });
      };

      const handleForgotStep1 = (e) => {
        e.preventDefault();
        const idClean = forgotState.identifier.toLowerCase().trim();
        const found = db.users.find(u => u.email.toLowerCase() === idClean || u.mobile === idClean || (u.employeeId && u.employeeId.toLowerCase() === idClean));
        if (!found) { addToast('No account found with this Email / Mobile / Employee ID', 'danger'); return; }
        if (found.status === 'BLOCKED') {
          addToast('🛑 Account is BLOCKED by Admin. Contact AAI Master Admin to unblock.', 'danger'); return;
        }
        if (found.status === 'RESET_APPROVED') {
          setForgotState(prev => ({ ...prev, step: 3 }));
          addToast('✅ Verification approved by Admin! Enter your new password below.', 'success');
          return;
        }
        setForgotState(prev => ({ ...prev, step: 2 }));
        addToast('Identity details verified! Proceed to Live Face Scan Capture.', 'info');
      };

      const handleCaptureFace = () => {
        setForgotState(prev => ({ ...prev, captured: true, faceData: 'VERIFIED_BIOMETRIC_FACE_SNAPSHOT' }));
        addToast('📸 Live Biometric Face Snapshot Captured & Encrypted!', 'success');
      };

      const handleForgotSubmitRequest = (e) => {
        e.preventDefault();
        if (!forgotState.captured) {
          addToast('Please capture your live face scan before submitting', 'warning'); return;
        }
        const idClean = forgotState.identifier.toLowerCase().trim();
        setDb(prev => ({
          ...prev,
          users: prev.users.map(u => (u.email.toLowerCase() === idClean || u.mobile === idClean || (u.employeeId && u.employeeId.toLowerCase() === idClean)) ? {
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
        setForgotState({ step: 1, identifier: '', docName: '', faceData: null, captured: false, newPassword: '' });
      };

      const handleResetPasswordFinal = (e) => {
        e.preventDefault();
        if (!forgotState.newPassword) { addToast('Password cannot be empty', 'warning'); return; }
        const idClean = forgotState.identifier.toLowerCase().trim();
        setDb(prev => ({
          ...prev,
          users: prev.users.map(u => (u.email.toLowerCase() === idClean || u.mobile === idClean || (u.employeeId && u.employeeId.toLowerCase() === idClean)) ? {
            ...u,
            password: forgotState.newPassword,
            status: 'APPROVED',
            resetRequest: null
          } : u)
        }));
        appendAuditLog('PASSWORD_RESET_COMPLETE', `Password updated & account activated for ${forgotState.identifier}`);
        addToast('✅ Password changed successfully! You can now log in with your new password.', 'success');
        setAuthMode('staff');
        setLoginForm({ identifier: forgotState.identifier, password: forgotState.newPassword });
        setForgotState({ step: 1, identifier: '', docName: '', faceData: null, captured: false, newPassword: '' });
      };

      // Password Change Self Handler (For logged in Staff / Admin)
      const [showPwdSection, setShowPwdSection] = useState(false);
      const [changePwdForm, setChangePwdForm] = useState({ currentPwd: '', newPwd: '', confirmPwd: '' });

      const handleChangeOwnPassword = (e) => {
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

        const updatedUsers = db.users.map(u => u.id === currentUser.id ? { ...u, password: changePwdForm.newPwd } : u);
        setDb(prev => ({ ...prev, users: updatedUsers }));
        setCurrentUser(prev => ({ ...prev, password: changePwdForm.newPwd }));
        appendAuditLog('PASSWORD_CHANGE_SELF', `${currentUser.name} (${currentUser.role}) updated their account password.`);
        addToast('✅ Password changed successfully!', 'success');
        setChangePwdForm({ currentPwd: '', newPwd: '', confirmPwd: '' });
        setShowPwdSection(false);
      };

      // Wheelchair
      const [wcForm, setWcForm] = useState({passengerName:'',airlineName:'Air India',pnrNumber:'',mobileNumber:''});
      const handleWcSubmit = (e) => {
        e.preventDefault();
        const req = {id:`WC-${Date.now().toString().slice(-3)}`,...wcForm,timestamp:new Date().toLocaleTimeString()+' IST',status:'DISPATCHED'};
        setDb(prev=>({...prev,wheelchairRequests:[req,...prev.wheelchairRequests]}));
        appendAuditLog('WHEELCHAIR_DISPATCH',`Wheelchair for ${wcForm.passengerName}`);
        setShowWheelchairModal(false); setWcForm({passengerName:'',airlineName:'Air India',pnrNumber:'',mobileNumber:''});
        addToast('♿ Wheelchair Dispatched!','success');
      };

      const isAdmin = currentUser?.role==='Admin';
      const isStaff = currentUser?.role==='Staff';
      const isStaffOrAdmin = isAdmin || isStaff;

      const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

      const sidebarItems = [
        {key:'dashboard',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>,label:t('dashboard')},
        {key:'map',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>,label:t('airportMap')},
        {key:'flights',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l6 4-4 4-2.8-.9c-.4-.1-.8.1-1 .5L1 17l4 2.2L7.2 23l1.4-.2c.4-.2.6-.6.5-1l-.9-2.8 4-4 4 6l1.2-.7c.4-.2.7-.6.6-1.1z"/></svg>,label:t('flightFids')},
        {key:'gates',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22v-9"/><path d="M15.17 2.38a1 1 0 0 0-1.06.66l-2.07 6A1 1 0 0 1 11.1 9.7l-4.58-1a1 1 0 0 0-1.18.77l-1 4.54a1 1 0 0 0 .78 1.18l4.58 1a1 1 0 0 1 .66 1.05l-2 6a1 1 0 0 0 1 1.3h4a1 1 0 0 0 .95-.68l2.06-6a1 1 0 0 1 .95-.66h5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-4a1 1 0 0 1-1-.68l-1.06-3a1 1 0 0 0-1.9-.3z"/></svg>,label:t('intelligentGates')},
        {key:'carParking',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>,label:t('carParking')},
        {key:'cabBooking',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2 11 2 11.3 2 11.6V16c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>,label:t('cabBooking')},
        {key:'emergency',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h4l2-9 5 18 3-9h6"/></svg>,label:t('emergencies')},
        {key:'baggage',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7h-3V4c0-1.1-.9-2-2-2h-6c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z"/><path d="M9 7V4h6v3"/><line x1="8" y1="11" x2="8" y2="18"/><line x1="16" y1="11" x2="16" y2="18"/><line x1="12" y1="11" x2="12" y2="18"/></svg>,label:t('baggage')},
        {key:'lostFound',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,label:t('lostFound')},
        {key:'wheelchair',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="16" r="5"/><path d="M15 19H8"/><path d="M8 11h6.5a2.5 2.5 0 0 1 0 5H13"/><path d="M16 5h3"/><path d="M16 5v6"/></svg>,label:t('wheelchair')}
      ];

      if (isStaffOrAdmin) {
        sidebarItems.splice(5, 0, {key:'fleetHealth',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,label:t('fleetHealth')});
        sidebarItems.splice(7, 0, {key:'cctv',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15.6 11.6L22 7v10l-6.4-4.5v-1z"/><rect x="2" y="5" width="14" height="14" rx="2" ry="2"/></svg>,label:t('cctv')});
        sidebarItems.push({key:'dutyRoster',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,label:t('dutyRoster')});
      }

      if (isAdmin) {
        sidebarItems.push({
          key:'adminCommand',
          icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
          label:t('adminConsole')
        });
      }

      return (
        <div className="app-container" data-theme={theme}>
          {/* SIDEBAR */}
          <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <div className="brand" onClick={() => setActiveTab('dashboard')} style={{cursor:'pointer'}}>
              <div className="brand-logo">A</div>
              {!isSidebarCollapsed && <span>AeroPulse OS</span>}
            </div>

            <nav className="sidebar-nav">
              {sidebarItems.map(item => (
                <a
                  key={item.key}
                  href="#"
                  className={`nav-link ${activeTab === item.key ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActiveTab(item.key); }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!isSidebarCollapsed && <span className="nav-label">{item.label}</span>}
                </a>
              ))}
            </nav>

            {/* ANIMATED THEME SWITCHER AT BOTTOM OF LEFT SIDEBAR */}
            <div className="sidebar-theme-panel" style={{ alignItems: isSidebarCollapsed ? 'center' : 'stretch' }}>
              {!isSidebarCollapsed ? (
                <div className="theme-toggle-track" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Click to toggle Dark / Light Theme">
                  <div className="theme-toggle-thumb" style={{ transform: theme === 'light' ? 'translateX(100%)' : 'translateX(0%)' }} />
                  <button
                    type="button"
                    className={`theme-toggle-btn ${theme === 'dark' ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setTheme('dark'); }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                    <span>Dark</span>
                  </button>
                  <button
                    type="button"
                    className={`theme-toggle-btn ${theme === 'light' ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setTheme('light'); }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                    <span>Light</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="theme-collapsed-btn"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                >
                  {theme === 'dark' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                    </svg>
                  )}
                </button>
              )}
            </div>

            <div style={{padding:'0.75rem 1rem', borderTop:'1px solid var(--border-color)', display:'flex', justifyContent:isSidebarCollapsed?'center':'flex-start'}}>
              <button className="btn btn-secondary" onClick={()=>setIsSidebarCollapsed(!isSidebarCollapsed)} style={{padding:'0.5rem', background:'transparent', border:'none'}} title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
            </div>
          </aside>

          {/* MAIN WRAPPER */}
          <div className="main-wrapper">
            <header className="topbar">
              <div style={{flex:1,maxWidth:'320px'}}>
                <input type="text" className="form-input" placeholder={t('searchPlaceholder')} value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} />
              </div>
              <div className="topbar-actions" style={{display:'flex', alignItems:'center', gap:'0.75rem', flexWrap:'wrap'}}>
                {/* NEAREST AIRPORT GEOLOCATION SELECTOR */}
                <div style={{display:'flex',alignItems:'center',gap:'0.35rem',background:'rgba(0,242,254,0.08)',padding:'0.3rem 0.65rem',borderRadius:'20px',border:'1px solid rgba(0,242,254,0.3)',fontSize:'0.78rem'}}>
                  <span>📍</span>
                  <select
                    value={activeAirport.code}
                    onChange={e => {
                      const selected = AAI_AIRPORTS.find(a => a.code === e.target.value);
                      if (selected) {
                        setActiveAirport(selected);
                        setIsGpsDetected(false);
                        addToast(`Airport location switched to: ${selected.name} (${selected.code})`, 'info');
                      }
                    }}
                    style={{background:'transparent',border:'none',color:'var(--accent-cyan)',fontWeight:700,cursor:'pointer',outline:'none'}}
                  >
                    {AAI_AIRPORTS.map(a => (
                      <option key={a.code} value={a.code} style={{background:'#07090e',color:'#fff'}}>
                        {a.city} ({a.code})
                      </option>
                    ))}
                  </select>
                  {isGpsDetected && <span className="badge badge-success" style={{fontSize:'0.6rem',padding:'0.1rem 0.35rem'}}>GPS Auto</span>}
                  <button className="btn btn-secondary" style={{padding:'0.1rem 0.3rem',fontSize:'0.7rem',border:'none',background:'transparent',cursor:'pointer'}} title="Re-detect Device Location via GPS" onClick={detectDeviceLocation}>🛰️</button>
                </div>

                <button className="btn btn-secondary" onClick={()=>setShowContactModal(true)}>{t('support')}</button>
                <select className="form-control" value={lang} onChange={e=>setLang(e.target.value)} style={{width:'auto', padding:'0.4rem 0.6rem', border:'1px solid var(--border-color)', borderRadius:'6px', background:'var(--bg-card)', color:'var(--text-main)', cursor:'pointer', fontWeight:600}}>
                  <option value="en">🇺🇸 English</option>
                  <option value="hi">🇮🇳 हिंदी</option>
                </select>
                {currentUser ? (
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowProfileModal(true)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                      padding: '0.35rem 0.75rem',
                      background: 'rgba(0, 242, 254, 0.08)',
                      border: '1px solid rgba(0, 242, 254, 0.3)',
                      borderRadius: '24px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
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
                    }}>
                      {currentUser.role === 'Admin' ? '👑' : currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ textAlign: 'left', lineHeight: '1.2' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#fff' }}>{currentUser.name}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--brand-cyan)' }}>{currentUser.role}</div>
                    </div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginLeft: '0.15rem' }}>▼</span>
                  </button>
                ) : (
                  <button className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.4rem 0.9rem', fontWeight: 600 }} onClick={() => { setAuthMode('staff'); setShowAuthModal(true); }}>
                    {t('loginButton')}
                  </button>
                )}
              </div>
            </header>

            {/* REALTIME TERMINAL ESTIMATED WAIT TIMES FLOATING BAR */}
            <FloatingWaitTimesBar activeAirport={activeAirport} />
        <AeroSkyAiBot db={db} setActiveTab={setActiveTab} activeAirport={activeAirport} isAdmin={isAdmin} />

            <main className="main-content">
              {activeTab==='dashboard' && <DashboardView db={db} currentUser={currentUser} setActiveTab={setActiveTab} t={t} activeAirport={activeAirport} />}
              {activeTab==='map' && <MapView db={db} setDb={setDb} isAdmin={isAdmin} isStaff={isStaffOrAdmin} addToast={addToast} appendAuditLog={appendAuditLog} activeAirport={activeAirport} />}
              {activeTab==='flights' && <FlightsView db={db} setDb={setDb} isAdmin={isAdmin} isStaff={isStaffOrAdmin} addToast={addToast} appendAuditLog={appendAuditLog} searchQuery={searchQuery} activeAirport={activeAirport} />}
              {activeTab==='gates' && <GatesView db={db} setDb={setDb} isAdmin={isAdmin} isStaff={isStaffOrAdmin} addToast={addToast} appendAuditLog={appendAuditLog} activeAirport={activeAirport} />}
              {activeTab==='carParking' && <CarParkingView db={db} setDb={setDb} currentUser={currentUser} isAdmin={isAdmin} isStaff={isStaffOrAdmin} addToast={addToast} appendAuditLog={appendAuditLog} activeAirport={activeAirport} />}
              {activeTab==='cabBooking' && <OlaCabBookingView db={db} setDb={setDb} currentUser={currentUser} isAdmin={isAdmin} isStaff={isStaffOrAdmin} addToast={addToast} appendAuditLog={appendAuditLog} activeAirport={activeAirport} />}
              {activeTab==='emergency' && <EmergencyView db={db} setDb={setDb} isAdmin={isAdmin} isStaff={isStaffOrAdmin} addToast={addToast} appendAuditLog={appendAuditLog} activeAirport={activeAirport} />}
              
              {activeTab==='fleetHealth' && (
                isStaffOrAdmin ? (
                  <FleetHealthView db={db} setDb={setDb} isAdmin={isAdmin} isStaff={isStaffOrAdmin} addToast={addToast} appendAuditLog={appendAuditLog} activeAirport={activeAirport} />
                ) : (
                  <div className="glass-card" style={{textAlign:'center',padding:'3rem 1.5rem',maxWidth:'600px',margin:'2rem auto'}}>
                    <div style={{fontSize:'3rem',marginBottom:'1rem'}}>✈️</div>
                    <h2 style={{color:'var(--accent-amber)',fontWeight:800,marginBottom:'0.5rem'}}>Staff & Admin Login Required</h2>
                    <p style={{color:'var(--text-secondary)',fontSize:'0.9rem',marginBottom:'1.5rem'}}>Aircraft Fleet Health telemetry is restricted to authorized Airport Staff and AAI Master Admin.</p>
                    <button className="btn btn-primary" onClick={()=>{setAuthMode('staff');setShowAuthModal(true);}}>🔑 Login to Access Fleet Health</button>
                  </div>
                )
              )}
              
              {activeTab==='baggage' && <BaggageView db={db} setDb={setDb} isAdmin={isAdmin} isStaff={isStaffOrAdmin} addToast={addToast} appendAuditLog={appendAuditLog} activeAirport={activeAirport} />}
              
              {activeTab==='cctv' && (
                isStaffOrAdmin ? (
                  <CctvView db={db} setDb={setDb} isAdmin={isAdmin} isStaff={isStaffOrAdmin} activeAirport={activeAirport} />
                ) : (
                  <div className="glass-card" style={{textAlign:'center',padding:'3rem 1.5rem',maxWidth:'600px',margin:'2rem auto'}}>
                    <div style={{fontSize:'3rem',marginBottom:'1rem'}}>🎥</div>
                    <h2 style={{color:'var(--accent-amber)',fontWeight:800,marginBottom:'0.5rem'}}>AI CCTV Surveillance Grid — Restricted Access</h2>
                    <p style={{color:'var(--text-secondary)',fontSize:'0.9rem',marginBottom:'1.5rem'}}>Real-time terminal surveillance feeds and security alerts are restricted to authorized Airport Staff and Security personnel.</p>
                    <button className="btn btn-primary" onClick={()=>{setAuthMode('staff');setShowAuthModal(true);}}>🔑 Staff / Security Login</button>
                  </div>
                )
              )}
              
              {activeTab==='lostFound' && <LostFoundView db={db} setDb={setDb} isAdmin={isAdmin} isStaff={isStaffOrAdmin} currentUser={currentUser} addToast={addToast} appendAuditLog={appendAuditLog} activeAirport={activeAirport} />}
              {activeTab==='wheelchair' && <WheelchairView db={db} setDb={setDb} isAdmin={isAdmin} isStaff={isStaffOrAdmin} addToast={addToast} appendAuditLog={appendAuditLog} activeAirport={activeAirport} />}
              
              {activeTab==='dutyRoster' && (
                isStaffOrAdmin ? (
                  <DutyRosterView db={db} setDb={setDb} currentUser={currentUser} isAdmin={isAdmin} isStaff={isStaffOrAdmin} addToast={addToast} appendAuditLog={appendAuditLog} activeAirport={activeAirport} />
                ) : (
                  <div className="glass-card" style={{textAlign:'center',padding:'3rem 1.5rem',maxWidth:'600px',margin:'2rem auto'}}>
                    <div style={{fontSize:'3rem',marginBottom:'1rem'}}>📅</div>
                    <h2 style={{color:'var(--accent-amber)',fontWeight:800,marginBottom:'0.5rem'}}>Duty Roster & Attendance Portal</h2>
                    <p style={{color:'var(--text-secondary)',fontSize:'0.9rem',marginBottom:'1.5rem'}}>Staff duty posting schedules, attendance clocking, and leave management are accessible to active staff members.</p>
                    <button className="btn btn-primary" onClick={()=>{setAuthMode('staff');setShowAuthModal(true);}}>🔑 Login to Staff Portal</button>
                  </div>
                )
              )}
              
              {activeTab==='adminCommand' && (
                isAdmin ? (
                  <AdminView db={db} setDb={setDb} addToast={addToast} appendAuditLog={appendAuditLog} activeAirport={activeAirport} />
                ) : (
                  <div className="glass-card" style={{textAlign:'center',padding:'3rem 1.5rem',maxWidth:'600px',margin:'2rem auto'}}>
                    <div style={{fontSize:'3rem',marginBottom:'1rem'}}>👑</div>
                    <h2 style={{color:'var(--accent-rose)',fontWeight:800,marginBottom:'0.5rem'}}>AAI Admin Command Center</h2>
                    <p style={{color:'var(--text-secondary)',fontSize:'0.9rem',marginBottom:'1.5rem'}}>Master system administration, user management, and configuration are restricted exclusively to AAI Master Admin.</p>
                    <button className="btn btn-primary" style={{background:'linear-gradient(135deg, var(--accent-amber), #d97706)',color:'#000'}} onClick={()=>{setAuthMode('admin');setShowAuthModal(true);}}>🔒 Admin Login</button>
                  </div>
                )
              )}
            </main>
          </div>

          {/* TOASTS */}
          <div className="toast-container">
            {toasts.map(t=><div key={t.id} className="toast" style={{borderColor:t.type==='success'?'var(--accent-emerald)':t.type==='warning'?'var(--accent-amber)':t.type==='danger'?'var(--accent-rose)':'var(--accent-cyan)'}}>{t.msg}</div>)}
          </div>

          {/* CONTACT MODAL */}
          {showContactModal && (
            <div className="modal-overlay" onClick={e=>{if(e.target.className.includes('modal-overlay'))setShowContactModal(false)}}>
              <div className="modal-card">
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1rem'}}><h3 style={{color:'var(--accent-cyan)'}}>📞 Delhi Airport Support</h3><button className="btn btn-secondary" onClick={()=>setShowContactModal(false)}>✕</button></div>
                <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                  <div className="glass-card" style={{padding:'1rem'}}><div style={{fontSize:'0.8rem',color:'var(--text-secondary)'}}>Toll Free Helpline</div><div style={{fontSize:'1.2rem',fontWeight:700,color:'var(--accent-emerald)',marginTop:'0.25rem'}}>{db.contactInfo.helpline}</div></div>
                  <div className="glass-card" style={{padding:'1rem'}}><div style={{fontSize:'0.8rem',color:'var(--text-secondary)'}}>Email</div><div style={{fontSize:'1rem',fontWeight:600,marginTop:'0.25rem'}}>{db.contactInfo.email}</div></div>
                  <div className="glass-card" style={{padding:'1rem'}}><div style={{fontSize:'0.8rem',color:'var(--text-secondary)'}}>Address</div><div style={{fontSize:'0.9rem',marginTop:'0.25rem'}}>{db.contactInfo.address}</div></div>
                </div>
              </div>
            </div>
          )}

          {/* WHEELCHAIR MODAL */}
          {showWheelchairModal && (
            <div className="modal-overlay" onClick={e=>{if(e.target.className.includes('modal-overlay'))setShowWheelchairModal(false)}}>
              <div className="modal-card">
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1rem'}}><h3 style={{color:'var(--accent-cyan)'}}>♿ Wheelchair Dispatch</h3><button className="btn btn-secondary" onClick={()=>setShowWheelchairModal(false)}>✕</button></div>
                <form onSubmit={handleWcSubmit} style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
                  <input type="text" required className="form-input" placeholder="Passenger Name" value={wcForm.passengerName} onChange={e=>setWcForm({...wcForm,passengerName:e.target.value})} />
                  <input type="text" required className="form-input" placeholder="Airline Name" value={wcForm.airlineName} onChange={e=>setWcForm({...wcForm,airlineName:e.target.value})} />
                  <input type="text" className="form-input" placeholder="PNR Number" value={wcForm.pnrNumber} onChange={e=>setWcForm({...wcForm,pnrNumber:e.target.value})} />
                  <input type="tel" required className="form-input" placeholder="Mobile Contact" value={wcForm.mobileNumber} onChange={e=>setWcForm({...wcForm,mobileNumber:e.target.value})} />
                  <button type="submit" className="btn btn-primary">Dispatch Wheelchair</button>
                </form>
                {db.wheelchairRequests.length>0 && (
                  <div style={{marginTop:'1rem'}}>
                    <h4 style={{marginBottom:'0.5rem',color:'var(--text-secondary)',fontSize:'0.85rem'}}>Recent Requests</h4>
                    {db.wheelchairRequests.slice(0,3).map(r=>(
                      <div key={r.id} style={{display:'flex',justifyContent:'space-between',padding:'0.5rem',borderBottom:'1px solid var(--border-color)',fontSize:'0.8rem'}}>
                        <span>{r.passengerName} ({r.airlineName})</span>
                        <span className={`badge ${r.status==='COMPLETED'?'badge-success':r.status==='DISPATCHED'?'badge-warning':'badge-info'}`}>{r.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* USER PROFILE DETAILS MODAL (Staff & Admin) */}
          {showProfileModal && currentUser && (
            <div className="modal-overlay" onClick={e => { if (e.target.className.includes('modal-overlay')) setShowProfileModal(false); }}>
              <div className="modal-card" style={{ maxWidth: '440px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
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
                    }}>
                      {currentUser.role === 'Admin' ? '👑' : currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--accent-cyan)' }}>{currentUser.name}</h3>
                      <span className={`badge ${currentUser.role === 'Admin' ? 'badge-danger' : 'badge-info'}`} style={{ fontSize: '0.7rem' }}>
                        {currentUser.role} Account
                      </span>
                    </div>
                  </div>
                  <button className="btn btn-secondary" onClick={() => setShowProfileModal(false)}>&times;</button>
                </div>

                {/* PROFILE DETAILS GRID */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div style={{ background: 'rgba(0,0,0,0.25)', padding: '0.85rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>Employee / User ID:</span>
                      <strong style={{ fontFamily: 'var(--font-mono)' }}>{currentUser.employeeId || currentUser.id}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>Official Email:</span>
                      <strong>{currentUser.email}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>Assigned Airport:</span>
                      <strong>{activeAirport.name} ({activeAirport.code})</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>Account Access Status:</span>
                      <span className="badge badge-success">✅ APPROVED</span>
                    </div>
                  </div>

                  {/* QUICK NAVIGATION SHORTCUT */}
                  {(currentUser.role === 'Staff' || currentUser.role === 'Admin') && (
                    <button
                      className="btn btn-secondary"
                      style={{ justifyContent: 'center', padding: '0.5rem', fontSize: '0.82rem' }}
                      onClick={() => {
                        setActiveTab(currentUser.role === 'Admin' ? 'adminCommand' : 'dutyRoster');
                        setShowProfileModal(false);
                      }}
                    >
                      {currentUser.role === 'Admin' ? '👑 Admin Command Center' : '📅 View Duty Roster & My Shift'}
                    </button>
                  )}

                  {/* CHANGE PASSWORD TOGGLE & FORM */}
                  <button
                    className="btn btn-secondary"
                    style={{ justifyContent: 'center', padding: '0.5rem', fontSize: '0.82rem', color: 'var(--accent-amber)', borderColor: 'rgba(245,158,11,0.3)' }}
                    onClick={() => setShowPwdSection(!showPwdSection)}
                  >
                    🔑 {showPwdSection ? 'Close Password Form' : 'Change My Password'}
                  </button>

                  {showPwdSection && (
                    <form onSubmit={handleChangeOwnPassword} style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.55rem', border: '1px solid rgba(245,158,11,0.2)' }}>
                      <h4 style={{ margin: 0, fontSize: '0.82rem', color: 'var(--accent-amber)', fontWeight: 700 }}>🔒 Update Account Password</h4>
                      <input
                        type="password"
                        required
                        className="form-input"
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                        placeholder="Current Password"
                        value={changePwdForm.currentPwd}
                        onChange={e => setChangePwdForm({ ...changePwdForm, currentPwd: e.target.value })}
                      />
                      <input
                        type="password"
                        required
                        className="form-input"
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                        placeholder="New Password"
                        value={changePwdForm.newPwd}
                        onChange={e => setChangePwdForm({ ...changePwdForm, newPwd: e.target.value })}
                      />
                      <input
                        type="password"
                        required
                        className="form-input"
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                        placeholder="Confirm New Password"
                        value={changePwdForm.confirmPwd}
                        onChange={e => setChangePwdForm({ ...changePwdForm, confirmPwd: e.target.value })}
                      />
                      <button type="submit" className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.45rem', background: 'linear-gradient(135deg, var(--accent-amber), #d97706)', color: '#000', fontWeight: 800 }}>
                        💾 Save New Password
                      </button>
                    </form>
                  )}

                  {/* LOGOUT BUTTON INSIDE PROFILE MODAL */}
                  <button
                    className="btn btn-secondary"
                    style={{
                      justifyContent: 'center',
                      padding: '0.6rem',
                      fontSize: '0.85rem',
                      background: 'rgba(244,63,94,0.15)',
                      color: 'var(--accent-rose)',
                      border: '1px solid rgba(244,63,94,0.3)',
                      fontWeight: 700,
                      marginTop: '0.35rem'
                    }}
                    onClick={() => {
                      setCurrentUser(null);
                      setShowProfileModal(false);
                      addToast('Logged out of account.', 'info');
                    }}
                  >
                    🚪 Logout of Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FLOATING AI CHATBOT ASSISTANT */}
          

          {/* MULTI-ROLE AUTH & PASSWORD RESET MODAL */}
          {showAuthModal && (
            <div className="modal-overlay" onClick={e=>{if(e.target.className.includes('modal-overlay'))setShowAuthModal(false)}}>
              <div className="modal-card" style={{maxWidth:'500px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
                  <h3 style={{color:'var(--accent-cyan)',fontWeight:800,fontSize:'1.15rem'}}>AAI AeroPulse Security Portal</h3>
                  <button className="btn btn-secondary" onClick={()=>setShowAuthModal(false)}>&times;</button>
                </div>

                {/* TAB SWITCHER */}
                <div style={{display:'flex',gap:'0.25rem',marginBottom:'1.25rem',borderBottom:'1px solid var(--border-color)',paddingBottom:'0.5rem',flexWrap:'wrap'}}>
                  <button className={`btn ${authMode==='staff'?'btn-primary':'btn-secondary'}`} style={{fontSize:'0.75rem',padding:'0.3rem 0.6rem'}} onClick={()=>setAuthMode('staff')}>Staff Login</button>
                  <button className={`btn ${authMode==='admin'?'btn-primary':'btn-secondary'}`} style={{fontSize:'0.75rem',padding:'0.3rem 0.6rem'}} onClick={()=>setAuthMode('admin')}>Admin Login</button>
                  <button className={`btn ${authMode==='register'?'btn-primary':'btn-secondary'}`} style={{fontSize:'0.75rem',padding:'0.3rem 0.6rem'}} onClick={()=>setAuthMode('register')}>Register Staff</button>
                  <button className={`btn ${authMode==='forgot'?'btn-primary':'btn-secondary'}`} style={{fontSize:'0.75rem',padding:'0.3rem 0.6rem'}} onClick={()=>setAuthMode('forgot')}>Forgot Password</button>
                </div>

                {/* STAFF LOGIN FORM */}
                {authMode==='staff' && (
                  <form onSubmit={handleStaffLogin} style={{display:'flex',flexDirection:'column',gap:'0.85rem'}}>
                    <div><label style={{fontSize:'0.8rem',color:'var(--text-secondary)'}}>Staff Email or Employee ID</label><input required className="form-input" placeholder="cisf.lead@delhi.aai or CISF-DEL-881" value={loginForm.identifier} onChange={e=>setLoginForm({...loginForm,identifier:e.target.value})} /></div>
                    <div><label style={{fontSize:'0.8rem',color:'var(--text-secondary)'}}>Password</label><input type="password" required className="form-input" placeholder="••••••••" value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})} /></div>
                    <button type="submit" className="btn btn-primary" style={{padding:'0.6rem'}}>Login to Staff Workspace</button>
                  </form>
                )}

                {/* ADMIN LOGIN FORM */}
                {authMode==='admin' && (
                  <form onSubmit={handleAdminLogin} style={{display:'flex',flexDirection:'column',gap:'0.85rem'}}>
                    <div style={{background:'rgba(245,158,11,0.1)',padding:'0.65rem',borderRadius:'6px',border:'1px solid rgba(245,158,11,0.3)',fontSize:'0.78rem',color:'var(--accent-amber)'}}>
                      🔒 Restricted to AAI Airport Operations Master Administrators.
                    </div>
                    <div><label style={{fontSize:'0.8rem',color:'var(--text-secondary)'}}>Admin Email or Employee ID</label><input required className="form-input" placeholder="admin@delhi.aai" value={loginForm.identifier} onChange={e=>setLoginForm({...loginForm,identifier:e.target.value})} /></div>
                    <div><label style={{fontSize:'0.8rem',color:'var(--text-secondary)'}}>Password</label><input type="password" required className="form-input" placeholder="••••••••" value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})} /></div>
                    <button type="submit" className="btn btn-primary" style={{padding:'0.6rem',background:'linear-gradient(135deg, var(--accent-amber), #d97706)',color:'#000'}}>Login as Admin</button>
                  </form>
                )}

                {/* EMPLOYEE REGISTRATION FORM */}
                {authMode==='register' && (
                  <form onSubmit={handleRegister} style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem'}}>
                    <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Full Name</label><input required className="form-input" value={regForm.name} onChange={e=>setRegForm({...regForm,name:e.target.value})} /></div>
                    <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Employee ID</label><input required className="form-input" placeholder="STF-DEL-101" value={regForm.employeeId} onChange={e=>setRegForm({...regForm,employeeId:e.target.value})} /></div>
                    <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Email Address</label><input type="email" required className="form-input" placeholder="staff@delhi.aai" value={regForm.email} onChange={e=>setRegForm({...regForm,email:e.target.value})} /></div>
                    <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Mobile Number (for OTP)</label><input type="tel" required className="form-input" placeholder="+91 9876543210" value={regForm.mobile} onChange={e=>setRegForm({...regForm,mobile:e.target.value})} /></div>
                    <div style={{gridColumn:'1/-1'}}><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Role</label>
                      <input readOnly className="form-input" value="Staff" style={{background:'rgba(255,255,255,0.05)'}} />
                    </div>
                    <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Password</label><input type="password" required className="form-input" value={regForm.password} onChange={e=>setRegForm({...regForm,password:e.target.value})} /></div>
                    <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Confirm Password</label><input type="password" required className="form-input" value={regForm.confirmPassword} onChange={e=>setRegForm({...regForm,confirmPassword:e.target.value})} /></div>
                    <div style={{gridColumn:'1/-1'}}><button type="submit" className="btn btn-primary" style={{width:'100%'}}>Submit Registration for Admin Approval</button></div>
                  </form>
                )}

                {/* 2-STEP FACE VERIFICATION FORGOT PASSWORD FORM */}
                {authMode==='forgot' && (
                  <div>
                    {forgotState.step === 1 && (
                      <form onSubmit={handleForgotStep1} style={{display:'flex',flexDirection:'column',gap:'0.85rem'}}>
                        <div style={{fontSize:'0.8rem',color:'var(--text-secondary)'}}>
                          Step 1 of 2: Enter registered Email, Phone, or Employee ID and specify your official ID Proof document name.
                        </div>
                        <div>
                          <label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Account Email / Mobile / Employee ID</label>
                          <input required className="form-input" placeholder="admin@delhi.aai or STF-DEL-101" value={forgotState.identifier} onChange={e=>setForgotState({...forgotState,identifier:e.target.value})} />
                        </div>
                        <div>
                          <label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Verification Document Proof Name / Ref</label>
                          <input required className="form-input" placeholder="AAI Airport Badge / Aadhaar / Passport Ref" value={forgotState.docName} onChange={e=>setForgotState({...forgotState,docName:e.target.value})} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{padding:'0.6rem'}}>Proceed to Live Face Scan ➔</button>
                      </form>
                    )}

                    {forgotState.step === 2 && (
                      <form onSubmit={handleForgotSubmitRequest} style={{display:'flex',flexDirection:'column',gap:'0.85rem',textAlign:'center'}}>
                        <div style={{fontSize:'0.82rem',color:'var(--accent-cyan)'}}>
                          Step 2 of 2: Biometric Live Face Scan Capture
                        </div>
                        <div style={{
                          background:'rgba(0,0,0,0.5)',border:'2px dashed var(--accent-cyan)',borderRadius:'12px',padding:'1.5rem 1rem',
                          display:'flex',flexDirection:'column',alignItems:'center',gap:'0.75rem'
                        }}>
                          <div style={{width:'100px',height:'100px',borderRadius:'50%',border:'3px solid var(--accent-cyan)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2.5rem',background:'rgba(0,242,254,0.1)'}}>
                            {forgotState.captured ? '👤' : '📸'}
                          </div>
                          <div style={{fontSize:'0.78rem',color:'var(--text-secondary)'}}>
                            {forgotState.captured ? '✅ Biometric Live Face Scan Captured & Encrypted!' : 'Align your face inside the camera oval frame and click capture.'}
                          </div>
                          <button type="button" className="btn btn-secondary" style={{fontSize:'0.78rem',padding:'0.35rem 0.8rem'}} onClick={handleCaptureFace}>
                            {forgotState.captured ? '🔄 Re-capture Live Face' : '📸 Capture Live Face'}
                          </button>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{padding:'0.6rem'}} disabled={!forgotState.captured}>
                          Submit Reset Request & Face Scan to Admin
                        </button>
                      </form>
                    )}

                    {forgotState.step === 3 && (
                      <form onSubmit={handleResetPasswordFinal} style={{display:'flex',flexDirection:'column',gap:'0.85rem'}}>
                        <div style={{fontSize:'0.82rem',color:'var(--accent-emerald)',fontWeight:600}}>
                          ✅ One-Time Password Change Approved by AAI Master Admin! Set your new password below.
                        </div>
                        <div>
                          <label style={{fontSize:'0.78rem',color:'var(--text-secondary)'}}>New Password</label>
                          <input type="password" required className="form-input" placeholder="Enter New Password" value={forgotState.newPassword} onChange={e=>setForgotState({...forgotState,newPassword:e.target.value})} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{padding:'0.6rem'}}>Update Password & Activate Account</button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    // ═══════════════════════════════════════════════════════
    // 1. DASHBOARD VIEW
    // ═══════════════════════════════════════════════════════

    function DashboardView({ db, currentUser, setActiveTab, t, activeAirport }) {
      const aptCode = activeAirport?.code || 'DEL';
      const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
      const aptIcao = activeAirport?.icao || 'VIDP';

      const kpis = [
        { label: t('activeFlights'), val: db.metrics.activeFlights, icon: "✈️", color: "var(--accent-cyan)", tab: "flights" },
        { label: t('passengersToday'), val: db.metrics.passengersToday.toLocaleString(), icon: "👥", color: "var(--accent-emerald)", tab: "flights" },
        { label: t('bagsProcessed'), val: db.metrics.bagsProcessed.toLocaleString(), icon: "🛄", color: "var(--accent-blue)", tab: "baggage" },
        { label: t('activeAlerts'), val: db.emergencies.filter(e => e.status === 'ACTIVE').length, icon: "🚨", color: "var(--accent-rose)", tab: "emergency" },
        { label: t('gatesOccupied'), val: `${db.gates.filter(g => g.status === 'Occupied').length}/${db.gates.length}`, icon: "🚪", color: "var(--accent-purple)", tab: "gates" },
        { label: t('onTimePerf'), val: db.metrics.onTimePerf, icon: "⏱️", color: "var(--accent-amber)", tab: "flights" },
        { label: t('securityCleared'), val: db.metrics.securityCleared.toLocaleString(), icon: "🛡️", color: "var(--accent-emerald)" },
        { label: t('weather'), val: db.metrics.weatherStatus, icon: "🌤️", color: "var(--accent-blue)" },
        { label: t('systemHealth'), val: db.metrics.systemHealth, icon: "💚", color: "var(--accent-emerald)" }
      ];

      return (
        <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
          <div>
            <h2 style={{fontSize:'1.7rem',fontWeight:800}}>AAI Operations Control Center — {aptName} ({aptCode} / {aptIcao})</h2>
            <div style={{color:'var(--accent-cyan)',fontSize:'0.85rem',marginTop:'0.25rem'}}>
              📍 Airport Location: <strong>{activeAirport?.city} ({aptCode})</strong> • Lat {activeAirport?.lat}, Lon {activeAirport?.lon}
            </div>
            {currentUser && <div style={{color:'var(--text-secondary)',fontSize:'0.85rem',marginTop:'0.25rem'}}>Authenticated: <strong>{currentUser.name}</strong> ({currentUser.role})</div>}
            {!currentUser && <div style={{color:'var(--text-secondary)',fontSize:'0.85rem',marginTop:'0.25rem'}}>{t('publicDashboard')}</div>}
          </div>

          <div className="grid-3">
            {kpis.map((k,i)=>(
              <div key={i} className="kpi-card" style={{cursor:k.tab?'pointer':'default'}} onClick={()=>k.tab&&setActiveTab(k.tab)}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                  <div>
                    <div style={{fontSize:'0.75rem',color:'var(--text-secondary)',textTransform:'uppercase',letterSpacing:'0.08em',fontWeight:600}}>{k.label}</div>
                    <div style={{fontSize:'1.8rem',fontWeight:800,color:k.color,marginTop:'0.25rem',fontFamily:'var(--font-mono)'}}>{k.val}</div>
                  </div>
                  <div style={{fontSize:'2rem',opacity:0.6}}>{k.icon}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid-2">
            <div className="glass-card">
              <div className="card-header"><div className="card-title">✈️ Recent Flights ({aptCode})</div></div>
              <table style={{width:'100%',fontSize:'0.82rem',borderCollapse:'collapse'}}>
                <thead><tr style={{borderBottom:'1px solid var(--border-color)',color:'var(--text-secondary)'}}>
                  <th style={{padding:'0.5rem',textAlign:'left'}}>Flight</th><th style={{textAlign:'left'}}>Route</th><th style={{textAlign:'left'}}>Time</th><th style={{textAlign:'left'}}>Status</th>
                </tr></thead>
                <tbody>
                  {db.flights.slice(0,6).map(f=>(
                    <tr key={f.id} style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                      <td style={{padding:'0.5rem',fontWeight:600}}>{f.flightNumber}</td>
                      <td style={{fontSize:'0.78rem',color:'var(--text-secondary)'}}>
                        {f.type==='Departure'?`${aptCode} → ${f.destination.match(/\((\w+)\)/)?.[1]||f.destination}`:`${f.origin.match(/\((\w+)\)/)?.[1]||f.origin} → ${aptCode}`}
                      </td>
                      <td style={{fontFamily:'var(--font-mono)',fontSize:'0.78rem'}}>{f.scheduledTime}</td>
                      <td><span className={`badge ${f.status==='Delayed'?'badge-danger':f.status==='Boarding'||f.status==='Landed'?'badge-success':f.status==='In Flight'?'badge-warning':'badge-info'}`}>{f.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="glass-card">
              <div className="card-header"><div className="card-title">🚨 Active Incidents</div></div>
              {db.emergencies.filter(e=>e.status==='ACTIVE').length===0 ? (
                <div style={{textAlign:'center',padding:'2rem',color:'var(--accent-emerald)'}}>✅ No active incidents</div>
              ) : db.emergencies.filter(e=>e.status==='ACTIVE').map(e=>(
                <div key={e.id} className="glass-card" style={{padding:'0.85rem',marginBottom:'0.75rem',borderColor:'var(--accent-rose)',animation:'pulse 2s infinite'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div><strong style={{color:'var(--accent-rose)'}}>{e.title}</strong><div style={{fontSize:'0.78rem',color:'var(--text-secondary)',marginTop:'0.2rem'}}>{e.location} • {e.severity}</div></div>
                    <span className="badge badge-danger">{e.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // ═══════════════════════════════════════════════════════
    // 2. AIRPORT MAP VIEW
    // ═══════════════════════════════════════════════════════

    // ═══════════════════════════════════════════════════════
    // 2. AIRPORT MAP VIEW & ADMIN MAP EDITOR
    // ═══════════════════════════════════════════════════════

    function MapView({ db, setDb, isAdmin, isStaff, addToast, appendAuditLog, activeAirport }) {
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
      const [terminalForm, setTerminalForm] = useState({ id: '', name: '', code: 'T4', type: 'Domestic', status: 'Active', description: '' });
      const [gateForm, setGateForm] = useState({ id: '', terminal: 'T3', type: 'Widebody', status: 'Available', flight: '', compat: 'A320/B787', pax: 0, mapUrl: '' });
      const [runwayForm, setRunwayForm] = useState({ id: '', name: '', length: '3,500m', ilsCategory: 'CAT-II', status: 'Active', trafficLevel: 'Moderate' });
      const [shopForm, setShopForm] = useState({ id: '', name: '', category: 'Retail', terminal: 'T3', location: '', status: 'OPEN', operatingHours: '24/7', mapUrl: '' });

      // Live AI Transportation ETAs State
      const [transitData, setTransitData] = useState([
        {
          id: 'TRN-METRO-01',
          name: 'Delhi Metro Express Line (Orange Line)',
          type: 'Metro Rail',
          icon: '🚇',
          terminal: 'T3 Airside Concourse & T1 Walkway',
          location: 'Airport Metro Station (Direct T3 Underground Concourse)',
          nextDepartureSec: 140, // 2m 20s
          frequency: 'Every 10 mins (04:45 - 23:30)',
          destinations: [
            { station: 'Delhi Aerocity', travelTime: '3 mins', fare: '₹20' },
            { station: 'Dhaula Kuan', travelTime: '11 mins', fare: '₹40' },
            { station: 'New Delhi Railway Stn', travelTime: '19 mins', fare: '₹60' }
          ],
          aiCrowdIndex: 'Light (32% Occupancy)',
          status: '🟢 OPERATIONAL ON-TIME',
          aiConfidence: '99.8%',
          mapUrl: 'https://www.google.com/maps/search/?api=1&query=Airport+Metro+Station+Delhi+T3'
        },
        {
          id: 'TRN-BUS-02',
          name: 'DTC Airport Express Buses (Routes 534A, 780, Express 4)',
          type: 'City Bus',
          icon: '🚌',
          terminal: 'T3 Ground Transportation Center & T1 Bus Bay',
          location: 'T3 Bus Station Pillar 10 & T1 Exit Gate 2',
          nextDepartureSec: 260, // 4m 20s
          frequency: 'Every 15 mins (24/7 Service)',
          destinations: [
            { station: 'ISBT Kashmere Gate', travelTime: '45 mins', fare: '₹50' },
            { station: 'Connaught Place (CP)', travelTime: '35 mins', fare: '₹40' },
            { station: 'AIIMS / Dhaula Kuan', travelTime: '25 mins', fare: '₹30' },
            { station: 'Gurgaon IFFCO Chowk', travelTime: '30 mins', fare: '₹35' }
          ],
          aiCrowdIndex: 'Moderate Traffic Delay (+2 mins)',
          status: '🟢 LIVE AI TRAFFIC UPDATED',
          aiConfidence: '98.5%',
          mapUrl: 'https://www.google.com/maps/search/?api=1&query=DTC+Bus+Stop+Delhi+Airport+T3'
        },
        {
          id: 'TRN-SHUTTLE-03',
          name: 'Inter-Terminal Airport Transfer Shuttle',
          type: 'Airport Shuttle',
          icon: '🚐',
          terminal: 'Connects T1 ↔ T2 ↔ T3',
          location: 'T1 Gate 4, T2 Gate 2 & T3 Arrival Pillar 6',
          nextDepartureSec: 180, // 3 mins
          frequency: 'Every 10 mins (24 Hours Continuous)',
          destinations: [
            { station: 'Terminal 1 Departure Ramp', travelTime: '12 mins', fare: 'FREE for Transfer Passengers' },
            { station: 'Terminal 2 Gate 1', travelTime: '5 mins', fare: 'FREE' },
            { station: 'Terminal 3 International Arrival', travelTime: '8 mins', fare: 'FREE' }
          ],
          aiCrowdIndex: 'Smooth Transit Flow',
          status: '🟢 FREE SHUTTLE RUNNING',
          aiConfidence: '99.9%',
          mapUrl: 'https://www.google.com/maps/search/?api=1&query=Inter+Terminal+Shuttle+Delhi+Airport'
        },
        {
          id: 'TRN-TAXI-04',
          name: 'Pre-Paid Taxi & Auto Rickshaw Hub',
          type: 'Prepaid Taxi',
          icon: '🚕',
          terminal: 'All Terminals (T1, T2, T3)',
          location: 'MLCP Building Level 1 & T1 Arrival Exit Booth',
          nextDepartureSec: 60, // 1 min wait
          frequency: 'Immediate Dispatch (Over 150 Cabs Queued)',
          destinations: [
            { station: 'South Delhi / Saket', travelTime: '25 mins', fare: '₹350 (Flat Rate)' },
            { station: 'Noida Sector 62', travelTime: '55 mins', fare: '₹650 (Flat Rate)' },
            { station: 'Gurugram Cyber City', travelTime: '20 mins', fare: '₹300 (Flat Rate)' }
          ],
          aiCrowdIndex: 'Low Wait Time (1-2 mins)',
          status: '🟢 94 VEHICLES READY',
          aiConfidence: '99.5%',
          mapUrl: 'https://www.google.com/maps/search/?api=1&query=Prepaid+Taxi+Booth+Delhi+Airport+T3'
        }
      ]);

      // AI Live Countdown Effect (Updates ETAs in real time)
      useEffect(() => {
        const timer = setInterval(() => {
          setTransitData(prev => prev.map(t => {
            let nextSec = t.nextDepartureSec - 1;
            if (nextSec <= 0) {
              nextSec = t.type === 'Metro Rail' ? 600 : t.type === 'City Bus' ? 900 : t.type === 'Airport Shuttle' ? 600 : 120;
            }
            return { ...t, nextDepartureSec: nextSec };
          }));
        }, 1000);
        return () => clearInterval(timer);
      }, []);

      const formatETA = (totalSec) => {
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
        const mapUrl = (item.mapUrl && item.mapUrl.trim())
          ? (item.mapUrl.startsWith('http') ? item.mapUrl : `https://${item.mapUrl}`)
          : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              type === 'gate'
                ? `${aptName} Terminal ${item.terminal || ''} Gate ${item.id}`
                : `${item.name} ${item.location || ''} ${aptName}`
            )}`;
        window.open(mapUrl, '_blank', 'noopener,noreferrer');
      };

      // Default arrays with fallbacks
      const terminals = (db.terminals && db.terminals.length > 0) ? db.terminals : [
        { id: "T1", name: "Terminal 1 (Domestic & Low-Cost)", code: "T1", type: "Domestic", status: "Active", description: "Domestic low-cost carriers Terminal 1A & 1C" },
        { id: "T2", name: "Terminal 2 (Domestic Regional)", code: "T2", type: "Domestic", status: "Active", description: "Regional domestic operations" },
        { id: "T3", name: "Terminal 3 (International & Domestic)", code: "T3", type: "International", status: "Active", description: "Integrated primary terminal with CAT-III B runway access" }
      ];

      const runways = (db.runways && db.runways.length > 0) ? db.runways : [
        { id: "RWY-01", name: "Runway 28/10", length: "4,430m", ilsCategory: "CAT-III B", status: "Active", trafficLevel: "High" },
        { id: "RWY-02", name: "Runway 29/11", length: "3,810m", ilsCategory: "CAT-I", status: "Active", trafficLevel: "Moderate" },
        { id: "RWY-03", name: "Runway 27/09", length: "2,871m", ilsCategory: "N/A", status: "Under Maintenance", trafficLevel: "Closed" }
      ];

      const shops = (db.shops && db.shops.length > 0) ? db.shops : [
        { id: "SHP-001", name: "Delhi Duty Free Flagship Store", category: "Duty Free", terminal: "T3", location: "T3 Airside Departure Mall", status: "OPEN", operatingHours: "24/7" },
        { id: "SHP-002", name: "Starbucks Coffee Concourse", category: "Food & Beverage", terminal: "T3", location: "T3 Gate 32 Concourse", status: "OPEN", operatingHours: "05:00 - 23:00" },
        { id: "SHP-003", name: "FabIndia Heritage Craft Store", category: "Retail & Apparel", terminal: "T1", location: "T1 Departure Gate Area", status: "OPEN", operatingHours: "06:00 - 22:00" },
        { id: "SHP-004", name: "Plaza Premium Executive Lounge", category: "Lounge & Hospitality", terminal: "T3", location: "T3 International Mezzanine Level 2", status: "OPEN", operatingHours: "24/7" },
        { id: "SHP-005", name: "Bikanervala Express Food Court", category: "Food & Beverage", terminal: "T2", location: "T2 Food Court Hall", status: "OPEN", operatingHours: "06:00 - 22:30" }
      ];

      // Terminal Handlers
      const handleSaveTerminal = (e) => {
        e.preventDefault();
        if (editTerminalId) {
          setDb(prev => ({
            ...prev,
            terminals: terminals.map(t => t.id === editTerminalId ? { ...t, ...terminalForm } : t)
          }));
          appendAuditLog('MAP_TERMINAL_UPDATE', `Updated terminal ${terminalForm.name}`);
          addToast(`Terminal ${terminalForm.name} updated!`, 'success');
        } else {
          const nt = { id: terminalForm.code || `T-${Date.now().toString().slice(-3)}`, ...terminalForm };
          setDb(prev => ({ ...prev, terminals: [...terminals, nt] }));
          appendAuditLog('MAP_TERMINAL_CREATE', `Added new terminal ${terminalForm.name}`);
          addToast(`Terminal ${terminalForm.name} added to airport map!`, 'success');
        }
        setShowTerminalModal(false); setEditTerminalId(null);
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
      const handleSaveGate = (e) => {
        e.preventDefault();
        if (editGateId) {
          setDb(prev => ({
            ...prev,
            gates: (prev.gates || []).map(g => g.id === editGateId ? { ...g, ...gateForm } : g)
          }));
          appendAuditLog('MAP_GATE_UPDATE', `Updated gate ${gateForm.id}`);
          addToast(`Gate ${gateForm.id} updated!`, 'success');
        } else {
          const ng = { id: `${gateForm.terminal}-G${Date.now().toString().slice(-2)}`, ...gateForm };
          setDb(prev => ({ ...prev, gates: [...(prev.gates || []), ng] }));
          appendAuditLog('MAP_GATE_CREATE', `Added gate ${ng.id} to terminal ${gateForm.terminal}`);
          addToast(`Gate ${ng.id} added!`, 'success');
        }
        setShowGateModal(false); setEditGateId(null);
      };

      const handleDeleteGate = (id) => {
        if (!canManage) return;
        setDb(prev => ({
          ...prev,
          gates: (prev.gates || []).filter(g => g.id !== id)
        }));
        appendAuditLog('MAP_GATE_DELETE', `Deleted gate ${id}`);
        addToast(`Gate ${id} deleted`, 'danger');
      };

      // Runway Handlers
      const handleSaveRunway = (e) => {
        e.preventDefault();
        if (editRunwayId) {
          setDb(prev => ({
            ...prev,
            runways: runways.map(r => r.id === editRunwayId ? { ...r, ...runwayForm } : r)
          }));
          appendAuditLog('MAP_RUNWAY_UPDATE', `Updated runway ${runwayForm.name}`);
          addToast(`Runway ${runwayForm.name} updated!`, 'success');
        } else {
          const nr = { id: `RWY-${Date.now().toString().slice(-3)}`, ...runwayForm };
          setDb(prev => ({ ...prev, runways: [...runways, nr] }));
          appendAuditLog('MAP_RUNWAY_CREATE', `Created runway ${runwayForm.name}`);
          addToast(`Runway ${runwayForm.name} added!`, 'success');
        }
        setShowRunwayModal(false); setEditRunwayId(null);
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
      const handleSaveShop = (e) => {
        e.preventDefault();
        if (editShopId) {
          setDb(prev => ({
            ...prev,
            shops: shops.map(s => s.id === editShopId ? { ...s, ...shopForm } : s)
          }));
          appendAuditLog('MAP_SHOP_UPDATE', `Updated store ${shopForm.name}`);
          addToast(`Store ${shopForm.name} updated!`, 'success');
        } else {
          const ns = { id: `SHP-${Date.now().toString().slice(-3)}`, ...shopForm };
          setDb(prev => ({ ...prev, shops: [...shops, ns] }));
          appendAuditLog('MAP_SHOP_CREATE', `Added store ${shopForm.name}`);
          addToast(`Store ${shopForm.name} added to airport layout!`, 'success');
        }
        setShowShopModal(false); setEditShopId(null);
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
          shops: shops.map(s => s.id === id ? { ...s, status: nextStatus } : s)
        }));
        addToast(`Store status set to ${nextStatus}`, 'info');
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* HEADER & TAB NAVIGATION */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h2 style={{ fontWeight: 800, margin: 0 }}>🗺️ Airport Layout & AI Live Transportation ETAs — {aptName} ({aptCode})</h2>
                <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>🤖 AI Realtime ETAs Active</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>
                Nearest Metro, Express Bus, Inter-Terminal Shuttle & Taxi Hubs with live AI arrival countdowns
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button className={`btn ${mapSection === 'transportation' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMapSection('transportation')}>
                🚆 Nearest Transit & AI ETAs
              </button>
              <button className={`btn ${mapSection === 'terminals' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMapSection('terminals')}>
                🏢 Terminals & Gates
              </button>
              <button className={`btn ${mapSection === 'runways' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMapSection('runways')}>
                🛫 Runways & Taxiways
              </button>
              <button className={`btn ${mapSection === 'shops' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMapSection('shops')}>
                🛍️ Commercial Outlets
              </button>
            </div>
          </div>

          {/* ADMIN EDITOR ACTION BAR */}
          {canManage && (
            <div className="glass-card" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.3)', padding: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
                👑 Admin Map Editor & Layout Creator Active
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button className="btn btn-secondary" style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', borderColor: 'rgba(0,242,254,0.3)' }} onClick={() => {
                  setTerminalForm({ id: '', name: '', code: `T${terminals.length + 1}`, type: 'Domestic', status: 'Active', description: '' });
                  setEditTerminalId(null);
                  setShowTerminalModal(true);
                }}>
                  + Add New Terminal
                </button>
                <button className="btn btn-secondary" style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', borderColor: 'rgba(16,185,129,0.3)' }} onClick={() => {
                  setGateForm({ id: '', terminal: terminals[0]?.code || 'T3', type: 'Widebody', status: 'Available', flight: '', compat: 'A320/B787', pax: 0, mapUrl: '' });
                  setEditGateId(null);
                  setShowGateModal(true);
                }}>
                  + Add New Gate
                </button>
                <button className="btn btn-secondary" style={{ fontSize: '0.78rem', color: 'var(--accent-amber)', borderColor: 'rgba(245,158,11,0.3)' }} onClick={() => {
                  setRunwayForm({ id: '', name: `Runway 0${runways.length + 1}`, length: '3,800m', ilsCategory: 'CAT-II', status: 'Active', trafficLevel: 'Moderate' });
                  setEditRunwayId(null);
                  setShowRunwayModal(true);
                }}>
                  + Add New Runway
                </button>
                <button className="btn btn-primary" style={{ fontSize: '0.78rem', background: 'linear-gradient(135deg, var(--accent-amber), #d97706)', color: '#000', fontWeight: 800 }} onClick={() => {
                  setShopForm({ id: '', name: '', category: 'Retail', terminal: terminals[0]?.code || 'T3', location: '', status: 'OPEN', operatingHours: '24/7', mapUrl: '' });
                  setEditShopId(null);
                  setShowShopModal(true);
                }}>
                  + Add New Shop / Store
                </button>
              </div>
            </div>
          )}

          {/* SECTION 0: NEAREST TRANSPORTATION OPTIONS & LIVE AI ETAS */}
          {mapSection === 'transportation' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* INTERACTIVE SCHEMATIC TRANSIT MAP OVERLAY */}
              <div className="glass-card" style={{ border: '2px solid var(--accent-cyan)', background: 'rgba(0,242,254,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ color: 'var(--accent-cyan)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>🗺️</span> Airport Ground Transit Map & Live AI Arrival ETAs
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      Real-time AI prediction algorithm updating departure countdowns every second based on GPS telemetry & traffic data.
                    </div>
                  </div>
                  <button className="btn btn-primary" style={{ fontSize: '0.8rem', background: 'linear-gradient(135deg, var(--accent-cyan), #0284c7)' }} onClick={handleManualRefreshAI}>
                    ⚡ Recalculate AI ETAs Now
                  </button>
                </div>

                {/* SCHEMATIC VISUAL MAP CONTAINER */}
                <div style={{
                  background: '#070a12',
                  borderRadius: '10px',
                  padding: '1.25rem',
                  border: '1px dashed var(--accent-cyan)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>📍 INTERACTIVE AIRPORT GROUND TRANSPORT SCHEMATIC</span>
                    <span>AI PRECISION MODEL v4.2 (ACCURACY 99.8%)</span>
                  </div>

                  {/* CONNECTING TRANSIT ROUTE PADS */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    {transitData.map(item => (
                      <div
                        key={item.id}
                        style={{
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
                        }}
                        onClick={(e) => openGoogleMap(item, 'transit', e)}
                        title="Click to open this Transit Station location on Google Maps"
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                            <strong style={{ fontSize: '0.9rem', color: '#fff' }}>{item.type}</strong>
                          </div>
                          <span className="badge badge-success" style={{ fontSize: '0.62rem' }}>{item.status}</span>
                        </div>

                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                          {item.name}
                        </div>

                        {/* LIVE AI COUNTDOWN BADGE */}
                        <div style={{
                          background: 'linear-gradient(135deg, rgba(0,242,254,0.15), rgba(16,185,129,0.15))',
                          border: '1px solid var(--accent-emerald)',
                          padding: '0.5rem',
                          borderRadius: '6px',
                          display: 'flex',
                          justify: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>NEXT DEPARTURE ETA:</span>
                          <span style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-emerald)', letterSpacing: '1px' }}>
                            ⏱️ {formatETA(item.nextDepartureSec)}
                          </span>
                        </div>

                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          📍 {item.location}
                        </div>

                        <div style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', fontWeight: 600, marginTop: '0.2rem' }}>
                          📌 Click to open station location on Google Maps →
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* DETAILED TRANSIT SCHEDULE & DESTINATION ETAS GRID */}
              <div className="grid-2">
                {transitData.map(item => (
                  <div key={item.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.6rem' }}>{item.icon}</span>
                        <div>
                          <strong style={{ fontSize: '1.05rem', color: 'var(--accent-cyan)' }}>{item.name}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Terminal Hub: {item.terminal}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                          {formatETA(item.nextDepartureSec)}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Next Live Departure</div>
                      </div>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Frequency:</span>
                        <strong>{item.frequency}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>AI Congestion / Traffic Index:</span>
                        <strong style={{ color: 'var(--accent-amber)' }}>{item.aiCrowdIndex}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>AI Telemetry Accuracy:</span>
                        <strong style={{ color: 'var(--accent-emerald)' }}>{item.aiConfidence}</strong>
                      </div>
                    </div>

                    {/* DESTINATION FARES & TRAVEL TIME TABLE */}
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}>
                        🏁 Key Destinations & Travel Times:
                      </div>
                      <table style={{ width: '100%', fontSize: '0.78rem', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                            <th style={{ padding: '0.35rem 0' }}>Destination</th>
                            <th style={{ textAlign: 'center' }}>Travel Time</th>
                            <th style={{ textAlign: 'right' }}>Fare (₹)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.destinations.map((d, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                              <td style={{ padding: '0.4rem 0', fontWeight: 600 }}>{d.station}</td>
                              <td style={{ textAlign: 'center', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{d.travelTime}</td>
                              <td style={{ textAlign: 'right', color: 'var(--accent-emerald)', fontWeight: 800 }}>{d.fare}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <button
                      className="btn btn-secondary"
                      style={{ marginTop: 'auto', justifyContent: 'center', fontSize: '0.8rem', color: 'var(--accent-cyan)', borderColor: 'rgba(0,242,254,0.3)' }}
                      onClick={(e) => openGoogleMap(item, 'transit', e)}
                    >
                      📍 Open {item.name} Location on Google Maps
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 1: TERMINALS & GATES */}
          {mapSection === 'terminals' && (
            <div className="grid-3">
              {terminals.map(term => {
                const tGates = (db.gates || []).filter(g => g.terminal === term.code || g.terminal === term.id);
                const occupied = tGates.filter(g => g.status === 'Occupied').length;
                return (
                  <div key={term.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="card-title" style={{ fontSize: '1rem', color: 'var(--accent-cyan)' }}>🏢 {term.name}</div>
                      <span className={`badge ${term.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>{term.status}</span>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{term.description}</div>

                    <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '8px' }}>
                      <div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{tGates.length}</div><div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Gates</div></div>
                      <div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{occupied}</div><div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Occupied</div></div>
                      <div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-amber)' }}>{tGates.filter(g => g.status === 'Available').length}</div><div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Available</div></div>
                    </div>

                    {/* GATES GRID */}
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Concourse Boarding Gates:</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                        {tGates.map(g => (
                          <div key={g.id} style={{
                            padding: '0.45rem 0.3rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontSize: '0.68rem', fontWeight: 700,
                            background: g.status === 'Occupied' ? 'rgba(16,185,129,0.2)' : g.status === 'Maintenance' ? 'rgba(244,63,94,0.2)' : g.status === 'Reserved' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${g.status === 'Occupied' ? 'rgba(16,185,129,0.4)' : g.status === 'Maintenance' ? 'rgba(244,63,94,0.4)' : g.status === 'Reserved' ? 'rgba(245,158,11,0.4)' : 'var(--border-color)'}`,
                            color: g.status === 'Occupied' ? 'var(--accent-emerald)' : g.status === 'Maintenance' ? 'var(--accent-rose)' : g.status === 'Reserved' ? 'var(--accent-amber)' : 'var(--text-secondary)',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'transform 0.15s, border-color 0.15s'
                          }} onClick={(e) => openGoogleMap(g, 'gate', e)} title={`Click to open Gate ${g.id} location on Google Maps`}>
                            <div>{g.id}</div>
                            <div style={{ fontSize: '0.6rem', opacity: 0.85, marginTop: '1px' }}>{g.flight || g.status}</div>
                            {canManage && (
                              <div style={{ display: 'flex', justifyContent: 'center', gap: '3px', marginTop: '4px' }}>
                                <button className="btn btn-secondary" style={{ padding: '1px 4px', fontSize: '0.58rem' }} onClick={(e) => { e.stopPropagation(); setGateForm({ ...g, flight: g.flight || '', compat: g.compat || '', pax: g.pax || 0, mapUrl: g.mapUrl || '' }); setEditGateId(g.id); setShowGateModal(true); }} title="Edit Gate Details">✏️ Edit</button>
                                <button className="btn btn-secondary" style={{ padding: '1px 4px', fontSize: '0.58rem', color: 'var(--accent-rose)' }} onClick={(e) => { e.stopPropagation(); handleDeleteGate(g.id); }} title="Delete Gate">✕</button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ADMIN ACTIONS ON TERMINAL */}
                    {canManage && (
                      <div style={{ marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)', display: 'flex', gap: '0.35rem' }}>
                        <button className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem', flex: 1 }} onClick={() => {
                          setTerminalForm({ ...term });
                          setEditTerminalId(term.id);
                          setShowTerminalModal(true);
                        }}>✏️ Edit Terminal</button>
                        <button className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem', color: 'var(--accent-emerald)' }} onClick={() => {
                          setGateForm({ id: `${term.code}-G${Date.now().toString().slice(-2)}`, terminal: term.code, type: 'Narrowbody', status: 'Available', flight: '', compat: 'A320/B737', pax: 0, mapUrl: '' });
                          setEditGateId(null);
                          setShowGateModal(true);
                        }}>+ Add Gate</button>
                        {isAdmin && (
                          <button className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem', color: 'var(--accent-rose)' }} onClick={() => handleDeleteTerminal(term.id, term.name)}>🗑️</button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* SECTION 2: RUNWAYS & TAXIWAYS */}
          {mapSection === 'runways' && (
            <div className="glass-card">
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div className="card-title">🛫 Active Airside Runways & Taxiway Layout</div>
                {canManage && (
                  <button className="btn btn-primary" style={{ fontSize: '0.78rem' }} onClick={() => {
                    setRunwayForm({ id: '', name: `Runway 0${runways.length + 1}`, length: '3,800m', ilsCategory: 'CAT-II', status: 'Active', trafficLevel: 'Moderate' });
                    setEditRunwayId(null);
                    setShowRunwayModal(true);
                  }}>+ Add Runway</button>
                )}
              </div>

              <div className="grid-3">
                {runways.map(r => (
                  <div key={r.id} style={{ padding: '1rem', border: `1px solid ${r.status === 'Active' ? 'rgba(16,185,129,0.3)' : 'rgba(244,63,94,0.3)'}`, borderRadius: 'var(--radius-md)', background: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)' }}>{r.name}</strong>
                      <span className={`badge ${r.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>{r.status}</span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <div>Length: <strong>{r.length}</strong></div>
                      <div>ILS Navigation: <strong>{r.ilsCategory}</strong></div>
                      <div>Traffic Density: <strong>{r.trafficLevel}</strong></div>
                    </div>

                    {canManage && (
                      <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.35rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)' }}>
                        <button className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem', flex: 1 }} onClick={() => {
                          setRunwayForm({ ...r });
                          setEditRunwayId(r.id);
                          setShowRunwayModal(true);
                        }}>✏️ Edit</button>
                        {isAdmin && (
                          <button className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem', color: 'var(--accent-rose)' }} onClick={() => handleDeleteRunway(r.id, r.name)}>🗑️ Delete</button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 3: COMMERCIAL SHOPS, DINING & LOUNGES */}
          {mapSection === 'shops' && (
            <div className="glass-card">
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ color: 'var(--accent-amber)' }}>🛍️ Retail Shops, Dining & Commercial Directory ({shops.length})</h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>Explore commercial outlets, duty-free stores, food courts, and lounges across all airport terminals</div>
                </div>
                {canManage && (
                  <button className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--accent-amber), #d97706)', color: '#000', fontWeight: 800 }} onClick={() => {
                    setShopForm({ id: '', name: '', category: 'Retail', terminal: terminals[0]?.code || 'T3', location: '', status: 'OPEN', operatingHours: '24/7', mapUrl: '' });
                    setEditShopId(null);
                    setShowShopModal(true);
                  }}>
                    + Add New Shop / Restaurant
                  </button>
                )}
              </div>

              <div className="grid-3">
                {shops.map(s => (
                  <div key={s.id} className="glass-card" style={{ padding: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderColor: s.status === 'OPEN' ? 'rgba(16,185,129,0.3)' : 'rgba(244,63,94,0.3)', cursor: 'pointer' }} onClick={(e) => openGoogleMap(s, 'shop', e)} title={`Click to open ${s.name} location on Google Maps`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)' }}>{s.name}</strong>
                      <span className={`badge ${s.status === 'OPEN' ? 'badge-success' : 'badge-danger'}`}>{s.status}</span>
                    </div>

                    <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <div style={{ color: 'var(--accent-amber)', fontWeight: 600 }}>Category: {s.category}</div>
                      <div style={{ color: 'var(--text-secondary)' }}>Terminal & Location: <strong>{s.terminal} • {s.location}</strong></div>
                      <div style={{ color: 'var(--text-muted)' }}>Hours: <strong>{s.operatingHours}</strong></div>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.1rem' }}>
                      <em>Click tile to view on Google Maps</em>
                    </div>

                    {canManage && (
                      <div style={{ marginTop: '0.3rem', display: 'flex', gap: '0.35rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)' }} onClick={e => e.stopPropagation()}>
                        <button className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem', flex: 1 }} onClick={(e) => { e.stopPropagation(); toggleShopStatus(s.id, s.status); }}>
                          {s.status === 'OPEN' ? '🔒 Mark Closed' : '🟢 Mark Open'}
                        </button>
                        <button className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem' }} onClick={(e) => {
                          e.stopPropagation();
                          setShopForm({ ...s });
                          setEditShopId(s.id);
                          setShowShopModal(true);
                        }}>✏️ Edit</button>
                        <button className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem', color: 'var(--accent-rose)' }} onClick={(e) => { e.stopPropagation(); handleDeleteShop(s.id, s.name); }}>🗑️</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADMIN MODAL: ADD/EDIT TERMINAL */}
          {showTerminalModal && (
            <div className="modal-overlay" onClick={e => { if (e.target.className.includes('modal-overlay')) setShowTerminalModal(false); }}>
              <div className="modal-card" style={{ maxWidth: '480px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ color: 'var(--accent-cyan)' }}>{editTerminalId ? '✏️ Edit Terminal' : '🏢 Add New Terminal to Airport Map'}</h3>
                  <button className="btn btn-secondary" onClick={() => setShowTerminalModal(false)}>&times;</button>
                </div>
                <form onSubmit={handleSaveTerminal} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Terminal Name</label><input required className="form-input" placeholder="e.g. Terminal 4 (Executive VIP)" value={terminalForm.name} onChange={e => setTerminalForm({ ...terminalForm, name: e.target.value })} /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Terminal Code</label><input required className="form-input" placeholder="T4" value={terminalForm.code} onChange={e => setTerminalForm({ ...terminalForm, code: e.target.value })} /></div>
                    <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Terminal Type</label><select className="form-select" value={terminalForm.type} onChange={e => setTerminalForm({ ...terminalForm, type: e.target.value })}><option>Domestic</option><option>International</option><option>Cargo & Executive</option></select></div>
                  </div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Description</label><textarea className="form-input" rows="2" value={terminalForm.description} onChange={e => setTerminalForm({ ...terminalForm, description: e.target.value })}></textarea></div>
                  <button type="submit" className="btn btn-primary">{editTerminalId ? 'Save Changes' : 'Create Terminal'}</button>
                </form>
              </div>
            </div>
          )}

          {/* ADMIN MODAL: ADD/EDIT GATE */}
          {showGateModal && (
            <div className="modal-overlay" onClick={e => { if (e.target.className.includes('modal-overlay')) setShowGateModal(false); }}>
              <div className="modal-card" style={{ maxWidth: '480px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ color: 'var(--accent-emerald)' }}>{editGateId ? `✏️ Edit Gate ${editGateId}` : '🚪 Add New Boarding Gate'}</h3>
                  <button className="btn btn-secondary" onClick={() => setShowGateModal(false)}>&times;</button>
                </div>
                <form onSubmit={handleSaveGate} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Gate Identifier / Code</label>
                    <input required className="form-input" placeholder="e.g. T3-G45" value={gateForm.id} onChange={e => setGateForm({ ...gateForm, id: e.target.value })} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Assigned Terminal</label>
                      <select className="form-select" value={gateForm.terminal} onChange={e => setGateForm({ ...gateForm, terminal: e.target.value })}>
                        {terminals.map(t => <option key={t.id} value={t.code}>{t.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Gate Type</label>
                      <select className="form-select" value={gateForm.type} onChange={e => setGateForm({ ...gateForm, type: e.target.value })}>
                        <option>Narrowbody</option>
                        <option>Widebody</option>
                        <option>Regional Jet</option>
                        <option>Super Jumbo (A380)</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Gate Status</label>
                      <select className="form-select" value={gateForm.status} onChange={e => setGateForm({ ...gateForm, status: e.target.value })}>
                        <option>Available</option>
                        <option>Occupied</option>
                        <option>Reserved</option>
                        <option>Maintenance</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Assigned Flight</label>
                      <input className="form-input" placeholder="e.g. AI-101 or None" value={gateForm.flight || ''} onChange={e => setGateForm({ ...gateForm, flight: e.target.value || null })} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Aircraft Compatibility</label>
                      <input className="form-input" placeholder="e.g. A320/B787/A350" value={gateForm.compat || ''} onChange={e => setGateForm({ ...gateForm, compat: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Passengers Count</label>
                      <input type="number" className="form-input" value={gateForm.pax || 0} onChange={e => setGateForm({ ...gateForm, pax: parseInt(e.target.value) || 0 })} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Google Maps Location Link / Map URL (Optional)</label>
                    <input className="form-input" placeholder="https://maps.google.com/?q=Delhi+Airport+T3+Gate+42" value={gateForm.mapUrl || ''} onChange={e => setGateForm({ ...gateForm, mapUrl: e.target.value })} />
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>*If left blank, Google Maps pinpoints this gate automatically.*</div>
                  </div>
                  <button type="submit" className="btn btn-primary">{editGateId ? 'Save Gate Changes' : 'Create Boarding Gate'}</button>
                </form>
              </div>
            </div>
          )}

          {/* ADMIN MODAL: ADD/EDIT RUNWAY */}
          {showRunwayModal && (
            <div className="modal-overlay" onClick={e => { if (e.target.className.includes('modal-overlay')) setShowRunwayModal(false); }}>
              <div className="modal-card" style={{ maxWidth: '450px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ color: 'var(--accent-amber)' }}>{editRunwayId ? '✏️ Edit Runway' : '🛫 Add New Runway / Taxiway'}</h3>
                  <button className="btn btn-secondary" onClick={() => setShowRunwayModal(false)}>&times;</button>
                </div>
                <form onSubmit={handleSaveRunway} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Runway Name</label><input required className="form-input" placeholder="Runway 28R/10L" value={runwayForm.name} onChange={e => setRunwayForm({ ...runwayForm, name: e.target.value })} /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Length</label><input required className="form-input" placeholder="4,200m" value={runwayForm.length} onChange={e => setRunwayForm({ ...runwayForm, length: e.target.value })} /></div>
                    <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ILS Category</label><select className="form-select" value={runwayForm.ilsCategory} onChange={e => setRunwayForm({ ...runwayForm, ilsCategory: e.target.value })}><option>CAT-III B</option><option>CAT-III A</option><option>CAT-II</option><option>CAT-I</option><option>N/A</option></select></div>
                  </div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Status</label><select className="form-select" value={runwayForm.status} onChange={e => setRunwayForm({ ...runwayForm, status: e.target.value })}><option>Active</option><option>Under Maintenance</option><option>Closed</option></select></div>
                  <button type="submit" className="btn btn-primary">{editRunwayId ? 'Save Changes' : 'Create Runway'}</button>
                </form>
              </div>
            </div>
          )}

          {/* ADMIN MODAL: ADD/EDIT SHOP */}
          {showShopModal && (
            <div className="modal-overlay" onClick={e => { if (e.target.className.includes('modal-overlay')) setShowShopModal(false); }}>
              <div className="modal-card" style={{ maxWidth: '480px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ color: 'var(--accent-amber)' }}>{editShopId ? '✏️ Edit Commercial Store / Restaurant' : '🛍️ Add New Shop / Restaurant Outlet'}</h3>
                  <button className="btn btn-secondary" onClick={() => setShowShopModal(false)}>&times;</button>
                </div>
                <form onSubmit={handleSaveShop} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Store / Restaurant Name</label><input required className="form-input" placeholder="e.g. Costa Coffee, Nike Retail" value={shopForm.name} onChange={e => setShopForm({ ...shopForm, name: e.target.value })} /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Category</label><select className="form-select" value={shopForm.category} onChange={e => setShopForm({ ...shopForm, category: e.target.value })}><option>Retail</option><option>Duty Free</option><option>Food & Beverage</option><option>Lounge & Hospitality</option><option>Pharmacy & Health</option><option>Currency Exchange</option></select></div>
                    <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Terminal</label><select className="form-select" value={shopForm.terminal} onChange={e => setShopForm({ ...shopForm, terminal: e.target.value })}>{terminals.map(t => <option key={t.id} value={t.code}>{t.name}</option>)}</select></div>
                  </div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Specific Location / Gate Area</label><input required className="form-input" placeholder="T3 Departure Airside Concourse Gate 28" value={shopForm.location} onChange={e => setShopForm({ ...shopForm, location: e.target.value })} /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Operating Hours</label><input required className="form-input" placeholder="24/7 or 06:00 - 23:00" value={shopForm.operatingHours} onChange={e => setShopForm({ ...shopForm, operatingHours: e.target.value })} /></div>
                    <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Status</label><select className="form-select" value={shopForm.status} onChange={e => setShopForm({ ...shopForm, status: e.target.value })}><option>OPEN</option><option>CLOSED</option><option>RENOVATING</option></select></div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Google Maps Location Link / Map URL (Optional)</label>
                    <input className="form-input" placeholder="https://maps.google.com/?q=Delhi+Duty+Free+T3" value={shopForm.mapUrl || ''} onChange={e => setShopForm({ ...shopForm, mapUrl: e.target.value })} />
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>*If left blank, Google Maps pinpoints this store automatically.*</div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--accent-amber), #d97706)', color: '#000', fontWeight: 800 }}>{editShopId ? 'Save Changes' : 'Create Shop Entry'}</button>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    }

    function FlightsView({ db, setDb, isAdmin, isATC, addToast, appendAuditLog, searchQuery, activeAirport }) {
      const aptCode = activeAirport?.code || 'DEL';
      const aptCity = activeAirport?.city || 'Delhi';
      const [showAddModal, setShowAddModal] = useState(false);
      const [editId, setEditId] = useState(null);
      const [flightForm, setFlightForm] = useState({flightNumber:'',airline:'',type:'Departure',destination:'',origin:`${aptCity} (${aptCode})`,scheduledTime:'',estimatedTime:'',terminal:'T3',gate:'',status:'Scheduled',pax:0,maxPax:186,bags:0,aircraft:'',aiDelayRisk:0,boardingPct:0});
      const [filterType, setFilterType] = useState('ALL');
      const [filterStatus, setFilterStatus] = useState('ALL');

      const filtered = db.flights.filter(f => {
        if(filterType!=='ALL' && f.type!==filterType) return false;
        if(filterStatus!=='ALL' && f.status!==filterStatus) return false;
        if(searchQuery && !f.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) && !f.airline.toLowerCase().includes(searchQuery.toLowerCase()) && !f.destination.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
      });

      const handleSaveFlight = (e) => {
        e.preventDefault();
        if(editId) {
          setDb(prev=>({...prev,flights:prev.flights.map(f=>f.id===editId?{...f,...flightForm}:f)}));
          appendAuditLog('FLIGHT_UPDATE',`Updated ${flightForm.flightNumber}`);
          addToast(`Flight ${flightForm.flightNumber} updated!`,'success');
        } else {
          const nf = {id:`FL-${Date.now().toString().slice(-3)}`,...flightForm};
          setDb(prev=>({...prev,flights:[...prev.flights,nf]}));
          appendAuditLog('FLIGHT_CREATE',`Created flight ${flightForm.flightNumber}`);
          addToast(`Flight ${flightForm.flightNumber} added!`,'success');
        }
        setShowAddModal(false); setEditId(null);
      };

      const handleDeleteFlight = (id, fn) => {
        setDb(prev=>({...prev,flights:prev.flights.filter(f=>f.id!==id)}));
        appendAuditLog('FLIGHT_DELETE',`Deleted flight ${fn}`);
        addToast(`Flight ${fn} deleted`,'danger');
      };

      const openEdit = (f) => {
        setFlightForm({flightNumber:f.flightNumber,airline:f.airline,type:f.type,destination:f.destination,origin:f.origin,scheduledTime:f.scheduledTime,estimatedTime:f.estimatedTime,terminal:f.terminal,gate:f.gate,status:f.status,pax:f.pax,maxPax:f.maxPax,bags:f.bags,aircraft:f.aircraft,aiDelayRisk:f.aiDelayRisk,boardingPct:f.boardingPct});
        setEditId(f.id); setShowAddModal(true);
      };

      return (
        <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem'}}>
            <div>
              <h2 style={{fontWeight:800}}>✈️ Flight Information Display System (FIDS) — {aptCity} ({aptCode})</h2>
              <div style={{fontSize:'0.8rem',color:'var(--accent-cyan)',marginTop:'0.2rem'}}>Showing active flights for AAI {activeAirport?.name || 'Indira Gandhi International Airport'}</div>
            </div>
            <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
              <select className="form-select" value={filterType} onChange={e=>setFilterType(e.target.value)} style={{width:'auto'}}><option value="ALL">All Types</option><option value="Departure">Departures</option><option value="Arrival">Arrivals</option></select>
              <select className="form-select" value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={{width:'auto'}}><option value="ALL">All Status</option><option value="Boarding">Boarding</option><option value="Delayed">Delayed</option><option value="On Time">On Time</option><option value="Landed">Landed</option><option value="In Flight">In Flight</option><option value="Scheduled">Scheduled</option><option value="Check-in Open">Check-in Open</option></select>
              {isAdmin && <button className="btn btn-primary" onClick={()=>{setFlightForm({flightNumber:'',airline:'',type:'Departure',destination:'',origin:`${aptCity} (${aptCode})`,scheduledTime:'',estimatedTime:'',terminal:'T3',gate:'',status:'Scheduled',pax:0,maxPax:186,bags:0,aircraft:'',aiDelayRisk:0,boardingPct:0});setEditId(null);setShowAddModal(true);}}>+ Add Flight</button>}
            </div>
          </div>

          <div className="glass-card" style={{overflowX:'auto'}}>
            <table style={{width:'100%',fontSize:'0.82rem',borderCollapse:'collapse',minWidth:'900px'}}>
              <thead><tr style={{borderBottom:'2px solid var(--border-color)',color:'var(--text-secondary)',fontSize:'0.75rem',textTransform:'uppercase',letterSpacing:'0.05em'}}>
                <th style={{padding:'0.75rem',textAlign:'left'}}>Flight</th><th style={{textAlign:'left'}}>Airline</th><th style={{textAlign:'left'}}>Route</th><th style={{textAlign:'left'}}>STD/STA</th><th style={{textAlign:'left'}}>ETD/ETA</th><th style={{textAlign:'left'}}>Terminal</th><th style={{textAlign:'left'}}>Gate</th><th style={{textAlign:'left'}}>Aircraft</th><th style={{textAlign:'left'}}>Status</th><th style={{textAlign:'left'}}>Pax</th><th style={{textAlign:'left'}}>AI Risk</th>
                {isAdmin && <th style={{textAlign:'center'}}>Actions</th>}
              </tr></thead>
              <tbody>
                {filtered.map(f=>(
                  <tr key={f.id} style={{borderBottom:'1px solid rgba(255,255,255,0.04)',transition:'background 0.2s'}} onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.03)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <td style={{padding:'0.75rem',fontWeight:700,color:'var(--accent-cyan)'}}>{f.flightNumber}</td>
                    <td>{f.airline}</td>
                    <td style={{fontSize:'0.78rem',color:'var(--text-secondary)'}}>{f.type==='Departure'?`DEL → ${f.destination.match(/\((\w+)\)/)?.[1]||''}`:`${f.origin.match(/\((\w+)\)/)?.[1]||''} → DEL`}</td>
                    <td style={{fontFamily:'var(--font-mono)'}}>{f.scheduledTime}</td>
                    <td style={{fontFamily:'var(--font-mono)',color:f.estimatedTime!==f.scheduledTime?'var(--accent-rose)':'var(--accent-emerald)'}}>{f.estimatedTime}</td>
                    <td>{f.terminal}</td>
                    <td>{f.gate}</td>
                    <td style={{fontSize:'0.76rem',color:'var(--text-secondary)'}}>{f.aircraft}</td>
                    <td><span className={`badge ${f.status==='Delayed'?'badge-danger':f.status==='Boarding'||f.status==='Landed'?'badge-success':f.status==='In Flight'?'badge-warning':'badge-info'}`}>{f.status}</span></td>
                    <td>{f.pax}/{f.maxPax}</td>
                    <td><div style={{width:'40px',height:'6px',borderRadius:'3px',background:'rgba(255,255,255,0.1)',overflow:'hidden'}}><div style={{width:`${f.aiDelayRisk}%`,height:'100%',background:f.aiDelayRisk>50?'var(--accent-rose)':f.aiDelayRisk>20?'var(--accent-amber)':'var(--accent-emerald)',borderRadius:'3px'}}></div></div><span style={{fontSize:'0.7rem',color:'var(--text-muted)'}}>{f.aiDelayRisk}%</span></td>
                    {isAdmin && <td style={{textAlign:'center'}}><button className="btn btn-secondary" style={{padding:'0.2rem 0.5rem',fontSize:'0.7rem',marginRight:'0.25rem'}} onClick={()=>openEdit(f)}>✏️ Edit</button><button className="btn btn-secondary" style={{padding:'0.2rem 0.5rem',fontSize:'0.7rem',color:'var(--accent-rose)'}} onClick={()=>handleDeleteFlight(f.id,f.flightNumber)}>🗑️ Delete</button></td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showAddModal && (
            <div className="modal-overlay" onClick={e=>{if(e.target.className.includes('modal-overlay')){setShowAddModal(false);setEditId(null);}}}>
              <div className="modal-card" style={{maxWidth:'700px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1rem'}}><h3 style={{color:'var(--accent-cyan)'}}>{editId?'✏️ Edit Flight':'➕ Add New Flight'}</h3><button className="btn btn-secondary" onClick={()=>{setShowAddModal(false);setEditId(null);}}>✕</button></div>
                <form onSubmit={handleSaveFlight} style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem'}}>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Flight Number</label><input required className="form-input" value={flightForm.flightNumber} onChange={e=>setFlightForm({...flightForm,flightNumber:e.target.value})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Airline</label><input required className="form-input" value={flightForm.airline} onChange={e=>setFlightForm({...flightForm,airline:e.target.value})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Type</label><select className="form-select" value={flightForm.type} onChange={e=>setFlightForm({...flightForm,type:e.target.value})}><option value="Departure">Departure</option><option value="Arrival">Arrival</option></select></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Status</label><select className="form-select" value={flightForm.status} onChange={e=>setFlightForm({...flightForm,status:e.target.value})}><option>Scheduled</option><option>Check-in Open</option><option>Boarding</option><option>Delayed</option><option>In Flight</option><option>Landed</option><option>On Time</option><option>Cancelled</option></select></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Origin</label><input required className="form-input" value={flightForm.origin} onChange={e=>setFlightForm({...flightForm,origin:e.target.value})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Destination</label><input required className="form-input" value={flightForm.destination} onChange={e=>setFlightForm({...flightForm,destination:e.target.value})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Scheduled Time</label><input required className="form-input" value={flightForm.scheduledTime} onChange={e=>setFlightForm({...flightForm,scheduledTime:e.target.value})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Estimated Time</label><input required className="form-input" value={flightForm.estimatedTime} onChange={e=>setFlightForm({...flightForm,estimatedTime:e.target.value})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Terminal</label><select className="form-select" value={flightForm.terminal} onChange={e=>setFlightForm({...flightForm,terminal:e.target.value})}><option>T1</option><option>T2</option><option>T3</option></select></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Gate</label><input className="form-input" value={flightForm.gate} onChange={e=>setFlightForm({...flightForm,gate:e.target.value})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Aircraft</label><input className="form-input" value={flightForm.aircraft} onChange={e=>setFlightForm({...flightForm,aircraft:e.target.value})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>AI Delay Risk %</label><input type="number" className="form-input" value={flightForm.aiDelayRisk} onChange={e=>setFlightForm({...flightForm,aiDelayRisk:parseInt(e.target.value)||0})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Passengers</label><input type="number" className="form-input" value={flightForm.pax} onChange={e=>setFlightForm({...flightForm,pax:parseInt(e.target.value)||0})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Max Capacity</label><input type="number" className="form-input" value={flightForm.maxPax} onChange={e=>setFlightForm({...flightForm,maxPax:parseInt(e.target.value)||0})} /></div>
                  <div style={{gridColumn:'1/-1'}}><button type="submit" className="btn btn-primary" style={{width:'100%'}}>{editId?'Save Changes':'Add Flight'}</button></div>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    }

    // ═══════════════════════════════════════════════════════
    // 4. GATES VIEW
    // ═══════════════════════════════════════════════════════

    function GatesView({ db, setDb, isAdmin, isStaff, addToast, appendAuditLog, activeAirport }) {
      const aptCode = activeAirport?.code || 'DEL';
      const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
      const canManage = isAdmin || isStaff;
      const [showAddModal, setShowAddModal] = useState(false);
      const [editId, setEditId] = useState(null);
      const [gateForm, setGateForm] = useState({id:'',terminal:'T3',status:'Available',flight:'',type:'Widebody',pax:0,compat:'',mapUrl:''});

      const openGoogleMap = (item, type, e) => {
        if (e) e.stopPropagation();
        const mapUrl = (item.mapUrl && item.mapUrl.trim())
          ? (item.mapUrl.startsWith('http') ? item.mapUrl : `https://${item.mapUrl}`)
          : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              type === 'gate'
                ? `${aptName} Terminal ${item.terminal || ''} Gate ${item.id}`
                : `${item.name} ${item.location || ''} ${aptName}`
            )}`;
        window.open(mapUrl, '_blank', 'noopener,noreferrer');
      };

      const handleSaveGate = (e) => {
        e.preventDefault();
        if(editId) {
          setDb(prev=>({...prev,gates:prev.gates.map(g=>g.id===editId?{...g,...gateForm,id:gateForm.id||editId}:g)}));
          appendAuditLog('GATE_UPDATE',`Updated gate ${gateForm.id||editId}`);
          addToast(`Gate ${gateForm.id||editId} updated!`,'success');
        } else {
          const ng = { ...gateForm, id: gateForm.id || `G-${Date.now().toString().slice(-3)}` };
          setDb(prev=>({...prev,gates:[...prev.gates,ng]}));
          appendAuditLog('GATE_CREATE',`Created gate ${ng.id}`);
          addToast(`Gate ${ng.id} added!`,'success');
        }
        setShowAddModal(false); setEditId(null);
      };

      const handleDeleteGate = (id) => {
        setDb(prev=>({...prev,gates:prev.gates.filter(g=>g.id!==id)}));
        appendAuditLog('GATE_DELETE',`Deleted gate ${id}`);
        addToast(`Gate ${id} deleted`,'danger');
      };

      return (
        <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem'}}>
            <div>
              <h2 style={{fontWeight:800}}>🚪 Intelligent Gate Allocation Matrix — {aptName} ({aptCode})</h2>
              <div style={{fontSize:'0.8rem',color:'var(--accent-cyan)',marginTop:'0.2rem'}}>Managing airside gates & apron stands for {aptCode}</div>
            </div>
            {canManage && <button className="btn btn-primary" onClick={()=>{setGateForm({id:'',terminal:'T3',status:'Available',flight:'',type:'Widebody',pax:0,compat:'',mapUrl:''});setEditId(null);setShowAddModal(true);}}>+ Add Gate</button>}
          </div>
          <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
            {['Available','Occupied','Reserved','Maintenance'].map(s=>{
              const count = db.gates.filter(g=>g.status===s).length;
              return <div key={s} className="glass-card" style={{padding:'0.75rem 1.25rem',flex:'1',minWidth:'120px',textAlign:'center'}}>
                <div style={{fontSize:'1.5rem',fontWeight:800,color:s==='Available'?'var(--accent-emerald)':s==='Occupied'?'var(--accent-cyan)':s==='Reserved'?'var(--accent-amber)':'var(--accent-rose)'}}>{count}</div>
                <div style={{fontSize:'0.75rem',color:'var(--text-secondary)',marginTop:'0.2rem'}}>{s}</div>
              </div>;
            })}
          </div>
          <div className="grid-4">
            {db.gates.map(g=>(
              <div key={g.id} className="glass-card" style={{padding:'1rem',borderColor:g.status==='Occupied'?'rgba(16,185,129,0.4)':g.status==='Maintenance'?'rgba(244,63,94,0.4)':g.status==='Reserved'?'rgba(245,158,11,0.4)':'var(--border-color)',cursor:'pointer'}} onClick={(e)=>openGoogleMap(g,'gate',e)} title={`Click to open Gate ${g.id} location on Google Maps`}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.5rem'}}>
                  <strong style={{fontSize:'1rem',color:'var(--accent-cyan)'}}>Gate {g.id}</strong>
                  <span className={`badge ${g.status==='Occupied'?'badge-success':g.status==='Available'?'badge-info':g.status==='Reserved'?'badge-warning':'badge-danger'}`}>{g.status}</span>
                </div>
                <div style={{fontSize:'0.8rem',color:'var(--text-secondary)',display:'flex',flexDirection:'column',gap:'0.2rem'}}>
                  <div>Terminal: <strong>{g.terminal}</strong></div>
                  <div>Type: <strong>{g.type}</strong></div>
                  <div>Compat: <strong>{g.compat || 'N/A'}</strong></div>
                  {g.flight && <div>Flight: <strong style={{color:'var(--accent-emerald)'}}>{g.flight}</strong></div>}
                  {g.pax>0 && <div>Passengers: <strong>{g.pax}</strong></div>}
                </div>
                <div style={{fontSize:'0.72rem',color:'var(--accent-cyan)',fontWeight:600,marginTop:'0.4rem',display:'flex',alignItems:'center',gap:'0.2rem'}}>
                  <em>Click card to view on Google Maps</em>
                </div>
                {canManage && (
                  <div style={{display:'flex',gap:'0.3rem',marginTop:'0.5rem',paddingTop:'0.4rem',borderTop:'1px dashed var(--border-color)'}} onClick={e=>e.stopPropagation()}>
                    <button className="btn btn-secondary" style={{flex:1,padding:'0.25rem',fontSize:'0.7rem'}} onClick={(e)=>{e.stopPropagation();setGateForm({...g, flight: g.flight || '', compat: g.compat || '', pax: g.pax || 0, mapUrl: g.mapUrl || ''});setEditId(g.id);setShowAddModal(true);}}>✏️ Edit Gate</button>
                    <button className="btn btn-secondary" style={{padding:'0.25rem 0.5rem',fontSize:'0.7rem',color:'var(--accent-rose)'}} onClick={(e)=>{e.stopPropagation();handleDeleteGate(g.id);}}>🗑️</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {showAddModal && (
            <div className="modal-overlay" onClick={e=>{if(e.target.className.includes('modal-overlay')){setShowAddModal(false);setEditId(null);}}}>
              <div className="modal-card" style={{maxWidth:'480px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1rem',borderBottom:'1px solid var(--border-color)',paddingBottom:'0.5rem'}}><h3 style={{color:'var(--accent-cyan)'}}>{editId?`✏️ Edit Gate ${editId}`:'➕ Add Gate'}</h3><button className="btn btn-secondary" onClick={()=>{setShowAddModal(false);setEditId(null);}}>✕</button></div>
                <form onSubmit={handleSaveGate} style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Gate Identifier / Code</label><input required className="form-input" placeholder="T3-G99" value={gateForm.id} onChange={e=>setGateForm({...gateForm,id:e.target.value})} /></div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.5rem'}}>
                    <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Terminal</label><select className="form-select" value={gateForm.terminal} onChange={e=>setGateForm({...gateForm,terminal:e.target.value})}>{(db.terminals && db.terminals.length > 0 ? db.terminals : [{code:'T1'},{code:'T2'},{code:'T3'}]).map(t => <option key={t.code || t.id} value={t.code || t.id}>{t.name || t.code}</option>)}</select></div>
                    <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Gate Type</label><select className="form-select" value={gateForm.type} onChange={e=>setGateForm({...gateForm,type:e.target.value})}><option>Narrowbody</option><option>Widebody</option><option>Regional Jet</option><option>Super Jumbo (A380)</option></select></div>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.5rem'}}>
                    <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Status</label><select className="form-select" value={gateForm.status} onChange={e=>setGateForm({...gateForm,status:e.target.value})}><option>Available</option><option>Occupied</option><option>Reserved</option><option>Maintenance</option></select></div>
                    <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Assigned Flight</label><input className="form-input" placeholder="e.g. AI-101" value={gateForm.flight||''} onChange={e=>setGateForm({...gateForm,flight:e.target.value||null})} /></div>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.5rem'}}>
                    <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Aircraft Compatibility</label><input className="form-input" placeholder="e.g. A320/B787" value={gateForm.compat||''} onChange={e=>setGateForm({...gateForm,compat:e.target.value})} /></div>
                    <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Passenger Count</label><input type="number" className="form-input" value={gateForm.pax||0} onChange={e=>setGateForm({...gateForm,pax:parseInt(e.target.value)||0})} /></div>
                  </div>
                  <div>
                    <label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Google Maps Location Link / Map URL (Optional)</label>
                    <input className="form-input" placeholder="https://maps.google.com/?q=Delhi+Airport+T3+Gate+42" value={gateForm.mapUrl||''} onChange={e=>setGateForm({...gateForm,mapUrl:e.target.value})} />
                    <div style={{fontSize:'0.65rem',color:'var(--text-muted)',marginTop:'0.15rem'}}>*If left blank, Google Maps pinpoints this gate automatically.*</div>
                  </div>
                  <button type="submit" className="btn btn-primary">{editId?'Save Gate Changes':'Add Boarding Gate'}</button>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    }

    // ═══════════════════════════════════════════════════════
    // 5. EMERGENCY VIEW
    // ═══════════════════════════════════════════════════════

    function EmergencyView({ db, setDb, isAdmin, isCISF, addToast, appendAuditLog }) {
      const [showAddModal, setShowAddModal] = useState(false);
      const [editId, setEditId] = useState(null);
      const [emgForm, setEmgForm] = useState({category:'Medical Emergency',severity:'Code Yellow',title:'',location:'',responders:'',notes:'',status:'ACTIVE',escalated:false});

      const handleSaveEmg = (e) => {
        e.preventDefault();
        if(editId) {
          setDb(prev=>({...prev,emergencies:prev.emergencies.map(em=>em.id===editId?{...em,...emgForm}:em)}));
          appendAuditLog('EMERGENCY_UPDATE',`Updated ${emgForm.title}`);
          addToast('Emergency updated!','success');
        } else {
          const ne = {id:`EMG-${Date.now().toString().slice(-3)}`,...emgForm,timestamp:new Date().toLocaleString()+' IST'};
          setDb(prev=>({...prev,emergencies:[ne,...prev.emergencies]}));
          appendAuditLog('EMERGENCY_CREATE',`Created: ${emgForm.title}`);
          addToast('🚨 Emergency incident created!','danger');
        }
        setShowAddModal(false); setEditId(null);
      };

      const handleDeleteEmg = (id) => {
        setDb(prev=>({...prev,emergencies:prev.emergencies.filter(e=>e.id!==id)}));
        appendAuditLog('EMERGENCY_DELETE',`Deleted incident ${id}`);
        addToast('Emergency archived','info');
      };

      const resolveEmg = (id) => {
        setDb(prev=>({...prev,emergencies:prev.emergencies.map(e=>e.id===id?{...e,status:'RESOLVED'}:e)}));
        appendAuditLog('EMERGENCY_RESOLVE',`Resolved incident ${id}`);
        addToast('✅ Emergency resolved!','success');
      };

      return (
        <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h2 style={{fontWeight:800}}>🚨 Emergency Command Center</h2>
            {(isAdmin || isCISF) && <button className="btn btn-primary" onClick={()=>{setEmgForm({category:'Medical Emergency',severity:'Code Yellow',title:'',location:'',responders:'',notes:'',status:'ACTIVE',escalated:false});setEditId(null);setShowAddModal(true);}}>+ Report Incident</button>}
          </div>

          <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
            {[{label:'Active',filter:'ACTIVE',color:'var(--accent-rose)'},{label:'Resolved',filter:'RESOLVED',color:'var(--accent-emerald)'},{label:'Escalated',filter:null,color:'var(--accent-amber)'}].map(s=>(
              <div key={s.label} className="glass-card" style={{padding:'0.75rem 1.25rem',flex:1,minWidth:'120px',textAlign:'center'}}>
                <div style={{fontSize:'1.5rem',fontWeight:800,color:s.color}}>{s.filter?db.emergencies.filter(e=>e.status===s.filter).length:db.emergencies.filter(e=>e.escalated).length}</div>
                <div style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>{s.label}</div>
              </div>
            ))}
          </div>

          {db.emergencies.map(e=>(
            <div key={e.id} className="glass-card" style={{borderColor:e.status==='ACTIVE'?'rgba(244,63,94,0.5)':'rgba(16,185,129,0.3)',borderWidth:e.status==='ACTIVE'?'2px':'1px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'0.5rem'}}>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.3rem'}}>
                    <span className={`badge ${e.status==='ACTIVE'?'badge-danger':'badge-success'}`}>{e.status}</span>
                    <span className="badge badge-warning">{e.severity}</span>
                    <span className="badge badge-info">{e.category}</span>
                    {e.escalated && <span className="badge badge-danger">ESCALATED</span>}
                  </div>
                  <h3 style={{fontSize:'1.1rem',marginTop:'0.3rem'}}>{e.title}</h3>
                  <div style={{fontSize:'0.82rem',color:'var(--text-secondary)',marginTop:'0.3rem',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.25rem 1rem'}}>
                    <div>📍 Location: {e.location}</div>
                    <div>👤 Responders: {e.responders}</div>
                    <div>🕐 Reported: {e.timestamp}</div>
                    <div>📋 ID: {e.id}</div>
                  </div>
                  {e.notes && <div style={{marginTop:'0.5rem',padding:'0.5rem',background:'rgba(0,0,0,0.2)',borderRadius:'var(--radius-sm)',fontSize:'0.82rem',color:'var(--text-secondary)',borderLeft:'3px solid var(--accent-amber)'}}>{e.notes}</div>}
                </div>
                <div style={{display:'flex',gap:'0.3rem'}}>
                  {e.status==='ACTIVE' && (isAdmin||isCISF) && <button className="btn btn-primary" style={{fontSize:'0.75rem',padding:'0.3rem 0.6rem'}} onClick={()=>resolveEmg(e.id)}>✅ Resolve</button>}
                  {isAdmin && <button className="btn btn-secondary" style={{fontSize:'0.75rem',padding:'0.3rem 0.5rem'}} onClick={()=>{setEmgForm({category:e.category,severity:e.severity,title:e.title,location:e.location,responders:e.responders,notes:e.notes,status:e.status,escalated:e.escalated});setEditId(e.id);setShowAddModal(true);}}>✏️ Edit</button>}
                  {isAdmin && <button className="btn btn-secondary" style={{fontSize:'0.75rem',padding:'0.3rem 0.5rem',color:'var(--accent-rose)'}} onClick={()=>handleDeleteEmg(e.id)}>🗑️ Delete</button>}
                </div>
              </div>
            </div>
          ))}

          {showAddModal && (
            <div className="modal-overlay" onClick={e=>{if(e.target.className.includes('modal-overlay')){setShowAddModal(false);setEditId(null);}}}>
              <div className="modal-card" style={{maxWidth:'600px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1rem'}}><h3 style={{color:'var(--accent-rose)'}}>{editId?'✏️ Edit Incident':'🚨 Report New Incident'}</h3><button className="btn btn-secondary" onClick={()=>{setShowAddModal(false);setEditId(null);}}>✕</button></div>
                <form onSubmit={handleSaveEmg} style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Category</label><select className="form-select" value={emgForm.category} onChange={e=>setEmgForm({...emgForm,category:e.target.value})}>{EMERGENCY_CATEGORIES.map(c=><option key={c}>{c}</option>)}</select></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Severity</label><select className="form-select" value={emgForm.severity} onChange={e=>setEmgForm({...emgForm,severity:e.target.value})}><option>Code Green</option><option>Code Yellow</option><option>Code Orange</option><option>Code Red</option><option>Code Blue</option></select></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Title</label><input required className="form-input" value={emgForm.title} onChange={e=>setEmgForm({...emgForm,title:e.target.value})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Location</label><input required className="form-input" value={emgForm.location} onChange={e=>setEmgForm({...emgForm,location:e.target.value})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Assigned Responders</label><input className="form-input" value={emgForm.responders} onChange={e=>setEmgForm({...emgForm,responders:e.target.value})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Notes</label><textarea className="form-input" rows="3" value={emgForm.notes} onChange={e=>setEmgForm({...emgForm,notes:e.target.value})}></textarea></div>
                  <div style={{display:'flex',gap:'1rem',alignItems:'center'}}><label style={{fontSize:'0.8rem'}}><input type="checkbox" checked={emgForm.escalated} onChange={e=>setEmgForm({...emgForm,escalated:e.target.checked})} /> Escalated</label></div>
                  <button type="submit" className="btn btn-primary">{editId?'Save Changes':'Report Incident'}</button>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    }

    // ═══════════════════════════════════════════════════════
    // 6. FLEET HEALTH VIEW
    // ═══════════════════════════════════════════════════════

    function FleetHealthView({ db, setDb, isAdmin, isStaff, addToast, appendAuditLog, activeAirport }) {
      const aptCode = activeAirport?.code || 'DEL';
      const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
      const [showAddModal, setShowAddModal] = useState(false);
      const [editId, setEditId] = useState(null);
      const [healthForm, setHealthForm] = useState({
        aircraft: '',
        flight: '',
        status: 'Airworthy',
        engine: '98%',
        hydraulic: '95%',
        tyre: 'Optimal',
        brake: 'Optimal',
        fuel: '94%',
        nextMaint: '2026-08-20'
      });

      const handleSaveHealth = (e) => {
        e.preventDefault();
        if (editId) {
          setDb(prev => ({ ...prev, fleetHealth: prev.fleetHealth.map(fh => fh.id === editId ? { ...fh, ...healthForm } : fh) }));
          appendAuditLog('FLEET_HEALTH_UPDATE', `Updated aircraft ${healthForm.aircraft}`);
          addToast(`Aircraft ${healthForm.aircraft} updated!`, 'success');
        } else {
          const nfh = { id: `FH-${Date.now().toString().slice(-3)}`, ...healthForm };
          setDb(prev => ({ ...prev, fleetHealth: [...prev.fleetHealth, nfh] }));
          appendAuditLog('FLEET_HEALTH_CREATE', `Added aircraft ${healthForm.aircraft}`);
          addToast(`Aircraft ${healthForm.aircraft} added!`, 'success');
        }
        setShowAddModal(false); setEditId(null);
      };

      const openEdit = (fh) => {
        setHealthForm({ ...fh });
        setEditId(fh.id);
        setShowAddModal(true);
      };

      const getHealthColor = (valStr) => {
        if (!valStr) return 'var(--text-main)';
        const num = parseInt(valStr);
        if (isNaN(num)) return 'var(--text-main)';
        if (num >= 90) return 'var(--accent-emerald)';
        if (num >= 70) return 'var(--accent-amber)';
        return 'var(--accent-rose)';
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontWeight: 800 }}>🛠️ Aircraft Fleet Health Telemetry — {aptName} ({aptCode})</h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>Airside Fleet Diagnostics & Ground Support Engineering at {aptCode}</div>
            </div>
            {isStaff && (
              <button className="btn btn-primary" onClick={() => {
                setHealthForm({ aircraft: '', flight: 'AI-101', status: 'Airworthy', engine: '98%', hydraulic: '95%', tyre: 'Optimal', brake: 'Optimal', fuel: '94%', nextMaint: '2026-08-20' });
                setEditId(null);
                setShowAddModal(true);
              }}>
                + Log Aircraft Telemetry
              </button>
            )}
          </div>

          <div className="grid-2">
            {db.fleetHealth.map(fh=>(
              <div key={fh.id} className="glass-card" style={{borderColor:fh.status==='Airworthy'?'rgba(16,185,129,0.3)':fh.status==='Conditional'?'rgba(245,158,11,0.3)':'rgba(244,63,94,0.3)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.75rem'}}>
                  <div>
                    <strong style={{fontSize:'1rem'}}>{fh.aircraft}</strong>
                    <div style={{fontSize:'0.8rem',color:'var(--accent-cyan)',marginTop:'0.15rem'}}>Flight: {fh.flight}</div>
                  </div>
                  <span className={`badge ${fh.status==='Airworthy'?'badge-success':fh.status==='Conditional'?'badge-warning':'badge-danger'}`}>{fh.status}</span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.5rem'}}>
                  {[{label:'Engine',val:fh.engine},{label:'Hydraulic',val:fh.hydraulic},{label:'Tyre',val:fh.tyre},{label:'Brake',val:fh.brake},{label:'Fuel Eff.',val:fh.fuel},{label:'Next Maint.',val:fh.nextMaint}].map((m,i)=>(
                    <div key={i} style={{padding:'0.4rem',background:'rgba(0,0,0,0.2)',borderRadius:'var(--radius-sm)',fontSize:'0.78rem'}}>
                      <div style={{color:'var(--text-muted)',fontSize:'0.7rem'}}>{m.label}</div>
                      <div style={{fontWeight:700,color:getHealthColor(m.val),marginTop:'0.1rem'}}>{m.val}</div>
                    </div>
                  ))}
                </div>
                {isStaff && (
                  <div style={{marginTop:'0.75rem',display:'flex',gap:'0.5rem'}}>
                    <button className="btn btn-secondary" style={{fontSize:'0.75rem',flex:1,padding:'0.3rem 0.5rem'}} onClick={() => openEdit(fh)}>Manual Edit Metrics</button>
                    <button className="btn btn-secondary" style={{fontSize:'0.75rem',padding:'0.3rem 0.5rem',color:'var(--accent-emerald)'}} onClick={()=>{
                      setDb(prev=>({...prev,fleetHealth:prev.fleetHealth.map(f=>f.id===fh.id?{...f,status:'Airworthy',engine:'99%',hydraulic:'98%',brake:'Optimal'}:f)}));
                      appendAuditLog('FLEET_MAINT',`Quick maintenance logged for ${fh.aircraft}`);
                      addToast(`${fh.aircraft} reset to optimal Airworthy!`,'success');
                    }}>Quick Service</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {showAddModal && (
            <div className="modal-overlay" onClick={e=>{if(e.target.className.includes('modal-overlay')){setShowAddModal(false);setEditId(null);}}}>
              <div className="modal-card" style={{maxWidth:'600px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1rem'}}><h3 style={{color:'var(--accent-cyan)'}}>{editId?'Manual Edit Health Metrics':'Log New Aircraft Maintenance'}</h3><button className="btn btn-secondary" onClick={()=>{setShowAddModal(false);setEditId(null);}}>&times;</button></div>
                <form onSubmit={handleSaveHealth} style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem'}}>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Aircraft Name / Reg</label><input required className="form-input" value={healthForm.aircraft} onChange={e=>setHealthForm({...healthForm,aircraft:e.target.value})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Assigned Flight</label><input required className="form-input" value={healthForm.flight} onChange={e=>setHealthForm({...healthForm,flight:e.target.value})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Status</label><select className="form-select" value={healthForm.status} onChange={e=>setHealthForm({...healthForm,status:e.target.value})}><option>Airworthy</option><option>Conditional</option><option>Grounded</option><option>In Maintenance</option></select></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Engine Health %</label><input required className="form-input" value={healthForm.engine} onChange={e=>setHealthForm({...healthForm,engine:e.target.value})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Hydraulic System %</label><input required className="form-input" value={healthForm.hydraulic} onChange={e=>setHealthForm({...healthForm,hydraulic:e.target.value})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Tyre Condition</label><input required className="form-input" value={healthForm.tyre} onChange={e=>setHealthForm({...healthForm,tyre:e.target.value})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Brake System</label><input required className="form-input" value={healthForm.brake} onChange={e=>setHealthForm({...healthForm,brake:e.target.value})} /></div>
                  <div><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Fuel Efficiency</label><input required className="form-input" value={healthForm.fuel} onChange={e=>setHealthForm({...healthForm,fuel:e.target.value})} /></div>
                  <div style={{gridColumn:'1/-1'}}><label style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Next Maintenance Date</label><input required type="date" className="form-input" value={healthForm.nextMaint} onChange={e=>setHealthForm({...healthForm,nextMaint:e.target.value})} /></div>
                  <div style={{gridColumn:'1/-1'}}><button type="submit" className="btn btn-primary" style={{width:'100%'}}>{editId?'Save Metrics':'Log Aircraft'}</button></div>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    }

    // ═══════════════════════════════════════════════════════
    // 7. BAGGAGE VIEW
    // ═══════════════════════════════════════════════════════

    // ═══════════════════════════════════════════════════════
    // 7. BAGGAGE VIEW
    // ═══════════════════════════════════════════════════════

    function BaggageView({ db, setDb, isAdmin, isStaff, addToast, appendAuditLog, activeAirport }) {
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

      const format24HrTimeDisplay = (timeStr) => {
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

      const handleSaveBag = (e) => {
        e.preventDefault();
        const currentTime24 = get24HrTime();
        if (editId) {
          setDb(prev => ({
            ...prev,
            baggage: prev.baggage.map(b => b.id === editId ? { ...b, ...bagForm } : b)
          }));
          appendAuditLog('BAGGAGE_UPDATE', `Updated baggage ${bagForm.tagId}`);
          addToast(`Baggage ${bagForm.tagId} updated!`, 'success');
        } else {
          const nbag = {
            id: `BAG-${Date.now().toString().slice(-3)}`,
            ...bagForm,
            steps: [
              { loc: `Check-in Counter ${aptCode}-C01`, time: currentTime24, done: true },
              { loc: `Security Screening Belt 1`, time: currentTime24, done: true },
              { loc: `Sorting Hub (${aptCode})`, time: 'Active', done: true },
              { loc: `Aircraft Loading Bay`, time: 'Pending', done: false },
              { loc: `Arrival Belt ${bagForm.destination}`, time: 'Pending', done: false }
            ]
          };
          setDb(prev => ({ ...prev, baggage: [...prev.baggage, nbag] }));
          appendAuditLog('BAGGAGE_CREATE', `Logged new baggage ${bagForm.tagId}`);
          addToast(`Baggage ${bagForm.tagId} logged!`, 'success');
        }
        setShowAddModal(false); setEditId(null);
      };

      const openEdit = (b) => {
        setBagForm({ ...b });
        setEditId(b.id);
        setShowAddModal(true);
      };

      const updateStatus = (id, newStatus, tagId) => {
        setDb(prev => ({
          ...prev,
          baggage: prev.baggage.map(b => b.id === id ? { ...b, status: newStatus } : b)
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
                return { ...st, done: nextDone, time: nextDone ? timeNow : 'Pending' };
              }
              return st;
            });
            return { ...b, steps: updatedSteps };
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
            return { ...b, steps: updatedSteps };
          })
        }));
        appendAuditLog('BAGGAGE_MILESTONE_DELETE', `Deleted milestone step from baggage ${bagId}`);
        addToast('Milestone location deleted!', 'danger');
      };

      const handleAddMilestone = (e) => {
        e.preventDefault();
        if (!selectedBagForMilestone || !newMilestoneLoc.trim()) return;
        const timeNow = get24HrTime();
        const newStepObj = { loc: newMilestoneLoc.trim(), time: timeNow, done: true };
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

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontWeight: 800 }}>🛄 IoT Baggage Tracking & Handling Hub — {aptName} ({aptCode})</h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>Automated Sorting & Baggage Carousel Operations at {aptCode}</div>
            </div>
            {canManage && (
              <button className="btn btn-primary" onClick={() => {
                setBagForm({ tagId: `${aptCode}-BAG-${Date.now().toString().slice(-4)}`, pnr: `PNR-${aptCode}-101`, flight: 'AI-101', passenger: 'Rohan Sharma', origin: aptCode, destination: 'BOM', weight: '20.0 kg', status: 'In Sorting' });
                setEditId(null);
                setShowAddModal(true);
              }}>
                + Manual Baggage Entry
              </button>
            )}
          </div>

          <div className="grid-3">
            {db.baggage.map(b => (
              <div key={b.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)', fontSize: '0.9rem' }}>🏷️ {b.tagId}</span>
                  <span className={`badge ${b.status === 'Loaded' ? 'badge-success' : b.status === 'In Sorting' ? 'badge-warning' : b.status === 'Delayed' ? 'badge-danger' : 'badge-info'}`}>{b.status}</span>
                </div>
                <div style={{ fontSize: '0.85rem' }}>
                  <div>Passenger: <strong>{b.passenger}</strong></div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Flight: <strong>{b.flight}</strong> (PNR: {b.pnr})</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Route: {b.origin} ➔ {b.destination} • Weight: {b.weight}</div>
                </div>

                <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>📍 Tracking Milestones:</span>
                    {canManage && (
                      <button className="btn btn-secondary" style={{ fontSize: '0.68rem', padding: '0.15rem 0.4rem' }} onClick={() => {
                        setSelectedBagForMilestone(b);
                        setShowMilestoneModal(true);
                      }}>+ Add Location</button>
                    )}
                  </div>
                  {(b.steps || []).map((st, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: st.done ? 'var(--accent-emerald)' : 'var(--text-muted)', marginBottom: '0.3rem', background: 'rgba(0,0,0,0.15)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        {canManage ? (
                          <input type="checkbox" checked={st.done} onChange={() => toggleStepDone(b.id, i)} style={{ cursor: 'pointer' }} />
                        ) : (
                          <span>{st.done ? '✓' : '○'}</span>
                        )}
                        <span style={{ fontWeight: st.done ? 600 : 400 }}>{st.loc}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.68rem', opacity: 0.8, fontFamily: 'var(--font-mono)' }}>{format24HrTimeDisplay(st.time)}</span>
                        {canManage && (
                          <button className="btn btn-secondary" style={{ padding: '0 0.25rem', fontSize: '0.65rem', border: 'none', color: 'var(--accent-rose)' }} title="Delete milestone location" onClick={() => deleteMilestoneStep(b.id, i)}>✕</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {canManage && (
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    <button className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem', flex: 1 }} onClick={() => openEdit(b)}>✏️ Edit Details</button>
                    {b.status !== 'Loaded' && (
                      <button className="btn btn-primary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem' }} onClick={() => updateStatus(b.id, 'Loaded', b.tagId)}>✓ Mark Loaded</button>
                    )}
                    {b.status !== 'Delayed' && (
                      <button className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem', color: 'var(--accent-rose)' }} onClick={() => updateStatus(b.id, 'Delayed', b.tagId)}>⚠️ Flag Delayed</button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ADD BAGGAGE MODAL */}
          {showAddModal && (
            <div className="modal-overlay" onClick={e => { if (e.target.className.includes('modal-overlay')) { setShowAddModal(false); setEditId(null); } }}>
              <div className="modal-card" style={{ maxWidth: '550px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}><h3 style={{ color: 'var(--accent-cyan)' }}>{editId ? 'Edit Baggage Record' : 'Manual Baggage Tracking Entry'}</h3><button className="btn btn-secondary" onClick={() => { setShowAddModal(false); setEditId(null); }}>&times;</button></div>
                <form onSubmit={handleSaveBag} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Baggage Tag ID</label><input required className="form-input" value={bagForm.tagId} onChange={e => setBagForm({ ...bagForm, tagId: e.target.value })} /></div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>PNR Code</label><input required className="form-input" value={bagForm.pnr} onChange={e => setBagForm({ ...bagForm, pnr: e.target.value })} /></div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Flight Number</label><input required className="form-input" value={bagForm.flight} onChange={e => setBagForm({ ...bagForm, flight: e.target.value })} /></div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Passenger Name</label><input required className="form-input" value={bagForm.passenger} onChange={e => setBagForm({ ...bagForm, passenger: e.target.value })} /></div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Origin Airport</label><input required className="form-input" value={bagForm.origin} onChange={e => setBagForm({ ...bagForm, origin: e.target.value })} /></div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Destination Airport</label><input required className="form-input" value={bagForm.destination} onChange={e => setBagForm({ ...bagForm, destination: e.target.value })} /></div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Weight</label><input required className="form-input" value={bagForm.weight} onChange={e => setBagForm({ ...bagForm, weight: e.target.value })} /></div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Status</label><select className="form-select" value={bagForm.status} onChange={e => setBagForm({ ...bagForm, status: e.target.value })}><option>In Sorting</option><option>Loaded</option><option>On Conveyor</option><option>Claimed</option><option>Delayed</option></select></div>
                  <div style={{ gridColumn: '1/-1' }}><button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{editId ? 'Save Changes' : 'Log Baggage'}</button></div>
                </form>
              </div>
            </div>
          )}

          {/* ADD MILESTONE LOCATION MODAL */}
          {showMilestoneModal && selectedBagForMilestone && (
            <div className="modal-overlay" onClick={e => { if (e.target.className.includes('modal-overlay')) setShowMilestoneModal(false); }}>
              <div className="modal-card" style={{ maxWidth: '420px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ color: 'var(--accent-cyan)' }}>Add Milestone Checkpoint</h3>
                  <button className="btn btn-secondary" onClick={() => setShowMilestoneModal(false)}>&times;</button>
                </div>
                <form onSubmit={handleAddMilestone} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Baggage Tag: <strong>{selectedBagForMilestone.tagId}</strong> ({selectedBagForMilestone.passenger})
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Checkpoint Location Name</label>
                    <input required className="form-input" placeholder="e.g. Customs Vault Gate 4 / Ramp Cart T3-09" value={newMilestoneLoc} onChange={e => setNewMilestoneLoc(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary">Save Checkpoint Milestone</button>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    }

    // ═══════════════════════════════════════════════════════
    // 8. CCTV VIEW
    // ═══════════════════════════════════════════════════════

    function CctvView({ db, activeAirport }) {
      const aptCode = activeAirport?.code || 'DEL';
      const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
      const [selectedCam, setSelectedCam] = useState(db.cctv[0]);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontWeight: 800 }}>🎥 AI CCTV Surveillance Grid — {aptName} ({aptCode})</h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>Real-time Terminal & Airside Perimeter Video Analytics for {aptCode}</div>
          </div>
          <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
            <div className="glass-card" style={{padding:'0.5rem 1rem',flex:1,textAlign:'center'}}><div style={{fontSize:'1.2rem',fontWeight:800,color:'var(--accent-emerald)'}}>{db.cctv.filter(c=>c.status==='ONLINE').length}</div><div style={{fontSize:'0.7rem',color:'var(--text-secondary)'}}>Online</div></div>
            <div className="glass-card" style={{padding:'0.5rem 1rem',flex:1,textAlign:'center'}}><div style={{fontSize:'1.2rem',fontWeight:800,color:'var(--accent-rose)'}}>{db.cctv.filter(c=>c.status==='OFFLINE').length}</div><div style={{fontSize:'0.7rem',color:'var(--text-secondary)'}}>Offline</div></div>
            <div className="glass-card" style={{padding:'0.5rem 1rem',flex:1,textAlign:'center'}}><div style={{fontSize:'1.2rem',fontWeight:800,color:'var(--accent-amber)'}}>{db.cctv.reduce((a,c)=>a+c.alerts,0)}</div><div style={{fontSize:'0.7rem',color:'var(--text-secondary)'}}>Alerts</div></div>
            <div className="glass-card" style={{padding:'0.5rem 1rem',flex:1,textAlign:'center'}}><div style={{fontSize:'1.2rem',fontWeight:800,color:'var(--accent-cyan)'}}>{db.cctv.reduce((a,c)=>a+c.peopleCount,0)}</div><div style={{fontSize:'0.7rem',color:'var(--text-secondary)'}}>People Detected</div></div>
          </div>
          <div className="grid-3">
            {db.cctv.map(cam=>(
              <div key={cam.id} className="glass-card" style={{borderColor:cam.status==='OFFLINE'?'rgba(244,63,94,0.4)':'var(--border-color)'}}>
                <div style={{background:'rgba(0,0,0,0.5)',borderRadius:'var(--radius-md)',padding:'2.5rem 1rem',textAlign:'center',marginBottom:'0.75rem',position:'relative',overflow:'hidden'}}>
                  <div style={{fontSize:'2.5rem',opacity:0.3}}>📹</div>
                  <div style={{position:'absolute',top:'0.5rem',left:'0.5rem',display:'flex',alignItems:'center',gap:'0.3rem'}}>
                    <div style={{width:'8px',height:'8px',borderRadius:'50%',background:cam.status==='ONLINE'?'var(--accent-emerald)':'var(--accent-rose)',boxShadow:cam.status==='ONLINE'?'0 0 8px var(--accent-emerald)':'0 0 8px var(--accent-rose)'}}></div>
                    <span style={{fontSize:'0.65rem',color:cam.status==='ONLINE'?'var(--accent-emerald)':'var(--accent-rose)',fontWeight:700}}>{cam.status}</span>
                  </div>
                  {cam.status==='ONLINE' && <div style={{position:'absolute',top:'0.5rem',right:'0.5rem',fontSize:'0.65rem',color:'var(--accent-rose)',fontWeight:700}}>● REC</div>}
                </div>
                <strong style={{fontSize:'0.9rem'}}>{cam.name}</strong>
                <div style={{fontSize:'0.78rem',color:'var(--text-secondary)',marginTop:'0.2rem'}}>{cam.location}</div>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:'0.5rem',fontSize:'0.78rem'}}>
                  <span>👥 {cam.peopleCount} detected</span>
                  <span style={{color:cam.alerts>0?'var(--accent-rose)':'var(--accent-emerald)'}}>⚠️ {cam.alerts} alerts</span>
                </div>
                <div style={{fontSize:'0.72rem',color:'var(--text-muted)',marginTop:'0.2rem'}}>Zone: {cam.zone}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // ═══════════════════════════════════════════════════════
    // 9. LOST & FOUND VIEW
    // ═══════════════════════════════════════════════════════

    // ═══════════════════════════════════════════════════════
    // 9. LOST & FOUND VIEW
    // ═══════════════════════════════════════════════════════

    function LostFoundView({ db, setDb, isAdmin, isStaff, currentUser, addToast, appendAuditLog, activeAirport }) {
      const aptCode = activeAirport?.code || 'DEL';
      const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
      const canManage = isStaff || isAdmin;

      const [showReportModal, setShowReportModal] = useState(false);
      const [showClaimModal, setShowClaimModal] = useState(false);
      const [showProofModal, setShowProofModal] = useState(false);

      const [selectedItemForClaim, setSelectedItemForClaim] = useState(null);
      const [selectedItemForProof, setSelectedItemForProof] = useState(null);
      const [editItem, setEditItem] = useState(null);
      const [filterStatus, setFilterStatus] = useState('ALL');

      const [lostForm, setLostForm] = useState({
        item: '',
        category: 'Personal Item',
        location: `${aptCode} Terminal 3`,
        dateFound: new Date().toISOString().slice(0, 10),
        status: 'UNCLAIMED',
        description: '',
        claimedBy: ''
      });

      const [claimForm, setClaimForm] = useState({
        claimantName: '',
        contactPhone: '',
        idProofType: 'Aadhaar Card',
        idProofNumber: '',
        verificationAnswers: '',
        staffNotes: ''
      });

      const handleSaveItem = (e) => {
        e.preventDefault();
        const verificationStatus = canManage ? 'VERIFIED' : 'PENDING_VERIFICATION';
        if (editItem) {
          setDb(prev => ({
            ...prev,
            lostAndFound: prev.lostAndFound.map(i => i.id === editItem.id ? { ...i, ...lostForm } : i)
          }));
          appendAuditLog('LOST_FOUND_UPDATE', `Updated lost item ${editItem.id}`);
          addToast('Lost & Found item record updated!', 'success');
        } else {
          const newItem = {
            id: `LF-${Date.now().toString().slice(-3)}`,
            ...lostForm,
            verificationStatus
          };
          setDb(prev => ({ ...prev, lostAndFound: [newItem, ...prev.lostAndFound] }));
          appendAuditLog('LOST_FOUND_REPORT', `Reported item: ${lostForm.item} (${verificationStatus})`);
          if (canManage) {
            addToast('Lost & Found item logged & verified!', 'success');
          } else {
            addToast('Lost item reported! AAI staff will verify your report before public display.', 'info');
          }
        }
        setShowReportModal(false); setEditItem(null);
      };

      const handleSaveClaimVerification = (e) => {
        e.preventDefault();
        if (!selectedItemForClaim) return;
        const claimDetails = {
          ...claimForm,
          verifiedBy: currentUser?.name || 'AAI Duty Officer',
          claimedAt: new Date().toLocaleString()
        };

        setDb(prev => ({
          ...prev,
          lostAndFound: prev.lostAndFound.map(i => i.id === selectedItemForClaim.id ? {
            ...i,
            status: 'CLAIMED',
            verificationStatus: 'VERIFIED',
            claimedBy: claimForm.claimantName,
            claimedDetails: claimDetails
          } : i)
        }));

        appendAuditLog('LOST_FOUND_CLAIM_VERIFY', `Verified claim for item ${selectedItemForClaim.item} by ${claimForm.claimantName}`);
        addToast(`✅ Ownership verified & item marked as CLAIMED by ${claimForm.claimantName}!`, 'success');
        setShowClaimModal(false);
        setSelectedItemForClaim(null);
        setClaimForm({ claimantName: '', contactPhone: '', idProofType: 'Aadhaar Card', idProofNumber: '', verificationAnswers: '', staffNotes: '' });
      };

      const verifyItem = (id) => {
        setDb(prev => ({
          ...prev,
          lostAndFound: prev.lostAndFound.map(i => i.id === id ? { ...i, verificationStatus: 'VERIFIED' } : i)
        }));
        appendAuditLog('LOST_FOUND_VERIFY', `Verified lost item ${id}`);
        addToast('Item report VERIFIED & published to Lost & Found register!', 'success');
      };

      const deleteItem = (id) => {
        setDb(prev => ({ ...prev, lostAndFound: prev.lostAndFound.filter(i => i.id !== id) }));
        appendAuditLog('LOST_FOUND_DELETE', `Deleted lost item ${id}`);
        addToast('Record deleted.', 'danger');
      };

      const filteredItems = db.lostAndFound.filter(item => {
        if (!canManage && item.verificationStatus === 'PENDING_VERIFICATION') return false;
        if (filterStatus === 'VERIFIED_ONLY' && item.verificationStatus !== 'VERIFIED') return false;
        if (filterStatus === 'PENDING_STAFF' && item.verificationStatus !== 'PENDING_VERIFICATION') return false;
        if (filterStatus === 'UNCLAIMED' && item.status !== 'UNCLAIMED') return false;
        if (filterStatus === 'CLAIMED' && item.status !== 'CLAIMED') return false;
        return true;
      });

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontWeight: 800 }}>🧳 Lost & Found Register — {aptName} ({aptCode})</h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>Passenger Missing Belongings Desk & Claim Verification at {aptCode}</div>
            </div>
            <button className="btn btn-primary" onClick={() => {
              setLostForm({ item: '', category: 'Electronics', location: `${aptCode} Terminal 3 Security`, dateFound: new Date().toISOString().slice(0, 10), status: 'UNCLAIMED', description: '', claimedBy: '' });
              setEditItem(null);
              setShowReportModal(true);
            }}>+ Report Missing / Found Item</button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['ALL', 'UNCLAIMED', 'CLAIMED', 'PENDING_STAFF'].map(st => (
              <button key={st} className={`btn ${filterStatus === st ? 'btn-primary' : 'btn-secondary'}`} style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }} onClick={() => setFilterStatus(st)}>
                {st === 'ALL' ? 'All Items' : st === 'PENDING_STAFF' ? '⏳ Pending Verification' : st}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filteredItems.map(i => (
              <div key={i.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '1rem' }}>{i.item}</strong>
                  <span className={`badge ${i.status === 'CLAIMED' ? 'badge-success' : i.status === 'UNCLAIMED' ? 'badge-warning' : 'badge-info'}`}>{i.status}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <div>Category: <span className="badge badge-info">{i.category}</span></div>
                  <div>📍 Location: {i.location}</div>
                  <div>📅 Date: {i.dateFound}</div>
                  {i.description && <div style={{ marginTop: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>"{i.description}"</div>}
                  {i.claimedBy && <div style={{ marginTop: '0.3rem', fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>👤 Claimed By: {i.claimedBy}</div>}
                </div>

                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.35rem', alignItems: 'center', flexWrap: 'wrap', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                  <span className={`badge ${i.verificationStatus === 'VERIFIED' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.65rem' }}>
                    {i.verificationStatus === 'VERIFIED' ? '✓ Verified' : '⏳ Pending Staff Verification'}
                  </span>

                  {canManage && i.verificationStatus === 'PENDING_VERIFICATION' && (
                    <button className="btn btn-primary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }} onClick={() => verifyItem(i.id)}>✓ Verify & Publish</button>
                  )}

                  {canManage && i.status === 'UNCLAIMED' && (
                    <button className="btn btn-primary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }} onClick={() => {
                      setSelectedItemForClaim(i);
                      setShowClaimModal(true);
                    }}>🤝 Verify & Mark Claimed</button>
                  )}

                  {i.status === 'CLAIMED' && i.claimedDetails && (
                    <button className="btn btn-secondary" style={{ fontSize: '0.68rem', padding: '0.2rem 0.4rem', color: 'var(--accent-cyan)' }} onClick={() => {
                      setSelectedItemForProof(i);
                      setShowProofModal(true);
                    }}>🔍 View Claim Verification Proof</button>
                  )}

                  {canManage && (
                    <button className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem', color: 'var(--accent-rose)' }} onClick={() => deleteItem(i.id)}>🗑️</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* REPORT ITEM MODAL */}
          {showReportModal && (
            <div className="modal-overlay" onClick={e => { if (e.target.className.includes('modal-overlay')) { setShowReportModal(false); setEditItem(null); } }}>
              <div className="modal-card" style={{ maxWidth: '500px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}><h3 style={{ color: 'var(--accent-cyan)' }}>Report Missing or Found Item</h3><button className="btn btn-secondary" onClick={() => { setShowReportModal(false); setEditItem(null); }}>&times;</button></div>
                <form onSubmit={handleSaveItem} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Item Name</label><input required className="form-input" placeholder="e.g. Black Leather Wallet / iPhone 15" value={lostForm.item} onChange={e => setLostForm({ ...lostForm, item: e.target.value })} /></div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Category</label><select className="form-select" value={lostForm.category} onChange={e => setLostForm({ ...lostForm, category: e.target.value })}><option>Personal Item</option><option>Electronics</option><option>Luggage / Bag</option><option>Documents / Passport</option><option>Jewelry / Valuables</option></select></div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Location Found / Lost</label><input required className="form-input" value={lostForm.location} onChange={e => setLostForm({ ...lostForm, location: e.target.value })} /></div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Date</label><input type="date" required className="form-input" value={lostForm.dateFound} onChange={e => setLostForm({ ...lostForm, dateFound: e.target.value })} /></div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Description & Identifying Marks</label><textarea className="form-input" rows="3" value={lostForm.description} onChange={e => setLostForm({ ...lostForm, description: e.target.value })}></textarea></div>
                  <button type="submit" className="btn btn-primary">Submit Item Report</button>
                </form>
              </div>
            </div>
          )}

          {/* CLAIM & OWNERSHIP VERIFICATION MODAL (Staff/Admin gather info from passenger) */}
          {showClaimModal && selectedItemForClaim && (
            <div className="modal-overlay" onClick={e => { if (e.target.className.includes('modal-overlay')) setShowClaimModal(false); }}>
              <div className="modal-card" style={{ maxWidth: '520px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ color: 'var(--accent-emerald)' }}>🤝 Verify Ownership & Mark Item Claimed</h3>
                  <button className="btn btn-secondary" onClick={() => setShowClaimModal(false)}>&times;</button>
                </div>
                <form onSubmit={handleSaveClaimVerification} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.6rem 0.8rem', borderRadius: '6px', fontSize: '0.82rem' }}>
                    <div>Item: <strong>{selectedItemForClaim.item}</strong> ({selectedItemForClaim.category})</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Found at: {selectedItemForClaim.location} on {selectedItemForClaim.dateFound}</div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Claimant Full Name</label>
                    <input required className="form-input" placeholder="e.g. Rahul Sharma" value={claimForm.claimantName} onChange={e => setClaimForm({ ...claimForm, claimantName: e.target.value })} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Contact Phone / Email</label>
                      <input required className="form-input" placeholder="+91 98765 43210" value={claimForm.contactPhone} onChange={e => setClaimForm({ ...claimForm, contactPhone: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ID Proof Type</label>
                      <select className="form-select" value={claimForm.idProofType} onChange={e => setClaimForm({ ...claimForm, idProofType: e.target.value })}>
                        <option>Aadhaar Card</option>
                        <option>Passport</option>
                        <option>Driver License</option>
                        <option>Boarding Pass PNR</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ID Proof Number / PNR</label>
                    <input required className="form-input" placeholder="e.g. XXXX-XXXX-1234 / PNR-DEL-8821" value={claimForm.idProofNumber} onChange={e => setClaimForm({ ...claimForm, idProofNumber: e.target.value })} />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Gathered Verification Info / Identifying Features (provided by user)</label>
                    <textarea required className="form-input" rows="3" placeholder="e.g. User correctly stated device passcode, inner wallet card names, key ring brand name, etc." value={claimForm.verificationAnswers} onChange={e => setClaimForm({ ...claimForm, verificationAnswers: e.target.value })}></textarea>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Staff Verification Notes</label>
                    <input className="form-input" placeholder="e.g. Verified physical ID & item contents at T3 Lost & Found Desk" value={claimForm.staffNotes} onChange={e => setClaimForm({ ...claimForm, staffNotes: e.target.value })} />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                    ✓ Confirm Ownership & Mark Claimed
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* VIEW CLAIM PROOF MODAL */}
          {showProofModal && selectedItemForProof && selectedItemForProof.claimedDetails && (
            <div className="modal-overlay" onClick={e => { if (e.target.className.includes('modal-overlay')) setShowProofModal(false); }}>
              <div className="modal-card" style={{ maxWidth: '500px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ color: 'var(--accent-cyan)' }}>🔍 Claim Verification & Ownership Record</h3>
                  <button className="btn btn-secondary" onClick={() => setShowProofModal(false)}>&times;</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '6px' }}>
                    <strong>Item Name:</strong> {selectedItemForProof.item} ({selectedItemForProof.category})
                  </div>
                  <div><strong>Claimant Name:</strong> {selectedItemForProof.claimedDetails.claimantName}</div>
                  <div><strong>Contact:</strong> {selectedItemForProof.claimedDetails.contactPhone}</div>
                  <div><strong>ID Proof:</strong> {selectedItemForProof.claimedDetails.idProofType} ({selectedItemForProof.claimedDetails.idProofNumber})</div>
                  <div><strong>Verification Proof Answers:</strong> "{selectedItemForProof.claimedDetails.verificationAnswers}"</div>
                  <div><strong>Staff Verification Notes:</strong> "{selectedItemForProof.claimedDetails.staffNotes || 'Verified at Lost & Found Counter'}"</div>
                  <div><strong>Verified By:</strong> {selectedItemForProof.claimedDetails.verifiedBy}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}><strong>Handover Timestamp:</strong> {selectedItemForProof.claimedDetails.claimedAt}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // ═══════════════════════════════════════════════════════
    // 9.5 WHEELCHAIR ASSISTANCE VIEW
    // ═══════════════════════════════════════════════════════

    function WheelchairView({ db, setDb, isAdmin, isStaff, addToast, appendAuditLog, activeAirport }) {
      const aptCode = activeAirport?.code || 'DEL';
      const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
      const [showAddModal, setShowAddModal] = useState(false);
      const [wcForm, setWcForm] = useState({ passengerName: '', airlineName: 'Air India', pnrNumber: `PNR-${aptCode}-`, mobileNumber: '' });

      const handleSaveWc = (e) => {
        e.preventDefault();
        const req = {
          id: `WC-${Date.now().toString().slice(-3)}`,
          ...wcForm,
          timestamp: new Date().toLocaleTimeString() + ' IST',
          status: 'DISPATCHED'
        };
        setDb(prev => ({ ...prev, wheelchairRequests: [req, ...prev.wheelchairRequests] }));
        appendAuditLog('WHEELCHAIR_DISPATCH', `Dispatched wheelchair for ${wcForm.passengerName}`);
        setShowAddModal(false);
        setWcForm({ passengerName: '', airlineName: 'Air India', pnrNumber: `PNR-${aptCode}-`, mobileNumber: '' });
        addToast(`♿ Wheelchair dispatched for ${wcForm.passengerName}`, 'success');
      };

      const updateStatus = (id, newStatus, passenger) => {
        setDb(prev => ({
          ...prev,
          wheelchairRequests: prev.wheelchairRequests.map(r => r.id === id ? { ...r, status: newStatus } : r)
        }));
        appendAuditLog('WHEELCHAIR_STATUS', `Updated wheelchair ${id} to ${newStatus}`);
        addToast(`Wheelchair status updated to ${newStatus}`, 'info');
      };

      const deleteWc = (id, passenger) => {
        setDb(prev => ({ ...prev, wheelchairRequests: prev.wheelchairRequests.filter(r => r.id !== id) }));
        appendAuditLog('WHEELCHAIR_DELETE', `Deleted wheelchair request ${id}`);
        addToast(`Wheelchair request for ${passenger} deleted.`, 'danger');
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontWeight: 800 }}>♿ Wheelchair Assistance Service — {aptName} ({aptCode})</h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>Special Assistance & Mobility Operations Desk at {aptCode}</div>
            </div>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>+ Request Wheelchair</button>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {[{ s: 'PENDING', c: 'var(--accent-amber)', l: 'Pending' }, { s: 'DISPATCHED', c: 'var(--accent-cyan)', l: 'Dispatched' }, { s: 'COMPLETED', c: 'var(--accent-emerald)', l: 'Completed' }, { s: 'REJECTED', c: 'var(--accent-rose)', l: 'Rejected' }].map(st => (
              <div key={st.s} className="glass-card" style={{ padding: '0.6rem 1.25rem', flex: 1, minWidth: '100px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: st.c }}>{db.wheelchairRequests.filter(r => r.status === st.s).length}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{st.l}</div>
              </div>
            ))}
          </div>

          <div className="glass-card" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse', minWidth: '750px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>ID</th>
                  <th style={{ textAlign: 'left' }}>Passenger</th>
                  <th style={{ textAlign: 'left' }}>Airline</th>
                  <th style={{ textAlign: 'left' }}>PNR</th>
                  <th style={{ textAlign: 'left' }}>Mobile</th>
                  <th style={{ textAlign: 'left' }}>Requested</th>
                  <th style={{ textAlign: 'left' }}>Status</th>
                  {isStaff && <th style={{ textAlign: 'center' }}>Staff Actions</th>}
                </tr>
              </thead>
              <tbody>
                {db.wheelchairRequests.map(r => (
                  <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{r.id}</td>
                    <td style={{ fontWeight: 600 }}>{r.passengerName}</td>
                    <td>{r.airlineName}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>{r.pnrNumber || '—'}</td>
                    <td style={{ fontSize: '0.78rem' }}>{r.mobileNumber}</td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{r.timestamp}</td>
                    <td><span className={`badge ${r.status === 'COMPLETED' ? 'badge-success' : r.status === 'DISPATCHED' ? 'badge-warning' : r.status === 'REJECTED' ? 'badge-danger' : 'badge-info'}`}>{r.status}</span></td>
                    {isStaff && (
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center' }}>
                          {r.status === 'PENDING' && <button className="btn btn-primary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }} onClick={() => updateStatus(r.id, 'DISPATCHED', r.passengerName)}>🚀 Dispatch</button>}
                          {(r.status === 'DISPATCHED' || r.status === 'PENDING') && <button className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', color: 'var(--accent-emerald)' }} onClick={() => updateStatus(r.id, 'COMPLETED', r.passengerName)}>✅ Complete</button>}
                          {r.status === 'PENDING' && <button className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', color: 'var(--accent-rose)' }} onClick={() => updateStatus(r.id, 'REJECTED', r.passengerName)}>✕ Reject</button>}
                          <button className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', color: 'var(--accent-rose)' }} onClick={() => deleteWc(r.id, r.passengerName)}>🗑️</button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showAddModal && (
            <div className="modal-overlay" onClick={e => { if (e.target.className.includes('modal-overlay')) setShowAddModal(false); }}>
              <div className="modal-card" style={{ maxWidth: '450px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}><h3 style={{ color: 'var(--accent-cyan)' }}>♿ Request Wheelchair Service</h3><button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>&times;</button></div>
                <form onSubmit={handleSaveWc} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Passenger Full Name</label><input required className="form-input" placeholder="e.g. Ramesh Kumar" value={wcForm.passengerName} onChange={e => setWcForm({ ...wcForm, passengerName: e.target.value })} /></div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Airline Name</label><input required className="form-input" placeholder="e.g. Air India / IndiGo" value={wcForm.airlineName} onChange={e => setWcForm({ ...wcForm, airlineName: e.target.value })} /></div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>PNR Number</label><input required className="form-input" value={wcForm.pnrNumber} onChange={e => setWcForm({ ...wcForm, pnrNumber: e.target.value })} /></div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Passenger Contact Mobile</label><input type="tel" required className="form-input" placeholder="+91 9876543210" value={wcForm.mobileNumber} onChange={e => setWcForm({ ...wcForm, mobileNumber: e.target.value })} /></div>
                  <button type="submit" className="btn btn-primary">Submit Wheelchair Request</button>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    }

    // ═══════════════════════════════════════════════════════
    // 11. DUTY ROSTER & ATTENDANCE VIEW
    // ═══════════════════════════════════════════════════════

    function DutyRosterView({ db, setDb, currentUser, isAdmin, isStaff, addToast, appendAuditLog, activeAirport }) {
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
          dutyRosters: (prev.dutyRosters || []).map(r => r.userId === currentUser?.id ? { ...r, status: newStatus } : r)
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
          const updatedRosters = userRosterExists
            ? existingRosters.map(r => r.userId === currentUser.id ? { ...r, status: 'ON_DUTY', clockInTime: timeNow } : r)
            : [...existingRosters, { id: `DR-${Date.now().toString().slice(-3)}`, userId: currentUser.id, name: currentUser.name, role: currentUser.role, location: `${aptName} - Terminal 3 Command`, shift: 'General Shift (09:00 - 17:00 IST)', status: 'ON_DUTY', clockInTime: timeNow }];

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
          attendanceLogs: (prev.attendanceLogs || []).map(a => (a.userId === currentUser.id && !a.clockOut) ? { ...a, clockOut: timeNow } : a),
          dutyRosters: (prev.dutyRosters || []).map(r => r.userId === currentUser.id ? { ...r, status: 'OFF_DUTY' } : r)
        }));
        appendAuditLog('ATTENDANCE_CLOCK_OUT', `${currentUser.name} clocked out at ${timeNow}`);
        addToast(`🚪 Clocked OUT successfully at ${timeNow}. Duty Status updated to OFF_DUTY`, 'info');
      };

      const handleApplyLeave = (e) => {
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
        setDb(prev => ({ ...prev, leaveApplications: [newApp, ...(prev.leaveApplications || [])] }));
        appendAuditLog('LEAVE_APPLICATION_SUBMIT', `${currentUser?.name} applied for ${leaveForm.leaveType}`);
        addToast('Leave application submitted for Admin Review!', 'success');
        setShowLeaveModal(false);
        setLeaveForm({ leaveType: 'Casual Leave', fromDate: new Date().toISOString().slice(0, 10), toDate: new Date().toISOString().slice(0, 10), reason: '' });
      };

      const handleApproveLeave = (id) => {
        setDb(prev => ({
          ...prev,
          leaveApplications: (prev.leaveApplications || []).map(l => l.id === id ? { ...l, status: 'APPROVED' } : l)
        }));
        appendAuditLog('LEAVE_APPROVE', `Admin approved leave application ${id}`);
        addToast('Leave Application APPROVED!', 'success');
      };

      const handleRejectLeave = (id) => {
        setDb(prev => ({
          ...prev,
          leaveApplications: (prev.leaveApplications || []).map(l => l.id === id ? { ...l, status: 'REJECTED' } : l)
        }));
        appendAuditLog('LEAVE_REJECT', `Admin rejected leave application ${id}`);
        addToast('Leave Application REJECTED.', 'danger');
      };

      const handleSaveRoster = (e) => {
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
          return { ...prev, dutyRosters: [...existing, updated] };
        });
        appendAuditLog('ROSTER_ASSIGN', `Assigned roster for ${selectedUser.name} to ${rosterForm.location}`);
        addToast(`Roster updated for ${selectedUser.name}!`, 'success');
        setShowAssignModal(false); setSelectedUser(null);
      };

      // Filter leave applications: For staff, show their own; for Admin, show all
      const userLeaveApps = isAdmin ? (db.leaveApplications || []) : (db.leaveApplications || []).filter(l => l.userId === currentUser?.id);

      // Current real-time duty status
      const currentDutyStatus = myRoster.status || 'OFF_DUTY';

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontWeight: 800, color: 'var(--brand-cyan)' }}>📅 Staff Duty Roster & Attendance — {aptName} ({aptCode})</h2>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Log daily shift attendance, check duty postings, and manage staff leave applications for {aptCode}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {!isAdmin && <button className={`btn ${rosterTab === 'myDuty' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setRosterTab('myDuty')}>My Shift & Clock In</button>}
              <button className={`btn ${rosterTab === 'leaveApp' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setRosterTab('leaveApp')}>Leave Applications</button>
              <button className={`btn ${rosterTab === 'allRosters' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setRosterTab('allRosters')}>Staff Roster Manager</button>
              {isAdmin && <button className={`btn ${rosterTab === 'allAttendance' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setRosterTab('allAttendance')}>All Staff Attendance Logs</button>}
            </div>
          </div>

          {/* STAFF MY SHIFT & CLOCK IN TAB (Hidden for Admin) */}
          {rosterTab === 'myDuty' && !isAdmin && (
            <div className="grid-2">
              <div className="glass-card">
                <h3 style={{ color: 'var(--brand-cyan)', marginBottom: '1rem' }}>📌 My Assigned Posting & Shift</h3>
                <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div>Location: <strong>{myRoster.location}</strong></div>
                  <div>Shift: <strong>{myRoster.shift}</strong></div>
                  <div>Live Duty Status: <span className={`badge ${currentDutyStatus === 'ON_DUTY' ? 'badge-success' : currentDutyStatus === 'ON_BREAK' ? 'badge-amber' : 'badge-warning'}`}>{currentDutyStatus}</span></div>
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {!isCurrentlyActiveOnDuty ? (
                    <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleClockIn}>⏱️ Clock IN for Shift</button>
                  ) : (
                    <button className="btn btn-secondary" style={{ flex: 1, color: 'var(--accent-rose)' }} onClick={handleClockOut}>🚪 Clock OUT of Shift</button>
                  )}

                  {/* Break button is ONLY VISIBLE when user is actively ON_DUTY or ON_BREAK (Not visible when OFF_DUTY) */}
                  {isCurrentlyActiveOnDuty && (
                    <button className={`btn ${isOnBreak ? 'btn-primary' : 'btn-secondary'}`} style={{ color: isOnBreak ? '#fff' : 'var(--accent-amber)' }} onClick={handleToggleBreak}>
                      {isOnBreak ? '🟢 End Break (Resume ON_DUTY)' : '☕ Take Break'}
                    </button>
                  )}
                </div>
              </div>

              <div className="glass-card">
                <h3 style={{ marginBottom: '1rem' }}>📜 My Attendance Log History</h3>
                <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                  {(db.attendanceLogs || []).filter(a => a.userId === currentUser?.id).length === 0 ? (
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>No attendance logs recorded yet.</div>
                  ) : (
                    (db.attendanceLogs || []).filter(a => a.userId === currentUser?.id).map(a => (
                      <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem' }}>
                        <span>{a.date}</span>
                        <span>IN: {a.clockIn}</span>
                        <span>OUT: {a.clockOut || 'Active'}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* LEAVE APPLICATIONS TAB (With Individual Approval/Rejection Status Logs) */}
          {rosterTab === 'leaveApp' && (
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ color: 'var(--accent-cyan)' }}>📝 Leave Applications & Approval Logs</h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                    {isAdmin ? 'Review, approve, or reject staff leave requests' : 'Track your submitted leave application status (Approved / Rejected / Pending)'}
                  </div>
                </div>
                {!isAdmin && (
                  <button className="btn btn-primary" onClick={() => setShowLeaveModal(true)}>+ Apply New Leave</button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {userLeaveApps.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {isAdmin ? 'No staff leave applications submitted yet.' : 'You have not submitted any leave applications yet. Click "+ Apply New Leave" to apply.'}
                  </div>
                ) : (
                  userLeaveApps.map(l => (
                    <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem', background: 'rgba(0,0,0,0.25)', borderRadius: '8px', borderLeft: l.status === 'APPROVED' ? '4px solid var(--accent-emerald)' : l.status === 'REJECTED' ? '4px solid var(--accent-rose)' : '4px solid var(--accent-amber)', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <strong style={{ fontSize: '0.95rem' }}>{l.applicantName}</strong>
                          <span className="badge badge-info">{l.leaveType}</span>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                          📅 Dates: <strong>{l.fromDate}</strong> to <strong>{l.toDate}</strong> • Applied on: {l.appliedOn || 'Today'}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                          Reason: "{l.reason}"
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span className={`badge ${l.status === 'APPROVED' ? 'badge-success' : l.status === 'REJECTED' ? 'badge-danger' : 'badge-warning'}`} style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}>
                          {l.status === 'APPROVED' ? '✅ Approved by Admin' : l.status === 'REJECTED' ? '🛑 Rejected by Admin' : '⏳ Pending Admin Review'}
                        </span>
                        {isAdmin && l.status === 'PENDING_ADMIN_REVIEW' && (
                          <>
                            <button className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem' }} onClick={() => handleApproveLeave(l.id)}>✓ Approve</button>
                            <button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem', color: 'var(--accent-rose)' }} onClick={() => handleRejectLeave(l.id)}>✕ Reject</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* STAFF ROSTER MANAGER TAB (Fixes Tab Issue & Gives Admin Posting Schedule Powers) */}
          {rosterTab === 'allRosters' && (
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <h3 style={{ color: 'var(--brand-cyan)' }}>👑 Staff Duty Roster Posting Schedules — {aptName}</h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>View and manage active duty postings and shift schedules for airport staff</div>
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table" style={{ fontSize: '0.82rem', width: '100%' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Staff Member</th>
                      <th style={{ textAlign: 'left' }}>Role</th>
                      <th style={{ textAlign: 'left' }}>Assigned Posting / Location</th>
                      <th style={{ textAlign: 'left' }}>Shift Timings</th>
                      <th style={{ textAlign: 'left' }}>Duty Status</th>
                      {isAdmin && <th style={{ textAlign: 'center' }}>Admin Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {db.users.filter(u => u.role !== 'Passenger').map(u => {
                      const rost = (db.dutyRosters || []).find(r => r.userId === u.id) || {
                        location: `${aptName} - Terminal 3 Command`,
                        shift: 'Morning Shift (06:00 - 14:00 IST)',
                        status: 'OFF_DUTY'
                      };
                      return (
                        <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <td style={{ padding: '0.75rem' }}>
                            <strong>{u.name}</strong>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{u.email} ({u.employeeId || u.id})</div>
                          </td>
                          <td><span className={`badge ${u.role === 'Admin' ? 'badge-danger' : 'badge-info'}`}>{u.role}</span></td>
                          <td>{rost.location}</td>
                          <td>{rost.shift}</td>
                          <td><span className={`badge ${rost.status === 'ON_DUTY' ? 'badge-success' : 'badge-warning'}`}>{rost.status}</span></td>
                          {isAdmin && (
                            <td style={{ textAlign: 'center' }}>
                              <button className="btn btn-primary" style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }} onClick={() => {
                                setSelectedUser(u);
                                setRosterForm({ location: rost.location, shift: rost.shift });
                                setShowAssignModal(true);
                              }}>+ Schedule Posting</button>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ALL STAFF ATTENDANCE LOGS TAB (Admin Attendance Overview) */}
          {rosterTab === 'allAttendance' && isAdmin && (
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ color: 'var(--accent-emerald)' }}>📜 All Staff Attendance Logs</h3>
                <span className="badge badge-info">{db.attendanceLogs?.length || 0} Total Entries</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table" style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Staff Member</th>
                      <th style={{ textAlign: 'left' }}>Role</th>
                      <th style={{ textAlign: 'left' }}>Date</th>
                      <th style={{ textAlign: 'left' }}>Clock IN Time</th>
                      <th style={{ textAlign: 'left' }}>Clock OUT Time</th>
                      <th style={{ textAlign: 'left' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(db.attendanceLogs || []).length === 0 ? (
                      <tr><td colSpan="6" style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>No staff attendance records logged yet.</td></tr>
                    ) : (
                      (db.attendanceLogs || []).map(a => (
                        <tr key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <td style={{ padding: '0.75rem', fontWeight: 600 }}>{a.name}</td>
                          <td><span className="badge badge-info">{a.role}</span></td>
                          <td>{a.date}</td>
                          <td style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>{a.clockIn}</td>
                          <td style={{ color: a.clockOut ? 'var(--accent-rose)' : 'var(--accent-amber)', fontWeight: 600 }}>{a.clockOut || 'Active Shift'}</td>
                          <td><span className={`badge ${a.clockOut ? 'badge-success' : 'badge-warning'}`}>{a.clockOut ? 'COMPLETED' : 'PRESENT'}</span></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* APPLY LEAVE MODAL */}
          {showLeaveModal && (
            <div className="modal-overlay" onClick={e => { if (e.target.className.includes('modal-overlay')) setShowLeaveModal(false); }}>
              <div className="modal-card" style={{ maxWidth: '450px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ color: 'var(--accent-cyan)' }}>Apply for Leave</h3>
                  <button className="btn btn-secondary" onClick={() => setShowLeaveModal(false)}>&times;</button>
                </div>
                <form onSubmit={handleApplyLeave} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Leave Type</label>
                    <select className="form-select" value={leaveForm.leaveType} onChange={e => setLeaveForm({ ...leaveForm, leaveType: e.target.value })}>
                      <option>Casual Leave</option>
                      <option>Earned Leave</option>
                      <option>Medical / Sick Leave</option>
                      <option>Duty Off Exemption</option>
                    </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>From Date</label><input type="date" required className="form-input" value={leaveForm.fromDate} onChange={e => setLeaveForm({ ...leaveForm, fromDate: e.target.value })} /></div>
                    <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>To Date</label><input type="date" required className="form-input" value={leaveForm.toDate} onChange={e => setLeaveForm({ ...leaveForm, toDate: e.target.value })} /></div>
                  </div>
                  <div><label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Reason</label><textarea required className="form-input" rows="3" value={leaveForm.reason} onChange={e => setLeaveForm({ ...leaveForm, reason: e.target.value })}></textarea></div>
                  <button type="submit" className="btn btn-primary">Submit Leave Application</button>
                </form>
              </div>
            </div>
          )}

          {/* ASSIGN ROSTER MODAL */}
          {showAssignModal && selectedUser && (
            <div className="modal-overlay" onClick={e => { if (e.target.className.includes('modal-overlay')) setShowAssignModal(false); }}>
              <div className="modal-card" style={{ maxWidth: '500px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ color: 'var(--accent-cyan)' }}>Assign Duty Roster for {selectedUser.name}</h3>
                  <button className="btn btn-secondary" onClick={() => setShowAssignModal(false)}>&times;</button>
                </div>
                <form onSubmit={handleSaveRoster} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Duty Location / Posting</label>
                    <select className="form-select" value={rosterForm.location} onChange={e => setRosterForm({ ...rosterForm, location: e.target.value })}>
                      <option>{aptName} - Terminal 3 CISF Security Hold A</option>
                      <option>{aptName} - Terminal 1 Security Lane 4</option>
                      <option>{aptName} - Terminal 2 Check-in Area</option>
                      <option>{aptName} - ATC Tower Level 8 Command</option>
                      <option>{aptName} - Terminal 3 Airside Apron Gate T3-G42</option>
                      <option>{aptName} - Terminal 3 Air India Check-in Row C</option>
                      <option>{aptName} - Baggage Sorting Hub A</option>
                      <option>{aptName} - Arrival Carousel 7 Desk</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Shift Timings</label>
                    <select className="form-select" value={rosterForm.shift} onChange={e => setRosterForm({ ...rosterForm, shift: e.target.value })}>
                      <option>Morning Shift (06:00 - 14:00 IST)</option>
                      <option>Evening Shift (14:00 - 22:00 IST)</option>
                      <option>Night Shift (22:00 - 06:00 IST)</option>
                      <option>General Shift (09:00 - 17:00 IST)</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">Save Roster Assignment</button>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    }

    // ═══════════════════════════════════════════════════════
    // 10. ADMIN COMMAND CENTER
    // ═══════════════════════════════════════════════════════

    function AdminView({ db, setDb, addToast, appendAuditLog, activeAirport }) {
      const aptCode = activeAirport?.code || 'DEL';
      const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
      const [adminTab, setAdminTab] = useState('users');
      const [showCreateAdmin, setShowCreateAdmin] = useState(false);
      const [newAdminForm, setNewAdminForm] = useState({ name: '', email: '', password: '' });
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

      const handleCreateAdmin = (e) => {
        e.preventDefault();
        const nu = { id: `USR-${Date.now().toString().slice(-4)}`, name: newAdminForm.name, email: newAdminForm.email, password: newAdminForm.password, role: 'Admin', status: 'APPROVED', employeeId: `AAI-ADM-${Date.now().toString().slice(-3)}` };
        setDb(prev => ({ ...prev, users: [...prev.users, nu] }));
        appendAuditLog('ADMIN_CREATE', `Created new Admin: ${newAdminForm.name}`);
        addToast(`Admin ${newAdminForm.name} created!`, 'success');
        setShowCreateAdmin(false); setNewAdminForm({ name: '', email: '', password: '' });
      };

      const approveUser = (id) => {
        setDb(prev => ({ ...prev, users: prev.users.map(u => u.id === id ? { ...u, status: 'APPROVED' } : u) }));
        appendAuditLog('USER_APPROVE', `AAI Master Admin approved staff user ${id}`);
        addToast('Staff login access APPROVED! User can now log in.', 'success');
      };

      const requestDocsUser = (id) => {
        setDb(prev => ({ ...prev, users: prev.users.map(u => u.id === id ? { ...u, status: 'PENDING_DOCUMENTS' } : u) }));
        appendAuditLog('USER_DOCS_REQ', `Master Admin requested verification documents from user ${id}`);
        addToast('Verification documents requested from staff user.', 'info');
      };

      const rejectUser = (id) => {
        setDb(prev => ({ ...prev, users: prev.users.map(u => u.id === id ? { ...u, status: 'REJECTED' } : u) }));
        appendAuditLog('USER_REJECT', `Master Admin rejected staff user ${id}`);
        addToast('Staff registration REJECTED. Access blocked.', 'danger');
      };

      const deleteUser = (id, name) => {
        setDb(prev => ({ ...prev, users: prev.users.filter(u => u.id !== id) }));
        appendAuditLog('USER_DELETE', `Deleted user ${name} (${id})`);
        addToast(`User ${name} deleted`, 'danger');
      };

      const resetDB = () => {
        const fresh = JSON.parse(JSON.stringify(SEED));
        setDb(fresh);
        try { localStorage.setItem(DB_KEY, JSON.stringify(fresh)); } catch(e){}
        addToast('🔄 Database reset to factory defaults!', 'warning');
        appendAuditLog('SYSTEM_RESET', 'Full database reset to initial seed data.');
      };

      const handleSaveContact = (e) => {
        e.preventDefault();
        setDb(prev => ({ ...prev, contactInfo: { ...contactForm } }));
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

      const approveResetUser = (id) => {
        setDb(prev => ({ ...prev, users: prev.users.map(u => u.id === id ? { ...u, status: 'RESET_APPROVED' } : u) }));
        appendAuditLog('USER_RESET_APPROVE', `AAI Master Admin approved password reset for user ${id}`);
        addToast('Password Reset APPROVED! One-time password change enabled for staff member.', 'success');
      };

      const blockUser = (id) => {
        setDb(prev => ({ ...prev, users: prev.users.map(u => u.id === id ? { ...u, status: 'BLOCKED' } : u) }));
        appendAuditLog('USER_BLOCK', `AAI Master Admin BLOCKED user ${id}`);
        addToast('🛑 Account BLOCKED until further unblock by Admin.', 'danger');
      };

      const unblockUser = (id) => {
        setDb(prev => ({ ...prev, users: prev.users.map(u => u.id === id ? { ...u, status: 'APPROVED' } : u) }));
        appendAuditLog('USER_UNBLOCK', `AAI Master Admin unblocked user ${id}`);
        addToast('🔓 Account UNBLOCKED successfully!', 'success');
      };

      const handleAdminChangeUserPassword = (e) => {
        e.preventDefault();
        if (!resetTargetUser || !adminNewPasswordInput) return;
        if (adminNewPasswordInput.length < 3) {
          addToast('Password must be at least 3 characters', 'warning');
          return;
        }
        setDb(prev => ({
          ...prev,
          users: prev.users.map(u => u.id === resetTargetUser.id ? { ...u, password: adminNewPasswordInput, status: 'APPROVED' } : u)
        }));
        appendAuditLog('ADMIN_PASSWORD_RESET', `Master Admin changed password for user ${resetTargetUser.name} (${resetTargetUser.id})`);
        addToast(`✅ Password for ${resetTargetUser.name} updated to "${adminNewPasswordInput}"!`, 'success');
        setResetTargetUser(null);
        setAdminNewPasswordInput('');
      };

      const adminTabs = [
        { key: 'users', label: '🔑 Account Credentials & Passwords' },
        { key: 'pendingApprovals', label: '⏳ Staff Approvals' },
        { key: 'auditLogs', label: '📜 Audit Logs' },
        { key: 'systemConfig', label: '⚙️ System Config' },
        { key: 'dataOverview', label: '📊 Data Overview' }
      ];

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontWeight: 800, color: 'var(--accent-amber)' }}>👑 Admin Master Command Center — {aptName} ({aptCode})</h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>System Administration & Location Control for {aptCode} Hub</div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', background: 'rgba(0,0,0,0.3)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
            {adminTabs.map(tab => (
              <button key={tab.key} className={`btn ${adminTab === tab.key ? 'btn-primary' : 'btn-secondary'}`} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }} onClick={() => setAdminTab(tab.key)}>{tab.label}</button>
            ))}
          </div>

          {/* STAFF & ADMIN ACCOUNTS TAB (Includes Passwords Directory) */}
          {adminTab === 'users' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ color: 'var(--accent-amber)' }}>🔑 Staff & Admin Account Directory ({db.users.length})</h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>View account login credentials, employee IDs, roles, and plaintext passwords for all users</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-secondary"
                    style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                    onClick={() => setShowAllPasswords(!showAllPasswords)}
                  >
                    {showAllPasswords ? '🙈 Hide Passwords' : '👁️ Show All Passwords'}
                  </button>
                  <button className="btn btn-primary" onClick={() => setShowCreateAdmin(true)}>+ Create Admin Account</button>
                </div>
              </div>

              <div className="glass-card" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse', minWidth: '850px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left' }}>Emp ID / User ID</th>
                      <th style={{ textAlign: 'left' }}>Full Name</th>
                      <th style={{ textAlign: 'left' }}>Email / Login ID</th>
                      <th style={{ textAlign: 'left' }}>Role</th>
                      <th style={{ textAlign: 'left' }}>Access Status</th>
                      <th style={{ textAlign: 'left' }}>Account Password</th>
                      <th style={{ textAlign: 'center' }}>Admin Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {db.users.map(u => (
                      <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-cyan)' }}>{u.employeeId || u.id}</td>
                        <td style={{ fontWeight: 600 }}>{u.name}</td>
                        <td style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{u.email}</td>
                        <td><span className={`badge ${u.role === 'Admin' ? 'badge-danger' : 'badge-info'}`}>{u.role}</span></td>
                        <td><span className={`badge ${u.status === 'APPROVED' ? 'badge-success' : u.status === 'BLOCKED' ? 'badge-danger' : 'badge-warning'}`}>{u.status}</span></td>
                        <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
                          {(showAllPasswords || showPasswords[u.id]) ? u.password : '••••••••'}
                          <button
                            className="btn btn-secondary"
                            style={{ padding: '0.1rem 0.35rem', fontSize: '0.65rem', marginLeft: '0.4rem', border: 'none', background: 'transparent', cursor: 'pointer' }}
                            onClick={() => setShowPasswords(prev => ({ ...prev, [u.id]: !prev[u.id] }))}
                            title="Toggle password visibility"
                          >
                            {(showAllPasswords || showPasswords[u.id]) ? '🙈' : '👁️'}
                          </button>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                              className="btn btn-secondary"
                              style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', color: 'var(--accent-amber)', borderColor: 'rgba(245,158,11,0.3)' }}
                              onClick={() => { setResetTargetUser(u); setAdminNewPasswordInput(u.password); }}
                              title="Reset Password for this account"
                            >
                              🔑 Reset Pwd
                            </button>
                            {u.status === 'PENDING_APPROVAL' && <button className="btn btn-primary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }} onClick={() => approveUser(u.id)}>✓ Approve</button>}
                            {u.status === 'BLOCKED' ? (
                              <button className="btn btn-primary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }} onClick={() => unblockUser(u.id)}>🔓 Unblock</button>
                            ) : u.role !== 'Admin' && (
                              <button className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', color: 'var(--accent-rose)' }} onClick={() => blockUser(u.id)}>🛑 Block</button>
                            )}
                            <button className="btn btn-secondary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem', color: 'var(--accent-rose)' }} onClick={() => deleteUser(u.id, u.name)}>🗑️ Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ADMIN RESET USER PASSWORD MODAL */}
          {resetTargetUser && (
            <div className="modal-overlay" onClick={e => { if (e.target.className.includes('modal-overlay')) setResetTargetUser(null); }}>
              <div className="modal-card" style={{ maxWidth: '420px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ color: 'var(--accent-amber)', fontSize: '1.05rem' }}>🔑 Admin Reset Password for {resetTargetUser.name}</h3>
                  <button className="btn btn-secondary" onClick={() => setResetTargetUser(null)}>&times;</button>
                </div>
                <form onSubmit={handleAdminChangeUserPassword} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Target Account: <strong>{resetTargetUser.email}</strong> ({resetTargetUser.role})
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Current Password on File:</label>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)', fontSize: '0.9rem', marginTop: '0.15rem' }}>
                      {resetTargetUser.password}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Enter New Password for User:</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      style={{ marginTop: '0.2rem' }}
                      placeholder="New Password (e.g. Pass123)"
                      value={adminNewPasswordInput}
                      onChange={e => setAdminNewPasswordInput(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--accent-amber), #d97706)', color: '#000', fontWeight: 800 }}>
                    💾 Update User Password
                  </button>
                </form>
              </div>
            </div>
          )}

          {adminTab==='pendingApprovals' && (
            <div className="glass-card">
              <h3 style={{marginBottom:'0.75rem',color:'var(--accent-amber)'}}>⏳ Staff Registrations & Password Reset Verification Approvals</h3>
              <p style={{fontSize:'0.82rem',color:'var(--text-secondary)',marginBottom:'1.25rem'}}>Inspect new staff registrations and 2-Step Password Reset Requests (ID Proof + Biometric Face Scan).</p>
              {db.users.filter(u=>u.status==='PENDING_APPROVAL'||u.status==='PENDING_DOCUMENTS'||u.status==='PENDING_RESET_APPROVAL'||u.status==='REJECTED'||u.status==='BLOCKED').length===0 ? (
                <div style={{textAlign:'center',padding:'2rem',color:'var(--accent-emerald)'}}>✅ All staff registration and password reset requests are processed!</div>
              ) : db.users.filter(u=>u.status==='PENDING_APPROVAL'||u.status==='PENDING_DOCUMENTS'||u.status==='PENDING_RESET_APPROVAL'||u.status==='REJECTED'||u.status==='BLOCKED').map(u=>(
                <div key={u.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.85rem',borderBottom:'1px solid var(--border-color)',flexWrap:'wrap',gap:'0.5rem'}}>
                  <div>
                    <strong>{u.name}</strong> <span style={{color:'var(--text-secondary)',fontSize:'0.82rem'}}>({u.email} • Employee ID: {u.employeeId || u.id})</span>
                    <div style={{fontSize:'0.75rem',marginTop:'0.2rem',display:'flex',gap:'0.5rem',alignItems:'center',flexWrap:'wrap'}}>
                      <span className={`badge ${u.status==='PENDING_DOCUMENTS'?'badge-warning':u.status==='PENDING_RESET_APPROVAL'?'badge-cyan':u.status==='BLOCKED'?'badge-danger':'badge-info'}`}>
                        {u.status==='PENDING_DOCUMENTS' ? '📄 Pending Verification Documents' : u.status==='PENDING_RESET_APPROVAL' ? '🔑 Password Reset Request (Face Captured)' : u.status==='BLOCKED' ? '🛑 Account Blocked' : u.status==='REJECTED' ? '🛑 Access Rejected' : '⏳ Pending Initial Approval'}
                      </span>
                      {u.resetRequest && (
                        <span className="badge badge-success" style={{fontSize:'0.68rem'}}>
                          📄 ID Proof: {u.resetRequest.docName} • 📸 Biometric Face Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{display:'flex',gap:'0.35rem'}}>
                    {u.status==='PENDING_RESET_APPROVAL' ? (
                      <>
                        <button className="btn btn-primary" style={{fontSize:'0.75rem',padding:'0.3rem 0.65rem'}} onClick={()=>approveResetUser(u.id)}>✓ Approve Reset</button>
                        <button className="btn btn-secondary" style={{fontSize:'0.75rem',padding:'0.3rem 0.65rem',color:'var(--accent-rose)'}} onClick={()=>blockUser(u.id)}>🛑 Reject & Block</button>
                      </>
                    ) : u.status==='BLOCKED' ? (
                      <button className="btn btn-primary" style={{fontSize:'0.75rem',padding:'0.3rem 0.65rem'}} onClick={()=>unblockUser(u.id)}>🔓 Unblock Account</button>
                    ) : (
                      <>
                        <button className="btn btn-primary" style={{fontSize:'0.75rem',padding:'0.3rem 0.65rem'}} onClick={()=>approveUser(u.id)}>✓ Approve Login</button>
                        <button className="btn btn-secondary" style={{fontSize:'0.75rem',padding:'0.3rem 0.65rem',color:'var(--accent-amber)'}} onClick={()=>requestDocsUser(u.id)}>📄 Ask Docs</button>
                        <button className="btn btn-secondary" style={{fontSize:'0.75rem',padding:'0.3rem 0.65rem',color:'var(--accent-rose)'}} onClick={()=>rejectUser(u.id)}>✕ Reject</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {adminTab==='auditLogs' && (
            <div className="glass-card">
              <h3 style={{marginBottom:'1rem'}}>📜 System Audit Logs ({db.auditLogs.length} entries)</h3>
              <div style={{maxHeight:'500px',overflowY:'auto'}}>
                {db.auditLogs.map(l=>(
                  <div key={l.id} style={{display:'flex',gap:'1rem',padding:'0.5rem 0',borderBottom:'1px solid rgba(255,255,255,0.04)',fontSize:'0.8rem',fontFamily:'var(--font-mono)'}}>
                    <span style={{color:'var(--text-muted)',minWidth:'180px',fontSize:'0.75rem'}}>{l.timestamp}</span>
                    <span style={{color:'var(--accent-cyan)',minWidth:'200px'}}>{l.actor}</span>
                    <span className="badge badge-info" style={{minWidth:'120px',justifyContent:'center'}}>{l.action}</span>
                    <span style={{color:'var(--text-secondary)',flex:1}}>{l.details}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {adminTab==='systemConfig' && (
            <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
              <div className="grid-2">
                <div className="glass-card">
                  <h3 style={{marginBottom:'1rem',color:'var(--accent-cyan)'}}>📞 Update Contact & Support Info</h3>
                  <form onSubmit={handleSaveContact} style={{display:'flex',flexDirection:'column',gap:'0.85rem'}}>
                    <div>
                      <label style={{fontSize:'0.78rem',color:'var(--text-secondary)'}}>Helpline Number</label>
                      <input required className="form-input" value={contactForm.helpline} onChange={e=>setContactForm({...contactForm,helpline:e.target.value})} />
                    </div>
                    <div>
                      <label style={{fontSize:'0.78rem',color:'var(--text-secondary)'}}>Support Email</label>
                      <input type="email" required className="form-input" value={contactForm.email} onChange={e=>setContactForm({...contactForm,email:e.target.value})} />
                    </div>
                    <div>
                      <label style={{fontSize:'0.78rem',color:'var(--text-secondary)'}}>Airport Address</label>
                      <textarea required className="form-input" rows="3" value={contactForm.address} onChange={e=>setContactForm({...contactForm,address:e.target.value})}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{marginTop:'0.25rem'}}>Save Contact Info</button>
                  </form>
                </div>

                <div style={{display:'flex',flexDirection:'column',gap:'1.25rem'}}>
                  <div className="glass-card">
                    <h3 style={{marginBottom:'0.75rem',color:'var(--accent-amber)'}}>⚙️ Database & Backup Operations</h3>
                    <div style={{display:'flex',flexDirection:'column',gap:'0.65rem'}}>
                      <button className="btn btn-secondary" onClick={exportDatabase}>📥 Export Database (JSON Backup)</button>
                      <button className="btn btn-secondary" style={{color:'var(--accent-amber)'}} onClick={resetDB}>🔄 Reset Database to Factory Defaults</button>
                      <button className="btn btn-secondary" style={{color:'var(--accent-rose)'}} onClick={()=>{localStorage.removeItem(DB_KEY);addToast('LocalStorage cleared. Reloading page...','warning');setTimeout(()=>window.location.reload(),1000);}}>🗑️ Clear LocalStorage & Reload</button>
                    </div>
                  </div>

                  <div className="glass-card">
                    <h3 style={{marginBottom:'0.75rem',color:'var(--accent-emerald)'}}>🌤️ Weather & Diagnostics Controls</h3>
                    <div style={{display:'flex',flexDirection:'column',gap:'0.65rem'}}>
                      <button className="btn btn-secondary" onClick={()=>{
                        const nextWeather = db.metrics.weatherStatus.includes('Fog') ? 'Good (Vis 2500m)' : 'Low Visibility Fog (CAT-III B)';
                        setDb(prev=>({...prev,metrics:{...prev.metrics,weatherStatus:nextWeather}}));
                        addToast(`Weather mode updated to: ${nextWeather}`,'info');
                      }}>⛅ Toggle Fog / CAT-III Weather Mode</button>
                      <button className="btn btn-secondary" onClick={()=>{
                        setDb(prev=>({...prev,metrics:{...prev.metrics,systemHealth:'100% Operational'}}));
                        addToast('Ran Full System Diagnostics — 100% Operational!','success');
                      }}>💚 Run System Diagnostics Check</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {adminTab==='wheelchair' && (
            <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
                <h3>♿ Wheelchair Assistance Requests ({db.wheelchairRequests.length})</h3>
              </div>
              <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginBottom:'1.25rem'}}>
                {[{s:'PENDING',c:'var(--accent-amber)',l:'Pending'},{s:'DISPATCHED',c:'var(--accent-cyan)',l:'Dispatched'},{s:'COMPLETED',c:'var(--accent-emerald)',l:'Completed'},{s:'REJECTED',c:'var(--accent-rose)',l:'Rejected'}].map(st=>(
                  <div key={st.s} className="glass-card" style={{padding:'0.6rem 1.25rem',flex:1,minWidth:'100px',textAlign:'center'}}>
                    <div style={{fontSize:'1.4rem',fontWeight:800,color:st.c}}>{db.wheelchairRequests.filter(r=>r.status===st.s).length}</div>
                    <div style={{fontSize:'0.72rem',color:'var(--text-secondary)'}}>{st.l}</div>
                  </div>
                ))}
              </div>
              <div className="glass-card" style={{overflowX:'auto'}}>
                <table style={{width:'100%',fontSize:'0.82rem',borderCollapse:'collapse',minWidth:'750px'}}>
                  <thead><tr style={{borderBottom:'2px solid var(--border-color)',color:'var(--text-secondary)',fontSize:'0.75rem',textTransform:'uppercase'}}>
                    <th style={{padding:'0.75rem',textAlign:'left'}}>ID</th><th style={{textAlign:'left'}}>Passenger</th><th style={{textAlign:'left'}}>Airline</th><th style={{textAlign:'left'}}>PNR</th><th style={{textAlign:'left'}}>Mobile</th><th style={{textAlign:'left'}}>Requested</th><th style={{textAlign:'left'}}>Status</th><th style={{textAlign:'center'}}>Actions</th>
                  </tr></thead>
                  <tbody>
                    {db.wheelchairRequests.map(r=>(
                      <tr key={r.id} style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                        <td style={{padding:'0.75rem',fontFamily:'var(--font-mono)',fontSize:'0.78rem',color:'var(--text-muted)'}}>{r.id}</td>
                        <td style={{fontWeight:600}}>{r.passengerName}</td>
                        <td>{r.airlineName}</td>
                        <td style={{fontFamily:'var(--font-mono)',fontSize:'0.78rem'}}>{r.pnrNumber || '—'}</td>
                        <td style={{fontSize:'0.78rem'}}>{r.mobileNumber}</td>
                        <td style={{fontSize:'0.78rem',color:'var(--text-secondary)'}}>{r.timestamp}</td>
                        <td><span className={`badge ${r.status==='COMPLETED'?'badge-success':r.status==='DISPATCHED'?'badge-warning':r.status==='REJECTED'?'badge-danger':'badge-info'}`}>{r.status}</span></td>
                        <td style={{textAlign:'center'}}>
                          <div style={{display:'flex',gap:'0.25rem',justifyContent:'center'}}>
                            {r.status==='PENDING' && <button className="btn btn-primary" style={{fontSize:'0.7rem',padding:'0.2rem 0.5rem'}} onClick={()=>{
                              setDb(prev=>({...prev,wheelchairRequests:prev.wheelchairRequests.map(w=>w.id===r.id?{...w,status:'DISPATCHED'}:w)}));
                              appendAuditLog('WHEELCHAIR_DISPATCH',`Dispatched wheelchair for ${r.passengerName}`);
                              addToast(`♿ Wheelchair dispatched for ${r.passengerName}`,'success');
                            }}>🚀 Dispatch</button>}
                            {(r.status==='DISPATCHED'||r.status==='PENDING') && <button className="btn btn-secondary" style={{fontSize:'0.7rem',padding:'0.2rem 0.5rem',color:'var(--accent-emerald)'}} onClick={()=>{
                              setDb(prev=>({...prev,wheelchairRequests:prev.wheelchairRequests.map(w=>w.id===r.id?{...w,status:'COMPLETED'}:w)}));
                              appendAuditLog('WHEELCHAIR_COMPLETE',`Wheelchair service completed for ${r.passengerName}`);
                              addToast(`✅ Wheelchair service completed for ${r.passengerName}`,'success');
                            }}>✅ Complete</button>}
                            {r.status==='PENDING' && <button className="btn btn-secondary" style={{fontSize:'0.7rem',padding:'0.2rem 0.5rem',color:'var(--accent-rose)'}} onClick={()=>{
                              setDb(prev=>({...prev,wheelchairRequests:prev.wheelchairRequests.map(w=>w.id===r.id?{...w,status:'REJECTED'}:w)}));
                              appendAuditLog('WHEELCHAIR_REJECT',`Wheelchair request rejected for ${r.passengerName}`);
                              addToast(`Wheelchair request rejected for ${r.passengerName}`,'warning');
                            }}>✕ Reject</button>}
                            <button className="btn btn-secondary" style={{fontSize:'0.7rem',padding:'0.2rem 0.5rem',color:'var(--accent-rose)'}} onClick={()=>{
                              setDb(prev=>({...prev,wheelchairRequests:prev.wheelchairRequests.filter(w=>w.id!==r.id)}));
                              appendAuditLog('WHEELCHAIR_DELETE',`Deleted wheelchair request ${r.id}`);
                              addToast('Wheelchair request deleted','danger');
                            }}>🗑️ Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {db.wheelchairRequests.length===0 && <div style={{textAlign:'center',padding:'2rem',color:'var(--text-muted)'}}>No wheelchair requests yet</div>}
              </div>
            </div>
          )}

          {adminTab==='dataOverview' && (
            <div className="grid-3">
              {[{label:'Flights',count:db.flights.length,icon:'✈️',color:'var(--accent-cyan)'},{label:'Gates',count:db.gates.length,icon:'🚪',color:'var(--accent-emerald)'},{label:'Emergencies',count:db.emergencies.length,icon:'🚨',color:'var(--accent-rose)'},{label:'Baggage',count:db.baggage.length,icon:'🛄',color:'var(--accent-blue)'},{label:'Lost & Found',count:db.lostAndFound.length,icon:'🔍',color:'var(--accent-amber)'},{label:'CCTV Cams',count:db.cctv.length,icon:'🎥',color:'var(--accent-purple)'},{label:'Fleet Health',count:db.fleetHealth.length,icon:'🛠️',color:'var(--accent-cyan)'},{label:'Wheelchair',count:db.wheelchairRequests.length,icon:'♿',color:'var(--accent-purple)'},{label:'Users',count:db.users.length,icon:'👥',color:'var(--accent-emerald)'},{label:'Audit Logs',count:db.auditLogs.length,icon:'📜',color:'var(--accent-amber)'}].map((d,i)=>(
                <div key={i} className="kpi-card" style={{textAlign:'center'}}>
                  <div style={{fontSize:'2rem',marginBottom:'0.25rem'}}>{d.icon}</div>
                  <div style={{fontSize:'1.5rem',fontWeight:800,color:d.color}}>{d.count}</div>
                  <div style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>{d.label}</div>
                </div>
              ))}
            </div>
          )}

          {showCreateAdmin && (
            <div className="modal-overlay" onClick={e=>{if(e.target.className.includes('modal-overlay'))setShowCreateAdmin(false)}}>
              <div className="modal-card">
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1rem'}}><h3 style={{color:'var(--accent-amber)'}}>👑 Create New Admin Account</h3><button className="btn btn-secondary" onClick={()=>setShowCreateAdmin(false)}>✕</button></div>
                <form onSubmit={handleCreateAdmin} style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
                  <input required className="form-input" placeholder="Full Name" value={newAdminForm.name} onChange={e=>setNewAdminForm({...newAdminForm,name:e.target.value})} />
                  <input required type="email" className="form-input" placeholder="Email" value={newAdminForm.email} onChange={e=>setNewAdminForm({...newAdminForm,email:e.target.value})} />
                  <input required type="password" className="form-input" placeholder="Password" value={newAdminForm.password} onChange={e=>setNewAdminForm({...newAdminForm,password:e.target.value})} />
                  <button type="submit" className="btn btn-primary">Create Admin</button>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    }

    // ═══════════════════════════════════════════════════════
    // CAR PARKING MANAGEMENT VIEW
    // ═══════════════════════════════════════════════════════

    function CarParkingView({ db, setDb, currentUser, isAdmin, isStaff, addToast, appendAuditLog, activeAirport }) {
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
        total4w: 4500, filled4w: 3120, reserved4w: 450,
        total2w: 2000, filled2w: 1240, reserved2w: 210,
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
      const rates = db.parkingData?.rates || { fourWheeler: [], twoWheeler: [] };
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
        const matchesQuery = !logSearchQuery.trim() || 
          l.vehicleNumber.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
          l.id.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
          l.gateId.toLowerCase().includes(logSearchQuery.toLowerCase());

        const matchesType = logTypeFilter === 'ALL' || l.eventType === logTypeFilter;
        const matchesLot = logLotFilter === 'ALL' || l.parkingLot.includes(logLotFilter);

        return matchesQuery && matchesType && matchesLot;
      });

      // AI ANPR Sensor Simulation Handler
      const handleSimulateAiDetection = (eventType) => {
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
            return { ...l, filled4w: newFilled };
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
      const handleSaveAdminLotEdit = (e) => {
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
      const handleManualLogSubmit = (e) => {
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
        setManualLogForm({ ...manualLogForm, vehicleNumber: '' });
      };

      const handleConfirmVerification = (e) => {
        e.preventDefault();
        if (!verifyModal || !verifyInput.trim()) return;

        const target = verifyModal.reservation;
        const inputClean = verifyInput.trim().toUpperCase().replace(/[\s-]/g, '');
        const mobileClean = (target.mobile || '').replace(/[\s-]/g, '');
        const vehClean = (target.vehicleNumber || '').toUpperCase().replace(/[\s-]/g, '');
        const idClean = (target.id || '').toUpperCase().replace(/[\s-]/g, '');

        const isMatch = (inputClean.length >= 3 && (inputClean === mobileClean || inputClean === vehClean || inputClean === idClean));

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

      const handleInitiateBooking = (e) => {
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

      const handleCancelReservation = (id) => {
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

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h2 style={{ fontWeight: 800, margin: 0 }}>🅿️ AI Smart Vehicle Parking — {aptName} ({aptCode})</h2>
                <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>🤖 AI Computer Vision Sensors Active</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>
                ANPR AI License Plate Sensors • 48-Hour Vehicle Entry/Exit Logs • FASTag Auto Barrier System
              </div>
            </div>

            {/* TAB BUTTONS HEADER */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button className={`btn ${parkingTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setParkingTab('overview')}>
                📊 Lots & Tariffs
              </button>
              <button className={`btn ${parkingTab === 'aiSensors' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setParkingTab('aiSensors')}>
                🤖 AI ANPR Sensors
              </button>
              <button className={`btn ${parkingTab === 'vehicleLogs' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setParkingTab('vehicleLogs')}>
                📋 48h Logs ({vehicleLogs.length})
              </button>
              <button className={`btn ${parkingTab === 'book' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setParkingTab('book')}>
                ➕ Reserve Slot
              </button>
              <button className={`btn ${parkingTab === 'myPasses' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setParkingTab('myPasses')}>
                🎟️ Passes ({reservations.length})
              </button>
              {(isAdmin || isStaff) && (
                <button
                  className={`btn ${parkingTab === 'adminEdit' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    background: parkingTab === 'adminEdit' ? 'linear-gradient(135deg, var(--accent-amber), #d97706)' : undefined,
                    color: parkingTab === 'adminEdit' ? '#000' : 'var(--accent-amber)',
                    fontWeight: 700
                  }}
                  onClick={() => setParkingTab('adminEdit')}
                >
                  ⚙️ Admin Controls
                </button>
              )}
            </div>
          </div>

          {/* STATS OVERVIEW CARDS */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="glass-card" style={{ flex: 1, minWidth: '150px', padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{totalAvailable4w.toLocaleString()}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>🚘 4W Free Slots</div>
            </div>
            <div className="glass-card" style={{ flex: 1, minWidth: '150px', padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{totalAvailable2w.toLocaleString()}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>🛵 2W Free Slots</div>
            </div>
            <div className="glass-card" style={{ flex: 1, minWidth: '150px', padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)' }}>{totalEntries24h}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>🟢 Entries (48h AI)</div>
            </div>
            <div className="glass-card" style={{ flex: 1, minWidth: '150px', padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-rose)' }}>{totalExits24h}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>🔴 Exits (48h AI)</div>
            </div>
          </div>

          {/* TAB 1: OVERVIEW & TARIFFS */}
          {parkingTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* PARKING LOTS GRID */}
              <div>
                <h3 style={{ marginBottom: '1rem', color: 'var(--accent-cyan)' }}>🏢 Terminal Parking Facilities & Live AI Availability</h3>
                <div className="grid-2">
                  {lots.map(lot => {
                    const avail4w = lot.total4w - lot.filled4w - lot.reserved4w;
                    const pct4w = Math.round(((lot.filled4w + lot.reserved4w) / lot.total4w) * 100);
                    return (
                      <div key={lot.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ fontSize: '1.05rem', color: 'var(--accent-cyan)' }}>{lot.name}</strong>
                          <span className="badge badge-success">{lot.status}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Type: <strong>{lot.type}</strong></div>
                        
                        {/* 4 WHEELER CAPACITY BAR */}
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.25rem' }}>
                            <span>🚘 4-Wheeler Slots (Car / SUV):</span>
                            <strong>{avail4w} / {lot.total4w} Free ({pct4w}% Full)</strong>
                          </div>
                          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${pct4w}%`, height: '100%', background: pct4w > 85 ? 'var(--accent-rose)' : pct4w > 65 ? 'var(--accent-amber)' : 'var(--accent-emerald)', transition: 'width 0.5s' }} />
                          </div>
                        </div>

                        {/* 2 WHEELER CAPACITY BAR */}
                        {lot.total2w > 0 && (
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.25rem' }}>
                              <span>🛵 2-Wheeler Slots (Scooter / Bike):</span>
                              <strong>{lot.total2w - lot.filled2w - lot.reserved2w} / {lot.total2w} Free</strong>
                            </div>
                            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ width: `${Math.round(((lot.filled2w + lot.reserved2w) / lot.total2w) * 100)}%`, height: '100%', background: 'var(--accent-cyan)' }} />
                            </div>
                          </div>
                        )}

                        <button className="btn btn-secondary" style={{ marginTop: '0.5rem', justifyContent: 'center', fontSize: '0.8rem' }} onClick={() => {
                          setResForm({ ...resForm, parkingLot: lot.name, terminal: lot.id.includes('T1') ? 'T1' : lot.id.includes('T2') ? 'T2' : 'T3' });
                          setParkingTab('book');
                        }}>
                          📌 Reserve Slot in {lot.id}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* OFFICIAL PARKING CHARGES TARIFF CHART */}
              <div className="glass-card">
                <h3 style={{ marginBottom: '1rem', color: 'var(--accent-amber)' }}>🏷️ Official Airport Parking Tariff Charges</h3>
                <div className="grid-2">
                  {/* 4 WHEELER TARIFF */}
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>🚘 4-Wheeler Parking Charges (Car / SUV / EV)</h4>
                    <table style={{ width: '100%', fontSize: '0.82rem' }}>
                      <thead>
                        <tr style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                          <th style={{ padding: '0.5rem 0' }}>Duration</th>
                          <th style={{ textAlign: 'right' }}>Tariff Rate (₹)</th>
                          <th style={{ textAlign: 'right' }}>Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rates.fourWheeler.map((r, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '0.5rem 0' }}>{r.duration}</td>
                            <td style={{ textAlign: 'right', fontWeight: 800, color: 'var(--accent-emerald)' }}>₹{r.rate}</td>
                            <td style={{ textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.75rem' }}>{r.label}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* 2 WHEELER TARIFF */}
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>🛵 2-Wheeler Parking Charges (Scooter / Bike)</h4>
                    <table style={{ width: '100%', fontSize: '0.82rem' }}>
                      <thead>
                        <tr style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                          <th style={{ padding: '0.5rem 0' }}>Duration</th>
                          <th style={{ textAlign: 'right' }}>Tariff Rate (₹)</th>
                          <th style={{ textAlign: 'right' }}>Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rates.twoWheeler.map((r, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '0.5rem 0' }}>{r.duration}</td>
                            <td style={{ textAlign: 'right', fontWeight: 800, color: 'var(--accent-emerald)' }}>₹{r.rate}</td>
                            <td style={{ textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.75rem' }}>{r.label}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AI ANPR SENSORS & TELEMETRY */}
          {parkingTab === 'aiSensors' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* AI SENSOR CONTROL HEADER */}
              <div className="glass-card" style={{ border: '2px solid var(--accent-cyan)', background: 'rgba(0,242,254,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.6rem' }}>🤖</span>
                      <h3 style={{ color: 'var(--accent-cyan)', margin: 0 }}>AI Computer Vision ANPR Sensor Integration</h3>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                      Automated Optical Character Recognition (ANPR) scanning license plates & vehicle movement in real time.
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-primary" style={{ fontSize: '0.8rem', background: 'linear-gradient(135deg, var(--accent-emerald), #059669)' }} onClick={() => handleSimulateAiDetection('ENTRY')}>
                      ⚡ Simulate AI Vehicle ENTRY
                    </button>
                    <button className="btn btn-primary" style={{ fontSize: '0.8rem', background: 'linear-gradient(135deg, var(--accent-rose), #e11d48)' }} onClick={() => handleSimulateAiDetection('EXIT')}>
                      ⚡ Simulate AI Vehicle EXIT
                    </button>
                  </div>
                </div>
              </div>

              {/* ANPR LIVE CAMERA SENSOR FEEDS */}
              <div className="grid-2">
                {/* CAM 1 */}
                <div className="glass-card" style={{ background: '#000', border: '1px solid var(--accent-cyan)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                    <strong style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>📷 ANPR CAM-01: Terminal 3 Entry Barrier</strong>
                    <span className="badge badge-success" style={{ fontSize: '0.62rem' }}>🔴 LIVE 60 FPS</span>
                  </div>
                  <div style={{ height: '160px', borderRadius: '6px', background: 'radial-gradient(circle, rgba(0,242,254,0.15) 0%, rgba(0,0,0,0.9) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--accent-cyan)', position: 'relative' }}>
                    <div style={{ border: '2px solid var(--accent-emerald)', padding: '0.5rem 1rem', borderRadius: '4px', background: 'rgba(0,0,0,0.8)', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--accent-emerald)' }}>[ANPR OCR BOUNDING BOX MATCH]</div>
                      <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#fff', letterSpacing: '2px' }}>DL-01-AB-1234</div>
                    </div>
                    <div style={{ position: 'absolute', bottom: '0.5rem', left: '0.75rem', fontSize: '0.7rem', color: 'var(--accent-cyan)' }}>
                      Confidence Score: <strong>99.4%</strong> • OCR Latency: <strong>14ms</strong>
                    </div>
                  </div>
                </div>

                {/* CAM 2 */}
                <div className="glass-card" style={{ background: '#000', border: '1px solid var(--accent-amber)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                    <strong style={{ color: 'var(--accent-amber)', fontSize: '0.85rem' }}>📷 ANPR CAM-02: Terminal 3 Exit Barrier</strong>
                    <span className="badge badge-success" style={{ fontSize: '0.62rem' }}>🔴 LIVE 60 FPS</span>
                  </div>
                  <div style={{ height: '160px', borderRadius: '6px', background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(0,0,0,0.9) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--accent-amber)', position: 'relative' }}>
                    <div style={{ border: '2px solid var(--accent-amber)', padding: '0.5rem 1rem', borderRadius: '4px', background: 'rgba(0,0,0,0.8)', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--accent-amber)' }}>[ANPR OCR BOUNDING BOX MATCH]</div>
                      <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#fff', letterSpacing: '2px' }}>HR-26-DQ-5511</div>
                    </div>
                    <div style={{ position: 'absolute', bottom: '0.5rem', left: '0.75rem', fontSize: '0.7rem', color: 'var(--accent-amber)' }}>
                      Confidence Score: <strong>98.9%</strong> • OCR Latency: <strong>18ms</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* RECENT SENSOR DETECTION STREAM */}
              <div className="glass-card">
                <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>⚡ Live AI Sensor Detection Stream</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {vehicleLogs.slice(0, 5).map(log => (
                    <div key={log.id} style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '1.3rem' }}>{log.eventType === 'ENTRY' ? '🟢' : '🔴'}</span>
                        <div>
                          <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent-cyan)' }}>{log.vehicleNumber}</strong>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{log.parkingLot} • Gate: {log.gateId}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span className={`badge ${log.eventType === 'ENTRY' ? 'badge-success' : 'badge-danger'}`}>{log.eventType}</span>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>AI Acc: {log.confidenceScore} • {log.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 48-HOUR VEHICLE ENTRY & EXIT LOGS */}
          {parkingTab === 'vehicleLogs' && (
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ color: 'var(--accent-amber)', margin: 0 }}>📋 48-Hour Vehicle Entry & Exit Movement Logs</h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    Complete AI ANPR sensor audit trail for all vehicles entering & leaving airport facilities over the last 48 hours.
                  </div>
                </div>
                <button className="btn btn-secondary" style={{ fontSize: '0.78rem' }} onClick={() => window.print()}>
                  🖨️ Export / Print Movement Log Report
                </button>
              </div>

              {/* SEARCH & FILTERS BAR */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ flex: 2, minWidth: '200px' }}>
                  <input
                    className="form-input"
                    placeholder="🔍 Search Vehicle Reg Number (e.g. DL-01) or ANPR ID..."
                    value={logSearchQuery}
                    onChange={e => setLogSearchQuery(e.target.value)}
                  />
                </div>
                <div style={{ flex: 1, minWidth: '130px' }}>
                  <select className="form-select" value={logTypeFilter} onChange={e => setLogTypeFilter(e.target.value)}>
                    <option value="ALL">All Events (Entry + Exit)</option>
                    <option value="ENTRY">🟢 ENTRY Only</option>
                    <option value="EXIT">🔴 EXIT Only</option>
                  </select>
                </div>
                <div style={{ flex: 1, minWidth: '150px' }}>
                  <select className="form-select" value={logLotFilter} onChange={e => setLogLotFilter(e.target.value)}>
                    <option value="ALL">All Facilities</option>
                    <option value="Terminal 3">Terminal 3 MLCP</option>
                    <option value="Terminal 1">Terminal 1 Surface</option>
                    <option value="Terminal 2">Terminal 2 Express</option>
                    <option value="Valet">VIP Valet</option>
                  </select>
                </div>
              </div>

              {/* 48-HOUR LOGS TABLE */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse', minWidth: '750px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '0.75rem' }}>Log ID</th>
                      <th>Timestamp (48h)</th>
                      <th>Event Type</th>
                      <th>Vehicle Reg Number</th>
                      <th>Type</th>
                      <th>Parking Facility & Gate</th>
                      <th>AI Sensor / Accuracy</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVehicleLogs.map(log => (
                      <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 700 }}>{log.id}</td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{log.timestamp}</td>
                        <td>
                          <span className={`badge ${log.eventType === 'ENTRY' ? 'badge-success' : 'badge-danger'}`} style={{ fontWeight: 800 }}>
                            {log.eventType === 'ENTRY' ? '🟢 ENTRY' : '🔴 EXIT'}
                          </span>
                        </td>
                        <td style={{ fontWeight: 800, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent-cyan)' }}>{log.vehicleNumber}</td>
                        <td>{log.vehicleType}</td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{log.parkingLot}</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Gate: {log.gateId}</div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>{log.confidenceScore}</div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{log.cameraSensor}</div>
                        </td>
                        <td>
                          <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>{log.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredVehicleLogs.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    No vehicle movement logs found matching search filter.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: ADVANCE RESERVATION FORM */}
          {parkingTab === 'book' && (
            <div className="glass-card" style={{ maxWidth: '650px', margin: '0 auto', width: '100%' }}>
              <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>🎟️ Reserve Airport Parking Slot in Advance</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                Guarantee your vehicle parking spot prior to arrival. Includes automated FASTag gate access & digital pass.
              </p>

              <form onSubmit={handleInitiateBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Full Name</label>
                    <input required className="form-input" placeholder="e.g. Rajesh Sharma" value={resForm.passengerName} onChange={e => setResForm({ ...resForm, passengerName: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Mobile Number (for SMS Pass)</label>
                    <input required type="tel" className="form-input" placeholder="+91 9876543210" value={resForm.mobile} onChange={e => setResForm({ ...resForm, mobile: e.target.value })} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Vehicle Category</label>
                    <select className="form-select" value={resForm.vehicleType} onChange={e => setResForm({ ...resForm, vehicleType: e.target.value })}>
                      <option>4 Wheeler (Car / SUV)</option>
                      <option>2 Wheeler (Scooter / Bike)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Vehicle Number Plate</label>
                    <input required className="form-input" placeholder="e.g. DL-01-AB-1234" value={resForm.vehicleNumber} onChange={e => setResForm({ ...resForm, vehicleNumber: e.target.value })} style={{ textTransform: 'uppercase' }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Select Parking Facility</label>
                  <select className="form-select" value={resForm.parkingLot} onChange={e => {
                    const lotName = e.target.value;
                    const term = lotName.includes('T1') ? 'T1' : lotName.includes('T2') ? 'T2' : 'T3';
                    setResForm({ ...resForm, parkingLot: lotName, terminal: term });
                  }}>
                    {lots.map(l => <option key={l.id} value={l.name}>{l.name} ({l.type})</option>)}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Parking Start Date</label>
                    <input type="date" required className="form-input" value={resForm.startDate} onChange={e => setResForm({ ...resForm, startDate: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Duration (Hours)</label>
                    <select className="form-select" value={resForm.durationHours} onChange={e => setResForm({ ...resForm, durationHours: parseInt(e.target.value) })}>
                      <option value={1}>1 Hour (₹{resForm.vehicleType.includes('4') ? '120' : '30'})</option>
                      <option value={2}>2 Hours (₹{resForm.vehicleType.includes('4') ? '250' : '60'})</option>
                      <option value={4}>4 Hours (₹{resForm.vehicleType.includes('4') ? '400' : '100'})</option>
                      <option value={12}>12 Hours (₹{resForm.vehicleType.includes('4') ? '500' : '150'})</option>
                      <option value={24}>24 Hours Full Day (₹{resForm.vehicleType.includes('4') ? '600' : '200'})</option>
                      <option value={48}>48 Hours (2 Days) (₹{resForm.vehicleType.includes('4') ? '1,200' : '400'})</option>
                    </select>
                  </div>
                </div>

                {/* ESTIMATED FARE SUMMARY CARD */}
                <div style={{ background: 'rgba(0,242,254,0.08)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(0,242,254,0.25)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Estimated Tariff Rate:</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>₹{calculateEstimatedRate()}</div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                    Includes 18% GST & FASTag Gate Clearance Pass
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem', fontSize: '0.95rem', fontWeight: 800 }}>
                  💳 Proceed to Pay ₹{calculateEstimatedRate()} & Reserve Slot
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: MY PARKING PASSES LIST (WITH STAFF/ADMIN GATED VERIFICATION) */}
          {parkingTab === 'myPasses' && (
            <div className="glass-card">
              <h3 style={{ marginBottom: '1rem', color: 'var(--accent-cyan)' }}>🎟️ Digital Airport Parking Passes ({reservations.length})</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse', minWidth: '700px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '0.75rem' }}>Pass ID</th>
                      <th>Vehicle Number</th>
                      <th>Category</th>
                      <th>Facility & Slot</th>
                      <th>Duration</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'center' }}>{(isAdmin || isStaff) ? 'Actions (Identity Verified)' : 'Access Level'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map(r => (
                      <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 700 }}>{r.id}</td>
                        <td style={{ fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{r.vehicleNumber}</td>
                        <td>{r.vehicleType}</td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{r.parkingLot}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)' }}>Allocated: {r.slotNumber}</div>
                        </td>
                        <td>{r.durationHours} Hours</td>
                        <td style={{ fontWeight: 800, color: 'var(--accent-emerald)' }}>₹{r.amountPaid}</td>
                        <td><span className="badge badge-success">{r.paymentStatus}</span></td>
                        <td style={{ textAlign: 'center' }}>
                          {(isAdmin || isStaff) ? (
                            <div style={{ display: 'flex', gap: '0.3rem', justifyContent: 'center' }}>
                              <button
                                className="btn btn-secondary"
                                style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', color: 'var(--accent-cyan)' }}
                                onClick={() => {
                                  setVerifyModal({ reservation: r, actionType: 'view' });
                                  setVerifyInput('');
                                  setVerifyError('');
                                }}
                              >
                                👁️ View Pass
                              </button>
                              <button
                                className="btn btn-secondary"
                                style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', color: 'var(--accent-rose)' }}
                                onClick={() => {
                                  setVerifyModal({ reservation: r, actionType: 'delete' });
                                  setVerifyInput('');
                                  setVerifyError('');
                                }}
                              >
                                🗑️
                              </button>
                            </div>
                          ) : (
                            <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>
                              🔒 Staff/Admin Only
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {reservations.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    No parking reservations found. Click "+ Reserve Parking Slot" to book your parking spot!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: ADMIN MANUAL CONTROLS & TELEMETRY OVERRIDES */}
          {parkingTab === 'adminEdit' && (isAdmin || isStaff) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* ADMIN HEADER */}
              <div className="glass-card" style={{ border: '2px solid var(--accent-amber)', background: 'rgba(245,158,11,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>⚙️</span>
                      <h3 style={{ color: 'var(--accent-amber)', margin: 0 }}>Admin Manual Control & Sensor Calibration Panel</h3>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                      Authorized Admin Override for modifying slot telemetry, calibrating AI sensors, and manually logging vehicle movements.
                    </div>
                  </div>
                  <span className="badge badge-warning" style={{ fontWeight: 800 }}>⚡ ADMIN PRIVILEGES GRANTED</span>
                </div>
              </div>

              <div className="grid-2">
                {/* LEFT: MANUAL LOT TELEMETRY OVERRIDE */}
                <div className="glass-card">
                  <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>🛠️ Modify Parking Lot Telemetry</h3>
                  <form onSubmit={handleSaveAdminLotEdit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Select Parking Facility to Edit</label>
                      <select className="form-select" value={selectedAdminLotId} onChange={e => setSelectedAdminLotId(e.target.value)}>
                        {lots.map(l => <option key={l.id} value={l.id}>{l.name} ({l.type})</option>)}
                      </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Total 4W Capacity</label>
                        <input type="number" required className="form-input" value={adminLotEditForm.total4w} onChange={e => setAdminLotEditForm({ ...adminLotEditForm, total4w: e.target.value })} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Filled 4W Slots</label>
                        <input type="number" required className="form-input" value={adminLotEditForm.filled4w} onChange={e => setAdminLotEditForm({ ...adminLotEditForm, filled4w: e.target.value })} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Reserved 4W Slots</label>
                        <input type="number" required className="form-input" value={adminLotEditForm.reserved4w} onChange={e => setAdminLotEditForm({ ...adminLotEditForm, reserved4w: e.target.value })} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Total 2W Capacity</label>
                        <input type="number" required className="form-input" value={adminLotEditForm.total2w} onChange={e => setAdminLotEditForm({ ...adminLotEditForm, total2w: e.target.value })} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Filled 2W Slots</label>
                        <input type="number" required className="form-input" value={adminLotEditForm.filled2w} onChange={e => setAdminLotEditForm({ ...adminLotEditForm, filled2w: e.target.value })} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Reserved 2W Slots</label>
                        <input type="number" required className="form-input" value={adminLotEditForm.reserved2w} onChange={e => setAdminLotEditForm({ ...adminLotEditForm, reserved2w: e.target.value })} />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Facility Status</label>
                      <select className="form-select" value={adminLotEditForm.status} onChange={e => setAdminLotEditForm({ ...adminLotEditForm, status: e.target.value })}>
                        <option value="OPEN">🟢 OPEN (Operational)</option>
                        <option value="FULL">🔴 FULL (Occupied)</option>
                        <option value="MAINTENANCE">🟡 MAINTENANCE (Closed)</option>
                      </select>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem', background: 'linear-gradient(135deg, var(--accent-amber), #d97706)', color: '#000', fontWeight: 800 }}>
                      💾 Save Parking Lot Telemetry Overrides
                    </button>
                  </form>
                </div>

                {/* RIGHT: MANUAL VEHICLE ENTRY / EXIT LOGGER */}
                <div className="glass-card">
                  <h3 style={{ color: 'var(--accent-amber)', marginBottom: '1rem' }}>✍️ Manual Vehicle Entry / Exit Logger</h3>
                  <form onSubmit={handleManualLogSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Vehicle Registration Number</label>
                      <input
                        required
                        className="form-input"
                        placeholder="e.g. DL-01-AB-1234"
                        value={manualLogForm.vehicleNumber}
                        onChange={e => setManualLogForm({ ...manualLogForm, vehicleNumber: e.target.value })}
                        style={{ textTransform: 'uppercase' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                      <div>
                        <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Movement Type</label>
                        <select className="form-select" value={manualLogForm.eventType} onChange={e => setManualLogForm({ ...manualLogForm, eventType: e.target.value })}>
                          <option value="ENTRY">🟢 ENTRY (Vehicle In)</option>
                          <option value="EXIT">🔴 EXIT (Vehicle Out)</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Vehicle Type</label>
                        <select className="form-select" value={manualLogForm.vehicleType} onChange={e => setManualLogForm({ ...manualLogForm, vehicleType: e.target.value })}>
                          <option value="4 Wheeler">4 Wheeler (Car / SUV)</option>
                          <option value="2 Wheeler">2 Wheeler (Bike / Scooter)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Parking Facility & Gate</label>
                      <select className="form-select" value={manualLogForm.parkingLot} onChange={e => setManualLogForm({ ...manualLogForm, parkingLot: e.target.value })}>
                        {lots.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
                      </select>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem', fontWeight: 800 }}>
                      📝 Manually Log Movement & Recalculate Slots
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* INTEGRATED PAYMENT GATEWAY MODAL */}
          {showPaymentModal && (
            <div className="modal-overlay" onClick={e => { if (e.target.className.includes('modal-overlay')) setShowPaymentModal(false); }}>
              <div className="modal-card" style={{ maxWidth: '480px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ color: 'var(--accent-cyan)' }}>💳 AAI Airport Payment Gateway</h3>
                  <button className="btn btn-secondary" onClick={() => setShowPaymentModal(false)}>✕</button>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '0.85rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Vehicle Reg:</span>
                    <strong style={{ fontFamily: 'var(--font-mono)' }}>{resForm.vehicleNumber.toUpperCase()}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Facility:</span>
                    <strong>{resForm.parkingLot}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Duration & Rate:</span>
                    <strong style={{ color: 'var(--accent-emerald)', fontSize: '1rem' }}>₹{calculateEstimatedRate()}</strong>
                  </div>
                </div>

                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Select Payment Method:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {[
                    { id: 'UPI', label: '📱 UPI (GPay/PhonePe)', icon: '⚡' },
                    { id: 'FASTAG', label: '🚘 FASTag Auto-Debit', icon: '🚙' },
                    { id: 'CARD', label: '💳 Credit / Debit Card', icon: '💳' },
                    { id: 'NETBANKING', label: '🏦 Net Banking', icon: '🏛️' }
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      className={`btn ${paymentMethod === m.id ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '0.6rem', fontSize: '0.75rem', justifyContent: 'center' }}
                      onClick={() => setPaymentMethod(m.id)}
                    >
                      <span>{m.icon}</span> {m.label}
                    </button>
                  ))}
                </div>

                {paymentMethod === 'UPI' && (
                  <div style={{ marginBottom: '1rem' }}>
                    <input className="form-input" placeholder="Enter Virtual Payment Address (e.g. user@okicici)" defaultValue="passenger@gpay" />
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>*You will receive an instant UPI collect mandate on your app.*</div>
                  </div>
                )}

                {paymentMethod === 'FASTAG' && (
                  <div style={{ marginBottom: '1rem', background: 'rgba(16,185,129,0.08)', padding: '0.75rem', borderRadius: '6px', border: '1px solid rgba(16,185,129,0.25)', fontSize: '0.78rem' }}>
                    🚘 FASTag tag linked to <strong>{resForm.vehicleNumber.toUpperCase() || 'DL-01-AB-1234'}</strong> will be automatically debited at airport exit barrier.
                  </div>
                )}

                <button
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.75rem', fontWeight: 800, fontSize: '0.9rem' }}
                  onClick={handleConfirmPayment}
                  disabled={paymentProcessing}
                >
                  {paymentProcessing ? '⏳ Processing Payment...' : `✅ Pay ₹${calculateEstimatedRate()} Now`}
                </button>
              </div>
            </div>
          )}

          {/* DIGITAL PARKING PASS MODAL */}
          {activePassModal && (
            <div className="modal-overlay" onClick={e => { if (e.target.className.includes('modal-overlay')) setActivePassModal(null); }}>
              <div className="modal-card" style={{ maxWidth: '440px', background: 'var(--bg-main)', border: '2px solid var(--accent-cyan)' }}>
                <div style={{ textAlign: 'center', borderBottom: '1px dashed var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>🅿️</div>
                  <h3 style={{ color: 'var(--accent-cyan)', margin: 0 }}>OFFICIAL AIRPORT PARKING PASS</h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{activeAirport?.name || 'Indira Gandhi International Airport'} ({activeAirport?.code || 'DEL'})</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Pass Reference ID:</span>
                    <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)' }}>{activePassModal.id}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Vehicle Number:</span>
                    <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--accent-cyan)' }}>{activePassModal.vehicleNumber}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Allocated Slot:</span>
                    <strong style={{ color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>{activePassModal.slotNumber}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Facility:</span>
                    <strong>{activePassModal.parkingLot}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Amount Paid:</span>
                    <strong style={{ color: 'var(--accent-emerald)' }}>₹{activePassModal.amountPaid}</strong>
                  </div>
                </div>

                {/* QR CODE BARCODE MOCKUP */}
                <div style={{ background: '#fff', color: '#000', padding: '1rem', borderRadius: '8px', marginTop: '1.25rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', marginBottom: '0.3rem' }}>||| | |||| | ||| |||| | |||</div>
                  <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', fontWeight: 700 }}>{activePassModal.qrCode || 'PASS-' + Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                  <div style={{ fontSize: '0.65rem', color: '#555', marginTop: '0.3rem' }}>*Scan this QR / FASTag barcode at airport parking boom barrier*</div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
                  <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { window.print(); }}>
                    🖨️ Print / Download Pass
                  </button>
                  <button className="btn btn-secondary" onClick={() => setActivePassModal(null)}>
                    ✕ Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STAFF & ADMIN SECURITY IDENTITY VERIFICATION MODAL */}
          {verifyModal && (
            <div className="modal-overlay" onClick={e => { if (e.target.className.includes('modal-overlay')) { setVerifyModal(null); setVerifyInput(''); setVerifyError(''); } }}>
              <div className="modal-card" style={{ maxWidth: '440px', border: '2px solid var(--accent-amber)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <h3 style={{ color: 'var(--accent-amber)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    🔒 Identity Verification Required
                  </h3>
                  <button className="btn btn-secondary" onClick={() => { setVerifyModal(null); setVerifyInput(''); setVerifyError(''); }}>✕</button>
                </div>

                <div style={{ background: 'rgba(245,158,11,0.08)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.25)', marginBottom: '1rem', fontSize: '0.82rem' }}>
                  <div style={{ color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                    Target Pass ID: <strong style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{verifyModal.reservation.id}</strong>
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    Action Requested: <strong style={{ color: verifyModal.actionType === 'delete' ? 'var(--accent-rose)' : 'var(--accent-emerald)' }}>
                      {verifyModal.actionType === 'delete' ? '🗑️ Cancel Parking Reservation' : '👁️ Unlock & View Digital Pass'}
                    </strong>
                  </div>
                </div>

                <form onSubmit={handleConfirmVerification} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                      Enter Passenger's Mobile Number or Vehicle Reg. Number:
                    </label>
                    <input
                      required
                      autoFocus
                      className="form-input"
                      placeholder="e.g. +91 9876543210 or DL-01-AB-1234"
                      value={verifyInput}
                      onChange={e => { setVerifyInput(e.target.value); setVerifyError(''); }}
                      style={{ textTransform: 'uppercase' }}
                    />
                    {verifyError && (
                      <div style={{ color: 'var(--accent-rose)', fontSize: '0.75rem', marginTop: '0.4rem', fontWeight: 600 }}>
                        {verifyError}
                      </div>
                    )}
                  </div>

                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    *Security mandate: Staff and Admins must verify passenger identity against registered records before inspecting or deleting passes.*
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1, background: 'linear-gradient(135deg, var(--accent-amber), #d97706)', color: '#000', fontWeight: 800, justifyContent: 'center' }}>
                      🔐 Verify Identity & {verifyModal.actionType === 'delete' ? 'Delete' : 'Unlock'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => { setVerifyModal(null); setVerifyInput(''); setVerifyError(''); }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    }

    function OlaCabBookingView({ db, setDb, currentUser, isAdmin, isStaff, addToast, appendAuditLog, activeAirport }) {
      const aptName = activeAirport?.name || 'Indira Gandhi International Airport';
      const aptCode = activeAirport?.code || 'DEL';
      
      const [pickupPoint, setPickupPoint] = useState('Terminal 3 - Arrival Gate 4 (MLCP Taxi Hub)');
      const [dropLocation, setDropLocation] = useState('Connaught Place, Central Delhi');
      const [selectedCategory, setSelectedCategory] = useState('Ola Sedan');

      const bookings = db.cabBookings || [];

      const cabCategories = [
        { id: 'Ola Mini', name: 'Ola Mini', icon: '🚗', estFare: 320, eta: '3 mins', desc: 'Comfy hatchback for 4 passengers' },
        { id: 'Ola Sedan', name: 'Ola Sedan', icon: '🚕', estFare: 450, eta: '2 mins', desc: 'Top-rated sedan (Dzire / Etios) with extra boot space' },
        { id: 'Ola SUV', name: 'Ola SUV', icon: '🚙', estFare: 680, eta: '4 mins', desc: 'Spacious 6-seater (Ertiga / Innova) for families & heavy luggage' },
        { id: 'Ola Prime', name: 'Ola Prime / EV', icon: '⚡', estFare: 520, eta: '3 mins', desc: 'Premium EV & top drivers with free Wi-Fi' },
        { id: 'Ola Outstation', name: 'Ola Outstation', icon: '🛣️', estFare: 2400, eta: '10 mins', desc: 'Intercity travel to Agra, Jaipur, Chandigarh, etc.' }
      ];

      const chosenCat = cabCategories.find(c => c.id === selectedCategory) || cabCategories[1];

      const handleBookCab = (e) => {
        e.preventDefault();
        if (!dropLocation.trim()) {
          addToast('Please enter your drop location', 'warning');
          return;
        }

        const newBooking = {
          id: `OLA-${Math.floor(1000 + Math.random() * 9000)}`,
          passengerName: currentUser?.name || 'Airport Traveler',
          mobile: currentUser?.mobile || '+91 9876543210',
          pickupPoint,
          dropLocation,
          cabCategory: chosenCat.name,
          fare: chosenCat.estFare,
          status: 'REDIRECTED_TO_OLA',
          timestamp: new Date().toLocaleTimeString() + ' IST'
        };

        setDb(prev => ({
          ...prev,
          cabBookings: [newBooking, ...(prev.cabBookings || [])]
        }));

        appendAuditLog('CAB_BOOKING_CREATE', `Requested ${chosenCat.name} to ${dropLocation} (Est. ₹${chosenCat.estFare})`);
        addToast(`🚕 Redirecting to Official Ola App...`, 'success');
        
        // Directly redirect to official Ola Cabs web app
        window.open('https://www.olacabs.com/', '_blank');
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(0,242,254,0.08))', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(245,158,11,0.3)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.8rem' }}>🚕</span>
                <h2 style={{ fontWeight: 800, color: 'var(--accent-amber)', margin: 0 }}>Ola Cabs Official Airport Pickup Hub</h2>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                Direct passenger cab dispatch for {aptName} ({aptCode}) • Pickup at designated Airport Taxi Deck
              </div>
            </div>
            <button className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--accent-amber), #d97706)', color: '#000', fontWeight: 800 }} onClick={() => window.open('https://www.olacabs.com/', '_blank')}>
              🌐 Open Official Ola Web / App
            </button>
          </div>

          <div className="grid-2">
            {/* LEFT COLUMN: CAB BOOKING FORM */}
            <div className="glass-card">
              <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>📍 Book Your Ola Airport Taxi</h3>
              <form onSubmit={handleBookCab} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Airport Pick-up Location / Zone</label>
                  <select className="form-select" value={pickupPoint} onChange={e => setPickupPoint(e.target.value)}>
                    <option>Terminal 3 - Arrival Gate 4 (MLCP Taxi Hub)</option>
                    <option>Terminal 1 - Arrival Gate 2 Exit</option>
                    <option>Terminal 2 - Express Pick-up Zone 1</option>
                    <option>VIP Terminal Multi-Level Hub</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Drop Location / Destination</label>
                  <input
                    required
                    className="form-input"
                    placeholder="Enter your destination address..."
                    value={dropLocation}
                    onChange={e => setDropLocation(e.target.value)}
                  />
                </div>

                {/* CAB CATEGORY SELECTOR CARDS */}
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>Select Cab Type:</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {cabCategories.map(cat => (
                      <div
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: `1px solid ${selectedCategory === cat.id ? 'var(--accent-amber)' : 'var(--border-color)'}`,
                          background: selectedCategory === cat.id ? 'rgba(245,158,11,0.1)' : 'rgba(0,0,0,0.2)',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span style={{ fontSize: '1.4rem' }}>{cat.icon}</span>
                          <div>
                            <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>{cat.name}</strong>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{cat.desc}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 800, color: 'var(--accent-emerald)', fontSize: '1rem' }}>₹{cat.estFare}</div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)' }}>ETA: {cat.eta}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIDE FARE ESTIMATE SUMMARY CARD */}
                <div style={{ background: 'rgba(245,158,11,0.08)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.25)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Ride Fare Estimate:</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
                      ₹{chosenCat.estFare} <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-secondary)' }}>({chosenCat.name})</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
                    Driver ETA: <strong>{chosenCat.eta}</strong>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem', background: 'linear-gradient(135deg, var(--accent-amber), #d97706)', color: '#000', fontWeight: 800, fontSize: '0.95rem' }}>
                  🚕 Book {chosenCat.name} on Official Ola App ➔
                </button>
              </form>
            </div>

            {/* RIGHT COLUMN: RECENT CAB REQUESTS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="glass-card">
                <h3 style={{ color: 'var(--accent-amber)', marginBottom: '0.75rem' }}>🚖 Recent Cab Requests ({bookings.length})</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {bookings.map(b => (
                    <div key={b.id} style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <strong style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>{b.passengerName}</strong>
                        <span className="badge badge-success" style={{ fontSize: '0.62rem' }}>{b.cabCategory}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        Pickup: <strong>{b.pickupPoint}</strong>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
                        Drop: <strong>{b.dropLocation}</strong>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 700, marginTop: '0.3rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Est. Fare: ₹{b.fare}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 400 }}>{b.timestamp}</span>
                      </div>
                    </div>
                  ))}
                  {bookings.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      No cab requests logged yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // RENDER
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
      }
      static getDerivedStateFromError(error) {
        return { hasError: true, error };
      }
      componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught error:", error, errorInfo);
      }
      render() {
        if (this.state.hasError) {
          return (
            <div style={{ padding: '3rem', textAlign: 'center', background: '#070a12', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', fontFamily: 'sans-serif' }}>
              <div style={{ fontSize: '3rem' }}>✈️⚠️</div>
              <h2 style={{ color: '#00f2fe', margin: 0 }}>AAI AeroPulse OS — Webpage Auto-Recovery</h2>
              <p style={{ color: '#94a3b8', maxWidth: '500px', lineHeight: '1.6' }}>
                An unexpected state conflict occurred in local storage. Click below to restore all operational data cleanly.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', background: 'linear-gradient(135deg, #00f2fe, #0284c7)', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  🔄 Reset LocalStorage & Restore Webpage
                </button>
                <button
                  style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid #475569', cursor: 'pointer' }}
                  onClick={() => this.setState({ hasError: false })}
                >
                  ⚡ Retry Rendering
                </button>
              </div>
            </div>
          );
        }
        return this.props.children;
      }
    }

    

    
    const rootContainer = document.getElementById('root');
    if (rootContainer) {
      ReactDOM.createRoot(rootContainer).render(<App />);
    }

  