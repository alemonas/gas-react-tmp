import useLocalStorageState from '../hooks/useLocalStorageState';
import { BEONER_USER_EMAIL_LOCAL_STORAGE_KEY, REFERRAL_CODE_URL_PARAM_NAME } from '../constants';
import { getEncodedUserEmail } from '../utils/user';
import { Alert } from './Lib';
import { beonPlatformUrl } from '../config';
import { numberToUSDCurrencyFormat } from '../utils/currency';

function JobsTable({ jobs = [] }) {
    const [userAuthEmail] = useLocalStorageState(BEONER_USER_EMAIL_LOCAL_STORAGE_KEY);

    if (jobs.length === 0) {
        return <Alert variant="secondary">(No referral jobs were found...)</Alert>;
    }

    const getPublicJobUrl = (job = {}) => {
        const publicJobBaseUrl = beonPlatformUrl + '/jobs/' + job.uuid;
        const referralCodeParam = '?' + REFERRAL_CODE_URL_PARAM_NAME + '=' + getEncodedUserEmail(userAuthEmail);

        return publicJobBaseUrl + referralCodeParam;
    };

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
                        const stagingBeonPlatformUrl = 'https://platform.dev.beon.tech';
                        const publicJobUrl = getPublicJobUrl(job);
                        const linkedinHrefLink =
                            'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(publicJobUrl);
                        return (
                            <tr key={job.id}>
                                <td>{job.title}</td>
                                <td>
                                    <a className="jobs-table__link" href={publicJobUrl} target="_blank">
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
                                <td>{'USD ' + numberToUSDCurrencyFormat(job.referralBonus) || 'not defined'} </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default JobsTable;
