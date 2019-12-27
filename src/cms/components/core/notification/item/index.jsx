import React from 'react';
import {faCheckCircle, faInfoCircle, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const iconMap = {
    success: faCheckCircle,
    info: faInfoCircle,
    warning: faExclamationCircle,
    error: faExclamationCircle
}
const headerMap = {
    success: 'Success',
    info: 'Info',
    warning: 'Warning',
    error: 'Error'
}
export default class NotificationItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            fade: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                visible: false
            })
        }, 3500);
        setTimeout(() => {
            this.setState({
                fade: true
            })
        }, 100)
        setTimeout(() => {
            this.setState({
                fade: false
            })
        }, 3000)
    }
    closeNotification = () => {
        this.setState({visible: false})
    }
    render() {
        return this.state.visible ? 
            <div className={`notification-content ${this.props.type}` + (this.state.fade ? ' fade' : '')} onClick={this.closeNotification} >
                <div className="icon">
                    <FontAwesomeIcon icon={iconMap[this.props.type]} />
                </div>
                <div className="content">
                    <p className="header">
                        {headerMap[this.props.type]}
                    </p>
                    <p className="message">
                        {this.props.msg}
                    </p>
                </div>               
            </div>                
            :
            null
    }
}