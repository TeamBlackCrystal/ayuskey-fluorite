import { UserDetailed } from "ayuskey.js/built/entities";
import { getAccount } from "../middlewares/auth";
import { getLocalStorage } from "../utils/storage";

export async function useLogin() {
  const useAccount = getLocalStorage<UserDetailed | null>(
    "_account",
    null,
    true,
  );
  if (!useAccount) return null
  const _account  = await getAccount(useAccount.id) || null;
  return _account
}
