import React from 'react';
// import Question from 'bundle-loader?lazy&name=Question!../Component/Question.js'

import revealDemo from '../Component/revealDemo.js'
import teacherDemo from '../Component/teacherDemo.js'
import { Route, IndexRoute } from 'react-router';
import { requireAuthentication } from '../utils';

const isReactComponent = (obj) => Boolean(obj && obj.prototype && Boolean(obj.prototype.isReactComponent));

const component = (component) => {
  return isReactComponent(component)
    ? {component}
    : {getComponent: (loc, cb)=> component(
         comp=> cb(null, comp.default || comp))}
};
//独立编译
//        <Route path="Question" {...component(Question)} />

export default (
  	<Route path="mobile-reveal">
        <Route path="demo/:lesson_slide_id" component={revealDemo} />
        <Route path="teacherdemo/:lesson_slide_id" component={teacherDemo} />
    </Route>
);
