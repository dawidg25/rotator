import React, {Component} from 'react';
import Button from '../core/button';
// import './style.scss';

export default class ChapterWrapper extends Component {
    render() {
        return (
            <section className="chapter-wrapper container">
                {/* <TomeList /> */}
                <Button type={'add'} href={'/cms/tome/modify'} />
            </section>
        )
    }
}