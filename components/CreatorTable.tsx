
import React, { useState, useMemo } from 'react';
import { Creator, Niche, Level, OutreachStatus } from '../types';
import { Badge } from './ui/Badge';
import { Toggle } from './ui/Toggle';
import { ExternalLinkIcon, PlusIcon } from './ui/Icons';
import { OUTREACH_STATUS_COLORS, LEVEL_COLORS, GUEST_LIMIT } from '../constants';

interface CreatorTableProps {
  creators: Creator[];
  onToggleTop20: (creatorId: string) => void;
  onTogglePreselected: (creatorId: string) => void;
  onToggleInvited: (creatorId: string) => void;
  onViewDetails: (creator: Creator) => void;
  onStatusChange: (creatorId: string, status: OutreachStatus) => void;
  onAddCreatorRequest: () => void;
  guestsCount: number;
}

export const CreatorTable: React.FC<CreatorTableProps> = ({
  creators,
  onToggleTop20,
  onTogglePreselected,
  onToggleInvited,
  onViewDetails,
  onStatusChange,
  onAddCreatorRequest,
  guestsCount
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{ niche: Niche[], level: Level[], status: OutreachStatus[] }>({
    niche: [],
    level: [],
    status: [],
  });

  const filteredCreators = useMemo(() => {
    return creators.filter(c => {
      const searchMatch = c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || c.usuario.toLowerCase().includes(searchTerm.toLowerCase());
      const nicheMatch = filters.niche.length === 0 || c.nicho.some(n => filters.niche.includes(n));
      const levelMatch = filters.level.length === 0 || filters.level.includes(c.nivel);
      const statusMatch = filters.status.length === 0 || filters.status.includes(c.estado_outreach);
      return searchMatch && nicheMatch && levelMatch && statusMatch;
    });
  }, [creators, searchTerm, filters]);
  
  const handleFilterChange = <K extends keyof typeof filters,>(filterType: K, value: (typeof filters)[K][number]) => {
      setFilters(prev => {
          const currentValues = prev[filterType] as (typeof value)[];
          const newValues = currentValues.includes(value)
              ? currentValues.filter(v => v !== value)
              : [...currentValues, value];
          return { ...prev, [filterType]: newValues };
      });
  };

  const FilterPill: React.FC<{ options: string[], selected: string[], type: keyof typeof filters }> = ({ options, selected, type }) => (
    <div className="flex flex-wrap gap-2">
      {options.map(option => (
        <button
          key={option}
          onClick={() => handleFilterChange(type, option as any)}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            selected.includes(option)
              ? 'bg-indigo-600 text-white font-semibold'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Buscar por nombre o @usuario..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
                onClick={onAddCreatorRequest}
                className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
            >
                <PlusIcon className="w-5 h-5" />
                Agregar Creador
            </button>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Nicho</h4>
          <FilterPill options={Object.values(Niche)} selected={filters.niche} type="niche" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Nivel</h4>
          <FilterPill options={Object.values(Level)} selected={filters.level} type="level" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Estado Outreach</h4>
          <FilterPill options={Object.values(OutreachStatus)} selected={filters.status} type="status" />
        </div>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creador</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nichos</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Top 20</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pre-Sel</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Invitado</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCreators.length > 0 ? filteredCreators.map(creator => {
              const isGuestLimitReached = guestsCount >= GUEST_LIMIT && !creator.invitado_final;
              return (
                <tr key={creator.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={`https://picsum.photos/seed/${creator.id}/100`} alt={creator.nombre} />
                      </div>
                      <div className="ml-4">
                        <button onClick={() => onViewDetails(creator)} className="text-sm font-medium text-gray-900 hover:text-indigo-600 text-left">{creator.nombre}</button>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          {creator.usuario}
                          <a href={creator.url_perfil} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-700">
                            <ExternalLinkIcon/>
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                        value={creator.estado_outreach}
                        onChange={(e) => onStatusChange(creator.id, e.target.value as OutreachStatus)}
                        className={`w-full p-1.5 text-xs font-medium rounded-md border-transparent appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${OUTREACH_STATUS_COLORS[creator.estado_outreach]}`}
                        style={{ paddingRight: '2rem' }}
                    >
                        {Object.values(OutreachStatus).map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    <div className="text-sm text-gray-500 mt-1">
                      <Badge colorClass={LEVEL_COLORS[creator.nivel]}>{creator.nivel}</Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                       {creator.nicho.map(n => <Badge key={n} colorClass="bg-blue-100 text-blue-800">{n}</Badge>)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Toggle enabled={creator.prioridad_top20} onChange={() => onToggleTop20(creator.id)} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Toggle enabled={creator.preseleccionado} onChange={() => onTogglePreselected(creator.id)} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Toggle enabled={creator.invitado_final} onChange={() => onToggleInvited(creator.id)} disabled={isGuestLimitReached} />
                  </td>
                </tr>
              );
            }) : (
                <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500">
                        No se encontraron creadores con los filtros actuales.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
