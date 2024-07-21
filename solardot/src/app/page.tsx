import dynamic from 'next/dynamic';
import RegionSelector from '../../components/RegionSelector';
import 'leaflet/dist/leaflet.css';

const AccountManager = dynamic(() => import('../../components/AccountManager'), {
    ssr: false,
});

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Polkadot SolarDot</h1>
            <RegionSelector />
            <AccountManager />
        </main>
    );
}