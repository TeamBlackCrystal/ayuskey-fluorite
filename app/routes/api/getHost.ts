import type { ActionFunction } from "@remix-run/node";
import { json } from "remix-utils";

export const action: ActionFunction = () => {
    return json({host: process.env.INSTANCE_URL})
}