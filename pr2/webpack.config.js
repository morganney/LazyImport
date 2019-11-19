const ManifestPlugin = require('webpack-manifest-plugin');
const path = require("path");

module.exports = {
    context: path.join(__dirname, "src"),
    entry: {
        subApp: './index.js'
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "/",
        library: 'SubApp',
        libraryTarget: "commonjs"
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: ["babel-loader"],
            },
        ]
    },
    plugins: [
        new ManifestPlugin({
            seed: {
                componentName: 'SubApp'
            }
        })
    ]
};
