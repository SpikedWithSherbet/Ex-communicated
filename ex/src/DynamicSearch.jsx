import React, { useMemo } from 'react';

const DynamicSearch = ({
  query,
  setQuery,
  itemGender,
  setItemGender,
  clothingType,
  setClothingType,
  setSelectedItem,
  Users
}) => {
  const filteredUsers = useMemo(() => {
    return Users.filter(user => {
      const matchesQuery = user.first_name?.toLowerCase().includes(query.toLowerCase());
      const matchesGender = user.gender === itemGender;
      const matchesCType = user.clothing_type === clothingType;
      return matchesQuery && matchesGender && matchesCType;
    });
  }, [query, itemGender, clothingType, Users]);

  return (
    <div className='dynamicsearch'>
      <div className='selectioncontainer'>
        <input
          type="text"
          className="search"
          placeholder='Search'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <div className='buttoncontainer' style={{ display: "flex" }}>
          {["Unisex", "Male", "Female"].map(gender => (
            <button
              key={gender}
              className={gender}
              onClick={() => setItemGender(gender)}
            >
              {gender}
            </button>
          ))}
        </div>

        <h2>Clothing Type</h2>
        <div className='clothingtype'>
          {["T-shirts", "Sweatpants", "Shorts", "Jackets", "Accessories"].map(type => (
            <button
              key={type}
              className={type}
              onClick={() => setClothingType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className='gridcontainer'>
        <ul className='itemlist'>
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className='listItem'
              onClick={() => setSelectedItem(user.id)}
            >
              <img
                src={user.image1 || 'https://via.placeholder.com/150'}
                alt={user.first_name}
              />
              <div className='itemtoparea'>
                <h2>{user.first_name}</h2>
                <p>${user.price}</p>
              </div>
              <div className='itembottomarea'>
                {["S", "M", "L", "XL"].map(size => (
                  <button key={size} onClick={() => setSelectedItem(user.id)} >{size}</button>
                ))}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DynamicSearch;