import { createResourceService } from "./resourceService";

const traffic = createResourceService<number>("/traffic");

export const getTraffic = traffic.list;
export const getTrafficById = traffic.get;
export const createTraffic = traffic.create;
