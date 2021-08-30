import React from 'react';
import CommentForArticle from "../components/CommentForArticle.jsx";
import {Spinner} from "react-bootstrap";

class ArticlePage extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            image: "",
            author: "",
            header: "",
            description: "",
            text: "",
        };
    }

    async componentDidMount() {
        let post = (await (await fetch(`http://${process.env.REACT_APP_SERVER_IP_ADDR}/posts?post_id=${this.props.match.params.id}`)).json());
        let user = (await (await fetch(`http://${process.env.REACT_APP_SERVER_IP_ADDR}/users?user_id=${post.user}`)).json());

        this.setState({
            loading: false,
            image: post.image,
            author: user,
            header: post.title,
            description: post.desc,
            text: post.content,
        })
    }

    render() {
        const { loading } = this.state;

        return <div className="d-flex justify-content-center mt-3">
            <div>
                {loading ? <Spinner animation="border" variant="dark" /> : ""}<br/>
                <img id="article_image" src={`http://${process.env.REACT_APP_SERVER_IP_ADDR}/media/${this.state.image}`}/>
                <p>Автор: <a href={`/user/${this.state.author.id}`}>{this.state.author.login}</a></p>
                <h1 id="article_header" className="mt-3">{this.state.header}</h1>
                <p id="article_description" className="mt-2" style={
                    {fontSize: "24px"}
                }>{this.state.description}</p>
                <p id="article_text" className="mt-2" dangerouslySetInnerHTML={{__html: this.state.text}}/>
                <CommentForArticle article_id={this.props.match.params.id}/>
            </div>
        </div>
    }
}


export default ArticlePage;
