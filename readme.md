## Setup
You need to [authenticate with GitHub Registry](https://help.github.com/en/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages)

1. `cd subapp`
2. `npm install`
3. `npm run build`
4. `cd ../otherSubapp`
5. `npm install`
6. `npm run build`
7. `cd ..` (back to root of repo)
8. `npm install`
9. `npm run start`
10. Navigate to http://localhost:8080

## Notes
* The container app needs to have at least redux in node_modules to properly build with react-redux, but the sub-app's can
still `import` from redux, i.e. not use it as a global. However, I'm not sure this is any better since the container still
requires it as a dependency (might as well have the sub-app reference it as a global too).
* What about bookmarking, i.e. deep links into the sub-app's? We need to be able to allow bookmarks into sub-app's.
* Might need to use localStorage, or redux store to determine whether async components (sub-apps) are loaded. Anytime you
leave a route managed by the sub-app, it will unmount the async component and then re-fetch the import when going back.
* To have the shared components work we need to shim their react-based dependencies in sub-apps if we want it to be a
standalone package useful outside of the container app (projects outside of IWA). It can even potentially export those shims
(or maybe even an alias webpack config) so a webpack build for a sub-app can alias them like:
  ```
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/@intouchhealth/components/shims/react.js'),
      'react-dom': path.resolve(__dirname, 'node_modules/@intouchhealth/components/shims/react-dom.js'),
      'styled-components': path.resolve(__dirname, 'node_modules/@intouchhealth/components/shims/styled-components.js')
    }
  }
  ```
