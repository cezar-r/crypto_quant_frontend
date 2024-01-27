import React, { useState, useEffect, useRef } from 'react';
import getCryptoPriceData from '../../services/getCryptoPriceData';
import * as d3 from 'd3';
import { riskToColorTransparency, riskToColor } from '../helpers/riskToColor';
import tickerToNameMapper from '../helpers/mapTickerToName';
import Timeframe from './Timeframe';
import "./tooltip.css";

const timeframeToDatapointsMapper = {
    "1M": 200,
    "3M": 580,
    "6M": 1160,
    "1Y": 2340,
    "*": 1000000
}

const ChartView = ({ selectedTicker }) => {
    const d3Container = useRef(null);
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);  
    const [fullData, setFullData] = useState([]);
    const [timeframe, setTimeframe] = useState('1M');

    const fetchCryptoPriceData = async (ticker, limit = null) => {
        const args = limit ? { "ticker": ticker, "limit": limit } : { "ticker": ticker };
        const data = await getCryptoPriceData(args);
        return data['price_data'];
    }

    const drawChart = (data) => {
        data = data.slice(-timeframeToDatapointsMapper[timeframe])
        if (!d3Container.current || !Array.isArray(data) || data.length === 0) return;
    
        const svg = d3.select(d3Container.current);
        svg.selectAll("*").remove(); // Clear svg content before drawing
    
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = +svg.style("width").replace("px", "") - margin.left - margin.right;
        const height = +svg.style("height").replace("px", "") - margin.top - margin.bottom;
    
        const x = d3.scaleTime()
            .domain(d3.extent(data, d => new Date(d.timestamp)))
            .range([0, width]);
    
        const minValue = d3.min(data, d => d.close);
        const maxValue = d3.max(data, d => d.close);
    
        const y = d3.scaleLinear()
            .domain([minValue * 0.95, maxValue])
            .range([height, 0]);
    
        const colorScale = d => riskToColorTransparency(d.risk_score, 0.8);
    
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    
        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));
    
        g.append("g")
            .call(d3.axisLeft(y));
    
        // Create a tooltip in the body of the document
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
    
        // Define the mouse event handlers
        const mouseover = function(event, d) {
            tooltip.style("opacity", 1);
        };
    
        const mousemove = function(event, d) {
            tooltip.html(`Price: ${d.close}<br/>Risk: ${d.risk_score.toFixed(2)}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY + 10) + "px");
        };
    
        const mouseout = function(event, d) {
            tooltip.style("opacity", 0);
        };
    
        // Append circles for each data point and attach event handlers
        g.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("cx", d => x(new Date(d.timestamp)))
            .attr("cy", d => y(d.close))
            .attr("r", 5)
            .style("fill", d => colorScale(d))
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseout", mouseout);
    };
    

    const handleTimeframeChange = (timeframe) => {
        setTimeframe(timeframe);
    }

    useEffect(() => {
        drawChart(fullData);
    }, [timeframe])
    

    useEffect(() => {
        if (selectedTicker && d3Container.current) {
            fetchCryptoPriceData(selectedTicker, timeframeToDatapointsMapper[timeframe] + 20).then(data => {
                drawChart(data);
                setFullData(data); 
                setInitialDataLoaded(true);
            });

            if (initialDataLoaded) {
                fetchCryptoPriceData(selectedTicker).then(data => {
                    setFullData(data);
                });
            }
        }
    }, [selectedTicker, initialDataLoaded]);

    useEffect(() => {
        console.log(fullData);
        if (fullData.length > 0) {
            drawChart(fullData);
        }
    }, [fullData]);

    return (
        <div className='bg-gray-800 h-screen overflow-y-auto'>
            <div className="bg-gray-900 text-white h-1/5 p-4">
                <h2 className="text-white text-3xl font-bold ml-4 ">Historical Risk Levels</h2>
                <div className='flex justify-between center-items'>
                    <h2 className="text-white text-xl font-semibold ml-4 mt-8">{tickerToNameMapper[selectedTicker]} ({selectedTicker})</h2>
                    <Timeframe handleTimeframeChange={handleTimeframeChange} curTimeframe={timeframe}/>
                </div>
                <div className='flex justify-start center-items mt-1 mb-12'>
                    {fullData.length > 0 && <h2 className="text-white text-3xl font-bold ml-4 mt-3">${fullData[fullData.length-1].close}</h2>}
                    {fullData.length > 0 && 
                    <div className="flex pt-2 ml-4 mt-1">
                        <span className="px-2 py-2 rounded-md" style={{ backgroundColor: riskToColorTransparency(fullData[fullData.length-1].risk_score), color: riskToColor(fullData[fullData.length-1].risk_score) }}>
                            <p className="font-bold text-large">{`${fullData[fullData.length-1].risk_score.toFixed(2)}`}</p>
                        </span>
                    </div>}
                </div>

            </div>      
            <div className="bg-gray-900 text-white h-2/3 p-4">
                <svg className="w-full h-full" ref={d3Container}></svg>
            </div>
        </div>
    );
};

export default ChartView;
