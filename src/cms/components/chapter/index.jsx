import React, {Component} from 'react';
import Button from '../core/button';
import List from './list';
// import './style.scss';

export default class ChapterWrapper extends Component {
    render() {
        return (
            <section className="chapter-wrapper container">
                <List />
                <Button type={'add'} href={'/cms/chapter/modify'} />
            </section>
        )
    }
}