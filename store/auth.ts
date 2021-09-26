import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({stateFactory: true, namespaced: true, name: 'i'})
export default class Auths extends VuexModule {
  i: {} = {}

  @Mutation
  private login(meta: {}) {
    this.i = meta
  }
}

