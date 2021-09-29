<template>
  <v-col
    cols='12'
    sm='8'
  >
    <v-row>
      <v-col cols='12'>
        <v-sheet
          min-height='70vh'
          rounded='lg'
        >
          <v-card
            :loading='loading'
            class='mx-auto my-12'
            width='100%'
          >
            <v-parallax
              height='300'
              :src='i.bannerUrl'
            ></v-parallax>

            <v-card-title class='white--text mt-8' style='position: absolute; top: 10em'>
              <v-avatar size='100'>
                <img
                  alt='user'
                  :src='i.avatarUrl'

                >
              </v-avatar>
              <h2 class='ml-3'>
                <Mfm v-if='i.name' :text='i.name' style='max-height: 0.2em'/>
              </h2>
            </v-card-title>

            <v-card-text style='padding-left: 6em; padding-right: 6em; padding-top: 6em;'>
              <div>{{ i.description }}</div>
              <v-btn v-if='i.github' class='mr-5 rounded-lg'>
                <v-icon small class='mr-2'>fab fa-github</v-icon>
                {{ i.github.login }}
              </v-btn>
              <v-btn v-if='i.discord' class='rounded-lg' style='background-color: #5865F2;'>
                <v-icon small class='mr-2'>fab fa-discord</v-icon>
                {{ i.discord.username }}
              </v-btn>
            </v-card-text>
            <div v-for='field in i.fields' :v-key='i.fields'>
              <v-list two-line class='pa-0'>
                <v-list-item>
                  <v-list-item-title>{{ field.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ field.value }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </div>
          </v-card>
          <!--  -->
        </v-sheet>
      </v-col>
      <v-col cols='12'>
        <v-sheet
          min-height='70vh'
          rounded='lg'
        >
          <v-card width='100%'>
            <v-card-text>

            </v-card-text>
          </v-card>
          <!--  -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-col>
</template>


<style>
.fvgwvorwhxigeolkkrcderjzcawqrscl >>> .custom {
  height: 1em !important;
  vertical-align: -0.25em;
}
</style>

<script>
import Mfm from '~/components/misskey-flavored-markdown.vue'

export default {
  components: {
    Mfm
  },
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
