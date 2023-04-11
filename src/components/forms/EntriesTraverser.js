import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getMonthName, getMonthYearList } from '../../utils/DateUtils';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

function EntriesTraverser({ year, setYear, month, setMonth }) {

    const [yearOpen, setYearOpen] = React.useState(false);
    const [monthOpen, setMonthOpen] = React.useState(false);

    const { userProfile } = useSelector((state) => state.user)

    const handleYearClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setYearOpen(false)
        }
    };

    const handleYearChange = (event) => {
        setYear(event.target.value)
        handleYearClose()
    };

    const handleYearClickOpen = () => {
        setYearOpen(true)
    };

    const handleMonthClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setMonthOpen(false)
        }
    };

    const handleMonthChange = (event) => {
        console.log(event.target.value)
        setMonth(event.target.value)
        handleMonthClose()
    };

    const handleMonthClickOpen = () => {
        setMonthOpen(true)
    };
    const { monthArray, yearArray } = getMonthYearList(userProfile && userProfile.joinMonth, userProfile && userProfile.joinYear);
    return (
        <div>
            <Typography variant="h6" component="h6">Travel back in memories here....</Typography>
            <Button onClick={handleMonthClickOpen}>{getMonthName(month)}</Button>
            <Dialog disableEscapeKeyDown open={monthOpen} onClose={handleMonthClose}>
                <DialogTitle>Choose the month</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel htmlFor="demo-dialog-native">Month</InputLabel>
                            <Select
                                native
                                value={month}
                                onChange={handleMonthChange}
                                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                            >
                                {console.log(month)}
                                {monthArray.map((m, index) => (<option value={index < 10 ? `0${index + 1}` : index}>{m}</option>))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleMonthClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Button onClick={handleYearClickOpen}>{year}</Button>
            <Dialog disableEscapeKeyDown open={yearOpen} onClose={handleYearClose}>
                <DialogTitle>Choose the year</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel htmlFor="demo-dialog-native">Year</InputLabel>
                            <Select
                                native
                                value={year}
                                onChange={handleYearChange}
                                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                            >
                                {yearArray.map((y) => <option value={y}>{y}</option>)}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleYearClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EntriesTraverser