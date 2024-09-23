import React from "react";
import Image from "next/image";

import Header from "../../components/Header.jsx";
import Sidebar from "../../components/Sidebar.jsx";

const page = ({ params }) => {
  return (
    <main style={styles.main}>
      <div style={styles.header}>
        <Header />
      </div>
      <div style={styles.body}>
        <div style={styles.sidebar}>
          <Sidebar />
        </div>
        <div style={styles.content}></div>
      </div>
    </main>
  );
};

export default page;

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "100vh",
    backgroundColor: "white",
  },
  header: {
    display: "flex",
  },
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  sidebar: {
    width: "180px",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
  },
};
