import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser } from '../../actions/auth';

class Login extends Component {

    static propTypes = {
        loginUser: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    }

    state = {
        username: '',
        password: '',
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.loginUser(this.state);
    }

    handleChange = e => this.setState({[e.target.name]: e.target.value});

    render() {

        if(this.props.isAuthenticated){
            return <Redirect to="/" />
        }

        let {username, password} = this.state;
        return (
            <div className="row">
                <div className="col-md-6 col-12 mx-auto pt-5">
                    <div className="card">
                        <div className="card-header">
                            <h3>Login</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        name="username"
                                        value={username}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                                <p>
                                    Don't have an account
                                    <Link to="/register" className="ml-2">
                                        Register
                                    </Link>
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
    }
}

export default connect(mapStateToProps, { loginUser })(Login)
