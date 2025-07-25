import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance';

export const useFetchProduct = () => {
    return useQuery(['products'], async () => {
        const { data } = await axiosInstance.get('/api/products');
        return data;
    });
}

export const useFetchProductDetail = (slug) => {
    return useQuery(['products', slug], async () => {
        const { data } = await axiosInstance.get(`/api/products/${slug}`);
        return data;
    });
}