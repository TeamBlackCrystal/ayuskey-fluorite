<template>
<span v-once class="mk-acct">
	<span class="name">@{{ user.username }}</span>
	<span v-if="user.host || detail /*|| $store.state.settings.showFullAcct*/" class="host" :class="{ fade: true /*$store.state.settings.contrastedAcct*/ }">@{{ user.host || host }}</span>
	<!-- <fa v-if="user.isLocked === true" class="locked" icon="lock" fixed-width/> -->
</span>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { toUnicode } from 'punycode/';
import { host } from '~/utils/config';

export default defineComponent({
  props: {
    user: {
      type: Object,
      required: true
    },
    detail: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      host: toUnicode(host),
    };
  }
});
</script>

<style lang="stylus" scoped>
.mk-acct
  > .host.fade
    opacity 0.5

  > .locked
    opacity 0.8
    margin-left 0.5em
</style>
