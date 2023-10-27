import { memo, useState, useCallback } from 'react';
import PromoVideo from '../components/Promo-video';
import PageLayout from '../components/PageLayout';
import PromoContent from '../components/PromoContent';

function PromoZone() {

  const [playing, setPlaying] = useState<boolean>(true);
  const [isActivePromo, setIsActivePromo] = useState<boolean>(false);

  const onPromo = useCallback(() => {
    setPlaying(false);
    setIsActivePromo(true);
  }, []);

  const onExitPromo = useCallback(() => {
    setPlaying(true);
    setIsActivePromo(false);
  }, []);

  return (
    <PageLayout>
      <PromoVideo onPromo={() => onPromo()} playing={playing}/>
      {
        isActivePromo &&
          <PromoContent onExit={() => onExitPromo()}/>
      }
    </PageLayout>
  )
}

export default memo(PromoZone);