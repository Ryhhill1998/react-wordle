import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, confirmPassword } = formFields;

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

  const signUpUser = async () => {
    try {
      await createAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      redirectToHome();
    } catch (error) {
      console.error("User credentials not found");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === confirmPassword) {
      signUpUser();
    } else {
      console.log("Passwords do not match!");
    }
  };

  return (
    <div className="form-container">
      <form className="form form--signup" onSubmit={handleSubmit}>
        <h2>Sign up form</h2>
        <label className="form-label">
          <input
            className="form-input"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            autoComplete="nope"
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
        <label className="form-label">
          <input
            className="form-input"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Confirm password"
          />
        </label>
        <input className="submit-btn" type="submit" value="Sign up" />
      </form>
    </div>
  );
};

export default SignUp;
