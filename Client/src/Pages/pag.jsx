// PageOne.js
import React, { useEffect } from 'react';

function PageOne({ setLoading }) {
    useEffect(() => {
        setLoading(true); // Set loading state to true before fetching data

        // Simulate fetching data
        setTimeout(() => {
            setLoading(false); // Set loading state to false after data is fetched
        }, 2000); // Simulated delay of 2 seconds
    }, [setLoading]);

    return <h1>Page One Content</h1>;
}

export default PageOne;
