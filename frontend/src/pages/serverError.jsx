import "./stylesheets/serverError.css";

function ServerError({ msg }) {
  return (
    <div id="error">
      <h1>Error</h1>
      <p>{msg}</p>
    </div>
  );
}

export default ServerError;
