import dynamic from 'next/dynamic';

const AccountManager = dynamic(() => import('../../components/AccountManager'), {
    ssr: false,
});

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Polkadot Account Manager</h1>
            <AccountManager />
        </main>
    );
}