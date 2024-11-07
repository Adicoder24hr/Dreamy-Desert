// components/ConfirmOrderPopup.js

import Image from "next/image";
import React, { useContext } from "react";
import { CartContext } from "../utils/ContextReducer";

const ConfirmOrderPopup = ({ onClose, setIsCartNotEmpty }) => {

    const {state, dispatch} = useContext(CartContext);

    const handleDrop = () =>{
        dispatch({
            type: "DROP",
        })
    }

    let totalPrice = state.reduce((total, food) => total + (food.qty * food.unitePrice), 0);

  return (
    <div className="fixed inset-0 flex items-end lg:items-center md:items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-t-2xl shadow-lg max-w-md lg:max-w-md md:max-w-2xl w-full flex flex-col gap-4">
      <svg 
      className="w-8 h-8 lg:w-8 lg:h-8"
      width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/>
<path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/>
</svg>
        <div className="flex flex-col gap-2 w-fit">
        <h2 className="lg:text-2xl text-5xl font-bold" style={{"lineHeight": "1.2"}}>Order Confirmed</h2>
        <p className="lg:text-xs text-lg text-light_red">We hope you enjoy your food!</p>
        </div>
        <div className="flex justify-end flex-col w-full">
            {
                state.map((data,index)=>{
                    return(
        <div key={index} className='w-full flex justify-between bg-rose_50 border-b-2 py-4 px-4 rounded'>
                    <div className='flex gap-2'>
                        <div className="lg:w-12 lg:h-12 w-14 h-14 rounded overflow-hidden">
                        <Image 
                        fill
                        className="confirmOrderImage"
                        style={{objectFit: "cover"}}
                        src={data.image} 
                        alt="order image"></Image>
                        </div>
                        <div className="flex flex-col gap-2">
                        <h2 className='text-sm font-semibold josefin-font md:text-3xl lg:text-lg'>{data.name}</h2>
                        <div className='flex w-full gap-4'>
                            <p className='text-lg text-red font-semibold md:text-2xl lg:text-sm'>{data.qty}x</p>
                            <div className='flex gap-2 md:gap-3 lg:gap-2'>
                            <p className='text-xl text-light_red md:text-2xl lg:text-sm flex gap-1 items-center'><span className='text-lg lg:text-xs'>@</span>${data.unitePrice.toFixed(2)}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className='flex items-center '>
                        <div className='w-fit h-fit rounded-full px-2 py-2 lg:px-1 lg:py-1'>
                        <p className='text-xl text-Rose_500 md:text-2xl lg:text-lg'>${data.price.toFixed(2)}</p>
                        </div>
                    </div>
            </div>
                    )
                })
            }
            <div className='w-full flex items-center justify-between py-4 px-4 bg-rose_50'>
                <p className='text-lg md:text-xl lg:text-sm text-rose_900 font-medium'>Order Total</p>
                <h2 className='text-2xl md:text-3xl lg:text-2xl font-semibold'>${totalPrice.toFixed(2)}</h2>
              </div>
        </div>
        <button 
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onClick={()=>{onClose(); handleDrop(); setIsCartNotEmpty(false)}} 
        className="bg-red text-white px-4 py-3 rounded-full md:py-5 md:text-xl lg:px-4 lg:py-3 lg:text-sm">Start New Order</button>
      </div>
    </div>
  );
};

export default ConfirmOrderPopup;
