// import { App } from '@nuxtjs/composition-api'
import Vue from 'vue';

import mfm from '~/components/global/misskey-flavored-markdown.vue';
import acct from '~/components/global/acct.vue'
import avatar from '~/components/global/avatar.vue';
import emoji from '~/components/global/emoji.vue';
import userName from '~/components/global/user-name.vue';

Vue.component('Mfm', mfm);
Vue.component('MkAcct', acct);
Vue.component('MkAvatar', avatar);
Vue.component('MkEmoji', emoji);
Vue.component('MkUserName', userName);
