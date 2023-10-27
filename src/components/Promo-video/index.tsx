import { memo, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import qr from '@/assets/img/promo/qr.jpg';
import './styles.scss';

type PromoVideoProps = {
  playing: boolean | undefined;
  onPromo: () => void;
}

function PromoVideo({playing, onPromo}: PromoVideoProps) {

  const [isActiveBanner, setIsActiveBanner] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsActiveBanner(true);
    }, 5000);
  }, []);

  return (
    <div className='PromoVideo'>
      <ReactPlayer width="1280px" height="720px" url="https://www.youtube.com/watch?v=M7FIvfx5J10" muted={true} playing={playing}/>
      {
        isActiveBanner &&
          <div className='Banner'>
            <h2 className='Banner-title'>ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША <br /> ПОДАРИТЕ ЕМУ СОБАКУ!</h2>
            <img src={qr} className='Banner-qr'/>
            <p className='Banner-text'>Сканируйте QR-код или нажмите ОК</p>
            <button onClick={() => onPromo()} className='Banner-btn'>ОК</button>
          </div>
      }
    </div>
  )
}

export default memo(PromoVideo);