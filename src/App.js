import React from 'react';
import Navbar from './components/nav/Navbar'
import './App.css';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Friends from "./components/nav/Friends/Friends";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";


class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app_wrapper">
                <HeaderContainer/>
                <Navbar/>

                <div className='app_wrapper_content'>
                    <Route path='/dialogs'
                           render={
                               () => <DialogsContainer/>
                           }
                    />
                    <Route path='/profile/:userId?'
                           render={
                               () => <ProfileContainer/>
                           }
                    />
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

/*
<AddMessageForm

    state={props.store.getState().dialogsPage}
    dispatch={props.dispatch}
/>*/

const SamuraiJSApp = (props) => {
    return <BrowserRouter >
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp