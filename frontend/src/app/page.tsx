import HomePage from '@/components/homepage';
import TypingEffect from '@/components/typingEffect';

import { getHomeData } from '@/http/api';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const { srcImage, impact_phrase, social_medias } = await getHomeData();

  return (
    <main className="min-h-screen grid grid-cols-6 gap-5 auto-rows-max	">
      <header className="col-start-2 w-[288px] mt-14 mb-3 flex max-h-[4.5rem] ">
        <Image
          className=""
          src="/images/logo.svg"
          alt="Logo"
          width={63}
          height={71}
        />
        <TypingEffect
          delay={0}
          text={'<Guilherme\n Cassettari />'}
          containerCss="ml-[1.25rem]"
          textCss="text-2xl font-bold "
        />
      </header>
      <HomePage srcImage={srcImage} impact_phrase={impact_phrase} />
      <div className="col-start-1 col-end-2 flex flex-col justify-between items-center h-60 mb-11 absolute bottom-0 left-16">
        <Link href="https://github.com/guilhermeCassettari" target="_blank">
          <Image src="/images/github.svg" alt="Logo" width={44} height={44} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/guilherme-gasparotti-cassettari-2759a81b0/"
          target="_blank"
        >
          <Image src="/images/linkedin.svg" alt="Logo" width={44} height={44} />
        </Link>
        <Link href="https://whatsa.me/5514996742655/" target="_blank">
          <Image src="/images/whatsapp.svg" alt="Logo" width={44} height={44} />
        </Link>
      </div>
    </main>
  );
}
