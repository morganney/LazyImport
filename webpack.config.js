const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    context: path.join(__dirname),
    entry: ['./polyfills/import.js', './src/index.jsx'],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name]-[hash].js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ["babel-loader"],
            },
        ]
    },
    devServer: {
       historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
};
