"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { Customers } from "../data";
import {
  App,
  Button,
  ConfigProvider,
  Form,
  InputNumber,
  Radio,
  Select,
  theme,
} from "antd";
import { createInvoice } from "../action";
import { schemaForm } from "./schemaForm";

function InvoiceForm({ customers }: { customers: Customers[] }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { message } = App.useApp();

  // Kết nối Zod schemaForm vào rules của từng ô Form.Item
  const zodRule = (fieldName: keyof typeof schemaForm.shape) => ({
    validator(_: unknown, value: unknown) {
      const result = schemaForm.shape[fieldName].safeParse(value);
      if (result.success) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(result.error.issues[0]?.message));
    },
  });

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
        // Để trống amount ban đầu (hoặc đặt > 0) để không vi phạm rule .gt(0) của Zod
        initialValues={{ status: "paid" }}
      >
        <Form.Item
          label="Tên khách hàng"
          name="customerId"
          rules={[zodRule("customerId")]}
        >
          <Select
            placeholder="Chọn một khách hàng"
            options={customers.map((customer) => ({
              value: customer.id,
              label: customer.name,
            }))}
          />
        </Form.Item>

        <Form.Item label="Tiền (VND)" name="amount" rules={[zodRule("amount")]}>
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Nhập số tiền..."
          />
        </Form.Item>

        <Form.Item label="Trạng thái" name="status" rules={[zodRule("status")]}>
          <Radio.Group
            options={[
              { label: "Paid", value: "paid" },
              { label: "Pending", value: "pending" },
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
