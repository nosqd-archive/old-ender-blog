import React from 'react';
import Article from "../components/Article";
import ReactDOM from "react-dom";
import {Spinner} from "react-bootstrap";

class NewsPage extends React.Component {
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
        // Create Objects
        let post_objects = [];

        for (const post of posts) {
            if (post){
                let author = (await (await fetch(`http://${process.env.REACT_APP_SERVER_IP_ADDR}/users?user_id=${post.user}`)).json());
                post_objects.push(<div key={post_objects.length} className="col-md-4"><Article img={`http://${process.env.REACT_APP_SERVER_IP_ADDR}/media/${post.image}`} author={author} name={post.title} description={post.desc} text={post.content} url={`article/${post.id}`}/></div>);
            }
        }

        let chunked = []
        let size = 3;

        for (let i = 0;  i < post_objects.length; i += size) {
            chunked.push(<div className="card-group row" key={chunked.length}>{post_objects.slice(i, i + size)}</div>)
        }
        this.setState({
            loading: false,
            post_objects: chunked
        })
    }

    render() {
        const { loading } = this.state;
        return <div>
            <h1 className="d-flex justify-content-center mt-3">{loading ? <Spinner animation="border" variant="dark" /> : ""}</h1>
            <div className="container" id="article-container">
                {this.state.post_objects}
            </div>
        </div>
    }
}


export default NewsPage;
