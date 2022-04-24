import React, { useState, useEffect } from "react";
// import PostService from "../services/post.service";
import questions from "./question";
const Home = () => {
  const [posts, setPosts] = useState([]);
const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [age,setAge]=useState(0);
    const [gender,setGender]=useState(null);
    const [maritalstatus,setStatus]=useState(null)

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
//   useEffect(() => {
//     PostService.getAllPublicPosts().then(
//       (response) => {
//         setPosts(response.data);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   }, []);

  return (
    <div>
        <h1>Please Complete your Profile</h1>
		<div className='app'>
            
			{showScore ? (
        <div className='score-section'>
					You scored {score} out of {questions.length}
                    <input type="submit" value="Submit" />
				</div>
			) : (
        <>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
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
          Gender:
          <select value={maritalstatus} onChange={(e)=>setStatus(e.target.value)}>
            <option value="Married">Married</option>
            <option value="Single">Single</option>
            <option value="In Relationship">In Relationship</option>
          </select>
        </label>

						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
              <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
              ))}
					</div>
				</>
			)}
		</div>
    </div>
  );
};

export default Home;