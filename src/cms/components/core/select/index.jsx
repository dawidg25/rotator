import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class Select extends Component {
    render() {
        return (
            <div className='form-group'>
                {this.props.label &&
                    <label htmlFor={this.props.name}>{this.props.label}</label>
                }
                {this.props.icon &&
                    <div className='icon'>
                        <FontAwesomeIcon icon={this.props.icon} />
                    </div>
                }
    
                <select name={this.props.name} id={this.props.name} onChange={this.props.onChange} onBlur={this.props.onBlur}>
                    {this.props.options.map((option, index) => {
                        return (
                            <option value={option.value} key={index} selected>{option.text}</option>
                        )
                    })}
                </select>
            </div>
            
        )
    }
    
}