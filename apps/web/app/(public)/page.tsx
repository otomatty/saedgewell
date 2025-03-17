// パッケージ
import type { Metric } from '~/types/metrics';
import { getMetrics } from '~/actions/metric';
import dynamic from 'next/dynamic';
// 固有コンポーネント
import { Hero } from './_components/Hero';
import { Introduction } from './_components/Introduction';
import { Achievements } from './_components/achievements';
import { CTASection } from './_components/CTASection';
import { AdditionalAchievements } from './_components/AdditionalAchievements';
import { sampleWorks } from './_components/AdditionalAchievements/sample-data';
import { mockWorks } from './_components/achievements/mock-data';

const GearBackground = dynamic(
  () => import('@kit/ui/background').then((mod) => mod.GearBackground),
  { ssr: false }
);

export default async function HomePage() {
  const metrics: Metric[] = await getMetrics();

  return (
    <div className="min-h-screen">
      <GearBackground />
      <Hero />
      <Introduction metrics={metrics} />
      <Achievements works={mockWorks} />
      <AdditionalAchievements works={sampleWorks} />
      <CTASection />
    </div>
  );
}
