import axiosInstance from "../services/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetDestinationQuery = (search) => {
    return useQuery(
        ['destinations', search],
        async () => {
            const { data } = await axiosInstance.get('/api/raja-ongkir/destination', {
                params: { search }
            });
            return data;
        },
        {
            enabled: !!search, 
            refetchOnWindowFocus: false,
        }
    );
};
