import { createLoader, parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";
import { DEFAULT_PAGE } from "../constants";
import { MeetingStatus } from "@/modules/meetings/Types";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
 const coordinatesSearchParams = {
  page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({ clearOnDefault: true }),
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  status: parseAsStringEnum(Object.values(MeetingStatus)),
  agentId: parseAsString.withDefault("").withOptions({clearOnDefault:true}),
};

export const loadSearchParams = createLoader(coordinatesSearchParams);
