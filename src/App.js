import GenericReferralInvite from './components/GenericReferralInvite';
import Jobs from './components/Jobs';
import ReferredApplicants from './components/ReferredApplicants';

export function App() {
    return (
        <main className="main">
            <Jobs />
            <GenericReferralInvite />
            <ReferredApplicants />
        </main>
    );
}
