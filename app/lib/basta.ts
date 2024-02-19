import { initBasta } from "@bastaai/basta-admin-js";
import { CreateSaleInput, SaleItem } from "@bastaai/basta-admin-js/types/sale";
import type { IBastaAdmin } from "@bastaai/basta-admin-js/types/sdk";
import type { Item } from "@bastaai/basta-admin-js/types/item";
import type { CreateItemInput } from "@bastaai/basta-admin-js/types/item";
import type { Sale } from "@bastaai/basta-admin-js/types/sale";

if (!process.env.BASTA_ACCOUNT_ID || !process.env.BASTA_SECRET_KEY) { 
  throw new Error('missing Basta credentials for initBasta');
}

const basta_ = initBasta({ accountId: process.env.BASTA_ACCOUNT_ID, secretKey: process.env.BASTA_SECRET_KEY });
class Basta {
  readonly basta: IBastaAdmin;
  constructor() {
    this.basta = basta_;
  }
  /** Returns a new Sale 
   * 
   * @param input: CreateSaleInput = {
   * title: string;
   * description?: string | null | undefined;
   * sequenceNumber: number;
   * closingMethod?: ClosingMethod | null | undefined;
   * closingTimeCountdown: number;
   * status: SaleStatus;
   * dates: {
   * openDate?: string | null;
   * closingDate?: string | null;
   * };
   * images: Image[];
   * incrementTable?: BidIncrementTable | ... 1 more ... | undefined;
   * items: SaleItem[];
   * participants: Participant[];
   * cursor?: string | undefined; // cursor for pagination
   * }
   * @see https://docs.basta.ai/glossary/bidincrementtable
  */
  async createSale(input: CreateSaleInput) {
    try {
      const sale = await this.basta.sale.create(input);
      return sale;
    } catch (error) {
      console.error("creating sale", error);
    }
  }
  /** Returns an already existing Sale 
   * @remarks 
   * type Sale = {
   * id: string;
    accountId: string;
    title: string;
    description?: string | undefined;
    sequenceNumber: number;
    closingMethod?: ClosingMethod | null | undefined;
    closingTimeCountdown: number;
    status: SaleStatus;
    dates: {
        openDate?: string | null;
        closingDate?: string | null;
    };
    images: Image[];
    incrementTable?: BidIncrementTable | ... 1 more ... | undefined;
    items: SaleItem[];
    participants: Participant[];
    cursor?: string | undefined; // cursor for pagination
  }
  */
  async getSale(saleId: string) {
    try {
      const sale: Sale = await this.basta.sale.get(saleId);
      return sale;
    } catch (error) {
      console.error("getting sale", error);
    }
  }
  /** Returns an inventory item (an item not associated with a sale)
   * 
   * @param input
   * @remarks 
   * type CreateItemInput = {
    description?: string | null | undefined;
    title: string;
    valuationAmount?: number | null | undefined;
    valuationCurrency?: string | null | undefined;
   }
}
  */
  async createItem(input: CreateItemInput) {
    try {
      const item: Item = await this.basta.item.create(input);
      return item;
    } catch (error) {
      console.error("creating item", error);
    }
  }
  /** returns SaleItem id 
   * @remarks 
   * a sale item is an inventory item that is associated with a sale
   * @param bastaItem
   * @param saleId
   * @param options
  */
  async addItemToSale(item: Item, saleId: string, options: {
    startingBid?: number | null | undefined;
    reserve?: number | null | undefined;
}) {
    try {
      const saleItem: SaleItem = await this.basta.item.createItemForSale(item, saleId, options);
      return saleItem;
    } catch (error) {
      console.error("creating item for sale", error);
    }
  }
  /** Returns item : Item */
  async getItemFromSale(saleId: string, itemId: string) {
    try {
      const sale = await this.basta.sale.get(saleId);
      const item = sale.items.find((item) => item.id === itemId);
      return item;
    } catch (error) {
      console.error("getting item from sale", error);
    }
  }
  /** Returns SaleItem array */
  async getItemsFromSale(saleId: string) {
    try {
      const sale = await this.basta.sale.get(saleId);
      return sale.items;
    } catch (error) {
      console.error("getting items from sale", error);
    }
  }
}

export const basta = new Basta();