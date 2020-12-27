import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios=axios;
Vue.prototype.$qs = qs;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth){
	if(store.state.recorded_username!=''){		//直接使用store，由于此文件已引入'./store'，故不需要this.$store
		next();
	}else{
		next({path:'/login'});
	}
}else{
		next();
	}
})
