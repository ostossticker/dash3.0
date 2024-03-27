"use client"

import CustomSelect from '@/components/Testsections/CustomSelect';
import AutoFillInput from '@/components/Testsections/TestCustom';
import { areSimilarWithTolerance } from '@/lib/functions';
import React, { useEffect, useState } from 'react';

const Testplace: React.FC = () => {
  const [data, setData] = useState<{ id: number; name: string; }[]>([]);
  const [filteredData, setFilteredData] = useState<{ id: number; name: string; }[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const exampleData = [
        { id: 1, name: "ostos" },
        { id: 2, name: "apple" },
        { id: 3, name: "banana" },
        { id: 4, name: "orange" },
        { id: 5, name: "ostes" },
        { id: 6, name: "ostus" }
      ];
      setData(exampleData);
      setFilteredData(exampleData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredData(data);
      return;
    }

    // Check if the search term matches any item exactly
    const exactMatch = data.find(item => item.name === searchTerm.trim());
    if (exactMatch) {
      setFilteredData([exactMatch]);
      return;
    }

    // Perform fuzzy search if no exact match found
    const filtered = data.filter(item =>
      areSimilarWithTolerance(item.name, searchTerm.trim())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomSelect/>
      <AutoFillInput/>
    </div>
  );
}

export default Testplace;

