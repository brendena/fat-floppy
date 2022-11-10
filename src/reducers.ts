/*reducers.ts*/
import { Fat12FileSystem } from "./lib/Fat12FileSystem";
type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
      ? {
          type: Key;
        }
      : {
          type: Key;
          payload: M[Key];
        }
  };
  
  export enum Types {
    ADD_FAT_IMG = 'ADD_FAT_IMG',
  }
  
  // Product
  

  type FatDataPayload = {
    [Types.ADD_FAT_IMG] : Fat12FileSystem;
  }
  
  export type FatDataActions = ActionMap<FatDataPayload>[keyof ActionMap<FatDataPayload>];
  
  export const productReducer = (state: Fat12FileSystem[], action: FatDataActions ) => {
    switch (action.type) {
      
      case Types.ADD_FAT_IMG:
        return [
          ...state,
          
            action.payload
          
        ]
      
      default:
        return state;
    }
  }
  
  // ShoppingCart
  
  type ShoppingCartPayload = {
    [Types.ADD_FAT_IMG]: undefined;
  }
  
  export type ShoppingCartActions = ActionMap<ShoppingCartPayload>[keyof ActionMap<ShoppingCartPayload>];
  
  export const shoppingCartReducer = (state: number, action: FatDataActions | ShoppingCartActions) => {
    switch (action.type) {
      case Types.ADD_FAT_IMG:
        return state + 1;
      default:
        return state;
    }
  }