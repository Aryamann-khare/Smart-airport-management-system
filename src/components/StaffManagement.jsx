import React, { useState } from 'react';
import { Users, UserCheck, ShieldAlert, Wrench, Briefcase, Plus, Send, Clock } from 'lucide-react';

export default function StaffManagement({ staff, setStaff }) {
  const [roleFilter, setRoleFilter] = useState('All');
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [selectedStaffForDispatch, setSelectedStaffForDispatch] = useState(null);
  const [taskText, setTaskText] = useState('');

  const filteredStaff = roleFilter === 'All' 
    ? staff 
    : staff.filter(s => s.role === roleFilter);

  const handleStatusChange = (staffId, newStatus) => {
    setStaff(prev => prev.map(s => s.id === staffId ? { ...s, shiftStatus: newStatus } : s));
  };

  const handleDispatchTask = (e) => {
    e.preventDefault();
    if (!selectedStaffForDispatch || !taskText) return;

    setStaff(prev => prev.map(s => {
      if (s.id === selectedStaffForDispatch.id) {
        return { ...s, assignedTask: taskText, shiftStatus: 'On Duty' };
      }
      return s;
    }));

    setShowDispatchModal(false);
    setTaskText('');
    setSelectedStaffForDispatch(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Staff Roster & Resource Management</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Ground operations workforce, shift status tracking, and rapid task dispatcher</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setSelectedStaffForDispatch(staff[0]); setShowDispatchModal(true); }}>
          <Send size={18} /> Dispatch Task to Staff
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ padding: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {['All', 'Gate Agent', 'Security Supervisor', 'Baggage Handler', 'Avionics Maintenance', 'Ground Operations Lead'].map(role => (
          <button
            key={role}
            className={`btn ${roleFilter === role ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            onClick={() => setRoleFilter(role)}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Staff Grid */}
      <div className="grid-4">
        {filteredStaff.map(member => (
          <div key={member.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{member.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{member.id}</div>
              </div>
              <span className={`badge ${member.shiftStatus === 'On Duty' ? 'badge-success' : member.shiftStatus === 'On Break' ? 'badge-warning' : 'badge-danger'}`}>
                {member.shiftStatus}
              </span>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <div>Role: <strong style={{ color: '#fff' }}>{member.role}</strong></div>
              <div>Team: {member.team}</div>
              <div>Current Station: <strong style={{ color: 'var(--accent-blue)' }}>{member.location}</strong></div>
            </div>

            <div style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '0.65rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem'
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ASSIGNED TASK</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {member.assignedTask || 'No active task assigned'}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
              <select
                className="form-select"
                value={member.shiftStatus}
                onChange={e => handleStatusChange(member.id, e.target.value)}
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem', flex: 1 }}
              >
                <option value="On Duty">On Duty</option>
                <option value="On Break">On Break</option>
                <option value="Off Duty">Off Duty</option>
              </select>

              <button
                className="btn btn-secondary"
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                onClick={() => { setSelectedStaffForDispatch(member); setShowDispatchModal(true); }}
              >
                Assign
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dispatch Task Modal */}
      {showDispatchModal && selectedStaffForDispatch && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '1rem'
        }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="card-header">
              <h3 className="card-title"><Send size={18} /> Dispatch Task to Staff Member</h3>
              <button className="btn btn-secondary" onClick={() => setShowDispatchModal(false)}>✕</button>
            </div>
            <form onSubmit={handleDispatchTask} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Select Personnel</label>
                <select
                  className="form-select"
                  value={selectedStaffForDispatch.id}
                  onChange={e => setSelectedStaffForDispatch(staff.find(s => s.id === e.target.value))}
                >
                  {staff.map(s => (
                    <option key={s.id} value={s.id}>{s.name} - {s.role} ({s.location})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Task Instruction / Dispatch Detail</label>
                <textarea
                  className="form-input"
                  rows="4"
                  required
                  placeholder="e.g. Inspect hydraulic leak at Gate B08 immediately..."
                  value={taskText}
                  onChange={e => setTaskText(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowDispatchModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Transmit Dispatch Command</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
