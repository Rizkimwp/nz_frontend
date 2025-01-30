import { useState } from "react";


function Contact() {

    const [message, setMessage] = useState('');

    const handleSendEmail = (e) => {
        const subject = encodeURIComponent("Pertanyaan dari Pengunjung Website Nazeera");
        const body = encodeURIComponent(
            message
        );

        window.location.href = `mailto:muhammadyusuf@yusufparker.com?subject=${subject}&body=${body}`;
    }

    const handleChangeMessage = (e) =>{
        setMessage(e.target.value)
    }


    return (
        <section id="contact" className="bg-color2 py-20">
            <div className="container mx-auto">
                <div className="max-w-2xl mx-auto text-center mb-5">
                    <h1 className="font-black text-[40px]  md:text-[50px] font-roboto text-color4 leading-none mb-7"><span className="text-color1">Hubungi</span> Kami</h1>
                    <p className="text-color4 -mt-5">Ada pertanyaan? Jangan ragu untuk menghubungi kami!</p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSendEmail}>
                        <div className="mb-4">
                            <input type="text" id="message" name="message" className="w-full mt-1 p-2 border outline-0 px-4 border-gray-300 rounded-2xl" onChange={handleChangeMessage} value={message} required />
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="bg-color1 text-white px-4 py-2 rounded-2xl hover:bg-orange-700 transition-all duration-300">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;
