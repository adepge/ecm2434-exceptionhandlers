import "./stylesheets/login.css";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div id="display">
      <div id="login-wrapper">
        <div id="login">
          {/* a spacer for the hader and footer  */}
          <div id="spacer">
            <div id="title">Login</div>
            <div id="form">
              <input className="text" type="text" placeholder="Username" />
              <input className="text" type="password" placeholder="Password" />
              <button>login</button>
              <div id="message">
                Not a member?{" "}
                <Link to={"/register"}>
                  <a>Sign Up</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
