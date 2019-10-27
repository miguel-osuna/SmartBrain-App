import React, { Fragment } from "react";

const SignIn = ({ onRouteChange }) => {
  return (
    <Fragment>
      <article className="br2 ba shadow-4 b--white-10 mv4 w-100 w-50-m w-25-l mw10 center">
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
                />
              </div>
            </fieldset>
            <div className="lh-copy mt3">
              <input
                className="white b br3 ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={() => onRouteChange("home")}
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
};

export default SignIn;
