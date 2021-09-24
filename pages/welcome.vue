<template>
  <v-container fluid style='padding-left: 15%; padding-right:15%;'>
    <v-row>
      <v-col xs='12' sm='8'>
        <v-card class='rounded-xl pa-5 mb-10' min-height='20em'>
          <h1>Akari Ne</h1>
          <v-row class='pa-3'>
            <p class='pr-7'>ne.akarinext.org - Powered by Ayuskey.</p>
            <div class='pr-5'>
              <v-icon small>fas fa-user</v-icon>
              90
            </div>
            <div>
              <v-icon small>fas fa-pencil-alt</v-icon>
              5,900
            </div>
            <p>Akari NeはActivity Pubを漂っているインスタンスの一つです。基本的にはAkariNextコミュニティーが使用していますが、その他の方も是非ご登録してくださいね！詳しく...
            </p>
            <v-btn
              class='ma-2'
              outlined
              color='white'
            >
              新規登録
            </v-btn>
            <v-btn
              class='ma-2'
              outlined
              color='white'
            >
              ログイン
            </v-btn>
          </v-row>

        </v-card>
        <v-row class='mb-5'>
          <v-col cols='12' sm='6'>
            <v-card class='rounded-lg' min-height='27.5em'>
              <v-app-bar class='rounded-0 rounded-t-lg'>お知らせ</v-app-bar>
              Second Card
            </v-card>
          </v-col>
          <v-col>
            <v-card class='rounded-lg' min-height='27.5em'>
              <v-app-bar class='rounded-0 rounded-t-lg'>最近の画像</v-app-bar>
              Second Card
            </v-card>
          </v-col>
        </v-row>
        <v-card class='rounded-lg pa-5 mb-10' min-height='15em'>
          文字
        </v-card>
      </v-col>
      <v-col xs='12'>
        <v-card class='rounded-lg mb-10' min-height='32em'>
          <v-app-bar class='rounded-0 rounded-t-lg'>タイムライン</v-app-bar>
          Second Card
        </v-card>
        <v-card class='rounded-xl pa-5 mb-10' min-height='20em'>
          タグ
          <hr/>
        </v-card>
        <v-card class='rounded-lg' min-height='10em'>
          <v-app-bar class='rounded-0 rounded-t-lg'>情報</v-app-bar>
          <p class='pa-5'>Version: 11.37.1-rei0784-5.16.0<br><span>Maintainer: yupix</span></p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import { toUnicode } from 'punycode/';

export default defineComponent({
  name: 'Welcome',
  data() {
    return {

    }
  }
})
</script>

<style lang='stylus' scoped>

</style>
