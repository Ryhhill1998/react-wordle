import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import "./sign-in.styles.css";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/home");
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormFields((prev) => {
      const updatedFields = { ...prev };
      updatedFields[name] = value;
      return updatedFields;
    });
  };

  const signInUser = async () => {
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      redirectToHome();
    } catch (error) {
      console.error("User credentials not found");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signInUser();
  };

  return (
    <div className="form-container">
      <form className="form form--signin" onSubmit={handleSubmit}>
        <h2>Sign in</h2>
        <label className="form-label">
          <input
            className="form-input"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Email"
          />
        </label>
        <label className="form-label">
          <input
            className="form-input"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Password"
          />
        </label>
        <input className="submit-btn" type="submit" value="Sign in" />
      </form>
    </div>
  );
};

export default SignIn;
