import React, {Component} from 'react';
import InputField from '../../../core/input';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import auth from '../../../../utils/Auth';
import notification from '../../../../utils/Notification';
import Loader from '../../../core/loader';
import './style.scss';

const formFields = [
    {element: 'input', type: 'text', name: 'title', label: 'Title'},
    {element: 'input', type: 'text', name: 'url', label: 'Url'}
]

const validSchema = Yup.object().shape({
    title: Yup.string().required(),
    url: Yup.string().required().trim()
});

class TomeDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            data: {
                title: '',
                url: ''
            }
        }
        this.id = this.props.isNew ? null : this.props.match.params.id;
        this.location = this.props.history.location.pathname;
    }
    handleSubmit = (values) => {
        let submit = {
            path: '/api/tome',
            successMsg: `New tome is created`
        }
        if (!this.props.isNew) {
            submit = {
                path:  `/api/tome/${this.id}`,
                successMsg: 'Tome details saved'
            }
        }
        axios.post(submit.path, {
                title: values.title,
                url: values.url
            }, {
                headers: {'x-auth': auth.getToken()}
            }
        ).then((res) => {
            notification.create(submit.successMsg, 'success');
            if(this.props.isNew) {
                this.props.history.replace(this.location + '/' + res.data.document._id);
                this.props.updateIsNewState();
            }
        }).catch(error => {
            auth.verifyError(error);
        })
    }
    cancelHandler = () => {
        this.props.history.push('/cms/tome');
    }
    getTomeData = () => {
        axios.get(`/api/tome/${this.id}`).then(res => {
            this.setState({data: res.data.document, isLoaded: true});
        }).catch(error => {
            auth.verifyError(error);
        })
    }
    componentDidMount () {
        if (!this.props.isNew) {
            this.getTomeData();
        }
    }
    componentDidUpdate () {
        this.id = this.props.isNew ? null : this.props.match.params.id;
    }
    render() {
        return (
            <section className="detail sub-container">
                {!this.state.isLoaded ? (
                    <Loader />
                ) : (
                    <React.Fragment>
                        <h2>{this.props.isNew ? 'Create' : 'Edit'} tome</h2>
                        <Formik
                            enableReinitialize
                            initialValues={this.state.data ? this.state.data : ''}
                            validationSchema={validSchema}
                            onSubmit={(values) => this.handleSubmit(values)}
                        >
                                
                        {props => (
                            <form onSubmit={props.handleSubmit}>
                            {formFields.map((field, index) => {
                                return (
                                    <InputField 
                                        {...field}
                                        key={index} 
                                        value={props.values[field.name]}
                                        onChange={props.handleChange}
                                        touched={props.touched[field.name]}
                                        onBlur={props.handleBlur}
                                        errors={props.errors[field.name]}
                                    />
                                )
                            })}
                            <div className={this.props.isNew ? 'action double' : 'action single'}>
                                {this.props.isNew &&
                                    <button className="cancel" onClick={this.cancelHandler}>Cancel</button>
                                }
                                <button type="submit">Save</button>    
                            </div>
                        </form>
                        )}
                        </Formik>
                    </React.Fragment>
                )}
            </section>
        )
    }
}

export default withRouter(TomeDetail);