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
  @observable isKararsiz = false;
  @observable isEvet = false;
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
        this.lastMessage = `Evet diyorsunuz. Hepimizin geleceği için bizce bir kez daha düşünün!!!`;
        this.isEvet = true;
      } else if ((this.evetCount*2) >= this.hayirCount){
        this.lastMessage = `Demek henüz kararınızı vermediniz. Tekrar değerlendirin elbette. Biz ülkemiz ve geleceğimiz için #HAYIR demenin zorunlu olduğunu düşünüyoruz. Bu bize siz de katılın isteriz. `;
        this.isKararsiz = true;
      } else {
        this.lastMessage = `Siz de #HAYIR diyorsunuz. O zaman son bir yapılacak işimiz kaldı. Hep birlikte sandığa gidelim, oyumuzu kullanalım. Sandığımıza ve geleceğimize sahip çıkalım!`;
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
