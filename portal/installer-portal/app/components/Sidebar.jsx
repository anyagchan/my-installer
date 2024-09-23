import React from "react";
import Link from "next/link";

import { FaHome, FaStore, FaUser } from "react-icons/fa";

const sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <a href="/" style={styles.item}>
        <FaHome style={styles.icon} />
        Home
      </a>
      <a href="/stores" style={styles.item}>
        <FaStore style={styles.icon} />
        Stores
      </a>
      <a href="/users" style={styles.item}>
        <FaUser style={styles.icon} />
        Users
      </a>
    </div>
  );
};

export default sidebar;

const styles = {
  sidebar: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#FAFAFA",
    padding: "20px",
    gap: "20px",
  },
  item: {
    marginLeft: "10%",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "10px",
  },
};
