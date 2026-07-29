import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { TrendingUp, Users, Clock, DoorOpen, Luggage, ShieldCheck, Activity } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function RealTimeAnalytics({ flights, gates }) {
  // Chart 1: Passenger Throughput by Hour
  const hourlyData = {
    labels: ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
    datasets: [
      {
        label: 'Departing Passengers',
        data: [2100, 3400, 4200, 3800, 4500, 4120, 3900, 2800],
        backgroundColor: 'rgba(0, 242, 254, 0.7)',
        borderRadius: 6
      },
      {
        label: 'Arriving Passengers',
        data: [1800, 2900, 3100, 4100, 3800, 3600, 4200, 3100],
        backgroundColor: 'rgba(139, 92, 246, 0.7)',
        borderRadius: 6
      }
    ]
  };

  // Chart 2: Delay Causes Breakdown
  const delayData = {
    labels: ['ATC Runway Queue', 'Severe Weather', 'Late Inbound Aircraft', 'Baggage Loading', 'Maintenance Check'],
    datasets: [
      {
        data: [35, 25, 20, 12, 8],
        backgroundColor: [
          'rgba(0, 242, 254, 0.8)',
          'rgba(244, 63, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)'
        ],
        borderWidth: 0
      }
    ]
  };

  // Chart 3: Gate Occupancy Rate
  const gateData = {
    labels: ['Terminal A', 'Terminal B', 'Terminal C'],
    datasets: [
      {
        label: 'Occupied Gates',
        data: [
          gates.filter(g => g.terminal === 'Terminal A' && g.status === 'Occupied').length,
          gates.filter(g => g.terminal === 'Terminal B' && g.status === 'Occupied').length,
          gates.filter(g => g.terminal === 'Terminal C' && g.status === 'Occupied').length
        ],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderRadius: 6
      },
      {
        label: 'Available Gates',
        data: [
          gates.filter(g => g.terminal === 'Terminal A' && g.status === 'Available').length,
          gates.filter(g => g.terminal === 'Terminal B' && g.status === 'Available').length,
          gates.filter(g => g.terminal === 'Terminal C' && g.status === 'Available').length
        ],
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 12 } }
      }
    },
    scales: {
      x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Real-Time Airport Analytics & Operations Dashboard</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Comprehensive performance metrics, terminal passenger flows, and gate telemetry</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid-4">
        <div className="kpi-card">
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>On-Time Performance</div>
            <div className="kpi-val" style={{ color: 'var(--accent-emerald)' }}>92.4%</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>↑ +1.8% vs last week</div>
          </div>
          <div className="kpi-icon"><Activity size={24} /></div>
        </div>

        <div className="kpi-card">
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Passenger Volume</div>
            <div className="kpi-val" style={{ color: 'var(--accent-cyan)' }}>4,120 <span style={{ fontSize: '0.9rem' }}>pax/hr</span></div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>Peak Evening Wave</div>
          </div>
          <div className="kpi-icon"><Users size={24} /></div>
        </div>

        <div className="kpi-card">
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Gate Utilization</div>
            <div className="kpi-val" style={{ color: 'var(--accent-amber)' }}>78%</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>14 of 18 gates active</div>
          </div>
          <div className="kpi-icon"><DoorOpen size={24} /></div>
        </div>

        <div className="kpi-card">
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg Baggage Transit</div>
            <div className="kpi-val" style={{ color: 'var(--accent-purple)' }}>14.2 <span style={{ fontSize: '0.9rem' }}>min</span></div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>↓ 2.1 min faster</div>
          </div>
          <div className="kpi-icon"><Luggage size={24} /></div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid-2">
        {/* Passenger Throughput Bar Chart */}
        <div className="glass-card">
          <div className="card-header">
            <h3 className="card-title"><Users size={20} /> Passenger Flow Throughput (Hourly)</h3>
            <span className="badge badge-info">Real-Time Sensor Feed</span>
          </div>
          <Bar data={hourlyData} options={chartOptions} />
        </div>

        {/* Delay Causes Doughnut Chart */}
        <div className="glass-card">
          <div className="card-header">
            <h3 className="card-title"><Clock size={20} /> Delay Factor Breakdown</h3>
            <span className="badge badge-warning">AI Categorized</span>
          </div>
          <div style={{ maxWidth: '360px', margin: '0 auto' }}>
            <Doughnut data={delayData} options={{
              responsive: true,
              plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8' } } }
            }} />
          </div>
        </div>
      </div>

      {/* Terminal Gate Capacity Chart */}
      <div className="glass-card">
        <div className="card-header">
          <h3 className="card-title"><DoorOpen size={20} /> Gate Occupancy by Terminal</h3>
          <span className="badge badge-success">Live Status</span>
        </div>
        <Bar data={gateData} options={chartOptions} />
      </div>
    </div>
  );
}
