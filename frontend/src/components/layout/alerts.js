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
        if(prevProps.errors !== this.props.errors){
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
        }

        if(prevProps.messages !== this.props.messages){
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
