
import React, { useState, useCallback, useMemo } from 'react';
import { Creator, View, OutreachStatus, Level, NewCreatorData } from './types';
import { seedData } from './data/seed';
import { Header } from './components/Header';
import { CreatorTable } from './components/CreatorTable';
import { Top20List } from './components/Top20List';
import { KanbanBoard } from './components/KanbanBoard';
import { CreatorDetailModal } from './components/CreatorDetailModal';
import { GUEST_LIMIT } from './constants';
import { CheckCircleIcon, CakeIcon } from './components/ui/Icons';
import { AddCreatorModal } from './components/AddCreatorModal';


const SimpleListView: React.FC<{title: string; creators: Creator[]; emptyMessage: string; onViewDetails: (creator: Creator) => void;}> = ({title, creators, emptyMessage, onViewDetails}) => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            {creators.length > 0 ? (
                <ul className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
                    {creators.map(c => (
                        <li key={c.id} className="p-4 flex justify-between items-center">
                            <div>
                                <button onClick={() => onViewDetails(c)} className="font-semibold hover:text-indigo-600">{c.nombre}</button>
                                <p className="text-sm text-gray-500">{c.usuario}</p>
                            </div>
                            <span className="text-sm text-gray-600">{c.seguidores.toLocaleString('es-MX')} seguidores</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500">{emptyMessage}</p>
                </div>
            )}
        </div>
    );
};

const GuestsView: React.FC<{creators: Creator[]; onViewDetails: (creator: Creator) => void;}> = ({creators, onViewDetails}) => {
    const guests = creators.filter(c => c.invitado_final);
    const progress = (guests.length / GUEST_LIMIT) * 100;

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                    <CakeIcon className="w-8 h-8 text-indigo-500"/>
                    Cena - Invitados Finales
                </h2>
                <p className="text-gray-600 mt-2">Has seleccionado a {guests.length} de {GUEST_LIMIT} invitados. ¡Ya casi está listo!</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-4 overflow-hidden">
                    <div className="bg-green-500 h-4 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
                 <p className="text-right font-semibold mt-1 text-green-700">{guests.length} / {GUEST_LIMIT}</p>
            </div>
            
            {guests.length > 0 ? (
                 <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {guests.map(c => (
                        <li key={c.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4">
                            <img className="h-12 w-12 rounded-full object-cover" src={`https://picsum.photos/seed/${c.id}/100`} alt={c.nombre} />
                            <div>
                               <button onClick={() => onViewDetails(c)} className="font-semibold hover:text-indigo-600">{c.nombre}</button>
                               <p className="text-sm text-gray-500">{c.usuario}</p>
                            </div>
                            <CheckCircleIcon className="w-6 h-6 text-green-500 ml-auto" />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500">Aún no hay invitados finales.</p>
                    <p className="text-sm text-gray-400">Marca a los creadores como 'Invitado' en la tabla 'Todos'.</p>
                </div>
            )}
        </div>
    );
}


function App() {
  const [creators, setCreators] = useState<Creator[]>(seedData.map(c => ({...c, fecha_ultimo_contacto: c.fecha_ultimo_contacto ? new Date(c.fecha_ultimo_contacto) : undefined })));
  const [activeView, setActiveView] = useState<View>(View.Todos);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const guestsCount = useMemo(() => creators.filter(c => c.invitado_final).length, [creators]);

  const updateCreator = useCallback((id: string, updates: Partial<Creator>) => {
    setCreators(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const handleAddCreator = useCallback((data: NewCreatorData) => {
    const getLevel = (followers: number): Level => {
        if (followers < 10000) return Level.Nano;
        if (followers <= 100000) return Level.Micro;
        return Level.Macro;
    };

    const newCreator: Creator = {
        id: new Date().getTime().toString(),
        ...data,
        nivel: getLevel(data.seguidores),
        prioridad_top20: false,
        preseleccionado: false,
        invitado_final: false,
        estado_outreach: OutreachStatus.NoContactado,
        ciudad: 'Denver, CO',
        notas: '',
        etiquetas: [],
    };
    setCreators(prev => [newCreator, ...prev]);
    setIsAddModalOpen(false);
  }, []);

  const handleToggleTop20 = useCallback((creatorId: string) => {
    const creator = creators.find(c => c.id === creatorId);
    if (!creator) return;

    const isAdding = !creator.prioridad_top20;
    const top20 = creators.filter(c => c.prioridad_top20 && c.id !== creatorId);
    const maxRank = top20.length > 0 ? Math.max(...top20.map(c => c.ranking || 0)) : 0;
    
    updateCreator(creatorId, { 
        prioridad_top20: isAdding,
        ranking: isAdding ? maxRank + 1 : undefined
    });
  }, [creators, updateCreator]);

  const handleTogglePreselected = useCallback((creatorId: string) => {
    const creator = creators.find(c => c.id === creatorId);
    if(creator) updateCreator(creatorId, { preseleccionado: !creator.preseleccionado });
  }, [creators, updateCreator]);

  const handleToggleInvited = useCallback((creatorId: string) => {
    const creator = creators.find(c => c.id === creatorId);
    if (!creator) return;

    if (!creator.invitado_final && guestsCount >= GUEST_LIMIT) {
        alert(`No se puede exceder el límite de ${GUEST_LIMIT} invitados.`);
        return;
    }
    
    updateCreator(creatorId, { invitado_final: !creator.invitado_final });
  }, [creators, guestsCount, updateCreator]);

  const handleStatusUpdate = useCallback((creatorId: string, status: OutreachStatus) => {
    updateCreator(creatorId, { estado_outreach: status, fecha_ultimo_contacto: new Date() });
    setSelectedCreator(prev => prev && prev.id === creatorId ? {...prev, estado_outreach: status, fecha_ultimo_contacto: new Date()} : prev);
  }, [updateCreator]);

  const handleRankChange = useCallback((creatorId: string, direction: 'up' | 'down') => {
      setCreators(currentCreators => {
          const top20 = [...currentCreators]
              .filter(c => c.prioridad_top20)
              .sort((a, b) => (a.ranking ?? 99) - (b.ranking ?? 99));

          const creatorIndex = top20.findIndex(c => c.id === creatorId);
          if (creatorIndex === -1) return currentCreators;
          
          if (direction === 'up' && creatorIndex > 0) {
              [top20[creatorIndex-1], top20[creatorIndex]] = [top20[creatorIndex], top20[creatorIndex-1]];
          } else if (direction === 'down' && creatorIndex < top20.length - 1) {
              [top20[creatorIndex], top20[creatorIndex+1]] = [top20[creatorIndex+1], top20[creatorIndex]];
          }
          
          const rankedMap = new Map(top20.map((c, index) => [c.id, { ranking: index + 1 }]));

          return currentCreators.map(c => rankedMap.has(c.id) ? { ...c, ...rankedMap.get(c.id) } : c);
      });
  }, []);

  const renderView = () => {
    switch (activeView) {
      case View.Todos:
        return <CreatorTable 
                    creators={creators} 
                    onToggleTop20={handleToggleTop20} 
                    onTogglePreselected={handleTogglePreselected} 
                    onToggleInvited={handleToggleInvited}
                    onViewDetails={setSelectedCreator}
                    guestsCount={guestsCount}
                    onStatusChange={handleStatusUpdate}
                    onAddCreatorRequest={() => setIsAddModalOpen(true)}
                />;
      case View.Top20:
        return <Top20List creators={creators.filter(c => c.prioridad_top20)} onRankChange={handleRankChange} onViewDetails={setSelectedCreator}/>;
      case View.Preseleccion:
        return <SimpleListView 
                  title="Creadores Pre-seleccionados"
                  creators={creators.filter(c => c.preseleccionado)}
                  emptyMessage="Aún no hay pre-seleccionados. Usa el toggle en la tabla para marcarlos."
                  onViewDetails={setSelectedCreator}
                />;
      case View.Cena:
        return <GuestsView creators={creators} onViewDetails={setSelectedCreator} />;
      case View.Kanban:
        return <KanbanBoard creators={creators} onStatusChange={handleStatusUpdate} onViewDetails={setSelectedCreator}/>;
      default:
        return <div>Vista no encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeView={activeView} 
        onViewChange={setActiveView} 
        creators={creators} 
      />
      <main>
        {renderView()}
      </main>
      {selectedCreator && (
        <CreatorDetailModal 
            creator={selectedCreator} 
            onClose={() => setSelectedCreator(null)}
            onUpdateStatus={(id, status) => {
                handleStatusUpdate(id, status);
                setSelectedCreator(prev => prev && {...prev, estado_outreach: status, fecha_ultimo_contacto: new Date()});
            }}
        />
      )}
      <AddCreatorModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCreator={handleAddCreator}
      />
    </div>
  );
}

export default App;
