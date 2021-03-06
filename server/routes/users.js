const router = require('express').Router();
let User = require('../models/user');
let Weights = require('../models/weights');
let friends = require('../compareUsers/findFriendsFunctions');
const {
	query
} = require('express');

/*
POST rest API call for user data

Returns:
	User data of the current user;
	In case of error will return the error;
*/
router.route('/userData').post((req, res) => {
	email = req.body.email;
	User.findOne({
		email: email
	}, function (err, foundUsers) {
		if (err) {
			res.status(400).json("Bad Credentials")
		} else {
			if (foundUsers) {
				res.status(200).json(foundUsers)
			}
		}
	});

});

/*
POST rest API call for signup
Adds the user to the mongo db database
*/


router.route('/signup').post((req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const age = req.body.age;
	const gender = req.body.gender;
	User.findOne({
		email: email
	}, user => {

		if (!user) {
			const newUser = new User({
				email,
				password,
				age,
				gender
			});

			newUser.save()
				.then(() => res.status(201).json(newUser))
				.catch(err => res.status(400).json('Error: ' + err));

		} else {
			res.status(400).json("User already registered")
		}
	})
});

router.route('/login').post((req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({
		email: email,
		password: password
	}, function (err, foundUsers) {
		if (err) {
			res.status(400).json("Bad Credentials")
		} else {
			if (foundUsers) {
				res.status(200).json(foundUsers);
			}else{
				res.status(400).json("User does not exist");
			}
		}
	});


})

router.route('/update').put((req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const filter = {
		email: email,
		password: password
	};
	var update = req.body;
	User.findOneAndUpdate(filter, update, {
		new: true
	}, function (err, user) {
		if (err) {
			res.status(400).json("Error: " + err);
		} else {
			if (!user) {
				res.status(400).json("Email or Password is incorrect");
			} else {
				res.status(200).json(user);
			}
		}
	});

	// if(user['friends'].length){
	// 	let weights=friends.updateWeights(user);
	// 	update=weights;
	// 	console.log(update);
	// }


});

router.route('/findFriends').post(async (req, res) => {
	const email = req.body.email;

	const filter = {
		email: email
	};

	User.findOne(filter, async function (err, currUser) {
		if (err) {
			res.status(400).json("Bad Credentials");
		}
		if (!currUser) {
			res.status(400).json("User does not exists");
		} else {
			let query = User.find({
				email: {
					$ne: email
				}
			})
			const usersList = await query.exec();
			query = Weights.findOne({
				email: email
			}, function (err, doc) {
				if (err) {
					res.status(400).json('Unable to set weights');
				}
				var weightsCurr;
				if (!doc) {
					weightsCurr = new Weights({
						email: email
					});
					weightsCurr.save();
				} else {
					weightsCurr = doc;
					weightsCurr = friends.updateWeights(currUser, usersList, weightsCurr);
				}
				let potentialFriends = friends.findFriends(currUser, usersList, weightsCurr);
				res.status(200).json({
					potentialFriends,
					weightsCurr
				});
			});

		}
	});




});

router.post('/addFriends', (req, res) => {
	const friends = req.body.friends;
	const email = req.body.email;
	const password = req.body.password;
	const filter = {
		email: email,
		password: password
	};
	User.findOne(filter, function (err, foundUsers) {
		if (err) {
			res.status(400).json("Error: " + err)
		} else {
			if (foundUsers) {
				// console.log(foundUsers);
				var friendsList = new Set();
				foundUsers.friends.forEach(friend => {
					friendsList.add(friend);
				})
				friends.forEach(friend => {
					if (!friendsList.has(friend)) {
						foundUsers.friends.push(friend);
					}
				});
				var update = foundUsers;
				User.findOneAndUpdate(filter, update, {
					new: true
				}, function (err, user) {
					if (err) {
						res.status(400).json("Error: " + err);
					} else {
						if (!user) {
							res.status(400).json("Email or Password is incorrect");
						} else {
							res.status(200).json(user);
						}
					}
				});

			} else {
				res.status(400).json("Email or password is incorrect");
			}
		}
	});

});

router.post('/list', (req, res) => {
	User.find({}, function (err, curr_user) {
		if (err) {
			res.status(400).json("Bad Credentials");
		} else
			res.status(200).json(curr_user);
	});


});



router.route('/delete').delete(async (req, res) => {
	const email = req.body.email;
	const password=req.body.password;
	const filter = {
		email: email,
		password:password
	};

	User.deleteOne(filter, function (err) {
		if (err) {
			res.status(400).json("Bad Credentials");
		} else {
			res.status(200).send("Deleted");

		}
	});


});



module.exports = router;