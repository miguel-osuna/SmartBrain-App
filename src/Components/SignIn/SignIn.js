import React, { Fragment, Component } from "react";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signin_email: "",
      signin_password: ""
    };
  }

  onEmailChange = event => {
    this.setState({ signin_email: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ signin_password: event.target.value });
  };

  saveAuthTokenInSessions = token => {
    window.sessionStorage.setItem("token", token);
  };

  getAuthTokenInSessions = () => {
    return window.sessionStorage.getItem("token");
  };

  onSubmitSignIn = () => {
    fetch(process.env.REACT_APP_HOME_PAGE + "/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.signin_email,
        password: this.state.signin_password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.userId && data.success === "true") {
          this.saveAuthTokenInSessions(data.token);
          if (data && data.userId) {
            fetch(process.env.REACT_APP_HOME_PAGE + `/profile/${data.userId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: data.token
              }
            })
              .then(res => res.json())
              .then(user => {
                if (user && user.email) {
                  this.props.loadUser(user);
                  this.props.onRouteChange("home");
                }
              });
          }
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    const { onEmailChange, onPasswordChange, onSubmitSignIn } = this;
    return (
      <Fragment>
        <article className="br2 ba shadow-4 b--white-10 mv4 w-100 w-50-m w-25-l mw8 center">
          <main className="pa4 white-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
              <div className="lh-copy mt3">
                <input
                  className="white b br3 ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                  onClick={() => onSubmitSignIn()}
                />
              </div>
              <div className="lh-copy mt3">
                <input
                  className="white bn br3 ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Register"
                  onClick={() => onRouteChange("register")}
                />
              </div>
            </div>
          </main>
        </article>
      </Fragment>
    );
  }
}

export default SignIn;
