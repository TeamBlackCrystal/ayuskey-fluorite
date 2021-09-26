<template>
  <v-app dark>
    <div :style='customBanner'
         style='position:absolute; width: 100%; min-height: 40%; background-size: 100% auto; background-repeat: no-repeat;'></div>

    <v-container fluid style='padding-left: 15%; padding-right:15%;'>
      <v-row>
        <v-col xs='12' sm='8'>
          <v-card class='rounded-xl pa-5 mb-10' min-height='20em'>
            <h1>{{ meta.name }}</h1>
            <v-row class='pa-3'>
              <p class='pr-7'>{{ host }} - Powered by Ayuskey.</p>
              <div class='pr-5'>
                <v-icon small>fas fa-user</v-icon>
                {{ stats.originalUsersCount }}
              </div>
              <div class='pr-5'>
                <v-icon small class='light-green--text'>fas fa-user</v-icon>
                {{ onlineUsersCount }}
              </div>
              <div>
                <v-icon small>fas fa-pencil-alt</v-icon>
                {{ stats.originalNotesCount }}
              </div>
            </v-row>
            <p>{{ meta.description }}</p>
            <div>
              <v-btn
                class='mr-5'
                outlined
                color='white'
              >
                新規登録
              </v-btn>
              <v-btn
                outlined
                color='white'
                v-on:click='login'
              >
                 {{$t('login')}}
              </v-btn>
            </div>
          </v-card>
          <v-row class='mb-5'>
            <v-col cols='12' sm='6'>
              <v-card class='rounded-lg' min-height='27.5em'>
                <v-app-bar class='rounded-0 rounded-t-lg elevation-0'>
                  <v-icon small class='pr-2'>fas fa-broadcast-tower</v-icon>
                  お知らせ
                </v-app-bar>
                <div v-for='announcement in announcements' :key='announcement.id'>
                  <v-card>
                    <v-card-title>{{ announcement.title }}</v-card-title>
                    <v-card-subtitle>{{ announcement.text }}</v-card-subtitle>
                  </v-card>
                  <img v-if='announcement.imageUrl' :src='announcement.imageUrl' />
                </div>
              </v-card>
            </v-col>
            <v-col cols='12' sm='6'>
              <v-card class='rounded-lg' min-height='27.5em' max-height='27.5em'>
                <v-app-bar class='rounded-0 rounded-t-lg elevation-0'>
                  <v-icon small class='pr-2'>far fa-images</v-icon>
                  最近の画像
                </v-app-bar>
                <div class='d-flex flex-wrap align-content-center'>
                  <v-img v-for='photo in photos' :key='photo' :src='photo.url' width='50%'></v-img>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <v-card class='rounded-lg pa-5 mb-10' min-height='15em'>
            文字
          </v-card>
        </v-col>
        <v-col xs='12'>
          <v-card class='rounded-lg mb-10' min-height='32em'>
            <v-app-bar class='rounded-0 rounded-t-lg elevation-0'>
              <v-icon small class='pr-2'>far fa-comment-alt</v-icon>
              タイムライン
            </v-app-bar>
            Second Card
          </v-card>
          <v-card class='rounded-xl pa-5 mb-10' min-height='20em'>
            <v-list three-line>
              <a v-for='tag in tags' :key='tag' target='_blank' :href='meta.uri + "/tags/" + tag.tag'
                 class='light-green--text text-decoration-none'> {{ tag.tag }}
                <v-divider></v-divider>
              </a>
            </v-list>
          </v-card>
          <v-card class='rounded-lg' min-height='10em'>
            <v-app-bar class='rounded-0 rounded-t-lg elevation-0'>
              <v-icon small class='pr-2'>fas fa-info-circle</v-icon>
              情報
            </v-app-bar>
            <p class='pa-5'>Version: {{ meta.version }}<br><span>Maintainer: {{ meta.maintainerName }}</span></p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import { toUnicode } from 'punycode/'
import { host, instanceName } from '~/utils/config'
import * as os from '~/utils/os'
import { concat } from '~/utils/prelude/array'

export default defineComponent({
  name: 'Welcome',
  data() {
    return {
      meta: {},
      stats: {},
      tags: [],
      photos: [],
      announcements: [],
      onlineUsersCount: 0,
      host: toUnicode(host),
      instanceName
    }
  },
  computed: {
    customBanner() {
      console.log('あひゃ')
      console.log(this.meta.bannerUrl)
      return {
        'background': 'url(' + this.meta.bannerUrl + ')'
      }
    }
  },
  methods: {
    login() {
      os.api('app/create', {
        name: 'Ayuskey Front',
        description: 'Ayuskeyのフロントwww',
        permission: [
          'read:account',
          'write:account',
          'read:blocks',
          'write:blocks',
          'read:drive',
          'write:drive',
          'read:favorites',
          'write:favorites',
          'read:following',
          'write:following',
          'read:messaging',
          'write:messaging',
          'read:mutes',
          'write:mutes',
          'write:notes',
          'read:notifications',
          'write:notifications',
          'read:reactions',
          'write:reactions',
          'write:votes',
          'read:pages',
          'write:pages',
          'write:page-likes',
          'read:page-likes',
          'read:user-groups',
          'write:user-groups',
          'read:channels',
          'write:channels',
          'read:registry',
          'write:registry'
        ],
        callbackUrl: location.origin + '/miauth'
      }).then(app => {
        console.log(app)
        os.api('auth/session/generate', { 'appSecret': app.secret }).then(gen => {
          localStorage.setItem('appSecret', app.secret)
          window.open(gen.url, '_blank')
        })
      })
    }
  },
  created() {
    os.api('stats').then(stats => {
      this.stats = stats
    })

    os.api('meta').then(meta => {
      console.log(meta)
      this.meta = meta
    })

    os.api('get-online-users-count').then(res => {
      this.onlineUsersCount = res.count
    })

    os.api('hashtags/list', {
      sort: '+mentionedLocalUsers',
      limit: 8
    }).then(tags => {
      this.tags = tags
    })

    os.api('announcements', {
      limit: 10
    }).then(announcements => {
      this.announcements = announcements
    })

    const image = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/apng',
      'image/vnd.mozilla.apng'
    ]

    os.api('notes/local-timeline', {
      fileType: image,
      excludeNsfw: true,
      limit: 6
    }).then((notes: any[]) => {
      console.log(notes)
      const files = concat(notes.map((n: any): any[] => n.files))
      this.photos = files.filter(f => image.includes(f.type)).slice(0, 6)
    })
  }
})
</script>
