import React, { useRef, useState } from 'react'

import { ToastContainer, toast, Bounce, Slide } from 'react-toastify';



function ConfirmDelete({ message, onClick, closeToast }) {
    return (
        <div className='space-y-1 '>
            <p className='tracking-wider text-emerald-900 font-semibold '>{message}</p>
            <div className='space-x-4 text-lg [&>button]:cursor-pointer'>
                <button id='yes' className='text-emerald-800' onClick={(e) => onClick(e, closeToast)}>Yes</button>
                <button id='no' className='text-red-600' onClick={(e) => onClick(e, closeToast)} >No</button>
            </div>
        </div>
    );
}

const PassLists = ({ passwordsArray, setpasswordArray, setData }) => {

    //*States & Refrences
    const [isToast, setIsToast] = useState(false)

    //*Functions
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        toast.success('Copied to Clipboard', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
    }
    const handleDelete = (PasswordID) => {
        if (!isToast) {
            const id = toast(<ConfirmDelete
                message="Are you sure?"
                onClick={async (e, closeToast) => {
                    let id = e.target.id
                    if (id === 'yes') {
                        const filterPasses = passwordsArray.filter((pass) => pass.id !== PasswordID)
                        setpasswordArray(filterPasses)
                        let response = await fetch('http://localhost:2611/', {
                            method: 'DELETE', headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: PasswordID })
                        })

                        toast.success('Password Deleted!', {
                            autoClose: 1000,
                            hideProgressBar: true,
                            transition: Slide,
                        })
                    }
                    closeToast()
                    setIsToast(false)

                }}
            />, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
            setIsToast(toast.isActive(id))
            setTimeout(() => {
                setIsToast(false)
            }, 3700);
        }
        // setDeleteConfirmation(true)

    }
    const handleEdit = (password) => {
        setData(password)
        const filterPasses = passwordsArray.filter((pass) => pass.id !== password.id)
        setpasswordArray(filterPasses)
        localStorage.setItem('passwordArray', JSON.stringify([...filterPasses]))
        window.scrollTo(0, 0)

    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
            />
            <div className='w-full flex justify-center px-4 sm:px-6 md:px-8'>
                {passwordsArray.length == 0 ? (
                    <div className=''>
                        <div className='my-5 w-fit font-bold text-sm sm:text-base text-emerald-600 bg-emerald-50 px-6 py-4 rounded-lg shadow-sm'>
                            No Passwords Saved...
                        </div>
                    </div>
                ) : (
                    <div className="w-full">
                        {/* Mobile Card View */}
                        <div className="block sm:hidden space-y-4 my-5">
                            {passwordsArray.map((pass) => (
                                <div key={pass.id}
                                    className="bg-white rounded-xl p-4 space-y-3 shadow-sm border border-emerald-100 
                                              hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                    {/* Site Section */}
                                    <div className="flex items-center justify-between bg-emerald-50 p-2 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/wwcdwkaf.json"
                                                trigger="hover"
                                                title='Copy'
                                                onClick={() => handleCopy(pass.site)}
                                                className="w-5 cursor-pointer text-emerald-600">
                                            </lord-icon>
                                            {pass.site ? (
                                                <a href={pass.site} target='_blank' title={pass.site}
                                                    className='cursor-pointer text-emerald-700 hover:text-emerald-800 text-sm font-medium'>
                                                    {pass.site}
                                                </a>
                                            ) : (
                                                <span className="text-sm text-emerald-700">No Site</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-emerald-500 bg-emerald-100 px-2 py-1 rounded-full">
                                                Site
                                            </span>
                                        </div>
                                    </div>

                                    {/* Username Section */}
                                    <div className="flex items-center justify-between bg-emerald-50 p-2 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/wwcdwkaf.json"
                                                trigger="hover"
                                                title='Copy'
                                                onClick={() => handleCopy(pass.userName)}
                                                className="w-5 cursor-pointer text-emerald-600">
                                            </lord-icon>
                                            <span className="text-sm text-emerald-700">
                                                {pass.userName || 'No Username'}
                                            </span>
                                        </div>
                                        <span className="text-xs text-emerald-500 bg-emerald-100 px-2 py-1 rounded-full">
                                            Username
                                        </span>
                                    </div>

                                    {/* Password Section */}
                                    <div className="flex items-center justify-between bg-emerald-50 p-2 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/wwcdwkaf.json"
                                                trigger="hover"
                                                title='Copy'
                                                onClick={() => handleCopy(pass.password)}
                                                className="w-5 cursor-pointer text-emerald-600">
                                            </lord-icon>
                                            <span className="text-sm text-emerald-700 font-mono">
                                                {pass.password}
                                            </span>
                                        </div>
                                        <span className="text-xs text-emerald-500 bg-emerald-100 px-2 py-1 rounded-full">
                                            Password
                                        </span>
                                    </div>

                                    {/* Actions Section */}
                                    <div className="flex justify-end gap-4 pt-2 mt-2 border-t border-emerald-100">
                                        <button onClick={() => handleEdit(pass)}
                                            className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors duration-200">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/valwmkhs.json"
                                                trigger="hover"
                                                className="w-5 text-emerald-600">
                                            </lord-icon>
                                        </button>
                                        <button onClick={() => handleDelete(pass.id)}
                                            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors duration-200">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/oqeixref.json"
                                                trigger="hover"
                                                className="w-5 text-red-600">
                                            </lord-icon>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden sm:block overflow-x-auto">
                            <table className="w-full table-auto mb-5 mt-2  bg-white overflow-hidden rounded-xl shadow-xl border border-emerald-100">
                                <thead className='bg-emerald-700 text-white'>
                                    <tr className='border-b border-emerald-800 [&>th]:text-left [&>th]:py-3 
                                                   [&>th]:px-4 [&>th]:sm:text-base [&>th]:text-sm'>
                                        <th className=''>Site</th>
                                        <th className=''>Username</th>
                                        <th className=''>Password</th>
                                        <th className='!text-center'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passwordsArray.map((pass) => (
                                        <tr className='transition-all hover:bg-emerald-100 bg-emerald-50 ' key={pass.id}>
                                            <td className='px-4 py-3 border-b border-emerald-100'>
                                                <div className="flex items-center gap-2">
                                                    {pass.site ? (
                                                        <a href={pass.site} target='_blank' title={pass.site}
                                                            className='text-emerald-700 hover:text-emerald-800 text-sm font-medium'>
                                                            {pass.site.replace(/^https?:\/\//, '')}
                                                        </a>
                                                    ) : (
                                                        <span className="text-sm text-emerald-700">No Site</span>
                                                    )}
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/wwcdwkaf.json"
                                                        trigger="hover"
                                                        title='Copy'
                                                        onClick={() => handleCopy(pass.site)}
                                                        className="w-5 min-w-5 cursor-pointer text-emerald-600">
                                                    </lord-icon>
                                                </div>
                                            </td>
                                            <td className='px-4 py-3 border-b border-emerald-100'>
                                                <div className="flex items-center gap-2">
                                                    <span className='text-sm text-emerald-700'>{pass.userName || 'No Username'}</span>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/wwcdwkaf.json"
                                                        trigger="hover"
                                                        title='Copy'
                                                        onClick={() => handleCopy(pass.userName)}
                                                        className="min-w-5 w-5 cursor-pointer text-emerald-600">
                                                    </lord-icon>
                                                </div>
                                            </td>
                                            <td className='px-4 py-3 border-b border-emerald-100'>
                                                <div className="flex items-center gap-2">
                                                    <span className='text-sm text-emerald-700 font-mono'>{'*'.repeat(pass.password.length)}</span>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/wwcdwkaf.json"
                                                        trigger="hover"
                                                        title='Copy'
                                                        onClick={() => handleCopy(pass.password)}
                                                        className="min-w-5 w-5 cursor-pointer text-emerald-600">
                                                    </lord-icon>
                                                </div>
                                            </td>
                                            <td className='px-4 py-3 border-b border-emerald-100'>
                                                <div className='flex justify-center gap-4'>
                                                    <button onClick={() => handleEdit(pass)}
                                                        className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors duration-200">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/valwmkhs.json"
                                                            trigger="hover"
                                                            className="w-5 text-emerald-600">
                                                        </lord-icon>
                                                    </button>
                                                    <button onClick={() => handleDelete(pass.id)}
                                                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors duration-200">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/oqeixref.json"
                                                            trigger="hover"
                                                            className="w-5 text-red-600">
                                                        </lord-icon>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default PassLists
