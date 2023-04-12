import React, { Component } from 'react'
import HTMLFlipBook from 'react-pageflip'
import Page from '../../components/Page/Page'
import { store } from '../../redux/store';
import axios from 'axios';
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
        };

    }

    onPage = (e) => {
        this.setState({
            page: e.data,
        });
    };

    fetchData = () => {
        console.log(`${this.props.month}-${this.props.year}`)
        console.log(this.state.token)
        axios.get(`https://3.26.97.225:5000/v1/dairy/entrybymonth?month=${this.props.month}&year=${this.props.year}`, {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        }).then((res) => {
            console.log(res.data)
            var entries = res.data.reverse();

            if (entries.length === 0)
                entries.push({ 'entry': "No entries in this month" })

            var temp = formatDiaryEntries(entries, this.props.month, this.props.year);

            this.setState(
                {
                    data: temp
                })
        }).catch(e => {

            var msg = "";
            if (e.code === "ERR_BAD_REQUEST")
                msg = "No entries on this month of the year";
            else if (e.code === "ERR_NETWORK") {
                // alert("network error")
                msg = "OOPS1! Network error, Please check the connectivity"
            }

            var temp = formatDiaryEntries([{ 'entry': msg }], this.props.month, this.props.year);

            this.setState(
                {
                    data: temp
                })
        })
    }

    componentDidMount() {
        // console.log(this.state.month)
        // console.log(this.state.year)
        // console.log(getCurrentMonthName())

        this.props.startLoad();
        this.fetchData();
        this.props.stopLoad()
    }

    componentDidUpdate(prevProps) {

        if (this.props.month !== prevProps.month || this.props.year !== prevProps.year) {
            this.props.startLoad();
            this.fetchData();
            this.props.stopLoad()
        }
    }

    render() {
        return (
            <div>
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