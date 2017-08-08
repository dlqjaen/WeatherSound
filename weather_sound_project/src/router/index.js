import Vue from 'vue';
import Router from 'vue-router';
import Main from '../components/Main';
import LoginAfterMain from '../components/LoginAfterMain';
import Share from '../components/sgin/Share';
import MyList from '../components/sgin/MyList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/:id',
          component: LoginAfterMain,
          children: [
            { path: '/:id/share', component: Share },
            { path: '/:id/mylist', component: MyList }
          ]
        }
      ]
    }
  ]
});
