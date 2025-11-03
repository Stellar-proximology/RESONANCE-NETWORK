import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  icon = 'fa-list',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/80 backdrop-blur-sm border-2 border-candy-pink/30 rounded-2xl px-4 py-3 text-left shadow-soft focus:outline-none focus:ring-2 focus:ring-candy-pink/50 focus:border-candy-pink transition-all duration-300 min-h-[44px] flex items-center justify-between"
      >
        <div className="flex items-center">
          <i className={`fa ${icon} text-candy-pink mr-3`}></i>
          <span className={selectedOption ? 'text-gray-800' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <i className={`fa fa-chevron-down text-candy-pink transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-sm border-2 border-candy-pink/30 rounded-2xl shadow-candy max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-candy-pink/20 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl min-h-[44px] flex items-center"
            >
              <span className="text-gray-800">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;