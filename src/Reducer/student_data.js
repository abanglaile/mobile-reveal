import Immutable from 'immutable';
import jwtDecode from 'jwt-decode';

const defaulatStudentData = Immutable.fromJS({
        isFetching: false,
        student_rating: 0,
        book: [],
        my_test_list: [],
        my_uncompleted_test: [],
        chapter: {
            chaptername : null,
            status: {practice: 0, correct:0},
            kp: [],
        },
        tab: '',
        test_tab:'',
        capatity: [],
        ladder : [],
        kpladder : [],
        kpcapatity: [],
        comusedkp : [],
    });


//获取测试数据
export const studentData = (state = defaulatStudentData, action = {}) => {
    switch(action.type){
        case 'GET_DATA_START':
            return state.set('isFetching', true);
        case 'GET_MY_SCORE_SUCCESS':
            console.log(action.json.student_rating);
            return state.set('student_rating', action.json.student_rating);
        case 'GET_CHAPTER_SUCCESS':
            return state.set('book', action.json).set('isFetching', false);
        case 'GET_CHAPTER_NAME_SUCCESS':
            return state.setIn(['chapter', 'chaptername'], action.json.chaptername).set('isFetching', false);
        case 'GET_CHAPTER_STATUS_SUCCESS':
            return state.setIn(['chapter', 'status'], action.json).set('isFetching', false);
        case 'GET_CHAPTER_KP_SUCCESS':
            return state.setIn(['chapter', 'kp'], action.json).set('isFetching', false);
        case 'GET_MYTEST_SUCCESS':
            return state.set('my_test_list', action.json).set('isFetching', false);
        case 'GET_MY_UNCOMPLETEDTEST_SUCCESS':
            return state.set('my_uncompleted_test', action.json).set('isFetching', false);
        case 'GET_SELECTED_TAB':
            return state.set('tab', action.tab);
        case 'GET_MY_TEST_TAB':
            return state.set('test_tab', action.test_tab);
        case 'GET_ABILITY_STATUS_SUCCESS':
            return state.set('capatity', Immutable.fromJS(action.json)).set('isFetching', false);
        case 'GET_LADDER_STATUS_SUCCESS':
            return state.set('ladder', Immutable.fromJS(action.json)).set('isFetching', false);
        case 'GET_COMUSED_KP_SUCCESS':
            return state.set('comusedkp', Immutable.fromJS(action.json)).set('isFetching', false);
        case 'GET_KP_LADDER_STATUS_SUCCESS':
            return state.set('kpladder', Immutable.fromJS(action.json)).set('isFetching', false);
        case 'GET_KP_ABILITY_STATUS_SUCCESS':
            return state.set('kpcapatity', Immutable.fromJS(action.json)).set('isFetching', false);   
        default:
            return state;
    }
}
