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
    /**
     * Without this you get invariant violations.
     * With this webpack adds require statmenents not converted by es6-to-js.
     * If you shim the require method you get createContext errors.
     */
    externals: {
      react: { root: 'React', commonjs: 'react' }
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
