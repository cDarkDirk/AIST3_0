import Cookies from 'universal-cookie';
import React from "react";
import {Tooltip} from "react-bootstrap";

const cookies = new Cookies();

export function isUserLoggedIn() {
  const cookies = new Cookies();
  if (!cookies.get('logedInUser') || cookies.get('logedInUser') === '') {
    return false;
  } else {
    return true;
  }
}

export function setCurrentUser(user, token) {
  cookies.set('logedInUser', user, {path: '/'});
  cookies.set('logedInUserToken', token, {path: '/'});
}

export function onUserLogOut() {
  cookies.remove('logedInUser', {path: '/'});
  cookies.remove('logedInUserToken', {path: '/'});
}

export function forceLogin() {
  if (!isUserLoggedIn()) {
    window.location.hash = '#/';
  }
}

export function getPersonalPage(){
  window.location.hash = '#/personaldata';
}

export function getUserName() {
  return cookies.get('logedInUser');
}

export function getToken(){
  return cookies.get('logedInUserToken');
}

export const setTooltip = (id, text) => (
  <Tooltip key={id.toString()+'Tooltip'} id={id.toString()}>{text}</Tooltip>
);

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
