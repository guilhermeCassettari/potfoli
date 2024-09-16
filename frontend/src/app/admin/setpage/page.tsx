'use client';
import { useGlobalContext } from '@/context/GlobalContext';
import { homeData } from '@/http/home';
import { useLogin } from '@/http/useLogin';
import { useEffect, useState } from 'react';
import { IHomePage } from '../../../../../backend/src/modules/pages/interface/IHomePage';
// import { ISetHomePage } from '../../../../../backend/src/modules/pages/interface/ISetHomePage.ts'

interface IParam {
  name: string;
  url: string;
}

export default function SetPage() {
  const { userToken } = useGlobalContext();
  const { isAuthenticated } = useLogin();
  const { impact_phrase, srcImage, social_medias } = homeData();
  const [page, setPage] = useState<IHomePage>({
    impact_phrase,
    srcImage,
    social_medias,
  });

  useEffect(() => {
    isAuthenticated();

    const fetcHomeData = async () => {
      const data = await homeData();

      setPage(data);
    }
    fetcHomeData()
  }, []);

  if (!isAuthenticated) {
    return <div>Not teste</div>;
  }

  //  Começar com os dados do getHomepage


  // const handleAddParam = () => {
  //   setParams([...params, '']);
  // }

    // const handleInputChange = (index, field, value) => {
    // setParams(
    //   params.map((param, i) => {
    //     if (i === index) {
    //       return { ...param, [field]: value };
    //     }
    //     return param;
    //   })
    // );
  // };

  return <form>
    <input type="file" />
    <input type="submit" />
  </form>;
}

