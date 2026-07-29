import React, { useState, useEffect } from 'react';
import { 
  Plane, Users, DoorOpen, ShieldAlert, BarChart3, Cpu, QrCode, Luggage, 
  Activity, Clock, Bell, RefreshCw, AlertTriangle
} from 'lucide-react';

import { 
  INITIAL_FLIGHTS, INITIAL_GATES, INITIAL_STAFF, 
  INITIAL_PASSENGERS, INITIAL_BAGGAGE, INITIAL_EMERGENCY_ALERTS 
} from './data/mockData';

import FlightSchedule from './components/FlightSchedule';
import PassengerDashboard from './components/PassengerDashboard';
import GateAllocation from './components/GateAllocation';
import StaffManagement from './components/StaffManagement';
import EmergencyAlerts from './components/EmergencyAlerts';
import RealTimeAnalytics from './components/RealTimeAnalytics';
import AIDelayPrediction from './components/AIDelayPrediction';
import QRBoardingAndBaggage from './components/QRBoardingAndBaggage';

export default function App() {
  const [activeTab, setActiveTab] = useState('flights');
  
  const [flights, setFlights] = useState(INITIAL_FLIGHTS);
  const [gates, setGates] = useState(INITIAL_GATES);
  const [staff, setStaff] = useState(INITIAL_STAFF);
  const [passengers, setPassengers] = useState(INITIAL_PASSENGERS);
  const [baggage, setBaggage] = useState(INITIAL_BAGGAGE);
  const [alerts, setAlerts] = useState(INITIAL_EMERGENCY_ALERTS);

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeEmergency = alerts.length > 0 ? alerts[0] : null;

  return (
    <div className="app-container">
      {activeEmergency && (
        <div className="emergency-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertTriangle size={20} />
            <span>AAI AIRPORT OPERATIONAL ADVISORY ({activeEmergency.severity}): {activeEmergency.title} — {activeEmergency.message}</span>
          </div>
          <button 
            className="btn btn-secondary" 
            style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', background: 'rgba(0,0,0,0.3)', color: '#fff' }}
            onClick={() => setActiveTab('emergency')}
          >
            AAI Command Center
          </button>
        </div>
      )}

      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">🇮🇳</div>
          <div>
            <div className="brand-title">AAI AeroPulse OS</div>
            <div className="brand-subtitle">Airport Authority of India • Delhi Int'l Airport (DEL / VIDP)</div>
          </div>
        </div>

        <div className="topbar-actions">
          <div className="live-ticker">
            <div className="pulse-dot"></div>
            <span>INDIRA GANDHI INT'L AIRPORT (DEL) • {currentTime} IST</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span className="badge badge-success">AAI Systems Operational</span>
            {activeEmergency && <span className="badge badge-danger">1 Advisory Active</span>}
          </div>
        </div>
      </header>

      <nav className="nav-tabs">
        <button 
          className={`tab-btn ${activeTab === 'flights' ? 'active' : ''}`}
          onClick={() => setActiveTab('flights')}
        >
          <Plane size={18} /> Flight Schedule (FIDS)
        </button>

        <button 
          className={`tab-btn ${activeTab === 'passenger' ? 'active' : ''}`}
          onClick={() => setActiveTab('passenger')}
        >
          <Users size={18} /> Passenger DigiYatra Portal
        </button>

        <button 
          className={`tab-btn ${activeTab === 'gates' ? 'active' : ''}`}
          onClick={() => setActiveTab('gates')}
        >
          <DoorOpen size={18} /> Gate Allocation
        </button>

        <button 
          className={`tab-btn ${activeTab === 'staff' ? 'active' : ''}`}
          onClick={() => setActiveTab('staff')}
        >
          <Activity size={18} /> CISF & Staff Roster
        </button>

        <button 
          className={`tab-btn ${activeTab === 'emergency' ? 'active' : ''}`}
          onClick={() => setActiveTab('emergency')}
          style={{ color: activeEmergency ? 'var(--accent-rose)' : undefined }}
        >
          <ShieldAlert size={18} /> AAI Emergency Alerts {alerts.length > 0 && `(${alerts.length})`}
        </button>

        <button 
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <BarChart3 size={18} /> DEL Real-Time Analytics
        </button>

        <button 
          className={`tab-btn ${activeTab === 'ai-delay' ? 'active' : ''}`}
          onClick={() => setActiveTab('ai-delay')}
        >
          <Cpu size={18} /> AI Fog & Delay Predictor
        </button>

        <button 
          className={`tab-btn ${activeTab === 'qr-baggage' ? 'active' : ''}`}
          onClick={() => setActiveTab('qr-baggage')}
        >
          <QrCode size={18} /> QR e-Gate & IoT Baggage
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'flights' && (
          <FlightSchedule 
            flights={flights} 
            setFlights={setFlights} 
            gates={gates} 
          />
        )}

        {activeTab === 'passenger' && (
          <PassengerDashboard 
            passengers={passengers} 
            flights={flights} 
          />
        )}

        {activeTab === 'gates' && (
          <GateAllocation 
            gates={gates} 
            setGates={setGates} 
            flights={flights} 
            setFlights={setFlights} 
          />
        )}

        {activeTab === 'staff' && (
          <StaffManagement 
            staff={staff} 
            setStaff={setStaff} 
          />
        )}

        {activeTab === 'emergency' && (
          <EmergencyAlerts 
            alerts={alerts} 
            setAlerts={setAlerts} 
          />
        )}

        {activeTab === 'analytics' && (
          <RealTimeAnalytics 
            flights={flights} 
            gates={gates} 
          />
        )}

        {activeTab === 'ai-delay' && (
          <AIDelayPrediction 
            flights={flights} 
            setFlights={setFlights} 
            gates={gates} 
          />
        )}

        {activeTab === 'qr-baggage' && (
          <QRBoardingAndBaggage 
            passengers={passengers} 
            setPassengers={setPassengers} 
            flights={flights} 
            setFlights={setFlights} 
            baggage={baggage} 
            setBaggage={setBaggage} 
          />
        )}
      </main>
    </div>
  );
}
