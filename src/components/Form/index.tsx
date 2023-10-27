import { memo, useRef, useState, useEffect } from 'react';
import { makePhoneNumber } from '../../utils/makePhoneNumber';
import './styles.scss';

type FormProps = {
  onSubmit: () => void;
}

function Form({onSubmit}: FormProps) {

  const ref = useRef<HTMLInputElement>(null);
  const numbers = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const [phoneNumber, setPhoneNumber] = useState<string>(makePhoneNumber(''));
  const [isConsest, setIsConsest] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const validate = async (e: React.MouseEvent<HTMLElement>, number: string) => {
    e.preventDefault();
    // Заменить '${import.meta.env.VITE_SECRET}' на свой ключ
    const res = await fetch(`http://apilayer.net/api/validate?access_key=${import.meta.env.VITE_SECRET}&number=${number}`);
    let data = await res.json();
    if (data.valid) {
      onSubmit();
    } else {
      setError(true);
    }
  }

  const deleteLastNumber = () => {
    setError(false);
    setPhoneNumber((prev: string) => makePhoneNumber(prev.replace(/\D/g, '').slice(1, -1)));
  }

  const addNumbers = (numbers: string) => {
    setError(false);
    setPhoneNumber((prev: string) => makePhoneNumber((prev + numbers).replace(/\D()+/g, '').slice(1, 11)));
  }

  const changeConsest = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsConsest(!isConsest);
  }

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(makePhoneNumber(e.target.value.replace(/\D()+/g, '').slice(1, 11)));
  }

  const onClickNumber = (e: React.MouseEvent<HTMLElement>, number: string) => {
    e.preventDefault();
    if (number === 'del') {
      deleteLastNumber();
    } else {
      addNumbers(number);
    }
  }

  const onKeyDown = (e: any) => {
    if (e.key === 'Backspace') {
      deleteLastNumber();
    }

    if (e.target !== ref.current) {
      if (e.key >= '0' && e.key <= '57') {
        addNumbers(e.key);
      }
    }
  }



  return (
      <form onKeyDown={(e) => onKeyDown(e)} autoComplete="off" className='Form'>
        <h2 className='Form-title'>Введите ваш номер мобильного телефона</h2>
        <input tabIndex={1} ref={ref} onChange={(e) => change(e)} type='tel' id='phone' className={`Form-phone ${error ? 'Form-error' : ''}`} value={phoneNumber} />
        <p className='Form-text'>и с Вами свяжется наш менеждер для дальнейшей консультации</p>
        <div tabIndex={2} ref={numbers} className='Form-enterNumbers'>
            <button tabIndex={3} onClick={(e) => onClickNumber(e, '1')} className='Form-enterNumber'>1</button>
            <button tabIndex={4} onClick={(e) => onClickNumber(e, '2')} className='Form-enterNumber'>2</button>
            <button tabIndex={5} onClick={(e) => onClickNumber(e, '3')} className='Form-enterNumber'>3</button>
            <button tabIndex={6} onClick={(e) => onClickNumber(e, '4')} className='Form-enterNumber'>4</button>
            <button tabIndex={7} onClick={(e) => onClickNumber(e, '5')} className='Form-enterNumber'>5</button>
            <button tabIndex={8} onClick={(e) => onClickNumber(e, '6')} className='Form-enterNumber'>6</button>
            <button tabIndex={9} onClick={(e) => onClickNumber(e, '7')} className='Form-enterNumber'>7</button>
            <button tabIndex={10} onClick={(e) => onClickNumber(e, '8')} className='Form-enterNumber'>8</button>
            <button tabIndex={11} onClick={(e) => onClickNumber(e, '9')} className='Form-enterNumber'>9</button>
            <button tabIndex={12} onClick={(e) => onClickNumber(e, 'del')} className='Form-enterNumber Form-enterNumber_big'>стереть</button>
            <button tabIndex={13} onClick={(e) => onClickNumber(e, '0')} className='Form-enterNumber'>0</button>
        </div>
        <div className='Form-consent'>
          {
            error 
              ? <p className='Form-errormsg'>Неверно введен номер</p>
              : <>
                  <button onClick={(e) => changeConsest(e)} className={`Form-consent-btn ${isConsest ? 'Form-consent-btn_active' : ''}`} id='consent' tabIndex={14}></button>
                  <label htmlFor='consent'>Согласие на обработку персональных данных</label>
                </>
          }
        </div>
        <button disabled={!isConsest || !(phoneNumber.replace(/\D()+/g, '').slice(1, 11).length === 10)} onClick={(e) => validate(e, phoneNumber)} tabIndex={15} type='submit' className='Form-submit'>Подтвердить номер</button>
      </form>
  )
}

export default memo(Form);