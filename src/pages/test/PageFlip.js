import React, { Component } from 'react'
import HTMLFlipBook from 'react-pageflip'
import Page from '../../components/Page/Page'
import store from '../../redux/store';
import axios from 'axios';

export class PageFlip extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            totalPage: 0,
            data: [],
            token: store.getState().user.token
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

    componentDidMount() {

        axios.get("http://localhost:5000/entry", {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        }).then((res) => {
            // console.log(res.data)
            var temp = res.data;
            temp.splice(0, 0, { 'entry': "" })
            temp.splice(0, 0, { 'heading': "Dear Diary", 'decor': "/images/featherPen.png" })
            temp.push({ 'entry': "" })
            if (temp.length % 2 === 0)
                temp.push({ 'entry': "" })
            temp.push({ 'heading': " ", 'decor': "/images/thankYouText.png" })
            this.setState(
                {
                    data: temp
                })
        }).catch(e => console.log(e))

    }

    render() {
        return (
            <div>
                <HTMLFlipBook
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
                        (item, index) => (<Page heading={item.heading} decor={item.decor} key={index}>{item.entry}</Page>)
                    )}

                </HTMLFlipBook>
            </div>
        )
    }
}

export default PageFlip