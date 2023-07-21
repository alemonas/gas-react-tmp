import { engineerVerificationStatus } from '../utils/engineer';
import { Alert } from './Lib';

function ReferredApplicantsTable({ applicants = [] }) {
    if (applicants.length === 0) {
        return <Alert variant="secondary">(No Referred Applicants were found...)</Alert>;
    }

    return (
        <div className="applicants-table-container">
            <table className="applicants-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Verification Status</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants.map((applicant) => {
                        return (
                            <tr key={applicant.id}>
                                <td>
                                    {applicant.firstName} {applicant.lastName}
                                </td>
                                <td>{engineerVerificationStatus[applicant.verificationStatus]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ReferredApplicantsTable;
