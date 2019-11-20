import React, { Component } from 'react'

const ExternalAsyncComponent = ({
  baseUrl,
  getBundleUrl,
  getComponent
}) => {
  class AsyncComponent extends Component {
    state = { Component: null }

    componentDidMount() {
      if (!this.state.Component) {
        fetch(`${baseUrl}/manifest.json`)
          .then(res => res.json())
          .then(manifest => {
            const bundleUrl = `${baseUrl}${getBundleUrl(manifest)}`

            return import(/* webpackIgnore: true */ bundleUrl)
          })
          .then(module => {
            this.setState({
              Component: getComponent(module)
            })
          })
      }
    }

    render() {
      const { Component } = this.state

      if (Component) {
        return <Component {...this.props} />
      }

      return <p>Loading...</p>
    }
  }

  return AsyncComponent
}

export { ExternalAsyncComponent }
