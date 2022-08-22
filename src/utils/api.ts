import {apiClient} from "strictcat"
import { getLocalStorage } from "../store/auth"

export const api = apiClient<Schema>(getLocalStorage("host", ""))
