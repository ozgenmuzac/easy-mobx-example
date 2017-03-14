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
      backgroundSize: '100% auto'
    };
    const hayirDivStyle = {
      backgroundImage: `url(${data.evetBackgroundImage})`,
      backgroundSize: '100% auto'
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
          <div className="row">
            <div className="col-md-5" style={evetDivStyle}>
              <img src={ data.evetBackgroundImage } style={hiddenStyle} className="img-responsive"/>
              <button type="button" data-toggle="modal" data-target="#evetPopupId" className="btn btn-info text-center">EVET</button> 
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5" style={hayirDivStyle}>
              <img src={ data.evetBackgroundImage } style={hiddenStyle} className="img-responsive"/>
              <button type="button" data-toggle="modal" data-target="#hayirPopupId" className="btn btn-info text-center">HAYIR</button> 
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
