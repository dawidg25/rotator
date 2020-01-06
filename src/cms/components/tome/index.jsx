import React, {Component} from 'react';
import List from './list';
import Button from '../core/button';
import './style.scss';

export default class TomeWrapper extends Component {
    render() {
        return (
            <section className="tome-wrapper container">
                <List />
                <Button type='add' href={'/cms/tome/modify'} />
            </section>
        )
    }
}