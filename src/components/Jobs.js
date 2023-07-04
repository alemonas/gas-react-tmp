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

    return (
        <div className="jobs">
            <h2 className="jobs__title">Referral links by Job</h2>
            <JobsTable jobs={jobs.data} />;
        </div>
    );
}

export default Jobs;
