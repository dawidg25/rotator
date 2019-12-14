import React, {Component} from 'react';
import Other from '../../../../../utils/Other';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons'
import Dropdown from '../../../../core/dropdown';
import './style.scss';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import auth from '../../../../../utils/Auth';
import notification from '../../../../../utils/Notification';

const other = new Other();

class TomeListContentItem extends Component {
    constructor(props) {
		super(props);
		this.dropItems = [
            {text: 'Edit', call: e => this.editHandler(e)},
            {text: 'Remove', call: e => this.removeHandler(e)}
		]
    }
    editHandler = (e) => {
        const row = e.target.closest('.tome-row');
        const tomeId = row.getAttribute('data-id');
        this.props.history.push(`/cms/tome/modify/${tomeId}`);
    }
    removeHandler = (e) => {
        const row = e.target.closest('.tome-row');
        const tomeId = row.getAttribute('data-id');
        axios.delete(`/api/tome/${tomeId}`, {
            headers: {'x-auth': auth.getToken()}
        }).then(res => {
            notification.create('Tome was removed', 'success');
            this.props.updateHandler();
        }).catch(err => {
            auth.verifyError(err);
        })
    }
    render() {
        return (
            <div className="tome-row row" data-id={this.props.data._id}>
                <div className="title"><span>{this.props.data.title}</span></div>
                <div className="url"><span>{this.props.data.url}</span></div>
                <div className="created"><span>{other.parseFullDate(this.props.data.createDate)}</span></div>
                <div className="action">
                    <Dropdown icon={faEllipsisV} items={this.dropItems} />
                </div>
            </div>
        )
    }
}
export default withRouter(TomeListContentItem);