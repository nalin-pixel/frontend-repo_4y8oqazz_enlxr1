import Spline from '@splinetool/react-spline';

const scenes = {
  // These demo scenes are public Spline URLs. Replace with richer aircraft models if available.
  A380: 'https://prod.spline.design/7u7jX1xw4W8mE5Q9/scene.splinecode',
  '777X': 'https://prod.spline.design/0bK0T0Q1q0m0kLQF/scene.splinecode',
};

export default function Aircraft3D({ selected, t }) {
  const sceneUrl = scenes[selected] || scenes.A380;
  return (
    <section className="relative w-full h-[540px] sm:h-[620px] lg:h-[700px] rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <Spline scene={sceneUrl} style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-neutral-900/80" />
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{t('viewerTitle')}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">{t('viewerHint')}</p>
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">{selected}</div>
      </div>
    </section>
  );
}
