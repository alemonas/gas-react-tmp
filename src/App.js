import { useEffect, useState } from 'react';

export function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
            const resData = await res.json();
            console.log({ resData });
            setData(resData);
        };

        getData();
    }, []);

    console.log({ data });

    if (data.length === 0) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <h1>React + Google App Script Beon Referral Program!</h1>
            <span>{data.id}: </span>
            <span>{data.title}</span>
        </div>
    );
}
