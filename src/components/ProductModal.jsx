import { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { useCartStore } from "../hooks/useCartStore";

const ProductModal = ({ product, setModal }) => {
    const { addToCart } = useCartStore();
    const [quantity, setQuantity] = useState(1);

    // Handle tambah keranjang
    const handleAddToCart = () => {
        addToCart(product, quantity); 
        console.log(
            `Produk "${product.name}" dengan jumlah ${quantity} ditambahkan ke keranjang.`
        );
        setModal(false);
        document.body.style.overflow = "auto";

    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out bg-black bg-opacity-50">
            <div className="relative w-11/12 p-6 transition-transform duration-300 ease-out transform scale-100 bg-white rounded-lg shadow-2xl md:w-2/3 lg:w-1/2 animate-fade-in-scale">
                {/* Tombol close */}
                <button
                    onClick={() => {
                        setModal(false);
                        document.body.style.overflow = "auto";
                    }}
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

                {/* Konten modal */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Gambar produk */}
                    <div className="w-full h-64">
                        <div className="relative w-full h-full">
                            <img
                                src={`${axiosInstance.defaults.baseURL}${product.thumbnail}`}
                                alt="Product Thumbnail"
                                className="absolute inset-0 object-cover w-full h-full rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Detail produk */}
                    <div className="space-y-4 font-roboto">
                        <h2 className="text-2xl text-gray-800">{product.name}</h2>
                        <p>
                            {product.discount > 0 && (
                                <span className="text-red-500 me-2">
                                    <s>Rp. {product.price}</s>
                                </span>
                            )}
                            <span className="text-xl font-bold text-slate-700 font-roboto">
                                Rp. {product.price - product.discount}
                            </span>
                        </p>
                        <p className="text-sm text-gray-500">
                            {product.description || "Deskripsi produk belum tersedia."}
                        </p>

                        {/* Tombol jumlah dan tambah keranjang */}
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                                    className="px-3 py-1 text-gray-700 transition bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    -
                                </button>
                                <span className="text-lg font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity((prev) => prev + 1)}
                                    className="px-3 py-1 text-gray-700 transition bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="px-4 py-2 text-xs text-white transition rounded-lg bg-color1 hover:bg-red-800 focus:outline-none"
                            >
                                Tambahkan ke Keranjang
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ProductModal;
