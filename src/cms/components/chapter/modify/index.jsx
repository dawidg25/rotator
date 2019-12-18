import React, {Component} from 'react';
import Input from '../../core/input';
import Select from '../../core/select';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import auth from '../../../utils/Auth';
import notification from '../../../utils/Notification';
import {withRouter} from 'react-router-dom';
import Loader from '../../core/loader';
import './style.scss';

const selectOptions = [
    {value: 1, text: 'Opcja 1'},
    {value: 2, text: 'Opcja 2'},
]

const formFields = [
    {element: 'input', type: 'text', name: 'title', label: 'Title'},
    {element: 'input', type: 'text', name: 'url', label: 'Url'},
    {element: 'select', name: 'tome', label: 'Tome', options: selectOptions}
]

const validSchema = Yup.object().shape({
    title: Yup.string().required(),
    url: Yup.string().required().trim()
});

class chapterModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNew: this.props.match.params.id === undefined,
            isLoaded: false,
            data: {
                title: '',
                url: '',
                // tome: ''
            }
        }
        this.id = this.state.isNew ? null : this.props.match.params.id;
    }
    cancelHandler = () => {
        this.props.history.push('/cms/chapter');
    }

    componentDidMount () {
        // if (!this.state.isNew) {
        //     axios.get(`/api/chapter/${this.id}`).then(res => {
        //         this.setState({data: res.data.document, isLoaded: true});

        //     })
        // }
        axios.get('/api/tome/active').then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        })
    }

    render() {
        return (
            <section className="chapter-modify container">
                <div className="modify sub-container">
                <h2>{this.state.isNew ? 'Create' : 'Edit'} chapter</h2>
                    {(!this.state.isLoaded && !this.state.isNew) ? 
                        <Loader />
                    :
                    <Formik
                        enableReinitialize
                        initialValues={this.state.data ? this.state.data : ''}
                        validationSchema={validSchema}
                        onSubmit={(values) => {
                            console.log('elo');
                            return console.log(values);
                            let submit = {
                                path: '/api/chapter',
                                successMsg: `New chapter is created`
                            }
                            if (!this.state.isNew) {
                                submit = {
                                    path:  `/api/chapter/${this.id}`,
                                    successMsg: 'chapter successfully edited'
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
                                this.props.history.push('/cms/chapter');
                            }).catch(error => {
                                auth.verifyError(error);
                            })
                        }}
                    >
                    
                    {props => (
                        <form onSubmit={props.handleSubmit}>
                        {formFields.map((field, index) => {
                            switch (field.element) {
                                case 'input': 
                                    return (
                                        <Input 
                                            {...field}
                                            key={index} 
                                            value={props.values[field.name]}
                                            onChange={props.handleChange}
                                            touched={props.touched[field.name]}
                                            onBlur={props.handleBlur}
                                            errors={props.errors[field.name]}
                                        />
                                    )
                                case 'select':
                                    return (
                                        <Select 
                                            {...field}
                                            key={index}
                                            value={props.values[field.name]}
                                            onChange={props.handleChange}
                                            touched={props.touched[field.name]}
                                            onBlur={props.handleBlur}
                                            errors={props.errors[field.name]}
                                        />
                                    )
                                default: 
                                    return null
                            }

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
export default withRouter(chapterModify);
