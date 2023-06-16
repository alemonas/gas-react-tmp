import { getEncodedUserEmail } from '../utils/string';
import useLocalStorageState from '../hooks/useLocalStorageState';
import { BEONER_AUTH_USER_EMAIL_KEY } from '../constants';

function JobList({ jobs = [] }) {
    const [userAuthEmail] = useLocalStorageState(BEONER_AUTH_USER_EMAIL_KEY);

    if (jobs.length === 0) {
        return <div>No Referral Jobs were Found</div>;
    }

    return (
        <table>
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
                    const basePlatformUrl = 'https://platform.beon.tech/engineers/job-description?jobId';
                    // const link = `${basePlatformUrl}=${job.id}&referral=${getEncodedUserEmail(userAuthEmail)}`;
                    const link = 'link';

                    return (
                        <tr key={job.id}>
                            <td>{job.title}</td>
                            <td>
                                <a href={link} target="_blank">
                                    Referral Job Link
                                </a>
                            </td>
                            <td>share</td>
                            <td>{job.referralBonus}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default JobList;
