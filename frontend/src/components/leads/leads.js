import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads, deleteLead } from '../../actions/leads';

class Leads extends Component {

    static propType = {
        leads: PropTypes.array.isRequired,
        getLeads: PropTypes.func.isRequired,
        deleteLead: PropTypes.func.isRequired,
    }

    componentDidMount(){
        this.props.getLeads();
    }

    render() {

        let {leads} = this.props;
        if(this.props.leads.length == 0){
            return (
                <Fragment>
                    <i className="fas fa-circle-notch fa-4x fa-spin"></i>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <h2>Leads</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Messge</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead, index) => (
                            <tr key={lead.id}>
                                <td>{index + 1}</td>
                                <td>{lead.name}</td>
                                <td>{lead.email}</td>
                                <td>{lead.message}</td>
                                <td>
                                    <button onClick={() => this.props.deleteLead(lead.id)} className="btn btn-danger btn-sm">
                                        <i className="far fa-times-circle"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        leads: state.leads.leads,
    }
}

export default connect(mapStateToProps, { getLeads, deleteLead })(Leads);
