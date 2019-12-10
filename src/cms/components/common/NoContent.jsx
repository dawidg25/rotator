import React, {Component} from 'react';
import './noContent.scss'
export default class NoContent extends Component {
    render() {
        return (
            <div className="no-content">
                <p className='title'>{this.props.title}</p>
                {this.props.description &&
                    <p className='description'>{this.props.description}</p>
                }
            </div>
        )
    }
}