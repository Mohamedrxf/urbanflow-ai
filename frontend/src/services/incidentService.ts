import { createResourceService } from "./resourceService";

const incidents = createResourceService<number>("/incidents");

export const getIncidents = incidents.list;
export const getIncidentById = incidents.get;
export const createIncident = incidents.create;
