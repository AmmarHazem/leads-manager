import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads, deleteLead } from '../../actions/leads';
import LeadRow from './lead_row';

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

        if(this.props.isLoading){
            return (
                <div className="d-flex justify-content-center align-items-center mt-3">
                    <i className="fas fa-circle-notch fa-4x fa-spin"></i>
                </div>
            )
        }
        let {leads} = this.props;
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
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead, index) => <LeadRow key={lead.id} lead={lead} index={index} deleteLead={this.props.deleteLead} />)}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        leads: state.leads.leads,
        isLoading: state.leads.isLoading,
    }
}

export default connect(mapStateToProps, { getLeads, deleteLead })(Leads);
