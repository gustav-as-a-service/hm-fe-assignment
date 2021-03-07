module.exports = {
	"extends": [
	  "airbnb-typescript",
	],
	"parserOptions": {
	  "project": './tsconfig.json',
	},
	"rules": {
	  // We want to catch-throw as we please
		"@typescript-eslint/explicit-module-boundary-types":0,
		"linebreak-style": [
			"error",
			"unix"
		],
		"semi": [
			"error",
			"always"
		],
    // We prefer named exports
    "import/prefer-default-export":0,

    // We use TypeScript
    "react/require-default-props":0,

    // Props spreading is OK as long as we have TS
    "react/jsx-props-no-spreading":0
	}
};
