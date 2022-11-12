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
  
export type ImgDescriptor = {
  name : string;
  imgs : Fat12FileSystem[];
}

export type InitialStateType = {
    fd: ImgDescriptor;
    shoppingCart: number;
  }
  
  export enum Types {
    ADD_FAT_IMG = 'ADD_FAT_IMG',
    MODIFIED_FAT_IMAGE = 'MODIFIED_FAT_IMAGE' 
  }
  
  // Product
  

  type FatDataPayload = {
    [Types.ADD_FAT_IMG] : ImgDescriptor;
    [Types.MODIFIED_FAT_IMAGE] : Fat12FileSystem;
  }
  
  export type FatDataActions = ActionMap<FatDataPayload>[keyof ActionMap<FatDataPayload>];
  
  export const productReducer = (state: ImgDescriptor, action: FatDataActions ) => {
    switch (action.type) {
      
      case Types.ADD_FAT_IMG:
        return {
          ...state,
          name: action.payload.name,
          imgs: action.payload.imgs
        }
      case Types.MODIFIED_FAT_IMAGE:
        return {
          ...state,
          imgs: [action.payload]
        }
      
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
      default:
        return state;
    }
  }