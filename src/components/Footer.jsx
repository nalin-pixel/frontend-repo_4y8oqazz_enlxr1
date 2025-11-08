export default function Footer({ t }) {
  return (
    <footer className="mt-10 py-8 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-600 dark:text-neutral-300">
      <div>© 2025 HanzTravel — {t('footerSlogan')}</div>
      <div className="text-xs text-neutral-500 dark:text-neutral-400">{t('crafted')}</div>
    </footer>
  );
}
