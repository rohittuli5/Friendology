import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
// import PostService from "../services/post.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import {ListGroup,ListGroupItem,Row,Col,Tab} from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
// import ListGroup from 'react-bootstrap/ListGroup'
const Friends = () => {
  const [friends,setFriends]=useState("")
  const [friendsvalue,setValue]=useState("")
  const [user,setCurrentUser]=useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    setCurrentUser(localStorage.getItem("user"))
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
    const listfriends=[]
    const infofriends=[]
    const userfriends=[]
    for (var i in friends)
    {
      // listfriends.push(<ListGroup.Item>{friends[i]}</ListGroup.Item>)
      listfriends.push(<ListGroup.Item className="list-group-item d-flex justify-content-between align-items-center" action href={'#'+friends[i].email}>{friends[i].email}  <Badge pill bg="danger">{friendsvalue[i]}</Badge></ListGroup.Item>)

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
        Kids: {friends[i].have_kids} 
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
        Optimism Level: {friends[i].optimist_realist_pessimist} 
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
    {/* <Button href="#">Add Friend</Button> */}
  </Card.Body>
</Card>
        </Tab.Pane>)
    }
    var j=1
    for(var i in JSON.parse(localStorage.getItem("user")).friends)
    {
      // console.log("hello",i)
      userfriends.push(<tr>
      <td>{j}</td>
      <td>{JSON.parse(localStorage.getItem("user")).friends[i]}</td>
    </tr>)

j=j+1
      }










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
      <hr style={{color:'#ffffff'}}/>
            <h1 style={{color:'#ffffff', textAlign:'center'}}>Friends List</h1>
      <Table bordered style={{color:'#ffffff',textAlign:'center'}}>

  <thead>
    <tr>
      <th>#</th>
      <th>Email ID</th>
    </tr>
  </thead>
  <tbody>
    {userfriends}
  </tbody>
</Table>
    </div>
  );
};

export default Friends;