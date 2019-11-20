## Setup
You need to [authenticate with GitHub Registry](https://help.github.com/en/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages)

## Notes
* The container app needs to have at least redux in node_modules to properly build with react-redux, but the sub-app's can
still `import` from redux, i.e. not use it as a global. However, I'm not sure this is any better since the container still
requires it as a dependency (might as well have the sub-app reference it as a global too).
* What about bookmarking, i.e. deep links into the sub-app's? We need to be able to allow bookmarks into sub-app's.
