import Dexie, { Table } from "dexie";


export type TAccount = { id: string; token: string };

export class CustomDexie extends Dexie {
  accounts!: Table<TAccount>

  constructor() {
    super('keys')
    this.version(1).stores({accounts: 'id, token'})
  }
}

export const db = new CustomDexie()
