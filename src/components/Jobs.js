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
        return (
            <div className="jobs__error">
                <Alert variant="danger">There was an error getting the Referral Jobs... please try again later</Alert>
            </div>
        );
    }

    return (
        <div className="jobs">
            <h2 className="jobs__title">Referral links by Open Role</h2>
            <JobsTable jobs={jobs.data} />
        </div>
    );
}

export default Jobs;
