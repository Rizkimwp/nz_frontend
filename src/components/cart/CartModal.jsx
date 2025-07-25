import React from 'react'
import axiosInstance from '../../services/axiosInstance'

const CartModal = ({cart, closeModal, updateItemQuantity}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                <button
                    onClick={closeModal}
                    className="absolute text-gray-500 top-4 right-4 hover:text-gray-700 focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <h2 className="mb-8 text-xl font-semibold text-center text-color1">Keranjang Belanja</h2>
                {
                    cart.length > 0 ? (
                        <>
                            <div className="overflow-y-auto max-h-96">
                                <ul>
                                    {cart.map((item, index) => (
                                        <li key={index} className="flex items-center justify-between pb-4 mb-4 border-b">
                                            <div className="flex items-center">
                                                <img
                                                    src={`${axiosInstance.defaults.baseURL}${item.thumbnail}`}                                     
                                                    alt={item.name}
                                                    className="object-cover w-16 h-16 mr-4 rounded-md"
                                                />
                                                <div>
                                                    <span className="block font-medium">{item.name}</span>
                                                    <span className="text-xs">
                                                        {item.discount > 0 && (
                                                            <span className='text-xs text-red-500 me-2'>
                                                                <s>Rp. {item.price}</s>
                                                            </span>
                                                        )}
                                                        Rp {item.price - item.discount}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <button
                                                    onClick={() => updateItemQuantity(index, "decrease")}
                                                    className="px-3 py-1 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
                                                >
                                                    -
                                                </button>
                                                <span className="text-xs ">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateItemQuantity(index, "increase")}
                                                    className="px-3 py-1 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <span className="">Total ({cart.length} Produk):</span>
                                <span className="font-semibold text-color1">
                                    Rp {cart.reduce((acc, item) => acc + (item.price-item.discount) * item.quantity, 0)}
                                </span>
                            </div>
                            <div className="flex justify-between mt-6 space-x-4">
                                <button
                                    onClick={closeModal}
                                    className="w-full px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Tutup
                                </button>
                                <a
                                    href="/checkout"
                                    className="w-full px-4 py-2 text-sm text-center text-white rounded bg-color1 hover:bg-red-800"
                                >
                                    Checkout
                                </a>
                            </div>
                        </>
                    )
                    : 
                    (
                        <div className="flex flex-col items-center justify-center p-8">
                                <img src="/img/empty-cart.png" className="mb-8 w-28" alt="" />
                                <p className="text-sm text-slate-700">Tidak ada product di keranjang!</p>
                        

                        </div>
                    )
                }
                

                
            </div>
        </div>
    )
}

export default CartModal
