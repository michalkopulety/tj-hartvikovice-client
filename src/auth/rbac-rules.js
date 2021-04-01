export const PREDEFINED_PERMISIONS = {
	"PLAYERS": {
		"CREATE": "create:players",
		"UPDATE": "update:players",
		"READ": "read:players",
		"DELETE": "read:players"
	},
	"TRAININGS": {
		"CREATE": "create:trainings",
		"UPDATE": "update:trainings",
		"READ": "read:trainings",
		"DELETE": "read:trainings"
	}
};

export const PREDEFINED_ROLES = {
	"hartal-portal-coach": [
		"create:trainings",
		"read:players",
		"read:trainings"
	],
	"hartal-portal-admin": [
		"create:players",
		"create:trainings",
		"read:players",
		"read:trainings"
	],
	"hartal-portal-user": [
		"read:players",
		"read:trainings"
	],
};