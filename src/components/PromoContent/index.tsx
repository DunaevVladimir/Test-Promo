import { memo, useState } from 'react';
import qr from '@/assets/img/promo/qr.jpg';
import Form from '../Form';
import SuccessInfo from '../SuccessInfo';
import './styles.scss';

type PromoContentProps = {
  onExit: () => void;
}

function PromoContent({onExit}: PromoContentProps) {

  const [isSubmit, setIsSubmit] = useState(false);

  const changeIsSubmit = () => {
    setIsSubmit((prev: boolean) => !prev);
  }

  return (
    <div className='PromoContent'>
      <button tabIndex={16} onClick={() => onExit()} className='Close'></button>
      <div className='Info'>
        <p className='Info-text'>Сканируйте QR-код ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ</p>
        <img src={qr} className='Info-qr'/>
      </div>
      <div className='PromoContent-body'>
        {
          isSubmit 
            ? <SuccessInfo />
            : <Form onSubmit={() => changeIsSubmit()}/>
        }
      </div>
    </div>
  )
}

export default memo(PromoContent);