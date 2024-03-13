import './stylesheets/challenge.css';
import Coin from '../assets/challenge/coin.png';
import Cat from '../assets/store/Napoleon.png';

import CheckLogin from '../features/CheckLogin';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

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
            console.log(response)
            return response
        }

        getChallenges().then((challenges) => {
            setChallenges(challenges);
        });
    }, []);



    async function purchase(StickersName) {

        const token = cookies.get('token');
        if (token === undefined) {
            window.location.href = '/login';
        }

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
        console.log(response)
    }


    return (
        <>
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
                                            collect 5 posts
                                        </div>
                                        <div className='progress-bar'>
                                            <div className='progress'>
                                                <div className='progress-bar-fill' style={{ width: '30%' }}></div>
                                            </div>
                                            <div>3/5</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='reward-amount'>
                                    25
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
                                            collect 5 posts
                                        </div>
                                        <div className='progress-bar'>
                                            <div className='progress' >
                                                <div className='progress-bar-fill' style={{ width: '30%' }}></div>
                                            </div>
                                            <div>3/5</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='reward-amount'>
                                    25
                                    <img src={Coin} alt='coin' />
                                </div>
                            </div>
                            <div className='challenge-box'>
                                <div className='challenge-description'>
                                    <div className='content'>
                                        <div className='content-title'>
                                            collect 5 pieces of trash
                                        </div>
                                        <div className='progress-bar'>
                                            <div className='progress' >
                                                <div className='progress-bar-fill' style={{ width: '100%' }}></div>
                                            </div>
                                            <div>3/5</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='reward-amount'>
                                    25
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
                                    <div className='shop-item' key={avatar.name}>
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