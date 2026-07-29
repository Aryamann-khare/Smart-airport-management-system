import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, Radio, CheckSquare, Bell, Flame, CloudLightning, Shield, AlertOctagon, CheckCircle2 } from 'lucide-react';

export default function EmergencyAlerts({ alerts, setAlerts }) {
  const [showTriggerModal, setShowTriggerModal] = useState(false);
  const [newAlert, setNewAlert] = useState({
    severity: 'Code Yellow',
    title: '',
    message: '',
    affectedTerminals: ['Terminal B'],
    actionRequired: ''
  });

  const [checklist, setChecklist] = useState([
    { id: 1, task: "Notify Air Traffic Control (ATC) Tower", completed: true },
    { id: 2, task: "Broadcast Automated Terminal PA Announcement", completed: true },
    { id: 3, task: "Dispatch First Responder & Medical Teams to Sector", completed: false },
    { id: 4, task: "Initiate Ground Stop on Affected Runways", completed: false },
    { id: 5, task: "Engage Backup Uninterruptible Power Supply (UPS)", completed: false }
  ]);

  const handleToggleCheck = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const handleResolveAlert = (alertId) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  const handleTriggerAlert = (e) => {
    e.preventDefault();
    if (!newAlert.title || !newAlert.message) return;

    const created = {
      ...newAlert,
      id: `ALERT-${Date.now().toString().slice(-3)}`,
      timestamp: new Date().toLocaleTimeString(),
      status: 'Active'
    };

    setAlerts([created, ...alerts]);
    setShowTriggerModal(false);
    setNewAlert({
      severity: 'Code Yellow',
      title: '',
      message: '',
      affectedTerminals: ['Terminal B'],
      actionRequired: ''
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Emergency Broadcast & Incident Command Center</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Airport-wide panic response, multi-terminal alert system, and SOP compliance engine</p>
        </div>
        <button className="btn btn-danger" onClick={() => setShowTriggerModal(true)}>
          <ShieldAlert size={18} /> Trigger Emergency Alert
        </button>
      </div>

      {/* Active Emergency Status Summary */}
      <div className="grid-2">
        {/* Active Emergency Alerts List */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card-header">
            <h3 className="card-title"><Bell size={20} /> Active Emergency Notifications ({alerts.length})</h3>
            <span className="badge badge-danger">Live Stream</span>
          </div>

          {alerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={40} style={{ color: 'var(--accent-emerald)', marginBottom: '0.5rem' }} />
              <div>All Airport Systems Operating Normally (Code Green)</div>
            </div>
          ) : (
            alerts.map(alert => (
              <div key={alert.id} style={{
                background: alert.severity === 'Code Red' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                border: `1px solid ${alert.severity === 'Code Red' ? 'rgba(244, 63, 94, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertTriangle size={18} style={{ color: alert.severity === 'Code Red' ? 'var(--accent-rose)' : 'var(--accent-amber)' }} />
                    <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{alert.title}</span>
                  </div>
                  <span className={`badge ${alert.severity === 'Code Red' ? 'badge-danger' : 'badge-warning'}`}>
                    {alert.severity}
                  </span>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>{alert.message}</p>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <strong>Action Required:</strong> {alert.actionRequired}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px rgba(255,255,255,0.08) solid' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    Triggered at {alert.timestamp} • Terminals: {alert.affectedTerminals.join(', ')}
                  </span>
                  <button className="btn btn-secondary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }} onClick={() => handleResolveAlert(alert.id)}>
                    Mark Resolved
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Emergency SOP Response Checklist */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card-header">
            <h3 className="card-title"><CheckSquare size={20} /> Standard Operating Procedure (SOP) Checklist</h3>
            <span className="badge badge-info">Incident Readiness</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {checklist.map(item => (
              <div key={item.id} onClick={() => handleToggleCheck(item.id)} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1rem',
                background: item.completed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${item.completed ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-color)'}`,
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => {}}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent-emerald)' }}
                />
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textDecoration: item.completed ? 'line-through' : 'none',
                  color: item.completed ? 'var(--accent-emerald)' : 'var(--text-primary)'
                }}>
                  {item.task}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trigger Alert Modal */}
      {showTriggerModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '1rem'
        }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '550px' }}>
            <div className="card-header">
              <h3 className="card-title" style={{ color: 'var(--accent-rose)' }}><ShieldAlert size={20} /> Broadcast Emergency Alert</h3>
              <button className="btn btn-secondary" onClick={() => setShowTriggerModal(false)}>✕</button>
            </div>
            <form onSubmit={handleTriggerAlert} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Alert Severity Level</label>
                <select
                  className="form-select"
                  value={newAlert.severity}
                  onChange={e => setNewAlert({ ...newAlert, severity: e.target.value })}
                >
                  <option value="Code Red">Code Red (Immediate Threat / Lockdown)</option>
                  <option value="Code Yellow">Code Yellow (Caution / Operations Advisory)</option>
                  <option value="Code Green">Code Green (Clear / All System Normal)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Alert Title</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Severe Lightning & Wind Advisory"
                  value={newAlert.title}
                  onChange={e => setNewAlert({ ...newAlert, title: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Detailed Incident Message</label>
                <textarea
                  className="form-input"
                  rows="3"
                  required
                  placeholder="Detailed message to broadcast to staff terminals and passenger displays..."
                  value={newAlert.message}
                  onChange={e => setNewAlert({ ...newAlert, message: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Action Required</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Halt tarmac fueling operations immediately..."
                  value={newAlert.actionRequired}
                  onChange={e => setNewAlert({ ...newAlert, actionRequired: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowTriggerModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-danger">Broadcast Airport Alert</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
