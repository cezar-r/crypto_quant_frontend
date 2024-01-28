import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const TopNav = ({ userData }) => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDashboardClick = () => {
        navigate('/dashboard', { state: { userData: JSON.stringify(userData) } });
    };

    const handleChartsClick = () => {
        navigate('/charts', { state: { ticker: 'BTC', userData: JSON.stringify(userData) } });
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSignOut = () => {
        localStorage.clear(); // Clear local storage
        navigate('/'); // Navigate to home page
    };

    return (
        <div className="bg-[#090E15] flex justify-between items-center pt-1 px-1 py-2">
            <div>
                <button onClick={handleDashboardClick} className="text-lg font-semibold text-teal-400 py-3 px-6 ml-4 hover:bg-[#17202e] hover:underline rounded">
                    Dashboard
                </button>
                <button onClick={handleChartsClick} className="text-lg font-semibold text-teal-400 py-3 px-6 hover:bg-[#17202e] hover:underline rounded">
                    Charts
                </button>
            </div>
            <div className="relative">
                <button onClick={toggleDropdown} className="text-lg text-white bg-[#17202e] py-3 px-4 mr-4 rounded flex items-center justify-center hover:bg-gray-700">
                    <AccountCircleIcon />
                </button>
                {showDropdown && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-xl">
                        <button onClick={handleSignOut} className="block px-3 py-1 text-sm text-white w-full text-left">
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopNav;
