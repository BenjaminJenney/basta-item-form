import { sql } from "@vercel/postgres";

export async function getMostRecentSaleId() {
  try {
    const saleIdQueryResult = await sql`SELECT saleId FROM sale ORDER_BY created_date LIMIT 1;`;
    const saleId = saleIdQueryResult.rows[0].saleid;
    return saleId;
  } catch (error) {
    console.error("select sale id", error);
  }
}
