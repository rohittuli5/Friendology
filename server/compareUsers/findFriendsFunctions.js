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

function updateWeights(currUser,usersList,weightsCurr){
	if(!currUser){
		return 0;
	}
	var hashMap=new Map();
	var userFriends=currUser['friends'];
	var emailExists=new Map();
	usersList.forEach(element=>{
		emailExists.set(element['email'],element);
	})
	console.log(currUser.keys());
	for (const key in currUser){
		if(key!='email' && key!='password' && key!='friends'){
			hashMap.set(key,0);
		}
	}

	userFriends.forEach(email=>{
		if(emailExists.has(email)){
			let user=emailExists[email];
			let listStrings = ['gender', 'marital_status', 'cats_or_dogs', 'profession'];
			
			listStrings.forEach(element => {
				hashMap[element]+=ifSameString(currUser[element], user[element]);
			});
			
			let listNumeric = ['social_media_usage', 'have_kids', 'health_conscious', 'optimist_realist_pessimist', 'political_viewpoint', 'economical_viewpoint'];
			
			
			listNumeric.forEach(element => {
				hashMap[element]+= distance(currUser[element], user[element]);
			});
			
			
			hashMap['personality_type']+= personalityComparator(currUser.personality_type, user.personality_type);
			
			hashMap['age']+= ageGap(currUser.age, user.age);
			
			hashMap['music'] += music_and_movies(currUser.genre_of_music, user.genre_of_music);
			hashMap['movies'] += music_and_movies(currUser.genre_of_movies, user.genre_of_movies);
		}
			
	});
	var l=userFriends.length;
	for (const [key, value] of Object.entries(hashMap)) {
		hashMap[key]/=l;
	  }
	let start=hashMap.keys();
	console.log(start);
	for (const [key, value] of Object.entries(hashMap)) {
		weightsCurr[key]=value;
	  }
	console.log(weightsCurr);
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