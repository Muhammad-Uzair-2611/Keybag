import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-emerald-800 w-full h-15 text-white'>
            <div className="container mx-auto flex justify-between px-4 sm:px-6 md:px-10 h-full items-center">
                <a href='/ '>
                    <div className="logo flex text-xl sm:text-2xl font-bold [&>span]:text-emerald-300">
                        <span>&lt;</span>
                        <p>Key</p>
                        <span>bag/&gt;</span>
                    </div>
                </a>
                <div className="link text-sm sm:text-base bg-emerald-500 sm:px-3 px-2 py-1 text-black hover:scale-103 transition-all rounded-full">
                    <a className='flex items-center justify-center gap-x-2' href="" target='_blank'>
                        <img width={30} src="/githubLogo.png" alt="Source Code" />
                        <span>Source Code</span>
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
