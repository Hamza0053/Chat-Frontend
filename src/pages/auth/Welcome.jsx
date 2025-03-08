import React, { useEffect } from 'react'
import Image from '../../components/Image/Image'
import welcomePattren from '../../assets/whatsapp-pattren.png'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Buttons/Button'
import { useAuth } from '../../hooks/useAuth'


function Welcome() {
    const { user } = useAuth()
    const navigate = useNavigate()

    console.log('user data in the welcome page is --> ', user);


    // useEffect(() => {
    //     if (user) {
    //       navigate('/chat');
    //     }
    //   }, [user, navigate]);

    return (
        <>
            <div className="w-screen h-screen bg-white flex flex-col items-center justify-start p-4">
                <Image
                    className='w-72'
                    src={welcomePattren} />
                <div className="flex flex-col justify-center items-center gap-2 -mt-8">
                    <h1 className="font-medium font-sans text-2xl ">Welcome To WhatsApp</h1>
                    <p className="text-center text-sm text-gray-500">
                        Read our <span className="text-[#005d4c]">Privacy Policy.</span> tap "Agree and Continue" <br /> to accept <span className="text-[#005d4c]">terms of Services.</span>
                    </p>
                </div>
                <Link to="/login" className='w-full mt-auto'>
                    <Button
                        className='rounded-full text-sm bg-[#005d4c] font-normal text-white mt-auto py-2 w-full'
                        text="Agree and Continue" />
                </Link>
            </div>
        </>
    )
}

export default Welcome