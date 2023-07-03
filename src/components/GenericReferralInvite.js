import { useState } from 'react';
import { beonPlatformUrl } from '../config';
import { BEONER_USER_EMAIL_LOCAL_STORAGE_KEY, REFERRAL_CODE_URL_PARAM_NAME } from '../constants';
import useLocalStorageState from '../hooks/useLocalStorageState';
import { copyToClipboard } from '../utils/copyClipboard';
import { getEncodedUserEmail } from '../utils/user';

function GenericReferralInvite() {
    const [userAuthEmail] = useLocalStorageState(BEONER_USER_EMAIL_LOCAL_STORAGE_KEY);
    const [copyLinkSuceess, setCopyLinkSuccess] = useState(false);

    const referralCodeParam = '?' + REFERRAL_CODE_URL_PARAM_NAME + '=' + getEncodedUserEmail(userAuthEmail);
    const genericReferralCodeLink = beonPlatformUrl + '/engineers/onboarding' + referralCodeParam;

    const handleCopyGenericLink = () => {
        try {
            copyToClipboard(genericReferralCodeLink);
            setCopyLinkSuccess(true);
            setTimeout(() => {
                setCopyLinkSuccess(false);
            }, 2000); // Display "Copied" message for 2 seconds
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div className="generic-invite">
            <span className="generic-invite__link-text">{genericReferralCodeLink}</span>
            <button className="generic-invite__button" onClick={handleCopyGenericLink}>
                {copyLinkSuceess ? '(Copied)' : 'Copy Referral link'}
            </button>
        </div>
    );
}

export default GenericReferralInvite;
