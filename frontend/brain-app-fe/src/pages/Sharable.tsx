import { Main } from '../components/Main';
import { useRecoilState } from 'recoil';
import { DataAtom } from '../stores/atom/Dataatom';
import { useEffect } from 'react';
import { useFetchShareable } from '../utils/ShareFetcher';
import { LinkAtom } from '../stores/atom/LinkAtom';

export function Sharble() {
    const [link,setLink]=useRecoilState(LinkAtom)
  const { fetchShareable } = useFetchShareable();
  const [data, setData] = useRecoilState(DataAtom);

  useEffect(() => {
    fetchShareable();
  }, []);

  return (
    <div>
      <Main data={data} readonly={true} />
    </div>
  );
}
