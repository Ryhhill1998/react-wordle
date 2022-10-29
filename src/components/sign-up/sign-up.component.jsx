import { useState } from "react";

import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, confirmPassword } = formFields;

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === confirmPassword) {
      createAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } else {
      console.log("Passwords do not match!");
    }
  };

  return (
    <form className="form form--signup" onSubmit={handleSubmit}>
      <h2>Sign up form</h2>
      <label className="form-label">
        Email
        <input
          className="form-input"
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </label>
      <label className="form-label">
        Password
        <input
          className="form-input"
          type="text"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </label>
      <label className="form-label">
        Confirm password
        <input
          className="form-input"
          type="text"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
      </label>
      <input className="submit-btn" type="submit" value="Sign up" />
    </form>
  );
};

export default SignUp;
