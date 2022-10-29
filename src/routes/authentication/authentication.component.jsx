import SignUp from "../../components/sign-up/sign-up.component";
import SignIn from "../../components/sign-in/sign-in.component";

import "./authentication.styles.css";

const Authentication = () => {
  return (
    <div className="auth-container">
      <div className="forms-container">
        <SignUp />
        <SignIn />
      </div>
    </div>
  );
};

export default Authentication;
