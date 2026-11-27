"use client";

import {
  App,
  Button,
  ConfigProvider,
  Form,
  InputNumber,
  Select,
  Switch,
  theme,
  message,
} from "antd";
import React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Customers, InvoiceFormData } from "../data";
import { schemaForm } from "./schemaForm";
import { updateInvoices } from "../action";

// Tự động lấy kiểu từ schemaForm (customerId: number, amount: number) và đổi status thành boolean cho Switch
type FormValues = Omit<z.infer<typeof schemaForm>, "status"> & {
  status: boolean;
};

function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceFormData;
  customers: Customers[];
}) {
  const [form] = Form.useForm<FormValues>();
  const router = useRouter();

  const zodRule = (fieldName: keyof typeof schemaForm.shape) => ({
    validator(_: unknown, value: unknown) {
      const result = schemaForm.shape[fieldName].safeParse(value);
      if (result.success) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(result.error.issues[0]?.message));
    },
  });

  const handleUpdate = async (values: FormValues) => {
    try {
      const payload = {
        customerId: values.customerId,
        amount: values.amount,
        status: values.status ? "paid" : "pending",
      };

      await updateInvoices(invoice.id, payload);
      message.success("Cập nhật hóa đơn thành công!");
      router.push("/dashboard/invoices");
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật!");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleUpdate}
      initialValues={{
        // Đảm bảo tên trường này (customerId hoặc customer_id) khớp với type InvoiceFormData của bạn
        customerId: invoice.customerId,
        amount: invoice.amount,
        status: invoice.status === "paid",
      }}
    >
      <Form.Item
        label="Khách hàng"
        name="customerId"
        rules={[zodRule("customerId")]}
      >
        <Select
          placeholder="Chọn khách hàng"
          options={customers.map((c) => ({
            label: c.name,
            value: c.id,
          }))}
        />
      </Form.Item>

      <Form.Item
        label="Số tiền (VND)"
        name="amount"
        rules={[zodRule("amount")]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Nhập số tiền (VND)"
        />
      </Form.Item>

      <Form.Item
        label="Trạng thái thanh toán"
        name="status"
        valuePropName="checked"
      >
        <Switch checkedChildren="Paid" unCheckedChildren="Pending" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Lưu thay đổi
        </Button>
      </Form.Item>
    </Form>
  );
}

export default function EditForm({
  invoice,
  customers,
}: {
  invoice: InvoiceFormData;
  customers: Customers[];
}) {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <App>
        <EditInvoiceForm invoice={invoice} customers={customers} />
      </App>
    </ConfigProvider>
  );
}
