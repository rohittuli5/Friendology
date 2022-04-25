import React, { useState, useEffect } from "react";
// import PostService from "../services/post.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import {ListGroup,ListGroupItem} from 'react-bootstrap'

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
          res.push(obj[i].key.email)
        }
        setFriends(res);
      },
      (error) => {
        console.log("Error", error.response);
      }
      );
    }, []);
    const listfriends=[]
    for (var i in friends)
    {
      listfriends.push(<ListGroup.Item>{friends[i]}</ListGroup.Item>)
    }

  return (
    <div>
      <h1>Display Friends List</h1>
<ListGroup>
{listfriends}
</ListGroup>

    </div>
  );
};

export default Friends;