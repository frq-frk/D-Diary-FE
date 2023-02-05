import React, { Component } from 'react'
import HTMLFlipBook from 'react-pageflip'
import Page from '../../components/Page/Page'
import store from '../../redux/store';
import axios from 'axios';
import { getCurrentMonth, getCurrentYear, getMonthName } from '../../utils/DateUtils'
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
import CircularProgress from '@mui/material/CircularProgress';
import { formatDiaryEntries } from '../../utils/DiaryUtils';
import { loadingInitiate, loadingEnd } from '../../redux/actions'
import { connect } from 'react-redux';

export class PageFlip extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            totalPage: 0,
            data: [],
            token: store.getState().user.token,
            year: getCurrentYear(),
            month: getCurrentMonth(),
            yearOpen: false,
            monthOpen: false,
        };

    }

    nextButtonClick = () => {
        this.flipBook.getPageFlip().flipNext();
    };

    prevButtonClick = () => {
        this.flipBook.getPageFlip().flipPrev();
    };

    onPage = (e) => {
        this.setState({
            page: e.data,
        });
    };

    fetchData = () => {
        console.log(`${this.state.month}-${this.state.year}`)
        axios.get(`http://localhost:5000/entrybymonth?month=${this.state.month}&year=${this.state.year}`, {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        }).then((res) => {
            console.log(res.data)
            var entries = res.data;

            if (entries.length === 0)
                entries.push({ 'entry': "No entries in this month" })

            var temp = formatDiaryEntries(entries, this.state.month, this.state.year);

            this.setState(
                {
                    data: temp
                })
        }).catch(e => {
            console.log(e)
            var msg = "";
            if (e.code === "ERR_BAD_REQUEST")
                msg = "No entries on this month of the year";
            else if (e.code === "ERR_NETWORK") {
                alert("network error")
                msg = "OOPS1! Network error, Please check the connectivity"
            }

            var temp = formatDiaryEntries([{ 'entry': msg }], this.state.month, this.state.year);

            this.setState(
                {
                    data: temp
                })
        })
    }

    handleYearChange = (event) => {
        this.setState({
            year: event.target.value
        },
            () => this.fetchData()
        )

        this.handleYearClose()
    };

    handleYearClickOpen = () => {
        this.setState({
            yearOpen: true
        })
    };

    handleYearClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            this.setState({
                yearOpen: false
            })
        }
    };

    handleMonthChange = (event) => {
        console.log(event.target.value)
        this.setState({
            month: event.target.value
        }, () => this.fetchData())

        this.handleMonthClose()
    };

    handleMonthClickOpen = () => {
        this.setState({
            monthOpen: true
        })
    };

    handleMonthClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            this.setState({
                monthOpen: false
            })
        }
    };

    componentDidMount() {
        // console.log(this.state.month)
        // console.log(this.state.year)
        // console.log(getCurrentMonthName())

        this.props.startLoad();
        this.fetchData();
        this.props.stopLoad()
    }

    render() {
        return (
            <div>
                <div>
                    <Button onClick={this.handleMonthClickOpen}>{getMonthName(this.state.month)}</Button>
                    <Dialog disableEscapeKeyDown open={this.state.monthOpen} onClose={this.handleMonthClose}>
                        <DialogTitle>Choose the month</DialogTitle>
                        <DialogContent>
                            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel htmlFor="demo-dialog-native">Age</InputLabel>
                                    <Select
                                        native
                                        value={this.state.month}
                                        onChange={this.handleMonthChange}
                                        input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                                    >
                                        <option value={"01"}>January</option>
                                        <option value={"02"}>February</option>
                                        <option value={"03"}>March</option>
                                    </Select>
                                </FormControl>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleMonthClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>

                    <Button onClick={this.handleYearClickOpen}>{this.state.year}</Button>
                    <Dialog disableEscapeKeyDown open={this.state.yearOpen} onClose={this.handleYearClose}>
                        <DialogTitle>Choose the year</DialogTitle>
                        <DialogContent>
                            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel htmlFor="demo-dialog-native">Age</InputLabel>
                                    <Select
                                        native
                                        value={this.state.year}
                                        onChange={this.handleYearChange}
                                        input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                                    >
                                        <option value={"2023"}>2023</option>
                                        <option value={"2022"}>2022</option>
                                        <option value={"2021"}>2021</option>
                                    </Select>
                                </FormControl>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleYearClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                {this.props.loading ?
                    <CircularProgress />
                    : <HTMLFlipBook
                        width={550}
                        height={650}
                        size="fixed"
                        minWidth={315}
                        maxWidth={1000}
                        minHeight={400}
                        maxHeight={1533}
                        maxShadowOpacity={0.5}
                        showCover={true}
                        mobileScrollSupport={true}
                        ref={(el) => (this.flipBook = el)}
                    >
                        {this.state.data.map(
                            (item, index) => (<Page heading={item.heading} month={item.month} year={item.year} decor={item.decor} key={index}>{item.entry}</Page>)
                        )}

                    </HTMLFlipBook>
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLoad: () => dispatch(loadingInitiate()),
        stopLoad: () => dispatch(loadingEnd())
    }
};

const mapStateToProps = state => ({
    loading: state.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(PageFlip);