
import React from 'react';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({ enabled, onChange, disabled = false }) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!enabled);
    }
  };

  return (
    <button
      type="button"
      className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        enabled ? 'bg-indigo-600' : 'bg-gray-200'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      role="switch"
      aria-checked={enabled}
      onClick={handleToggle}
      disabled={disabled}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
};
