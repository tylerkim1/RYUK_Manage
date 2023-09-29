import React from 'react';
import missionImage from '../assets/sample.png';

const MenuMission = () => {
  return (
    <div id="menu-mission-container" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <div id="menu-mission-header" style={{ display: 'flex', flex: 1, marginBottom: '3rem' }}>
        <div id="menu-mission-header-date" style={{ display: 'flex', flex: 1.5, padding: '1rem 1rem 0 2rem', alignItems: 'end' }}>
          <span style={{ fontSize: '3rem', fontWeight: '800' }}>
            9월 22일
          </span>
        </div>
      </div>
      <div id="menu-mission-body" style={{ display: 'flex', flex: 7, paddingLeft: '2rem' }}>
        <div id="common-mission-list" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div id="common-mission" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF', borderRadius: '1rem', padding: '1rem' }}>
            <div id="common-mission-header" style={{ display: 'flex', flex: 1, marginBottom: '1rem' }}>
              <div id="common-mission-title" style={{ display: 'flex', marginRight: '3rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>
                  미션 1
                </span>
              </div>
              <div id="common-mission-achieve-level" style={{ display: 'flex' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>
                  달성률: 3/3
                </span>
              </div>
            </div>
            <div id="common-mission-body" style={{ display: 'flex', flex: 3 }}>
              <div id="common-mission-personal-list" style={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap', gap: '2rem' }}>
                <div id="common-mission-personal" style={{ display: 'flex', flexDirection: 'column', width: '11rem', height: '15rem', backgroundColor: '#ADFF0026', borderRadius: '1rem', padding: '1rem' }}>
                  <div id="common-mission-personal-name" style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: '700'}}>
                      쿵짝님
                    </span>
                  </div>
                  <div id="common-mission-personal-image" style={{ display: 'flex', flex: 2, marginBottom: '1rem' }}>
                    <img src={missionImage} alt="user" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div id="common-mission-personal-desc" style={{ display: 'flex', flex: 2 }}>
                    <span style={{ fontSize: '0.8rem' }}>
                      오늘 과일을 썰어 먹었어요!
                    </span>
                  </div>
                </div>
                <div id="common-mission-personal" style={{ display: 'flex', flexDirection: 'column', width: '11rem', height: '15rem', backgroundColor: '#ADFF0026', borderRadius: '1rem', padding: '1rem' }}>
                  <div id="common-mission-personal-name" style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: '700'}}>
                      쿵쿵님
                    </span>
                  </div>
                  <div id="common-mission-personal-image" style={{ display: 'flex', flex: 2, marginBottom: '1rem' }}>
                    <img src={missionImage} alt="user" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div id="common-mission-personal-desc" style={{ display: 'flex', flex: 2 }}>
                    <span style={{ fontSize: '0.8rem' }}>
                      오늘 과일을 썰어 먹었어요!
                    </span>
                  </div>
                </div>
                <div id="common-mission-personal" style={{ display: 'flex', flexDirection: 'column', width: '11rem', height: '15rem', backgroundColor: '#ADFF0026', borderRadius: '1rem', padding: '1rem' }}>
                  <div id="common-mission-personal-name" style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: '700'}}>
                      쿵야님
                    </span>
                  </div>
                  <div id="common-mission-personal-image" style={{ display: 'flex', flex: 2, marginBottom: '1rem' }}>
                    <img src={missionImage} alt="user" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div id="common-mission-personal-desc" style={{ display: 'flex', flex: 2 }}>
                    <span style={{ fontSize: '0.8rem' }}>
                      오늘 과일을 썰어 먹었어요!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="common-mission" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF', borderRadius: '1rem', padding: '1rem' }}>
            <div id="common-mission-header" style={{ display: 'flex', flex: 1, marginBottom: '1rem' }}>
              <div id="common-mission-title" style={{ display: 'flex', marginRight: '3rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>
                  미션 2
                </span>
              </div>
              <div id="common-mission-achieve-level" style={{ display: 'flex' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>
                  달성률: 3/4
                </span>
              </div>
            </div>
            <div id="common-mission-body" style={{ display: 'flex', flex: 3 }}>
              <div id="common-mission-personal-list" style={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap', gap: '2rem' }}>
                <div id="common-mission-personal" style={{ display: 'flex', flexDirection: 'column', width: '11rem', height: '15rem', backgroundColor: '#ADFF0026', borderRadius: '1rem', padding: '1rem' }}>
                  <div id="common-mission-personal-name" style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: '700'}}>
                      쿵짝님
                    </span>
                  </div>
                  <div id="common-mission-personal-image" style={{ display: 'flex', flex: 2, marginBottom: '1rem' }}>
                    <img src={missionImage} alt="user" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div id="common-mission-personal-desc" style={{ display: 'flex', flex: 2 }}>
                    <span style={{ fontSize: '0.8rem' }}>
                      오늘 과일을 썰어 먹었어요!
                    </span>
                  </div>
                </div>
                <div id="common-mission-personal" style={{ display: 'flex', flexDirection: 'column', width: '11rem', height: '15rem', backgroundColor: '#ADFF0026', borderRadius: '1rem', padding: '1rem' }}>
                  <div id="common-mission-personal-name" style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: '700'}}>
                      쿵쿵님
                    </span>
                  </div>
                  <div id="common-mission-personal-image" style={{ display: 'flex', flex: 2, marginBottom: '1rem' }}>
                    <img src={missionImage} alt="user" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div id="common-mission-personal-desc" style={{ display: 'flex', flex: 2 }}>
                    <span style={{ fontSize: '0.8rem' }}>
                      오늘 과일을 썰어 먹었어요!
                    </span>
                  </div>
                </div>
                <div id="common-mission-personal" style={{ display: 'flex', flexDirection: 'column', width: '11rem', height: '15rem', backgroundColor: '#FF000026', borderRadius: '1rem', padding: '1rem' }}>
                  <div id="common-mission-personal-name" style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: '700'}}>
                      쿵야님
                    </span>
                  </div>
                  <div id="common-mission-personal-desc" style={{ display: 'flex', flex: 2, alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem' }}>
                      아직 미션을 완료하지 못했어요.
                    </span>
                  </div>
                </div>
                <div id="common-mission-personal" style={{ display: 'flex', flexDirection: 'column', width: '11rem', height: '15rem', backgroundColor: '#ADFF0026', borderRadius: '1rem', padding: '1rem' }}>
                  <div id="common-mission-personal-name" style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: '700'}}>
                      쿵차님
                    </span>
                  </div>
                  <div id="common-mission-personal-image" style={{ display: 'flex', flex: 2, marginBottom: '1rem' }}>
                    <img src={missionImage} alt="user" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div id="common-mission-personal-desc" style={{ display: 'flex', flex: 2 }}>
                    <span style={{ fontSize: '0.8rem' }}>
                      오늘 과일을 썰어 먹었어요!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuMission;