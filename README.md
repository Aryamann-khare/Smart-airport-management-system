# Smart-airport-management-system

🛫 Smart Airport Operations & Passenger Portal — Complete Webpage Walkthrough
📋 1. Executive Summary & Core Platform Purpose
The Smart Airport Operations & Passenger Portal (AeroPulse OS) is an enterprise-grade, real-time web application engineered to unify passenger travel services and high-level airport operations into a single interface.

The platform serves dual operational modes:

Passenger Experience Mode: Flight tracking, baggage carousel claims, taxi booking with live fare estimates, wheelchair assistance requests, lost item reporting, and emergency SOS alerts.
Operations & Engineering Command Mode: Real-time FIDS management, gate occupancy control, aircraft fleet health diagnostics, AI video surveillance grid, staff duty rosters, and security management.
🌐 2. Multi-Airport Hub System
The portal natively supports real-time data context switching across 6 major Indian international airports:

🇮🇳 DEL — Indira Gandhi International Airport (Delhi)
🇮🇳 BOM — Chhatrapati Shivaji Maharaj International Airport (Mumbai)
🇮🇳 BLR — Kempegowda International Airport (Bengaluru)
🇮🇳 MAA — Chennai International Airport (Chennai)
🇮🇳 HYD — Rajiv Gandhi International Airport (Hyderabad)
🇮🇳 CCU — Netaji Subhash Chandra Bose International Airport (Kolkata)
NOTE

When switching the active airport in the top header, the entire web portal instantly updates flight boards, gate layouts, airport pickup bays, landmark destination lists, fleet telematics, and local emergency dispatch contact numbers!

🧭 3. Top Header & Navigation Shell
The header bar provides continuous operational awareness across every tab:

Airport Selector: Dropdown menu to switch between DEL, BOM, BLR, MAA, HYD, and CCU.
Language Switcher: Toggle between English (EN) and Hindi (HI).
Live Clock & Airport Local Time: Synchronized clock displaying hours, minutes, seconds, and date.
System Health Status Badge: Real-time indicator (● All Systems Operational).
User Authentication Button:
Unauthenticated / Passenger Mode: Displays 🔑 Login button.
Authenticated Mode: Displays active user avatar, name, badge, and Logout button.
🔍 4. Detailed Tab-by-Tab Webpage Breakdown
📊 Tab 1: Operations Command Dashboard (dashboard)
Key Metrics (KPI Cards): Total Flights Tracked, Active Passengers in Transit, On-Time Performance (%), Security Clearance Queue Times, Active Gates, and Baggage Carousels.
Runway & Taxiway Status: Real-time visual status of runways (e.g. 28/10 North Runway - ACTIVE, 29L South Runway - ACTIVE).
Weather & Meteorological Telemetry: Live temperature, visibility (meters), wind speed (knots), and weather advisories.
Quick Action Bar: Fast shortcuts to request wheelchair assistance, book an airport cab, report a lost item, or launch an emergency SOS alert.
🗺️ Tab 2: Interactive Airport Terminal & Gate Map (map)
Visual Terminal Layout: Multi-terminal schematic rendering Terminal 3 (T3), Terminal 1D (T1D), and Terminal 2 (T2).
Gate Status Indicators: Color-coded gate markers (Emerald = Boarding/Ready, Cyan = Occupied, Amber = Cleaning/Turnaround, Rose = Maintenance).
Passenger Zone Heatmaps: Security checkpoint wait times, lounge occupancy, and MLCP car parking availability.
✈️ Tab 3: Realtime Flight Information Display System (FIDS) (flights)
Arrivals & Departures Filter Bar: Switch views between incoming arrivals and outbound departures.
Live Search & Airline Filters: Instant text search by flight number (e.g. AI-102, 6E-204), airline (Air India, IndiGo, Vistara, Emirates, Singapore Airlines), or destination city.
Flight Detail Telemetry: Flight number, aircraft model, origin/destination, scheduled vs estimated time, gate assignment, terminal, and status badge (ON TIME, BOARDING, DELAYED, LANDED).
🚪 Tab 4: Intelligent Gate Allocation Manager (gates)
Gate Overview & Schedule: Real-time occupancy tracking across all concourses and gates.
Turnaround Monitoring: Turnaround time countdowns, jetbridge connectivity, catering load status, and refuelling progress.
Staff Operations (Role-Gated): Ground staff and admins can reassign gates, update turnaround statuses, and trigger gate announcements.
🚘 Tab 5: Airport Multi-Level Car Parking (MLCP) (carParking)
Parking Structure Overview: Multi-floor availability across Levels P1, P2, P3, P4, and Valet Zones.
Live Bay Counters: Track available standard parking bays, EV charging slots, and handicapped accessible spaces.
Pre-Booking Tool: Reserve parking spaces with automated QR code ticket generation.
🚕 Tab 6: Official Ola Airport Taxi & Cab Hub (cabBooking)
Airport-Specific Pickup Points: Pickup bays adapt automatically to the active airport (e.g. DEL: T3 Gate 4 MLCP Hub; BOM: T2 Arrival Gate 7).
Preset Destination Menu & Custom Search: Select popular city landmarks (e.g. Connaught Place, Cyber City, BKC, MG Road, Salt Lake) or type any custom address.
Live Distance & Duration Telemetry: Real-time telemetry badge (📍 Distance: 16.8 km • ⏱️ Est. Time: 32 mins).
Dynamic Per-KM Fare Engine:
Ola Mini: Base ₹50 + ₹12/km
Ola Sedan: Base ₹70 + ₹15/km
Ola SUV (6-Seater): Base ₹110 + ₹22/km
Ola Prime / EV: Base ₹85 + ₹18/km
Ola Executive Lux: Base ₹200 + ₹35/km
Ola Outstation: Base ₹350 + ₹18/km
Ride Booking & History: Save bookings to Cloud DB with instant driver dispatch notification.
🚨 Tab 7: SOS Emergency Response Center (emergency)
One-Click Panic Buttons: Instant emergency trigger for Medical Emergency, Fire Alert, or Security Incident.
Location Dispatch Selector: Specify exact location (e.g. Terminal 3 Security Hold, Gate 42, Baggage Belt 4).
Emergency Telemetry & Logs: Real-time alert list with response team ETA countdowns and automated security audit logging.
🛠️ Tab 8: Aircraft Fleet Health & Telematics (fleetHealth)
Airworthiness Monitor: Track aircraft fleet status (Airworthy, Minor Maintenance, AOG - Aircraft On Ground).
Engineering Telematics: Real-time metrics for Engine Health (%), Hydraulic Pressure (%), Fuel Levels (%), Tyre Status, and Brake Condition.
Role-Based Access Control: Reserved for Ground Engineering, ATC, and Master Admin. Non-authorized users are shown a sleek Restricted Access Card with a 🔑 Staff / Admin Login button to prevent black screen crashes.
🧳 Tab 9: Baggage Carousel Tracker (baggage)
Carousel Allocation: Belt assignments per arriving flight (e.g. Flight AI-102 
→
→ Carousel 4).
Baggage Claim Status: Track status progression (UNLOADING IN PROGRESS, BELT ACTIVE - CLAIM BAGS, CLAIM COMPLETED).
Delayed / Lost Baggage Assistance: Direct link to report misplaced luggage.
🎥 Tab 10: CCTV AI Surveillance Grid (cctv)
Real-Person Surveillance Feeds: 6 distinct public surveillance streams showing actual passenger flows in concourses, security holds, and gates.
Clean Camera Monitor: Ultra-clean surveillance view without distracting colored bounding boxes.
Channel Switcher & Modal Zoom: Switch between CAM-DEL-01 through CAM-DEL-06 or expand any feed into full screen.
Role-Based Access Control: Reserved for Security/CISF, ATC, and Master Admin. Non-authorized users see a Restricted Access Card with a 🔑 Staff / Admin Login button.
🔍 Tab 11: Lost & Found Vault (lostFound)
Public Lost Item Inventory: Browse logged missing items (electronics, passports, bags) with item ID, location found, and status (UNCLAIMED, IN VERIFICATION, RETURNED).
Passenger Reporting Form: Passengers can log missing belongings with description, date, and contact details.
🦽 Tab 12: Wheelchair & Passenger Special Assistance (wheelchair)
Special Assistance Booking: Passengers can request wheelchair support specifying flight number, terminal, and assistance type (e.g. Ramp to Seat, Full Assistance).
Ground Dispatch Tracking: Track request status (PENDING, DISPATCHED, COMPLETED).
Role-Gated Staff Controls: Staff and admins can assign ground handlers and update service statuses.
📋 Tab 13: Duty Roster & Staff Attendance (dutyRoster)
Shift Schedule Grid: View shift schedules (Morning Shift 06:00 - 14:00, Evening Shift 14:00 - 22:00, Night Shift 22:00 - 06:00).
Attendance Logging: Log staff check-ins, duty status (ON DUTY, OFF DUTY, ON BREAK), and assigned zones.
Role-Based Visibility: Accessible to Staff, Security, ATC, Engineering, and Master Admin.
🔑 Tab 14: Master Admin Command Center (adminCommand)
System Database Inspector: Inspect user accounts, audit logs, cab bookings, and emergency alerts.
User Management: Approve pending staff registrations, assign roles, or adjust access permissions.
Audit Logs: View chronological system activity logs with timestamps and IP records.
🔐 5. Role-Based Access Control (RBAC) Matrix
Portal Tab / View	Passenger / Guest	Staff / Ground Ops	Security / CISF	Engineering / ATC	Master Admin
Dashboard, Map, FIDS	✅ Visible	✅ Visible	✅ Visible	✅ Visible	✅ Visible
Car Parking & Cab Hub	✅ Visible	✅ Visible	✅ Visible	✅ Visible	✅ Visible
Baggage & Lost & Found	✅ Visible	✅ Visible	✅ Visible	✅ Visible	✅ Visible
Wheelchair & SOS	✅ Visible	✅ Visible	✅ Visible	✅ Visible	✅ Visible
Fleet Health	🔒 Access Card	🔒 Access Card	🔒 Access Card	✅ Full View	✅ Full View
CCTV Surveillance	🔒 Access Card	🔒 Access Card	✅ Full View	✅ Full View	✅ Full View
Duty Roster	🔒 Hidden	✅ Full View	✅ Full View	✅ Full View	✅ Full View
Admin Command	🔒 Hidden	🔒 Hidden	🔒 Hidden	🔒 Hidden	✅ Full Control
☁️ 6. Persistent Cloud Database Architecture
Automatic Cross-Device Synchronization: Integrated Cloud REST Storage Engine (fetchCloudDatabase & syncCloudDatabase) in app.js.
Refresh-Proof Persistence: When any user registers, logs in, or submits data on any host site (Wasmer, Netlify, Vercel, localhost) or device, changes automatically sync to the Cloud DB and persist across browser refreshes.
🔑 7. Master Admin Credentials
Email: admin@delhi.aai
Password: admin
Role: Master Admin (Full System Control & Unrestricted Access across all 14 modules)