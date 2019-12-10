import React, {Component} from 'react';
import './TomeListContentItem';
import './tomeListContent.scss';
import TomeListContentItem from './TomeListContentItem';
import NoContent from '../common/NoContent';
import {Scrollbars} from 'react-custom-scrollbars'

export default class TomeListContent extends Component {
    render() {
        return (
            <div className="content">
                <Scrollbars universal>
                {this.props.data.length > 0 ?
                    this.props.data.map((tome, index) => {
                        return (
                            <TomeListContentItem data={tome} key={index} updateHandler={e => this.props.updateHandler(e)} />
                        )
                    })
                :
                    <NoContent title={'No toms yet'} description={'Click + to create a new tome'} />
                }
                </Scrollbars>
            </div>
        )
    }
}