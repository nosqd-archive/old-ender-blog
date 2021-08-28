import React from 'react';
import {Button, Form, Spinner} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareRight } from "@fortawesome/free-regular-svg-icons";

class CommentForArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComments: false,
            loading: true,
            comments: []
        };
        this.loadComments().then(() => this.setState({
            loading: false
        }));
    }

    async loadComments(){
        this.state.comments = [];
        let article_id = this.props.article_id;
        let comments = (await fetch(`http://${process.env.REACT_APP_SERVER_IP_ADDR}/comments?post_id=${article_id}`)
            .then(resp => resp.json())).comments

        for (const comment of comments) {
            let user = (await (await fetch(`http://${process.env.REACT_APP_SERVER_IP_ADDR}/users?user_id=${comment.user}`)).json());
            this.setState({
                showComments: false,
                comments: this.state.comments.concat([{id: comment.id, author: user, comment: comment}])
            })
        }
    }

    render () {
        const comments = this._getComments();
        let commentNodes;
        const { loading } = this.state;

        if (this.state.showComments) {
            commentNodes = <div className="comment-list">{comments}</div>;
        }

        return(
            <div className="comment-box">
                <h2>Присойденитесь к обсуждению!</h2>
                <CommentForm addComment={this._addComment.bind(this)} article_id={this.props.article_id}/>
                <h3>Комментарии <Button className={"mt-1"} id="comment-reveal" variant="outline-dark" onClick={this._handleClick.bind(this)}>
                    <FontAwesomeIcon id="faopen" style={{transform: "rotate(270deg)"}} icon={faCaretSquareRight} />
                </Button></h3>
                <h4 className="comment-count">
                    {loading ? <Spinner animation="border" variant="dark" /> : ""} {this._getCommentsTitle(comments.length)}
                </h4>
                {commentNodes}
            </div>
        );
    } // end render

    async _addComment(body){
        this.setState({
            loading: true
        })
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
        let x = JSON.stringify({
            "login": localStorage.login,
            "password": localStorage.password,
            "post_id": this.props.article_id,
            "content": body
        })
        await fetch(`http://${process.env.REACT_APP_SERVER_IP_ADDR}/comments`, {
            method: 'POST',
            body: x
        })
        this.loadComments().then(() => this.setState({
            loading: false
        }));
    }

    _handleClick() {
        this.setState({
            showComments: !this.state.showComments
        });

        if (this.state.showComments) {
            document.getElementById('faopen').style = "transform: rotate(270deg)";
        }
        else {
            document.getElementById('faopen').style = "transform: rotate(90deg)";
        }
    }

    _getComments() {
        return this.state.comments.map((comment) => {
            return (
                <Comment
                    author={comment.author}
                    comment={comment.comment}
                    key={comment.comment.id}
                />
            );
        });
    }

    _getCommentsTitle(commentCount) {
        if (commentCount === 0) {
            return 'Нет комментариев';
        } else if (commentCount === 1) {
            return "1 комментарий";
        } else {
            return `${commentCount} комментария(-ев)`;
        }
    }
}

class CommentForm extends React.Component {
    render() {
        return (
            <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
                <div className="comment-form-fields">
                    <textarea className={"form-control"} placeholder="Текст...." rows="4" required id="content"/>
                </div>
                <div className="comment-form-actions">
                    <Button variant="outline-primary" className="mt-1" type="submit">Отправить комментарий</Button>
                </div>
            </form>
        );
    }
    async _handleSubmit(event) {
        event.preventDefault();   // prevents page from reloading on submit
        this.props.addComment(document.getElementById('content').value);
    }
}

class Comment extends React.Component {
    render () {
        return(
            <div className="comment">
                <p className="comment-header"><a href={`/user/${this.props.author.id}`}>{this.props.author.login}</a>: {this.props.comment.content}</p>
                <hr/>
            </div>
        );
    }
}

export default CommentForArticle;
