import React, {Component} from 'react';
import './TomeListContentItem';
import TomeListContentItem from './TomeListContentItem';

export default class TomeListContent extends Component {
    render() {
        console.log(this.props.data[1].createDate);
        return (
            
            <div className="content">
                {this.props.data.length > 0 ? 
                    this.props.data.map((tome, index) => {
                        return (
                            <TomeListContentItem data={tome} key={index} />
                        )
                    })
                :
                    <span>nocontent</span>
                }
            </div>
        )
    }
}