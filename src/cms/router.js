import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './scss/index.scss'

import auth from './utils/Auth';
import LeftBar from './components/core/menu';
import NotFound from './components/common/NotFound';

import Dashboard from './components/dashboard';
import Login from './components/login';

import TomeWrapper from './components/tome';
import TomeModify from './components/tome/modify';

import ChapterWrapper from './components/chapter/ChapterWrapper';

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
                        <Route exact path={match.path + '/chapter'} render={() => <ChapterWrapper />} />
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