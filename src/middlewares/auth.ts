import type { UserDetailed } from "ayuskey.js/built/entities";
import { db, TAccount } from "../state/db";
import { getLocalStorage } from "../utils/storage";


export async function getLogin() {
    const useAccount = getLocalStorage<UserDetailed | null>(
      "_account",
      null,
      true,
    );
    if (!useAccount) return null
    const _account  = await getAccount(useAccount.id) || null;
    return _account
  }


export const getCurrentAccount = () => {
    return getLocalStorage<UserDetailed | null>(
        "_account",
        null,
        true,
      );

}

export const addAccount = async (account: TAccount): Promise<void> => {
	await db.accounts.add(account);
};

export const getAccount = async (userId?: string): Promise<
	TAccount | undefined
> => {
    if (userId) return await db.accounts.get({ id: userId });
};
