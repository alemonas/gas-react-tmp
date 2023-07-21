import { useEffect } from 'react';
import useAsync from '../hooks/useAsync';
import { client } from '../utils/apiClient';
import useLocalStorageState from '../hooks/useLocalStorageState';
import { BEONER_USER_EMAIL_LOCAL_STORAGE_KEY } from '../constants';
import { getEncodedUserEmail } from '../utils/user';
import { Alert, Spinner } from './Lib';
import ReferredApplicantsTable from './ReferredApplicantsTable';

function ReferredApplicants() {
    const [userAuthEmail] = useLocalStorageState(BEONER_USER_EMAIL_LOCAL_STORAGE_KEY);
    const { data: applicants, isIdle, isPending, error, run } = useAsync();

    useEffect(() => {
        const endpoint = 'engineers?referralCode=' + getEncodedUserEmail(userAuthEmail);
        run(client(endpoint));
    }, [run]);

    if (isIdle || isPending) {
        return <Spinner />;
    }

    if (error || !applicants?.data?.engineers) {
        return (
            <div>
                <Alert variant="danger">
                    There was an error getting the Referred Applicants... please try again later.
                </Alert>
            </div>
        );
    }

    return (
        <div className="applicants">
            <h2 className="applicants__title">Referred Applicants</h2>
            <ReferredApplicantsTable applicants={applicants.data.engineers} />
        </div>
    );
}

export default ReferredApplicants;
