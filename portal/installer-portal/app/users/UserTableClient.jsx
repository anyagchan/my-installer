"use client";
import React from "react";
import { Table } from "antd";

const UserTableClient = ({ userData }) => {
  const userColumns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Date Joined",
      dataIndex: "date",
      key: "date",
      render: (text) => new Date(text).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <Table dataSource={userData} columns={userColumns} rowKey="_id" />
    </div>
  );
};

export default UserTableClient;
