const { db } = require("@vercel/postgres");

// User Table
async function createUserTable(client) {
  try {
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      shopify_customer_id VARCHAR(255),
      username VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255),
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      address VARCHAR(255),
      phone VARCHAR(20)
    );`;
    console.log("created users table");
  } catch (error) {
    console.error("error creating users table:", error);
  }
}

// Item Table
async function createItemTable(client) {
  try {
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS items (
      item_id SERIAL PRIMARY KEY,
      seller_id INTEGER REFERENCES users(user_id),
      title VARCHAR(255),
      description TEXT,
      start_price NUMERIC,
      start_date TIMESTAMP,
      end_date TIMESTAMP,
      status VARCHAR(50),
      shopify_product_id VARCHAR(255) UNIQUE
    );`;
    console.log("created items table");
  } catch (error) {
    console.error("error creating Item table: ", error);
  }
}

// Bid Table
async function createBidsTable(client) {
  try {
    const createTable = await client.sql`
  CREATE TABLE IF NOT EXISTS bids (
    bid_id SERIAL PRIMARY KEY,
    item_id INTEGER REFERENCES items(item_id),
    bidder_id INTEGER REFERENCES users(user_id),
    bid_amount NUMERIC,
    bid_timestamp TIMESTAMP
  );`;
    console.log("created bids table");
  } catch (error) {
    console.error("error creating bids table", error);
  }
}

// Category Table
async function createCategoriesTable(client) {
  try {
    const createTable = await client.sql`
    CREATE TABLE categories (
      category_id SERIAL PRIMARY KEY,
      category_name VARCHAR(255)
    );`;
    console.log("created categories table");
  } catch (error) {
    console.error("error creating categories table", error);
  }
}

// ItemCategory Table (Associative Table)
async function createItemCategoriesTable(client) {
  try {
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS item_categories (
      item_id INTEGER REFERENCES items(item_id),
      category_id INTEGER REFERENCES categories(category_id),
      PRIMARY KEY (item_id, category_id)
    );`;
    console.log("created item_categories table");
  } catch (error) {
    console.error("error creating item categories table", error);
  }
}

// Image Table
async function createImageTable(client) {
  try {
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS images (
      image_id SERIAL PRIMARY KEY,
      item_id INTEGER REFERENCES items(item_id),
      image_path VARCHAR(255)
    );`;
    console.log("created Image table");
  } catch (error) {
    console.error("error creating Image table", error);
  }
}

// Transaction Table
async function createTransactionTable(client) {
  try {
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS transactions (
      transaction_id SERIAL PRIMARY KEY,
      buyer_id INTEGER REFERENCES users(user_id),
      seller_id INTEGER REFERENCES users(user_id),
      item_id INTEGER REFERENCES items(item_id),
      transaction_amount NUMERIC,
      transaction_date TIMESTAMP
    );`;
    console.log("created transaction table");
  } catch (error) {
    console.error("error creating Item table", error);
  }
}

// Rating Table /* !!Q: User feedback? */
// CREATE TABLE ratings (
//   rating_id SERIAL PRIMARY KEY,
//   rated_user_id INTEGER REFERENCES users(user_id),
//   rating_given_by_user_id INTEGER REFERENCES users(user_id),
//   rating NUMERIC,
//   feedback TEXT
// );

async function main() {
  const client = await db.connect();
  await createUserTable(client);
  await createItemTable(client);
  await createBidsTable(client);
  await createCategoriesTable(client);
  await createItemCategoriesTable(client);
  await createImageTable(client);
  await createTransactionTable(client);
  client.end();
}

main().catch((error) => {
  console.error(
    "An error occurred while attempting to initialize the database:",
    error
  );
});
