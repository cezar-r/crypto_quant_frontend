import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NewAlertPopup from './components/NewAlertPopup';
import { Skeleton } from '@mui/material';
import createNewSubscription from './services/createNewSubscription';
import deleteSubscription from './services/deleteSubscription';
import getDashboardDataForUser from './services/getDashboardDataForUser';
import generateUUID from './components/helpers/generateUUID';
import DashboardTable from './components/DashboardTable';
import StaticRiskCards from './components/StaticRiskCards';
import TopNav from './TopNav';

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const userData = JSON.parse(location.state.userData);
    
    const [dashboardData, setDashboardData] = useState([]);
    const [staticData, setStaticData] = useState([]);
    const [newAlertPopup, setNewAlertPopup] = useState(false);
    const [refreshData, setRefreshData] = useState(false);
    const [showLoading, setShowLoading] = useState(true);


    const fetchDashboardData = async () => {
        setShowLoading(true);
        const data = await getDashboardDataForUser({ "user_data": userData });
        setDashboardData(data.tableData);
        setStaticData(data.staticData);
        setShowLoading(false);
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

    const handleDeleteAlert = async (subscription) => {

        const payload = {
            "subscription_id": subscription['id']
        }
        deleteSubscription(payload);
        setTimeout(() => setRefreshData(prev => !prev), 1000);
    };

    const handleNewAlertPopupSave = async (alertData) => {
        const subscription = {
            phoneNumber: userData.phoneNumber,
            id: generateUUID(),
            threshold: alertData['riskThreshold'].toString(),
            msgsPerDay: alertData['maxMessages'],
            ticker: alertData['ticker']
        };
    
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
            {showLoading ? (
                <div className="flex justify-between items-center p-4 ml-16 mr-16">
                    {Array.from(new Array(5)).map((_, index) => (
                        <Skeleton key={index} variant="rectangular" width={210} height={120} className="mr-4" />
                    ))}
                </div>
            ) : (
                <StaticRiskCards data={staticData} handleChartsClick={handleChartsClick} />
            )}
            <div className="flex justify-between items-center p-4 mb-2">
                <h2 className="text-white text-3xl font-bold ml-20 mt-2">Alerts</h2>
                <button onClick={handleNewAlertPopupOpen} 
                    className="bg-teal-400 hover:bg-teal-600 text-white text-2xl py-2 px-4 rounded-lg mr-16 shadow-lg hover:shadow-lg transition-shadow duration-300">
                    +
                </button>
            </div>
            {showLoading ? (
                <Skeleton variant="rectangular" width="90%" height={280} className="flex justify-center items-center mx-16" />
            ) : (
                <div className="mx-16">
                    <DashboardTable data={dashboardData}
                                    userData={userData}
                                    newAlertPopup={newAlertPopup}
                                    setNewAlertPopup={setNewAlertPopup}
                                    handleNewAlertPopupClose={handleNewAlertPopupClose}
                                    handleNewAlertPopupSave={handleNewAlertPopupSave}
                                    handleChartsClick={handleChartsClick}
                                    handleDeleteAlert={handleDeleteAlert} />
                </div>
            )}
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
