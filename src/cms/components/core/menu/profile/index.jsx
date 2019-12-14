import React, {Component} from 'react';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../../dropdown';
import auth from '../../../../utils/Auth';
import './style.scss';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.dropItems = [
			{text: 'Log out', call: e => this.signOutHandler()},
		]
	}
	signOutHandler = (e) => {
		auth.deleteUser();
		auth.deleteToken(true);
	}

	render() {
		return (
			<section className="profile">
				<Dropdown icon={faUserCircle} items={this.dropItems} />
			</section>
		)
	}
}