import { Home, Users, Zap } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onChangeView: (view: string) => void;
}

export function Sidebar({ currentView, onChangeView }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'agents', label: 'Agents', icon: Users },
    { id: 'skills', label: 'Skills', icon: Zap },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <div className="window-controls">
          <div className="control red"></div>
          <div className="control yellow"></div>
          <div className="control green"></div>
        </div>
        <h2>Mission Control</h2>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.id}
              className={`menu-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => onChangeView(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
