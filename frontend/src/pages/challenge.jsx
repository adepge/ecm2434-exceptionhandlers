import './stylesheets/challenge.css';
import Coin from '../assets/challenge/coin.png';
import Cat from '../assets/store/Napoleon.png';

import CheckLogin from '../features/CheckLogin';
import { useEffect } from 'react';

function Challenge() {

    useEffect(() => {
        CheckLogin();
    }, []);
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
                                                <div className='progress-bar-fill' style={{ width: '70%' }}></div>
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
                                <div className='shop-item'>
                                    <img src={Cat} alt='cat' width={"85px"} height={"85px"} />
                                    Napoleon
                                    <div className='cost'>
                                        100
                                        <img src={Coin} alt='coin' width={"15px"} height={"15px"} />
                                    </div>
                                </div>
                                <div className='shop-item'>
                                    <img src={Cat} alt='cat' width={"85px"} height={"85px"} />
                                    Napoleon
                                    <div className='cost'>
                                        100
                                        <img src={Coin} alt='coin' width={"15px"} height={"15px"} />
                                    </div>
                                </div>
                                <div className='shop-item'>
                                    <img src={Cat} alt='cat' width={"85px"} height={"85px"} />
                                    Napoleon
                                    <div className='cost'>
                                        100
                                        <img src={Coin} alt='coin' width={"15px"} height={"15px"} />
                                    </div>
                                </div>
                                <div className='shop-item'>
                                    <img src={Cat} alt='cat' width={"85px"} height={"85px"} />
                                    <div className='details'>
                                        Napoleon
                                        <div className='cost'>
                                            100
                                            <img src={Coin} alt='coin' width={"15px"} height={"15px"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Challenge;