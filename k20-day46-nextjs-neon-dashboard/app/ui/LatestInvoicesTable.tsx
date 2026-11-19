"use client";
import React from "react";
import { LatestInvoice } from "../data";
import Table, { ColumnsType } from "antd/es/table";
import { ConfigProvider, Tag, theme } from "antd";

interface LatestInvoicesTableProps {
  invoices: LatestInvoice[];
}
export default function LatestInvoicesTable({
  invoices,
}: LatestInvoicesTableProps) {
  const columns: ColumnsType<LatestInvoice> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render(amount: number) {
        return (
          <span className="font-medium">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(amount)}
          </span>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render(status: string) {
        const isPaid = status.toLowerCase() === "paid";
        return (
          <Tag color={isPaid ? "green" : "orange"}>
            {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
          </Tag>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "date",
      key: "date",
      render(date: string | Date) {
        return new Date(date).toLocaleDateString("vi-VN");
      },
    },
  ];
  return (
    <ConfigProvider theme={{algorithm:theme.darkAlgorithm}}>
        <Table
          dataSource={invoices}
          columns={columns}
          rowKey={"id"}
          pagination={false}
        />
    </ConfigProvider>
  );
}
