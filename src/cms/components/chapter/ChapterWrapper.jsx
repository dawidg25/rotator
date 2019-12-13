import React, {Component} from 'react';
import ChapterList from './ChapterList';

export default class ChapterWrapper extends Component {
    render () {
        return (
            <section className="chapter-wrapper container">
                <ChapterList />
            </section>
        )
    }
}