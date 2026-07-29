import React, { useState } from 'react';
import { QrCode, Scan, CheckCircle2, AlertOctagon, Luggage, Radio, Battery, Thermometer, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';

export default function QRBoardingAndBaggage({ passengers, setPassengers, flights, setFlights, baggage, setBaggage }) {
  // QR Scanner Simulator State
  const [scannedPnr, setScannedPnr] = useState('PNR-7782B');
  const [scanResult, setScanResult] = useState(null);

  // IoT Baggage State
  const [selectedTagId, setSelectedTagId] = useState(baggage[0]?.tagId);
  const selectedBag = baggage.find(b => b.tagId === selectedTagId) || baggage[0];

  const handleSimulateBoardingScan = () => {
    const passenger = passengers.find(p => p.pnr.toLowerCase() === scannedPnr.trim().toLowerCase());

    if (!passenger) {
      setScanResult({
        success: false,
        title: "INVALID BOARDING PASS",
        message: `No active passenger ticket matches PNR code: ${scannedPnr}`
      });
      return;
    }

    if (passenger.status === 'Boarded') {
      setScanResult({
        success: false,
        title: "DUPLICATE SCAN WARNING",
        message: `Passenger ${passenger.name} (${passenger.seat}) is ALREADY boarded.`
      });
      return;
    }

    // Mark passenger boarded
    setPassengers(prev => prev.map(p => p.pnr === passenger.pnr ? { ...p, status: 'Boarded' } : p));

    // Update flight boarding progress
    setFlights(prev => prev.map(f => {
      if (f.flightNumber === passenger.flightNumber) {
        return { ...f, boardingProgress: Math.min(f.maxCapacity, f.boardingProgress + 1) };
      }
      return f;
    }));

    setScanResult({
      success: true,
      title: "BOARDING AUTHORIZED",
      passengerName: passenger.name,
      flightNumber: passenger.flightNumber,
      seat: passenger.seat,
      class: passenger.class,
      message: `Welcome aboard, ${passenger.name}! Gate e-Gate Unlocked.`
    });
  };

  const handleTriggerBaggageAudit = (tagId) => {
    setBaggage(prev => prev.map(b => {
      if (b.tagId === tagId) {
        return {
          ...b,
          status: 'Normal',
          currentStep: 'Cargo Hold (AA-2401)',
          locationHistory: [
            ...b.locationHistory,
            { step: "Manual Baggage Handler Audit & Corrective Routing", time: new Date().toLocaleTimeString(), verified: true }
          ]
        };
      }
      return b;
    }));
    alert(`Baggage Tag ${tagId} successfully rerouted to correct conveyor node by Apron Handler!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Advanced Smart Operations: QR Boarding & IoT Baggage Tracking</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>e-Gate QR barcode validation scanner & RFID IoT luggage sensor telemetry stream</p>
      </div>

      {/* Feature Section 1: QR Boarding Management */}
      <div className="glass-card" style={{ border: '1px solid rgba(0, 242, 254, 0.3)' }}>
        <div className="card-header">
          <h3 className="card-title"><QrCode size={20} /> e-Gate QR Passenger Boarding Scanner Simulator</h3>
          <span className="badge badge-info">Gate A04 Scanner</span>
        </div>

        <div className="grid-2">
          {/* Scanner Input Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
              Simulate Gate Barcode Scanner / Optical Reader
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Select Passenger PNR or Scan Code</label>
              <select
                className="form-select"
                value={scannedPnr}
                onChange={e => setScannedPnr(e.target.value)}
                style={{ marginTop: '0.25rem' }}
              >
                {passengers.map(p => (
                  <option key={p.pnr} value={p.pnr}>
                    {p.pnr} - {p.name} (Flight: {p.flightNumber}, Seat: {p.seat}) [{p.status}]
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-primary" onClick={handleSimulateBoardingScan} style={{ width: '100%', padding: '0.75rem' }}>
              <Scan size={18} /> Trigger Gate Scanner & Validate Ticket
            </button>

            {/* Scan Output Screen */}
            {scanResult && (
              <div style={{
                background: scanResult.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                border: `1px solid ${scanResult.success ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)'}`,
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                marginTop: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: scanResult.success ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                  {scanResult.success ? <CheckCircle2 size={20} /> : <AlertOctagon size={20} />}
                  {scanResult.title}
                </div>
                <div style={{ fontSize: '0.875rem', marginTop: '0.4rem', color: '#fff' }}>{scanResult.message}</div>
                {scanResult.passengerName && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.4rem', fontFamily: 'var(--font-mono)' }}>
                    Seat: {scanResult.seat} • Class: {scanResult.class} • Flight: {scanResult.flightNumber}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Gate Boarding Monitor */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
              Gate A04 Live Boarding Monitor (Flight AA-2401)
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                  {flights.find(f=>f.flightNumber==='AA-2401')?.boardingProgress || 182} / 260
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Passengers Boarded</div>
              </div>
              <span className="badge badge-info">Gate Open</span>
            </div>

            <div>
              <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{
                  width: `${((flights.find(f=>f.flightNumber==='AA-2401')?.boardingProgress || 182) / 260) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))'
                }} />
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <strong>Recent Boardings:</strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.5rem' }}>
                {passengers.filter(p => p.status === 'Boarded').map(p => (
                  <div key={p.pnr} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>{p.name} ({p.seat})</span>
                    <span style={{ color: 'var(--accent-emerald)' }}>✓ Boarded</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section 2: IoT Integration for Baggage Tracking */}
      <div className="glass-card" style={{ border: '1px solid rgba(139, 92, 246, 0.3)' }}>
        <div className="card-header">
          <h3 className="card-title"><Luggage size={20} /> IoT RFID Baggage Tracking Telemetry</h3>
          <span className="badge badge-purple">Real-Time RFID Mesh</span>
        </div>

        {/* Tag Selector Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          {baggage.map(b => (
            <button
              key={b.tagId}
              className={`btn ${selectedTagId === b.tagId ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
              onClick={() => setSelectedTagId(b.tagId)}
            >
              {b.tagId} - {b.passengerName}
              {b.status === 'Misplaced Alert' && <span style={{ color: 'var(--accent-rose)', marginLeft: '4px' }}>● Alert</span>}
            </button>
          ))}
        </div>

        {selectedBag && (
          <div className="grid-2">
            {/* Baggage Info & IoT Telemetry Sensors */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                    {selectedBag.tagId}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                    Passenger: <strong>{selectedBag.passengerName}</strong> ({selectedBag.pnr})
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Flight: {selectedBag.flightNumber} • Weight: {selectedBag.weightKg} kg</div>
                </div>
                <span className={`badge ${selectedBag.status === 'Loaded' ? 'badge-success' : selectedBag.status === 'Normal' ? 'badge-info' : 'badge-danger'}`}>
                  {selectedBag.status}
                </span>
              </div>

              {/* Sensor Gauges */}
              <div className="grid-3" style={{ textTransform: 'uppercase', textAlign: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Bag Temp</div>
                  <div style={{ fontWeight: 800, color: 'var(--accent-cyan)', fontSize: '1.1rem' }}>{selectedBag.tempC} °C</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Shock / G-Force</div>
                  <div style={{ fontWeight: 800, color: selectedBag.shockG > 2.0 ? 'var(--accent-rose)' : 'var(--accent-emerald)', fontSize: '1.1rem' }}>
                    {selectedBag.shockG} g
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>IoT Battery</div>
                  <div style={{ fontWeight: 800, color: 'var(--accent-emerald)', fontSize: '1.1rem' }}>{selectedBag.batteryPct}%</div>
                </div>
              </div>

              {selectedBag.status === 'Misplaced Alert' && (
                <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.4)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--accent-rose)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <ShieldAlert size={16} /> MISPLACED BAGGAGE ROUTE ALERT
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#fff', marginTop: '0.25rem' }}>
                    RFID Scanner Node 8 detected bag location mismatch. Luggage was inadvertently directed to Transfer Carousel 2.
                  </p>
                  <button className="btn btn-danger" style={{ marginTop: '0.75rem', padding: '0.4rem 0.85rem', fontSize: '0.75rem' }} onClick={() => handleTriggerBaggageAudit(selectedBag.tagId)}>
                    Dispatch Apron Handler to Correct Route
                  </button>
                </div>
              )}
            </div>

            {/* IoT Physical Transit Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-purple)' }}>
                RFID Sensor Waypoint Audit Trail
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative', paddingLeft: '1.5rem' }}>
                {/* Vertical Timeline Bar */}
                <div style={{ position: 'absolute', left: '7px', top: '10px', bottom: '10px', width: '2px', background: 'rgba(255,255,255,0.1)' }} />

                {selectedBag.locationHistory.map((step, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute', left: '-1.5rem', top: '4px',
                      width: '12px', height: '12px', borderRadius: '50%',
                      background: step.verified ? 'var(--accent-emerald)' : 'var(--accent-rose)',
                      boxShadow: `0 0 8px ${step.verified ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`
                    }} />

                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: step.verified ? 'var(--text-primary)' : 'var(--accent-rose)' }}>
                      {step.step}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      Time: {step.time} • RFID Sensor Check: {step.verified ? 'Verified ✓' : 'Mismatch ✕'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
