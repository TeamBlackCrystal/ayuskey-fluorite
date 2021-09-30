<template>
  <v-col
    cols='12'
    sm='6'
  >
    <v-row>
      <v-col cols='12'>
        <v-card
          class='mx-auto my-12'
          width='100%'
        >
          <v-parallax
            height='300'
            :src='i.bannerUrl'
          ></v-parallax>

          <v-card-title class='white--text mt-8' style='top: -5em; position: relative'>
            <v-row>
              <v-avatar size='100'>
                <img
                  alt='user'
                  :src='i.avatarUrl'

                >
              </v-avatar>
              <div class='ml-3'>
                <MkUserName :user='i' :nowrap='false' />
                <h6>@{{ i.username }}@{{ instance.url }}
                  <v-icon v-if='i.isAdmin' style='color:rgb(49, 177, 206)' class='mr-2 pl-5'>fas fa-bookmark</v-icon>
                </h6>
              </div>
              <div>
                <v-card-text style='padding-left: 6em; padding-right: 6em;'>
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
                <v-divider></v-divider>
                <div v-for='field in i.fields' :v-key='i.fields'>
                  <v-row>
                    <v-col cols='6'>
                      <v-list-item-title>{{ field.name }}</v-list-item-title>
                    </v-col>
                    <v-col cols='6'>
                      <v-list-item-subtitle>{{ field.value }}</v-list-item-subtitle>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-row>
          </v-card-title>
        </v-card>
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

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import { instance as Instance } from '~/utils/instance'

export default defineComponent({
  data() {
    return {
      i: {},
      instance: Instance
    }
  },
  created() {
    this.i = JSON.parse(localStorage.getItem('account') || '')
    // MkAcct使えばこの辺いらない
    // @ts-ignore
    this.instance.url = new URL(this.instance.uri).host
  }
})
</script>
