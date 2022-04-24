import React, { useState, useEffect } from "react";
// import PostService from "../services/post.service";
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form'

const Home = () => {
  const[client,setUser]=useState(null);
  	const [email, setemail] = useState(0);
    const [password,setpassword]=useState(0);
    const [age,setAge]=useState(0);
    const [gender,setGender]=useState(null);
    const [marital_status,setStatus]=useState(null);
    const [have_kids,setKids]=useState(0);
    const [cats_or_dogs,setCat]=useState(0);
    const [social_media_usage,setMedia]=useState(null);
    const [health_conscious,setHealth]=useState(null);
    const [optimist_realist_pessimist,setORP]=useState(null);
    const [personality_type,setPersonality]=useState(null);
    const [hobbies,setHobbies]=useState(null);
    const [profession,setProfession]=useState(null);
    const [income_level,setIncome]=useState(null);
        const [political_viewpoint,setPolitical]=useState(null);
        const [economical_viewpoint,setEconomical]=useState(null);
        const [genre_of_music,setMusic]=useState(null);
        const [genre_of_movies,setMovies]=useState(null);
                const [latitude,setLatitude]=useState(null);
    const [longitude,setLongitude]=useState(null);

  const [currentUser, setCurrentUser] = useState(undefined);
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
       setUser(localStorage.getItem("user"));;
      setCurrentUser(user);
    }
  }, []);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.update(email, password,age,gender,marital_status,have_kids,cats_or_dogs,
  social_media_usage,health_conscious,optimist_realist_pessimist,personality_type,hobbies,profession,income_level,political_viewpoint,
  economical_viewpoint,genre_of_music,genre_of_movies,latitude,longitude).then(
        () => {
          navigate("/friends_list");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
        <h1>Please Complete your Profile</h1>
		<Form onSubmit={handleSubmit}>
        <label>
          Age:
          <input type="text" value={age} onChange={(e)=>setAge(e.target.value)} />
        </label>
        <label>
          Gender:
          <select value={gender} onChange={(e)=>setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Lol">Don't Know</option>
          </select>
        </label>
        <label>
          Marital Status:
          <select value={marital_status} onChange={(e)=>setStatus(e.target.value)}>
            <option value="Married">Married</option>
            <option value="Single">Single</option>
            <option value="In Relationship">In Relationship</option>
          </select>
        </label>
                  <label>
          Kids:
          <input type="text" value={have_kids} onChange={(e)=>setKids(e.target.value)} />
        </label>
        <label>
          Cats or Dog:
          <select value={cats_or_dogs} onChange={(e)=>setCat(e.target.value)}>
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
            <option value="Neither">Neither</option>
          </select>
        </label>
    <label>
          Social Media Usage:
          <select value={social_media_usage} onChange={(e)=>setMedia(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>

        <label>
          Health Conscious:
          <select value={health_conscious} onChange={(e)=>setHealth(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label>
          optimist_realist_pessimist:
          <select value={optimist_realist_pessimist} onChange={(e)=>setORP(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label>
          personality_type:
          <textarea value={personality_type} onChange={(e)=>setPersonality(e.target.value)} />
        </label>
    <label>
          Hobbies:
          <textarea value={hobbies} onChange={(e)=>setHobbies(e.target.value)} />
        </label>
    <label></label>
    <label>
          profession:
          <textarea value={profession} onChange={(e)=>setProfession(e.target.value)} />
        </label>
    <label>
          Income Level:
          <input type="text" value={income_level} onChange={(e)=>setIncome(e.target.value)} />
        </label>
        <label>
          political_viewpoint:
          <select value={political_viewpoint} onChange={(e)=>setPolitical(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label>
          economical_viewpoint:
          <select value={economical_viewpoint} onChange={(e)=>setEconomical(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
                {/* latitude:{
                  type:Number,
                default:-1,
    },
                longitude:{
                  type:Number,
                default:-1,
    }, */}
    <label>
          genre_of_music:
          <textarea value={genre_of_music} onChange={(e)=>setMusic(e.target.value)} />
        </label>
        <label>
          genre_of_movies:
          <textarea value={genre_of_movies} onChange={(e)=>setMovies(e.target.value)} />
        </label>
      <input type="submit" value="Submit" />
		</Form>
    </div>
  );
};

export default Home;