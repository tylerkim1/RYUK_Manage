import React from 'react';
import isCheckImage from './assets/check.png';
import canSendMsgImage from './assets/send.png';
import missionImage from './assets/sample.png';
// , border: '1px solid black'

const MenuUser = () => {
    return (
        <div id="menu-user-container" style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <div id="menu-user-header" style={{display: 'flex', flex: 1, marginBottom: '3rem'}}>
                <div id="menu-user-header-date" style={{display: 'flex', flex: 1.5, padding: '1rem 1rem 0 2rem', alignItems: 'end'}}>
                    <span style={{fontSize: '3rem', fontWeight: '800'}}>
                        9월 22일
                    </span>
                </div>
                <div id="menu-user-header-userName" style={{display: 'flex', flex: 3, alignItems: 'end'}}>
                    <span style={{fontSize: '2rem'}}>
                        '쿵짝' 님의 미션현황
                    </span>
                </div>
                <div id="menu-user-header-achieveLevel" style={{display: 'flex', flex: 3, alignItems: 'end'}}>
                    <span style={{fontSize: '3rem',}}>
                        성취율: 75%
                    </span>
                </div>
            </div>
            <div id="menu-user-body" style={{display: 'flex', flex: 7, paddingLeft: '2rem'}}>
                <div id="today-mission">
                    <div id="today-mission-desc" style={{marginBottom: '2rem'}}>
                        <span style={{fontSize: '2rem', fontWeight: '800'}}>
                            오늘 수행할 미션
                        </span>
                    </div>
                    <div id="today-mission-list" style={{display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap', gap: '2rem' }}> 
                        <div id="today-mission" style={{display: 'flex', flexDirection: 'column', width: '20rem', height: '35rem', backgroundColor: '#FFFFFF', borderRadius: '1rem', padding: '0 1rem 0 1rem'}}>
                            <div id="today-mission-header" style={{display: 'flex', flex: 1}}>
                                <div id="today-mission-title" style={{display: 'flex', flex: 7, alignItems: 'center'}}>
                                    <span style={{fontSize: '1.2rem', fontWeight: '800'}}>
                                        미션 1
                                    </span>
                                </div>
                                <div id="today-mission-isComplete" style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <img src={isCheckImage} alt="user" style={{ width: '1.2rem', height: '1.2rem' }} />
                                </div>
                                <div id="today-mission-sendMsg" style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <img src={canSendMsgImage} alt="user" style={{ width: '1.2rem', height: '1.2rem' }} />
                                </div>
                            </div>
                            <div id="today-mission-body" style={{display: 'flex', flexDirection: 'column', flex: 5}}>
                                <div id="today-mission-img" style={{display: 'flex', flex: 2, marginBottom: '1rem'}}>
                                    <img src={missionImage} alt="user" style={{ width: '100%', height: '100%' }} />
                                </div>
                                <div id="today-mission-desc" style={{display: 'flex', flex: 1}}>
                                    <span style={{fontSize: '1rem', fontWeight: '700'}}>
                                        오늘 과일을 썰어 먹었어요!
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div id="today-mission" style={{display: 'flex', flexDirection: 'column', width: '20rem', height: '35rem', backgroundColor: '#FFFFFF', borderRadius: '1rem', padding: '0 1rem 0 1rem'}}>
                            <div id="today-mission-header" style={{display: 'flex', flex: 1}}>
                                <div id="today-mission-title" style={{display: 'flex', flex: 7, alignItems: 'center'}}>
                                    <span style={{fontSize: '1.2rem', fontWeight: '800'}}>
                                        미션 2
                                    </span>
                                </div>
                                <div id="today-mission-isComplete" style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <img src={isCheckImage} alt="user" style={{ width: '1.2rem', height: '1.2rem' }} />
                                </div>
                                <div id="today-mission-sendMsg" style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <img src={canSendMsgImage} alt="user" style={{ width: '1.2rem', height: '1.2rem' }} />
                                </div>
                            </div>
                            <div id="today-mission-body" style={{display: 'flex', flexDirection: 'column', flex: 5}}>
                                <div id="today-mission-img" style={{display: 'flex', flex: 2, marginBottom: '1rem'}}>
                                    <img src={missionImage} alt="user" style={{ width: '100%', height: '100%' }} />
                                </div>
                                <div id="today-mission-desc" style={{display: 'flex', flex: 1}}>
                                    <span style={{fontSize: '1rem', fontWeight: '700'}}>
                                        오늘 과일을 썰어 먹었어요!
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div id="today-mission" style={{display: 'flex', flexDirection: 'column', width: '20rem', height: '35rem', backgroundColor: '#FFFFFF', borderRadius: '1rem', padding: '0 1rem 0 1rem'}}>
                            <div id="today-mission-header" style={{display: 'flex', flex: 1}}>
                                <div id="today-mission-title" style={{display: 'flex', flex: 7, alignItems: 'center'}}>
                                    <span style={{fontSize: '1.2rem', fontWeight: '800'}}>
                                        미션 3
                                    </span>
                                </div>
                                <div id="today-mission-isComplete" style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <img src={isCheckImage} alt="user" style={{ width: '1.2rem', height: '1.2rem' }} />
                                </div>
                                <div id="today-mission-sendMsg" style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <img src={canSendMsgImage} alt="user" style={{ width: '1.2rem', height: '1.2rem' }} />
                                </div>
                            </div>
                            <div id="today-mission-body" style={{display: 'flex', flexDirection: 'column', flex: 5}}>
                                <div id="today-mission-img" style={{display: 'flex', flex: 2, marginBottom: '1rem'}}>
                                    <img src={missionImage} alt="user" style={{ width: '100%', height: '100%' }} />
                                </div>
                                <div id="today-mission-desc" style={{display: 'flex', flex: 1}}>
                                    <span style={{fontSize: '1rem', fontWeight: '700'}}>
                                        오늘 과일을 썰어 먹었어요!
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuUser;