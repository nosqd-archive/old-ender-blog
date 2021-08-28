import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Container, Nav, Navbar} from "react-bootstrap";

class NavBar extends React.Component {
    constructor() {
        super();

        this.state = {}
    }

    async componentDidMount() {
        let is_auth = false;
        let user = {};
        if (localStorage.login && localStorage.password){
            is_auth = true;
            user = (await (await fetch(`http://${process.env.REACT_APP_SERVER_IP_ADDR}/users/getme?login=${localStorage.login}&password=${localStorage.password}`)).json());
            if (user.id === undefined){
                is_auth = false;
            }
        }
        let login_button = <div>
            <a href="/login">
                <Button variant="outline-light">Войти</Button>
            </a>
        </div>;
        let loggined_text = <span>Вы вошли как: <a href="/profile">{user.login}</a> <Button variant="outline-light" className="ml-1" onClick={(e) => {
                localStorage.login = undefined;
                localStorage.password = undefined;
                window.location.href = window.location.href;
            }
        }>Выйти</Button></span>
        if (is_auth)
            this.setState({login_text: loggined_text})
        if (!is_auth)
            this.setState({login_text: login_button})
    }

    render() {
        return <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Ender</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Главная</Nav.Link>
                        <Nav.Link href="/news">Новости</Nav.Link>
                        <Nav.Link className="disabled" href="/forum">Форум</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text id="login_container">
                            {this.state.login_text}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    }
}


export default NavBar;
