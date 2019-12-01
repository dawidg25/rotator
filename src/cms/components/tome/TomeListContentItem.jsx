import React, {Component} from 'react';

export default class TomeListContentItem extends Component {
    render() {
        return (
            <div className="tome-row row" data-id={this.props.data._id}>
                <div className="title"><span>{this.props.data.title}</span></div>
                <div className="url"><span>{this.props.data.url}</span></div>
                <div className="created"><span>{this.props.data.createDate}</span></div>
            </div>
        )
    }
}