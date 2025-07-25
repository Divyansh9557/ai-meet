import {useQueryStates,parseAsInteger,parseAsString, parseAsStringEnum} from "nuqs"
import { DEFAULT_PAGE } from "../constants"
import { MeetingStatus } from "@/modules/meetings/Types"


export const useAgentParams = ()=>{
    return  useQueryStates({
        page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({clearOnDefault:true}),
        search: parseAsString.withDefault("").withOptions({clearOnDefault:true}),
        status: parseAsStringEnum(Object.values(MeetingStatus)),
        agentId: parseAsString.withDefault("").withOptions({clearOnDefault:true}),
    })
}