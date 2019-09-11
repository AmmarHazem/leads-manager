import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createLead } from '../../actions/leads';

class Form extends Component {

    static propTypes = {
        createLead: PropTypes.func.isRequired,
    }

    state = {
        name: '',
        email: '',
        message: '',
        leedsCount: this.props.leads.length,
    }

    handleChange = e => this.setState({[e.target.name]: e.target.value,})

    handleSubmit = e => {
        e.preventDefault();
        this.props.createLead(this.state);
    }

    componentDidUpdate(prevProps){
        if(prevProps.leads.length < this.props.leads.length){
            this.setState({
                name: '',
                email: '',
                message: '',
            });
        }
    }

    render() {

        return (
            <div className="card mt-3 mb-2">
                <div className="card-header">
                    <h2>Add New Lead</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-6 form-group">
                                Name:
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="form-control"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange} 
                                />
                            </div>
                            <div className="col-6 form-group">
                                Email:
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="form-control"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange} 
                                />
                            </div>
                            <div className="col-12 form-group">
                                Message:
                                <textarea
                                    type="text"
                                    placeholder="Message"
                                    className="form-control"
                                    name="message"
                                    value={this.state.message}
                                    onChange={this.handleChange} 
                                />
                            </div>
                            <div className="col-12">
                                <button disabled={this.props.isLoading} type="submit" className="btn btn-primary btn-sm">
                                    {this.props.isLoading ? 'Loading...' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        leads: state.leads.leads,
        isLoading: state.leads.isLoading,
    }
}

export default connect(mapStateToProps, { createLead })(Form);
