import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';

import { asyncComponent } from './asyncComponent.jsx';

global.React = React
global.require = () => {}

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

render(<Hello/>, document.getElementById('app'));
