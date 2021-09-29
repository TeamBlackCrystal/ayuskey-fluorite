<template>
  <div style='position:-webkit-sticky; position:sticky; top:0; z-index: 10;'>
    <v-app-bar
      app
      dark
      style='position:-webkit-sticky; position:sticky; top:0; z-index: 10:'
      flat
    >
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size='32'
      ></v-avatar>

      <v-tabs
        centered
        class='ml-n9'
        color='grey darken-1'
      >
        <v-tab
          v-for='link in links'
          :key='link'
        >
          {{ link }}
        </v-tab>
      </v-tabs>

      <v-avatar
        class='hidden-sm-and-down'
        size='50'
      >
        <v-img :src='i.avatarUrl'></v-img>
      </v-avatar>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      i: {}
    }
  },
  created() {
    this.i = JSON.parse(localStorage.getItem('account'))
  }

}
</script>

<style scoped>

</style>
