import React from 'react'
import axiosInstance from '../../services/axiosInstance'

const CartModal = ({cart, closeModal, updateItemQuantity}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg relative shadow-lg">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
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

                <h2 className="text-xl  font-semibold mb-8 text-center text-color1">Keranjang Belanja</h2>
                {
                    cart.length > 0 ? (
                        <>
                            <div className="overflow-y-auto max-h-96">
                                <ul>
                                    {cart.map((item, index) => (
                                        <li key={index} className="flex justify-between items-center mb-4 border-b pb-4">
                                            <div className="flex items-center">
                                                <img
                                                    src={`${axiosInstance.defaults.baseURL}/storage/${item.thumbnail}`}                                     
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-md mr-4"
                                                />
                                                <div>
                                                    <span className="block font-medium">{item.name}</span>
                                                    <span className="text-xs">
                                                        {item.discount > 0 && (
                                                            <span className='text-xs me-2 text-red-500'>
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
                                                    className="px-3 py-1 bg-gray-200 rounded text-sm text-gray-600 hover:bg-gray-300 focus:outline-none"
                                                >
                                                    -
                                                </button>
                                                <span className=" text-xs">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateItemQuantity(index, "increase")}
                                                    className="px-3 py-1 bg-gray-200 rounded text-sm text-gray-600 hover:bg-gray-300 focus:outline-none"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex justify-between items-center mt-6">
                                <span className="">Total ({cart.length} Produk):</span>
                                <span className="font-semibold text-color1">
                                    Rp {cart.reduce((acc, item) => acc + (item.price-item.discount) * item.quantity, 0)}
                                </span>
                            </div>
                            <div className="mt-6 flex justify-between space-x-4">
                                <button
                                    onClick={closeModal}
                                    className="w-full bg-gray-200 text-gray-800 px-4 py-2 text-sm rounded  hover:bg-gray-300"
                                >
                                    Tutup
                                </button>
                                <a
                                    href="/checkout"
                                    className="w-full bg-color1 text-white text-center px-4 py-2 text-sm rounded hover:bg-red-800"
                                >
                                    Checkout
                                </a>
                            </div>
                        </>
                    )
                    : 
                    (
                        <div className="flex flex-col  justify-center items-center p-8">
                                <img src="/img/empty-cart.png" className="w-28 mb-8" alt="" />
                                <p className="text-slate-700 text-sm">Tidak ada product di keranjang!</p>
                        

                        </div>
                    )
                }
                

                
            </div>
        </div>
    )
}

export default CartModal
