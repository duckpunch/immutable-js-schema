const path = require('path');

module.exports = {
    entry: [
        './src/index'
    ],
    output: {
        library: 'immutable-schema',
        filename: path.join(__dirname, './dist/immutable-js-schema.js'),
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
