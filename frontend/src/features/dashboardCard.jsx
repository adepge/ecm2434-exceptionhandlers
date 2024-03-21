import exitimg from '../assets/map/close.svg';
import './stylesheets/dashboardCard.css';

// Component for displaying a post in the admin dashboard
const DashboardCard = ({id, username, isSuperUser, image, caption, datetime, location, userid, setPostView, deletePost, deleteUser}) => {

    // Format the date into a readable format
    function formatDate(dateString) {
        const options = { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        const formattedDate = `${date.toLocaleTimeString('en-GB', options)}`;
    
        return formattedDate;
    }

    const date = formatDate(datetime);

    return ( 
        <div className="dashboard-card">
            <button className="exit-button" onClick={() => setPostView(false)}><img src={exitimg}></img></button>
            <img src={"http://127.0.0.1:8000" + image}></img>
            <p>Caption: {caption}</p>
            <p>Location: {location}</p>
            <p>Author: {username}</p>
            <p>Date posted: {date}</p>
            <div id="button-shelf">
                <button type='button' onClick={() => deletePost(id)} className="delete-button">Delete Post</button>
                <button type='button' disabled={isSuperUser} onClick={() => deletePost(banUser)} className="delete-button">Ban User</button>
            </div>
        </div>
    );
}
 
export default DashboardCard;