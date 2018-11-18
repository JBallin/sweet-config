import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

class TopNav extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
  }

  state = {
    isOpen: false,
  }

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    const { isOpen } = this.state;
    const { user, title } = this.props;

    const loginAndSignupLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink to="/login" className="nav-link" exact>Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/signup" className="nav-link">Signup</NavLink>
        </NavItem>
      </Nav>
    );

    const logoutLink = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink to="/logout" className="nav-link" exact>Logout</NavLink>
        </NavItem>
      </Nav>
    );

    return (
      <div>
        <Navbar color="primary" dark expand="md">
          <NavbarBrand href="/">{title}</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            { user.username ? logoutLink : loginAndSignupLinks }
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, null)(TopNav);