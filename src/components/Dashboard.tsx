import { Users, Zap } from 'lucide-react';

interface DashboardProps {
  agentsCount: number;
  skillsCount: number;
}

export function Dashboard({ agentsCount, skillsCount }: DashboardProps) {
  return (
    <div className="dashboard-view">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card agents">
          <div className="stat-icon-wrapper">
            <Users size={32} />
          </div>
          <div className="stat-info">
            <h3>Agents</h3>
            <p className="stat-value">{agentsCount}</p>
          </div>
        </div>
        <div className="stat-card skills">
          <div className="stat-icon-wrapper">
            <Zap size={32} />
          </div>
          <div className="stat-info">
            <h3>Skills</h3>
            <p className="stat-value">{skillsCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
