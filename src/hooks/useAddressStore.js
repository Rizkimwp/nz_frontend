import { create } from "zustand";
import axiosInstance from "../services/axiosInstance";
const BASE_ADDRESS_ORIGIN = "18757";

export const useAddressStore = create((set, get) => {

    const updateAddresses = (updatedAddresses) => {
        localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
        set({ addresses: updatedAddresses });
        console.log("Addresses updated:", updatedAddresses); // Log perubahan

    };

    return {
        addresses: JSON.parse(localStorage.getItem("addresses")) || [],

        setAddresses: (updatedAddresses) => {
            updateAddresses(updatedAddresses);
        },

        addAddress: (newAddress) => {
            if (!newAddress) return;
            const addresses = get().addresses || [];
            const updatedAddresses = [...addresses, newAddress];
            updateAddresses(updatedAddresses);
        },

        removeAddress: (index) => {
            const addresses = get().addresses;
            const updatedAddresses = addresses.filter((_, i) => i !== index);
            updateAddresses(updatedAddresses);
        },

        clearAddresses: () => {
            updateAddresses([]);
        },

        couriers : null,
        selectedAddress: null,
        setSelectedAddress: async (index) => {
            const addresses = get().addresses;
            const selectedAddress = addresses[index] || null;
            set({ selectedAddress });

            if (selectedAddress?.destination?.id) {
                try {
                    const response = await axiosInstance.post("/api/raja-ongkir/cost", {
                        origin: BASE_ADDRESS_ORIGIN,
                        destination: selectedAddress.destination.id.toString(),
                        weight: 1000,
                    });
                    set({ couriers: response.data });
                    console.log("Couriers fetched:", response.data);

                } catch (error) {
                    console.error("Error fetching coriers:", error);
                }
            } else {
                set({ couriers: null });
            }
        },

        getAddressByIndex: (index) => {
            const addresses = get().addresses;
            return addresses[index] || null;
        },
        
        
    };

});

// Langganan perubahan di komponen
useAddressStore.subscribe((state) => {
    console.log("Addresses state changed:", state.addresses);
});
