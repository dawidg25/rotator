import React, {Component} from 'react';
import Navigation from './common/Navigation';
import Profile from './common/Profile';
import '../scss/leftbar.scss';

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