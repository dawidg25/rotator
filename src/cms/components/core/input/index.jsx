import React, {Component} from 'react';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';



export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true
        }
    }
    togglePasswordVisibility = e => {
        if(this.state.hidden) {
            this.setState({hidden: false})
        } else {
            this.setState({hidden: true})
        }
    }
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

                {this.props.type === 'password' ?
                    <input
                        type={this.state.hidden ? 'password' : 'text'}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        id={this.props.name}
                        name={this.props.name}
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}
                    />
                    :
                    <input
                        type={this.props.type}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        id={this.props.name}
                        name={this.props.name}
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}
                    />
                }
                {this.props.type === 'password' &&
                    <div className='toggle-password'>
                        <FontAwesomeIcon onClick={this.togglePasswordVisibility} icon={this.state.hidden ? faEye : faEyeSlash} />
                    </div>
                }
                {this.props.errors && this.props.touched &&
                    <div className='error'>{this.props.errors}</div>
                }
            </div>
        )
    }
}