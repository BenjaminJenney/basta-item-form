import { sql } from "@vercel/postgres";
import { SaleItem } from "@bastaai/basta-admin-js";
import { Sale } from "@bastaai/basta-admin-js/types/sale";
import { PutBlobResult } from "@vercel/blob";
import { v4 as uuid } from "uuid";

export async function getMostRecentSaleId() {
  try {
    const saleIdQueryResult = await sql`SELECT saleId FROM sale ORDER_BY created_date LIMIT 1;`;
    const saleId = saleIdQueryResult.rows[0].saleid;
    return saleId;
  } catch (error) {
    console.error("select sale id", error);
  }
}

class DB {
  async getSale(saleId: string) {
    try {
      const sale = await sql`SELECT * FROM sale WHERE id = ${saleId}`;
      return sale;
    } catch (error) {
      console.error("select sale", error);
    }
  }
  async getSaleItems(saleId: string) {
    try {
      const saleItems = await sql`SELECT * FROM item WHERE id = ${saleId}`;
      return saleItems;
    } catch (error) {
      console.error("select sale items", error);
    }
  }
  async getSaleItem(saleId: string, itemId: string) {
    try {
      const saleItem = await sql`SELECT * FROM item WHERE id = ${saleId} AND itemid = ${itemId}`;
      return saleItem;
    } catch (error) {
      console.error("select sale item", error);
    }
  }
  async getItem(itemId: string) {
    try {
      const item = await sql`SELECT * FROM item WHERE id = ${itemId}`;
      return item;
    } catch (error) {
      console.error("select item", error);
    }
  }
  async getItems() {
    try {
      const items = await sql`SELECT * FROM item`;
      return items;
    } catch (error) {
      console.error("select items", error);
    }
  }
  async getImages(saleId:string, itemId: string) {
    try {
      const images = await sql`SELECT * FROM image WHERE item_id = ${itemId} AND sale_id = ${saleId}`;
      return images;
    } catch (error) {
      console.error("select images", error);
    }
  }
  async insertSale(sale: Sale) {
    try {
      const saleId = await sql`INSERT INTO sale (id) VALUES (${sale.id}) RETURNING id`;
      return saleId;
    } catch (error) {
      console.error("insert sale", error);
    }
  }
  async insertItem(item: SaleItem) {
    try {
      const itemId = await sql`INSERT INTO item (id, sale_id, title, description, date_created) 
      VALUES (${item.id}, ${item.saleId}, ${item.title}, ${item.description}, ${new Date().toISOString()})
      RETURNING id`;
      console.log("itemId: ", itemId.rows[0].id)
      return itemId.rows[0].id;
    } catch (error) {
      console.error("insert item", error);
    }
  }
  async insertImage(blob: PutBlobResult, itemId: string, saleId: string) {
    try {
      const imageId = await sql`INSERT INTO image (id, item_id, sale_id, url, date_created) 
      VALUES (${uuid()}, ${itemId}, ${saleId},  ${blob.url}, ${new Date().toISOString()})
      RETURNING id`;
      return imageId;
    } catch (error) {
      console.error("insert image", error);
    }
  }
  async insertImages(blobs: PutBlobResult[], itemId: string, saleId: string) {
    try {
      const imageIds = blobs.map(async (blob) => {
        const imageId = await sql`INSERT INTO image (id, item_id, sale_id, url, date_created) 
        VALUES (${uuid()}, ${itemId}, ${saleId},  ${blob.url}, ${new Date().toISOString()})
        RETURNING id`;
        return imageId.rows[0].id;
      });
      return imageIds;
    } catch (error) {
      console.error("insert images", error);
    }
  }
}

export const db = new DB();