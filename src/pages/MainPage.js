import React from 'react';
import Article from "../components/Article";
import ReactDOM from 'react-dom';
import {Spinner} from "react-bootstrap";

class MainPage extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            post_objects: []
        };
    }

    async componentDidMount() {
        let posts = (await (await fetch(`http://${process.env.REACT_APP_SERVER_IP_ADDR}/posts`)).json()).posts;
        posts = posts.reverse();
        posts.length = 3;

        // Create Objects
        let post_objects = [];

        for (const post of posts) {
            if (post){
                let author = (await (await fetch(`http://${process.env.REACT_APP_SERVER_IP_ADDR}/users?user_id=${post.user}`)).json());
                post_objects.push(<Article key={post.id} img={`http://${process.env.REACT_APP_SERVER_IP_ADDR}/media/${post.image}`} name={post.title} author={author} description={post.desc} text={post.content} url={`article/${post.id}`}/>);
            }
        }
        this.setState({
            loading: false,
            post_objects: post_objects
        })
    }

    render() {
        const { loading } = this.state;
        return <div>
            <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 className="display-4 fw-normal">Я Дмитрий.</h1>
                <p className="fs-5 text-muted">Мне 10 лет. Я занимаюсь программированием. С 7 лет,
                    пишу на Python (Django, FastAPI), Node.JS (React), Java (Minecraft API, Discord JDA), Kotlin (Discord JDA)</p>
            </div>
            <div className="container">
                <h1>Последние новости {loading ? <Spinner animation="border" variant="dark" /> : ""}</h1>
                <div className="card-group" id="articles">
                    {this.state.post_objects}
                </div>
            </div>
        </div>
    }
}


export default MainPage;
