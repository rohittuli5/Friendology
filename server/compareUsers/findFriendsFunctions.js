function findFriends(currUser, usersList,weightsCurr) {

	var potentialFriends = [];
	var friendsofCurr=currUser['friends'];
	var hashSet = new Set();
	friendsofCurr.forEach(friend => {
		hashSet.add(friend);
	})

	usersList.forEach(user => {
		let score = 0;
		let listStrings = ['gender', 'marital_status', 'cats_or_dogs', 'profession'];

		listStrings.forEach(element => {
			score += weightsCurr[element]*ifSameString(currUser[element], user[element]);
		});

		let listNumeric = ['social_media_usage', 'have_kids', 'health_conscious', 'optimist_realist_pessimist', 'political_viewpoint', 'economical_viewpoint'];


		listNumeric.forEach(element => {
			score += weightsCurr[element]*distance(currUser[element], user[element]);
		});


		score +=weightsCurr['personality_type']* personalityComparator(currUser.personality_type, user.personality_type);

		score += weightsCurr['age']*ageGap(currUser.age, user.age);

		score += weightsCurr['genre_of_music']*music_and_movies(currUser.genre_of_music, user.genre_of_music);
		score += weightsCurr['genre_of_movies']*music_and_movies(currUser.genre_of_movies, user.genre_of_movies);

		let friendsofUser = user['friends'];
		if (hashSet.has(user['email'])) {
		}
		else{
			friendsofUser.forEach(friend => {
				if (hashSet.has(friend)) {
					score += 2;
				}
			})
			potentialFriends.push({
				key: user,
				value: score
			});
		}

	});
	potentialFriends.sort(function (a, b) {
		return  b.value-a.value;
	});

	return potentialFriends;

}

function updateWeights(currUser,usersList,weightsCurr){
	if(!currUser){
		return 0;
	}
	var scoreMap=new Map();
	var userFriends=currUser['friends'];
	var emailExists=new Map();
	usersList.forEach(element=>{
		emailExists.set(element['email'],element);
	})
	const listofKeys=['age','gender',"marital_status","have_kids","cats_or_dogs","social_media_usage",
	"health_conscious","optimist_realist_pessimist","personality_type","hobbies",
	"profession","income_level","political_viewpoint","economical_viewpoint",
	"latitude","longitude","genre_of_music","genre_of_movies"]

	listofKeys.forEach(element=>{
		scoreMap.set(element,0);
		// console.log(element,scoreMap.get(element));
	});
	let count=0;
	userFriends.forEach(email=>{
		if(emailExists.has(email)){
			count+=1;
			let user=emailExists.get(email);
			let listStrings = ['gender', 'marital_status', 'cats_or_dogs', 'profession'];
			
			listStrings.forEach(element => {
				//console.log(element,scoreMap[element]);
				let val=scoreMap.get(element)
				val+=ifSameString(currUser[element], user[element]);
				scoreMap.set(element,val);
			});
			
			let listNumeric = ['social_media_usage', 'have_kids', 'health_conscious', 'optimist_realist_pessimist', 'political_viewpoint', 'economical_viewpoint'];
			
			
			listNumeric.forEach(element => {
				let val=scoreMap.get(element)
				val+=ifSameString(currUser[element], user[element]);
				scoreMap.set(element,val);
			});
			
			let val;
			val=scoreMap.get('personality_type')
			val+= personalityComparator(currUser.personality_type, user.personality_type);
			scoreMap.set('personality_type',val);
			
			val=scoreMap.get('age')
			val+= ageGap(currUser.age, user.age);
			scoreMap.set('age',val);	

			val=scoreMap.get('genre_of_music')
			val+= music_and_movies(currUser.genre_of_music, user.genre_of_music);
			scoreMap.set('genre_of_music',val);					

			val=scoreMap.get('genre_of_movies')
			val+= music_and_movies(currUser.genre_of_movies, user.genre_of_movies);
			scoreMap.set('genre_of_movies',val);					
		}
			
	});
	count=Math.max(count,1);
	listofKeys.forEach(key=>{
		console.log(key)
		let val=scoreMap.get(key);
		scoreMap.set(key,val/count);
	})
	scoreMap = new Map([...scoreMap.entries()].sort((a, b) => b[1] - a[1]));

	console.log(scoreMap.keys);
	console.log(scoreMap);
	var temp=[]


	listofKeys.forEach(key=>{
		temp.push({
			key: key,
			value: 	scoreMap.get(key),

			});
		}
	)
	temp.sort(function (a, b) {
		return  b.value-a.value;
		});
	let start=temp.length;

	temp.forEach(element=>{
		weightsCurr[element.key]=start;
		start--;
	});
	return weightsCurr;
}
function personalityComparator(currPersonality, userPersonality) {

	// src="https://due.com/blog/key-personality-types/
	// Which pair of personalities stick together"

	if (currPersonality === "default" || userPersonality === "default") {
		return 0;
	}

	const similarPersonality = new Map();
	similarPersonality.set("ISTJ", 8);
	similarPersonality.set("ESTP", 8);
	similarPersonality.set("INTP", 7);
	similarPersonality.set("INTJ", 7);
	similarPersonality.set("ENFP", 6);
	similarPersonality.set("INFJ", 6);
	similarPersonality.set("ENTJ", 5);
	similarPersonality.set("ISTP", 5);
	similarPersonality.set("ISFP", 4);
	similarPersonality.set("ESFP", 4);
	similarPersonality.set("ENTP", 3);
	similarPersonality.set("ENFJ", 3);
	similarPersonality.set("ISFJ", 2);
	similarPersonality.set("INFP", 2);
	similarPersonality.set("ESFJ", 1);
	similarPersonality.set("ESTJ", 1);


	if (similarPersonality[userPersonality] == similarPersonality[currPersonality]) {
		return 10;
	}
	return 0;

}

function ageGap(currAge, userAge) {
	if (currAge == -1 || userAge == -1) {
		return 0;
	}
	if (Math.abs(currAge - userAge) > 5) {
		return 0;
	}
	return 5 - Math.abs(currAge - userAge);
}

function music_and_movies(currMusic, userMusic) {
	if (currMusic.length == 0 || userMusic.length == 0) {
		return 0;
	}
	const set = new Set();
	userMusic.forEach((music) => {
		set.add(music);
	});
	var count = 0;
	for (let music of currMusic) {
		if (set.has(music)) {
			count += 2;
		}
	}
	return Math.min(count, 5);
}

function ifSameString(quality1, quality2) {

	if (quality1 == "default" || quality2 == "default") {
		return 0;
	}

	if (quality1 === quality2) {
		return 5;
	}
	return 1;
}

function distance(currScore, userScore) {
	if (currScore == -1 || userScore === -1) {
		return 0;
	}
	return 5 - Math.abs(currScore - userScore);
}


module.exports = {
	findFriends,
	distance,
	personalityComparator,
	ifSameString,
	ageGap,
	updateWeights
}

/*
function findFriends(currUser, usersList) {

	var potentialFriends = [];
	var friendsofCurr=currUser['friends'];
	var hashSet = new Set();
	friendsofCurr.forEach(friend => {
		hashSet.add(friend);
	})

	usersList.forEach(user => {
		let score = 0;
		let listStrings = ['gender', 'marital_status', 'cats_or_dogs', 'profession'];

		listStrings.forEach(element => {
			score += ifSameString(currUser[element], user[element]);
		});

		let listNumeric = ['social_media_usage', 'have_kids', 'health_conscious', 'optimist_realist_pessimist', 'political_viewpoint', 'economical_viewpoint'];


		listNumeric.forEach(element => {
			score += distance(currUser[element], user[element]);
		});


		score += personalityComparator(currUser.personality_type, user.personality_type);

		score += ageGap(currUser.age, user.age);

		score += music_and_movies(currUser.genre_of_music, user.genre_of_music);
		score += music_and_movies(currUser.genre_of_movies, user.genre_of_movies);

		let friendsofUser = user['friends'];
		if (hashSet.has(user['email'])) {
		}
		else{
			friendsofUser.forEach(friend => {
				if (hashSet.has(friend)) {
					score += 2;
				}
			})
			potentialFriends.push({
				key: user,
				value: score
			});
		}

	});
	potentialFriends.sort(function (a, b) {
		return  b.value-a.value;
	});

	return potentialFriends;

}

*/ 