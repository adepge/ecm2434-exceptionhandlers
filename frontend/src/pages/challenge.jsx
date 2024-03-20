import './stylesheets/challenge.css';
import Coin from '../assets/challenge/coin.png';
import Cat from '../assets/store/Napoleon.png';

import CheckLogin from '../features/CheckLogin';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import ErrorBox from '../features/ErrorBox';
import usericon from '../assets/header/user-icon.jpg'
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();

function Challenge() {

    // Local state management for UI interactions and data handling.
    const [avatars, setAvatars] = useState([]);
    const [challenges, setChallenges] = useState([]);
    const [token, setToken] = useState(cookies.get('token'))

    // check if the user have logged in and setup everyting
    useEffect(() => {

        // check if the user has logged in and get the token
        const navigate = useNavigate();

        useEffect(() => {
          CheckLogin(true, navigate);
        }, []);
      

        // get all the avatars
        const getAvatars = async () => {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/getAvatars/"
                , {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`,
                    }
                }
            )
            return response.data
        }
        getAvatars().then((avatars) => {
            setAvatars(avatars);
        });

        // get all the challenges
        const getChallenges = async () => {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/getChallenges/"
                , {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`,
                    }
                }
            )
            return response.data
        }
        getChallenges().then((challenges) => {
            setChallenges(challenges);
        });
    }, []);

    // function to purchase a avatar given the avatar name
    async function purchase(StickersName) {

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/purchase/"
                , {
                    "sticker": StickersName
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`,
                    },
                }
            )

            // reload the page after puchase
            location.reload();
        } catch (error) {
            if (error.response.data.Message) {
                alert(error.response.data.Message)
            }
            else {
                alert("Internal server error")
            }
        }
    }


    return (
        <>
            {/* display if theres an error(unused) */}
            <ErrorBox />
            <div id='challenge'>
                <div id='spacer'>
                    <div className='title'>
                        Challenges
                    </div>
                    <div id='main'>
                        <div id='daily' className='challenge-box-with-title'>
                            Daily
                            <div className='challenge-box'>
                                <div className='challenge-description'>
                                    <div className='content'>
                                        <div className='content-title'>
                                            {challenges.DailyChallenge}
                                        </div>
                                        <div className='progress-bar'>
                                            <div className='progress'>
                                                <div className='progress-bar-fill' style={{ width: eval(challenges.Daily) * 100 + "%" }}></div>
                                            </div>
                                            <div>{challenges.Daily}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='reward-amount'>
                                    {challenges.DailyCoinsRewarded}
                                    <img src={Coin} alt='coin' />

                                </div>
                            </div>
                        </div>
                        <div id='milestones' className='challenge-box-with-title'>
                            Milestones
                            <div className='challenge-box'>
                                <div className='challenge-description'>
                                    <div className='content'>
                                        <div className='content-title'>
                                            {challenges.Milestone1Challenge}
                                        </div>
                                        <div className='progress-bar'>
                                            <div className='progress' >
                                                <div className='progress-bar-fill' style={{ width: eval(challenges.Milestone1) * 100 + "%" }}></div>
                                            </div>
                                            <div>{challenges.Milestone1}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='reward-amount'>
                                    {challenges.Milestone1CoinsRewarded}
                                    <img src={Coin} alt='coin' />
                                </div>
                            </div>
                            <div className='challenge-box'>
                                <div className='challenge-description'>
                                    <div className='content'>
                                        <div className='content-title'>
                                            {challenges.Milestone2Challenge}
                                        </div>
                                        <div className='progress-bar'>
                                            <div className='progress' >
                                                <div className='progress-bar-fill' style={{ width: eval(challenges.Milestone2) * 100 + "%" }}></div>
                                            </div>
                                            <div>{challenges.Milestone2}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='reward-amount'>
                                    {challenges.Milestone2CoinsRewarded}
                                    <img src={Coin} alt='coin' />
                                </div>
                            </div>
                        </div>
                        <div id='shop' className='challenge-box-with-title'>
                            Shop
                            <div id='shop-box'>
                                {/* dummy item to enforce grid */}
                                <div style={{ width: '85px' }} />
                                <div style={{ width: '85px' }} />
                                <div style={{ width: '85px' }} />
                                <div id={"forth"} style={{ width: '85px' }} />
                                {avatars.map((avatar) => (
                                    <div className='shop-item' key={avatar.name} onClick={() => { purchase(avatar.name) }}>
                                        <img src={avatar.path === "NULL" ? usericon : avatar.path} alt='cat' width={"85px"} height={"85px"} style={{ border: "none", borderRadius: "100%" }} />
                                        {avatar.name}
                                        <div className='cost'>
                                            {avatar.price}
                                            <img src={Coin} alt='coin' width={"15px"} height={"15px"} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Challenge;