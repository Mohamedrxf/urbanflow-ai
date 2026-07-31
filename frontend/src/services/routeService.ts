import { createResourceService } from "./resourceService";

const routes = createResourceService<string>("/routes");

export const getRoutes = routes.list;
export const getRoute = routes.get;
export const createRoute = routes.create;
