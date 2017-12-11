// import {requestUserAction, updateUserError, updateUserAction, requestUserSuccess, requestUserError, updateUserSuccess} from '@/actions'
// import { success as successMessage, error as errorMessage } from 'react-notification-system-redux'
// import { replace } from 'connected-react-router'
//
// const BACKEND_URL = process.env.REACT_APP_BACKEND
//
// export const fetchUser = (email) => (dispatch, getState) => {
// //  console.log(getState())
//   dispatch(requestUserAction())
//   const url = `${BACKEND_URL}/api/user`
//   const options = {
//     method: 'GET',
//     headers: { },
//   }
//   fetch(url, options).then(response => {
//     if (response.ok) {
//       return response.json()
//     } else {
//       const error = new Error(response.statusText)
//       error.response = response
//       return Promise.reject(error)
//     }
//   }).then(user => {
//     if (user) {
//       dispatch(requestUserSuccess(user))
//       dispatch(replace('/user'))
//     } else {
//       dispatch(errorMessage({title: `No user profile found.`, autoDismiss: 3, position: 'br'}))
//       dispatch(requestUserError(new Error('No user profile found.')))
//     }
//   }).catch(error => dispatch(requestUserError(error)))
// }
//
// export const updateUser = (user) => (dispatch, getState) => {
//   dispatch(updateUserAction())
//   const url = `${BACKEND_URL}/api/user`
//   const stringifiedUser = JSON.stringify(user)
//   const options = {
//     method: 'PUT',
//     headers: {
//       'Authorization': `Bearer ${getState().auth.accessToken}`,
//       'Content-Type': 'application/json',
//     },
//     body: stringifiedUser,
//   }
//   return fetch(url, options).then(response => {
//     if (response.ok) {
//       return response.json()
//     } else {
//       const error = new Error(response.statusText)
//       error.response = response
//       return Promise.reject(error)
//     }
//   }).then(response => {
//     dispatch(updateUserSuccess(response))
//     dispatch(successMessage({title: 'Update successful', autoDismiss: 3, position: 'br'}))
//   }).catch(e => {
//     dispatch(updateUserError())
//     dispatch(errorMessage({title: `Update failed: ${e.message}`, autoDismiss: 3, position: 'br'}))
//   })
// }
