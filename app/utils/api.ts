import { apiClient } from "strictcat";
import type { Schema } from "~/models/api";

export const api = apiClient<Schema>(process.env.INSTANCE_URL || '')
