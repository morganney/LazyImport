import React, { Component } from 'react';;

export function asyncComponent({prefix, loadManifest}) {
    class AsyncComponent extends Component {
        static Component = null;
        state = {Component: AsyncComponent.Component};

        componentDidMount() {
            if (!this.state.Component) {
                loadManifest().then(manifest => {
                    return import(/* webpackIgnore: true */`http://localhost:8080/${prefix}${manifest['subApp.js']}`)
                }).then(module => {
                    this.setState({
                        Component: module.SubApp.default
                    });
                });
            }
        }

        render() {
            const {Component} = this.state;

            if (Component) {
                return <Component {...this.props} />;
            }

            return null;
        }
    }

    return AsyncComponent;
}