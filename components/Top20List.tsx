
import React from 'react';
import { Creator } from '../types';
import { ChevronUpIcon, ChevronDownIcon } from './ui/Icons';
import { Badge } from './ui/Badge';
import { LEVEL_COLORS } from '../constants';

interface Top20ListProps {
  creators: Creator[];
  onRankChange: (creatorId: string, direction: 'up' | 'down') => void;
  onViewDetails: (creator: Creator) => void;
}

export const Top20List: React.FC<Top20ListProps> = ({ creators, onRankChange, onViewDetails }) => {
  const sortedCreators = [...creators].sort((a, b) => (a.ranking ?? 99) - (b.ranking ?? 99));

  if (creators.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Aún no hay creadores en el Top 20.</p>
        <p className="text-sm text-gray-400">Usa el toggle en la vista "Todos" para agregarlos.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <ul className="space-y-3">
        {sortedCreators.map((creator, index) => (
          <li key={creator.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-indigo-600 w-8 text-center">{creator.ranking}</span>
              <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                  <img src={`https://picsum.photos/seed/${creator.id}/200`} alt={creator.nombre} className="w-full h-full object-cover" />
              </div>
              <div>
                <button onClick={() => onViewDetails(creator)} className="text-lg font-semibold text-gray-800 hover:text-indigo-600">{creator.nombre}</button>
                <p className="text-sm text-gray-500">{creator.usuario}</p>
                 <div className="mt-1">
                    <Badge colorClass={LEVEL_COLORS[creator.nivel]}>{creator.nivel}</Badge>
                 </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600 hidden md:inline">{creator.seguidores.toLocaleString('es-MX')} seguidores</span>
                <div className="flex flex-col">
                    <button 
                        onClick={() => onRankChange(creator.id, 'up')} 
                        disabled={index === 0}
                        className="p-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronUpIcon />
                    </button>
                    <button 
                        onClick={() => onRankChange(creator.id, 'down')}
                        disabled={index === sortedCreators.length - 1}
                        className="p-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronDownIcon />
                    </button>
                </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
