import React, { useState, useEffect } from "react";
// import PostService from "../services/post.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [privatePosts, setPrivatePosts] = useState([]);

  const navigate = useNavigate();


  return (
    <div>
      <h3>{privatePosts.map((post) => post.content)}</h3>
    </div>
  );
};

export default Home;