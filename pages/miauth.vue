<template>
  <v-row class='justify-start ma-0' align-content='center' style='height: 100vh; width:100%;'>
    <v-col style='clip-path: polygon(100% 0, 0% 100%, 100% 100%); position:absolute; height:100%' :style='banner'>

    </v-col>
    <v-col class='align-right'>
      <v-card
        v-if='sessionError === false'
        class='mx-auto'
        max-width='46em'
      >
        <v-subheader>
          認証が完了しました！
        </v-subheader>
        <v-list-item three-line>
          <v-list-item-avatar>
            <v-avatar min-height='127'><v-img :src='i.avatarUrl' min-height='128' /></v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <div class='text-overline mb-4'>
              {{ i.name ? i.name: i.username }} さん
            </div>
            <v-list-item-subtitle>ようこそ{{meta.name}}インスタンスへ！</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-dialog
            v-model="dialog"
            width="600px"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                利用規約に同意して利用を始める
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">以下の利用規約にご同意ください</span>
              </v-card-title>
              <v-card-text>

              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
                >
                  Disagree
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
                >
                  Agree
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
      <v-card
        v-else
        class='mx-auto'
        max-width='50%'
      >

        <v-list-item three-line>
          <v-list-item-avatar>
            <v-avatar><img src='https://ar.akarinext.org/files/e129a3a3-c36b-44cf-b75e-33beb925da46'></v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <div class='text-overline mb-4'>
              既にログインしているまたは、迷子になってしまったようです...
            </div>
            <v-list-item-subtitle>ここには何もいないようです。代わりに藍ちゃんがいます</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn
            outlined
            rounded-lg
            text
          >
            <nuxt-link to='/'>トップに戻る</nuxt-link>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import sha256 from 'crypto-js/sha256'
import { login } from '~/utils/account';
import * as os from '~/utils/os'

export default {
  data() {
    return {
      i: {},
      sessionError: false,
      meta: {}
    }
  },
  computed: {
    banner() {
      return {
        'background': `url(${this.meta.bannerUrl})`
      }
    }
  },
  created() {
    const appSecret = localStorage.getItem('appSecret')
    const userToken = this.$route.query.token
    os.api('auth/session/userkey', { appSecret, token: userToken }).then(state => {
      const token = sha256(state.accessToken + appSecret).toString()
      this.i = state.user
      console.log(state.user)
      login(token);
    }).catch(err => {
      if (err.message === 'No such session.') {
        this.sessionError = true
      }
    })
    os.api('meta').then(meta => {
      this.meta = meta
    })
  }
}
</script>
