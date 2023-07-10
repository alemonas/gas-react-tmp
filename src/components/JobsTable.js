import useLocalStorageState from '../hooks/useLocalStorageState';
import { BEONER_USER_EMAIL_LOCAL_STORAGE_KEY } from '../constants';
import { Alert } from './Lib';
import JobTableItem from './JobTableItem';

function JobsTable({ jobs = [] }) {
    const [userAuthEmail] = useLocalStorageState(BEONER_USER_EMAIL_LOCAL_STORAGE_KEY);

    if (jobs.length === 0) {
        return <Alert variant="secondary">(No referral jobs were found...)</Alert>;
    }

    return (
        <div className="jobs-table-container">
            <table className="jobs-table">
                <thead>
                    <tr>
                        <th>Job Description</th>
                        <th>Referral Link</th>
                        <th>Share Actions</th>
                        <th>Referral Bonus</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => {
                        return <JobTableItem key={job.id} job={job} userEmail={userAuthEmail} />;
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default JobsTable;
