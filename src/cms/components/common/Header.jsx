import React, {Component} from 'react';
import {faUserCircle, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import auth from '../../../lib/Auth';
import Dropdown from './Dropdown';

import '../../scss/header.scss';
export default class Header extends Component {

    signOutHandler = (e) => {
        auth.deleteUser();
        auth.deleteToken(true);
    }
    
    render() {
        return (
            <header>
            </header>
        )
    }
}