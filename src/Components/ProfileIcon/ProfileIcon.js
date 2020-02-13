import React, { Component, Fragment } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class ProfileIcon extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = function() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  render() {
    const { dropdownOpen } = this.state;
    return (
      <Fragment>
        <div className="pa4 tc">
          <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
            <DropdownToggle
              tag="span"
              data-toggle="dropdown"
              aria-expanded={dropdownOpen}
            >
              <img
                src="http://tachyons.io/img/logo.jpg"
                className="br-100 h3 w3 dib pointer hover"
                alt="avatar"
              />
            </DropdownToggle>
            <DropdownMenu
              className="b--transparent shadow-5"
              style={{
                marginTop: "20px",
                background: "rgba(255, 255, 255, 0.5)",
                right: 0,
                left: "auto"
              }}
            >
              <DropdownItem onClick={() => this.props.toggleModal()}>
                View Profile
              </DropdownItem>
              <DropdownItem onClick={() => this.props.onRouteChange("signout")}>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Fragment>
    );
  }
}

export default ProfileIcon;
