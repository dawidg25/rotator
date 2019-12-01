import React, {Component} from 'react';
import axios from 'axios';
import '../../scss/tome/tomeList.scss';
import '../common/Loader';
import Loader from '../common/Loader';
import TomeListContent from './TomeListContent';

export default class TomeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            documents: []
        }
    }
    componentDidMount() {
        axios.get('/api/tome').then(res => {
            this.setState({
                documents: res.data.document,
                isLoaded: true
            })
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
            <section className="tome-list sub-container">
                <div className="header">
                    <h2>Tome list</h2>
                </div>
                <div className="top-row row">
                    <div className="title"><span>Title</span></div>
                    <div className="url"><span>Url</span></div>
                    <div className="created"><span>Created</span></div>
                </div>
                    {this.state.isLoaded ?
                        <TomeListContent data={this.state.documents} />
                    :
                        <Loader />
                    }
            </section>
        )
    }
}