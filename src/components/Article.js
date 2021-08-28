import React from 'react';
import {Button, Card} from "react-bootstrap";


class Article extends React.Component {
    render() {
        return <Card className="article" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={this.props.img} />
            <Card.Body>
                <Card.Title>{this.props.name}</Card.Title>
                <p className="text-muted" style={{ fontSize: "12px"}}>
                    Автор: <a href={`/user/${this.props.author.id}`}>{this.props.author.login}</a>
                </p>
                <Card.Text style={{ fontSize: "24px"}}>
                    {this.props.description}
                </Card.Text>
                <a href={this.props.url}><Button variant="outline-dark" style={{width: "100%"}}>Посмореть</Button></a>
            </Card.Body>
        </Card>
    }
}


export default Article;
