import { $i as _i } from '~/utils/account'
import { instance } from '~/utils/instance'

declare module 'vue/types/vue' {
  interface Vue {
    $i: typeof _i
    $instance: typeof instance
  }
}
