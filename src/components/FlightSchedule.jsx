import React, { useState } from 'react';
import { Plane, Search, Plus, Filter, AlertTriangle, CheckCircle, Clock, ArrowUpRight, ArrowDownLeft, Edit3, UserCheck, ShieldAlert } from 'lucide-react';

export default function FlightSchedule({ flights, setFlights, gates }) {
  const [activeType, setActiveType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newFlight, setNewFlight] = useState({
    flightNumber: '',
    airline: 'Air India',
    type: 'Departure',
    origin: 'Delhi (DEL)',
    destination: '',
    scheduledTime: '14:30',
    terminal: 'Terminal 3',
    gate: 'T3-Gate 32',
    aircraft: 'Airbus A320neo',
    passengersCount: 160,
    maxCapacity: 180
  });

  const handleStatusChange = (flightId, newStatus) => {
    setFlights(prev => prev.map(f => f.id === flightId ? { ...f, status: newStatus } : f));
  };

  const handleGateReassign = (flightId, newGate) => {
    setFlights(prev => prev.map(f => f.id === flightId ? { ...f, gate: newGate } : f));
  };

  const handleAddFlightSubmit = (e) => {
    e.preventDefault();
    if (!newFlight.flightNumber || !newFlight.destination) return;

    const created = {
      ...newFlight,
      id: `FL-DEL-${Date.now().toString().slice(-4)}`,
      estimatedTime: newFlight.scheduledTime,
      status: 'On Time',
      baggageCount: Math.floor(newFlight.passengersCount * 1.1),
      aiDelayRisk: Math.floor(Math.random() * 20),
      delayReason: null,
      weatherContext: 'Haze / Clear',
      boardingProgress: 0
    };

    setFlights([created, ...flights]);
    setShowAddModal(false);
  };

  const filteredFlights = flights.filter(flight => {
    const matchesType = activeType === 'All' || flight.type === activeType;
    const matchesStatus = statusFilter === 'All' || flight.status === statusFilter;
    const matchesSearch = 
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.origin.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Delhi Airport (DEL) Flight Schedule (AAI FIDS)</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Real-time flight status tracking across Terminals T1, T2 & T3</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={18} /> Schedule New DEL Flight
        </button>
      </div>

      <div className="glass-card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
          {['All', 'Departure', 'Arrival'].map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              style={{
                padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', border: 'none',
                background: activeType === type ? 'var(--accent-blue)' : 'transparent',
                color: activeType === type ? '#000' : 'var(--text-secondary)',
                fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem'
              }}
            >
              {type}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text" className="form-input" style={{ paddingLeft: '2.4rem' }}
            placeholder="Search Flight # (AI-101, 6E-2015), Destination, Airline..."
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container glass-card" style={{ padding: 0 }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Flight #</th>
              <th>Airline</th>
              <th>Type</th>
              <th>Destination / Origin</th>
              <th>Sched. Time</th>
              <th>Est. Time</th>
              <th>Terminal & Gate</th>
              <th>Status</th>
              <th>Load</th>
              <th>AI Risk</th>
            </tr>
          </thead>
          <tbody>
            {filteredFlights.map(flight => (
              <tr key={flight.id}>
                <td style={{ fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{flight.flightNumber}</td>
                <td>{flight.airline}</td>
                <td><span className="badge badge-info">{flight.type}</span></td>
                <td>{flight.type === 'Departure' ? flight.destination : flight.origin}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{flight.scheduledTime} IST</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{flight.terminal} • {flight.gate}</td>
                <td>
                  <select
                    className="form-select"
                    value={flight.status}
                    onChange={(e) => handleStatusChange(flight.id, e.target.value)}
                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', fontWeight: 700 }}
                  >
                    <option value="On Time">On Time</option>
                    <option value="Boarding">Boarding</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Landed">Landed</option>
                    <option value="Gate Closed">Gate Closed</option>
                  </select>
                </td>
                <td>{flight.passengersCount} / {flight.maxCapacity}</td>
                <td>
                  <span className={`badge ${flight.aiDelayRisk > 50 ? 'badge-danger' : 'badge-success'}`}>
                    {flight.aiDelayRisk}% Risk
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
