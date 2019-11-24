import React from 'react';
import ReactDOM from 'react-dom';
import NotificationParent from '../components/common/NotificationParent';

var notification = {
    create: (msg, type = 'info') => {
        ReactDOM.render(<NotificationParent msg={msg} type={type} />, document.getElementById('notification'));
    }
}

export default notification;