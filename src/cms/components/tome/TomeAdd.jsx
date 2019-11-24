import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import '../../scss/tome/tomeAdd.scss'
export default class TomeAdd extends Component {
    render() {
        return (
            <section className="tome-add">
                <button title={'Add new tome'}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </section>
        )
    }
}