import React, {Component} from 'react';
import Input from '../../../core/input';
import Select from '../../../core/select';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import auth from '../../../../utils/Auth';
import notification from '../../../../utils/Notification';
import Loader from '../../../core/loader';
import './style.scss';

let formFields = [];

const validSchema = Yup.object().shape({
    title: Yup.string().required(),
    url: Yup.string().required(),
});

class ChapterDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isLoaded: false,
            formDefaults: {
                title: '',
                url: '',
                tome: ''
            }
        }
        this.id = this.props.isNew ? null : this.props.match.params.id;
        this.location = this.props.history.location.pathname;
        this.tomeCollection = [];
    }
    handleSubmit = (values) => {
        let submit = {
            path: '/api/chapter',
            successMsg: `New chapter is created`
        }
        if (!this.props.isNew) {
            submit = {
                path:  `/api/chapter/${this.id}`,
                successMsg: 'Chapter details saved'
            }
        }
        axios.post(submit.path, {
                title: values.title,
                url: values.url,
                tome: values.tome
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
        this.props.history.push('/cms/chapter');
    }
    getChapterData = () => {
        axios.get(`/api/chapter/${this.id}`).then(res => {
            this.setState({data: res.data.document});
        }).catch(err => {
            auth.verifyError(err);
        })
    }
    getTomeCollection = () => {
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
            this.setState({formDefaults: updatedFormDefaults});
        }).catch(err => {
            auth.verifyError(err);
        })
    }
    isLoadedHandler = () => {
        let tomsAreLoaded = this.tomeCollection.length > 0;
        let detailIsLoaded = false;

        let updatedFormDefaults = Object.assign({}, this.state.formDefaults);
        if (this.props.isNew) {
            detailIsLoaded = true;
        } else if (this.state.data !== null) {
            updatedFormDefaults = {
                title: this.state.data.title,
                url: this.state.data.url,
                tome: this.state.data.parentId
            }
            detailIsLoaded = true;
        }

        if (tomsAreLoaded && detailIsLoaded) {
            this.setState({formDefaults: updatedFormDefaults, isLoaded: true});
        }
    }
    componentDidMount () {
        this.getTomeCollection();
        if (!this.props.isNew) {
            this.getChapterData();
        }
    }
    componentDidUpdate (prevProps, prevState) {
        this.id = this.props.isNew ? null : this.props.match.params.id;
        if (!this.state.isLoaded) {
            this.isLoadedHandler();
        }
    }
    render() {
        return (
            <section className="detail chapter-detail sub-container">
                {!this.state.isLoaded ? (
                    <Loader />
                ) : (
                    <React.Fragment>
                        <h2>{this.props.isNew ? 'Create' : 'Edit'} chapter</h2>
                        <Formik
                            enableReinitialize
                            initialValues={this.state.formDefaults ? this.state.formDefaults : ''}
                            validationSchema={validSchema}
                            onSubmit={(values) => this.handleSubmit(values)}
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

export default withRouter(ChapterDetail);