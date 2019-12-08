import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './scss/index.scss'

import auth from '../lib/Auth';
import LeftBar from './components/LeftBar';
import NotFound from './components/common/NotFound';

import Dashboard from './components/Dashboard';
import Login from './components/Login';

import TomeWrapper from './components/tome/TomeWrapper';
import TomeModify from './components/tome/TomeModify';

import Vitae from './components/cv/wrapper'
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: auth.getToken()
        }
    }
    
    LoginHandler = (res) => {
        if(res.status === 200) {
            auth.setToken(res.data.token);
            auth.setUser(res.data.user);
        }
        this.setState({
            isLogged: res.status === 200,
        })
    }
    render() {
        const {match} = this.props;

        return(
            <section className='cms'> 
                {this.state.isLogged ?
                    <Router>
                        <LeftBar />
                        <Route exact path={match.path} render={() => <Dashboard />} />
                        <Route exact path={match.path + '/tome'} render={() => <TomeWrapper />} />
                        <Route exact path={[match.path + '/tome/modify/', match.path + '/tome/modify/:id']} render={() => <TomeModify />} />
                        <Route exact path={match.path + '/cv'} render={() => <Vitae />} />
                    </Router>
                :
                    <Router>
                        <Route exact path={match.path} render={() => <Login handleLogin={(e) => this.LoginHandler(e)} />} />
                        <Route render={() => <NotFound />} />
                    </Router>
                }
            </section>
        )
    }
}

export default Main;