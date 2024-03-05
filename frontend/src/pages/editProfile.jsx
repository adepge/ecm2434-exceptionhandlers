import './stylesheets/editProfile.css';

function editProfile() {
    return (
        <div id='editProfile'>
            <div id='main'>
                <div id='spacer'>
                    <div id='title'>Edit Profile</div>
                    <div id='profilePic'>
                        <img src='https://www.w3schools.com/howto/img_avatar.png' alt='profile pic' />
                    </div>
                    <form>
                        <div id='input'>
                            <input type='text' id='username' name='username' />
                        </div>
                        <div id='input'>
                            <input id='bio' name='bio' />
                        </div>
                        <div id='input'>
                            <input type='text' id='website' name='website' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default editProfile;