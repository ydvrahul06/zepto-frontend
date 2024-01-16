import React, { useState } from "react";
import "./App.css";

function App() {
  const initialItems = [
    {
      name: "rahul",
      id: 1,
      email: "rahul@example.com",
      avatar: "/avatars/rahul.png",
    },
    {
      name: "Annu",
      id: 2,
      email: "Annu@example.com",
      avatar: "/avatars/Annu.png",
    },
    {
      name: "Anushka",
      id: 3,
      email: "Anushka@example.com",
      avatar: "/avatars/Anushka.png",
    },
    {
      name: "Karan",
      id: 4,
      email: "karan@example.com",
      avatar: "/avatars/Karan.png",
    },
    {
      name: "Manoj",
      id: 11,
      email: "manoj@example.com",
      avatar: "/avatars/Manoj.png",
    },
    {
      name: "Riya",
      id: 12,
      email: "Riya@example.com",
      avatar: "/avatars/Riya.png",
    },
    {
      name: "Ruchi",
      id: 13,
      email: "Ruchi@example.com",
      avatar: "/avatars/Ruchi.png",
    },
    {
      name: "Raj",
      id: 15,
      email: "Raj@example.com",
      avatar: "/avatars/Raj.png",
    },
    {
      name: "Tanisha",
      id: 14,
      email: "Tanisha@example.com",
      avatar: "/avatars/Tanisha.png",
    },
  ];

  const [searchTerm, setSearchTerm] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(initialItems);

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  
    if (newSearchTerm.trim() === '') {
      setFilteredItems(initialItems);
    } else {
      const newFilteredItems = initialItems.filter((item) => {
        if (typeof item === 'string') {
          return item.toLowerCase().includes(newSearchTerm.toLowerCase());
        } else if (typeof item === 'object' && item.name) {
          return item.name.toLowerCase().includes(newSearchTerm.toLowerCase());
        }
        return false;
      });
      setFilteredItems(newFilteredItems);
    }
  };
  
  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    const newFilteredItems = filteredItems.filter(
      (filteredItem) => filteredItem !== item
    );
    setFilteredItems(newFilteredItems);
    setSearchTerm("");
  };

  const handleChipRemove = (item) => {
    const newSelectedItems = selectedItems.filter(
      (selectedItem) => selectedItem !== item
    );
    setSelectedItems(newSelectedItems);
    setFilteredItems([...filteredItems, item]);
    setSearchTerm("");
  };
  

  return (
    <div className="App">
      <h2 className="pick-users-heading">Pick Users</h2>
      <div className="input-container">
        {selectedItems.map((item) => (
          <div key={item.id} className="chip">
            <img src={`${process.env.PUBLIC_URL}${item.avatar}`} alt={`${item.name} avatar`} className="avatar" />
            {item.name} <span onClick={() => handleChipRemove(item)}>X</span>
          </div>
        ))}
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        {searchTerm && (
          <ul className="dropdown">
            {filteredItems.map((item) => (
              <li key={item.id} onClick={() => handleItemClick(item)}>
                <img src={`${process.env.PUBLIC_URL}${item.avatar}`} alt={`${item.name} avatar`} className="avatar" />
                {item.name} ({item.id}) - {item.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;