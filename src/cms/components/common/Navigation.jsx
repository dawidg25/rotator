import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import '../../scss/navigation.scss'
import {faHome, faBook, faBookmark, faFileSignature} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const modules = [
    {path: '', icon: faHome},
    {path: '/tome', icon: faBook},
    {path: '/chapter', icon: faBookmark},
    {path: '/cv', icon: faFileSignature}
]

export default class Navigation extends Component {
    render() {
        return (
            <section className='navigation'>
                {modules.map((module, index) => {
                    return (
                        <NavLink exact to={'/cms' + module.path} activeClassName='selected' key={index}>
                            <FontAwesomeIcon icon={module.icon} />
                        </NavLink>
                    )
                })}
            </section>
        )
    }
}