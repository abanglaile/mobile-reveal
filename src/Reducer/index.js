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
})

export const slideData = (state = defaultSlideData, action = {}) => {
    switch(action.type){
        case 'GET_LESSON_SLIDE':
            return state.set('lesson_slide', Immutable.fromJS(action.lesson_slide))
                .set('lesson_test', Immutable.fromJS(action.lesson_test)).set('initialized', true);
        case 'GET_SLIDE_FEEDBACK':
            return state.set('slide_feedback', Immutable.fromJS(action.feedback));
        default:
            return state;
    }
}
