const rules = {
	"Admin": [
		"create:players",
		"read:players",
		"update:players"
	],
	"Player": [
		"read:players",
		"read:trainings"
	]
};

export default rules;