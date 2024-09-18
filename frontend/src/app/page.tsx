import HomePage from '@/components/homepage';

import { getHomeData } from '@/http/api';
import Image from 'next/image';

export default async function Home() {
  const { srcImage, impact_phrase, social_medias } = await getHomeData();

  return (
    <main>
      <HomePage srcImage={srcImage} impact_phrase={impact_phrase} />
    </main>
  );
}
