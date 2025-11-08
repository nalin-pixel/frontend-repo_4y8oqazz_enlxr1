import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function TopBar({ theme, setTheme, lang, setLang, t }) {
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/75 dark:bg-neutral-900/75 border-b border-neutral-200/60 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 shadow-inner" />
          <div className="flex flex-col">
            <span className="font-semibold text-neutral-900 dark:text-white leading-none">HanzTravel</span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">{t('tagline')}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
            aria-label={t('toggleTheme')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span className="text-sm hidden sm:inline">{theme === 'dark' ? t('light') : t('dark')}</span>
          </button>
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800" />
          <div className="flex items-center" role="group" aria-label={t('language')}>
            <button
              onClick={() => setLang('IN')}
              className={`px-3 py-2 rounded-l-md border border-neutral-200 dark:border-neutral-800 ${
                lang === 'IN' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200'
              }`}
            >
              IN
            </button>
            <button
              onClick={() => setLang('EN')}
              className={`px-3 py-2 rounded-r-md border border-neutral-200 dark:border-neutral-800 border-l-0 ${
                lang === 'EN' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
