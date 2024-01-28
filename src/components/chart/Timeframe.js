import React from "react";

const Timeframe = ({ handleTimeframeChange, curTimeframe }) => {
    const timeframes = ["1M", "3M", "6M", "1Y", "2Y", "All"];

    return (
        <div className="flex space-x-2 mr-8">
            {timeframes.map((timeframe) => {
                const isActive = timeframe === curTimeframe || (timeframe === "All" && curTimeframe === "*");

                const buttonClasses = `hover:bg-gray-400 text-white font-semibold px-5 text-xs rounded mt-4 py-2 ${
                    isActive ? 'bg-teal-600' : 'bg-gray-700'
                }`;

                return (
                    <button
                        key={timeframe}
                        onClick={() => handleTimeframeChange(timeframe === "All" ? "*" : timeframe)}
                        className={buttonClasses}
                    >
                        {timeframe}
                    </button>
                );
            })}
        </div>
    );
};

export default Timeframe;
