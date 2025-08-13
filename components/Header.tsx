
import React from 'react';
import { View, Creator } from '../types';
import { GUEST_LIMIT } from '../constants';
import { UsersIcon, StarIcon, ClipboardListIcon, CakeIcon, ViewGridIcon } from './ui/Icons';

interface HeaderProps {
  activeView: View;
  onViewChange: (view: View) => void;
  creators: Creator[];
}

const NavButton: React.FC<{
  label: View;
  activeView: View;
  onClick: () => void;
  icon: React.ReactNode;
  count?: string | number;
}> = ({ label, activeView, onClick, icon, count }) => {
  const isActive = activeView === label;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? 'bg-indigo-100 text-indigo-700'
          : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
      }`}
    >
      {icon}
      {label}
      {count !== undefined && <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${isActive ? 'bg-indigo-200 text-indigo-800' : 'bg-gray-300 text-gray-700'}`}>{count}</span>}
    </button>
  );
};


export const Header: React.FC<HeaderProps> = ({ activeView, onViewChange, creators }) => {
  const top20Count = creators.filter(c => c.prioridad_top20).length;
  const preselectedCount = creators.filter(c => c.preseleccionado).length;
  const guestsCount = creators.filter(c => c.invitado_final).length;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-xl font-bold text-gray-900">
            Hub de Creadores <span className="text-indigo-600">100% Agave</span>
          </h1>
        </div>
        <nav className="flex space-x-2 border-b-2 border-gray-100 pb-2 overflow-x-auto">
          <NavButton label={View.Todos} activeView={activeView} onClick={() => onViewChange(View.Todos)} icon={<UsersIcon className="w-5 h-5" />} count={creators.length}/>
          <NavButton label={View.Top20} activeView={activeView} onClick={() => onViewChange(View.Top20)} icon={<StarIcon className="w-5 h-5" />} count={top20Count}/>
          <NavButton label={View.Preseleccion} activeView={activeView} onClick={() => onViewChange(View.Preseleccion)} icon={<ClipboardListIcon className="w-5 h-5" />} count={preselectedCount}/>
          <NavButton label={View.Cena} activeView={activeView} onClick={() => onViewChange(View.Cena)} icon={<CakeIcon className="w-5 h-5" />} count={`${guestsCount}/${GUEST_LIMIT}`}/>
          <NavButton label={View.Kanban} activeView={activeView} onClick={() => onViewChange(View.Kanban)} icon={<ViewGridIcon className="w-5 h-5" />} />
        </nav>
      </div>
    </header>
  );
};
