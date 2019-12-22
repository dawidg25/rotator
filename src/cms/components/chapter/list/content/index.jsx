import React, {Component} from 'react';
import './item';
import './style.scss';
import ListContentItem from './item';
import NoContent from '../../../common/NoContent';
import {Scrollbars} from 'react-custom-scrollbars'

export default class ListContent extends Component {
    render() {
        return (
            <div className="content">
                <Scrollbars universal>
                {this.props.data.length > 0 ?
                    this.props.data.map((tome, index) => {
                        return (
                            <ListContentItem data={tome} key={index} updateHandler={e => this.props.updateHandler(e)} />
                        )
                    })
                :
                    <NoContent title={'No chapters yet'} description={'Click + to create a new chapter'} />
                }
                </Scrollbars>
            </div>
        )
    }
}