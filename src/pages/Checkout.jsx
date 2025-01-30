import { useAddressStore } from "../hooks/useAddressStore";
import { useCartStore } from "../hooks/useCartStore";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import AddressModal from "../components/checkout/AddressModal";
import ErrorBoundary from "../components/boundary/ErrorBoundary";


const Checkout = () => {
    const { cart, removeFromCart } = useCartStore();
    const { selectedAddress, couriers } = useAddressStore();
    const [isModalVisible, setIsModalVisible] = useState(false);
    //selectedCourierGroup
    const [selectedCourierGroup, setSelectedCourierGroup] = useState("");
    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);
    const [selectedCourier, setSelectedCourier] = useState("");
    

    const calculateTotalProductPrice = () => {
        return cart.reduce(
            (total, item) => total + (item.price - item.discount) * item.quantity,
            0
        );
    };

    const formatCurrency = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };


  

    console.log(selectedCourier);

    return (
        <div className="mt-20">
            <div className="mx-auto bg-white shadow-md rounded-lg py-5 px-10 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Checkout</h1>

            {/* Bagian Alamat Pengiriman */}
            <div className="border border-red-200 rounded p-5 my-5 mb-10">
                <p className="text-sm flex items-center gap-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
                Alamat Pengiriman
                </p>
                <hr className="mt-5" />
                {selectedAddress !== null ? (
                <>
                    <div className="mt-5 flex justify-between gap-5 items-center">
                    <p className="text-sm space-x-4">
                        <span className="font-semibold text-lg">
                        {selectedAddress?.fullName}
                        </span>
                        <span>{selectedAddress?.phone}</span>
                        <span>{selectedAddress?.destination?.label}</span>
                        <span>{selectedAddress?.fullAddress}</span>
                    </p>
                    <button
                        onClick={openModal}
                        className="bg-red-600 text-white px-3 py-1 rounded-sm"
                    >
                        Ubah
                    </button>
                    </div>
                </>
                ) : (
                <div className="text-sm text-gray-600 mt-8 flex justify-between">
                    <p>
                    Alamat Pengiriman belum ditambahkan. Silahkan pilih terlebih
                    dahulu
                    </p>
                    <button
                    onClick={openModal}
                    className="bg-red-600 text-white px-3 py-1 rounded-sm"
                    >
                    + Tambah Alamat
                    </button>
                </div>
                )}
            </div>

            {/* Cart items */}
            {cart.length === 0 ? (
                <p className="text-gray-500 text-center">
                Keranjang Anda kosong. Tambahkan beberapa produk!
                </p>
            ) : (
                <>
                <div className="space-y-4">
                    {cart.map((item) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center border-b pb-4"
                    >
                        <div className="sm:col-span-2 flex justify-center">
                        <img
                            src={`${axiosInstance.defaults.baseURL}/storage/${item.thumbnail}`}
                            alt={item.name}
                            className="w-full md:w-20 md:h-20 object-cover rounded-md"
                        />
                        </div>
                        <div className="sm:col-span-5">
                        <h2 className="text-lg font-semibold text-gray-700">
                            {item.name}
                        </h2>
                        <p className="text-sm">
                            {item.discount > 0 && (
                            <span className="text-xs me-2 text-red-500">
                                <s>{formatCurrency(item.price)}</s>
                            </span>
                            )}
                            <span className="text-slate-700 font-roboto">
                            {formatCurrency(item.price - item.discount)}
                            </span>
                        </p>
                        </div>
                        <div className="sm:col-span-2 flex sm:justify-center">
                        <p className="text-sm text-gray-700">
                            Kuantitas:{" "}
                            <span className="font-medium">{item.quantity}</span>
                        </p>
                        </div>
                        <div className="sm:col-span-2 text-sm font-semibold text-gray-700 flex sm:justify-center">
                        {formatCurrency(
                            (item.price - item.discount) * item.quantity
                        )}
                        </div>
                        <div className="sm:col-span-1 flex justify-center">
                        <button
                            className="bg-color1 text-white p-2 rounded-full text-sm hover:opacity-80"
                            onClick={() => removeFromCart(item.id)}
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="currentColor"
                            className="bi bi-trash3"
                            viewBox="0 0 16 16"
                            >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                {couriers !== null && (
                    <div className="flex justify-between mt-10 gap-5">
                        {/* Pilih Grup Kurir */}
                        <div className="w-full">
                        <select
                            value={selectedCourierGroup}
                            onChange={(e) => setSelectedCourierGroup(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Pilih Grup Kurir</option>
                            {Object.values(
                            couriers.data.reduce((acc, courier) => {
                                if (!acc[courier.name]) {
                                acc[courier.name] = [];
                                }
                                acc[courier.name].push(courier);
                                return acc;
                            }, {})
                            ).map((group) => (
                            <option key={group[0].code} value={group[0].code}>
                                {group[0].name}
                            </option>
                            ))}
                        </select>
                        </div>

                        {/* Pilih Kurir dalam Grup */}
                        <div className="w-full">
                        {selectedCourierGroup && (
                            <select
                            value={selectedCourier}
                            onChange={(e) => setSelectedCourier(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            >
                            <option value="">Pilih Kurir</option>
                            {Object.values(
                                couriers.data.reduce((acc, courier) => {
                                if (!acc[courier.name]) {
                                    acc[courier.name] = [];
                                }
                                acc[courier.name].push(courier);
                                return acc;
                                }, {})
                            )
                                .filter((group) => group[0].code === selectedCourierGroup)
                                .flatMap((group) =>
                                group.map((courier) => (
                                    <option key={courier.service} value={JSON.stringify(courier)}>
                                    {courier.service} - {courier.description} - {courier.cost} {courier.etd ? `(${courier.etd})` : " ( Tidak ada estimasi )"}
                                    </option>
                                ))
                                )}
                            </select>
                        )}
                        </div>
                    </div>
                    )}


                <div className="mt-10 flex justify-end border-2 rounded">
                    <div className="w-full sm:w-1/2 lg:w-1/3 bg-gray-50 p-7">
                    <div className="flex justify-between mb-8">
                        <span className="text-sm text-gray-600">
                        Subtotal untuk Produk
                        </span>
                        <span className="font-semibold">
                        {formatCurrency(calculateTotalProductPrice())}
                        </span>
                    </div>
                    <div className="flex justify-between mb-8">
                        <span className="text-sm text-gray-600">
                        Subtotal Pengiriman
                        </span>
                        <span className="font-semibold">{selectedCourier ? formatCurrency(JSON.parse(selectedCourier)?.cost) : 0}</span>
                    </div>

                    <div className="border-t border-gray-300 my-3"></div>
                    <div className="flex justify-between">
                        <span className="font-bold">Total Pembayaran</span>
                        <span className="font-bold text-red-600">
                        {formatCurrency(
                            calculateTotalProductPrice() + (selectedCourier ? JSON.parse(selectedCourier)?.cost : 0)
                        )}
                        </span>

                    </div>
                    <button className="w-full mt-10 bg-red-600 text-white py-2 rounded hover:bg-red-700">
                        Buat Pesanan
                    </button>
                    </div>
                </div>
                </>
            )}
            </div>
            {isModalVisible && (
            <ErrorBoundary>
                <AddressModal closeModal={closeModal} />
            </ErrorBoundary>
            )}
        </div>
    );
};

export default Checkout;


// export default Checkout;

