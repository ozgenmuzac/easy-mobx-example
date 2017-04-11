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
  @observable isLoading = true;
  @observable isCompleted = false;
  @observable examQuestions = [];
  @observable currentQuestionData = {};
  @observable lastMessage;
  questionIterator = 0;
  evetCount = 0;
  hayirCount = 0; 

  constructor() {
    this.currentLevel = 1;
    this.getNextFrame();
  }

  getNextQuestion = source => {
    if (source === 'evet') {
      this.evetCount += 1;
    }
    else if (source === 'hayir') {
      this.hayirCount += 1;
    }
    if(this.questionIterator == this.examQuestions.length) {
      if (this.evetCount > this.hayirCount) {
        this.lastMessage = `Demek biraz kararsızsın, ne diyeceğini tam bilemiyorsun. Biraz daha düşün ve güçlü bir #Hayır demek için sandığa git, oyunu kullan ve sandığa sahip çık!`;
      } else {
        this.lastMessage = `Demek #Hayır diyorsun. Son bir yapılacak iş kaldı. Sandığa git, oyunu kullan ve sandığa sahip çık!`;
      }
      this.isCompleted = true;
      return;
    }
    this.currentQuestionData = {
      question: this.examQuestions[this.questionIterator].question,
      level: this.examQuestions[this.questionIterator].level,
    }
    this.questionIterator += 1;
    return;
  }

  getNextFrame = () => {
    this.isLoading = true;

    $.getJSON('/get-questions').then((response) => {
      this.examQuestions = response.results;
      this.getNextQuestion();
      this.isLoading = false;
    });
  }
}
