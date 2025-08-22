import { useAddressStore } from "../hooks/useAddressStore";
import { useCartStore } from "../hooks/useCartStore";
import { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import AddressModal from "../components/checkout/AddressModal";
import ErrorBoundary from "../components/boundary/ErrorBoundary";
import Swal from "sweetalert2";

const Checkout = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const { selectedAddress, couriers } = useAddressStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

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

  const handleCheckout = async () => {
    if (!selectedAddress || !selectedCourier) {
      Swal.fire("Peringatan", "Harap lengkapi alamat dan kurir", "warning");
      return;
    }
    if (!paymentMethod) {
      Swal.fire("Peringatan", "Silakan pilih metode pembayaran", "warning");
      return;
    }
    const courierData = JSON.parse(selectedCourier);

    const payload = {
      name: selectedAddress.fullName,
      phone: selectedAddress.phone,
      email: selectedAddress.email, // kamu bisa pakai email yang login juga kalau ada
      address: selectedAddress.fullAddress,
      courier: courierData,
      products: cart.map((item) => ({
        product_id: item.id, // sesuai yang dibaca di `$prod['product_id']`
        quantity: item.quantity,
      })),
      total: calculateTotalProductPrice() + courierData.cost,
      payment_method: paymentMethod, // ⬅️ ini penting
    };

    try {
      const res = await axiosInstance.post("/api/checkout", payload);
      const snapToken = res.data.snap_token;

      window.snap.pay(snapToken, {
        onSuccess: async function (result) {
          Swal.fire("Sukses", "Pembayaran berhasil!", "success");

          try {
            const payload = {
              transaction_id: result.transaction_id, // atau `id` sesuai kebutuhan API-mu
            };

            const res = await axiosInstance.post("/api/markAsPaid", payload);

            if (res.data.status) {
              console.log(
                "Transaksi ditandai sebagai dibayar:",
                res.data.message
              );
              clearCart();
            } else {
              console.error("Gagal update pembayaran:", res.data.message);
            }
          } catch (error) {
            console.error("Error saat update pembayaran:", error);
          }
        },
        onPending: function () {
          Swal.fire("Menunggu", "Menunggu pembayaran...", "info");
        },
        onError: async function (result) {
          Swal.fire("Gagal", "Pembayaran gagal", "error");

          try {
            await axiosInstance.post(
              "/api/cancelTransaction/" + result.transaction_id
            );
          } catch (error) {
            console.error("Gagal membatalkan transaksi:", error);
          }
        },
        onClose: async function (result) {
          Swal.fire(
            "Pembayaran gagal",
            "Jangan menutup jendela pembayaran",
            "error"
          );
          try {
            await axiosInstance.post(
              "/api/cancelTransaction/" + result.transaction_id
            );
          } catch (error) {
            console.error("Gagal membatalkan transaksi:", error);
          }
        },
      });
    } catch (err) {
      console.error("Gagal membuat pesanan:", err);
      Swal.fire("Error", "Gagal membuat pesanan", "error");
    }
  };

  return (
    <div className="mt-20">
      <div className="min-h-screen px-10 py-5 mx-auto bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-700">Checkout</h1>

        {/* Bagian Alamat Pengiriman */}
        <div className="p-5 my-5 mb-10 border border-red-200 rounded">
          <p className="flex items-center gap-3 text-sm">
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
              <div className="flex items-center justify-between gap-5 mt-5">
                <p className="space-x-4 text-sm">
                  <span className="text-lg font-semibold">
                    {selectedAddress?.fullName}
                  </span>
                  <span>{selectedAddress?.phone}</span>
                  <span>{selectedAddress?.destination?.label}</span>
                  <span>{selectedAddress?.fullAddress}</span>
                </p>
                <button
                  onClick={openModal}
                  className="px-3 py-1 text-white bg-red-600 rounded-sm"
                >
                  Ubah
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-between mt-8 text-sm text-gray-600">
              <p>
                Alamat Pengiriman belum ditambahkan. Silahkan pilih terlebih
                dahulu
              </p>
              <button
                onClick={openModal}
                className="px-3 py-1 text-white bg-red-600 rounded-sm"
              >
                + Tambah Alamat
              </button>
            </div>
          )}
        </div>

        {/* Cart items */}
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">
            Keranjang Anda kosong. Tambahkan beberapa produk!
          </p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid items-center grid-cols-1 gap-4 pb-4 border-b sm:grid-cols-12"
                >
                  <div className="flex justify-center sm:col-span-2">
                    <img
                      src={`${axiosInstance.defaults.baseURL}${item.thumbnail}`}
                      alt={item.name}
                      className="object-cover w-full rounded-md md:w-20 md:h-20"
                    />
                  </div>
                  <div className="sm:col-span-5">
                    <h2 className="text-lg font-semibold text-gray-700">
                      {item.name}
                    </h2>
                    <p className="text-sm">
                      {item.discount > 0 && (
                        <span className="text-xs text-red-500 me-2">
                          <s>{formatCurrency(item.price)}</s>
                        </span>
                      )}
                      <span className="text-slate-700 font-roboto">
                        {formatCurrency(item.price - item.discount)}
                      </span>
                    </p>
                  </div>
                  <div className="flex sm:col-span-2 sm:justify-center">
                    <p className="text-sm text-gray-700">
                      Kuantitas:{" "}
                      <span className="font-medium">{item.quantity}</span>
                    </p>
                  </div>
                  <div className="flex text-sm font-semibold text-gray-700 sm:col-span-2 sm:justify-center">
                    {formatCurrency(
                      (item.price - item.discount) * item.quantity
                    )}
                  </div>
                  <div className="flex justify-center sm:col-span-1">
                    <button
                      className="p-2 text-sm text-white rounded-full bg-color1 hover:opacity-80"
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
              <div className="flex justify-between gap-5 mt-10">
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
                        .filter(
                          (group) => group[0].code === selectedCourierGroup
                        )
                        .flatMap((group) =>
                          group.map((courier) => (
                            <option
                              key={courier.service}
                              value={JSON.stringify(courier)}
                            >
                              {courier.service} - {courier.description} -{" "}
                              {courier.cost}{" "}
                              {courier.etd
                                ? `(${courier.etd})`
                                : " ( Tidak ada estimasi )"}
                            </option>
                          ))
                        )}
                    </select>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end mt-10 border-2 rounded">
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
                  <span className="font-semibold">
                    {selectedCourier
                      ? formatCurrency(JSON.parse(selectedCourier)?.cost)
                      : 0}
                  </span>
                </div>

                <div className="my-3 border-t border-gray-300"></div>
                <div className="flex justify-between">
                  <span className="font-bold">Total Pembayaran</span>
                  <span className="font-bold text-red-600">
                    {formatCurrency(
                      calculateTotalProductPrice() +
                        (selectedCourier
                          ? JSON.parse(selectedCourier)?.cost
                          : 0)
                    )}
                  </span>
                </div>
                <div className="mt-4 ">
                  <label className="block mb-2 font-semibold">
                    Metode Pembayaran
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Pilih Metode</option>
                    <option value="bank_transfer">
                      Transfer Virtual Account
                    </option>
                    <option value="qris">QRIS</option>
                  </select>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-2 mt-10 text-white bg-red-600 rounded hover:bg-red-700"
                >
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
