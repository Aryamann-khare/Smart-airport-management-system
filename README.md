# ✈️ AAI AeroPulse OS — Smart Airport Management Platform

You can find the live deployed project link here :- https://smart-airport-management-system-aryamann-khare.wasmer.app/
A comprehensive, state-of-the-art Smart Airport Operations & Passenger Experience Platform designed for the Airport Authority of India (AAI) and Indira Gandhi International Airport (DEL / VIDP), with multi-airport telemetry support across India (DEL, BOM, BLR, MAA, CCU, HYD, AMD).

🏛️ System Architecture Overview
Mermaid diagram
The system operates as a zero-external-dependency, standalone full-stack web application:

Frontend: Pure modern JavaScript React 18 SPA (app.js), rendered in index.html with vanilla CSS glassmorphism styling (src/index.css) and interactive charts (Chart.js).
Backend: Node.js HTTP server (server.js) listening on port 8080, handling static assets, REST API endpoints, and dual local disk persistence engines.
Storage Engines:
user_credentials.csv: Disk-based CSV storage engine for user accounts, roles, employee IDs, passwords, and approval statuses.
mongodb_credentials.json: Disk-based JSON storage engine for document-formatted credentials and system telemetry.
window.localStorage: Client-side caching engine preserving login sessions (AEROSKY_CURRENT_USER) and system state offline.
📁 Key Project Files & Structure
File Path	Description
app.js
Primary React application bundle containing all views, state management, AI bot, and modular airport operations interfaces.
server.js
Standalone Node.js web server handling static asset serving and local disk sync for CSV/JSON files.
index.html
Main HTML document loading custom fonts, styles, React, Chart.js, and mounting the root application.
user_credentials.csv
Local CSV database storing user account records, roles, passwords, and timestamps.
mongodb_credentials.json
Local JSON database storing credential metadata and user collections.
manifest.json
Progressive Web App (PWA) manifest file for native installability.
package.json
Clean Node project manifest configured for zero external npm dependencies.
src/index.css
Custom Design System featuring dark mode glassmorphism, glowing telemetry cards, animations, and custom scrollbars.
🌟 Comprehensive Features & Module Breakdown
1. 📍 Multi-Airport Location Telemetry & Dashboard
Dynamic Airport Scoping: Seamlessly toggle between major AAI airports across India:
🏙️ Indira Gandhi International Airport (DEL / VIDP)
🌊 Chhatrapati Shivaji Maharaj International Airport (BOM / VABB)
🌳 Kempegowda International Airport (BLR / VOBL)
🏖️ Chennai International Airport (MAA / VOMM)
🌉 Netaji Subhash Chandra Bose International Airport (CCU / VECC)
💎 Rajiv Gandhi International Airport (HYD / VHYD)
🏰 Sardar Vallabhbhai Patel International Airport (AMD / VAAH)
Location-Specific KPI Metrics:
✈️ Active Flights: Live count of inbound & outbound aircraft movements.
👥 Passengers Today: Real-time daily passenger throughput.
🛄 Bags Processed: Automated luggage belt statistics.
🚨 Active Alerts: Live emergency & priority alerts.
🚪 Gates Occupied: Real-time boarding gate utilization ratio.
⏱️ On-Time Performance: Flight schedule punctuality percentage.
🛡️ Security Cleared: CISF security checkpoint clearance counter.
🌤️ Weather & Visibility: Live local temperature and visibility index.
💚 System Health: Airport IoT grid operational health index.
2. ✈️ Live Flight Tracker & Schedule Operations
Live Search & Filter: Filter flights by status (On Time, Delayed, Boarding, Landed), terminal (T1, T2, T3), or search by Flight Number / Destination.
Interactive Flight Details Modal: View aircraft tail number, speed, altitude, terminal, gate assignment, baggage belt number, and estimated arrival/departure time.
Staff/Admin Control: Add new flights, modify departure times, or update flight statuses in real time.
3. 🆔 DigiYatra & Biometric Gate Pass System
Digital Boarding Pass Upload: Input passenger PNR, Aadhaar number, and photo ID for instant facial biometric enrollment.
Fast-Track Gate Clearance: Generates an official DigiYatra Digital Pass with dynamic QR code for expedited security gate entry.
4. 🛄 Smart Baggage Tracking System
RFID Luggage Tag Finder: Search by Bag Tag Code (e.g. BAG-90812) or Passenger PNR.
Luggage Conveyor Belt Mapping: Displays real-time baggage scan milestones (Check-in -> Security -> Loaded on Flight -> Conveyor Belt 04).
5. 🚘 Car Parking & FASTag Auto-Debit System
Real-time Facility Slots: View live slot availability across Multi-Level Car Parking (MLCP) T1, T2, and T3.
Slot Booking & Payment Gateway: Reserve parking slots for 1 to 48 hours with simulated UPI, FASTag Auto-Debit, Credit Card, or Net Banking.
Digital Parking Pass: Generates a printable digital parking pass with barcode and assigned parking slot.
6. 🔍 Lost & Found Inventory & Claims Vault
Public Unclaimed Gallery: Browse reported lost and recovered items with search and category tags (Electronics, Baggage, Documents, Wallets).
Missing Item Reporting: Submit lost or found item reports with details and location.
Pending Staff Review Queue: Staff & Admin review queue to verify item reports before publishing.
Claimed Items Vault: Archived vault of verified and claimed items, featuring an Admin Delete Option (🗑️ Delete Claimed Item) to permanently purge records.
7. ♿ Wheelchair & Accessibility Assistance Dispatch
PRM Assistance Booking: Passengers with reduced mobility can request dedicated wheelchair assistance with airline name and PNR.
Staff Dispatch Panel: Airport staff can accept, dispatch, complete, or reject wheelchair requests with audit logging.
8. 🚖 Ola & Airport Cab Booking Integration
Instant Cab Request: Book airport taxis across multiple categories (Ola Mini, Sedan, SUV, Executive Prime).
Official Ola App Launch Button: Prominent glowing header button "🚖 Open Official Ola Cab App ↗" linking directly to https://book.olacabs.com.
9. 🚨 Emergency Operations & Alert Center
Live Incident Monitor: Real-time logging of airfield emergencies (Medical Assist, Bird Strike, Runway Inspection, Fire Alarm).
Priority Escalation: Staff can trigger immediate airfield emergency alerts notified directly to the operations control desk.
10. 📝 Report Issue / Support Ticket System
Sidebar Access: Dedicated "Report Issue / Ticket" tab accessible from the left navigation panel.
Issue Submission Form: Full Name, Phone Number, Email Address, Airport Location, Category (Baggage, Cleanliness, Terminal Facilities, Security, Staff Conduct), Urgency Level (Low, Medium, High, Emergency), and Detailed Description.
Ticket Management Desk: Unique Ticket IDs (e.g. TCK-84920) stored in db.tickets. Admins can post official responses with simulated automated SMS & Email dispatch alerts to the passenger.
11. 📋 Duty Roster & Staff Shift Management
Staff Roster Grid: View daily shifts for CISF Security, Terminal Operations, Ground Handling, and Air Traffic Control.
Shift Assignment: Admins can assign or reassign staff shifts and duties.
12. 👑 Master Admin Command Center & Account Console
Restricted Access: Exclusive access for AAI Master Admin (admin@delhi.aai).
User Accounts Console: View all registered users and staff with name, email, employee ID, role, and approval status.
Password Management:
👁️ / 🙈 Individual Password Toggle
🔓 Show / Hide All Passwords Button
🔑 Admin Reset Password Modal to overwrite any user password instantly.
Account Approvals & Unblocking: Approve pending staff registrations, ask for verification documents, block suspicious accounts, or unblock restricted users.
13. 🤖 AeroSky 3D AI Assistant
Google Gemini 1.5 Pro AI: Powered by a permanent embedded Gemini API key (AIzaSyBO-J7oWdntnLA5-eBc8O4RblnVkWXNEos).
Universal Knowledge & Calculator: Answers live airport status queries, parking tariffs, Delhi Metro schedules, general trivia, and performs inline math calculations.
Streamlined UI: Floating launcher with clean conversation drawer, free of any manual key config buttons.
14. ⏰ Real-time Clock & Multilingual Support
Live Ticking Clock: Topbar header clock updating every second (dd-Mon-yyyy | hh:mm:ss AM/PM).
Multi-Language Selector: Instant UI translation across 8 languages: English (en), Hindi (hi), Tamil (ta), Telugu (te), Bengali (bn), Marathi (mr), Gujarati (gu), and Kannada (kn).
🧪 System Verification & Test Executions

--- VERIFYING APP.JS RUNTIME COMPATIBILITY ---
ReactDOM.createRoot().render called successfully!
✅ Top-level script evaluation succeeded!
✅ app.js loaded without any syntax or initialization crashes.
Syntax Integrity: node --check server.js and node --check app.js passed with exit code 0.
Local Storage Test: server.js verified reading and writing to 
user_credentials.csv
 and 
mongodb_credentials.json
.
DOM Render Test: React 18 component tree evaluated without any runtime exceptions or missing dependencies.
