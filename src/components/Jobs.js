import { useEffect } from 'react';
import useAsync from '../hooks/useAsync';
import { client } from '../utils/api-client';
import JobsTable from './JobsTable';

function Jobs() {
    const { data: jobs, isIdle, isPending, error, run } = useAsync();

    useEffect(() => {
        run(client('jobs?isReferralBonusActive=true&showHidden=true&status=published'));
    }, [run]);

    if (isIdle || isPending) {
        return (
            <div className="message">
                <span className="message-loading">loading...</span>
            </div>
        );
    }

    if (error) {
        return <div>Referral Job Link error... please try again later</div>;
    }

    return (
        <div>
            <JobsTable jobs={jobs.data} />
        </div>
    );
}

export default Jobs;
