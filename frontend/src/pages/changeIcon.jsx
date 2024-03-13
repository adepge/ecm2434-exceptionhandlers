import './stylesheets/changeIcon.css'
import Cat from '../assets/store/Napoleon.png';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import CheckLogin from '../features/CheckLogin';

const cookies = new Cookies();


function ChangeIcon() {

    const [avatars, setAvatars] = useState([]);
    const [user, setUser] = useState()
    const [profilePicture, setProfilePicture] = useState("")

    // set the user icon and the user data
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
    }, []);

    useEffect(() => {
        const token = cookies.get('token');
        if (token === undefined) {
            window.location.href = '/login';
        }

        const getIcons = async () => {
            try {
                // Update the API URL as per your configuration
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/getAvatars/"
                    ,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Token ${token}`,
                        },
                    }
                );
                return response.data;
            } catch (error) {
                console.error("Error occurred:", error);
                if (error.response) {
                    console.log("Response data:", error.response.data);
                    console.log("Response status:", error.response.status);
                    console.log("Response headers:", error.response.headers);
                }
            }
        }

        getIcons().then((data) => {
            setAvatars(data);
        });

    }, []);




    return (
        <div id="changeIcon">
            <div id='spacer'>
                <div id='content'>
                    <div id='title'>Change Icon</div>
                    <div id='user-icon'>
                        <img src={profilePicture} alt='profile pic' />
                    </div>
                    <div id='selections'>
                        <div id='title'>Select Icon</div>

                        <div id='selection-box'>
                            {/* dummy item to enforce grid */}
                            <div style={{ width: '85px' }} />
                            <div style={{ width: '85px' }} />
                            <div style={{ width: '85px' }} />
                            <div id={"forth"} style={{ width: '85px' }} />
                            {
                                // avatarsList[0]
                                avatars.map((avatar) => (
                                    <div className='selection-item' key={avatar.name}>
                                        <img src={avatar.path} alt='cat' width={"85px"} height={"85px"} />
                                        {avatar.name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ChangeIcon;