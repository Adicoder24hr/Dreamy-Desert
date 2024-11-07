'use client'
import { useMemo, useReducer, createContext } from "react";

const reducer = (state, action) => {
    switch(action.type){
        case "ADD":
            return [...state, {
                id: action.id,
                tempId: action.tempId,
                name: action.name,
                qty: action.qty,
                price:parseFloat(action.price),
                unitePrice: action.unitePrice,
                image: action.image,
            }
        ];
        case "UPDATE":
            const arr = [...state];
            arr.find((food, index)=>{
                if(food.tempId === action.tempId){
                    arr[index] = {
                        ...food,
                        qty: parseInt(action.qty) + parseInt(food.qty),
                        price: parseFloat(action.price) + food.price
                    }
                }
            });
            return arr;

        case "REMOVE":
            const newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;

        case "INCREMENT":
            console.log('INCREMENT action dispatched');
            return state.map((food) => 
            food.tempId === action.tempId
                ? {
                    ...food,
                    qty: food.qty + 1,
                    price: parseFloat(food.price) + action.unitePrice,
                }
                : food
            );
              
        case "DECREMENT":
            console.log('DECREMENT action dispatched');
            return state.map((food) => 
                food.tempId === action.tempId && food.qty > 1
                ? {
                    ...food,
                    qty: food.qty - 1,
                    price: parseFloat(food.price) - action.unitePrice,
                }
                : food
            );
        case "DROP":
            return [];
              
        default:
            console.log("Action type");
    }
}

export const CartContext = createContext();

export const CartProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, []);
    const contextValue = useMemo(()=>{
        return {state, dispatch};
    }, [state, dispatch]);

    return (
        <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    )
}