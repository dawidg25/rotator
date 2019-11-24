import React, {Component} from 'react'
import '../scss/login.scss';
import {withFormik} from 'formik';
import * as Yup from 'yup';
import InputField from './common/InputField';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import notification from '../lib/Notification';

const inputs = [
    {type: 'text', name: 'email', placeholder: 'E-mail', icon: faEnvelope},
    {type: 'password', name: 'password', placeholder: 'Password', icon: faLock}
]

class Login extends Component {
    
    render() {
        return(
            <section className='login-register'>
                <div className='login subsection subsection-dark'>
                    <form onSubmit={this.props.handleSubmit}>
                        {inputs.map((input, index) => {
                            return <InputField 
                                        {...input}
                                        key={index}
                                        value={this.props.values[input.name]}
                                        onChange={this.props.handleChange}
                                        touched={this.props.touched[input.name]}
                                        onBlur={this.props.handleBlur}
                                        errors={this.props.errors[input.name]}
                                    />
                        })}
                        <button className='form-send' type='submit'>Signup</button>
                    </form> 
                </div>
            </section>
        )
    }
}

export default withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Incorrect e-mail format').required('E-mail adress is required'),
        password: Yup.string().required('Password is required')
    }),
    handleSubmit: (values, {props}) => {

        axios.post('/api/auth', {
           email: values.email,
           password: values.password
        })
        .then(res => {
            props.handleLogin(res);
        })
        .catch(err => {
            notification.create('Incorrect login details', 'error');
        })
    }
})(Login)