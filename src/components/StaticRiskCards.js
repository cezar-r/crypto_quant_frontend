import React from "react";
import TickerImage from "./TickerImage";
import tickerToNameMapper from "./helpers/mapTickerToName";
import {riskToColor, riskToColorTransparency} from "./helpers/riskToColor";

const RiskCard = ({ ticker, risk, price, change, onClick }) => {
    return (
        <div className="bg-[#131a24] text-white shadow-md rounded-lg py-4 px-4 ml-6 mr-6 mb-8 mt-4 flex flex-col justify-between h-full hover:bg-[#17202e] hover:shadow-custom transition duration-800 ease-out cursor-pointer"
            onClick={() => onClick(ticker)}>
            <div className="flex justify-between items-center">
                <div className='flex justify-start items-center'>
                    <h2>{tickerToNameMapper[ticker]}</h2>
                    <h4 className="ml-2 mt-1 text-xs text-gray-500 font-semibold">{ticker}</h4>
                </div>
                <TickerImage ticker={ticker} dim={"28"}/>
            </div>
            <div className="flex justify-between items-center pr-16">
                <p className=" mr-2 text-lg font-bold">{`$${price.toFixed(2)}`}</p>
                <p className={`text-sm ${change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {`${(change * 100).toFixed(2)}%`}
                </p>
            </div>
            <div className="flex justify-end mt-2">
                <span className="px-2 py-1 rounded-md" style={{ backgroundColor: riskToColorTransparency(risk), color: riskToColor(risk) }}>
                    <p className="font-bold">{`${risk.toFixed(2)}`}</p>
                </span>
            </div>
        </div>
    );
};


const StaticRiskCards = ({data, handleChartsClick}) => {
    return (
        <div className="flex justify-center items-center flex-wrap">
            {data.map((item, index) => (
                <RiskCard
                    key={index}
                    ticker={item.ticker}
                    risk={item.risk}
                    price={item.price}
                    change={item["24hr_pct_change"]}
                    onClick={handleChartsClick}
                />
            ))}
        </div>
    );
}

export default StaticRiskCards;
