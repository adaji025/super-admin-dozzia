import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/svg/dozzia.svg";

import "./auth-header.scss";

const AuthHeader = () => {
  return (
    <div className="auth-header">
      <div className="app-logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
    </div>
  );
};

export default AuthHeader;
