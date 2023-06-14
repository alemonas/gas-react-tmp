import { useEffect } from 'react';
import { BEONER_AUTH_USER_EMAIL_KEY } from './constants';
import useLocalStorageState from './hooks/useLocalStorageState';
import useAsync from './hooks/useAsync';
import { client } from './utils/api-client';
import { getEmailLocalPart } from './utils/string';

export function App() {
    const { data: jobs, isIdle, isPending, error, run } = useAsync();
    const [userAuthEmail] = useLocalStorageState(BEONER_AUTH_USER_EMAIL_KEY);

    useEffect(() => {
        run(client('jobs'));
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
            <ul>
                {jobs.data.map((job) => {
                    const basePlatformUrl = 'https://platform.beon.tech/engineers/job-description?jobId';

                    const link = `${basePlatformUrl}=${job.id}?referral=${getEmailLocalPart(userAuthEmail)}`;
                    return (
                        <li key={job.id}>
                            <span>{job.title} </span>
                            <a href={link} target="_blank">
                                (Job link)
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
