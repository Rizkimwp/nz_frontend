import { Link } from "react-router-dom"
import Contact from "../components/Contact"



const Hero = () =>{
    return(
        <section className="w-full  mt-20 relative -z-10 border-b-2 overflow-hidden border-color1" id="home">
            <div className="w-full h-[250px] bg-color1"></div>
            <div className="w-full h-[350px] bg-color2 lg:before:content-['NAZEERA'] md:before:content-['NZR']  before:content-['NR'] text-[250px] md:before:text-[30vw] lg:before:text-[20vw] before:text-[#F8CFA9] before:font-bold before:font-inter before:absolute  before:w-full  before:text-center"></div>
            <img src="img/boci mangkuk.png" alt="" className="absolute top-1/2 transform -translate-y-1/2 right-1/2 translate-x-1/2 w-[300px] md:w-[400px]"/>

            {/* right */}
            <img src="img/arrow_right.png" alt="" className="absolute top-10  right-[10%] w-[100px]  md:w-[150px] lg:w-[200px] lg:right-[20%]" />
            <img src="img/arrow_left.png" alt="" className="absolute top-10  left-[15%] w-[100px]  md:w-[150px] lg:w-[200px] lg:left-[20%]" />
        </section>
    )
}


const CardService = ({gambar, judul, desc}) => {
    return(
        <div className="p-7 "> 
            <img src={`img/${gambar}`}  alt="nazeera services" className="w-[100px] mx-auto mb-3" />
            <p className="text-center text-color4 font-bold text-lg mb-3">{judul}</p>
            <p className="text-color4 font-light text-[12px] text-center">{desc}</p>
        </div>
    )
}




function Home() {
    return (
        <>
            <Hero/>
            <section className="bg-color2 py-20" >
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3  gap-4">
                        <div className="col-span-1 lg:col-span-2">
                            <h1 className="font-black text-[60px]  md:text-[70px] font-roboto text-color1 leading-none mb-7" >RASAKAN PEDASNYA <span className="text-color4">DI SETIAP GIGITAN</span></h1>
                            <p className="text-color4 text-lg">Segera cicipi bakso aci kami yang spesial dan rasakan sensasi kenyalnya bakso yang berbeda dari yang lainnya. Harga terjangkau dengan porsi yang cukup membuat bakso aci kami menjadi pilihan yang tepat untuk makan siang atau malam Anda. Tunggu apalagi, pesan sekarang juga!</p>
                            <Link to="/products" className=" text-color1 inline-block  mt-3 font-bold text-lg  transition-all duration-300 hover:translate-x-5">Pesan Sekarang <i className="fa-solid fa-arrow-right ml-2"></i></Link>
                        </div>
                        <div className="flex justify-center">
                            <img src="img/boci mangkuk up.png" alt=""  className="w-[450px] md:w-[400px] lg:w-[450px]" />
                        </div>
                    </div>
                </div>
            </section>

            {/* parallax bg */}
            <section className=" h-[300px] md:h-[400px] bg-[url('/img/bg-parallax.jpg')] bg-cover bg-center bg-fixed flex justify-center"> 
                <img src="img/fresh_text.png" alt=""  className="self-center w-[80%] md:w-[60%]"/>
            </section>

            <section className=" bg-color2 py-20 border-b-2 border-color1" id="about">
                <div className="container grid grid-cols-1 md:grid-cols-2 mx-auto">
                    <div className="col-span-1 mb-7">
                        <img src="img/5 1.png" alt=""  className="w-full md:w-[90%] md:rounded-none "/>
                    </div>
                    <div className="col-span-1 flex justify-center">
                        <div className="self-center">
                            <h1 className="font-black text-[60px]  md:text-[70px] font-roboto text-color1 leading-none mb-7">Tentang Nazeera <span className="text-color4">Snack and Food</span></h1>
                            <p className="text-color4 text-lg">kami menyediakan produk makanan berupa boci, macaroni, dll. Kami mempermudah pemesanan makanan dengan sistem online yang praktis dan mudah digunakan. Kami memahami bahwa kepuasan pelanggan adalah hal yang paling penting bagi bisnis kami. Oleh karena itu, kami berusaha untuk menawarkan layanan yang baik dan cepat, dengan tim support yang siap membantu Anda setiap saat.</p>
                        </div>
                    </div>
                </div>

            </section>


            <section className=" py-14 bg-color2">
                <div className="w-[70%] container mx-auto  grid  grid-cols-1 md:grid-cols-3 gap-10 p-0">
                    <CardService gambar="kualitas.png" judul="Makanan Yang Berkualitas" desc="Makanan berkualitas tinggi yang menggoda selera Anda." />
                    <CardService gambar="cepat.png" judul="Pengantaran Cepat" desc="Pesanan Anda, Prioritas Kami. Pengantaran Cepat yang Terpercaya." />
                    <CardService gambar="nikmat.png" judul="Rasa Yang Lezat" desc="Sensasi Lidah yang Memikat. Setiap Hidangan adalah Petualangan Rasa." />                 
                </div>
            </section>
            {/* <HomeGallery/> */}
            <section className="py-20 bg-color1">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="col-span-1 text-white mb-7">
                            <h1 className="text-[40px] font-black">Nazeera</h1>
                            <h1 className="text-[40px] font-black -mt-3">Snack and Food</h1>
                            <p className="text-[17px] mt-3">Jelajahi Dunia Baso Aci Bersama Kami! Dengan berbagai pilihan dan variasi rasa, kami adalah tujuan utama bagi penggemar baso aci sejati.</p>
                        </div>
                        <div className="col-span-2 lg:pl-16">
                            <img src="img/boci -2.png" alt="" className="w-full" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-7">
                        <div className="col-span-2">
                            <img src="img/mkroni nr.png" alt=""  className="w-full"/>
                        </div>
                        <div className="col-span-2 grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <img src="img/baso nazeeraa.png" alt="" className="w-full" />
                            </div>
                            <div className="col-span-1">
                                <img src="img/makaroni nazeeraaa.png" alt=""  className="w-full"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* parallax */}
            <section className=" h-[300px] md:h-[400px] bg-[url('/img/bg-parallax.jpg')] bg-cover bg-center bg-fixed flex justify-center"> 
                <img src="img/fresh_text.png" alt=""  className="self-center w-[80%] md:w-[60%]"/>
            </section>



            {/* contact */}
            <Contact/>
            
            

        
        </>
    )
}

export default Home
