
import { proxy } from "valtio";
import { getLogin } from "../middlewares/auth";

export const useAuth = proxy({
	account: getLogin().then((res) => res),
});

