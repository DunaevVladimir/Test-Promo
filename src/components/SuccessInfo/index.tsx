import { memo } from 'react';
import './styles.scss';

function SuccessInfo() {

  return (
    <div className='SuccessInfo'>
      <h2 className='SuccessInfo-title'>ЗАЯВКА <br /> ПРИНЯТА</h2>
      <p className='SuccessInfo-text'>Держите телефон под рукой. <br />Скоро с Вами свяжется наш менеджер.</p>
    </div>
  )
}

export default memo(SuccessInfo);