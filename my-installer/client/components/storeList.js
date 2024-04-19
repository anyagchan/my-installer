const stores = [
    {
      id: 1,
      name: "Carmelita's Store",
      address: "123 ABC Street",
      updated: "3/13/2024"
    },
    {
      id: 2,
      name: "Juan's Store",
      address: "4924 Upper Street",
      updated: "3/14/2024"
    },
    {
      id: 3,
      name: "John's Store",
      address: "246 Down Street",
      updated: "3/15/2024"
    },
    {
      id: 4,
      name: "Johnny's Store",
      address: "246 Down Street",
      updated: "3/15/2024"
    }
  ]

const addStore = (newItem) => {
    const newItemWithId = { ...newItem, id: stores.length + 1 };
    stores.push(newItemWithId);
};
  

  export {stores, addStore};