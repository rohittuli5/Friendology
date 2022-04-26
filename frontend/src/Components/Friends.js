import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
// import PostService from "../services/post.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import {ListGroup,ListGroupItem,Row,Col,Tab} from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import axios from "axios";
// import ListGroup from 'react-bootstrap/ListGroup'
const Friends = () => {
  const [friends,setFriends]=useState("")
  const [friendsvalue,setValue]=useState("")

  const navigate = useNavigate();
  // setCurrentUser(localStorage.getItem("user"))
  useEffect(() => {
    const email = localStorage.getItem("email")
   
    AuthService.getFriends(email).then(
      (response) => {
        var res=[]
        var values=[]
        var obj=JSON.parse(response)
        console.log(obj)
        for(var i in obj['potentialFriends'])
        {
          // console.log("hello",obj['potentialFriends'][i])
          res.push(obj['potentialFriends'][i].key)
          values.push(obj['potentialFriends'][i].value)
        }
        setFriends(res);
        setValue(values);
      },
      (error) => {
        console.log("Error", error.response);
      }
      );
    }, []);


    const addFriend=(friend)=>{

      console.log(friend)
      let user=AuthService.getCurrentUser()
      user.friends.push(friend);
      console.log(user)
      axios.post("users/addFriends", user).then((response)=>{
        console.log(response);
        window.location.reload();
      })
      .catch((err)=>{
        console.log(err);
      })
      
    }
    const listfriends=[]
    const infofriends=[]


    for (var i in friends)
    {
      // listfriends.push(<ListGroup.Item>{friends[i]}</ListGroup.Item>)
      listfriends.push(<ListGroup.Item className="list-group-item d-flex justify-content-between align-items-center" action href={'#'+friends[i].email}>{friends[i].email}  <Badge pill bg="danger">{friendsvalue[i]}</Badge></ListGroup.Item>)

    }



    let list_of_friends=[]
    for(i in friends){
      list_of_friends.push(friends[i])
    }

    list_of_friends.map((friend)=>{
      infofriends.push(<Tab.Pane eventKey={'#'+friend.email}>
        <Card style={{ width: '50rem' }}>
  <Card.Body>
    <Card.Subtitle className="mb-2 text-muted">{friend.email}</Card.Subtitle>
    <Card.Title>
              <span>Personality Type: <Badge pill bg="success">{friend.personality_type}</Badge> </span>
    </Card.Title>
    <ListGroup className="list-group-flush">
    <ListGroupItem>
      <div className="row">
        <div className="col">
        <span>Gender: {friend.gender} </span>
        </div>
        <div className="col">
        <span>
        Age:</span><span className="label label-primary">{friend.age}</span>

        </div>
      </div>
        </ListGroupItem>
    <ListGroupItem>
      <div className="row">
        <div className="col">
        <span>Status: {friend.marital_status} </span>
        </div>
        <div className="col">
        <span>
        Kids: {friend.have_kids} 
        </span>
        </div>
      </div>
      </ListGroupItem>
    <ListGroupItem>
    <div className="row">
        <div className="col">
        <span>Pet: {friend.cats_or_dogs} </span>
        </div>
        <div className="col">
        <span>
        Social Media Usage: {friend.social_media_usage} 
        </span>
        </div>
      </div>
    </ListGroupItem>
    <ListGroupItem>
    <div className="row">
        <div className="col">
        <span>Profession: {friend.profession} </span>
        </div>
        <div className="col">
        <span>
        Income Level: {friend.income_level} 
        </span>
        </div>
      </div>
    </ListGroupItem>
    <ListGroupItem>
    <div className="row">
        <div className="col">
        <span>Health Conscious: {friend.health_conscious} </span>
        </div>
        <div className="col">
        <span>
        Optimism Level: {friend.optimist_realist_pessimist} 
        </span>
        </div>
      </div>
    </ListGroupItem>
    <ListGroupItem>
    <div className="row">
        <div className="col">
        <span>Politics: {friend.political_viewpoint} </span>
        </div>
        <div className="col">
        <span>
        Economics: {friend.economical_viewpoint} 
        </span>
        </div>
      </div>
    </ListGroupItem>
    <ListGroupItem>
    <div className="row">
        <div className="col">
          <span>Hobbies: </span>
          {friend.hobbies.map((hobbie)=><Badge className="mx-1" pill bg="primary">{hobbie}</Badge>)}
                  </div>
        <div className="col">
        <span>Movies: </span>
          {friend.genre_of_movies.map((hobbie)=><Badge  className="mx-1" pill bg="warning">{hobbie}</Badge>)}
                  </div>
                  <div className="col">
        <span>Music: </span>
          {friend.genre_of_music.map((hobbie)=><Badge className="mx-1" pill bg="info">{hobbie}</Badge>)}
                  </div>
      </div>
    </ListGroupItem>
  </ListGroup>
    <Button onClick={(e)=>addFriend(friend.email)}>Add Friend</Button>
  </Card.Body>
</Card>
        </Tab.Pane>)
    })
    





  return (
    <div >
      <h1 style={{color:'#ffffff', textAlign:'center'}}>Recomended Friends List</h1>
      <hr style={{color:'#ffffff'}}/>
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