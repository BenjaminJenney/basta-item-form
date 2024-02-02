const { db } = require("@vercel/postgres");

async function createSaleTable(client) {
  try {
    const createdTable = await client.sql`
      CREATE TABLE IF NOT EXISTS sale (
        id VARCHAR(255) PRIMARY KEY
        );`;
    console.log(`Created "sales" table`);
    return createdTable;
  } catch (error) {
    console.log(`Creating "sales" table`, error);
  }
}

async function createItemTable(client) {
  try {
    const createdTable = await client.sql`
      CREATE TABLE IF NOT EXISTS item (
        id VARCHAR(255) PRIMARY KEY,
        sale_id VARCHAR(255) REFERENCES sale(id),
        title TEXT NOT NULL,
        description TEXT,
        date_created DATE NOT NULL,
        date_sold DATE
        );`;
    console.log(`Created "item" table`);
    return createdTable;
  } catch (error) {
    console.log(`Creating "item" table`, error);
  }
}

async function createImageTable(client) {
  try {
    const createdTable = await client.sql`
      CREATE TABLE IF NOT EXISTS image (
        id VARCHAR(255) PRIMARY KEY,
        item_id VARCHAR(255) REFERENCES item(id),
        url VARCHAR(255) NOT NULL,
        order INTEGER NOT NULL
        );`;
    console.log(`Created "image" table`);
    return createdTable;
  } catch (error) {
    console.log(`Creating "image" table`, error);
  }
}

async function main() {
  const client = await db.connect();
  await createSalesTable(client);
  await createItemsTable(client);
  await createImagesTable(client);
}

main().catch((error) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    error
  );
});
