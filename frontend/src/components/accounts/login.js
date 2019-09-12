import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Register extends Component {

    state = {
        username: '',
        password: '',
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log('--- register submit ');
    }

    handleChange = e => this.setState({[e.target.name]: e.target.value});

    render() {

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
