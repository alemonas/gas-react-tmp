import useLocalStorageState from '../hooks/useLocalStorageState';
import { BEONER_USER_EMAIL_LOCAL_STORAGE_KEY, REFERRAL_CODE_URL_PARAM_NAME } from '../constants';
import { getEncodedUserEmail } from '../utils/user';

function JobsTable({ jobs = [] }) {
    const [userAuthEmail] = useLocalStorageState(BEONER_USER_EMAIL_LOCAL_STORAGE_KEY);

    if (jobs.length === 0) {
        return <div>No Referral Jobs were Found</div>;
    }

    const getJobUrl = (job = {}) => {
        // NOTE: Not using `template literals` here since is causing issues in Google Scripts.
        // const basePlatformUrl = 'https://platform.dev.beon.tech/engineers/job-description';
        const basePlatformUrl = 'http://localhost:3000/engineers/job-description';
        const jobIdParam = '?jobId=' + job.id;
        const referralCodeParam = '&' + REFERRAL_CODE_URL_PARAM_NAME + '=' + getEncodedUserEmail(userAuthEmail);

        return basePlatformUrl + jobIdParam + referralCodeParam;
    };

    return (
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
                    return (
                        <tr key={job.id}>
                            <td>{job.title}</td>
                            <td>
                                <a className="jobs-table__link" href={getJobUrl(job)} target="_blank">
                                    Copy Job Link
                                </a>
                            </td>
                            <td>share</td>
                            <td>{job.referralBonus + ' $us' || 'not defined'} </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default JobsTable;
