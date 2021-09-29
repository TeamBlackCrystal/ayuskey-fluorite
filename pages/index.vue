<template>
  <v-app id='inspire'>
    <v-main class='grey lighten-3 ma-0 pa-0' style='padding: 0 !important;'>
      <v-container fluid>
        <v-row>
          <v-col
            cols='12'
            sm='2'
          >
            <v-sheet
              style='position:-webkit-sticky; position:sticky; top:10%;'
              rounded='lg'
              min-height='268'
            >
              <!--  -->
            </v-sheet>
          </v-col>

          <!--<Profiel /> 未完成-->

          <v-col
            cols='12'
            sm='2'
          >
            <v-sheet
              rounded='lg'
              min-height='268'
            >
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

// todo: もっと判断を厳密にしてもいいかもしれない
const isLogin = (localStorage.getItem('account') != null);

export default defineComponent({
  layout: isLogin ? 'default' : 'welcome',
  data: () => ({
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
  })
})
</script>
