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

let formFields = [];

const validSchema = Yup.object().shape({
    title: Yup.string().required(),
    url: Yup.string().required(),
});

class chapterModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNew: this.props.match.params.id === undefined,
            isLoaded: false,
            formDefaults: {
                title: '',
                url: '',
                tome: ''
            }
        }
        this.id = this.state.isNew ? null : this.props.match.params.id;
        this.tomeCollection = [];
        
    }
    cancelHandler = () => {
        this.props.history.push('/cms/chapter');
    }
    
    componentDidMount () {
        axios.get('/api/tome').then(res => {
            res.data.document.map((tome, index) => {
                this.tomeCollection.push({value: tome._id, label: tome.title});
                return null;
            })

            formFields = [
                {element: 'input', type: 'text', name: 'title', label: 'Title'},
                {element: 'input', type: 'text', name: 'url', label: 'Url'},
                {element: 'select', name: 'tome', label: 'Tome', options: this.tomeCollection}
            ]
            let updatedFormDefaults = {title: '', url: '', tome: this.tomeCollection[0].value};
            this.setState({formDefaults: updatedFormDefaults, isLoaded: true});
        }).catch(err => {
            console.error(err);
        })
    }
    componentWillUnmount() {
        formFields = [];
    }

    render() {
        return (
            <section className="chapter-modify container">
                <div className="modify sub-container">
                <h2>{this.state.isNew ? 'Create' : 'Edit'} chapter</h2>
                    {(!this.state.isLoaded) ? 
                        <Loader />
                    :
                    <Formik
                        enableReinitialize
                        initialValues={this.state.formDefaults ? this.state.formDefaults : ''}
                        validationSchema={validSchema}
                        onSubmit={(values) => {
                            let submit = {
                                path: '/api/chapter',
                                successMsg: `New chapter is created`
                            }
                            axios.post(submit.path,
                                {
                                    title: values.title,
                                    url: values.url,
                                    tome: values.tome
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
