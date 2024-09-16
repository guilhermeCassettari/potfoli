import { getHomeData } from '@/http/api';
import Image from 'next/image';

export default async function Home() {
  const { srcImage, impact_phrase, social_medias } = await getHomeData();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image src={srcImage} alt="Imagem" width={500} height={300} />
        <h1 className="text-3xl font-bold text-center sm:text-left">
          {impact_phrase}
        </h1>
      </main>
    </div>
  );
}
