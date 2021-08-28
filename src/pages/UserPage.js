import React from 'react';
import {Button, Form, Spinner} from 'react-bootstrap';

class MainPage extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            user: {}
        };
    }

    async componentDidMount() {
        let is_auth = false;
        let user = (await (await fetch(`http://${process.env.REACT_APP_SERVER_IP_ADDR}/users?user_id=${this.props.match.params.id}`)).json());

        if (user.id === undefined || user.id === null){
            window.location.href = '/404';
        }
        // Stop loading
        this.setState({
            loading: false,
            user: user
        })
    }

    render() {
        const { loading } = this.state;
        return <div>
            <div className="d-flex justify-content-center">
                {loading ? <Spinner animation="border" variant="dark" /> : ""}
            </div>
            <div className="d-flex justify-content-center">
                <h1 id="user_profile">Профиль пользователя: {this.state.user.login}</h1>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <Form.Control id="user_id" readOnly type="text" value={`Айди: ${this.state.user.id}`} style={{width: "25%"}}/>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <Form.Control id="user_login" readOnly type="text" value={`Логин: ${this.state.user.login}`} style={{width: "25%"}}/>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <Form.Control id="user_first_name" readOnly type="text" value={`Имя: ${this.state.user.first_name}`} style={{width: "25%"}}/>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <Form.Control id="user_last_name" readOnly type="text" value={`Фамилия: ${this.state.user.last_name}`} style={{width: "25%"}}/>
            </div>
        </div>
    }
}


export default MainPage;
