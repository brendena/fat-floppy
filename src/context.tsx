/*context.tsx*/

import React, { createContext, useReducer, Children } from 'react';
import { productReducer, shoppingCartReducer, ImgDescriptor,InitialStateType } from './reducers';
import { Fat12FileSystem } from "./lib/Fat12FileSystem";


const initialState = {
  fd: {
    name:"",
    imgs:[]
  },
  shoppingCart: 0,
}

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

const mainReducer = ({ fd , shoppingCart } :any, action :any) => ({
  fd: productReducer(fd, action),
  shoppingCart: shoppingCartReducer(shoppingCart, action),
});

const AppProvider: React.FC<any> = ( { children }: { children: React.ReactElement } ) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
        {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider };