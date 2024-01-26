import React, { useState } from 'react';
import getUserByPhone from '../services/getUserByPhone';
import { useNavigate } from 'react-router-dom';


const EnterPhoneNumberPopup = () => {

    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleInputChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleButtonClick = async () => {
        const userData = await getUserByPhone(phoneNumber);
        console.log(userData);
        navigate('/dashboard', { state: { userData: userData.body } })
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-gray-700 py-10 px-8 rounded-lg shadow-lg">
                <h2 className="text-xl mb-8 font-bold text-white">Enter Phone Number</h2>
                <div className="relative">
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={handleInputChange}
                        className="pl-4 pr-20 py-2 rounded w-full bg-gray-900 text-white text-xl focus:outline-none"
                        placeholder="1234567890"
                    />
                    <button 
                        onClick={handleButtonClick}
                        className="absolute inset-y-0 right-0 px-4 text-white bg-blue-500 font-bold rounded-r hover:bg-blue-700"
                    >
                        Enter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnterPhoneNumberPopup;
