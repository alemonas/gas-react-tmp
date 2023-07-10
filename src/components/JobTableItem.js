import { useState } from 'react';
import { beonPlatformUrl } from '../config';
import { copyToClipboard, handleCopyGenericLink } from '../utils/copyClipboard';
import { numberToUSDCurrencyFormat } from '../utils/currency';
import { getEncodedUserEmail } from '../utils/user';
import { REFERRAL_CODE_URL_PARAM_NAME } from '../constants';

function JobTableItem({ job = {}, userEmail = '' }) {
    const [copyLinkSuceess, setCopyLinkSuccess] = useState(false);

    const handleCopyGenericLink = (text) => {
        try {
            copyToClipboard(text);
            setCopyLinkSuccess(true);
            setTimeout(() => {
                setCopyLinkSuccess(false);
            }, 2000); // Display "Copied" message for 2 seconds
        } catch (e) {
            console.error(e);
        }
    };

    const publicJobBaseUrl = beonPlatformUrl + '/jobs/' + job.uuid;
    const referralCodeParam = '?' + REFERRAL_CODE_URL_PARAM_NAME + '=' + getEncodedUserEmail(userEmail);
    const publicJobUrl = publicJobBaseUrl + referralCodeParam;
    const linkedinHrefLink = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(publicJobUrl);

    return (
        <tr key={job.id}>
            <td>{job.title}</td>
            <td>
                <div className="jobs-table__referral-link">
                    <a className="jobs-table__link" href={publicJobUrl} target="_blank">
                        Job Link
                    </a>
                    <button className="jobs-table__copy-button" onClick={() => handleCopyGenericLink(publicJobUrl)}>
                        {copyLinkSuceess ? (
                            <img
                                src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/check-circle-blue-25.png"
                                width={20}
                                height={20}
                            />
                        ) : (
                            <img
                                src="https://cdn3.iconfinder.com/data/icons/user-interface-774/32/28-Copy-24.png"
                                width={20}
                                height={20}
                            />
                        )}
                    </button>
                </div>
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
}

export default JobTableItem;
