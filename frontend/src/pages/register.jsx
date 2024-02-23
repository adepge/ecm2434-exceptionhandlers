import "./stylesheets/register.css";

function RegisterPage() {
  return (
    <div id="display">
      <div id="register-wrapper">
        <div id="register">
          <div id="spacer">
            <div id="title">Register</div>
            <div id="form">
              <input className="text" type="text" placeholder="Username" />
              <input className="text" type="text" placeholder="Email" />
              <input className="text" type="password" placeholder="Password" />
              <input
                className="text"
                type="password"
                placeholder="Confirm Password"
              />
              <label class="checkbox">
                <input type="checkbox" />
                <span class="checkmark"></span>I agree to Postpal’s Terms &
                Conditions and Privacy Policy
              </label>
              <button>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
