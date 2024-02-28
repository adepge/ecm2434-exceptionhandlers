import "./stylesheets/pageNoFound.css";
import buddy from "../assets/404buddy.jpg"

function PageNoFound() {
  return (
    <div id="display-not-found">
      <img id="not-found-img" src={buddy}></img>
      <div id="status-not-found">404</div>
      <p id="description-not-found">Uh oh! We can't find the page you were looking for</p>
    </div>
  );
}

export default PageNoFound;
