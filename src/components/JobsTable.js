import useLocalStorageState from '../hooks/useLocalStorageState';
import { BEONER_USER_EMAIL_LOCAL_STORAGE_KEY, REFERRAL_CODE_URL_PARAM_NAME } from '../constants';
import { getEncodedUserEmail } from '../utils/user';

const beonPlatformUrl = process.env.BEON_PLATFORM_URL;

function JobsTable({ jobs = [] }) {
    const [userAuthEmail] = useLocalStorageState(BEONER_USER_EMAIL_LOCAL_STORAGE_KEY);

    if (jobs.length === 0) {
        return <Alert>No referral jobs were found</Alert>;
    }

    const getJobUrl = (job = {}) => {
        // NOTE: Not using `template literals` here since is causing issues in Google Scripts.
        const basePlatformUrl = beonPlatformUrl + '/engineers/job-description';
        // const basePlatformUrl = 'http://localhost:3000/engineers/job-description';
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
                    const stagingBeonPlatformUrl = 'https://platform.dev.beon.tech';
                    const publicJobUrl = stagingBeonPlatformUrl + '/jobs/' + job.uuid;
                    const linkedinHrefLink = `https://www.linkedin.com/sharing/share-offsite/?url=${publicJobUrl}`;
                    return (
                        <tr key={job.id}>
                            <td>{job.title}</td>
                            <td>
                                <a className="jobs-table__link" href={getJobUrl(job)} target="_blank">
                                    Open Job Link
                                </a>
                            </td>
                            <td>
                                <a href={linkedinHrefLink} target="_blank">
                                    <img
                                        alt="linkedin"
                                        src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-512.png"
                                        width={24}
                                        height={24}
                                    />
                                </a>
                            </td>
                            <td>{job.referralBonus + ' $us' || 'not defined'} </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default JobsTable;
