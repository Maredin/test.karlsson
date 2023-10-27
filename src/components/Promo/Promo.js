import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';

import useKeypress from 'react-use-keypress';

import './Promo.css'

// Маска ввода инпута
function PhoneInput(props) {

    return (
        <InputMask
            mask='+7 (999) 999-99-99'
            value={props.value}
            onChange={props.onChange}
            className='promo__input'
            placeholder='+7(_ _ _)_ _ _-_ _-_ _'
        >
        </InputMask>
    );
}

// Главный блок
function Promo({ setData }) {
    const [error, setError] = useState(false);
    const [phone, setPhone] = useState('');
    const [checked, setChecked] = useState(false);
    const [formDone, setFormDone] = useState(false);
    const [checkedError, setCheckedError] = useState(false);
    const [inaction, setInaction] = useState(true);

    // Таймер закрытия через 10 сек без активности
    useEffect(() => {
        if (inaction) {
            const timer = setTimeout(() => {
                const newData = { application: false }
                setData(newData);
            }, 10000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [inaction]);

    // Обработчик ввода в инпут
    const handleInput = ({ target: { value } }) => {
        let res = value.replace(/\D/g, "").slice(1);
        setPhone(res);
        setError(false);
        setCheckedError(false);
        setInaction(false)
    };

    // Функция закрытия компонента Promo
    function close() {
        const newData = { application: false }
        setData(newData);
    }

    // Функция нажатия на кнопки мышкой
    function btn(e) {
        if (phone.length < 10) {
            let btnNumb = e.target.textContent
            let newInput = phone + btnNumb;
            setPhone(newInput);
            setError(false);
            setCheckedError(false);
            setInaction(false)
        }
    }

    // Функция стирания инпупа
    function clearInput() {
        let newInput = phone;
        newInput = newInput.slice(0, -1);
        setPhone(newInput);
        setError(false);
        setInaction(false)
    }

    // Функция чекбокса на персональные данные
    function chengeCheckbox() {
        setChecked(!checked);
        setCheckedError(false);
        setInaction(false)
    }

    // Компонент Чекбокс
    function Checkbox() {
        return (
            <div className="promo__checkbox-wrapper">
                <input type="checkbox" checked={checked} id='promo__pd' name='promo__pd' onChange={chengeCheckbox} />
                <label htmlFor="promo__pd" className={checkedError ? 'promo__pd-error' : ''}>Согласие на обработку персональных данных</label>
            </div>
        )
    }

    // Компонент ошибки
    function Error() {
        return (
            <p className="promo__checkbox-error">
                Неверно введён номер
            </p>
        )
    }

    // Функция отправки формы
    function submitPhone(e) {
        e.preventDefault();
        if (phone.length < 10 || phone == false) {
            setError(true);
        } else {
            setError(false);
        }
        if (!checked) {
            setCheckedError(true)
        }
        if (checked && phone.length == 10 && phone) {
            setFormDone(true);
        }
        setInaction(false)
    }

    // Нажатие кнопки влево на клавиатуре
    useKeypress('ArrowLeft', () => {
        setInaction(false)
        let res = document.querySelectorAll('.promo__number-btn');

        for (let i = 0; i < res.length; i++) {
            if (res[i].classList.contains('promo__number-btn-activ')) {
                if (i > 0) {
                    res[i - 1].classList.add('promo__number-btn-activ');
                    res[i].classList.remove('promo__number-btn-activ');
                }
            }

        }
    });

    // Нажатие кнопки вверх на клавиатуре
    useKeypress('ArrowUp', () => {
        setInaction(false)
        let res = document.querySelectorAll('.promo__number-btn');

        for (let i = 0; i < res.length; i++) {
            if (res[i].classList.contains('promo__number-btn-activ')) {
                if (i > 2 && i !== 10) {
                    res[i - 3].classList.add('promo__number-btn-activ');
                    res[i].classList.remove('promo__number-btn-activ');
                }
                if (i === 10) {
                    res[i - 2].classList.add('promo__number-btn-activ');
                    res[i].classList.remove('promo__number-btn-activ');
                }

            }
        }
    });

    // Нажатие кнопки вправо на клавиатуре
    useKeypress('ArrowRight', () => {
        setInaction(false)
        let res = document.querySelectorAll('.promo__number-btn');
        for (let i = 0; i < res.length; i++) {
            if (res[i].classList.contains('promo__number-btn-activ')) {
                if (i < res.length - 1) {
                    res[i + 1].classList.add('promo__number-btn-activ');
                    res[i].classList.remove('promo__number-btn-activ');
                }
                return
            }
        }
    });

    // Нажатие кнопки вниз на клавиатуре
    useKeypress('ArrowDown', () => {
        setInaction(false)
        let res = document.querySelectorAll('.promo__number-btn');
        for (let i = 0; i < res.length; i++) {
            if (res[i].classList.contains('promo__number-btn-activ')) {
                if (i < res.length - 4) {
                    res[i + 3].classList.add('promo__number-btn-activ');
                    res[i].classList.remove('promo__number-btn-activ');
                }
                if (i === 7) {
                    res[i + 2].classList.add('promo__number-btn-activ');
                    res[i].classList.remove('promo__number-btn-activ');
                }
                if (i === 8) {
                    res[i + 2].classList.add('promo__number-btn-activ');
                    res[i].classList.remove('promo__number-btn-activ');
                }
                return
            }
        }

    });

    // Нажатие кнопки бакспасе на клавиатуре
    useKeypress('Backspace', () => {
        clearInput();
        setInaction(false);
    });

    // Нажатие кнопки энтер на клавиатуре
    useKeypress('Enter', () => {
        setInaction(false);
        let res = document.querySelectorAll('.promo__number-btn');

        for (let i = 0; i < res.length; i++) {
            if (res[i].classList.contains('promo__number-btn-activ')) {
                if (i === 9) {
                    clearInput();
                } else {
                    let newNumber = phone + res[i].textContent
                    if (phone.length < 10) {
                        setPhone(newNumber)
                    }
                }
            }
        }
    });

    return (
        <div className="promo">
            <div className="promo__close" onClick={close}>
                <svg xmlns="http://www.w3.org/2000/svg" width="88" height="52" viewBox="0 0 88 52" fill="none">
                    <g clipPath="url(#clip0_190_36761)">
                        <rect width="88" height="52" transform="matrix(1 0 0 -1 0 52)" fill="white" />
                        <line x1="34.3448" y1="14.9407" x2="54.6264" y2="35.2223" stroke="black" strokeWidth="3" />
                        <line x1="33.6576" y1="35.2223" x2="53.9392" y2="14.9407" stroke="black" strokeWidth="3" />
                    </g>
                    <rect x="1" y="1" width="86" height="50" stroke="black" strokeWidth="2" />
                    <defs>
                        <clipPath id="clip0_190_36761">
                            <rect width="88" height="52" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>

            <form className="promo__forma">
                <div className={formDone ? 'wrapper__form-hide' : 'wrapper__form'}>
                    <h2 className='promo__titles'>Введите ваш номер мобильного телефона</h2>

                    <div className={error ? 'promo__input input-error' : 'promo__input'}>
                        <PhoneInput
                            value={phone}
                            onChange={handleInput}>
                        </PhoneInput>
                    </div>

                    <p className='promo__discr'>и с Вами свяжется наш менеждер для дальнейшей консультации</p>

                    <div className="promo__number">
                        <div className="promo__number-btn" onClick={btn}>1</div>
                        <div className="promo__number-btn" onClick={btn}>2</div>
                        <div className="promo__number-btn" onClick={btn}>3</div>
                        <div className="promo__number-btn" onClick={btn}>4</div>
                        <div className="promo__number-btn promo__number-btn-activ" onClick={btn}>5</div>
                        <div className="promo__number-btn" onClick={btn}>6</div>
                        <div className="promo__number-btn" onClick={btn}>7</div>
                        <div className="promo__number-btn" onClick={btn}>8</div>
                        <div className="promo__number-btn" onClick={btn}>9</div>
                        <div className="promo__number-btn promo__number-clear" onClick={clearInput}>Стереть</div>
                        <div className="promo__number-btn" onClick={btn}>0</div>
                    </div>

                    <div className="promo__checkbox">
                        {error ? <Error /> : <Checkbox />}
                    </div>

                    <button className='promo__confirm' onClick={submitPhone}>Подтвердить номер</button>
                </div>

                <div className={formDone ? 'wrapper__done' : 'wrapper__form-hide'}>
                    <h2 className='wrapper__done-title'>ЗАЯВКА ПРИНЯТА</h2>
                    <p className='wrapper__desc'>Держите телефон под рукой.<br /> Скоро с Вами свяжется наш менеджер. </p>
                </div>
            </form>
        </div>
    )
}

export default Promo;