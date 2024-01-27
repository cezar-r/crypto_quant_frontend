import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import ChartOptions from './components/chart/ChartOptions';
import ChartView from './components/chart/ChartView';


const Charts = () => {
    const location = useLocation();

    const [selectedTicker, setSelectedTicker] = useState(location.state.ticker);
    const userData = JSON.parse(location.state.userData);

    const onTickerSelect = (ticker) => {
        setSelectedTicker(ticker);
    }

    return (
        <div className="bg-gray-800 h-full overflow-y-auto ">
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
