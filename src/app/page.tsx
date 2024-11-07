'use client'

import Card from "./components/card";
import data from "@/app/store/data.json";
import EmptyCart from "./components/EmptyCart";
import { useContext, useState } from "react";
import Cart from "./components/Cart";
import ConfirmOrderPopup from "./components/ConfirmOrderPopUp";
import { CartContext } from "./utils/ContextReducer";

export default function Home() {

  const [isCartNotEmpty, setIsCartNotEmpty] = useState(false);
  const [showConfirmPopup, setConfirmPopup] = useState(false);
  const {state, dispatch} = useContext(CartContext);

  const HandleAddToCart = () =>{
    setIsCartNotEmpty(true);
  }; 
  const handleConfirmOrder = ()=>{
    setConfirmPopup(true);
  };

  const closeConfirmPopup = () => {
    setConfirmPopup(false);
  };

  return (
    <main className="flex flex-col md:flex-col lg:flex-row md:px-16 px-4 md:py-20 w-screen min-h-screen">
      <div className=" md:w-full lg:w-[60%] h-full py-12 lg:py-0">
        <h2 className="josefin-font lg:text-4xl text-3xl font-extrabold mb-8 md:text-5xl">Desserts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-12 lg:gap-4 place-items-center">
          {
            data.map((foodData) => (
              <Card key={foodData.name} foodData={foodData} onAddToCart = {HandleAddToCart} />
            ))
          }
        </div>
      </div>
      <div className="lg:w-[40%] w-full lg:px-10 py-8 lg:py-0">
        {
          state.length > 0 ? (<Cart setIsCartNotEmpty={setIsCartNotEmpty} onConfirmOrder = {handleConfirmOrder}/>): (<EmptyCart />)
        }
      </div>

      {showConfirmPopup && <ConfirmOrderPopup onClose={closeConfirmPopup} setIsCartNotEmpty={setIsCartNotEmpty}/>}
    </main>
  );
}
