import {useQueryStates,parseAsInteger,parseAsString} from "nuqs"
import { DEFAULT_PAGE } from "../constants"


export const useAgentParams = ()=>{
    return  useQueryStates({
        page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({clearOnDefault:true}),
        search: parseAsString.withDefault("").withOptions({clearOnDefault:true})
    })
}