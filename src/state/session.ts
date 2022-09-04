import type { LiteInstanceMetadata } from "ayuskey.js/built/entities";
import { proxy } from "valtio";

interface ISession {
  meta: LiteInstanceMetadata | null;
}

export const useSession = proxy<ISession>({
    meta: null
})