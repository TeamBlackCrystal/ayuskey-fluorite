<template>
  <img v-if="customEmoji" class="fvgwvorwhxigeolkkrcderjzcawqrscl custom" loading="lazy" :class="{ normal: normal }" :src="url" :alt="alt" :title="alt"/>
  <img v-else-if="char && !useOsDefaultEmojis" class="fvgwvorwhxigeolkkrcderjzcawqrscl" loading="lazy" :src="url" :alt="alt" :title="alt"/>
  <span v-else-if="char && useOsDefaultEmojis">{{ char }}</span>
  <span v-else>:{{ name }}:</span>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
// import { getStaticImageUrl } from '~/script/get-static-image-url';
import { twemojiSvgBase } from '~/utils/misc/twemoji-base';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: false
    },
    emoji: {
      type: String,
      required: false
    },
    normal: {
      type: Boolean,
      required: false,
      default: false
    },
    customEmojis: {
      required: false,
      default: () => []
    },
    isReaction: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      url: null,
      char: null,
      customEmoji: null
    }
  },

  computed: {
    alt(): string {
      // @ts-ignore
      return this.customEmoji ? `:${this.customEmoji.name}:` : this.char;
    },

    useOsDefaultEmojis(): boolean {
      // return this.$store.state.device.useOsDefaultEmojis && !this.isReaction;
      return false;
    }
  },

  watch: {
    customEmojis() {
      if (this.name) {
        // @ts-ignore
        const customEmoji = this.customEmojis.find(x => x.name == this.name); // eslint-disable-line eqeqeq
        if (customEmoji) {
          this.customEmoji = customEmoji;
          /*
          this.url = this.$store.state.device.disableShowingAnimatedImages
            ? getStaticImageUrl(customEmoji.url)
            : customEmoji.url;
          */
          // @ts-ignore
          this.url = customEmoji.url;
        }
      }
    },
  },

  created() {
    if (this.name) {
      // @ts-ignore
      const customEmoji = this.customEmojis.find(x => x.name == this.name); // eslint-disable-line eqeqeq
      if (customEmoji) {
        this.customEmoji = customEmoji;
        /*
        this.url = this.$store.state.device.disableShowingAnimatedImages
          ? getStaticImageUrl(customEmoji.url)
          : customEmoji.url;
        */
        // @ts-ignore
        this.url = customEmoji.url;
      } else {
        // const emoji = lib[this.name];
        // if (emoji) {
        //	this.char = emoji.char;
        // }
      }
    } else {
      // @ts-ignore
      this.char = this.emoji;
    }

    if (this.char) {
      // @ts-ignore
      let codes = Array.from(this.char).map(x => x.codePointAt(0).toString(16));
      // eslint-disable-next-line eqeqeq
      if (!codes.includes('200d')) codes = codes.filter(x => x != 'fe0f');
      codes = codes.filter(x => x && x.length);

      // @ts-ignore
      this.url = `${twemojiSvgBase}/${codes.join('-')}.svg`;
    }
  },
});
</script>

<style lang="stylus" scoped>
.fvgwvorwhxigeolkkrcderjzcawqrscl
  height 1.25em
  vertical-align -0.25em

  &.custom
    height 2.5em
    vertical-align middle
    transition transform 0.2s ease

    &:hover
      transform scale(1.2)

    &.normal
      height 1.25em
      vertical-align -0.25em

      &:hover
        transform none

</style>
