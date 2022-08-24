import { UserDetailed } from "@ayuskey/misskey.js/built/entities";
import { useEffect, useMemo, useState } from "react";
import { getAccount } from "../middlewares/auth";
import { getLocalStorage } from "../store/auth";
import { TAccount } from "../store/db";

export async function useLogin() {
  const useAccount = getLocalStorage<UserDetailed | null>(
    "_account",
    null,
    true,
  );
  if (!useAccount) return undefined
  const _account  = await getAccount(useAccount.id) || null;
  return _account
}
