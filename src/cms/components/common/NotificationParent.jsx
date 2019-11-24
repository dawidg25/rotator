import React, {Component} from 'react';
import NotificationItem from './NotificationItem';
import '../../scss/notification.scss'
class NotificationParent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updated: null
        }

        this.items = [
            {msg: this.props.msg, type: this.props.type}
        ];
    }

    componentDidUpdate(prevProp, prevState) {
        if(prevProp !== this.props) {
            this.items.push(this.props);
            this.setState({
                updated: true
            })
        }
    }
    render() {
        // console.log(this.items);
        return (
            this.items.map((item, index) => {
                return <NotificationItem {...item} key={index}/>
            })
        )
    }
}

export default NotificationParent
