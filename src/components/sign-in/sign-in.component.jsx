import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

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
    <form className="form form--signin" onSubmit={handleSubmit}>
      <h2>Sign in form</h2>
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
      <input className="submit-btn" type="submit" value="Sign in" />
    </form>
  );
};

export default SignIn;
