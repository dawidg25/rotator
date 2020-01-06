import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ChapterDetail from './detail';

class ChapterModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNew: this.props.match.params.id === undefined
        }
    }

    updateIsNewState = () => {
        this.setState({isNew: false});
    }

    detailsComponent = () => {
        return <ChapterDetail isNew={this.state.isNew} updateIsNewState={this.updateIsNewState} />
    }

    conditionalComponents = () => {
        if (this.state.isNew) {
            return this.detailsComponent()
        }
        return (
            <React.Fragment>
                {this.detailsComponent()}
            </React.Fragment>
        )
    }
    renderComponents = () => {
        return (
            this.detailsComponent()
        )
    }
    
    render() {
        return (
            <section className="chapter-modify container">
                {this.conditionalComponents()}
            </section>
        )
    }
}
export default withRouter(ChapterModify);
