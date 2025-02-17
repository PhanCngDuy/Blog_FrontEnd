import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const Hero = () => {
    const [keyword, setKeyword] = useState('');

    return (
        <section className="container mx-auto flex flex-col px-5 py-5 lg:flex-row">
            <div className="mt-10 lg:w-1/2 lg:pr-5 flex-shrink-0">
                <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
                    Read the most interesting articles
                </h1>
                <p className="text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua
                </p>
                <form
                    method="get"
                    action="/searching"
                    className="flex flex-col gap-y-2.5 mt-10 lg:mt-6 xl:mt-10 relative"
                >
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
                        <input
                            className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4 border-transparent focus:border-orange-400 focus:border-2 focus:ring-orange-400"
                            type="text"
                            name="q"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Search article"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2"
                    >
                        Search
                    </button>
                </form>
            </div>
            <div className="hidden lg:block lg:1/2">
                <img className="w-full rounded-lg" src="/banner-2.jpg" alt="users are reading articles" />
            </div>
        </section>
    );
};

export default Hero;
