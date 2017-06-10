module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "mocha": true,
        "jest": true
    },
    "extends": "airbnb/base",
    "rules": {
        "no-unused-vars": ["warn", { "vars": "all", "args": "after-used" }],
        "linebreak-style": ["off"],
        "react/jsx-filename-extension": ["off"],
        "react/prefer-stateless-function": ["off"],
        "class-methods-use-this": ["off"],
        "no-undef": ["warn"]
    }
}