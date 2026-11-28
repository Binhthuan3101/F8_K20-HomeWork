"use client";

import React from "react";
import Link from "next/link";
import { Button, ConfigProvider, Space, Table, Tag, theme } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { InvoiceRow } from "@/app/data";
import { deleteInvoice } from "../action";

export default function InvoicesTable({
  invoices,
  showActions = true,
}: {
  invoices: InvoiceRow[];
  showActions?: boolean;
}) {
  const columns: ColumnsType<InvoiceRow> = [
    {
      title: "Khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `${Number(amount).toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "paid" ? "green" : "gold"}>{status}</Tag>
      ),
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      render: (date: string | Date) =>
        new Date(date).toLocaleDateString("vi-VN"),
    },
  ];

  if (showActions) {
    columns.push({
      title: "Thao tác",
      key: "actions",
      render: (_, invoice) => {
        const deleteInvoiceWithId = deleteInvoice.bind(null, invoice.id);

        return (
          <Space>
            <Link href={`/dashboard/invoices/${invoice.id}/edit`}>
              <Button size="small">Sửa</Button>
            </Link>

            {/* Gắn trực tiếp Server Action vào thẻ <form> */}
            <form action={deleteInvoiceWithId}>
              <Button size="small" danger htmlType="submit">
                Xóa
              </Button>
            </form>
          </Space>
        );
      },
    });
  }

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Table
        dataSource={invoices}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </ConfigProvider>
  );
}
