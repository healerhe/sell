/**
 * Created by healer on 2018/8/23.
 */
import Toast from './toast.vue';

export default {
  install (Vue, options = {}) {
    const VueToast = Vue.extend(Toast);
    let toast = null;

    function $toast (params) {
      return new Promise(resolve => {
        if (!toast) {
          toast = new VueToast();
          toast.$mount();
          document.querySelector(options.container || 'body').appendChild(toast.$el);
        }
        console.log('plugin done');
        toast.show(params);
        resolve();
      });
    }

    Vue.prototype.$toast = $toast;
  }
};
