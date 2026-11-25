"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { Customers } from "../data";
import {
  App,
  Button,
  ConfigProvider,
  Form,
  Input,
  Radio,
  Select,
  theme,
} from "antd";
import { createInvoice } from "../action";

function InvoiceForm({ customers }: { customers: Customers[] }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { message } = App.useApp();

  const handleSubmit = async (values: {
    customerId: number;
    amount: number;
    status: string;
  }) => {
    setLoading(true);
    try {
      await createInvoice(values);
      message.success("Thêm hóa đơn thành công!");
      router.push("/dashboard/invoices");
    } catch (error) {
      message.error("Lỗi khi thêm hóa đơn!");
      console.error("Lỗi khi tạo hóa đơn:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{ amount: 0, status: "paid" }}
      >
        <Form.Item
          label="Tên khách hàng"
          name="customerId"
          rules={[{ required: true, message: "Vui lòng chọn khách hàng!" }]}
        >
          <Select
            placeholder="Chọn một khách hàng"
            options={customers.map((customer) => ({
              value: customer.id,
              label: customer.name,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Tiền"
          name="amount"
          rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
        >
          <Input type="number" placeholder="Enter amount..." />
        </Form.Item>

        <Form.Item label="Trạng thái" name="status">
          <Radio.Group
            options={[
              { label: "paid", value: "paid" },
              { label: "pending", value: "pending" },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Create Invoice
          </Button>
        </Form.Item>
          </Form>
          
    </div>
  );
}

export default function CreateForm({ customers }: { customers: Customers[] }) {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <App>
        <InvoiceForm customers={customers} />
      </App>
    </ConfigProvider>
  );
}
