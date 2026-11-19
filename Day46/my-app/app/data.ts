import {neon} from '@neondatabase/serverless'
export function fetchLatestInvoices() {
    const sql = neon(`${process.env.DATABASE_URL}`)
}