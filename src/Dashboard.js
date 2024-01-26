import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NewAlertPopup from './components/NewAlertPopup';
import createNewSubscription from './services/createNewSubscription';
import getDashboardDataForUser from './services/getDashboardDataForUser';
import generateUUID from './components/helpers/generateUUID';
import DashboardTable from './components/DashboardTable';
import StaticRiskCards from './components/StaticRiskCards';
import TopNav from './TopNav';

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    console.log(location.state.userData);

    const userData = JSON.parse(location.state.userData);
    const [dashboardData, setDashboardData] = useState([]);
    const [staticData, setStaticData] = useState([]);
    const [newAlertPopup, setNewAlertPopup] = useState(false);
    const [refreshData, setRefreshData] = useState(false);


    const fetchDashboardData = async () => {
        const data = await getDashboardDataForUser({ "user_data": userData });
        setDashboardData(data.tableData);
        setStaticData(data.staticData);
        console.log(data);
    };
    
    useEffect(() => {
        fetchDashboardData();
    }, [refreshData]); 


    const handleNewAlertPopupOpen = () => {
        setNewAlertPopup(true);
    };

    const handleNewAlertPopupClose = () => {
        setNewAlertPopup(false);
    };

    const handleNewAlertPopupSave = async (alertData) => {
        const subscription = {
            phoneNumber: userData.phoneNumber,
            id: generateUUID(),
            threshold: alertData['riskThreshold'].toString(),
            msgsPerDay: alertData['maxMessages'],
            ticker: alertData['ticker']
        };
        console.log('Alert Data:', subscription);
    
        const payload = {
            "subscription_data": subscription
        };
    
        createNewSubscription(payload);
        setTimeout(() => setRefreshData(prev => !prev), 1000);
    };

    const handleChartsClick = (ticker) => {
        navigate('/charts', { state: { ticker: ticker, userData: JSON.stringify(userData) } });
    };

    
    return (
        <div className='bg-gray-800 min-h-screen pb-32'>
            <TopNav userData={userData} />
            <div className="flex justify-between items-center p-4 ">
                <h1 className="text-white text-4xl font-bold ml-16 mt-6">Dashboard</h1>
            </div>
            <StaticRiskCards data={staticData} handleChartsClick={handleChartsClick}/>
            <div className="flex justify-between items-center p-4 mb-4">
                <h2 className="text-white text-3xl font-bold ml-20 mt-4">Alerts</h2>
                <button onClick={handleNewAlertPopupOpen} 
                    className="bg-teal-400 hover:bg-teal-600 text-white text-2xl py-2 px-4 rounded-lg mr-16 shadow-lg hover:shadow-lg transition-shadow duration-300">
                    +
                </button>
            </div>
            <div className="mx-16">
                <DashboardTable data={dashboardData} 
                                userData={userData} 
                                newAlertPopup={newAlertPopup}
                                setNewAlertPopup={setNewAlertPopup}
                                handleNewAlertPopupClose={handleNewAlertPopupClose}
                                handleNewAlertPopupSave={handleNewAlertPopupSave}
                                handleChartsClick={handleChartsClick}
                                />
            </div>
            {newAlertPopup && (
                <NewAlertPopup
                    onClose={handleNewAlertPopupClose}
                    onSave={handleNewAlertPopupSave}
                />
            )}
        </div>
    );
}

export default Dashboard;
