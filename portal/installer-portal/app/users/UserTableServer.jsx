"use server";
import UserTableClient from "./UserTableClient";

const UserTableServer = async () => {
  let userData = [];

  try {
    const res = await fetch("http://localhost:3000/api/users");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    userData = await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return <UserTableClient userData={userData} />;
};

export default UserTableServer;
