import { useEffect } from 'react';
import useAsync from '../hooks/useAsync';
import { client } from '../utils/api-client';
import JobsList from './JobsList';

function Jobs() {
    const { data: jobs, isIdle, isPending, error, run } = useAsync();

    useEffect(() => {
        run(client('jobs?isReferral=true'));
    }, [run]);

    if (isIdle || isPending) {
        return <div>loading...</div>;
    }

    if (error) {
        return <div>Referral Job Link error... please try again later</div>;
    }

    return (
        <div>
            <h2>jobs</h2>
            <JobsList jobs={jobs.data} />
        </div>
    );
}

export default Jobs;
