import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import ChartOptions from './components/chart/ChartOptions';
import ChartView from './components/chart/ChartView';

const Charts = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedTicker, setSelectedTicker] = useState(location.state? location.state.ticker : "BTC");

    let initialUserData = location.state ? JSON.parse(location.state.userData) : null;
    if (!initialUserData) {
        const userDataString = localStorage.getItem('userData');
        initialUserData = userDataString ? JSON.parse(userDataString) : null;
    }

    const [userData, setUserData] = useState(initialUserData);

    useEffect(() => {
        if (!userData || typeof userData === "string") {
            navigate('/');
        }
    }, [userData, navigate]);

    const onTickerSelect = (ticker) => {
        setSelectedTicker(ticker);
    }

    return (
        <div className="bg-gray-800 h-full overflow-y-auto">
            <TopNav userData={userData} />
            <div className="flex bg-gray-800 mt-4">
                <div className="w-1/5">
                    <ChartOptions selectedTicker={selectedTicker} onTickerSelect={onTickerSelect} />
                </div>
                <div className="w-4/5">
                    <ChartView selectedTicker={selectedTicker} />
                </div>
            </div>
        </div>
    );
}

export default Charts;
