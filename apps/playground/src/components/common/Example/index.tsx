import { useQuery } from '@tanstack/react-query';

import { createHttpClient } from '@/api/httpClient';

export const API_PATH = 'https://dog.ceo/api/breeds/image/random';
const dogClient = createHttpClient({ baseUrl: new URL(API_PATH).origin, credentials: 'omit' });

const Example = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getDog'],
    queryFn: () => dogClient.request<{ message: string }>(API_PATH),
  });
  if (isLoading) {
    return <p>loading...</p>;
  }
  return <>{data && <img src={data.message} alt='dog' />}</>;
};

export default Example;
