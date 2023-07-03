import { useEffect } from 'react';
import useAsync from '../hooks/useAsync';
import { client } from '../utils/apiClient';
import JobsTable from './JobsTable';
import { Alert, Spinner } from './Lib';

function Jobs() {
    const { data: jobs, isIdle, isPending, error, run } = useAsync();

    useEffect(() => {
        run(client('jobs?isReferralBonusActive=true&showHidden=true&status=published'));
    }, [run]);

    if (isIdle || isPending) {
        return <Spinner />;
    }

    if (error) {
        return <Alert>There was an error... please try again later</Alert>;
    }

    return <JobsTable jobs={jobs.data} />;
}

export default Jobs;
