const path = require('path');

module.exports = {
    entry: [
        './src/index'
    ],
    output: {
        filename: 'immutable-js-schema.js',
        path: path.join(__dirname, './dist'),
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
