import { ClosingMethod } from "@bastaai/basta-admin-js";

export type DefaultSaleOptions = {
  currency: string;
  bidIncrementTable: {
      rules: {
          lowRange: number;
          highRange: number;
          step: number;
      }[];
  };
  closingMethod: ClosingMethod;
  closingTimeCountdown: number;
}