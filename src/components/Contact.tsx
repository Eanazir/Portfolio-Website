import { MdArrowOutward, MdCopyright } from "react-icons/md";

const Contact = () => {
    return (
        <div className="mx-auto mt-[120px] w-[90%] max-w-[1600px]" id="contact">
            <h3 className="text-[70px] font-normal uppercase m-0 mb-[20px] tracking-wide">CONTACT</h3>

            <div className="flex justify-between mt-[30px] md:flex-row flex-col md:gap-0 gap-[50px]">
                {/* Left column - Contact Info */}
                <div className="flex flex-col">
                    <h4 className="font-medium m-0 opacity-60 text-lg mb-[10px]">Email</h4>
                    <p className="mt-0 mb-[30px] text-base opacity-90">
                        <a href="mailto:Eyadakn2017@gmail.com" data-cursor="disable" className="hover:text-[#97fdf7]">
                            Eyadakn2017@gmail.com
                        </a>
                    </p>

                    <h4 className="font-medium m-0 opacity-60 text-lg mb-[10px]">Location</h4>
                    <p className="mt-0 mb-[30px] text-base opacity-90">
                        Seattle, WA
                    </p>
                </div>

                {/* Middle column - Social Links */}
                <div className="flex flex-col">
                    <h4 className="font-medium m-0 opacity-60 text-lg mb-[10px]">Social</h4>

                    <a
                        href="https://github.com/Eanazir"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="disable"
                        className="text-[25px] border-b border-[rgba(204,204,204,0.3)] pb-[5px] mb-[15px] flex items-center gap-[5px] transition-all duration-300 hover:border-[#97fdf7] hover:text-[#97fdf7] lg:text-[25px] md:text-[22px] sm:text-[20px]"
                    >
                        Github <MdArrowOutward />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/eyad-nazir/"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="disable"
                        className="text-[25px] border-b border-[rgba(204,204,204,0.3)] pb-[5px] mb-[15px] flex items-center gap-[5px] transition-all duration-300 hover:border-[#97fdf7] hover:text-[#97fdf7] lg:text-[25px] md:text-[22px] sm:text-[20px]"
                    >
                        Linkedin <MdArrowOutward />
                    </a>

                    <a
                        href="https://x.com/Eyadakn1"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="disable"
                        className="text-[25px] border-b border-[rgba(204,204,204,0.3)] pb-[5px] mb-[15px] flex items-center gap-[5px] transition-all duration-300 hover:border-[#97fdf7] hover:text-[#97fdf7] lg:text-[25px] md:text-[22px] sm:text-[20px]"
                    >
                        Twitter <MdArrowOutward />
                    </a>

                    <a
                        href="https://www.instagram.com/eyadakn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="disable"
                        className="text-[25px] border-b border-[rgba(204,204,204,0.3)] pb-[5px] mb-[15px] flex items-center gap-[5px] transition-all duration-300 hover:border-[#97fdf7] hover:text-[#97fdf7] lg:text-[25px] md:text-[22px] sm:text-[20px]"
                    >
                        Instagram <MdArrowOutward />
                    </a>
                </div>

                {/* Right column - Credits */}
                <div className="flex flex-col md:mt-0 mt-[20px]">
                    <h2 className="font-normal text-[23px] m-0 leading-normal lg:text-[23px] md:text-[20px] sm:text-[18px]">
                        Designed and Developed <br /> by <span className="text-[#97fdf7]">Eyad Nazir</span>
                    </h2>
                    <h5 className="text-xl font-medium leading-[20px] flex gap-[10px] opacity-50 mt-[15px] items-center">
                        <MdCopyright /> 2024
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default Contact; 