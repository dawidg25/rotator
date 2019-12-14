import React, {Component} from 'react';
import axios from 'axios';
import auth from '../../utils/Auth';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            data: null
        }
    }
    componentDidMount(){
        axios.get('/api/user/', {
            headers: {
                'x-auth': auth.getToken()
            }
        }).then(res => {
            this.setState({
                isLoaded: true,
            })
        }).catch(error => {
            auth.verifyError(error);
        })
    }
    componentDidUpdate() {
        // console.log(this.state.isLoaded)
    }

    render() {
        return (
            <section className='dashboard'>
                <h1>Dashboard Component</h1>
                {this.state.isLoaded ? 
                    <div>Data loaded</div>
                :
                    <p>Loading in progress...</p>   
                }
            </section>
        )
    }
}

export default Dashboard;