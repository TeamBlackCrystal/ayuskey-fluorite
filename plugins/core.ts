// import { App } from '@nuxtjs/composition-api'
import Vue from 'vue';

import mfm from '~/components/misskey-flavored-markdown.vue';
import emoji from '~/components/emoji.vue'

Vue.component('Mfm', mfm);
Vue.component('MkEmoji', emoji);
