import { useMemo } from "react"
import { apiClient } from "strictcat"
import { useSnapshot } from "valtio"
import { Schema } from "../models/api"
import { useCommon } from "../state/common"


export const useCustomApi = () => {
  const {host} = useSnapshot(useCommon)
  return useMemo(() => apiClient<Schema>(host || ''), [host])
}
