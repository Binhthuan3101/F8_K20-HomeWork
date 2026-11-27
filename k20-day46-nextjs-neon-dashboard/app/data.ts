import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
export const ITEMS_PER_PAGE = 5;

export type LatestInvoice = {
  id: number;
  customer_name: string;
  amount: number;
  status: string;
  date: string | Date;
};

export type InvoiceRow = {
  id: number;
  customer_name: string;
  amount: number;
  status: string;
  date: string | Date;
};
export type InvoiceFormData = {
  id: number;
  customerId: number;
  amount: number;
  status: string;
};

export type CustomerRow = {
  name: string;
};

export type Customers = {
  id: number;
  name: string;
};
export async function fetchLatestInvoice(): Promise<LatestInvoice[]> {
  const data =
    await sql`SELECT invoices.id,customers.name AS customer_name, invoices.amount,invoices.status,invoices.date FROM invoices JOIN customers ON invoices.customer_id=customers.id ORDER BY invoices.date DESC, invoices.id DESC LIMIT 5`;
  return data as LatestInvoice[];
}

export async function fetchCustomer(): Promise<CustomerRow[]> {
  const data = await sql`SELECT name FROM customers ORDER BY id`;
  return data as CustomerRow[];
}

export async function fetchFilteredInvoices(
  search: string,
  currentPage: number,
): Promise<InvoiceRow[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const data =
    await sql`SELECT invoices.id, customers.name AS customer_name, invoices.amount,invoices.status,invoices.date FROM invoices JOIN customers ON invoices.customer_id=customers.id WHERE customers.name ILIKE ${`%${search}%`} ORDER BY invoices.date DESC, invoices.id DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
  return data as InvoiceRow[];
}

export async function fetchTotalPage(search: string): Promise<number> {
  const data =
    await sql`SELECT COUNT(*) AS total FROM invoices JOIN customers ON invoices.customer_id=customers.id WHERE customers.name ILIKE ${`%${search}%`}`;
  const totalInvoices = Number(data[0].total);
  return Math.ceil(totalInvoices / ITEMS_PER_PAGE);
}

export async function fetchCustomers(): Promise<Customers[]> {
  const data = await sql`SELECT id,name FROM customers`;
  return data as Customers[];
}
