import React from "react";
import {riskToColor, riskToColorTransparency} from './helpers/riskToColor';


const ThresholdIndicator = ({ value }) => {
    const color = riskToColor(value); // Get the color as RGB
    const bgColor = riskToColorTransparency(value); // Get the background color as RGBA with transparency

    // Triangle pointing up or down based on the value
    const triangleStyle = {
        width: 0,
        height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderBottom: value > 0 ? `5px solid ${color}` : 'none',
        borderTop: value <= 0 ? `5px solid ${color}` : 'none',
        marginLeft: '8px',
    };

    return (
        <div className="flex items-center justify-end">
            <span className="px-2 py-1 rounded-md" style={{ backgroundColor: bgColor, color: color }}>
                <p className="font-bold">{value}</p>
            </span>
            <span style={{ ...triangleStyle }}></span>
        </div>
    );
};

export default ThresholdIndicator;

