
import { OutreachStatus, Niche, Level, Platform } from './types';

export const OUTREACH_STATUS_OPTIONS = Object.values(OutreachStatus);
export const NICHE_OPTIONS = Object.values(Niche);
export const LEVEL_OPTIONS = Object.values(Level);
export const PLATFORM_OPTIONS = Object.values(Platform);

export const GUEST_LIMIT = 7;

export const OUTREACH_STATUS_COLORS: { [key in OutreachStatus]: string } = {
  [OutreachStatus.NoContactado]: "bg-gray-200 text-gray-800",
  [OutreachStatus.MensajeEnviado]: "bg-blue-200 text-blue-800",
  [OutreachStatus.Seguimiento]: "bg-yellow-200 text-yellow-800",
  [OutreachStatus.Respondio]: "bg-purple-200 text-purple-800",
  [OutreachStatus.Acepto]: "bg-green-200 text-green-800",
  [OutreachStatus.Declino]: "bg-red-200 text-red-800",
};

export const LEVEL_COLORS: { [key in Level]: string } = {
  [Level.Nano]: "bg-teal-100 text-teal-800",
  [Level.Micro]: "bg-cyan-100 text-cyan-800",
  [Level.Macro]: "bg-indigo-100 text-indigo-800",
};
