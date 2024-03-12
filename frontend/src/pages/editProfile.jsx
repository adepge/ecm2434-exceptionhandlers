import './stylesheets/editProfile.css';

import { Link } from 'react-router-dom';

function editProfile() {
    return (
        <div id='editProfile'>
            <div id='main'>
                <div id='spacer'>
                    <div id='content'>
                        <div id='title'>Edit Profile</div>
                        <div id='profilePic'>
                            <img src='https://www.w3schools.com/howto/img_avatar.png' alt='profile pic' />
                        </div>
                        <Link to={"/changeIcon"}>
                            <button style={{ width: "auto", fontSize: "16px", padding: "5px 10px", marginTop: "20px" }}>Change Icon</button>
                        </Link>
                        <form>
                            <div className='field'>
                                <label for='name'>Bio</label>
                                <input type='text' id='username' name='username' />
                            </div>
                            <div className='field'>
                                <label for='name'>Youtube</label>
                                <input id='bio' name='bio' />
                            </div>
                            <div className='field'>
                                <label for='name'>Instagram</label>
                                <input type='text' id='website' name='website' />
                            </div>
                            <button type='submit'>Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default editProfile;