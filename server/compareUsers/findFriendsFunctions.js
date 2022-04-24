function findFriends(currUser, usersList) {

	console.log(usersList);

	var potentialFriends = [];

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

		potentialFriends.push({
			key: score,
			val: user.email
		});

	});

	potentialFriends.sort(function (a, b) {
		return a.val.localeCompare(b.val);
	});

	return potentialFriends;

}

function findCommonFriends(currUser, usersList) {
	var count = 0;
	let hashMap = new Map();
	let friendsofCurr = currUser['friends'];
	var commonFriendsList = [];
	friendsofCurr.forEach(friend => {
		hashMap.add({
			key: friend,
			value: 1
		});
	})
	usersList.forEach(user => {
		count = 0;
		hashMap.clear();
		let friendsofUser = user['friends'];
		if (hashMap.has(currUser['email'])) {
			//"They are already friends"
			count=-100;
		}
		else{
			friendsofUser.forEach(friend => {
			if (hashMap.has(friend)) {
				count += 1;
			}
			})
		}
		commonFriendsList.push({
			key: count,
			score: count
		});

	});
	commonFriendsList.sort(function (a, b) {
		return a.val.localeCompare(b.val);
	});

	return commonFriendsList;
}

function personalityComparator(currPersonality, userPersonality) {

	// src="https://due.com/blog/key-personality-types/
	// Which pair of personalities stick together"

	if (currPersonality == "default" || userPersonality == "default") {
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
	findCommonFriends
}