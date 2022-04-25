import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
// import PostService from "../services/post.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import {ListGroup,ListGroupItem,Row,Col,Tab} from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
// import ListGroup from 'react-bootstrap/ListGroup'
const Friends = () => {
  const [friends,setFriends]=useState("")
  const navigate = useNavigate();
  // setCurrentUser(localStorage.getItem("user"))
  useEffect(() => {
    const email = localStorage.getItem("email")
   
    AuthService.getFriends(email).then(
      (response) => {
        console.log(JSON.parse(response))
        var res=[]
        var obj=JSON.parse(response)
        for(var i in JSON.parse(response))
        {
          console.log(obj[i].key)
          res.push(obj[i].key)
        }
        setFriends(res);
      },
      (error) => {
        console.log("Error", error.response);
      }
      );
    }, []);
    const listfriends=[]
    const infofriends=[]
    for (var i in friends)
    {
      // listfriends.push(<ListGroup.Item>{friends[i]}</ListGroup.Item>)
      listfriends.push(<ListGroup.Item action href={'#'+friends[i].email}>{friends[i].email}</ListGroup.Item>)

    }







    for (var i in friends)
    {
      infofriends.push(<Tab.Pane eventKey={'#'+friends[i].email}>
        <Card style={{ width: '50rem' }}>
  <Card.Body>
    <Card.Subtitle className="mb-2 text-muted">{friends[i].email}</Card.Subtitle>
    <Card.Title>
              <span>Personality Type: <Badge pill bg="success">{friends[i].personality_type}</Badge> </span>
    </Card.Title>
    <ListGroup className="list-group-flush">
    <ListGroupItem>
      <div className="row">
        <div className="col">
        <span>Gender: {friends[i].gender} </span>
        </div>
        <div className="col">
        <span>
        Age:</span><span className="label label-primary">{friends[i].age}</span>

        </div>
      </div>
        </ListGroupItem>
    <ListGroupItem>
      <div className="row">
        <div className="col">
        <span>Status: {friends[i].marital_status} </span>
        </div>
        <div className="col">
        <span>
        Kids: {friends[i].setKids} 
        </span>
        </div>
      </div>
      </ListGroupItem>
    <ListGroupItem>
    <div className="row">
        <div className="col">
        <span>Pet: {friends[i].cats_or_dogs} </span>
        </div>
        <div className="col">
        <span>
        Social Media Usage: {friends[i].social_media_usage} 
        </span>
        </div>
      </div>
    </ListGroupItem>
    <ListGroupItem>
    <div className="row">
        <div className="col">
        <span>Profession: {friends[i].profession} </span>
        </div>
        <div className="col">
        <span>
        Income Level: {friends[i].income_level} 
        </span>
        </div>
      </div>
    </ListGroupItem>
    <ListGroupItem>
    <div className="row">
        <div className="col">
        <span>Health Conscious: {friends[i].health_conscious} </span>
        </div>
        <div className="col">
        <span>
        ORP: {friends[i].optimist_realist_pessimist} 
        </span>
        </div>
      </div>
    </ListGroupItem>
    <ListGroupItem>
    <div className="row">
        <div className="col">
        <span>Politics: {friends[i].political_viewpoint} </span>
        </div>
        <div className="col">
        <span>
        Economics: {friends[i].economical_viewpoint} 
        </span>
        </div>
      </div>
    </ListGroupItem>
    <ListGroupItem>
    <div className="row">
        <div className="col">
          <span>Hobbies: </span>
          {friends[i].hobbies.map((hobbie)=><Badge className="mx-1" pill bg="primary">{hobbie}</Badge>)}
                  </div>
        <div className="col">
        <span>Movies: </span>
          {friends[i].genre_of_movies.map((hobbie)=><Badge  className="mx-1" pill bg="warning">{hobbie}</Badge>)}
                  </div>
                  <div className="col">
        <span>Music: </span>
          {friends[i].genre_of_music.map((hobbie)=><Badge className="mx-1" pill bg="info">{hobbie}</Badge>)}
                  </div>
      </div>
    </ListGroupItem>
  </ListGroup>
    <Button href="#">Add Friend</Button>
  </Card.Body>
</Card>
        </Tab.Pane>)
    }











  return (
    <div style={{backgroundColor: 'gray'}}>
      <h1>Recomended Friends List</h1>
      <hr />
<Tab.Container id="list-group-tabs-example" 
>
  <Row>
    <Col sm={4}>
      <ListGroup>
        {listfriends}
      </ListGroup>
    </Col>
    <Col sm={8} >
      <Tab.Content>
        {infofriends}
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
    </div>
  );
};

export default Friends;