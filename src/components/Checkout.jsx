import { useState } from 'react';
import { CreditCard, Send } from 'lucide-react';

export default function Checkout({ selection, route, t }) {
  const [mode, setMode] = useState('book'); // 'book' | 'request'

  const total = 1200; // demo pricing

  return (
    <section className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="px-4 sm:px-6 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard size={18} className="text-emerald-600" />
          <h3 className="font-semibold text-neutral-900 dark:text-white">{t('checkoutTitle')}</h3>
        </div>
        <div className="flex rounded-md overflow-hidden border border-neutral-200 dark:border-neutral-800">
          <button onClick={() => setMode('book')} className={`px-3 py-1.5 text-sm ${mode==='book' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : ''}`}>{t('bookNow')}</button>
          <button onClick={() => setMode('request')} className={`px-3 py-1.5 text-sm border-l border-neutral-200 dark:border-neutral-800 ${mode==='request' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : ''}`}>{t('requestFlight')}</button>
        </div>
      </div>
      <div className="p-4 sm:p-6 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
        <div>{t('selectedAircraft')}: <span className="font-medium text-neutral-900 dark:text-white">{selection?.name || selection?.id || 'A380'}</span></div>
        <div>{t('route')}: <span className="font-medium text-neutral-900 dark:text-white">{route.from} → {route.to}</span></div>
        <div>{t('airline')}: <span className="font-medium text-neutral-900 dark:text-white">{selection?.name || 'HanzTravel'}</span></div>
        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="text-base">{t('total')}: <span className="font-semibold">${total.toLocaleString()}</span></div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition">
            {mode === 'book' ? <CreditCard size={18} /> : <Send size={18} />} {mode === 'book' ? t('pay') : t('sendRequest')}
          </button>
        </div>
      </div>
    </section>
  );
}
