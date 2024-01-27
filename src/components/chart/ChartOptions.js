// ChartOptions.js
import React, {useState} from 'react';
import tickerList from '../constants/tickerList';
import tickerToNameMapper from '../helpers/mapTickerToName';
import { SearchIcon } from '@heroicons/react/solid';


const ChartOptions = ({ selectedTicker, onTickerSelect }) => {
    const [options, setOptions] = useState(tickerList);
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(e.target.value);
        if (value === '') {
            setOptions(tickerList);
        } else {
            const filteredOptions = tickerList.filter(ticker => 
                ticker.toLowerCase().startsWith(value) || tickerToNameMapper[ticker].toLowerCase().startsWith(value)
            );
            setOptions(filteredOptions);
        }
    };


    return (
        <div>
            <div className="bg-gray-800 h-screen px-4 overflow-y-auto">
                <div className="relative mb-4 w-full text-gray-400 focus-within:text-gray-600">
                    <SearchIcon className="absolute w-5 h-5 top-1/2 left-3 transform -translate-y-1/2" />

                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearch}
                        className="pl-10 p-3 w-full bg-gray-900 text-white rounded"
                        placeholder="Search..." 
                    />
                </div>
                {options.map((ticker) => (
                    <div
                        key={ticker}
                        className={`p-2 ${selectedTicker === ticker ? 'bg-gray-600' : 'bg-gray-700'} my-2 text-white rounded cursor-pointer hover:bg-gray-900`}
                        onClick={() => onTickerSelect(ticker)}
                    >
                        {tickerToNameMapper[ticker]}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChartOptions;
