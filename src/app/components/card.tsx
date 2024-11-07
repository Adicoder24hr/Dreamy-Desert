'use client'

import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { CartContext } from '../utils/ContextReducer';

interface FoodData {
    id: string
    name: string,
    category: string,
    price: string,
    image: object
}

interface CardProps {
    foodData: FoodData;
    onAddToCart: () => void;
}

const Card = ({foodData, onAddToCart}: CardProps) => {

    const [click, setClick] = useState(false);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const {state, dispatch} = useContext(CartContext);
    const [qty, setQty] = useState(1);

    const handleAddToCart = async () =>{
      const updateItem = await state.find((item)=>{
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        item.tempId === foodData.id + 1
      });
      if(!updateItem){
        dispatch({
          type: "ADD",
          id: foodData.id,
          tempId: foodData.id + 1,
          name: foodData.name,
          qty: qty,
          price: foodData.price,
          unitePrice: parseFloat(foodData.price),
          image: foodData.image.desktop,
        })
      }
      setClick(true);
      onAddToCart();
    };

    const incrementQty = () => {
      // setQty((prevQty) => prevQty + 1);
      dispatch({
        type: "INCREMENT",
        tempId: foodData.id + 1,
        unitePrice: parseFloat(foodData.price),
      });
    };
    
    const decrementQty = () => {
        // setQty((prevQty) => prevQty - 1);
        dispatch({
          type: "DECREMENT",
          tempId: foodData.id + 1,
          unitePrice: parseFloat(foodData.price),
        });
    };


    const handleClick = ()=>{
        setClick(true);
        if(imageRef.current){
            imageRef.current.style.border = "2px solid red"
        }
    };

    useEffect(()=>{
      const cartItemExists = state.find((item) => item.tempId === foodData.id + 1);

      if(!cartItemExists){
        if(imageRef.current){
          imageRef.current.style.border = "none";
        };
        setClick(false)
      }
    }, [state, foodData.id])

    const cartItem = state.find((item) => item.tempId === foodData.id + 1);

  return (
    <div className='w-full mb-7 md:w-72 lg:w-64 flex flex-col rounded-lg overflow-hidden'>
        <div className='w-full h-fit flex flex-col justify-center items-center'>
            <Image
            ref={imageRef}
            src={foodData.image.desktop}
            alt={foodData.name}
            fill
            style={{objectFit: "cover"}}
            className='rounded-b-lg rounded-t-lg'
            >
            </Image>
            {
               click ? 
               <button onClick={handleClick} className=' flex gap-4 lg:py-2 lg:px-4 md:px-7 md:py-2 px-7 py-3 md:text-xl text-xl lg:text-lg border text-white border-rose-200 rounded-3xl bg-red relative bottom-6 lg:bottom-6 md:bottom-6 josefin-font font-bold'>
                                <svg
                                onClick={incrementQty}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="white"
                                    className="w-6 hover:cursor-pointer hover:scale-125 mx-3 h-6 hover:text-red-500"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                {cartItem ? cartItem.qty : 0}
                                <svg
                                onClick={decrementQty}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="white"
                                    className="w-6 mx-3 h-6 hover:cursor-pointer hover:scale-125 hover:text-red-500"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                   </button>
            :<button onClick={() => {handleAddToCart(); handleClick();}} className=' flex hover:border-orange-500 hover:text-rose-500 gap-3 lg:py-2 lg:px-4 md:px-7 md:py-2 px-7 py-3 md:text-xl text-xl lg:text-lg border border-rose-200 rounded-3xl relative bottom-6 lg:bottom-6 md:bottom-6 bg-white josefin-font font-bold'>
            <svg 
            className='md:w-8 md:h-8 lg:w-6 lg:h-6 w-6 h-6'
            xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
                Add to Cart
                </button>
            }
        </div>
        <div className='flex flex-col gap-1'>
            <p className='text-light_red lg:text-sm md:text-xl text-lg'>{foodData.category}</p>
            <p className='lg:text-lg font-semibold md:text-2xl text-2xl'>{foodData.name}</p>
            <p className='text-red lg:text-sm font-semibold md:text-xl text-lg'>${foodData.price}</p>
        </div>
    </div>
  )
}

export default Card;