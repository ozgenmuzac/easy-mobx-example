import { observable } from 'mobx'
import config from '../config'

export default class AppState {
  @observable posts = []
  @observable form_data = {}
  @observable is_saving = false;
  @observable question;
  @observable evetPopupContent = {};
  @observable hayirPopupComponent = {};
  @observable evetBackgroundImage;
  @observable hayirBackgroundImage;
  @observable isLoading = true;
  @observable isCompleted = false;
  
  constructor() {
    this.currentLevel = 1;
    this.getNextFrame();
  }

  getNextFrame = () => {
    if (this.currentLevel >= 5) {
      this.isCompleted = true;
      return;
    }
    this.isLoading = true;
    $.getJSON(`/get-next-frame/?currentLevel=${this.currentLevel}`).then((data) => {
      this.question = data.question;
      this.evetPopupContent = data.evet.popup;
      this.evetBackgroundImage = data.evet.image;
      this.hayirPopupComponent = data.hayir.popup;
      this.hayirBackgroundImage = data.hayir.image;
      this.isLoading = false;
      this.currentLevel += 1;
    })
  }
}
