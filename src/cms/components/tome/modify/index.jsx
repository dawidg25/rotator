import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Loader from '../../core/loader';
import './style.scss';
import TomeDetailsForm from './form';

class TomeModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNew: this.props.match.params.id === undefined,
            isLoaded: false,
            data: {
                title: '',
                url: ''
            }
        }
        this.id = this.state.isNew ? null : this.props.match.params.id;
    }
    componentDidMount () {
        if (!this.state.isNew) {
            this.getTomeData();
        }
    }

    updateIsNewState = () => {
        this.setState({isNew: false});
        this.id = this.props.match.params.id;
        this.getTomeData();
    }

    getTomeData = () => {
        axios.get(`/api/tome/${this.id}`).then(res => {
            this.setState({data: res.data.document, isLoaded: true});
        })
    }

    render() {
        return (
            <section className="tome-modify container">
                <div className="modify sub-container">
                <h2>{this.state.isNew ? 'Create' : 'Edit'} tome</h2>
                    {(!this.state.isLoaded && !this.state.isNew) ? 
                        <Loader />
                    :
                        <TomeDetailsForm isNew={this.state.isNew} id={this.id} initData={this.state.data} updateIsNewState={this.updateIsNewState} />
                    }
                </div>
            </section>
        )
    }
}
export default withRouter(TomeModify);
