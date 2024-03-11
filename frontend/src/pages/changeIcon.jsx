import './stylesheets/changeIcon.css'
import Cat from '../assets/store/Napoleon.png';

function ChangeIcon() {
    return (
        <div id="changeIcon">
            <div id='spacer'>
                <div id='content'>
                    <div id='title'>Change Icon</div>
                    <div id='user-icon'>
                        <img src='https://www.w3schools.com/howto/img_avatar.png' alt='profile pic' />
                    </div>
                    <div id='selections'>
                        <div id='title'>Select Icon</div>

                        <div id='selection-box'>
                            {/* dummy item to enforce grid */}
                            <div style={{ width: '85px' }} />
                            <div style={{ width: '85px' }} />
                            <div style={{ width: '85px' }} />
                            <div id={"forth"} style={{ width: '85px' }} />
                            <div className='selection-item'>
                                <img src={Cat} alt='cat' width={"85px"} height={"85px"} />
                                Napoleon
                            </div>
                            <div className='selection-item'>
                                <img src={Cat} alt='cat' width={"85px"} height={"85px"} />
                                Napoleon
                            </div>
                            <div className='selection-item'>
                                <img src={Cat} alt='cat' width={"85px"} height={"85px"} />
                                Napoleon
                            </div>
                            <div className='selection-item'>
                                <img src={Cat} alt='cat' width={"85px"} height={"85px"} />
                                <div className='details'>
                                    Napoleon
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ChangeIcon;