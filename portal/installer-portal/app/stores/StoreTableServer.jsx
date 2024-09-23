"use server";
import StoreTableClient from "./StoreTableClient";

const StoreTableServer = async () => {
  let storeData = [];

  try {
    const res = await fetch("http://localhost:3000/api/stores");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    storeData = await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return <StoreTableClient storeData={storeData} />;
};

export default StoreTableServer;
