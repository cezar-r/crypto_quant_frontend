import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import ChartOptions from './components/chart/ChartOptions';
import ChartView from './components/chart/ChartView';


const Charts = () => {
    const location = useLocation();
    console.log(location.state.userData);

    const [selectedTicker, setSelectedTicker] = useState(location.state.ticker);
    const userData = JSON.parse(location.state.userData);

    const onTickerSelect = (ticker) => {
        setSelectedTicker(ticker);
    }

    return (
        <div className="bg-gray-800">
            <TopNav userData={userData} />
            <div className="flex h-screen overflow-y-auto bg-gray-700 mt-2">
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
