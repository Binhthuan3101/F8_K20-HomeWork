import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export const ITEMS_PER_PAGE = 5;

export interface InvoiceRow {
  id: string;
  customer_id: number;
  customer_name: string;
  amount: number;
  status: "pending" | "paid" | string;
  date: string | Date;
}

export interface InvoiceEditValues {
  id: string;
  customerId: number;
  amount: number;
  status: "pending" | "paid";
}

export interface CustomerOption {
  id: number;
  name: string;
}

export async function fetchLatestInvoices(): Promise<InvoiceRow[]> {
  const data = await sql`
    SELECT
      invoices.id,
      invoices.customer_id,
      customers.name AS customer_name,
      invoices.amount,
      invoices.status,
      invoices.date
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.date DESC, invoices.id DESC
    LIMIT 5
  `;
  return data as InvoiceRow[];
}

export async function fetchCustomers(): Promise<CustomerOption[]> {
  const data = await sql`
    SELECT id, name
    FROM customers
    ORDER BY id
  `;
  return data as CustomerOption[];
}

export async function fetchInvoiceById(
  id: string
): Promise<InvoiceEditValues | null> {
  const data = await sql`
    SELECT
      invoices.id,
      invoices.customer_id AS "customerId",
      invoices.amount,
      invoices.status
    FROM invoices
    WHERE invoices.id = ${id}
  `;
  return (data[0] as InvoiceEditValues) ?? null;
}

export async function fetchFilteredInvoices(
  search: string,
  currentPage: number
): Promise<InvoiceRow[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const data = await sql`
    SELECT
      invoices.id,
      invoices.customer_id,
      customers.name AS customer_name,
      invoices.amount,
      invoices.status,
      invoices.date
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE customers.name ILIKE ${`%${search}%`}
    ORDER BY invoices.date DESC, invoices.id DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return data as InvoiceRow[];
}

export async function fetchTotalPages(search: string): Promise<number> {
  const data = await sql`
    SELECT COUNT(*) AS total
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE customers.name ILIKE ${`%${search}%`}
  `;
  const totalInvoices = Number(data[0].total);
  return Math.ceil(totalInvoices / ITEMS_PER_PAGE);
}