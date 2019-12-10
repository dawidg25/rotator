import React, {Component} from 'react';
import listensToClickOutside from 'react-onclickoutside';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';

import './dropdown.scss';
class Dropdown extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            openList: false
        }
    }
    handleClickOutside = () => {
        if(this.state.openList) {
            this.setState({
                openList: false
            })
        }
    }
    toggleListHandler = () => {
        this.setState({
            openList: !this.state.openList
        })
    }
    closeList = () => {
        this.setState({
            openList: false
        })
    }

    render() {
        return (
            <div className={"dd-wrapper" + (this.state.openList ? ' active' : '')}>
                <div className="dd-header" onClick={this.toggleListHandler}>
                    {this.props.icon &&
                        <div className="dd-header-icon">
                            <FontAwesomeIcon icon={this.props.icon} />
                        </div>
                    }
                    {this.props.title &&
                        <div className="dd-header-title">{this.props.title}</div>
                    }
                    {this.props.arrow &&
                        <div className="dd-header-arrow">
                            <FontAwesomeIcon icon={this.state.openList ? faAngleUp : faAngleDown} />
                        </div>
                    }
                </div>
                {this.state.openList &&
                    <ul className="dd-list">
                        {this.props.items.map((item, index) => {
                            return (
                                <li className="dd-list-item" key={index} onClick={(e) => {item.call(e); this.closeList()}}>{item.text}</li>
                            )
                        })}
                    </ul>
                }
            </div>
        )
    }
}
export default listensToClickOutside(Dropdown);