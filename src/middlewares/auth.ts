import { db, TAccount } from "../store/db";

export const addAccount = async (account: TAccount): Promise<void> => {
	await db.accounts.add(account);
};

export const getAccount = async (userId: string): Promise<
	TAccount | undefined
> => {
	return await db.accounts.get({ id: userId });
};

export const deleteAccount = async (userId: string): Promise<void> => {
	await db.accounts.delete(userId);
};
