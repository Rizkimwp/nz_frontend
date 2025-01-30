import { useState } from "react";
import { useAddressStore } from "../../hooks/useAddressStore";
import { useDebounce } from "use-debounce";
import { useGetDestinationQuery } from "../../features/useDestinationQuery";

const AddressModal = ({ closeModal }) => {
    const { addresses, addAddress,removeAddress, setAddresses, setSelectedAddress  } = useAddressStore();
    const [mode, setMode] = useState("address-list");
    const [search, setSearch] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const [buyerData, setBuyerData] = useState({
        fullName: "",
        phone: "",
        email: "",
        destination : null,
        fullAddress : ""
    });

    const [debouncedSearch] = useDebounce(search, 2000); 
    const { data, isLoading, isError } = useGetDestinationQuery(
    debouncedSearch.trim()
    );

    const handleSelectDestination = (destination) => {
        setBuyerData((prev) => ({
            ...prev,
            destination, 
        }));
        setSearch("");
    }   


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBuyerData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveBuyerData = () => {
        const { fullName, phone, email, destination, fullAddress } = buyerData;

        if (!fullName.trim() || !phone.trim() || !email.trim()  || destination==null || !fullAddress.trim()) {
            // alert("Semua kolom harus diisi.");
            return;
        }

        if (editingIndex !== null) {
            // Edit mode
            const updatedAddresses = [...addresses];
            updatedAddresses[editingIndex] = buyerData;
            setAddresses(updatedAddresses);
            setEditingIndex(null); // Reset mode edit
        } else {
            // Add mode
            addAddress(buyerData);
        }

        // Reset data setelah simpan
        setBuyerData({ fullName: "", phone: "", email: "" });
        setMode("address-list");
    };
    

    const handleEditAddress = (index) => {
            setEditingIndex(index); 
            setBuyerData(addresses[index]); 
            setMode("form");
    };

    // console.log(addresses);


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {mode === "address-list" && (
                <>
                    <h2 className="text-lg font-bold text-gray-700 mb-4">Pilih Alamat</h2>
                    <div className="text-xs max-h-64 overflow-y-scroll">
                        {/* List alamat */}
                        {addresses.length > 0 ? (
                            <ul>
                                {addresses.map((address, index) => (
                                    <li
                                        key={index}
                                        className={`mb-5 p-4 border rounded cursor-pointer ${
                                            selectedIndex === index
                                                ? "border-red-300 bg-red-100"
                                                : "border-gray-300 hover:border-red-300 hover:bg-gray-100"
                                        }`}

                                        onClick={() => setSelectedIndex(index)}
                                    >
                                        <div className="relative justify-between items-center">
                                            <div>
                                                <p>
                                                    <strong>{address.fullName}</strong>
                                                </p>
                                                <p>{address.phone}</p>
                                                <p>{address.destination.label}</p>
                                            </div>
                                            <div className="flex gap-2 absolute top-0 right-0 ">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); 
                                                        handleEditAddress(index);
                                                    }}
                                                    className="text-orange-400 text-xs"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); 
                                                        removeAddress(index);
                                                    }}
                                                    className="text-red-600 text-xs"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-600 mt-8 flex justify-between">
                                Alamat Pengiriman belum ditambahkan.
                            </p>
                        )}
                    </div>

                    <div>
                        <button
                            onClick={() => setMode("form")}
                            className="py-4 text-sm border border-red-300 text-red-300 my-5 hover:border-color1 hover:text-color1 w-full"
                        >
                            + Tambah Data Pembeli
                        </button>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            onClick={closeModal}
                        >
                            Batal
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${
                                selectedIndex !== null
                                    ? "bg-red-600 text-white hover:bg-red-700"
                                    : "bg-gray-300 text-gray-700 cursor-not-allowed"
                            }`}
                            disabled={selectedIndex === null}
                            onClick={() => {
                                setSelectedAddress(selectedIndex);
                                closeModal();
                            }}
                        >
                            Pilih
                        </button>
                    </div>

                </>

            )}
            {mode === "form" && (
                <>
                <h2 className="text-lg font-bold text-gray-700 mb-4">
                    Tambah Data Pembeli
                </h2>
                <div>
                    <input
                    type="text"
                    name="fullName"
                    value={buyerData.fullName}
                    onChange={handleChange}
                    placeholder="Nama Lengkap"
                    className="w-full border rounded px-3 py-2 mb-4 text-sm outline-none"
                    />
                    <input
                    type="number"
                    name="phone"
                    value={buyerData.phone}
                    onChange={handleChange}
                    placeholder="Nomor HP"
                    className="w-full border rounded px-3 py-2 mb-4 text-sm outline-none"
                    />
                    <input
                    type="email"
                    name="email"
                    value={buyerData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border rounded px-3 py-2 mb-4 text-sm outline-none"
                    />
                    <div className="relative">
                    {buyerData.destination ? (
                        <div className="mt-2 flex items-center gap-2 mb-4 px-3 py-2 border">
                        <span className="text-sm text-gray-700">
                            {buyerData.destination.label}
                        </span>
                        <button
                            className="text-xs text-red-500 hover:underline"
                            onClick={() =>
                            setBuyerData((prev) => ({
                                ...prev,
                                destination: null,
                            }))
                            }
                        >
                            Ubah
                        </button>
                        </div>
                    ) : (
                        <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari Destinasi"
                        className="w-full border rounded px-3 py-2 mb-4 text-sm outline-none"
                        />
                    )}
                    {debouncedSearch.trim() !== "" && !buyerData.destination && (
                        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
                        {isLoading ? (
                            <div className="p-4 flex justify-center items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-gray-500"></div>
                            <span className="ml-2 text-sm text-gray-500">
                                Loading...
                            </span>
                            </div>
                        ) : isError ? (
                            <p className="p-2 text-sm text-red-500">
                            {data?.meta?.message || "Error fetching destinations"}
                            </p>
                        ) : data?.data === null ? (
                            <p className="p-4 text-sm text-gray-500">
                            Tidak ada destinasi yang ditemukan.
                            </p>
                        ) : (
                            <ul className="max-h-40 overflow-y-auto text-xs p-2">
                            {data?.data.map((destination) => (
                                <li
                                key={destination.id}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() =>
                                    handleSelectDestination(destination)
                                }
                                >
                                {destination.label}
                                </li>
                            ))}
                            </ul>
                        )}
                        </div>
                    )}
                    </div>

                    <textarea
                    name="fullAddress"
                    value={buyerData.fullAddress}
                    onChange={handleChange}
                    placeholder="Alamat Lengkap"
                    className="w-full border rounded px-3 py-2 mb-4 text-sm outline-none"
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    onClick={() => setMode("address-list")}
                    >
                    Batal
                    </button>
                    <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={handleSaveBuyerData}
                    >
                    Simpan
                    </button>
                </div>
                </>
            )}
            </div>
        </div>
    );
};

export default AddressModal;
