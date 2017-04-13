import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FormGroup, FormControl, Input, Button } from 'react-bootstrap'
import config from '../config';
import S from 'shorti'
import DevTools from 'mobx-react-devtools';
import PopupComponent from './PopupComponent';
import styles from './custom.css';

@observer
export default class App extends Component {
  hayirPopupButtonClick = () => {
    console.log("In click listener");
  }
  render() {
    const data = this.props.data;
    let lastText = null;
    const hiddenStyle = {
      visibility: 'hidden',
    }
    const loaderStyle = {
      margin: 'auto'
    }
    const containerStyle = {
      width: '250px'
    };
    if (data.isKararsiz) {
      lastText = (
        <h3 className={styles.mt5 + ' text-center'}>
          İnceleme için ilgili kaynaklardan faydalanabilirsiniz:
          <br/>
          <a href='http://anayasadegisikligi.barobirlik.org.tr/Anayasa_Degisikligi.aspx'>http://anayasadegisikligi.barobirlik.org.tr/Anayasa_Degisikligi.aspx</a>
          <br/>  
          <a href='https://hayir.tmmob.org.tr/kategori/belgeler/'>https://hayir.tmmob.org.tr/kategori/belgeler/</a>
          <br/>
          <a href='http://www.bmo.org.tr/2017/03/22/anayasa-degisikligi-teklifi-ne-getiriyor-ne-goturuyor-neyi-oylayacagiz/'>http://www.bmo.org.tr/2017/03/22/anayasa-degisikligi-teklifi-ne-getiriyor-ne-goturuyor-neyi-oylayacagiz/</a>
        </h3>
      ) 
    } else if (data.isEvet) {
      lastText = (
        <h3 className={styles.mt5 + ' text-center'}>
          Detaylı bir inceleme için ilgili çalışmaya başvurabilirsiniz:
          <br/>
          <a href='http://anayasadegisikligi.barobirlik.org.tr/Anayasa_Degisikligi.aspx'>http://anayasadegisikligi.barobirlik.org.tr/Anayasa_Degisikligi.aspx</a>
        </h3>
      )
    } else {
      lastText = (
        <h3 className={styles.mt5 + ' text-center'}>
          Müşahit olmak için:
          <br/>
          <a href='http://www.oyumguvende.org'>http://www.oyumguvende.org</a>
          <br/>
          <a href='http://www.hayirveotesi.org'>http://www.hayirveotesi.org</a>
        </h3>
      )
    }
    return (
      <div style={ S('p-20') }>
        { data.isCompleted ? (
            <div>
              <h1 className={styles.mt15 + ' text-center'}>{data.lastMessage}</h1>
              <h1 className={styles.fs50 + ' text-center'}>HAYIR++;</h1>
              { lastText }
            </div>
          ) : (
           data.isLoading ? (
            <div className={styles.loader + ' text-center'} style={ loaderStyle }></div>
          ) : (
            <div>
              <h1 className="mb-20 text-center">Hayır'a mı yakınsınız yoksa Evet'e mi?</h1>
              <div style={ S('mb-20') }>
              </div>
              <h1 className={styles.pt5 + ' mb-20 text-center'}>{ data.currentQuestionData.question }</h1>
              <div className={styles.mt5 + ' clearfix'} >
                <div className="col-xs-3 col-xs-offset-2">
                  <button type="button" data-toggle="modal" className={' btn btn-info btn-lg btn-block text-center col-md-3'}
                          onClick={() => data.getNextQuestion('evet')}>
                    EVET
                  </button> 
                </div>
                <div className="col-xs-3 col-xs-offset-2">
                  <button type="button" data-toggle="modal" className={' btn btn-primary btn-lg btn-block text-center col-md-3'}
                          onClick={() => data.getNextQuestion('hayir')}>
                    HAYIR
                  </button> 
                </div>
              </div>
            </div>
          )
        )}
      </div>
    )
  }
}
