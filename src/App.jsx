import { useMemo, useState } from 'react';
import TopBar from './components/TopBar';
import Aircraft3D from './components/Aircraft3D';
import RouteVisualizer from './components/RouteVisualizer';
import Customizer from './components/Customizer';
import Checkout from './components/Checkout';
import Footer from './components/Footer';

const translations = {
  EN: {
    tagline: 'Visit the Whole World',
    toggleTheme: 'Toggle theme',
    language: 'Language',
    dark: 'Dark',
    light: 'Light',
    viewerTitle: '3D Aircraft Viewer',
    viewerHint: 'Drag to rotate, scroll to zoom. Interact with the model.',
    routeTitle: 'Route Visualizer',
    routeHint: 'Animated flight path with ETA and simple weather.',
    eta: 'ETA',
    weather: 'Weather',
    weatherClear: 'Clear',
    customizeTitle: 'Airline / Operator',
    crew: 'Crew',
    checkoutTitle: 'Order & Payment',
    bookNow: 'Book now',
    requestFlight: 'Request flight',
    selectedAircraft: 'Selected Aircraft',
    route: 'Route',
    airline: 'Airline',
    total: 'Total',
    pay: 'Pay',
    sendRequest: 'Send Request',
    footerSlogan: 'Visit the Whole World',
    crafted: 'Crafted with precision and passion',
  },
  IN: {
    tagline: 'Jelajahi Seluruh Dunia',
    toggleTheme: 'Ubah tema',
    language: 'Bahasa',
    dark: 'Gelap',
    light: 'Terang',
    viewerTitle: 'Penampil Pesawat 3D',
    viewerHint: 'Seret untuk memutar, gulir untuk zoom. Interaksi langsung.',
    routeTitle: 'Visualisasi Rute',
    routeHint: 'Jalur penerbangan animasi dengan ETA dan cuaca sederhana.',
    eta: 'Perkiraan Waktu',
    weather: 'Cuaca',
    weatherClear: 'Cerah',
    customizeTitle: 'Maskapai / Operator',
    crew: 'Kru',
    checkoutTitle: 'Pemesanan & Pembayaran',
    bookNow: 'Pesan sekarang',
    requestFlight: 'Minta penerbangan',
    selectedAircraft: 'Pesawat Dipilih',
    route: 'Rute',
    airline: 'Maskapai',
    total: 'Total',
    pay: 'Bayar',
    sendRequest: 'Kirim Permintaan',
    footerSlogan: 'Kunjungi Seluruh Dunia',
    crafted: 'Dibuat dengan presisi dan passion',
  },
};

export default function App() {
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('EN');
  const t = useMemo(() => (key) => translations[lang][key] || key, [lang]);

  const [aircraft, setAircraft] = useState('A380');
  const [route, setRoute] = useState({ from: 'Jakarta', to: 'Bali' });
  const [airline, setAirline] = useState(null);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <TopBar theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} t={t} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-3">
              <select
                value={aircraft}
                onChange={(e) => setAircraft(e.target.value)}
                className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100"
              >
                <option value="A380">Airbus A380</option>
                <option value="777X">Boeing 777X</option>
              </select>
              <div className="flex items-center gap-2">
                <label className="text-sm text-neutral-700 dark:text-neutral-300">{t('route')}:</label>
                <select
                  value={route.from}
                  onChange={(e) => setRoute((r) => ({ ...r, from: e.target.value }))}
                  className="px-2 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                >
                  <option>Jakarta</option>
                  <option>Surabaya</option>
                  <option>Medan</option>
                </select>
                <span className="text-neutral-500">→</span>
                <select
                  value={route.to}
                  onChange={(e) => setRoute((r) => ({ ...r, to: e.target.value }))}
                  className="px-2 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                >
                  <option>Bali</option>
                  <option>Singapore</option>
                  <option>Makassar</option>
                </select>
              </div>
            </div>
            <Aircraft3D selected={aircraft} t={t} />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <RouteVisualizer route={route} t={t} />
            <Customizer value={airline} onChange={setAirline} t={t} />
          </div>
        </section>

        <Checkout selection={airline} route={route} t={t} />
      </main>

      <Footer t={t} />
    </div>
  );
}
