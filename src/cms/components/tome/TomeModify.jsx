import React, {Component} from 'react';
import InputField from '../common/InputField';
import {withFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import auth from '../../../lib/Auth';
import notification from '../../lib/Notification';

const formFields = [
    {type: 'text', name: 'title', label: 'Title'},
    {type: 'text', name: 'url', label: 'Url'},
]

class TomeModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNew: false,
        }
    }
    
    render() {
        return (
            <section className="tome-modify container">
                <div className="create sub-container">
                    <h2>Create tome</h2>
                    <form onSubmit={this.props.handleSubmit}>
                        {formFields.map((input, index) => {
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
                        <button type="submit">Save</button>
                    </form>
                </div>
            </section>
        )
    }
}
export default withFormik({
    mapPropsToValues: () => ({
        title: '',
        url: ''
    }),
    validationSchema: Yup.object().shape({
        title: Yup.string().required(),
        url: Yup.string().required().trim()
    }),
    handleSubmit: (values) => {
        console.log(
            values.title,
            values.url
        )
        axios.post('/api/tome',
            {
                title: values.title,
                url: values.url
            },
            {
                headers: {
                    'x-auth': auth.getToken()
                }
            }
        ).then(res => {
            notification.create('New tome is created', 'success');
        }).catch(error => {
            notification.create('There is a problem with creating new tome', 'error');
        })
    }
})(TomeModify);