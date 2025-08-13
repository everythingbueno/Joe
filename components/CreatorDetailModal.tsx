
import React from 'react';
import { Creator, OutreachStatus } from '../types';
import { Badge } from './ui/Badge';
import { LEVEL_COLORS, OUTREACH_STATUS_COLORS, OUTREACH_STATUS_OPTIONS } from '../constants';
import { ExternalLinkIcon, XIcon } from './ui/Icons';

interface CreatorDetailModalProps {
  creator: Creator | null;
  onClose: () => void;
  onUpdateStatus: (creatorId: string, status: OutreachStatus) => void;
}

const DetailItem: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900">{children}</dd>
  </div>
);

export const CreatorDetailModal: React.FC<CreatorDetailModalProps> = ({ creator, onClose, onUpdateStatus }) => {
  if (!creator) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-start pt-10 px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold">{creator.nombre} <span className="text-gray-500 font-normal">({creator.usuario})</span></h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                <DetailItem label="Estado Outreach">
                    <Badge colorClass={OUTREACH_STATUS_COLORS[creator.estado_outreach]}>{creator.estado_outreach}</Badge>
                </DetailItem>
                <DetailItem label="Nivel">
                    <Badge colorClass={LEVEL_COLORS[creator.nivel]}>{creator.nivel}</Badge>
                </DetailItem>
                <DetailItem label="Seguidores">
                    {creator.seguidores.toLocaleString('es-MX')}
                </DetailItem>
                <DetailItem label="Engagement">
                    {creator.engagement ? `${creator.engagement}%` : 'N/A'}
                </DetailItem>
                 <DetailItem label="Correo">
                    {creator.correo || 'No disponible'}
                </DetailItem>
                <DetailItem label="Teléfono">
                    {creator.telefono || 'No disponible'}
                </DetailItem>
                <DetailItem label="Plataformas">
                  <div className="flex flex-wrap gap-1">
                    {creator.plataformas.map(p => <Badge key={p} colorClass="bg-gray-200 text-gray-700">{p}</Badge>)}
                  </div>
                </DetailItem>
                <DetailItem label="Nichos">
                    <div className="flex flex-wrap gap-1">
                        {creator.nicho.map(n => <Badge key={n} colorClass="bg-blue-100 text-blue-800">{n}</Badge>)}
                    </div>
                </DetailItem>
                <DetailItem label="Etiquetas">
                    <div className="flex flex-wrap gap-1">
                        {creator.etiquetas.map(t => <Badge key={t} colorClass="bg-green-100 text-green-800">{t}</Badge>)}
                    </div>
                </DetailItem>
                <DetailItem label="Último Contacto">
                    {creator.fecha_ultimo_contacto ? new Date(creator.fecha_ultimo_contacto).toLocaleDateString('es-MX') : 'N/A'}
                </DetailItem>
                 <DetailItem label="Perfil">
                    <a href={creator.url_perfil} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                        Ver perfil <ExternalLinkIcon />
                    </a>
                </DetailItem>
                <DetailItem label="Media Kit">
                    {creator.media_kit_url ? (
                        <a href={creator.media_kit_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                            Ver Media Kit <ExternalLinkIcon />
                        </a>
                    ) : 'No disponible'}
                </DetailItem>
                 <div className="sm:col-span-2">
                    <DetailItem label="Notas">
                        <p className="whitespace-pre-wrap bg-gray-50 p-3 rounded-md">{creator.notas || 'Sin notas.'}</p>
                    </DetailItem>
                </div>
              </dl>
            </div>
            <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg space-y-3">
              <h3 className="font-bold text-gray-700">Acciones rápidas</h3>
              <p className="text-sm text-gray-500">Cambiar estado de outreach:</p>
              <div className="flex flex-col space-y-2">
                {OUTREACH_STATUS_OPTIONS.map(status => (
                  <button 
                    key={status}
                    onClick={() => onUpdateStatus(creator.id, status)}
                    className={`text-left px-3 py-2 text-sm rounded-md transition-all ${
                      creator.estado_outreach === status 
                        ? `${OUTREACH_STATUS_COLORS[status]} font-bold ring-2 ring-offset-1 ring-indigo-500` 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
