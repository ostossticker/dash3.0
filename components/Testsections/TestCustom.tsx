import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
  data: { fav: string; hobby: string; age?: number; movies?: string }[];
}

const options1: Option[] = [
  { value: 'Option 1', label: 'Option 1', data: [{ fav: "bananaan", hobby: "gaming", movies: "The Matrix, Inception" }] },
  { value: 'Option 2', label: 'Option 2', data: [{ fav: "bananaan1", hobby: "gaming11", movies: "Harry Potter, Lord of the Rings" }] },
  { value: 'hewo', label: 'hewo', data: [{ fav: "bananaan2", hobby: "gaming2", movies: "Star Wars, Avatar" }] },
  { value: 'halo', label: 'halo', data: [{ fav: "bananaan3", hobby: "gaming3", age: 33, movies: "The Godfather, Pulp Fiction" }] }
];

const options2: Option[] = [
  { value: 'Option 5', label: 'Option 5', data: [{ fav: "apple", hobby: "cooking", movies: "Ratatouille, Julie & Julia" }] },
  { value: 'Option 6', label: 'Option 6', data: [{ fav: "orange", hobby: "painting", movies: "The Scream, Starry Night" }] },
  { value: 'Option 7', label: 'Option 7', data: [{ fav: "grape", hobby: "dancing", movies: "Dirty Dancing, Step Up" }] },
  { value: 'Option 8', label: 'Option 8', data: [{ fav: "pineapple", hobby: "reading", age: 25, movies: "Harry Potter, Lord of the Rings" }] }
];

const AutoFillInput: React.FC = () => {
  const [inputValue1, setInputValue1] = useState<string>('');
  const [inputValue2, setInputValue2] = useState<string>('');
  const [suggestions1, setSuggestions1] = useState<Option[]>([]);
  const [suggestions2, setSuggestions2] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, options: Option[], setSuggestions: React.Dispatch<React.SetStateAction<Option[]>>, setInputValue: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value;
    setInputValue(value);
  
    // Filter options based on the input value
    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredOptions);
  
    // Autofill corresponding data if a single matching option is found
    if (filteredOptions.length === 1 && filteredOptions[0].label === value) {
      const matchedOption = filteredOptions[0];
      setSelectedOption(matchedOption);
      setInputValue(matchedOption.label);
      setInputValue2(matchedOption.data[0].movies || "");
      setSuggestions([]); // Hide suggestions
    } else {
      setSelectedOption(null);
    }
  };
  
  const handleOptionClick = (option: Option, setInputValue1: React.Dispatch<React.SetStateAction<string>>, setInputValue2: React.Dispatch<React.SetStateAction<string>>, setInputValue: React.Dispatch<React.SetStateAction<string>>) => {
    setSelectedOption(option);
    setInputValue1(option.label);
    setInputValue2(option.data[0].movies || "");
    setInputValue(option.label);
    setSuggestions1([]);
    setSuggestions2([]);
  };

  return (
    <div>
      {/* Input 1 */}
      <input
        type="text"
        value={inputValue1}
        onChange={(e) => handleInputChange(e, options1, setSuggestions1, setInputValue1)}
        placeholder="Search options 1..."
      />
      {inputValue1 && suggestions1.length > 0 && (
        <ul>
          {suggestions1.map(option => (
            <li key={option.value} onClick={() => handleOptionClick(option, setInputValue1, setInputValue2, setInputValue1)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {/* Input 2 */}
      <input
        type="text"
        value={inputValue2}
        onChange={(e) => handleInputChange(e, options2, setSuggestions2, setInputValue2)}
        placeholder="Search options 2..."
      />
      {inputValue2 && suggestions2.length > 0 && (
        <ul>
          {suggestions2.map(option => (
            <li key={option.value} onClick={() => handleOptionClick(option, setInputValue1, setInputValue2, setInputValue2)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {/* Render input fields */}
      <>
        <input type="text" value={selectedOption?.data[0].fav || ''} placeholder="Favorite" readOnly />
        <input type="text" value={selectedOption?.data[0].hobby || ''} placeholder="Hobby" readOnly />
        <input type="text" value={selectedOption?.data[0].age || ''} placeholder="Age" readOnly />
        <input type="text" value={selectedOption?.data[0].movies || ''} placeholder="Movies" readOnly />
      </>
    </div>
  );
};

export default AutoFillInput;
