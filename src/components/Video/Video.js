import React from 'react';
import { useState } from 'react';
import './Video.css';

import imgQrCode from './img/qr.png';

function Video( {data, setData} ) {
    const [showQr, setShowQr] = useState('-251px');
    const style = {
        right: showQr
    };
    setTimeout(() => {
        setShowQr('0px')
    }, 5000);

    function application() {
        let newData = {application: true}
        setData(newData);       
	}

    return (
        <div className="video">
            <iframe width="100%" height="720px"
                src="https://www.youtube.com/embed/pq_GbdtXnXQ?si=rcBpncrhoPu7f5ih&amp;loop=1&autoplay=1&mute=1&controls=0&playlist=pq_GbdtXnXQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            >
            </iframe>


            <div className="qr__code" style={style}>
                <h2 className="qr__title">ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША!<br />
                    ПОДАРИТЕ ЕМУ СОБАКУ!
                </h2>

                <img src={imgQrCode} alt="qr code" className="qr__img" />

                <p className="qr__discr">Сканируйте QR-код
                    или нажмите ОК</p>
                <button className='qr__btn' onClick={application}>Ok</button>
            </div>
        </div>
    )
}

export default Video;