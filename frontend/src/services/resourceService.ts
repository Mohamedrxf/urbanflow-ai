import api from "./api";

export function createResourceService<Key extends string | number>(basePath: string) {
  return {
    list: () => api.get(basePath),
    get: (key: Key) => api.get(`${basePath}/${key}`),
    create: (data: unknown) => api.post(basePath, data),
  };
}
