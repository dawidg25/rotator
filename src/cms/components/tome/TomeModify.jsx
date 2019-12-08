import React, {Component} from 'react';
import InputField from '../common/InputField';
import {withFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import auth from '../../../lib/Auth';
import notification from '../../lib/Notification';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

const formFields = [
    {type: 'text', name: 'title', label: 'Title', value: 'asdf'},
    {type: 'text', name: 'url', label: 'Url'},
]

class TomeModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNew: this.props.match.params.id === undefined
        }
        this.id = this.state.isNew ? null : this.props.match.params.id;
        this.data = null
    }
    cancelHandler = () => {
        this.props.history.push('/cms/tome');
    }

    componentDidMount () {
        if (!this.state.isNew) {
            axios.get(`/api/tome/${this.id}`).then(res => {
                this.data = res.data.document;
                console.log(this.data);
            })
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
                        <div className="action">
                            <button className="cancel" onClick={this.cancelHandler}>Cancel</button>
                            <button type="submit">Save</button>    
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}
export default compose(withRouter, withFormik({
    mapPropsToValues: () => ( 
        {
            title: this.data.title,
            url: ''
        }
    ),
    validationSchema: Yup.object().shape({
        title: Yup.string().required(),
        url: Yup.string().required().trim()
    }),
    handleSubmit: (values, {props}) => {
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
            props.history.push('/cms/tome');

        }).catch(error => {
            auth.verifyError(error);
        })
    }
}))(TomeModify);
