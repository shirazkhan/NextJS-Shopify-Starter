import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from 'react-responsive';
import { GlobalStateContext } from '../../pages/_app';
import { DESKTOP_LINK_COLOR, DESKTOP_LINK_HEIGHT, DESKTOP_NAV_BACKGROUND_COLOR, DESKTOP_NAV_HEIGHT, MOBILE, MOBILE_NAV_HEIGHT, NAV_LINK_COLOR, NAV_MENU_COLOR, PRIMARY_THEME_COLOR, WEBSITE_WIDTH } from '../../GlobalVariables';

const Menu = styled(motion.div)`
    height: calc(100vh - 50px);
    width: 100%;
    max-width: 275px;
    position: fixed;
    left: -275px;
    top: ${MOBILE_NAV_HEIGHT};
    z-index: 1000;
    display: flex;
    flex-direction: column;
    padding-top: 25px;
    background: white;
    color: white;
    align-items: center;
    white-space: none;
    overflow: scroll;
    flex-wrap: nowrap;

    @media (min-width:${MOBILE}){
        top: ${DESKTOP_NAV_HEIGHT};
        max-width: none;
        padding-top: 0;
        flex-direction: row;
        overflow: none;
        align-items: center;
        justify-content: center;
        height: ${DESKTOP_LINK_HEIGHT};
        gap: 30px;
        position: absolute;
        width: 100%;
        box-shadow: 0px 0px 12px -6px rgba(0,0,0,0.8);
        background: ${DESKTOP_NAV_BACKGROUND_COLOR};
      }
`;

const NavLink = styled.div`
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    background: ${NAV_LINK_COLOR};

    @media (min-width:${MOBILE}){
        justify-content: center;
        min-height: ${DESKTOP_LINK_HEIGHT};
        flex-shrink: 0;
        font-size: 0.8em;
        font-weight: 600;
        line-height: 1.2em;
        text-align: center;
        background: none;
      }
`;

const Background = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 50px;
    right: 0;
    z-index: 999;
    opacity: 0;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(14px);
`;

const Link = styled.a`
    color: ${PRIMARY_THEME_COLOR};
    font-size: 1.3em;
    text-decoration: none;
    padding-left: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    @media (min-width:${MOBILE}){
        padding-left: 0;
        color: ${DESKTOP_LINK_COLOR};
        background: none;
      }
`;

export default function NavMenu() {

    const {globalState, dispatch} = useContext(GlobalStateContext);

    const isDesktop = useMediaQuery({ query: `(min-width:${MOBILE})` });

    useEffect(() => {
        if (isDesktop) {
            dispatch({ type: 'NAV_MENU_ON' });
        } else if(!isDesktop){
            dispatch({ type: 'NAV_MENU_OFF'})
        }
    }, [isDesktop, dispatch]);


    return (
        <AnimatePresence>
            {globalState.navMenuOpen && (
                <>
                    <Menu
                        key="navMenu"
                        animate = {{ x: 275 }}
                        exit={{ x: -10 }}
                        transition= {{ type: 'ease', stiffness: 125}}
                    >
                        <NavLink>
                            <NextLink href = '/shop' as = '/shop' passHref>
                                <Link onClick = {isDesktop ? null : () => dispatch({type: 'TOGGLE_NAV_MENU'})}>Shop</Link>
                            </NextLink>
                        </NavLink>
                        <NavLink>
                            <NextLink href = '/account' as = '/account' passHref>
                                <Link onClick = {isDesktop ? null : () => dispatch({type: 'TOGGLE_NAV_MENU'})}>Account</Link>
                            </NextLink>
                        </NavLink>
                        <NavLink>
                            <NextLink href = '/latest-products' as = '/latest-products' passHref>
                                <Link onClick = {isDesktop ? null : () => dispatch({type: 'TOGGLE_NAV_MENU'})}>Latest Products</Link>
                            </NextLink>
                        </NavLink>
                        <NavLink>
                            <NextLink href = '/bridal-henna' as = '/bridal-henna' passHref>
                                <Link onClick = {isDesktop ? null : () => dispatch({type: 'TOGGLE_NAV_MENU'})}>Bridal Henna</Link>
                            </NextLink>
                        </NavLink>
                        <NavLink>
                            <NextLink href = '/articles' as = '/articles' passHref>
                                <Link onClick = {isDesktop ? null : () => dispatch({type: 'TOGGLE_NAV_MENU'})}>Articles</Link>
                            </NextLink>
                        </NavLink>
                        <NavLink>
                            <NextLink href = '/videos' as = '/videos' passHref>
                                <Link onClick = {isDesktop ? null : () => dispatch({type: 'TOGGLE_NAV_MENU'})}>Videos</Link>
                            </NextLink>
                        </NavLink>
                        <NavLink>
                            <NextLink href = '/about' as = '/about' passHref>
                                <Link onClick = {isDesktop ? null : () => dispatch({type: 'TOGGLE_NAV_MENU'})}>About</Link>
                            </NextLink>
                        </NavLink>
                        <NavLink>
                            <NextLink href = '/contact' as = '/contact' passHref>
                                <Link onClick = {isDesktop ? null : () => dispatch({type: 'TOGGLE_NAV_MENU'})}>Contact</Link>
                            </NextLink>
                        </NavLink>
                    </Menu>
                    { !isDesktop ? 
                        <Background onClick = {() => dispatch({type: 'TOGGLE_NAV_MENU'})}
                        key="navMenuBackground"
                        animate = {{ opacity: 0.8 }}
                        transition={{duration: 0.75}}
                        exit={{ opacity: 0 }}
                    />
                    : ''}
                </>
            )}
            </AnimatePresence>
    )
}
