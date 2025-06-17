import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

import { v4 as uuid } from 'uuid';
import PassLists from './PassLists';


const Manager = () => {

    //*States 
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        site: "",
        userName: "",
        password: ""
    })
    const [passwordArray, setpasswordArray] = useState([])


    //*Functions
    const getPasswords = async () => {
        let response = await fetch('http://localhost:2611/', { method: 'GET' })
        let savePasses = await response.json()
        setpasswordArray(savePasses)
    }
    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };
    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const savePassword = async () => {
        if (data.password != '') {
            console.log(data.id)
            await fetch('http://localhost:2611/', {
                method: 'DELETE', headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: data.id || '' })
            })

            let Data = {
                ...data,
                id: uuid(),
            }
            setpasswordArray([...passwordArray, Data])
            await fetch('http://localhost:2611/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(Data)
            })


            setData({
                site: "",
                userName: "",
                password: ""
            })
            toast.success('Password Saved!', {
                autoClose: 500,
                hideProgressBar: true,

            })
        } else {
            toast.error('Password field is Requried!', {
                autoClose: 1000,
                hideProgressBar: true,

            })
        }
    }
    const handlekeyDown = (e) => {
        if (e.key == 'Enter') {
            savePassword()

        }
    }
    //* Effects 
    useEffect(() => {
        getPasswords()
    }, [])



    return (
        <>
            <div className="absolute top-0 -z-10 h-full w-full flex bg-white"><div className="absolute bottom-auto left-auto right-20 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(125,255,136,0.47)] opacity-50 blur-[80px]"></div></div>

            <div className='w-full flex flex-col items-center justify-center gap-y-5 px-4 sm:px-6 md:px-8'>
                <div className="hero flex flex-col items-center justify-center mt-5">
                    <div className="logo flex text-2xl sm:text-3xl font-bold [&>span]:text-emerald-600">
                        <span>&lt;</span>
                        <p>Key</p>
                        <span>bag/&gt;</span>
                    </div>
                    <span className='text-xs sm:text-sm tracking-wider'>Security that fits in your pocket.</span>
                </div>
                <div className='w-full container mx-auto flex items-center justify-center gap-y-4 flex-col'>

                    <input onKeyDown={handlekeyDown} value={data.site} name='site' onChange={handleChange} className='w-full sm:w-[90%] md:w-[80%] p-2 rounded-2xl px-4 border outline-0 text-sm sm:text-base' type="text" placeholder='Enter Website URL' />
                    <div className='w-full sm:w-[90%] md:w-[80%] flex flex-col md:flex-row items-center justify-center gap-3 relative'>
                        <input onKeyDown={handlekeyDown} value={data.userName} name='userName' onChange={handleChange} className='w-full p-2 rounded-2xl px-4 border outline-0 text-sm sm:text-base' type='text' placeholder='Enter Username' />
                        <div className='w-full relative'>
                            <input onKeyDown={handlekeyDown} value={data.password} name='password' onChange={handleChange} className='w-full p-2 rounded-2xl px-4 outline-0 border text-sm sm:text-base' type={showPassword ? 'text' : 'password'} placeholder='Enter Password'
                            />
                            <div onClick={togglePassword} className='absolute right-0 top-1/2 -translate-y-1/2 mx-2'>
                                <img width={23} className='hover:scale-105 transition-all cursor-pointer' src={showPassword ? '/openEye.svg' : '/closeEye.svg'} alt="Show Password" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={savePassword} className='bg-emerald-600 px-6 sm:px-8 hover:scale-105 transition-all text-white flex items-center justify-center cursor-pointer rounded-md py-2 text-sm sm:text-base'>
                            <lord-icon
                                src="https://cdn.lordicon.com/gzqofmcx.json"
                                trigger="hover"
                                colors="primary:#ffffff"
                                style={{ 'width': 25, 'color': 'white' }}
                            >
                            </lord-icon>
                            Save
                        </button>
                    </div>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <PassLists passwordsArray={passwordArray} setpasswordArray={setpasswordArray} setData={setData} />
                </div>
            </div>
        </>
    )
}

export default Manager
