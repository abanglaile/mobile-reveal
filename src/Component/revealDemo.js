import React from 'react';
import *as action from '../Action/';
import {connect} from 'react-redux';
import { List, NavBar, Icon, Progress, WhiteSpace, ActivityIndicator, Button, Flex, Modal, TextareaItem, PickerView } from 'antd-mobile';

import Reveal from 'reveal.js';


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
    this.props.getSlideFeedback(lesson_slide_id, 1);
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
            { src: '/lib/js/classList.js', condition: function() { return !document.body.classList; } },
            { src: '/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: '/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: '/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
            { src: '/plugin/search/search.js', async: true },
            { src: '/plugin/zoom-js/zoom.js', async: true },
            { src: '/plugin/notes/notes.js', async: true }
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

  renderLessonTest(){
    const {lesson_test} = this.props;
    
    return lesson_test.map((item) => {
      return(
          <Item 
            multipleLine 
            arrow="horizontal"
            // extra={<Button type="primary" size='small' inline>开始</Button>}
            onClick={e => this.props.router.push("/mobile-zq/question/"+item.test_id)}
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
  
  feedbackQ(){
    this.setState({click: true});
  }

  render() {
    const {lesson_slide, slide_feedback} = this.props;
    var index = Reveal.getIndices();
    if(!index.h)index = {h: 0};

    var feedback = slide_feedback[index.h] ? slide_feedback[index.h] : {L: 0, Q: 0, my: -1};

    console.log(slide_feedback);

    return (
    <div>
      <div dangerouslySetInnerHTML={{__html: lesson_slide.content}} />
      <Button style={{zIndex: 3}} inline type="ghost" onClick={this.showModal('modal2')}>basic</Button>
      <div style={{color: 'white', position: 'absolute', right: '8px', bottom: '8px', zIndex: 3}} onClick={this.showSetupModal}>4</div>
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
          title="互动"
          footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal2')(); } }]}
        >
          <div>
            <Button type={feedback.my == 0 ? "primary" :"ghost"} inline size="small" 
              onClick={this.feedbackQ}
              style={{ marginRight: '4px' }}>疑问 {index.h ? slide_feedback[index.h].Q : 0}</Button>
            <Button type={feedback.my == 1 ? "primary" : "ghost"} inline size="small"
              >赞同 {index.h ? slide_feedback[index.h].L : 0}</Button>
            <WhiteSpace />
            <List>
              <TextareaItem
                placeholder="评论"
                rows={3}
                count={70}
              />
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
  }
}, action)(revealDemo);