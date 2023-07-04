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

    const linkedinHrefLink =
        'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(genericReferralCodeLink);

    return (
        <div className="generic-invite">
            <div className="generic-invite__header">
                <h2 className="generic-invite__header__title">Generic Referral Link</h2>
                <div className="generic-invite__share-actions">
                    <a
                        className="generic-invite__share-actions__linkedin__link"
                        href={linkedinHrefLink}
                        target="_blank"
                    >
                        <span>Share on </span>
                        <img
                            className="generic-invite__share-actions__linkedin__link__img"
                            alt="linkedin"
                            src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-512.png"
                            width={24}
                            height={24}
                        />
                    </a>
                </div>
            </div>
            <div className="generic-invite__referral-link">
                <span className="generic-invite__link-text">{genericReferralCodeLink}</span>
                <button className="generic-invite__button" onClick={handleCopyGenericLink}>
                    {copyLinkSuceess ? '(Copied)' : 'Copy Referral link'}
                </button>
            </div>
        </div>
    );
}

export default GenericReferralInvite;
