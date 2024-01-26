import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {riskToColor, riskToColorTransparency} from './helpers/riskToColor';
import NewAlertPopup from './NewAlertPopup';
import tickerToNameMapper from './helpers/mapTickerToName';
import ThresholdIndicator from './ThresholdIndicator';
import { useNavigate } from 'react-router-dom';


const StyledTableCellBold = styled(TableCell)(({ theme }) => ({
    color: "white",
    fontWeight: "bold",
    fontSize: '1.05rem',
    padding: "14px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.12)"
}));


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: "white",
    fontSize: '1.05rem',
    padding: "14px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.12)"

}));

const StyledTableCellGrayText = styled(TableCell)(({ theme }) => ({
    color: "#b5b5b5",
    fontSize: '1.05rem',
    padding: "14px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.12)"

}));

const StyledHeaderCell = styled(StyledTableCell)(({ theme }) => ({
    fontSize: '0.9rem',
    padding: "16px",
    fontWeight: "bold",
}));



const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 6,
  backgroundColor: "#131a24",
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.5)', 
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: "#17202e",
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  border: 'none', 
}));

const StyledDeleteButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    backgroundColor: '#ff1c1c',
    color: 'white',
    '&:hover': {
      backgroundColor: '#b50b0b',
      border: 'none', 
    },
    border: 'none', 
  }));

const CenteredContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  }));
  
  const StyledFab = styled(Fab)(({ theme }) => ({
    backgroundColor: '#2dd4bf', 
    color: 'white',
    '&:hover': {
      backgroundColor: '#0d9488',
    },
    margin: theme.spacing(2),
  }));


const DashboardTable = ({data, userData, newAlertPopup, setNewAlertPopup, handleNewAlertPopupClose, handleNewAlertPopupSave, handleChartsClick}) => {
    
    const dashboardData = data;
    if (dashboardData.length > 0) {
        return (
                <StyledTableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledHeaderCell>#</StyledHeaderCell>
                                <StyledHeaderCell>Ticker</StyledHeaderCell>
                                <StyledHeaderCell align="right">Price</StyledHeaderCell>
                                <StyledHeaderCell align="right">Risk Threshold</StyledHeaderCell>
                                <StyledHeaderCell align="right">Current Risk</StyledHeaderCell>
                                <StyledHeaderCell align="right">24h %</StyledHeaderCell>
                                <StyledHeaderCell align="right">7d %</StyledHeaderCell>
                                <StyledHeaderCell align="left"></StyledHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dashboardData.map((subscription, index) => (
                            <StyledTableRow key={subscription.id}>
                                <StyledTableCellBold component="th" scope="row">
                                {index + 1}
                                </StyledTableCellBold>
                                <StyledTableCellBold>
                                    {/* <Avatar src={coin.image} sx={{ width: 24, height: 24, mr: 1 }} /> */}
                                    {tickerToNameMapper[subscription.ticker]}
                                </StyledTableCellBold>
                                <StyledTableCellGrayText align="right">
                                    ${subscription.price}
                                </StyledTableCellGrayText>
                                <StyledTableCellBold align="right">
                                    <ThresholdIndicator value={subscription.threshold} />
                                </StyledTableCellBold>
                                <StyledTableCellBold align="right"  sx={{ color: riskToColor(subscription.current_risk) }}>
                                    {subscription.current_risk.toFixed(2)}
                                </StyledTableCellBold>
                                <StyledTableCell align="right" sx={{ color: subscription['24hr_pct_change'] > 0 ? '#1af069' : '#ff1c1c' }}>
                                    {(subscription['24hr_pct_change']*100).toFixed(2)}%
                                </StyledTableCell>
                                <StyledTableCell align="right" sx={{ color: subscription['7d_pct_change'] > 0 ? '#1af069' : '#ff1c1c' }}>
                                    {(subscription['7d_pct_change']*100).toFixed(2)}%
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <StyledButton variant="contained" color="secondary" size="small">Edit</StyledButton>
                                    <StyledDeleteButton variant="outlined" color="primary" size="small">Delete</StyledDeleteButton>
                                </StyledTableCell>
                            </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
        );
    } else {
        return (
            <div>
                <StyledTableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledHeaderCell>#</StyledHeaderCell>
                                <StyledHeaderCell>Ticker</StyledHeaderCell>
                                <StyledHeaderCell align="right">Price</StyledHeaderCell>
                                <StyledHeaderCell align="right">Risk Threshold</StyledHeaderCell>
                                <StyledHeaderCell align="right">Current Risk</StyledHeaderCell>
                                <StyledHeaderCell align="right">24h %</StyledHeaderCell>
                                <StyledHeaderCell align="right">7d %</StyledHeaderCell>
                                <StyledHeaderCell align="left"></StyledHeaderCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </StyledTableContainer>
                {newAlertPopup && (
                    <NewAlertPopup
                        onClose={handleNewAlertPopupClose}
                        onSave={handleNewAlertPopupSave}
                    />
                )}
                {!newAlertPopup && (
                    <CenteredContainer>
                        <StyledFab size="large" aria-label="add" onClick={() => setNewAlertPopup(true)}>
                            <AddIcon />
                        </StyledFab>
                        <Typography variant="subtitle1" color="white">Create your first alert</Typography>
                    </CenteredContainer>
                )}
            </div>
        );
    }
}

export default DashboardTable;


/**
 * finalize chart page
 *  timeframe at top, stats on the bottom?
 * add coin images next to each name
 * sort table by table headers
 * add apis to edit and delete alerts
 * send text message API
 * sms verify
 * 
 * create domain and get site registered
 * use localstorage to remember user data
 */