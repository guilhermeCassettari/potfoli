// 'use client';
import { useGlobalContext } from '@/context/GlobalContext';
import { ISetHomePage } from '../../../backend/src/modules/pages/interface/ISetHomePage';
import { IHomePage } from '../../../backend/src/modules/pages/interface/IHomePage';
import { useState } from 'react';

// export function useApi() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const getHomeDataa = async (): Promise<IHomePage> => {
//     const data = await fetch('http://localhost:3002/pages/home', {
//       cache: 'no-store', // Isso desabilita o cache
//     });

//     const json = await data.json();
//     const { srcImage, impact_phrase, social_medias } = json;

//     const parsedData = social_medias.map((element: string) => {
//       const parsedMedias = JSON.parse(element);

//       return parsedMedias;
//     });

//     // console.log(typeof parsedData);
//     return { srcImage, impact_phrase, social_medias: parsedData };
//   };

//   return { getHomeDataa };
// }

export async function getHomeData(): Promise<IHomePage> {
  const data = await fetch('http://localhost:3002/pages/home', {
    cache: 'no-store', // Isso desabilita o cache
  });

  const json = await data.json();
  const { srcImage, impact_phrase, social_medias } = json;

  const parsedData = social_medias.map((element: string) => {
    const parsedMedias = JSON.parse(element);

    return parsedMedias;
  });

  // console.log(typeof parsedData);
  return { srcImage, impact_phrase, social_medias: parsedData };
}

export function api() {
  const { userToken } = useGlobalContext();
  const setHome = async (file: File, data: ISetHomePage) => {
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('data', JSON.stringify(data));
    console.log(formData.get('data'));
    const { impact_phrase, social_medias } = data.page;
    formData.append('data', JSON.stringify({ impact_phrase, social_medias }));

    const fetchData = await fetch('http://localhost:3002/pages/home', {
      method: 'POST',
      cache: 'no-store', // Isso desabilita o cache
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      body: formData,
    });

    return fetchData;
  };

  return { setHome };
}
// export async function setHomePage(file: File, data: ISetHomePage) {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('data', JSON.stringify(data));

//   const { userToken } = useGlobalContext();
//   const fetchData = await fetch('http://localhost:3002/pages/home', {
//     method: 'POST',
//     cache: 'no-store', // Isso desabilita o cache
//     headers: {
//       'Content-Type': 'form-data',
//       Authorization: `Bearer ${userToken}`,
//     },
//     body: formData,
//   });

//   return fetchData;
// }
