import React, { useState, useEffect } from 'react';
import getUserByPhone from '../services/getUserByPhone';
import sendSMSCode from '../services/sendSMSCode';
import verifySMSCode from '../services/verifySMSCdoe';
import { useNavigate } from 'react-router-dom';

const EnterPhoneNumberPopup = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);


    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            navigate('/dashboard', { state: { userData: JSON.parse(userData) } });
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        if (isVerifying) {
            setVerificationCode(e.target.value);
        } else {
            setPhoneNumber(e.target.value);
        }
    };

    const handlePhoneNumberInput = async () => {
        await sendSMSCode({"phoneNumber": phoneNumber});
        setIsVerifying(true);
    };

    const handleVerificationInput = async () => {
        const isValid = await verifySMSCode({
            "phoneNumber": phoneNumber, 
            "code": verificationCode
        });
        if (isValid) {
            const userData = await getUserByPhone(phoneNumber);
            localStorage.setItem('userData', JSON.stringify(userData.body));
            navigate('/dashboard', { state: { userData: userData.body } });
        } else {
            alert('Invalid code, please try again.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-gray-700 py-10 px-8 rounded-lg shadow-lg">
                <h2 className="text-lg mb-6 font-bold text-white">
                    {isVerifying ? 'Enter Verification Code' : 'Enter Phone Number'}
                </h2>
                <div className="relative">
                    <input
                        type={isVerifying ? "text" : "tel"}
                        value={isVerifying ? verificationCode : phoneNumber}
                        onChange={handleInputChange}
                        className="pl-4 pr-20 py-2 rounded w-full bg-gray-900 text-white text-lg focus:outline-none"
                        placeholder={isVerifying ? "Enter 6-digit code" : "1234567890"}
                    />
                    <button 
                        onClick={isVerifying ? handleVerificationInput : handlePhoneNumberInput}
                        className="absolute inset-y-0 right-0 px-4 text-white bg-teal-600 font-bold rounded-r hover:bg-teal-800"
                    >
                        {isVerifying ? 'Verify' : 'Enter'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnterPhoneNumberPopup;
