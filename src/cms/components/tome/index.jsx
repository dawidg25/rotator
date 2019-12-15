import React, {Component} from 'react';
import TomeList from './list';
import Button from '../core/button';
import './style.scss';

export default class TomeWrapper extends Component {
    render() {
        return (
            <section className="tome-wrapper container">
                <TomeList />
                <Button type={'add'} href={'/cms/tome/modify'} />
            </section>
        )
    }
}