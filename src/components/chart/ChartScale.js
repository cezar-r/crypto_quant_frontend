import React from "react";

const ChartScale = ({ handleScaleChange, curScale }) => {
    const scales = ["Linear", "Log"];

    return (
        <div className="flex space-x-2 mr-8">
            {scales.map((scale) => {
                const isActive = scale === curScale;

                const buttonClasses = `hover:bg-gray-400 text-white font-semibold px-5 text-xs rounded mt-4 py-2 ${
                    isActive ? 'bg-teal-600' : 'bg-gray-700'
                }`;

                return (
                    <button
                        key={scale}
                        onClick={() => handleScaleChange(scale)}
                        className={buttonClasses}
                    >
                        {scale}
                    </button>
                );
            })}
        </div>
    );
};

export default ChartScale;
