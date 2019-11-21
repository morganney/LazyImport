import React, { Component } from 'react'
import { Loading } from '@intouchhealth/components/messages/loading'

const ExternalAsyncComponent = ({
  baseUrl,
  getBundleUrl,
  getComponent
}) => {
  class AsyncComponent extends Component {
    state = { Component: null }

    /**
     * Will fetch a new manifest after browser session ends (tab closes, or new one opened)
     * or after one hour, whichever comes first.
     */
    componentDidMount() {
      const oneHour = 3.6e6
      const manifest = JSON.parse(sessionStorage.getItem(baseUrl))
      const updateComponent = module => {
        this.setState({
          Component: getComponent(module)
        })
      }

      if (!manifest || manifest.set <= Date.now() - oneHour) {
        fetch(`${baseUrl}/manifest.json`)
          .then(res => res.json())
          .then(manifest => {
            const bundleUrl = `${baseUrl}${getBundleUrl(manifest)}`

            sessionStorage.setItem(baseUrl, JSON.stringify({ ...manifest, set: Date.now() }))

            return import(/* webpackIgnore: true */ bundleUrl)
          })
          .then(module => {
            // Timeout added for demonstration purposes to fake latency in the fetch
            setTimeout(() => {
              updateComponent(module)
            }, 500)
          })
      } else {
        import(/* webpackIgnore: true */ `${baseUrl}${getBundleUrl(manifest)}`).then(updateComponent)
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
