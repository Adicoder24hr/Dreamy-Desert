import React, { useContext } from 'react'
import { CartContext } from '../utils/ContextReducer';

const Cart = ({onConfirmOrder, setIsCartNotEmpty}) => {

    const {state, dispatch} = useContext(CartContext);

    const cartHeading = `Your Cart (${state.length})`;
    const totalPrice = state.reduce((total, food) => total + (food.qty * food.unitePrice), 0);

  return (
    <div className="lg:w-full bg-white px-6 flex flex-col gap-6 rounded-lg py-8">
          <h2 className="text-red font-bold text-2xl lg:text-2xl md:text-3xl josefin-font">{cartHeading}</h2>
          <div className="flex flex-col items-center w-full">
            {
                state.map((data, index) => {
                    return (
            <div key={index} className='w-full flex justify-between border-b-2 mb-4'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-2xl font-semibold josefin-font md:text-3xl lg:text-xl'>{data.name}</h2>
                        <div className='flex w-full gap-4'>
                            <p className='text-lg text-red font-semibold md:text-2xl lg:text-lg'>{data.qty}x</p>
                            <div className='flex gap-2 md:gap-3 lg:gap-2'>
                            <p className='text-xl text-light_red md:text-2xl lg:text-lg flex gap-1 items-center'><span className='text-lg lg:text-sm'>@</span>${data.unitePrice.toFixed(2)}</p>
                            <p className='text-xl text-Rose_500 md:text-2xl lg:text-lg'>${data.price.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center '>
                        <div className='w-fit h-fit rounded-full border border-rose_300 px-2 py-2 lg:px-1 lg:py-1 hover:scale-125 hover:border-black group'>
                                <svg 
                                onClick={
                                  ()=>{
                                    dispatch({
                                      type: "REMOVE",
                                      index: index
                                    });
                                    setIsCartNotEmpty(false);
                                  }
                                }
                                strokeWidth={1.2}
                                stroke="hsl(14, 25%, 72%)"
                                className="w-4 h-4 md:w-6 md:h-6 lg:w-3 lg:h-3 hover:cursor-pointer group-hover:stroke-black"
                                xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
                        </div>
                    </div>
            </div>
                    )
                })
            }
            <div className='w-full flex flex-col gap-4'>
              <div className='w-full flex justify-between py-4'>
                <p className='text-lg md:text-xl lg:text-lg font-medium'>Order Total</p>
                <h2 className='text-2xl md:text-3xl lg:text-2xl font-semibold'>${totalPrice.toFixed(2)}</h2>
              </div>
              <div className='w-full flex gap-3 justify-center py-4 bg-rose_50 mb-3 rounded items-center'>
              <svg 
              className='w-6 h-6 md:w-8 md:h-8 lg:w-6 lg:h-6'
              xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg>
              <p className='josefin-font font-medium text-lg md:text-2xl lg:text-sm'>This is a <span className='josefin-font font-semibold'>carbon neutral</span> delivery</p>
              </div>
              <button
              onClick={onConfirmOrder} 
              className='w-full border-none rounded-full bg-red text-white py-4 px-3 text-lg lg:text-lg md:text-3xl lg:py-4 lg:px-3 md:py-6 md:px-3 josefin-font font-medium'>Confirm Order</button>
            </div>
          </div>
        </div>
  )
}

export default Cart