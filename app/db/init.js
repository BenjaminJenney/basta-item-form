const { db } = require("@vercel/postgres");

async function createSaleTable(client) {
  try {
    const createdTable = await client.sql`
      CREATE TABLE IF NOT EXISTS sale (
        saleId VARCHAR(255) PRIMARY KEY
        );`;
    console.log(`Created "sale" table`);
    return createdTable;
  } catch (error) {
    console.log(`Creating "sale" table`, error);
  }
}

async function main() {
  const client = await db.connect();
  await createSaleTable(client);
}

main().catch((error) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    error
  );
});
