import React, {Component} from 'react';
import '../../scss/common/loader.scss';

export default class Loader extends Component {
    render(){
        return (
            <div className="loader-wrapper">
                <div className="lds-facebook"><div></div><div></div><div></div></div>
            </div>
        )
        
    }
}