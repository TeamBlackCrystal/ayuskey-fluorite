import {apiClient} from "strictcat"
import { Schema } from "../models/api"
import { getLocalStorage } from "./storage"

export const api = apiClient<Schema>(getLocalStorage("_host", ""))
