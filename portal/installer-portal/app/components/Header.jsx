"use client";
import React from "react";
import Image from "next/image";

const header = () => {
  return (
    <div style={styles.header}>
      <h style={styles.headerTitle}>Label</h>
      <div style={styles.profile}>
        <p style={styles.profileText}>Username</p>
        <Image
          src="/profile.png"
          style={styles.profileImg}
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

export default header;

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FF5959",
    padding: "10px",
  },
  headerTitle: {
    color: "white",
    margin: "15px",
    fontSize: "20px",
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  profileText: {
    color: "white",
    fontSize: "15px",
  },
  profileImg: {
    borderRadius: "50%",
    marginLeft: "20px",
    marginRight: "20px",
  },
};
