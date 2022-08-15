import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "models/IProduct";


interface ContructorState {
   products: Array<IProduct>,
   isChose: boolean
   isInitial: boolean
   summaryCount: number
}

const initialState: ContructorState = {
   products: [],
   isChose: false,
   summaryCount: 0,
   isInitial:true
}


export const contructorSlice = createSlice({
   name: 'constructor',
   initialState,
   reducers: {
      setProduct(state, action: PayloadAction<IProduct>) {
         const itemInCart = state.products.find((item) => item.id === action.payload.id);
         if (itemInCart) {
            itemInCart.count = action.payload.count
         } else {
            state.products.push(action.payload)
         }

      },
      removeItem : (state, action: PayloadAction<string>) => {
         state.products = state.products.filter((arrow) => arrow.id !== action.payload);
         
},
      setIsChose(state, action: PayloadAction<boolean>) {
         state.isChose = action.payload
         state.isInitial=action.payload
      },
      setIsInitial(state, action: PayloadAction<boolean>) {
         state.isInitial=action.payload
         state.isChose=action.payload
      }
   }
});




export default contructorSlice.reducer;
