<template>
	<!--<span v-once class="mk-avatar" :style="style" :class="{ cat }" :title="acct(user)" v-if="disableLink" v-user-preview="disablePreview ? undefined : user.id" @click="onClick">-->
  <span v-once class="mk-avatar" :style="style" :class="{ cat }" :title="acct(user)" v-if="disableLink" @click="onClick">
		<img class="inner" :style="style" :src="url"/>
	</span>
  <!--<nuxt-link class="mk-avatar" :style="style" :class="{ cat }" :to="userPage(user)" :title="acct(user)" :target="target" v-else v-user-preview="disablePreview ? undefined : user.id">-->
  <nuxt-link class="mk-avatar" :style="style" :class="{ cat }" :to="userPage(user)" :title="acct(user)" :target="target" v-else>
    <img class="inner" :style="style" :src="url"/>
  </nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue';
// import { getStaticImageUrl } from '~/script/get-static-image-url';
import { acct, userPage } from '~/script/filters/user';


export default Vue.extend({
  props: {
    user: {
      type: Object,
      required: true
    },
    target: {
      required: false,
      default: null
    },
    disableLink: {
      required: false,
      default: false
    },
    disablePreview: {
      required: false,
      default: false
    }
  },
  computed: {
    cat(): boolean {
      return this.user.isCat// && this.$store.state.settings.circleIcons;
    },
    // TODO: 2020/10/28 お嬢様アイコン追加
    style(): any {
      return {
        // borderRadius: this.$store.state.settings.circleIcons ? '100%' : null
        borderRadius: true
      };
    },
    url(): string {
      /*
      return this.$store.state.device.disableShowingAnimatedImages
        ? getStaticImageUrl(this.user.avatarUrl)
        : this.user.avatarUrl;
      */
      return this.user.avatarUrl;
    }
  },
  watch: {
    'user.avatarBlurhash'() {
      // @ts-ignore
      this.$el.style.color = this.getBlurhashAvgColor(this.user.avatarBlurhash);
    }
  },
  mounted() {
    // @ts-ignore
    this.$el.style.color = this.getBlurhashAvgColor(this.user.avatarBlurhash);
  },
  methods: {
    getBlurhashAvgColor(s: any) {
      return typeof s === 'string'
        ? '#' + [...s.slice(2, 6)]
        .map(x => '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~'.indexOf(x))
        .reduce((a, c) => a * 83 + c, 0)
        .toString(16)
        .padStart(6, '0')
        : undefined;
    },
    onClick(e: MouseEvent) {
      this.$emit('click', e);
    },
    acct,
    userPage
  }
});
</script>

<style lang="stylus" scoped>
@keyframes earwiggleleft {
  from { transform: rotate(37.6deg) skew(30deg); }
  25% { transform: rotate(10deg) skew(30deg); }
  50% { transform: rotate(20deg) skew(30deg); }
  75% { transform: rotate(0deg) skew(30deg); }
  to { transform: rotate(37.6deg) skew(30deg); }
}
@keyframes earwiggleright {
  from { transform: rotate(-37.6deg) skew(-30deg); }
  30% { transform: rotate(-10deg) skew(-30deg); }
  55% { transform: rotate(-20deg) skew(-30deg); }
  75% { transform: rotate(0deg) skew(-30deg); }
  to { transform: rotate(-37.6deg) skew(-30deg); }
}

.mk-avatar
  display inline-block
  vertical-align bottom
  flex-shrink 0

  &:not(.cat)
    overflow hidden
    border-radius 8px

  &.cat::before,
  &.cat::after
    background #df548f
    border solid 4px currentColor
    box-sizing border-box
    content ''
    display inline-block
    height 50%
    width 50%

  &.cat::before
    border-radius 0 75% 75%
    transform rotate(37.5deg) skew(30deg)

  &.cat::after
    border-radius 75% 0 75% 75%
    transform rotate(-37.5deg) skew(-30deg)

  &.cat::hover
    ::before
      animation earwiggleleft 1s infinite

    ::after
      animation earwiggleright 1s infinite

  .inner
    bottom 0
    left 0
    position absolute
    right 0
    top 0
    transition border-radius 1s ease
    z-index 1
    overflow hidden
    object-fit cover
    width 100%
    height 100%
</style>
