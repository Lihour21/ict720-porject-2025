import React, { useState, useEffect } from "react";
import axios from "axios";


const FetchRawData = ({url}) => {
    const API_URL = {url}; 
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(API_URL); // Use fetch(API_URL).then(res => res.json()) if preferred
            setData(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
        <h2>Raw JSON Data</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default FetchRawData;