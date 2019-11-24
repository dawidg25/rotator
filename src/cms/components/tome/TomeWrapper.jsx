import React, {Component} from 'react';
import TomeList from './TomeList';
import TomeAdd from './TomeAdd'

export default class TomeWrapper extends Component {
    render() {
        return (
            <section className="tome-wrapper container">
                <TomeList />
                <TomeAdd />
            </section>
        )
    }
}