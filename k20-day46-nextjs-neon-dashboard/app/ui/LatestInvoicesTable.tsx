"use client";
import React from "react";
import { InvoiceRow, LatestInvoice } from "../data";
import Table, { ColumnsType } from "antd/es/table";
import { Button, ConfigProvider, message, Popconfirm, Space, Tag, theme } from "antd";
import Link from "next/link";
import { deletedInvoice } from "../action";

interface LatestInvoicesTableProps {
  invoices: LatestInvoice[];
}
export default function LatestInvoicesTable({
  invoices,
}: LatestInvoicesTableProps) {
  const handleDelete = async (id: number) => {
    try {
      await deletedInvoice(id);
    message.success("Xóa hóa đơn thành công!")
    } catch (error) {
      message.error("Lỗi khi xóa hóa đơn!")
    }
  };
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
    {
      title: "Hành động",
      key: "actions",
      render(_, record: InvoiceRow) {
        return (
          <Space>
            <Link href={`/dashboard/invoices/${record.id}/edit`}>
              <Button size="small" type="default">
                Sửa
              </Button>
            </Link>

            <Popconfirm
              title="Xóa hóa đơn này?"
              description="Hành động này không thể hoàn tác."
              onConfirm={() => handleDelete(record.id)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button size="small" danger>
                Xóa
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Table
        dataSource={invoices}
        columns={columns}
        rowKey={"id"}
        pagination={false}
      />
    </ConfigProvider>
  );
}
