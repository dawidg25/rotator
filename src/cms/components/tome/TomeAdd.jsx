import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import '../../scss/tome/tomeAdd.scss'
export default class TomeAdd extends Component {
    render() {
        return (
            <section className="tome-add">
                <Link to={'/cms/tome/add'} className="btn btn-circle">
                    <FontAwesomeIcon icon={faPlus} />
                </Link>
            </section>
        )
    }
}