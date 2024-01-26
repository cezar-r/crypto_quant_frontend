import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopNav = ({ userData }) => {
    const navigate = useNavigate();

    const handleDashboardClick = () => {
        navigate('/dashboard', { state: { userData: JSON.stringify(userData) }});
    };

    const handleChartsClick = () => {
        navigate('/charts', { state: { ticker: 'BTC', userData: JSON.stringify(userData) } });
    };

    return (
        <div className="bg-[#090E15] flex justify-start items-center pt-1  px-1 py-2">
            <button onClick={handleDashboardClick} className="text-lg text-teal-400 py-3 px-6 hover:bg-[#17202e] hover:underline rounded">
                Dashboard
            </button>
            <button onClick={handleChartsClick} className="text-lg text-teal-400 py-3 px-6 hover:bg-[#17202e] hover:underline rounded">
                Charts
            </button>
        </div>
    );
};

export default TopNav;
