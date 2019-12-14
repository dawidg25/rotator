import React, {Component} from 'react';
import Navigation from './navigation';
import Profile from './profile';
import './style.scss';

export default class LeftBar extends Component {
	render() {
		return (
			<section className="left-bar">
				<Navigation />
				<Profile />
			</section>
		)
	}
}