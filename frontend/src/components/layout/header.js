import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutUser } from '../../actions/auth';

class Header extends React.Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logoutUser: PropTypes.func.isRequired,
    };

    render() {

        let { isAuthenticated, user } = this.props.auth;
        let links = null;

        if (isAuthenticated) {
            links = (
                <Fragment>
                    <li className="nav-item active">
                        <button className="btn">{user.username}</button>
                    </li>
                    <li className="nav-item active">
                        <button onClick={this.props.logoutUser} className="nav-link btn btn-info btn-sm text-light">Logout</button>
                    </li>
                </Fragment>
            );
        }
        else {
            links = (
                <Fragment>
                    <li className="nav-item active">
                        <Link to="/register" className="nav-link">Register</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                </Fragment >
            );
        }
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="/">Lead Manager</Link>
                        <ul className="navbar-nav ml-auto mr-3 mt-2 mt-lg-0">
                            {links}
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps, { logoutUser })(Header);
