import {push} from 'react-router-redux'
import config from '../utils/Config'
import axios from 'axios';


let target = config.server_url;

const getStatusStart = () => {
  return {
    type: 'GET_STATUS_START',
  }
}

export const getLessonSlide = (lesson_slide_id) => {
    let url = target + "/getLessonSlide";
    console.log(lesson_slide_id);
    return (dispatch) => {
        dispatch(getStatusStart());
        return axios.get(url,{
            params:{
                lesson_slide_id,
            }
        })
        .then(function (response) {
            console.log(response.data.lesson_slide);
            dispatch({
                type: 'GET_LESSON_SLIDE',
                lesson_slide: response.data.lesson_slide,
                lesson_test: response.data.lesson_test    
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export const getSlideFeedback = (lesson_slide_id, student_id) => {
    let url = target + "/getLessonSlideFeedback";
    return (dispatch) => {
        dispatch(getStatusStart());
        return axios.get(url,{
            params:{
                lesson_slide_id,
                student_id
            }
        })
        .then(function (response) {
            console.log(response.data);
            dispatch({
                type: 'GET_SLIDE_FEEDBACK',
                feedback: response.data,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

