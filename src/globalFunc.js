import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function isUserLoggedIn() {
  const cookies = new Cookies();
  if(!cookies.get('logedInUser') || cookies.get('logedInUser') === ''){
    return false;
  } else {
    return true;
  }
}

export function setCurrentUser(user, token) {
  cookies.set('logedInUser', user, {path: '/'});
  cookies.set('logedInUserToken', token, {path: '/'});
}

export function onUserLogOut () {
  cookies.remove('logedInUser', {path: '/'});
  cookies.remove('logedInUserToken', {path: '/'});
}

export function forceLogin() {
  if (!isUserLoggedIn()){
    window.location.hash = '#/';
  }
}

export function getUserName() {
  return cookies.get('logedInUser');
}
export function getToken() {
  return cookies.get('logedInUserToken');
}
