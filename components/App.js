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
    const hiddenStyle = {
      visibility: 'hidden',
    }
    const loaderStyle = {
      margin: 'auto'
    }
    return (
      <div style={ S('p-20') }>
        { data.isCompleted ? (
            <div>
              <h1 className="text-center">Toplam evet Sayin: {data.evetCount}</h1>
              <h1 className="text-center">Toplam hayir Sayin:  {data.hayirCount}</h1>
            </div>
          ) : (
           data.isLoading ? (
            <div className={styles.loader + ' text-center'} style={ loaderStyle }></div>
          ) : (
            <div>
              <h1 className="mb-20 text-center">Cok basit gibi gözuken kararlar hayatini degistirir...</h1>
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
              <DevTools />
            </div>
          )
        )}
      </div>
    )
  }
}
