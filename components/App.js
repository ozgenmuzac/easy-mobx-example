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
    this.props.data.getNextFrame
  }
  render() {
    const data = this.props.data;
    const evetDivStyle = {
      backgroundImage: `url(${data.evetBackgroundImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      margin: 'auto',
      height: 546,
      width: 728,
      backgroundPosition: 'center'
    };
    const hiddenStyle = {
      visibility: 'hidden',
    }
    const loaderStyle = {
      margin: 'auto'
    }
    const listItems = data.examQuestions.map((q) =>
      <li>{q.question}</li>
    );
    return (
      <div style={ S('p-20') }>
        { data.isCompleted ? (
            <h1 className="text-center">Yalana, Talana, Soyguna, Fasizme #HAYIR</h1>
          ) : (
           data.isLoading ? (
            <div className={styles.loader + ' text-center'} style={ loaderStyle }></div>
          ) : (
            <div>
              <h1 className="mb-20 text-center">Cok basit gibi gözuken kararlar hayatini degistirir...</h1>
              <div style={ S('mb-20') }>
              </div>
              <div style={evetDivStyle} className='img-responsive'>
              <h1 className={styles.pt10 + ' mb-20 text-center'}>{ data.question }</h1>
                <div className={styles.mt40 + ' clearfix'} >
                  <div className="col-xs-4 col-xs-offset-1">
                    <button type="button" data-toggle="modal" data-target="#evetPopupId" className={' btn btn-info btn-lg btn-block text-center col-md-3'}>EVET</button> 
                  </div>
                  <div className="col-xs-4 col-xs-offset-2">
                    <button type="button" data-toggle="modal" data-target="#hayirPopupId" className={' btn btn-primary btn-lg btn-block text-center col-md-3'}>HAYIR</button> 
                  </div>
                </div>
              </div>
              <ul>
                {listItems}
              </ul>
              <DevTools />
              <PopupComponent popupData={ data.evetPopupContent} modalId='evetPopupId'/>
              <PopupComponent popupData={ data.hayirPopupComponent} modalId='hayirPopupId' buttonClick={data.getNextFrame}/>
            </div>
          )
        )}
      </div>
    )
  }
}
