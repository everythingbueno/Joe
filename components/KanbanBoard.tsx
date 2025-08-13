
import React from 'react';
import { Creator, OutreachStatus } from '../types';
import { OUTREACH_STATUS_COLORS, OUTREACH_STATUS_OPTIONS } from '../constants';
import { Badge } from './ui/Badge';

interface KanbanCardProps {
  creator: Creator;
  onStatusChange: (creatorId: string, status: OutreachStatus) => void;
  onViewDetails: (creator: Creator) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ creator, onStatusChange, onViewDetails }) => {
  const isFollowUpNeeded = creator.estado_outreach === OutreachStatus.Seguimiento && creator.fecha_ultimo_contacto && (new Date().getTime() - new Date(creator.fecha_ultimo_contacto).getTime()) > 3 * 24 * 60 * 60 * 1000;

  return (
    <div className={`bg-white p-3 rounded-md shadow-sm border-l-4 ${isFollowUpNeeded ? 'border-red-500' : 'border-transparent'}`}>
      <div className="flex justify-between items-start">
        <button onClick={() => onViewDetails(creator)} className="font-semibold text-gray-800 hover:text-indigo-600 text-left">{creator.nombre}</button>
        {isFollowUpNeeded && <span title="Requiere seguimiento" className="text-red-500 font-bold">!</span>}
      </div>
      <p className="text-sm text-gray-500">{creator.usuario}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {creator.nicho.slice(0, 2).map(n => <Badge key={n} colorClass="bg-blue-100 text-blue-800">{n}</Badge>)}
      </div>
      <select 
        value={creator.estado_outreach} 
        onChange={(e) => onStatusChange(creator.id, e.target.value as OutreachStatus)}
        className="mt-3 w-full p-1.5 text-xs border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      >
        {OUTREACH_STATUS_OPTIONS.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    </div>
  );
};

interface KanbanBoardProps {
  creators: Creator[];
  onStatusChange: (creatorId: string, status: OutreachStatus) => void;
  onViewDetails: (creator: Creator) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ creators, onStatusChange, onViewDetails }) => {
  const columns = OUTREACH_STATUS_OPTIONS.map(status => ({
    title: status,
    creators: creators.filter(c => c.estado_outreach === status),
  }));

  return (
    <div className="flex gap-4 p-4 sm:p-6 lg:p-8 overflow-x-auto h-[calc(100vh-125px)]">
      {columns.map(column => (
        <div key={column.title} className="w-72 flex-shrink-0 bg-gray-100 rounded-lg">
          <div className="sticky top-0 bg-gray-100 p-3 z-10">
            <h3 className="font-semibold flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${OUTREACH_STATUS_COLORS[column.title as OutreachStatus]}`}></span>
              {column.title}
              <span className="text-sm font-normal text-gray-500">{column.creators.length}</span>
            </h3>
          </div>
          <div className="p-3 space-y-3 overflow-y-auto" style={{maxHeight: 'calc(100% - 60px)'}}>
            {column.creators.length > 0 ? (
                column.creators.map(creator => (
                    <KanbanCard key={creator.id} creator={creator} onStatusChange={onStatusChange} onViewDetails={onViewDetails} />
                ))
            ) : (
                <div className="text-center p-4 text-sm text-gray-400">
                    Vacío
                </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
