import React, { Component } from "react";
import { Formik, Field, Form } from "formik";
import { connect } from "react-redux";
import { auth } from "./authActionCreator";

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, mode) => dispatch(auth(email, password, mode)),
  };
};
class Auth extends Component {
  state = {
    mode: "Sign up",
  };
  handleButton = () => {
    this.setState({
      mode: this.state.mode === "Sign up" ? "Login" : "Sign up",
    });
  };
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            Name: "",
            password: "",
            confirmPassword: "",
            email: "",
          }}
          onSubmit={(values) => {
            this.props.auth(values.email, values.password, this.state.mode);
          }}
          validate={(values) => {
            const errors = {};
            if (this.state.mode === "Sign up") {
              if (!values.Name) {
                errors.Name = "Required";
              }
            }
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Invalid Email";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 6) {
              errors.password = "Must be 6 characters";
            }
            if (this.state.mode === "Sign up") {
              if (!values.confirmPassword) {
                errors.confirmPassword = "Required";
              } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Password does not match";
              }
            }

            return errors;
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <div
              style={{
                border: "1px solid grey",
                padding: "10px",
                marginTop: "20px",
                borderRadius: "10px",
              }}
            >
              <button
                style={{ background: "#d70f64", color: "white" }}
                className="btn w-100 rounded-0"
                onClick={this.handleButton}
              >
                Switch to {this.state.mode === "Sign up" ? "Login" : "Sign up"}
              </button>
              <br />
              <br />
              <form onSubmit={handleSubmit}>
                {this.state.mode === "Sign up" ? (
                  <div>
                    <input
                      name="Name"
                      placeholder="Your name"
                      className="form-control"
                      value={values.Name}
                      onChange={handleChange}
                    />
                    <span style={{ color: "red", marginTop: "10px" }}>
                      {errors.Name}
                    </span>
                    <br />
                  </div>
                ) : null}

                <input
                  name="email"
                  placeholder="Your email"
                  className="form-control"
                  value={values.email}
                  onChange={handleChange}
                />
                <span style={{ color: "red", marginTop: "10px" }}>
                  {errors.email}
                </span>
                <br />
                <input
                  name="password"
                  placeholder="Password"
                  type="password"
                  className="form-control"
                  value={values.password}
                  onChange={handleChange}
                />
                <span style={{ color: "red", marginTop: "10px" }}>
                  {errors.password}
                </span>
                <br />
                {this.state.mode === "Sign up" ? (
                  <div>
                    <input
                      name="confirmPassword"
                      placeholder="Retype Password"
                      type="password"
                      className="form-control"
                      value={values.confirmPassword}
                      onChange={handleChange}
                    />
                    <span style={{ color: "red", marginTop: "10px" }}>
                      {errors.confirmPassword}
                    </span>
                    <br />
                  </div>
                ) : null}

                <button type="submit" className="btn btn-success">
                  {this.state.mode === "Sign up" ? "Sign up" : "Login"}
                </button>
              </form>
            </div>
          )}
        </Formik>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Auth);
