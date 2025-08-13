import React, { useState } from 'react';
import { NewCreatorData, Platform, Niche } from '../types';
import { NICHE_OPTIONS, PLATFORM_OPTIONS } from '../constants';
import { XIcon } from './ui/Icons';

interface AddCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCreator: (data: NewCreatorData) => void;
}

const initialFormState: NewCreatorData = {
  nombre: '',
  usuario: '',
  seguidores: 0,
  url_perfil: '',
  correo: '',
  plataformas: [],
  nicho: [],
};

export const AddCreatorModal: React.FC<AddCreatorModalProps> = ({ isOpen, onClose, onAddCreator }) => {
  const [formData, setFormData] = useState<NewCreatorData>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof NewCreatorData, string>>>({});

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'seguidores' ? parseInt(value) || 0 : value }));
  };

  const handleMultiSelectChange = (field: 'plataformas' | 'nicho', value: Platform | Niche) => {
    setFormData(prev => {
      if (field === 'plataformas') {
        const platformValue = value as Platform;
        const currentPlatforms = prev.plataformas;
        const newPlatforms = currentPlatforms.includes(platformValue)
          ? currentPlatforms.filter(p => p !== platformValue)
          : [...currentPlatforms, platformValue];
        return { ...prev, plataformas: newPlatforms };
      } else { // field === 'nicho'
        const nicheValue = value as Niche;
        const currentNiches = prev.nicho;
        const newNiches = currentNiches.includes(nicheValue)
          ? currentNiches.filter(n => n !== nicheValue)
          : [...currentNiches, nicheValue];
        return { ...prev, nicho: newNiches };
      }
    });
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof NewCreatorData, string>> = {};
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.usuario) newErrors.usuario = "El usuario es obligatorio.";
    if (!formData.url_perfil) newErrors.url_perfil = "La URL del perfil es obligatoria.";
    else if (!formData.url_perfil.startsWith('http')) newErrors.url_perfil = "La URL debe ser válida (ej. https://...).";
    if (formData.seguidores <= 0) newErrors.seguidores = "Debe tener al menos 1 seguidor.";
    if (formData.plataformas.length === 0) newErrors.plataformas = "Selecciona al menos una plataforma.";
    if (formData.nicho.length === 0) newErrors.nicho = "Selecciona al menos un nicho.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onAddCreator(formData);
      setFormData(initialFormState);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold">Agregar Nuevo Creador</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
          </div>
          <div>
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">Usuario (con @)</label>
            <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
            {errors.usuario && <p className="text-red-500 text-xs mt-1">{errors.usuario}</p>}
          </div>
          <div>
            <label htmlFor="seguidores" className="block text-sm font-medium text-gray-700">Seguidores</label>
            <input type="number" name="seguidores" value={formData.seguidores} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
            {errors.seguidores && <p className="text-red-500 text-xs mt-1">{errors.seguidores}</p>}
          </div>
          <div>
            <label htmlFor="url_perfil" className="block text-sm font-medium text-gray-700">URL Perfil Principal</label>
            <input type="url" name="url_perfil" placeholder="https://instagram.com/usuario" value={formData.url_perfil} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
            {errors.url_perfil && <p className="text-red-500 text-xs mt-1">{errors.url_perfil}</p>}
          </div>
          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo (Opcional)</label>
            <input type="email" name="correo" value={formData.correo || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Plataformas</h4>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PLATFORM_OPTIONS.map(p => (
                <label key={p} className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" checked={formData.plataformas.includes(p)} onChange={() => handleMultiSelectChange('plataformas', p)} className="rounded text-indigo-600 focus:ring-indigo-500"/>
                  <span>{p}</span>
                </label>
              ))}
            </div>
            {errors.plataformas && <p className="text-red-500 text-xs mt-1">{errors.plataformas}</p>}
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Nichos</h4>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {NICHE_OPTIONS.map(n => (
                <label key={n} className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" checked={formData.nicho.includes(n)} onChange={() => handleMultiSelectChange('nicho', n)} className="rounded text-indigo-600 focus:ring-indigo-500"/>
                  <span>{n}</span>
                </label>
              ))}
            </div>
            {errors.nicho && <p className="text-red-500 text-xs mt-1">{errors.nicho}</p>}
          </div>
          <div className="flex justify-end gap-4 pt-4 border-t mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Guardar Creador</button>
          </div>
        </form>
      </div>
    </div>
  );
};