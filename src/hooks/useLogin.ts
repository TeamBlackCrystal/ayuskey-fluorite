import { UserDetailed } from "@ayuskey/misskey.js/built/entities";
import { getAccount } from "../middlewares/auth";
import { getLocalStorage } from "../store/auth";

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
