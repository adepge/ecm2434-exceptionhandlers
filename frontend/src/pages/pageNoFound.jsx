import "./stylesheets/pageNoFound.css";
import buddy from "../assets/404buddy.jpg"

function PageNoFound() {
  return (
    <div id="display">
      <img src={buddy}></img>
      <div id="status">404</div>
      <p id="description">Uh oh! We can't find the page you were looking for</p>
    </div>
  );
}

export default PageNoFound;
