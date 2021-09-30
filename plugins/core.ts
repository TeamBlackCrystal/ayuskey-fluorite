// import { App } from '@nuxtjs/composition-api'
import Vue from 'vue';

import mfm from '~/components/misskey-flavored-markdown.vue';
import acct from '~/components/acct.vue'
import emoji from '~/components/emoji.vue';
import userName from '~/components/user-name.vue';

Vue.component('Mfm', mfm);
Vue.component('MkAcct', acct);
Vue.component('MkEmoji', emoji);
Vue.component('MkUserName', userName);
