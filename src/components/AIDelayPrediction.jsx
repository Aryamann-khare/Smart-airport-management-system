import React, { useState } from 'react';
import { Cpu, AlertTriangle, CheckCircle, RefreshCw, Zap, Sliders, ShieldCheck, ArrowRight, Activity } from 'lucide-react';

export default function AIDelayPrediction({ flights, setFlights, gates }) {
  // Environmental Simulation Controls
  const [weatherSeverity, setWeatherSeverity] = useState(25); // 0-100%
  const [atcCongestion, setAtcCongestion] = useState(40); // 0-100%
  const [inboundDelayFactor, setInboundDelayFactor] = useState(30); // 0-100%
  const [turnaroundBuffer, setTurnaroundBuffer] = useState(15); // minutes

  const recalculateAIRisk = () => {
    setFlights(prev => prev.map(flight => {
      // Calculate dynamic risk score based on parameters
      let baseRisk = flight.aiDelayRisk;
      let weatherAdd = Math.floor((weatherSeverity / 100) * 40);
      let atcAdd = Math.floor((atcCongestion / 100) * 35);
      let inboundAdd = Math.floor((inboundDelayFactor / 100) * 25);
      let bufferSubtract = Math.floor((turnaroundBuffer / 60) * 20);

      let calculatedRisk = Math.min(99, Math.max(2, baseRisk + weatherAdd + atcAdd + inboundAdd - bufferSubtract));

      let delayReason = null;
      if (calculatedRisk > 60) {
        if (weatherSeverity > 50) delayReason = "Severe Storm Cells & High Wind Turbulence";
        else if (atcCongestion > 50) delayReason = "Air Traffic Congestion & Runway Hold Queue";
        else delayReason = "Late Inbound Turnaround & Baggage Loading Delay";
      }

      return {
        ...flight,
        aiDelayRisk: calculatedRisk,
        delayReason: delayReason
      };
    }));
  };

  const getRecommendation = (risk, flight) => {
    if (risk > 70) {
      return {
        action: `Initiate Priority Gate Swap to Gate ${gates.find(g=>g.status==='Available')?.id || 'A03'} & Expedite Baggage Tug Crew`,
        impact: `Expected to recover ~22 mins turnaround time`,
        urgent: true
      };
    } else if (risk > 40) {
      return {
        action: `Pre-assign Secondary Runway Slot & Alert Catering Crew`,
        impact: `Mitigates ground queue build-up by 12 mins`,
        urgent: false
      };
    } else {
      return {
        action: `Standard Flight Operation Protocol - All Systems Green`,
        impact: `Optimal Schedule Adherence`,
        urgent: false
      };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>AI-Based Delay Risk Prediction Engine</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Predictive machine-learning risk modeling based on weather radar, ATC slots, and turnaround logistics</p>
        </div>
        <button className="btn btn-primary" onClick={recalculateAIRisk}>
          <RefreshCw size={18} /> Recalculate AI Predictive Models
        </button>
      </div>

      {/* Interactive AI Simulation Control Panel */}
      <div className="glass-card" style={{ border: '1px solid rgba(0, 242, 254, 0.3)' }}>
        <div className="card-header">
          <h3 className="card-title"><Sliders size={20} /> AI Risk Factor Simulation & Environmental Parameters</h3>
          <span className="badge badge-info">Neural Predictor V4.2</span>
        </div>

        <div className="grid-4" style={{ gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span>Radar Weather Severity:</span>
              <strong style={{ color: weatherSeverity > 50 ? 'var(--accent-rose)' : 'var(--accent-cyan)' }}>{weatherSeverity}%</strong>
            </div>
            <input
              type="range"
              min="0" max="100"
              value={weatherSeverity}
              onChange={e => setWeatherSeverity(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span>ATC Runway Congestion:</span>
              <strong style={{ color: atcCongestion > 50 ? 'var(--accent-amber)' : 'var(--accent-cyan)' }}>{atcCongestion}%</strong>
            </div>
            <input
              type="range"
              min="0" max="100"
              value={atcCongestion}
              onChange={e => setAtcCongestion(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-amber)' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span>Inbound Aircraft Latency:</span>
              <strong style={{ color: inboundDelayFactor > 50 ? 'var(--accent-rose)' : 'var(--accent-cyan)' }}>{inboundDelayFactor}%</strong>
            </div>
            <input
              type="range"
              min="0" max="100"
              value={inboundDelayFactor}
              onChange={e => setInboundDelayFactor(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-purple)' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span>Ground Turnaround Buffer:</span>
              <strong style={{ color: 'var(--accent-emerald)' }}>{turnaroundBuffer} mins</strong>
            </div>
            <input
              type="range"
              min="5" max="60"
              value={turnaroundBuffer}
              onChange={e => setTurnaroundBuffer(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-emerald)' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button className="btn btn-primary" onClick={recalculateAIRisk} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
            Apply Parameters & Update All Risk Scores
          </button>
        </div>
      </div>

      {/* Flight AI Risk Matrix Cards */}
      <div className="grid-2">
        {flights.map(flight => {
          const rec = getRecommendation(flight.aiDelayRisk, flight);
          return (
            <div key={flight.id} className="glass-card" style={{
              borderLeft: `4px solid ${
                flight.aiDelayRisk > 70 ? 'var(--accent-rose)' :
                flight.aiDelayRisk > 40 ? 'var(--accent-amber)' : 'var(--accent-emerald)'
              }`,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                    {flight.flightNumber}
                  </span>
                  <span style={{ marginLeft: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {flight.airline} ({flight.destination})
                  </span>
                </div>
                <span className={`badge ${flight.aiDelayRisk > 70 ? 'badge-danger' : flight.aiDelayRisk > 40 ? 'badge-warning' : 'badge-success'}`} style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}>
                  {flight.aiDelayRisk}% Risk Score
                </span>
              </div>

              {/* Risk Breakdown Progress Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  <span>Probability of Flight Delay &gt; 15 mins</span>
                  <span>{flight.aiDelayRisk}% Confidence</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${flight.aiDelayRisk}%`,
                    height: '100%',
                    background: flight.aiDelayRisk > 70 ? 'linear-gradient(90deg, var(--accent-amber), var(--accent-rose))' :
                                flight.aiDelayRisk > 40 ? 'var(--accent-amber)' : 'var(--accent-emerald)'
                  }} />
                </div>
              </div>

              {flight.delayReason && (
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-rose)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <AlertTriangle size={14} /> Primary Risk Factor: {flight.delayReason}
                </div>
              )}

              {/* AI Proactive Recommendation Box */}
              <div style={{
                background: rec.urgent ? 'rgba(244, 63, 94, 0.1)' : 'rgba(0, 242, 254, 0.05)',
                border: `1px solid ${rec.urgent ? 'rgba(244, 63, 94, 0.3)' : 'rgba(0, 242, 254, 0.2)'}`,
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem'
              }}>
                <div style={{ fontWeight: 700, color: rec.urgent ? 'var(--accent-rose)' : 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                  <Zap size={14} /> AI Recommended Mitigation:
                </div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{rec.action}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{rec.impact}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
