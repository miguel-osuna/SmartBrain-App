import React, { Fragment, Component } from "react";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    const { name, age, occupation } = this.props.user;
    this.state = {
      name: name,
      age: age,
      occupation: occupation
    };
  }

  onFormChange = event => {
    switch (event.target.name) {
      case "user-name":
        this.setState({ name: event.target.value });
        break;
      case "user-age":
        this.setState({ age: event.target.value });
        break;
      case "user-occupation":
        this.setState({ occupation: event.target.value });
        break;
      default:
        return;
    }
  };

  onProfileUpdate = async data => {
    try {
      const { getAuthTokenInSessions, toggleModal, loadUser } = this.props;
      const token = getAuthTokenInSessions("token");
      const res_profile = await fetch(
        process.env.REACT_APP_HOME_PAGE + `/profile/${this.props.user.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: token },
          body: JSON.stringify({ formInput: data })
        }
      );

      if (res_profile.status === 200 || res_profile.status === 304) {
        toggleModal();
        loadUser({ ...this.props.user, ...data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { toggleModal, user } = this.props;
    const { name, age, occupation } = this.state;
    return (
      <Fragment>
        <div className="profile-modal">
          <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center bg-white-10">
            <main className="pa4 white-80 w-80">
              <img
                src="http://tachyons.io/img/logo.jpg"
                className="h3 w3 dib"
                alt="avatar"
              />
              <h1> {name} </h1>
              <h4> {`Images Submitted: ${user.entries}`}</h4>
              <p>
                {`Member since: ${new Date(user.joined).toLocaleDateString()}`}
              </p>
              <hr />
              <label className="db fw6 lh-copy f6" htmlFor="user-name">
                Name
              </label>
              <input
                className="b br3 pa2 white ba bg-transparent w-100"
                type="text"
                name="user-name"
                id="name"
                placeholder={user.name}
                onChange={this.onFormChange}
              />
              <label className="db fw6 lh-copy f6" htmlFor="user-age">
                Age
              </label>
              <input
                className="b br3 pa2 white ba bg-transparent w-100"
                type="text"
                name="user-age"
                id="age"
                placeholder={user.age}
                onChange={this.onFormChange}
              />
              <label className="db fw6 lh-copy f6" htmlFor="user-occupation">
                Occupation
              </label>
              <input
                className="b br3 pa2 white ba bg-transparent w-100"
                type="text"
                name="user-occupation"
                id="occupation"
                placeholder={user.occupation}
                onChange={this.onFormChange}
              />
              <div
                className="mt4"
                style={{ display: "flex", justifyContent: "space-evenly" }}
              >
                <input
                  type="button"
                  className="b br3 pa2 grow white pointer hover w-40 bg-light-blue b--white-20"
                  value="Save"
                  onClick={() =>
                    this.onProfileUpdate({ name, age, occupation })
                  }
                />
                <input
                  type="button"
                  className="b br3 pa2 grow white pointer hover w-40 bg-light-red b--white-20"
                  value="Cancel"
                  onClick={() => toggleModal()}
                />
              </div>
            </main>
            <div className="modal-close pointer" onClick={() => toggleModal()}>
              &times;
            </div>
          </article>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
