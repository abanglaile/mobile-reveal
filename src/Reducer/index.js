import Immutable from 'immutable';

const defaultSlideData = Immutable.fromJS({
    isFetching: false,
    lesson_slide: {
        content: `<div class="slides">
                    <section>
                        <h2>slide</h2>
                    </section>
                </div>`
    },
    lesson_test: [],
    slide_feedback: [],
    q_stu : [],
})

export const slideData = (state = defaultSlideData, action = {}) => {
    switch(action.type){
        case 'GET_LESSON_SLIDE':
            return state.set('lesson_slide', Immutable.fromJS(action.lesson_slide))
                .set('lesson_test', Immutable.fromJS(action.lesson_test)).set('initialized', true);
        case 'GET_SLIDE_FEEDBACK':
            return state.set('slide_feedback', Immutable.fromJS(action.feedback));
        case 'UPDATE_SLIDE_FEEDBACK':
            console.log("action.q: ",action.q);
            console.log("action.indexh: ",action.indexh);
            // console.log("state.slideData: ", JSON.stringify(state.slideData));
            if(action.q){
                return state.updateIn(['slide_feedback',action.indexh,'Q'], val => val - 1)
                        .setIn(['slide_feedback',action.indexh,'my'], false);
            }else{
                if(state.getIn(['slide_feedback',action.indexh])){
                    return state.updateIn(['slide_feedback',action.indexh,'Q'], val => val + 1)
                        .setIn(['slide_feedback',action.indexh,'my'], true);
                }else{
                    return state.setIn(['slide_feedback',action.indexh], Immutable.fromJS({Q : 1, my : true}));
                }
            }
        case 'GET_FEEDBACK_STU':
            return state.set('q_stu', Immutable.fromJS(action.stus));
        default:
            return state;
    }
}
