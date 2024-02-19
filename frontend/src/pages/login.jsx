import "./stylesheets/login.css";

function LoginPage() {
  return (
    <div id="display">
      <div id="login-wrapper">
        <div id="login">
          <div id="spacer">
            <div id="title">Login</div>
            <div id="form">
              <input className="text" type="text" placeholder="Username" />
              <input className="text" type="password" placeholder="Password" />
              <button>login</button>
                <div id="message">Not a member? <a href="/signup">Sign Up</a></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
