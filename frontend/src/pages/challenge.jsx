import './stylesheets/challenge.css';
import Coin from '../assets/challenge/coin.png';
import Cat from '../assets/store/Napoleon.png';

import CheckLogin from '../features/CheckLogin';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import ErrorBox from '../features/ErrorBox';

const cookies = new Cookies();

function Challenge() {

    const [avatars, setAvatars] = useState([]);
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        const token = cookies.get('token');
        if (token === undefined) {
            window.location.href = '/login';
        }
        CheckLogin();

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
            console.log(challenges)
        });
    }, []);



    async function purchase(StickersName) {

        const token = cookies.get('token');
        if (token === undefined) {
            window.location.href = '/login';
        }

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
                                                <div className='progress-bar-fill' style={{ width: eval(challenges.DailyPostsaves) }}></div>
                                            </div>
                                            <div>{challenges.DailyPostsaves}</div>
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
                                                <div className='progress-bar-fill' style={{ width: eval(challenges.Milestone1postscreation) }}></div>
                                            </div>
                                            <div>{challenges.Milestone1postscreation}</div>
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
                                                <div className='progress-bar-fill' style={{ width: eval(challenges.Milestone2postscreation) }}></div>
                                            </div>
                                            <div>{challenges.Milestone2savesneeed}</div>
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
                                        <img src={avatar.path} alt='cat' width={"85px"} height={"85px"} />
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