import React from 'react';

export interface ToolbarOption {
  label: string;
  onClick: () => void;
  icon?: string;
}

interface ToolbarProps {
  options: ToolbarOption[];
}

const Toolbar: React.FC<ToolbarProps> = ({ options }) => {
  return (
    <div className="bg-gray-100 p-2 flex space-x-4 border-b">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={option.onClick}
          className="text-gray-800 text-sm font-medium hover:text-blue-600 focus:outline-none"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;


