import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper'; // Import Paper component
import tickerList from './constants/tickerList';
import {riskToColor} from './helpers/riskToColor';

const NewAlertPopup = ({ onClose, onSave }) => {

    
    const [ticker, setTicker] = useState("BTC");
    const [riskThreshold, setRiskThreshold] = useState(0);
    const [maxMessages, setMaxMessages] = useState(2);
    const options = tickerList.sort();

    const theme = useTheme();

    const handleRiskThresholdChange = (event) => {
        setRiskThreshold(event.target.value);
    };

    const handleMaxMessagesChange = (event) => {
        setMaxMessages(event.target.value);
    };

    const handleCancel = () => {
        onClose();
    };

    const handleCreate = () => {
        onSave({
            riskThreshold,
            maxMessages,
            ticker
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg relative">
                <h1 className="text-white font-bold text-2xl font-bold mb-12">Create New Alert</h1>
                <Autocomplete
                    value={ticker}
                    onChange={(event, newValue) => {
                        setTicker(newValue);
                    }}
                    options={options}
                    style={{ width: 300, marginBottom: "32px" }} // Adjust the width as needed
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            label="Select a ticker" 
                            sx={{
                                '& label': { color: 'white', fontSize: "1.25rem" },
                                '& .MuiInputBase-root': {
                                    color: 'white',
                                    borderColor: 'white',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#2dd4bf',
                                },
                            }}
                        />
                    )}
                    PaperComponent={({ children }) => (
                        <Paper style={{ background: theme.palette.grey[800], color: 'white' }}>{children}</Paper>
                    )}
                />
                <div>
                    <label className='text-lg mt-18'>Risk Threshold: {riskThreshold}</label>
                    <Slider
                        value={riskThreshold}
                        onChange={(event, newValue) => setRiskThreshold(newValue)}
                        step={0.01}
                        min={-1}
                        max={1}
                        className='mb-8'
                        style={{ color: riskToColor(riskThreshold) }}
                    />
                </div>
                <div>
                    <label className='mt-18 text-lg mb-16 pr-16'>Max # of messages every 24 hrs: {Math.round(maxMessages)}</label>
                    <Slider
                        value={maxMessages}
                        onChange={(event, newValue) => setMaxMessages(newValue)}
                        step={0.01}
                        min={1}
                        max={6}
                    />
                </div>
                <div className="flex justify-between items-center mt-12">
                    <button onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-3 px-5 rounded-lg mr-2">Cancel</button>
                    <button onClick={handleCreate} className="bg-teal-400 hover:bg-teal-600 text-white font-semibold py-3 px-5 rounded-lg">Create</button>
                </div>
            </div>
        </div>
    );
}

export default NewAlertPopup;
