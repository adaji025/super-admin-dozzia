import { ResponseMeta } from "./utilityTypes"
  
  export type SessionType = {
    session_id: string
    start_year: string
    end_year: string
    is_current: boolean
}
  
export type SessionState = {
    meta: ResponseMeta
    data: SessionType[]
  }