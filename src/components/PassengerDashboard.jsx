import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Search, QrCode, MapPin, ShieldCheck, Coffee, Navigation, Utensils, Luggage, Clock, CheckCircle2 } from 'lucide-react';

export default function PassengerDashboard({ passengers, flights }) {
  const [searchPnr, setSearchPnr] = useState('PNR-DEL-9081');
  const [selectedPassenger, setSelectedPassenger] = useState(passengers[0]);
  const [qrDataUrl, setQrDataUrl] = useState('');

  const matchedFlight = flights.find(f => f.flightNumber === selectedPassenger?.flightNumber) || flights[0];

  useEffect(() => {
    if (selectedPassenger) {
      const qrPayload = JSON.stringify({
        pnr: selectedPassenger.pnr,
        name: selectedPassenger.name,
        flight: selectedPassenger.flightNumber,
        seat: selectedPassenger.seat,
        gate: matchedFlight.gate,
        authority: 'Airport Authority of India (AAI DEL)'
      });

      QRCode.toDataURL(qrPayload, { width: 160, margin: 1, color: { dark: '#00f2fe', light: '#090d16' } })
        .then(url => setQrDataUrl(url))
        .catch(err => console.error(err));
    }
  }, [selectedPassenger, matchedFlight]);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = passengers.find(p => p.pnr.toLowerCase() === searchPnr.trim().toLowerCase());
    if (found) {
      setSelectedPassenger(found);
    } else {
      alert(`No passenger record found for PNR: ${searchPnr}`);
    }
  };

  const DEL_SERVICES = [
    { name: "CISF DigiYatra Express Security Checkpoint", type: "Security", status: "Open", waitTime: "5 mins", icon: ShieldCheck },
    { name: "Encalm VIP Lounge & Air India Maharaja Lounge", type: "Lounge", status: "Open", waitTime: "Walk-in", icon: Coffee },
    { name: "Delhi Duty Free Luxury Emporium", type: "Shopping", status: "Open", waitTime: "N/A", icon: Navigation },
    { name: "Punjab Grill & Costa Coffee T3 Concourse", type: "Dining", status: "Open", waitTime: "4 mins", icon: Utensils },
    { name: "Celebi Automated Baggage Belt 08", type: "Baggage", status: "Active", waitTime: "Synced", icon: Luggage }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Passenger DigiYatra Portal (AAI Delhi Airport)</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>DigiYatra biometrics, digital boarding pass generator, and Indira Gandhi International Airport (DEL) amenity guide</p>
      </div>

      <div className="glass-card">
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text" className="form-input" style={{ paddingLeft: '2.5rem' }}
              placeholder="Enter PNR Code (e.g. PNR-DEL-9081, PNR-DEL-4412)..."
              value={searchPnr} onChange={e => setSearchPnr(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Lookup DigiYatra PNR
          </button>
        </form>
      </div>

      {selectedPassenger && (
        <div className="grid-2">
          <div className="glass-card" style={{ border: '1px solid rgba(0, 242, 254, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>AIRPORT AUTHORITY OF INDIA • DIGIYATRA PASS</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{matchedFlight.airline}</div>
              </div>
              <span className="badge badge-success">{selectedPassenger.status}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Passenger Name</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{selectedPassenger.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                  PNR: {selectedPassenger.pnr}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Flight Number</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>
                  {matchedFlight.flightNumber}
                </div>
              </div>
            </div>

            <div className="grid-4" style={{ marginBottom: '1.5rem', textAlign: 'center', background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '8px' }}>
              <div><div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>TERMINAL</div><div style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>{matchedFlight.terminal}</div></div>
              <div><div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>GATE</div><div style={{ fontWeight: 800, color: 'var(--accent-amber)', fontSize: '1.1rem' }}>{matchedFlight.gate}</div></div>
              <div><div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>SEAT</div><div style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>{selectedPassenger.seat}</div></div>
              <div><div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CLASS</div><div style={{ fontWeight: 700, color: 'var(--accent-purple)' }}>{selectedPassenger.class}</div></div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>DigiYatra QR & Face Scan</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scan at CISF e-Gate Entry</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginTop: '0.5rem' }}>
                  Tag ID: {selectedPassenger.tagId}
                </div>
              </div>
              {qrDataUrl && <img src={qrDataUrl} alt="DigiYatra Boarding QR Code" style={{ borderRadius: '8px', border: '1px solid var(--border-glow)' }} />}
            </div>
          </div>

          <div className="glass-card">
            <div className="card-header">
              <h3 className="card-title"><MapPin size={20} /> DEL Airport Services Locator</h3>
              <span className="badge badge-info">Live CISF Feed</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {DEL_SERVICES.map((srv, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{srv.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{srv.type} • Located in {matchedFlight.terminal}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>{srv.waitTime}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{srv.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
