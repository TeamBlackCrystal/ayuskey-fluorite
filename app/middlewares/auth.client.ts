import type { UserDetailed } from "ayuskey.js/built/entities";
import { isBrowser } from "~/const";
import type { TAccount } from "~/state/db";
import { db } from "~/state/db";
import { getLocalStorage } from "~/utils/storage.client";

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
    if (isBrowser) {
    return getLocalStorage<UserDetailed | null>(
        "_account",
        null,
        true,
      );
    }
    return null
}

export const addAccount = async (account: TAccount): Promise<void> => {
    if (isBrowser) {
	await db.accounts.add(account);
    }
};

export const getAccount = async (userId?: string): Promise<
	TAccount | undefined
> => { 
    if (isBrowser && userId) return await db.accounts.get({ id: userId });
};
