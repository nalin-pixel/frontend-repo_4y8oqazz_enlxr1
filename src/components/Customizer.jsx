import { Plane, Building2, Crown } from 'lucide-react';

const airlines = [
  { id: 'hanz', name: 'HanzTravel', livery: 'from-sky-500 to-indigo-600', crew: 'Friendly crew, premium service', logo: 'HT' },
  { id: 'garuda', name: 'Garuda Indonesia', livery: 'from-cyan-500 to-blue-600', crew: 'Warm Indonesian hospitality', logo: 'GA' },
  { id: 'qatar', name: 'Qatar Airways', livery: 'from-rose-500 to-fuchsia-600', crew: 'Award-winning luxury', logo: 'QR' },
];

export default function Customizer({ value, onChange, t }) {
  return (
    <section className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="px-4 sm:px-6 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
        <Plane size={18} className="text-sky-600" />
        <h3 className="font-semibold text-neutral-900 dark:text-white">{t('customizeTitle')}</h3>
      </div>
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {airlines.map((a) => (
          <button
            key={a.id}
            onClick={() => onChange(a)}
            className={`group relative p-4 rounded-lg border transition text-left ${
              value?.id === a.id
                ? 'border-neutral-900 dark:border-white ring-2 ring-neutral-900/10 dark:ring-white/10'
                : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
            }`}
          >
            <div className={`h-8 w-8 rounded-md bg-gradient-to-br ${a.livery} text-white flex items-center justify-center font-semibold`}>{a.logo}</div>
            <div className="mt-2 font-medium text-neutral-900 dark:text-white">{a.name}</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-300 flex items-center gap-1">
              <Building2 size={14} /> {t('crew')}: {a.crew}
            </div>
            {a.id === 'qatar' && (
              <div className="absolute top-3 right-3 text-amber-500" title="Premium">
                <Crown size={16} />
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
