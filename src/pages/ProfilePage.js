import React, {useState} from 'react';
import {Button, Form, Spinner} from 'react-bootstrap';

class MainPage extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            user: {}
        }
    }

    async componentDidMount() {
        if (!localStorage.login || !localStorage.password || localStorage.login === "undefined" || localStorage.login === "password") window.location.href = '/login';
        let is_auth = false;
        let user = {};
        if (localStorage.login && localStorage.password){
            is_auth = true;
            user = (await (await fetch(`http://${process.env.REACT_APP_SERVER_IP_ADDR}/users/getme?login=${localStorage.login}&password=${localStorage.password}`)).json());
            if (user.id === undefined){
                is_auth = false;
            }
        }
        if (!is_auth) window.location.href = '/login';

        this.setState({
            loading: false,
            user: user
        })
    }

    async save_click(e){
        await fetch(`http://${process.env.REACT_APP_SERVER_IP_ADDR}/users`, {
            method: 'PATCH',
            body: JSON.stringify({
                login: localStorage.login,
                password: localStorage.password,
                first_name: this.state.user.first_name,
                last_name: this.state.user.last_name
            })
        })

        window.location.href = window.location.href;
    }

    render() {
        const {loading} = this.state;
        return <div>
            <div className="d-flex justify-content-center">
                {loading ? <Spinner animation="border" variant="dark" /> : ""}
            </div>
            <div className="d-flex justify-content-center">
                <h1 id={"user_profile"}>Профиль пользователя: {this.state.user.login}</h1>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <Form.Control id={"user_id"} readOnly value={`Айди: ${this.state.user.id}`} type="text" style={{width: "25%"}}/>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <Form.Control id={"user_login"} readOnly value={`Логин: ${this.state.user.login}`} type="text" style={{width: "25%"}}/>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <Form.Control id={"user_first_name"} value={this.state.user.first_name} type="text" placeholder="Имя" style={{width: "25%"}} onChange={(event) =>
                    this.setState({
                        user: {
                            ...this.state.user,
                            first_name: event.target.value
                        }
                    })
                }/>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <Form.Control id={"user_last_name"} type="text" value={this.state.user.last_name} placeholder="Фамилия" style={{width: "25%"}} onChange={(event) =>
                    this.setState({
                        user: {
                            ...this.state.user,
                            last_name: event.target.value
                        }
                    })
                }/>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <Button style={{width: "25%"}} variant="outline-success" onClick={async (e) => {
                    await this.save_click(e)
                }}>Сохранить</Button>
            </div>
        </div>
    }
}


export default MainPage;
