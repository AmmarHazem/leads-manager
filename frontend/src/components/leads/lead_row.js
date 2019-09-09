import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { updateLead } from '../../actions/leads';

class LeadRow extends Component {

    state = {
        ...this.props.lead,
    }

    handleChange = e => this.setState({[e.target.name]: e.target.value});

    handleSubmit = e => {
        e.preventDefault();
        this.props.updateLead(this.state);
    }

    render() {

        let {lead, index, deleteLead} = this.props;
        return (
            <Fragment>
                <tr>
                    <td>{index + 1}</td>
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.message}</td>
                    <td>
                        <div className="modal fade" id={`updateLeadModal-${lead.id}`} tabIndex="-1" role="dialog" aria-labelledby="updateLeadModalTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="updateLeadModalTitle">Edit Lead {lead.name}</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <input 
                                                    type="text"
                                                    className="form-control"
                                                    name="name"
                                                    placeholder="Name"
                                                    value={this.state.name}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="text"
                                                    className="form-control"
                                                    name="email"
                                                    placeholder="Email"
                                                    value={this.state.email}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <textarea 
                                                    type="text"
                                                    className="form-control"
                                                    name="message"
                                                    placeholder="Message"
                                                    value={this.state.message}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button id={`modal-close-${lead.id}`} type="button" className="btn btn-secondary btn-update-lead" data-dismiss="modal">Cancel</button>
                                            <button disabled={this.props.isLoading} type="button" type="submit" className="btn btn-primary">
                                                {this.props.isLoading ? 'Loading...' : 'Save'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-sm" data-toggle="modal" data-target={`#updateLeadModal-${lead.id}`}>
                            <i className="fas fa-edit"></i>
                        </button>
                    </td>
                    <td>
                        <button onClick={() => deleteLead(lead.id)} className="btn btn-outline-danger btn-sm">
                            <i className="far fa-times-circle"></i>
                        </button>
                    </td>
                </tr>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.leads.isLoading,
    }
}

export default connect(mapStateToProps, { updateLead })(LeadRow)
