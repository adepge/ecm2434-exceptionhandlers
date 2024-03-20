import './stylesheets/changeIcon.css'
import Cat from '../assets/store/Napoleon.png';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import CheckLogin from '../features/CheckLogin';
import usericon from '../assets/header/user-icon.jpg'
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();


function ChangeIcon() {

    const [avatars, setAvatars] = useState([]);
    const [user, setUser] = useState()
    const [profilePicture, setProfilePicture] = useState("")

    const navigate = useNavigate();

    // set the user icon and the user data
    useEffect(() => {
        const getIcon = async () => {
            let response = await CheckLogin(true, navigate);
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

        // get all the unlocked avatars
        const getIcons = async () => {
            // get all the locked avatar and set them
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/getAllAvatars/"
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
                    alert("internal server error")
                }
            }
        }
        getIcons().then((data) => {
            setAvatars(data);
        });

    }, []);

    // set the user's icon
    async function setIcon(avatar) {
        const token = cookies.get('token');
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/changeAvatar/",
                {
                    avatar: avatar
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`,
                    },
                }
            );
            location.reload();
        } catch (error) {
            console.error("Error occurred:", error);
            if (error.response) {
                alert("internal server error")
            } else {
                alert("cannot connect to server")
            }
        }
    }

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
                                avatars.map((avatar) => (
                                    <div className='selection-item' key={avatar.name} onClick={() => { setIcon(avatar.name) }}>
                                        <img src={avatar.path === "NULL" ? usericon : avatar.path} alt='cat' width={"85px"} height={"85px"} style={{ border: "none", borderRadius: "100%" }} />
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