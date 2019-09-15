import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Alerts extends Component {

    static propTypes = {
        errors: PropTypes.object.isRequired,
        messages: PropTypes.object.isRequired,
    }

    componentDidUpdate(prevProps){
        if(prevProps.errors != this.props.errors){
            let { errors } = this.props;
            if(errors.msg.name){
                this.props.alert.error(`Name: ${errors.msg.name.join()}`);
            }
            if(errors.msg.email){
                this.props.alert.error(`Email: ${errors.msg.email.join()}`);
            }
            if(errors.msg.message){
                this.props.alert.error(`Message: ${errors.msg.message.join()}`);
            }
            if(errors.msg.detail){
                this.props.alert.error(errors.msg.detail)
            }
            if(errors.msg.username){
                this.props.alert.error(`${errors.msg.username}`);
            }
            if(errors.msg.non_field_errors){
                this.props.alert.error(errors.msg.non_field_errors);
            }
        }

        if(prevProps.messages != this.props.messages){
            let {messages} = this.props
            if(messages.leadDeleted){
                this.props.alert.success(messages.leadDeleted);
            }
            if(messages.leadAdded){
                this.props.alert.success(messages.leadAdded);
            }
            if(messages.leadUpdated){
                this.props.alert.success(messages.leadUpdated);
            }
            if(messages.loggedIn){
                this.props.alert.success(messages.loggedIn);
            }
            if(messages.registerSuccess){
                this.props.alert.success(messages.registerSuccess);
            }
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => {
    return {
        errors: state.errors,
        messages: state.messages,
    }
}

export default connect(mapStateToProps, null)(withAlert()(Alerts));
