import React from 'react'
import { shadow, media } from '../lib/styleUtil';
import oc from 'open-color';
import styled from 'styled-components';
import LogoutButton from './Header/LogoutButton'

// 상단 고정, 그림자
const Positioner = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0px;
    width: 100%;
    ${shadow(1)}
`;

// 흰 배경, 내용 중간 정렬
const WhiteBackground = styled.div`
    background: white;
    display: flex;
    justify-content: start;
    height: auto;
`;

// 해더의 내용
const HeaderContents = styled.div`
    width: 75rem;
    height: 3.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-right: 1rem;
    padding-left: 1rem;
    ${media.wide`
        width: 992px;
    `}

    ${media.tablet`
        width: 100%;
    `}
`;

// 로고
const Logo = styled.div`
    font-size: 1.4rem;
    letter-spacing: 2px;
    color: ${oc.teal[7]};
    font-family: 'Rajdhani';
`;

// 중간 여백
const Spacer = styled.div`
    margin-left: auto;
`;

const Header = () => {
    return (
        <>
            <Positioner>
                <WhiteBackground>
                    <HeaderContents>
                        <Logo>NEETCOMPANY</Logo>
                        <Spacer/>
                        <LogoutButton/>
                </HeaderContents>
                </WhiteBackground>
            </Positioner>
        </>
    )
}

export default Header