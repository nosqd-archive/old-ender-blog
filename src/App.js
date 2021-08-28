import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import 'holderjs'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import NavBar from "./components/NavBar";

import NewsPage from "./pages/NewsPage";
import ArticlePage from "./pages/ArticlePage";
import PageNotFound from "./pages/PageNotFound";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import UserPage from "./pages/UserPage";

class App extends React.Component {
  render() {
    return <Router>
        <NavBar/>
        <main>
            <Switch>
                <Route exact path="/">
                    <MainPage/>
                </Route>
                <Route exact path="/news">
                    <NewsPage/>
                </Route>
                <Route exact path="/article/:id" component={ArticlePage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
                <Route exact path="/profile" component={ProfilePage}/>
                <Route exact path="/user/:id" component={UserPage}/>

                <Route component={PageNotFound} />
            </Switch>
        </main>
    </Router>
  }
}


export default App;
