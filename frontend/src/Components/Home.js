import React, { useState, useEffect } from "react";
// import PostService from "../services/post.service";
import 'bootstrap/dist/css/bootstrap.min.css'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import questions from "./question";
import Form from 'react-bootstrap/Form'
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import { InputLabel, TextField, Typography } from "@mui/material";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

const Home = () => {
const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [age,setAge]=useState(0);
    const [gender,setGender]=useState("Male");
    const [maritalstatus,setStatus]=useState("Single");
    const [have_kids,setKids]=useState(0);
    const [cats_or_dogs,setCat]=useState("Dogs");
    const [social_media_usage,setMedia]=useState(null);
    const [health_conscious,setHealth]=useState(null);
    const [optimist_realist_pessimist,setORP]=useState(null);
    const [personality_type,setPersonality]=useState("INTJ");
    const [profession,setProfession]=useState(null);
    const [income_level,setIncome]=useState(null);
    const [political_viewpoint,setPolitical]=useState(null);
    const [economical_viewpoint,setEconomical]=useState(null);
    const [hobbies,setHobbies]=useState({
      reading:false,
      travelling:false,
      music:false,
      videogames:false,
      crafting:false,
      collecting:false,
      gardening:false,
      art:false,
      cooking:false,
      running:false,

    });
    const [genre_of_movies,setMovies]=useState({
      not_into_movies:false,
      action:false,
      drama:false,
      horror:false,
      comedy:false,
      thriller:false,
      science_fiction:false,
      romance:false,
      crime:false,
      adventure:false,
      
    });
    const [genre_of_music,setMusic]=useState({
      not_into_music:false,
      rock:false,
      pop:false,
      jazz:false,
      classical:false,
      instrumental:false,
      electronic:false,
      regional:false,
      heavy_metal:false,
      
    });
    // latitude:{
    //     type:Number,
    //     default:-1,
    // },
    // longitude:{
    //     type:Number,
    //     default:-1,
    // },
        // this.handleSubmit = this.handleSubmit.bind(this);
    const handleHobbyChange = (event) => {
      setHobbies({
        ...hobbies,
        [event.target.name]: event.target.checked,
      });
    };
    const handleMusicGenreChange = (event) => {
      setMusic({
        ...genre_of_music,
        [event.target.name]: event.target.checked,
      });
    };
    const handleMovieGenreChange = (event) => {
      setMovies({
        ...genre_of_movies,
        [event.target.name]: event.target.checked,
      });
    };
    const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};

  const handleSubmit=()=> {
    alert('Submitted');
  };
  const genders = [
    {
      value: 'Male',
      label: 'Male',
    },
    {
      value: 'Female',
      label: 'Female',
    },
    
  ];

  const marital_status = [
    {
      value: 'Married',
      label: 'Married',
    },
    {
      value: 'Single',
      label: 'Single',
    },
    {
      value: 'In a Relationship',
      label: 'In a Relationship',
    },
    
  ];
  const cat_or_dog = [
    {
      value: 'Cats',
      label: 'Cats',
    },
    {
      value: 'Dogs',
      label: 'Dogs',
    },
    {
      value: 'Neither',
      label: 'Neither',
    },
    
  ];
  const professions = [
    {
      value: 'Student (Science)',
      label: 'Student (Science)',
    },
    {
      value: 'Student (Commerce)',
      label: 'Student (Commerce)',
    },
    {
      value: 'Student (Arts)',
      label: 'Student (Arts)',
    },
    {
      value: 'Business/ Self Employed',
      label: 'Business/ Self Employed',
    },
    {
      value: 'Engineer',
      label: 'Engineer',
    },
    {
      value: 'Doctor',
      label: 'Doctor',
    },
    {
      value: 'Manager',
      label: 'Manager',
    },
    {
      value: 'Accountant',
      label: 'Accountant',
    },
    {
      value: 'Lawyer',
      label: 'Lawyer',
    },
    {
      value: 'Teacher',
      label: 'Teacher',
    },
    {
      value: 'Others',
      label: 'Others',
    },
  ];
  const political_marks = [
    {
      value: 1,
      label: "Liberal",
    },
    {
      value: 5,
      label: 'Authoritarian',
    },
    {
      value: 3,
      label: 'Centrist',
    },
    
  ];
  const economical_marks = [
    {
      value: 1,
      label: "Communist",
    },
    {
      value: 5,
      label: 'Capitalist',
    },
    {
      value: 3,
      label: 'Centrist',
    },
    
  ];
  const personality = [
    {
      value: "INTJ",
      label: "INTJ",
    },
    {
      value: "ISTJ",
      label: "ISTJ",
    },
    {
      value: "INFJ",
      label: "INFJ",
    },
    {
      value: "ENFJ",
      label: "ENFJ",
    },
    {
      value: "ISTP",
      label: "ISTP",
    },
    {
      value: "ESFJ",
      label: "ESFJ",
    },
    {
      value: "INFP",
      label: "INFP",
    },
    {
      value: "ESFP",
      label: "ESFP",
    },
    {
      value: "ENFP",
      label: "ENFP",
    },
    {
      value: "ESTP",
      label: "ESTP",
    },
    {
      value: "ESTJ",
      label: "ESTJ",
    },
    {
      value: "ENTJ",
      label: "ENTJ",
    },
    {
      value: "INTP",
      label: "INTP",
    },
    {
      value: "ISFJ",
      label: "ISFJ",
    },
    {
      value: "ENTP",
      label: "ENTP",
    },
    {
      value: "ISFP",
      label: "ISFP",
    },
  ];
  return (
    <div>
        <br/>
        <br/>
        <Paper elevation={2} style={{padding:15, backgroundColor:"#EFEFEF"}}>
        
        <Grid container spacing={3} marginLeft={3} alignItems="center"
        justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h3" component="h3" fullWidth>Update Profile</Typography>
          <br/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h5" fullWidth>General </Typography>
          
        </Grid>
        <Grid item xs={4}>
        <TextField id="age" style={{width:"75%"}} variant="outlined" label="Age" value={age} onChange={(e)=>setAge(e.target.value)}/>
        
        </Grid>
        <Grid item xs={4}>
        <TextField id="gender" style={{width:"75%"}} width={100} select variant="outlined" label="Gender" value={gender} onChange={(e)=>setGender(e.target.value)}>
        {genders.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        </TextField>
        
        </Grid>
        
        <Grid item xs={4}>
        <TextField id="maritalstatus" style={{width:"75%"}} select variant="outlined" label="Marital Status" value={maritalstatus} onChange={(e)=>setStatus(e.target.value)}>
        {marital_status.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        </TextField>
        
        </Grid>
        
        <Grid item xs={4}>
        <TextField id="kids" variant="outlined" style={{width:"75%"}} label="No of Kids" value={have_kids} onChange={(e)=>setKids(e.target.value)}/>
        </Grid>
        
        <Grid item xs={4}>
        <TextField id="cats_or_dogs" select style={{width:"75%"}} variant="outlined" label="Cats or Dogs?" value={cats_or_dogs} onChange={(e)=>setCat(e.target.value)}>
        {cat_or_dog.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        
        </TextField>
        </Grid>
        <Grid item xs={4}>
        <TextField id="profession" select style={{width:"75%"}} variant="outlined" label="Profession" value={profession} onChange={(e)=>setProfession(e.target.value)}>
        {professions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        
        </TextField>
        </Grid>
        <Grid item xs={4}>
        <TextField id="personality_type" select style={{width:"75%"}} variant="outlined" label="Personality Type" value={personality_type} onChange={(e)=>setPersonality(e.target.value)}>
        {personality.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        
        </TextField>
        </Grid>
        <Grid item xs={12}>
        <Typography variant="h5" component="h5">Rate yourself on 1-5 scale</Typography>
        <Typography variant="h6" component="h6">1 means least, 5 means most</Typography>
        <br/>
        </Grid>

        <Grid item xs={4}>
        <InputLabel >Social Media Usage</InputLabel>
        <Slider
          aria-label="Social Media Usage"
          defaultValue={3}
          value={social_media_usage}
          onChange={(e)=>setMedia(e.target.value)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={5}
          style={{width:"75%"}}
          />
          </Grid>
        
          <Grid item xs={4}>
        <InputLabel >Health Consciousness</InputLabel>
        <Slider
          aria-label="Health Consciousness"
          defaultValue={3}
          value={health_conscious}
          onChange={(e)=>setHealth(e.target.value)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={5}
          style={{width:"75%"}}
          />
          </Grid>
        
          <Grid item xs={4}>
          <InputLabel >Optimism Level</InputLabel>
          <Slider
            aria-label="Optimism Level"
            defaultValue={3}
            value={optimist_realist_pessimist}
            onChange={(e)=>setORP(e.target.value)}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
            style={{width:"75%"}}
            />
            </Grid>
         
            <Grid item xs={4}>
            <InputLabel >Political Viewpoint</InputLabel>
            <Slider
              aria-label="Political Viewpoint"
              defaultValue={3}
              value={political_viewpoint}
              onChange={(e)=>setPolitical(e.target.value)}
              valueLabelDisplay="auto"
              step={1}
              marks={political_marks}
              min={1}
              max={5}
              style={{width:"75%"}}
              />
              </Grid>

            <Grid item xs={4}>
            <InputLabel >Economical Viewpoint</InputLabel>
            <Slider
              aria-label="Economical Viewpoint"
              defaultValue={3}
              value={economical_viewpoint}
              onChange={(e)=>setEconomical(e.target.value)}
              valueLabelDisplay="auto"
              step={1}
              marks={economical_marks}
              min={1}
              max={5}
              style={{width:"75%"}}
              />
              </Grid>

              <Grid item xs={4}>
            <InputLabel >Income Level</InputLabel>
            <Slider
              aria-label="Income Level"
              defaultValue={3}
              value={income_level}
              onChange={(e)=>setIncome(e.target.value)}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={5}
              style={{width:"75%"}}
              />
              </Grid>
    <Grid item xs={12}>
    <Typography variant="h5" container="h5">Choose Top 3</Typography>
    <br/>
    </Grid> 

    <Grid item xs={4} direction="column" alignItems="center"
    justifyContent="center">
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Hobbies</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={hobbies.reading} onChange={handleHobbyChange} name="reading" />
            }
            label="Reading"
          />
          <FormControlLabel
            control={
              <Checkbox checked={hobbies.art} onChange={handleHobbyChange} name="art" />
            }
            label="Art/Craft"
          />
          <FormControlLabel
            control={
              <Checkbox checked={hobbies.collecting} onChange={handleHobbyChange} name="collecting" />
            }
            label="Collecting"
          />
          <FormControlLabel
            control={
              <Checkbox checked={hobbies.cooking} onChange={handleHobbyChange} name="cooking" />
            }
            label="Cooking"
          />
          <FormControlLabel
            control={
              <Checkbox checked={hobbies.crafting} onChange={handleHobbyChange} name="crafting" />
            }
            label="Crafting / Manual Work"
          />
          <FormControlLabel
            control={
              <Checkbox checked={hobbies.gardening} onChange={handleHobbyChange} name="gardening" />
            }
            label="Gardening"
          />
          <FormControlLabel
            control={
              <Checkbox checked={hobbies.music} onChange={handleHobbyChange} name="music" />
            }
            label="Music"
          />
          <FormControlLabel
            control={
              <Checkbox checked={hobbies.running} onChange={handleHobbyChange} name="running" />
            }
            label="Running"
          />
          <FormControlLabel
            control={
              <Checkbox checked={hobbies.travelling} onChange={handleHobbyChange} name="travelling" />
            }
            label="Travelling"
          />
        </FormGroup>
        <FormControlLabel
            control={
              <Checkbox checked={hobbies.videogames} onChange={handleHobbyChange} name="videogames" />
            }
            label="Video Games"
          />
        <FormHelperText>Select Maximum 3</FormHelperText>
      </FormControl>
    </Grid>

    <Grid item xs={4} alignItems="center"
    justifyContent="center">
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Movie Genres</FormLabel>
        <FormGroup>
          
          <FormControlLabel
          control={
            <Checkbox checked={genre_of_movies.not_into_movies} onChange={handleMovieGenreChange} name="not_into_movies" />
          }
          label="Not into Movies"
        />
          <FormControlLabel
            control={
              <Checkbox checked={genre_of_movies.action} onChange={handleMovieGenreChange} name="action" />
            }
            label="Action"
          />
          <FormControlLabel
            control={
              <Checkbox checked={genre_of_movies.adventure} onChange={handleMovieGenreChange} name="adventure" />
            }
            label="Adventure"
          />
          <FormControlLabel
            control={
              <Checkbox checked={genre_of_movies.comedy} onChange={handleMovieGenreChange} name="comedy" />
            }
            label="Comedy"
          />
          <FormControlLabel
            control={
              <Checkbox checked={genre_of_movies.crime} onChange={handleMovieGenreChange} name="crime" />
            }
            label="Crime"
          />
          <FormControlLabel
            control={
              <Checkbox checked={genre_of_movies.drama} onChange={handleMovieGenreChange} name="drama" />
            }
            label="Drama"
          />
          <FormControlLabel
            control={
              <Checkbox checked={genre_of_movies.horror} onChange={handleMovieGenreChange} name="horror" />
            }
            label="Horror"
          />
         
          <FormControlLabel
            control={
              <Checkbox checked={genre_of_movies.romance} onChange={handleMovieGenreChange} name="romance" />
            }
            label="Romance"
          />
        </FormGroup>
        <FormControlLabel
            control={
              <Checkbox checked={genre_of_movies.science_fiction} onChange={handleMovieGenreChange} name="science_fiction" />
            }
            label="Science Fiction"
          />
          <FormControlLabel
            control={
              <Checkbox checked={genre_of_movies.thriller} onChange={handleMovieGenreChange} name="thriller" />
            }
            label="Thriller"
          />
        <FormHelperText>Select Maximum 3</FormHelperText>
      </FormControl>
    </Grid>

    <Grid item xs={4} alignItems="center"
    justifyContent="center">
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Music Genres</FormLabel>
        <FormGroup>
          
          <FormControlLabel
          control={
            <Checkbox checked={genre_of_music.not_into_music} onChange={handleMusicGenreChange} name="not_into_music" />
          }
          label="Not into Music"
        />
          <FormControlLabel
            control={
              <Checkbox checked={genre_of_music.classical} onChange={handleMusicGenreChange} name="classical" />
            }
            label="Classical"
          />
          <FormControlLabel
            control={
              <Checkbox checked={genre_of_music.electronic} onChange={handleMusicGenreChange} name="electronic" />
            }
            label="Electronic"
          />
          <FormControlLabel
            control={
              <Checkbox checked={genre_of_music.heavy_metal} onChange={handleMusicGenreChange} name="heavy_metal" />
            }
            label="Heavy Metal"
          />
          <FormControlLabel
            control={
              <Checkbox checked={genre_of_music.instrumental} onChange={handleMusicGenreChange} name="instrumental" />
            }
            label="Instrumental"
          />
          <FormControlLabel
            control={
              <Checkbox checked={genre_of_music.jazz} onChange={handleMusicGenreChange} name="jazz" />
            }
            label="Jazz"
          />
          <FormControlLabel
            control={
              <Checkbox checked={genre_of_music.pop} onChange={handleMusicGenreChange} name="pop" />
            }
            label="Pop"
          />
         
          <FormControlLabel
            control={
              <Checkbox checked={genre_of_music.regional} onChange={handleMusicGenreChange} name="regional" />
            }
            label="Regional (Hindi, Telugu etc)"
          />
          <FormControlLabel
            control={
              <Checkbox checked={genre_of_music.rock} onChange={handleMusicGenreChange} name="rock" />
            }
            label="Rock"
          />
        </FormGroup>
        
        <FormHelperText>Select Maximum 3</FormHelperText>
      </FormControl>
    </Grid>
    <Grid item xs={12} direction="column" alignItems="center"
    justifyContent="center">
    <Button variant="contained" onClick={handleSubmit} alignItems="center">Update</Button>
    </Grid>
  
    
      
                {/* latitude:{
                  type:Number,
                default:-1,
    },
                longitude:{
                  type:Number,
                default:-1,
    }, */}
    </Grid>
      </Paper>
		
    </div>
  );
};

export default Home;