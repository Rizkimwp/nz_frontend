

function Footer() {

    const currentYear = new Date().getFullYear();
    return (
        <section className="p-10 bg-black">
            <div className="flex justify-center">
                <img src="img/logo nazeera.png" className="w-[300px]" alt="logo nazeera" />
            </div>
            <div className="text-white text-center mt-5 text-[12px]">
                <p>Kota Serang, Banten, 42131</p>
                <p>+62 857-7374-5810</p>
            </div>
            <p className="text-center mt-12 text-white">Copyright © {currentYear} Nazeera | All rights reserved.</p>
        </section>
    )
}

export default Footer
