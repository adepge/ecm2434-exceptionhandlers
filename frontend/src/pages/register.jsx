import "./stylesheets/register.css";

function RegisterPage() {
  return (
    <div id="register-wrapper">
      <div id="spacing">
        <div id="register">
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
            <button>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
