import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { FormGroup, FormControl, Input, Button } from 'react-bootstrap'
import config from '../config'
import slug from 'slug'
import S from 'shorti'
import DevTools from 'mobx-react-devtools';
import PopupComponent from './PopupComponent';
import styles from './custom.css';

@observer
export default class App extends Component {
  handleInputChange(type, e) {
    this.props.data.form_data[type] = e.target.value
  }
  handleSubmit(e) {
    e.preventDefault()
    const title = this.props.data.form_data.title
    const content = this.props.data.form_data.content
    if (!title)
      return
    const post = {
      slug: slug(title),
      type_slug: 'posts',
      title,
      content
    }
    this.props.data.addPost(post);
  };
  hayirPopupButtonClick = () => {
    console.log("In click listener");
    this.props.data.getNextFrame
  }
  render() {
    const data = this.props.data;
    const evetDivStyle = {
      backgroundImage: `url(${data.evetBackgroundImage})`,
      backgroundSize: 'auto',
      backgroundRepeat: 'no-repeat',
      marginLeft: '12%'
    };
    const hiddenStyle = {
      visibility: 'hidden',
    }
    return (
      <div style={ S('p-20') }>
        { data.isLoading ? (
          <div className={styles.loader + ' text-center'}></div>
        ) : (
          <div>
            <h1 className="mb-20 text-center">Cok basit gibi gözuken kararlar hayatini degistirir...</h1>
            <div style={ S('mb-20') }>
            </div>
            <div style={evetDivStyle}>
            <h1 className={styles.pt10 + ' mb-20 text-center'}>Cayina seker atar misin?</h1>
              <img src={ data.evetBackgroundImage } style={hiddenStyle} />
              <div className="row" >
                <button type="button" data-toggle="modal" data-target="#evetPopupId" className={styles.mt25ml10 + ' btn btn-info btn-lg text-center col-md-3'}>EVET</button> 
                <button type="button" data-toggle="modal" data-target="#hayirPopupId" className={styles.mt25ml40 +  ' btn btn-primary btn-lg text-center col-md-3'}>HAYIR</button> 
              </div>
            </div>
            <DevTools />
            <PopupComponent popupData={ data.evetPopupContent} modalId='evetPopupId'/>
            <PopupComponent popupData={ data.hayirPopupComponent} modalId='hayirPopupId' buttonClick={data.getNextFrame}/>
          </div>
        )}
      </div>
    )
  }
}
