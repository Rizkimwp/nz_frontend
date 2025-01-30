import { useRef, useState } from "react"
import { useCartStore } from "../hooks/useCartStore"
import { useLocation } from "react-router-dom";
import CartModal from "./cart/CartModal";


function Navbar() {
    const { cart, setCart } = useCartStore(); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    const location = useLocation();
    const humbergerRef = useRef();
    const navMenuRef = useRef();
    const iconRef = useRef();

    const handleHumbergerClick = () => {
        iconRef.current.classList.toggle("fa-bars");
        iconRef.current.classList.toggle("fa-x");
        navMenuRef.current.classList.toggle("active");
    };

    const scrollToTarget = (targetId) => {
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: "smooth" });
    };

    const handleCartClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const updateItemQuantity = (index, action) => {
        const updatedCart = [...cart];
        const item = updatedCart[index];

        if (action === "increase") {
            item.quantity += 1;
        } else if (action === "decrease" && item.quantity > 1) {
            item.quantity -= 1;
        } else if (action === "decrease" && item.quantity === 1) {
            updatedCart.splice(index, 1);
        }

        setCart(updatedCart); 
        localStorage.setItem("cart", JSON.stringify(updatedCart)); 
    };

    const isHomePage = location.pathname === "/"; 

    return (
        <header>
            <section className=" bg-color1 fixed top-0 w-full  ">
                <div className=" py-7 flex justify-center relative h-[80px]">
                    <div className="absolute w-[170px] z-30  top-1/2 left-0 lg:left-1/2 transform lg:-translate-x-1/2 -translate-y-1/2 transition-all duration-75">
                        <a href="">
                            <img src="img/logo nazeera.png" alt="" className="w-full"/>
                        </a>
                    </div>
                    <ul className="w-full lg:flex shadow overflow-hidden lg:overflow-visible lg:shadow-none py-0 max-h-0 lg:max-h-none pt-0 transform lg:-translate-y-0 lg:p-0 text-center self-center absolute lg:static bg-color1 lg:w-auto top-full transition-all duration-500" ref={navMenuRef} id="nav-menu">
                        <div className="lg:flex lg:mr-60">
                            <li><a className="cursor-pointer" href="/">Beranda</a></li>
                            {isHomePage ? (
                                <li><a className="cursor-pointer" onClick={() => scrollToTarget('about')}>Tentang Kami</a></li>
                            ) : (
                                <li><a className="cursor-pointer" href="/#about">Tentang Kami</a></li>
                            )}
                        </div>
                        <div className="lg:flex">
                            <li><a href="/products">Produk</a></li>
                            {isHomePage ? (
                                <li><a className="cursor-pointer" onClick={() => scrollToTarget('contact')}>Hubungi Kami</a></li>
                            ) : (
                                <li><a className="cursor-pointer" href="/#contact">Hubungi Kami</a></li>
                            )}
                        </div>
                    </ul>

                    {/* Cart Modal */}
                    <div onClick={handleCartClick} className="cart absolute w-10 right-20 lg:right-10 top-1/2 transform -translate-y-1/2 cursor-pointer">
                        <img src="img/cart.svg" alt="" className="w-full"/>
                        <div className="absolute w-5 h-5 bg-red-400 rounded-full border-2 border-color1 -right-1 top-1 flex justify-center">
                            <span className="text-[10px] text-white">
                                {cart.length}
                            </span>
                        </div>
                    </div>

                    {/* Hamburger Menu */}
                    <div id="humberger-menu" ref={humbergerRef} onClick={handleHumbergerClick} className=" absolute flex justify-cente text-white hover:text-color2  w-8 h-8 right-7  top-1/2 transform -translate-y-1/2 cursor-pointer lg:hidden">
                        <i className="fa fa-bars text-xl self-center " id="icon-humberger" ref={iconRef}></i>
                    </div>
                </div>
            </section>

            
            {isModalOpen && (
                <CartModal cart={cart} closeModal={closeModal} updateItemQuantity={updateItemQuantity} />
            )}
        </header>
    );
}


export default Navbar
