import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    initialState:[],
    name:'cart',
    reducers:{
        add(state,actions){
            const tempState = state.filter(SanPham=>SanPham.idSanPham === actions.payload.idSanPham);
            if(tempState.length < 1){
                state.push(actions.payload)
            }else{
                const tempState = state.map(SanPham=>{
                    if(SanPham.idSanPham === actions.payload.idSanPham){
                        return {...SanPham,quantity:SanPham.quantity+1};
                    }
                    return SanPham;
                })
                return tempState;
            }
        },
        remove(state, actions) {
            return state.filter(SanPham => SanPham.idSanPham !== actions.payload.idSanPham);
        },
        increase(state,actions){
            const tempState = state.map(SanPham=>{
                if(SanPham.idSanPham === actions.payload.idSanPham){
                    return {...SanPham,quantity:SanPham.quantity+1};
                }
                return SanPham;
            })
            return tempState;
        },
        decrease(state,actions){
            const tempState = state.map(SanPham=>{
                if(SanPham.idSanPham === actions.payload.idSanPham){
                    if(SanPham.quantity > 1){
                        return {...SanPham,quantity:SanPham.quantity-1};
                    }
                }
                return SanPham;
            })
            return tempState;
        }
    },
});
export default cartSlice;