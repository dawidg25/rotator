import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import './style.scss';

function Button (props) {
    return (
        <React.Fragment>
            {props.type === 'add' &&
                <div className="btn-add">
                    <Link to={props.href} className="btn btn-circle">
                        <FontAwesomeIcon icon={faPlus} />
                    </Link>
                </div>
            }
        </React.Fragment>
    )
}
export default Button