import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => dispatch => {
	axios
		.post('/api/users/register', userData)
		.then(() => history.push('/login'))
		.catch(e =>
			dispatch({
				type: 'GET_ERRORS',
				payload: e.response.data
			})
		);
};

export const loginUser = userData => dispatch => {
	axios
		.post('/api/users/login', userData)
		.then(res => {
			// save to local storage
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			dispatch(setCurrentUser(decoded));
		})
		.catch(e =>
			dispatch({
				type: 'GET_ERRORS',
				payload: e.response.data
			})
		);
};

export const setCurrentUser = decoded => ({
	type: 'SET_CURRENT_USER',
	payload: decoded
});

export const logoutUser = () => dispatch => {
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
};
