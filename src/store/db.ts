import Dexie, { Table } from "dexie";


export type TAccount = { id: string; token: string; host: string };

export class CustomDexie extends Dexie {
  accounts!: Table<TAccount>

  constructor() {
    super('keys')
    this.version(1).stores({accounts: '++id, token, host'})
  }
}

export const db = new CustomDexie()
