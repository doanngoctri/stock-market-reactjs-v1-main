import React, { useState } from 'react';
import Loading from '../Loading';
function HookLoading() {
    const [isVisible, setIsVisible] = useState(false);

    return (
        [isVisible ? <Loading /> : false, () => setIsVisible(false), () => setIsVisible(true)]
    );
}

export default HookLoading;