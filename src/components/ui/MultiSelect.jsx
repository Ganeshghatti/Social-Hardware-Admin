import React, { useState, useRef, useEffect } from "react";

const Multiselect = ({
  options = [],
  defaultValue = [],
  onChange = () => {},
}) => {
  const [selectedOptions, setSelectedOptions] = useState(defaultValue);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const filteredOptions = options?.filter(
    (option) =>
      option?.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedOptions.some((selected) => selected.name === option.name)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Show dropdown when typing
  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsOpen(true);
      setActiveIndex(0); // Reset selection to first item
    } else {
      setActiveIndex(-1);
    }
  }, [searchTerm]);

  const handleKeyDown = (e) => {
    if (!isOpen && e.key !== "Backspace") {
      setIsOpen(true);
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && filteredOptions[activeIndex]) {
          toggleOption(filteredOptions[activeIndex]);
          setSearchTerm("");
        }
        break;
      case "Backspace":
        if (searchTerm === "" && selectedOptions.length > 0) {
          // Remove last selected option when backspace is pressed with empty input
          const newSelection = selectedOptions.slice(0, -1);
          setSelectedOptions(newSelection);
          onChange(newSelection);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        break;
      default:
        break;
    }
  };

  const toggleOption = (option) => {
    const isSelected = selectedOptions.some(
      (selected) => selected.name === option.name
    );
    let newSelection;

    if (isSelected) {
      newSelection = selectedOptions.filter(
        (selected) => selected.name !== option.name
      );
    } else {
      newSelection = [...selectedOptions, option];
    }

    setSelectedOptions(newSelection);
    onChange(newSelection);
    inputRef.current?.focus();
  };

  const removeOption = (option, e) => {
    e.stopPropagation();
    const newSelection = selectedOptions.filter(
      (selected) => selected.name !== option.name
    );
    setSelectedOptions(newSelection);
    onChange(newSelection);
    inputRef.current?.focus();
  };

  return (
    <div className="max-w-sm w-full relative" ref={dropdownRef}>
      <div
        className={`bg-[#1A1A1A] w-full rounded-lg border border-white/30 outline-none transition-all ${
          isOpen ? "ring-1 ring-white" : ""
        } p-1.5`}
      >
        <div className="flex flex-wrap gap-1 min-h-[28px] items-center">
          {selectedOptions.map((option, i) => (
            <div
              key={i}
              className="bg-[#2D2D2D] rounded px-2 py-0.5 flex items-center gap-1 text-white text-sm"
            >
              <span>{option.name}</span>
              <button
                onClick={(e) => removeOption(option, e)}
                className="hover:text-white/50 ml-1 font-medium"
              >
                ×
              </button>
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            className={`bg-transparent outline-none flex-grow text-white min-w-[60px] text-sm   `}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={
              selectedOptions.length === 0 ? "Select options..." : ""
            }
            autoComplete="off"
          />
        </div>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute mt-1 w-full bg-[#2D2D2D] rounded-lg shadow-lg border border-[#2D2D2D]/30 z-50">
          <div className="p-1">
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                className={`rounded px-3 py-2 cursor-pointer text-sm ${
                  index === activeIndex
                    ? "bg-orange-500/20 text-orange-400"
                    : "text-gray-300 hover:bg-orange-500/10 hover:text-orange-400"
                }`}
                onClick={() => {
                  toggleOption(option);
                  setSearchTerm("");
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {option.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {filteredOptions.length === 0 && isOpen && (
        <div className="absolute mt-1 w-full bg-[#2D2D2D] rounded-lg shadow-lg border border-[#2D2D2D]/30 z-50">
          <div className="p-1">
            <div className="rounded px-3 py-2 cursor-pointer text-sm text-gray-300 ">
              No results found
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Multiselect;
