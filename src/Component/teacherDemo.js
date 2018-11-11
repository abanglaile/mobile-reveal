import React from 'react';
import *as action from '../Action/';
import {connect} from 'react-redux';
import { List, NavBar, Progress, WhiteSpace, ActivityIndicator, Flex, Modal, TextareaItem, PickerView } from 'antd-mobile';
import {Icon} from 'antd'
import Reveal from 'reveal.js';
import config from '../utils/Config'
let target = config.www_url;


const Item = List.Item;
const Brief = Item.Brief;

class revealDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexh: '1',
      page_index: [[{label: '1', value: '1'}]],
    };
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    console.log("key ",key);
    this.setState({
      [key]: true,
    });
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  componentDidMount(){
    const {student_id, params} = this.props;
    const {lesson_slide_id} = params;
    this.props.getLessonSlide(lesson_slide_id);
    this.props.getSlideFeedback(lesson_slide_id, '1');
  }

  componentDidUpdate(prevProps){
    if (this.props.lesson_slide !== prevProps.lesson_slide) {
      if(this.props.initialized){
        Reveal.initialize({
          controls: true,
          progress: true,
          history: true,
          center: true,

          transition: 'slide', // none/fade/slide/convex/concave/zoom

          // More info https://github.com/hakimel/reveal.js#dependencies
          dependencies: [
            { src: target + '/lib/js/classList.js', condition: function() { return !document.body.classList; } },
            { src: target + '/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: target + '/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: target + '/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
            { src: target + '/plugin/search/search.js', async: true },
            { src: target + '/plugin/zoom-js/zoom.js', async: true },
            { src: target + '/plugin/notes/notes.js', async: true },
            { src: target + '/plugin/math/math.js', async: true }
          ]
        });
        var total = Reveal.getTotalSlides();
        let data = [];
        for(var i = 0; i < total; i++){
          data[i] = {
            label: (i+1).toString(),
            value: (i+1).toString(),
          }  
        }
        this.state.page_index = [data];
      }
    }
  }

  showSetupModal(){
    var index = Reveal.getIndices();
    this.setState({
      indexh: index.h, 
      setupModal: true,
    });
  }

  openTestPage(testid){ //http://www.zhiqiu.pro/mobile-zq/question/139
    window.open("http://www.zhiqiu.pro/teacher-zq/testresult/"+testid);   
  }

  renderLessonTest(){
    const {lesson_test} = this.props;
    
    return lesson_test.map((item) => {
      return(
          <Item 
            multipleLine 
            arrow="horizontal"
            // extra={<Button type="primary" size='small' inline>开始</Button>}
            onClick={e => this.openTestPage(item.test_id)}
            style = {{border:"1px solid #888",borderRadius: "5px",margin :"0rem 0rem"}}
          >
            {item.test_name}
            <Brief>
              <span style={{paddingRight : "1rem",borderRight:"1px solid "}}>
                {item.total_exercise}题
              </span>
              <span style={{paddingLeft : "1rem"}}>
                {item.formatdate}
              </span>
              <span style={{paddingLeft : "1rem"}}>
                {item.nickname}
              </span>
            </Brief> 
          </Item>
        );
    })
  }
  
  feedbackStu(lesson_slide_id,indexh,key){
    console.log("key :",key);
    this.props.getFeedbackStu(lesson_slide_id,indexh);
    this.setState({
        [key]: true,
    });
  }

  render() {
    const {lesson_slide, slide_feedback, params, q_stu} = this.props;
    const {lesson_slide_id} = params;
    var index = Reveal.getIndices();
    console.log("q_stu:  ",q_stu);
    if(!index.h)index = {h: 0};

    var feedback = slide_feedback[index.h] ? slide_feedback[index.h] : {Q: 0, my: false};
    // console.log("slide_feedback: ",JSON.stringify(slide_feedback));
    // console.log("feedback: ",JSON.stringify(feedback));
    var question_stus = (
        q_stu.length ?
        q_stu.map((item,i) => {
            return(
                <Item>{item.nickname}</Item >
            );
        }) : <Item>无</Item >
    );

    return (
    <div>
      <div dangerouslySetInnerHTML={{__html: lesson_slide.content}} />
      <div style={{
        position: 'fixed', //关键
        bottom:'30px',
        left: '15%',
        zIndex: 3,}} 
        onClick={(e) => this.feedbackStu(lesson_slide_id,index.h,'modal2')}
      >
        <Icon 
            style={{fontSize:'40px',verticalAlign: 'middle',marginRight:'10px',color:'#fadb14'}} 
            type="question-circle"
            theme="outlined"
        />
        <span style={{fontSize:'35px',verticalAlign: 'middle',color:'#fadb14'}}>
          {feedback.Q ? feedback.Q : '0'}
        </span>
      </div> 
      <div style={{
        position: 'fixed', //关键
        // height: '90px',
        // width: '40px',
        bottom:'30px',
        left: '5%',
        zIndex: 3,}} 
        onClick={this.showModal('modal1')}
      ><Icon style={{fontSize:'40px'}} type="file-text" theme="outlined" /></div>
      <div style={{color: 'white', position: 'absolute', right: '8px', bottom: '8px', zIndex: 3}} onClick={this.showSetupModal}></div>
      <Modal
          visible={this.state.setupModal}
          onClose={this.onClose('setupModal')}
          transparent
        >
          <PickerView
            data={this.state.page_index}
            value={this.state.indexh}
            cascade={false}
          />
      </Modal>
      <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="课堂测试"
          footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
        >
          {this.renderLessonTest()}
      </Modal>
      <Modal
          visible={this.state.modal2}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal2')}
          title="提问学生"
          footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal2')(); } }]}
        >
          <div>
            <List>
              {question_stus}
            </List>
          </div>
       </Modal>
    </div>
    );
  }
}

export default connect(state => {
  const data = state.slideData.toJS();
  return {
    lesson_test: data.lesson_test,
    lesson_slide: data.lesson_slide,
    slide_test: data.slide_test,
    slide_feedback: data.slide_feedback,
    initialized: data.initialized,
    q_stu : data.q_stu,
  }
}, action)(revealDemo);