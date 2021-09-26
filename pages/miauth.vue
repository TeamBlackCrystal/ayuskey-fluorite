<template>
  <v-row class='justify-start ma-0' align-content='center' style='height: 100vh; width:100%;'>
    <v-col style='clip-path: polygon(100% 0, 0% 100%, 100% 100%); position:absolute; height:100%' :style='Banner'>

    </v-col>
    <v-col class='align-right'>
      <v-card
        class='mx-auto'
        max-width='46em'
        v-if='sessionError === false'
      >
        <v-list-item three-line>
          <v-list-item-avatar>
            <v-avatar min-height='127'><v-img :src='i.avatarUrl' min-height='128' /></v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <div class='text-overline mb-4'>
              {{ i.name ? i.name: i.username }}
            </div>
            <v-list-item-subtitle>あｗｗｗ</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn
            outlined
            rounded
            text
          >
            Button
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card
        class='mx-auto'
        max-width='50%'
        v-else
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
            トップに戻る
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import sha256 from 'crypto-js/sha256'
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
    Banner() {
      this.getMeta()
      return {
        'background': 'url(' + this.meta.bannerUrl + ')'
      }
    }
  },
  methods: {
    getMeta() {
      os.api('meta').then(meta => {
        this.meta = meta
      })
    }
  },

  created() {
    const appSecret = localStorage.getItem('appSecret')
    const userToken = this.$route.query.token
    os.api('auth/session/userkey', { appSecret, token: userToken }).then(state => {
      const token = sha256(state.accessToken + appSecret).toString()
      this.i = state.user
      console.log(state.user)
      localStorage.setItem('account', JSON.stringify({
        token,
        id: state.user.id,
        isModerator: state.user.isModerator,
        isAdmin: state.user.isAdmin
        // TODO: isDeletedがAyuskeyにないので実装後に追加
      }))
    }).catch(err => {
      if (err.message === 'No such session.') {
        this.sessionError = true
      }
    })
  }
}
</script>
