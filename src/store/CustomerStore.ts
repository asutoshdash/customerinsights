import * as React from "react";
import { T_SelectedCustomer, T_StoreAction } from "../types/CustomerType";
import { FETCH_DETAILS } from "./CustomerStoreActionTypes";
export const CustomerContext = React.createContext<null | {
  dispatchFn: React.Dispatch<T_StoreAction>;
}>(null);
export function CustomerReducer(
  state: T_SelectedCustomer | null,
  action: T_StoreAction
): T_SelectedCustomer {
  switch (action.type) {
    case FETCH_DETAILS:
      return { id: action.payload ? action.payload.id : null };
    default:
      throw Error("Unknown Action");
  }
}
