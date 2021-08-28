import React from 'react';
import {Button, Form} from "react-bootstrap";


class RegisterPage extends React.Component {
    async componentDidMount() {
    }

    render() {
        return <div className="d-flex justify-content-center mt-3">
            <div>
                <Form onSubmit={this._handleSubmit.bind(this)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Логин *</Form.Label>
                        <Form.Control id="login" required type="text" placeholder="Логин" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль *</Form.Label>
                        <Form.Control id="password" required type="password" placeholder="Пароль" />
                    </Form.Group>
                    <Button variant="outline-success" style={{width: "100%"}} type="submit">
                        Зарегистрироватся
                    </Button>
                    <a href="/login" className="d-flex justify-content-center mt-3">Войти</a>
                </Form>
            </div>
        </div>
    }

    async _handleSubmit(event) {
        event.preventDefault();
        let is_auth = false;
        let user = {};
        let login = document.getElementById("login").value;
        let password = document.getElementById("password").value;
        is_auth = true;
        user = (await (await fetch(`http://${process.env.REACT_APP_SERVER_IP_ADDR}/users`, {
            method: 'POST',
            body: JSON.stringify({
                'login': document.getElementById('login').value,
                'password': document.getElementById('password').value
            })
        })).json());
        if (user.id === undefined){
            is_auth = false;
        }

        if (is_auth) {
            localStorage.setItem('login', login);
            localStorage.setItem('password', password);
            window.location.href = '/';
        }
    }
}


export default RegisterPage;
