import React, {Component} from 'react';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../common/Dropdown';
import auth from '../../../lib/Auth';
import '../../scss/common/profile.scss';

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