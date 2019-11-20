import React, { Component } from 'react'
import { Loading } from '@intouchhealth/components/messages/loading'

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
            // Timeout added for demonstration purposes to fake latency in the fetch
            setTimeout(() => {
              this.setState({
                Component: getComponent(module)
              })
            }, 500)
          })
      }
    }

    render() {
      const { Component } = this.state

      if (Component) {
        return <Component {...this.props} />
      }

      return <Loading />
    }
  }

  return AsyncComponent
}

export { ExternalAsyncComponent }
