import './stylesheets/editProfile.css';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CheckLogin from '../features/CheckLogin';
import usericon from "../assets/header/user-icon.jpg";

function editProfile() {

    const [user, setUser] = useState({})
    const [profilePicture, setProfilePicture] = useState("")
    const [profileData, setProfileData] = useState({
        bio: '',
        youtube: '',
        instagram: '',
        twitter: ''

    })

    useEffect(() => {
        const getIcon = async () => {
            let response = await CheckLogin();
            return response.data
        }
        getIcon().then((user) => {
            setUser(user)
            if (user.profilePicture !== "NULL") {
                setProfilePicture(user.profilePicture)
            } else {
                setProfilePicture(usericon)
            }
        });

        const getProfile = async () => {
            let response = await CheckLogin();
            return response.data
        }
        getProfile().then((user) => {
            setUser(user)
            setProfileData({
                bio: user.Bio,
                youtube: user.youtube,
                instagram: user.instagram,
                twitter: user.twitter
            })

        });
    }, []);

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value })
        console.log(profileData)
    }

    return (
        <div id='editProfile'>
            <div id='main'>
                <div id='spacer'>
                    <div id='content'>
                        <div id='title'>Edit Profile</div>
                        <div id='profilePic'>
                            <img src={profilePicture} alt='profile pic' />
                        </div>
                        <Link to={"/changeIcon"}>
                            <button style={{ width: "auto", fontSize: "16px", padding: "5px 10px", marginTop: "20px" }}>Change Icon</button>
                        </Link>
                        <form>
                            <div className='field'>
                                <label for='name'>Bio</label>
                                <input type='text' id='bio' name='bio' value={profileData.bio} onChange={handleChange} />
                            </div>
                            <div className='field'>
                                <label for='name'>Youtube</label>
                                <input id='youtube' name='youtube' value={profileData.youtube} onChange={handleChange} />
                            </div>
                            <div className='field'>
                                <label for='name'>Instagram</label>
                                <input type='text' id='instagram' name='instagram' value={profileData.instagram} onChange={handleChange} />
                            </div>
                            <div className='field'>
                                <label for='name'>Twitter</label>
                                <input type='text' id='twitter' name='twitter' value={profileData.twitter} onChange={handleChange} />
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