// API type definitions for UrbanFlow AI

export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: 'success' | 'error';
    timestamp: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface ApiError {
    message: string;
    code: string;
    details?: Record<string, unknown>;
}