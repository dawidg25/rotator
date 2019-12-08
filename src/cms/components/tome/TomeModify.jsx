import React, {Component} from 'react';
import InputField from '../common/InputField';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import auth from '../../../lib/Auth';
import notification from '../../lib/Notification';
import {withRouter} from 'react-router-dom';
import Loader from '../common/Loader';
import './tomeModify.scss';

const formFields = [
    {type: 'text', name: 'title', label: 'Title', value: 'asdf'},
    {type: 'text', name: 'url', label: 'Url'},
]

const validSchema = Yup.object().shape({
    title: Yup.string().required(),
    url: Yup.string().required().trim()
});

class TomeModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNew: this.props.match.params.id === undefined,
            isLoaded: false,
            data: {
                title: '',
                url: ''
            }
        }
        this.id = this.state.isNew ? null : this.props.match.params.id;
    }
    cancelHandler = () => {
        this.props.history.push('/cms/tome');
    }

    componentDidMount () {
        if (!this.state.isNew) {
            axios.get(`/api/tome/${this.id}`).then(res => {
                this.setState({data: res.data.document, isLoaded: true});

            })
        }
    }

    render() {
        return (
            <section className="tome-modify container">
                <div className="modify sub-container">
                <h2>{this.state.isNew ? 'Create' : 'Edit'} tome</h2>
                    {(!this.state.isLoaded && !this.state.isNew) ? 
                        <Loader />
                    :
                    <Formik
                        enableReinitialize
                        initialValues={this.state.data ? this.state.data : ''}
                        validationSchema={validSchema}
                        onSubmit={(values) => {
                            let submit = {
                                path: '/api/tome',
                                successMsg: `New tome is created`
                            }
                            if (!this.state.isNew) {
                                submit = {
                                    path:  `/api/tome/${this.id}`,
                                    successMsg: 'Tome successfully edited'
                                }
                            }

                            axios.post(submit.path,
                                {
                                    title: values.title,
                                    url: values.url
                                },
                                {
                                    headers: {'x-auth': auth.getToken()}
                                }
                            ).then((res) => {
                                notification.create(submit.successMsg, 'success');
                                this.props.history.push('/cms/tome');
                            }).catch(error => {
                                auth.verifyError(error);
                            })
                        }}
                    >
                    
                    {props => (
                        <form onSubmit={props.handleSubmit}>
                        {formFields.map((input, index) => {
                            return <InputField 
                                {...input}
                                key={index} 
                                value={props.values[input.name]}
                                onChange={props.handleChange}
                                touched={props.touched[input.name]}
                                onBlur={props.handleBlur}
                                errors={props.errors[input.name]}
                            />
                        })}
                        <div className="action">
                            <button className="cancel" onClick={this.cancelHandler}>Cancel</button>
                            <button type="submit">Save</button>    
                        </div>
                    </form>
                    )}
                </Formik>
                }
                </div>
            </section>
        )
    }
}
export default withRouter(TomeModify);
