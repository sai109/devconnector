import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import jtw_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import { clearProfile } from './redux/actions/profileActions';
import history from './history';

import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

import './App.css';

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	const decoded = jtw_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));

	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		store.dispatch(clearProfile());
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<div className="App">
						<Navbar />
						<Route exact path="/" component={Landing} />
						<div className="container">
							<Switch>
								<Route exact path="/profile/:handle" component={Profile} />
								<Route exact path="/register" component={Register} />
								<Route exact path="/login" component={Login} />
								<Route exact path="/profiles" component={Profiles} />
								<PrivateRoute exact path="/dashboard" component={Dashboard} />
								<PrivateRoute
									exact
									path="/create-profile"
									component={CreateProfile}
								/>
								<PrivateRoute
									exact
									path="/edit-profile"
									component={EditProfile}
								/>
								<PrivateRoute
									exact
									path="/add-experience"
									component={AddExperience}
								/>
								<PrivateRoute
									exact
									path="/add-education"
									component={AddEducation}
								/>
								<PrivateRoute exact path="/feed" component={Posts} />
								<PrivateRoute exact path="/post/:id" component={Post} />
								<Route exact path="*" component={NotFound} />
							</Switch>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
