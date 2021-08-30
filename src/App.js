import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import 'holderjs'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import NavBar from "./components/NavBar.jsx";

import NewsPage from "./pages/NewsPage.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import MainPage from "./pages/MainPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import UserPage from "./pages/UserPage.jsx";

import ForumTopicsPage from "./pages/Forum/Topics";

class App extends React.Component {
  render() {
    return <Router>
        <NavBar/>
        <main>
            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route exact path="/news" component={NewsPage}/>
                <Route exact path="/article/:id" component={ArticlePage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
                <Route exact path="/profile" component={ProfilePage}/>
                <Route exact path="/user/:id" component={UserPage}/>

                <Route exact path="/forum" component={ForumTopicsPage}/>

                <Route component={PageNotFound} />
            </Switch>
        </main>
    </Router>
  }
}


export default App;
