import './stylesheets/editProfile.css';

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