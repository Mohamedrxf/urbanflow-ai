// Common type definitions for UrbanFlow AI

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
    field: keyof T;
    direction: SortDirection;
}

export interface FilterConfig {
    search?: string;
    filters?: Record<string, unknown>;
}