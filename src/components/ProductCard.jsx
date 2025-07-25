import React from 'react'

import axiosInstance from '../services/axiosInstance'

const ProductCard = ({product, handleClick}) => {
    console.log(product);
    return (
        <div onClick={handleClick} className="bg-white border cursor-pointer border-[#f6f6f6] rounded overflow-hidden  ">
            <div className='p-2 overflow-hidden md:h-46 lg:h-64'>
                <img 
                    src={`${axiosInstance.defaults.baseURL}${product.thumbnail}`} 
                    alt={product.name}
                    className='object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-110' 
                />
            </div>

            <div className='px-4 pb-4'>
                <p className="mt-2 text-xs text-gray-600 line-clamp-2">
                    <span className="text-sm font-bold text-black">{product.name}</span> - {product.description}
                </p>
                <p className='mt-2 text-sm'>
                    {
                        product.discount > 0 && (
                            <span className='text-xs text-red-500 me-2'>
                                <s>Rp. {product.price}</s>
                            </span>

                        )
                    }
                    <span className='font-bold text-slate-700 font-roboto'>
                        Rp. {product.price - product.discount}
                    </span>
                </p>

            </div>
        </div>
    )
}

export default ProductCard
