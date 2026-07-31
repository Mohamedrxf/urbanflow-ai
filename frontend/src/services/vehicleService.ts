import { createResourceService } from "./resourceService";

const vehicles = createResourceService<string>("/vehicles");

export const getVehicles = vehicles.list;
export const getVehicle = vehicles.get;
export const createVehicle = vehicles.create;
