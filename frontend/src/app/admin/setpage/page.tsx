'use client';
import { useGlobalContext } from '@/context/GlobalContext';
import { getHomeData } from '@/http/api';
import { useLogin } from '@/http/useLogin';
import { useEffect, useState } from 'react';
import { IHomePage } from '../../../../../backend/src/modules/pages/interface/IHomePage';
import Image from 'next/image';
import { IPage, ISetHomePage } from '../../../../../backend/src/modules/pages/interface/ISetHomePage';
import { useSetPage } from '@/http/useSetPage';
// import { ISetHomePage } from '../../../../../backend/src/modules/pages/interface/ISetHomePage.ts'

interface IParam {
  name: string;
  url: string;
}

export default function SetPage() {
  const { userToken } = useGlobalContext();
  // const { isAuthenticated } = useLogin();

  const { setHomePage } = useSetPage();

  const data = getHomeData();

  const [page, setPage] = useState<IHomePage>({
    impact_phrase: '',
    srcImage: '',
    social_medias: [],
  });

  const [file, setFile] = useState<File | null>(null);
  const [impact_phrase, setImpact_phrase] = useState('');



  useEffect(() => {
    // isAuthenticated();
    try {
      data.then((data) => {
        setPage({...data});
      });
    } catch (error) {
      console.log(error);
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const impact_phrase = formData.get('impact_phrase') as string;
    const file = formData.get('srcImage') as File;

    await setHomePage(file, { page :{
        impact_phrase,
        social_medias: [],
    }
    });

    const pageData = await getHomeData()

    setPage({ ...pageData });
  };



  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="impact_phrase">{page.impact_phrase}</label>
        <input type="text" name="impact_phrase" value={impact_phrase} onChange={(e) => setImpact_phrase(e.target.value)} />
      </div>
      <div>
        <label htmlFor="srcImage">srcImage:</label>
        {page.srcImage && <Image src={page.srcImage} alt="" width={200} height={200} />}
        <input
          type="file"
          name="srcImage"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

    <button type="submit" > Enviar </button>
    </form>
  );
}

