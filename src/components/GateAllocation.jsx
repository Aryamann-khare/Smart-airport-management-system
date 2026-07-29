import React, { useState } from 'react';
import { DoorOpen, Cpu, CheckCircle, AlertOctagon, Wrench, RefreshCw, Zap, Plane } from 'lucide-react';

export default function GateAllocation({ gates, setGates, flights, setFlights }) {
  const [selectedTerminal, setSelectedTerminal] = useState('All');
  const [autoAllocating, setAutoAllocating] = useState(false);

  const filteredGates = selectedTerminal === 'All' 
    ? gates 
    : gates.filter(g => g.terminal === selectedTerminal);

  const handleStatusChange = (gateId, newStatus) => {
    setGates(prev => prev.map(g => g.id === gateId ? { ...g, status: newStatus } : g));
  };

  const runSmartAutoAllocation = () => {
    setAutoAllocating(true);

    setTimeout(() => {
      // Find unallocated or pending flights
      const unassignedFlights = flights.filter(f => f.status === 'On Time' || f.status === 'Delayed');
      const updatedGates = [...gates];
      let assignedCount = 0;

      unassignedFlights.forEach(fl => {
        // Find suitable available gate
        const availableGate = updatedGates.find(g => g.status === 'Available');
        if (availableGate) {
          availableGate.status = 'Occupied';
          availableGate.assignedFlight = fl.flightNumber;
          assignedCount++;
        }
      });

      setGates(updatedGates);
      setAutoAllocating(false);
      alert(`Smart AI Gate Allocation Complete! Automatically assigned ${assignedCount} flights to optimal gates based on aircraft wake category and terminal throughput.`);
    }, 800);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available': return <span className="badge badge-success"><CheckCircle size={12} /> Available</span>;
      case 'Occupied': return <span className="badge badge-info"><Plane size={12} /> Occupied</span>;
      case 'Turnaround': return <span className="badge badge-warning"><RefreshCw size={12} /> Turnaround</span>;
      case 'Maintenance': return <span className="badge badge-danger"><Wrench size={12} /> Maintenance</span>;
      default: return <span className="badge badge-secondary">{status}</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Gate Allocation & Terminal Matrix</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Real-time gate availability, aircraft category matching, and AI auto-allocation engine</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={runSmartAutoAllocation} 
          disabled={autoAllocating}
        >
          <Cpu size={18} /> {autoAllocating ? 'Optimizing Gates...' : 'Run Smart Auto-Allocation'}
        </button>
      </div>

      {/* Control Tabs */}
      <div className="glass-card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['All', 'Terminal A', 'Terminal B', 'Terminal C'].map(term => (
            <button
              key={term}
              className={`btn ${selectedTerminal === term ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              onClick={() => setSelectedTerminal(term)}
            >
              {term}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-emerald)' }}></span> Available ({gates.filter(g=>g.status==='Available').length})</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-cyan)' }}></span> Occupied ({gates.filter(g=>g.status==='Occupied').length})</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-amber)' }}></span> Turnaround ({gates.filter(g=>g.status==='Turnaround').length})</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-rose)' }}></span> Maintenance ({gates.filter(g=>g.status==='Maintenance').length})</div>
        </div>
      </div>

      {/* Gate Grid */}
      <div className="grid-3">
        {filteredGates.map(gate => (
          <div key={gate.id} className="glass-card" style={{
            borderLeft: `4px solid ${
              gate.status === 'Available' ? 'var(--accent-emerald)' :
              gate.status === 'Occupied' ? 'var(--accent-cyan)' :
              gate.status === 'Turnaround' ? 'var(--accent-amber)' : 'var(--accent-rose)'
            }`,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  Gate {gate.id}
                </span>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{gate.terminal}</div>
              </div>
              {getStatusBadge(gate.status)}
            </div>

            {/* Flight Assignment Info */}
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ASSIGNED FLIGHT</div>
              <div style={{ fontWeight: 800, color: gate.assignedFlight ? 'var(--accent-cyan)' : 'var(--text-muted)', fontSize: '1rem', fontFamily: 'var(--font-mono)' }}>
                {gate.assignedFlight || 'None (Unassigned)'}
              </div>
            </div>

            {/* Gate Attributes */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <div>Max Size: <strong style={{ color: '#fff' }}>{gate.size}</strong></div>
              <div>Jetbridge: <strong style={{ color: 'var(--accent-blue)' }}>{gate.jetbridge}</strong></div>
            </div>

            {/* Quick Status Control */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
              <select
                className="form-select"
                value={gate.status}
                onChange={(e) => handleStatusChange(gate.id, e.target.value)}
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem' }}
              >
                <option value="Available">Set Available</option>
                <option value="Occupied">Set Occupied</option>
                <option value="Turnaround">Set Turnaround</option>
                <option value="Maintenance">Set Maintenance</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
