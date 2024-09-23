"use client";
import React from "react";
import { Space, Table } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

const StoreTableClient = ({ storeData }) => {
  const storeColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Last Updated",
      dataIndex: "date",
      key: "date",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Number of Images",
      key: "imageCount",
      render: (_, record) => record.images.length,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={`/stores/${record._id}`}>
            <EyeOutlined />
          </a>
          <a>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={storeData} columns={storeColumns} rowKey="_id" />
    </div>
  );
};

export default StoreTableClient;
