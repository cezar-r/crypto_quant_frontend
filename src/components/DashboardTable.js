import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';
import { Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Fab, Typography, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import {riskToColor, riskToColorTransparency} from './helpers/riskToColor';
import NewAlertPopup from './NewAlertPopup';
import tickerToNameMapper from './helpers/mapTickerToName';
import ThresholdIndicator from './ThresholdIndicator';


const DeleteStyledIconButton = styled(IconButton)(({ theme }) => ({
    color: "#b5b5b5",
    padding: "8px",
    '&:hover': {
      backgroundColor: 'rgba(107, 114, 128, 0.5)', // bg-gray-500 with some transparency
      borderRadius: '20%', // Rounded effect
      color: '#ff1c1c'
    },
}));

const ChartStyledIconButton = styled(IconButton)(({ theme }) => ({
    color: "#b5b5b5",
    padding: "8px",
    marginRight: "24px",
    '&:hover': {
      backgroundColor: 'rgba(107, 114, 128, 0.5)', // bg-gray-500 with some transparency
      borderRadius: '20%', // Rounded effect
      color: '#2dd4bf'
    },
}));

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
    boxShadow: '4px 6px 16px rgba(0, 0, 0, 0.5)', 
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


const DashboardTable = ({data, userData, newAlertPopup, setNewAlertPopup, handleNewAlertPopupClose, handleNewAlertPopupSave, handleChartsClick, handleDeleteAlert}) => {

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState(null);

    const handleClickOpen = (subscription) => {
        setSelectedSubscription(subscription);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const confirmDelete = () => {
        handleDeleteAlert(selectedSubscription);
        console.log("Deleting subscription", selectedSubscription);
        setOpenDialog(false);
    };
    
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
                                <StyledTableCell align="left">
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                        <ChartStyledIconButton onClick={() => handleChartsClick(subscription.ticker)} size="small">
                                            <ShowChartIcon fontSize="small" />
                                        </ChartStyledIconButton>
                                        <DeleteStyledIconButton onClick={() => handleClickOpen(subscription)} size="small">
                                            <DeleteIcon fontSize="small" />
                                        </DeleteStyledIconButton>
                                    </Box>
                                </StyledTableCell>
                                <Dialog
                                    open={openDialog}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    sx={{
                                        '& .MuiDialog-paper': { backgroundColor: '#131a24' }, // Set the background color of the dialog
                                    }}
                                >
                                    <DialogTitle id="alert-dialog-title" sx={{ color: 'white' }}>{"Confirm Delete"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description" sx={{ color: 'white' }}>
                                            Are you sure you want to delete this subscription?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} sx={{ color: 'white', '&:hover': { backgroundColor: 'transparent' } }}>Cancel</Button>
                                        <Button
                                            onClick={confirmDelete}
                                            autoFocus
                                            sx={{
                                                color: '#ff1c1c',
                                                '&:hover': { backgroundColor: '#ff1c1c', color: "white" },
                                                '& .MuiButton-root': {
                                                    borderRadius: '20px', // Rounded rectangle around the button
                                                    border: '1px solid red',
                                                }
                                            }}
                                        >
                                            Confirm
                                        </Button>
                                    </DialogActions>
                                </Dialog>

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
 * send text message API
 * sms verify
 * 
 * add coin images next to each name
 * sort table by table headers
 * 
 * create domain and get site registered
 * use localstorage to remember user
 */