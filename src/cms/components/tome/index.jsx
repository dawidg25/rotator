import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import TomeList from './list';

export default class TomeWrapper extends Component {
    render() {
        return (
            <section className="tome-wrapper container">
                <TomeList />
                <div className="tome-add">
                    <Link to={'/cms/tome/modify'} className="btn btn-circle">
                        <FontAwesomeIcon icon={faPlus} />
                    </Link>
                </div>
            </section>
        )
    }
}