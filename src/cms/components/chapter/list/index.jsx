import React, {Component} from 'react';
import axios from 'axios';
import './style.scss';
import '../../core/loader';
import Loader from '../../core/loader';
import ListContent from './content';

export default class TomeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            documents: []
        }
    }
    getList = () => {
        axios.get('/api/chapter/all').then(res => {
            this.setState({
                documents: res.data.document,
                isLoaded: true
            })
            console.log(this.state.documents);
        }).catch(err => {
            console.log(err);
        })
    }
    triggerUpdate = (e) => {
        this.getList();
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevState.documents.length !== this.state.documents.length && prevState.documents.length > 0) {
            this.getList()
        }
    }
    componentDidMount() {
        this.getList()
    }
    render() {
        return (
            <section className="chapter-list sub-container">
                <div className="header">
                    <h2>Chapter list</h2>
                </div>
                <div className="top-row row">
                    <div className="title"><span>Title</span></div>
                    <div className="url"><span>Url</span></div>
                    <div className="tome"><span>Tome</span></div>
                    <div className="created"><span>Created</span></div>
                    <div className="action"></div>
                </div>
                    {(this.state.isLoaded) ?
                        <ListContent data={this.state.documents} updateHandler={e => this.triggerUpdate(e)}/>
                    :
                        <Loader />
                    }
            </section>
        )
    }
}