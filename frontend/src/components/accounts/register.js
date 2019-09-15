import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { registerUser } from '../../actions/auth';
import Spinner from '../common/spinner';

class Register extends Component {

    static propTypes = {
        registerUser: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
    }

    state = {
        username: '',
        password: '',
        password2: '',
        email: '',
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.registerUser(this.state);
    }

    handleChange = e => this.setState({[e.target.name]: e.target.value});

    render() {

        if(this.props.isAuthenticated){
            return <Redirect to="/" />
        }

        let {username, password2, password, email} = this.state;
        return (
            <div className="row">
                <div className="col-md-6 col-12 mx-auto pt-5">
                    <div className="card">
                        <div className="card-header">
                            <h3>Register</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        placeholder="Username"
                                        name="username"
                                        value={username}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        placeholder="Email"
                                        name="email"
                                        value={email}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="password"
                                        placeholder="Confirm Password"
                                        name="password2"
                                        value={password2}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <button disabled={this.props.isLoading} type="submit" className="btn btn-primary">
                                    {this.props.isLoading ? <Spinner /> : 'Register'}
                                </button>
                                <p>
                                    Already have an Account
                                    <Link to="/login" className="ml-2">Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.auth.isLoading,
    }
}

export default connect(mapStateToProps, { registerUser })(Register)
