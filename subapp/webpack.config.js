const ManifestPlugin = require('webpack-manifest-plugin')
const path = require("path")

module.exports = {
  context: path.join(__dirname, "src"),
  entry: {
    subApp: './index.js'
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
    library: 'SubApp',
    libraryTarget: "commonjs"
  },
  resolve: {
    // These could even be exported by the component library (see the README)
    alias: {
      react: path.resolve(__dirname, 'src/shims/react.js'),
      'react-dom': path.resolve(__dirname, 'src/shims/react-dom.js'),
      'styled-components': path.resolve(__dirname, 'src/shims/styled-components.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
}
