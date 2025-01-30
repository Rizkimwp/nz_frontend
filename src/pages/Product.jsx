import React, {Suspense, useState} from 'react'
import { useFetchProduct } from '../features/useFetchProduct'
const ProductCard = React.lazy(() => import('../components/ProductCard'));
import ProductModal from '../components/ProductModal';

const SkeletonCard = () => {
    return(
        <div className="bg-white border border-[#f6f6f6] rounded overflow-hidden animate-pulse">
            <div className="w-full md:h-46 lg:h-64 bg-red-100"></div>
            <div className="p-4">
                <div className="w-2/3 h-4 bg-gray-300 mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-300"></div>
            </div>
        </div>
    )
}



const ProductPage = () => {
    const { data, isLoading, isError } = useFetchProduct();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleClickModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true)
        document.body.style.overflow = "hidden";
        // console.log(product)
    }
    return (
        <div className="py-20 bg-color2 cotainer min-h-screen">
            {/* sampul iklan diskon */}
            <div className="bg-color1 h-[300px] md:h-[400px] bg-[url('/img/bg-parallax.jpg')] bg-cover bg-center bg-fixed flex justify-center items-center ">
                <div className='text-white text-center'>
                    <h1 className="text-7xl font-bold mb-5">PRODUK</h1>
                    <p>Pilih dan Masukkan ke dalam Keranjang</p>
                </div>
            </div>

            <div className="container mx-auto mt-10 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading &&
                [1, 2, 3, 4].map((index) => <SkeletonCard key={index} />)}
            {data?.data.map((product, index) => (
                <Suspense key={index} fallback={<SkeletonCard />}>
                <ProductCard
                    product={product}
                    handleClick={() => handleClickModal(product)}
                />
                </Suspense>
            ))}
            </div>
            {
                showModal && (
                    <ProductModal product={selectedProduct} setModal={setShowModal} />
                )
            }
        </div>
    );
}

export default ProductPage
