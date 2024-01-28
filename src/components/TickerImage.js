import React from 'react';

const TickerImage = ({ ticker, dim = "20" }) => {
    const imageName = ticker.toLowerCase();
    const imagePath = ticker === "ARB"
        ? `${process.env.PUBLIC_URL}/assets/${imageName}.jpeg`  // Use JPEG for "ARB"
        : `${process.env.PUBLIC_URL}/assets/${imageName}.webp`; // Use WEBP for other tickers

    return (
        <img 
            src={imagePath} 
            alt={ticker} 
            style={{ width: `${dim}px`, height: `${dim}px`, maxWidth: '100%', maxHeight: '100%' }} 
        />
    );
};

export default TickerImage;
