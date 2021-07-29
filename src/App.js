import React, {Suspense} from 'react';
import Navbar from './components/nav/Navbar'
import './App.css';
import {BrowserRouter, Redirect, Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Friends from "./components/nav/Friends/Friends";
import UsersContainer from "./components/Users/UsersContainer";
//import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
//import {withSuspense} from "./hoc/withSuspense";
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
const DialogsContainer = React.lazy(() => import ('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import ('./components/profile/ProfileContainer'));


class App extends React.Component {
    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        alert("Some error occured");
        console.error(promiseRejectionEvent)
    }
    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader />
        }
        return (

            <div className="app_wrapper">
                <HeaderContainer/>
                <Navbar/>

                <div className='app_wrapper_content'>
                    <Suspense fallback={<div>...LOADING</div>}>
                        <Route path='/dialogs'
                               render={() => <DialogsContainer />}
                        />
                        <Route path='/profile/:userId?'
                               render={() => <ProfileContainer />}
                        />
                    </Suspense>
                    <Route path='/' render={() => <Redirect to={"/login"} />}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/friends' render={() => <Friends/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <LoginPage/>}/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

const AppContainer =  compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = (props) => {
    return <BrowserRouter >
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp