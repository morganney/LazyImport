import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom'
import * as ReactRedux from 'react-redux'
import * as Redux from 'redux'

import { asyncComponent } from './asyncComponent.jsx';

global.React = React
global.ReactDOM = ReactDOM
global.ReactRedux = ReactRedux
global.Redux = Redux

const LazyComponent = asyncComponent({
    prefix: 'pr2/dist',
    loadManifest: () =>
        fetch('pr2/dist/manifest.json').then(resp => resp.json())
});

const Hello = () => {
    const [showLazyComponent, setShowStatus] = useState(false);

    const showComponent = useCallback(() => setShowStatus(true), [setShowStatus]);

    return (
        <div>
            <h1>Hello main App</h1>
            <button onClick={showComponent}>Show component</button>
            {showLazyComponent && <LazyComponent/>}
        </div>)
}

ReactDOM.render(<Hello/>, document.getElementById('app'));
