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
            isFounded: true,
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
            let isFounded = res.data.document !== null;
            this.setState({data: res.data.document, isLoaded: true, isFounded: isFounded});
        })
    }

    detailsComponent = () => {
        return <TomeDetailsForm isNew={this.state.isNew} id={this.id} initData={this.state.data} updateIsNewState={this.updateIsNewState} />
    }

    conditionalComponents = () => {
        if (this.state.isNew) {
            return this.detailsComponent()
        } else {
            if (!this.state.isLoaded) {
                return <Loader /> 
            } else if (this.state.isLoaded && !this.state.isFounded) {
                return <h1>Not found</h1>
            } else {
                return this.renderComponents();
            }
        }
    }
    renderComponents = () => {
        return (
            this.detailsComponent()
        )
    }

    render() {
        return (
            <section className="tome-modify container">
                {this.conditionalComponents()}
            </section>
        )
    }
}
export default withRouter(TomeModify);
