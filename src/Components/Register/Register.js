import React, { Fragment, Component } from "react";

// const Register = ({ onRouteChange }) =>
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register_name: "",
      register_email: "",
      register_password: ""
    };
  }

  onNameChange = event => {
    this.setState({ register_name: event.target.value });
  };

  onEmailChange = event => {
    this.setState({ register_email: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ register_password: event.target.value });
  };

  onSubmitRegister = async () => {
    const { saveAuthTokenInSessions, loadUser, onRouteChange } = this.props;
    const res_register = await fetch(
      process.env.REACT_APP_HOME_PAGE + "/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.state.register_name,
          email: this.state.register_email,
          password: this.state.register_password
        })
      }
    );

    const data = await res_register.json();

    if (data.userId && data.success === "true") {
      saveAuthTokenInSessions(data.token);

      const res_profile = await fetch(
        process.env.REACT_APP_HOME_PAGE + `/profile/${data.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: data.token
          }
        }
      );

      const user = await res_profile.json();

      if (user && user.email) {
        loadUser(user);
        onRouteChange("home");
      }
    }
  };

  render() {
    // const { onRouteChange } = this.props;
    const {
      onNameChange,
      onEmailChange,
      onPasswordChange,
      onSubmitRegister
    } = this;
    return (
      <Fragment>
        <article className="br2 ba shadow-4 b--white-10 mv4 w-100 w-50-m w-25-l mw8 center">
          <main className="pa4 white-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>

                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="b br3 pa2 white input-reset ba bg-transparent w-100"
                    type="text"
                    name="name"
                    id="name"
                    onChange={onNameChange}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="b br3 pa2 white input-reset ba bg-transparent w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="b br3 pa2 white input-reset ba bg-transparent w-100"
                    type="password"
                    name="password"
                    id="password"
                    onChange={onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  className="white b br3 ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Register"
                  onClick={() => onSubmitRegister()}
                />
              </div>
            </div>
          </main>
        </article>
      </Fragment>
    );
  }
}

export default Register;
