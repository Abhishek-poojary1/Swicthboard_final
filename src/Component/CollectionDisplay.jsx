import React, { useState } from "react";

const CollectionDisplay = () => {
  const [collectionData, setCollectionData] = useState([]);

  const retrieveSavedData = () => {
    const savedData = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const data = localStorage.getItem(key);
      savedData.push({ key, data });
    }
    return savedData;
  };

  const handleDisplayCollection = () => {
    const savedData = retrieveSavedData();
    setCollectionData(savedData);
  };

  return (
    <div style={{ zIndex: "20", position: "relative" }}>
      <button onClick={handleDisplayCollection}>Display Collection</button>

      <div>
        {collectionData.map((item) => (
          <div key={item.key}>
            <img src={item.data} alt="Collection Item" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionDisplay;
