# Sprint 5 – Authentication

## Sprint Objective

Implement a complete authentication system for UrbanFlow AI, including backend JWT-based auth, password hashing, user management APIs, and frontend login, registration, protected routes, and persistent sessions.

## Scope Completed

- Backend user model, schemas, and repository
- Password hashing and JWT token utilities
- Authentication service layer
- Authentication REST API endpoints
- Frontend auth services, hooks, and login page
- Protected routes with persistent authentication

## Backend Architecture

### User ORM Model

- `backend/models/user.py`
- SQLAlchemy `User` model with table name `users`
- Fields: `id`, `username`, `email`, `hashed_password`, `full_name`, `role`, `is_active`, `created_at`

### User Schemas

- `backend/schemas/user.py`
- Pydantic v2 models: `UserBase`, `UserCreate`, `UserLogin`, `UserResponse`
- `ConfigDict(from_attributes=True)` enabled on `UserResponse`

### User Repository

- `backend/repositories/user_repository.py`
- Methods: `get_by_email()`, `get_by_username()`, `create()`

### Password & JWT Utilities

- `backend/core/security.py` — `hash_password()`, `verify_password()` using `passlib` with `bcrypt`
- `backend/core/jwt.py` — `create_access_token()`, `verify_access_token()` using `python-jose`
- Reads `SECRET_KEY`, `ALGORITHM`, and `ACCESS_TOKEN_EXPIRE_MINUTES` from settings with fallback defaults

### Authentication Service

- `backend/services/auth_service.py`
- `AuthService` class with:
  - `register_user()` — hashes password and saves user
  - `authenticate_user()` — verifies credentials and returns JWT access token

### Authentication API

- `backend/api/auth.py`
- `POST /auth/register` — registers new users, checks for duplicate email/username
- `POST /auth/login` — authenticates user, returns `{ access_token, token_type }`
- `GET /auth/me` — returns current user from valid JWT token

## Frontend Architecture

### Auth Service

- `frontend/src/services/authService.ts`
- API wrappers: `login()`, `register()`, `getCurrentUser()`

### Auth Hook

- `frontend/src/hooks/useAuth.ts`
- `useAuth` hook providing:
  - `handleLogin()` — authenticates user, stores JWT
  - `handleRegister()` — registers new user
  - `handleGetCurrentUser()` — fetches current user
  - `logout()` — removes token and redirects to `/login`
  - `isAuthenticated()` — checks for stored token
  - `user` state — current authenticated user
  - `initializing` state — tracks auth initialization

### Persistent Authentication

- `useAuth` initializes on mount by reading JWT from `localStorage`
- If token exists, calls `getCurrentUser()` to restore authenticated user
- If validation fails, removes token and clears auth state
- User remains authenticated across browser refreshes

### Protected Routes

- `frontend/src/routes/ProtectedRoute.tsx`
- Uses `useAuth().isAuthenticated()` to guard routes
- Redirects unauthenticated users to `/login`
- Dashboard route is protected; Login route remains public

### Login Page

- `frontend/src/pages/Login.tsx`
- Username/password form
- Uses `useAuth` for login handling
- Redirects to original destination after login

## Files Created

- `backend/models/user.py`
- `backend/schemas/user.py`
- `backend/repositories/user_repository.py`
- `backend/core/security.py`
- `backend/core/jwt.py`
- `backend/services/auth_service.py`
- `backend/api/auth.py`
- `frontend/src/services/authService.ts`
- `frontend/src/hooks/useAuth.ts`
- `frontend/src/routes/ProtectedRoute.tsx`
- `frontend/src/pages/Login.tsx`

## Files Modified

- `backend/main.py` — registered auth router
- `frontend/src/routes/index.tsx` — added Login route and protected Dashboard with ProtectedRoute
- `frontend/src/pages/index.ts` — exported Login

## Technical Decisions

- Passwords are never stored; only `hashed_password` is persisted
- JWT tokens are stateless and expire after `ACCESS_TOKEN_EXPIRE_MINUTES`
- Authentication state is stored in `localStorage` for persistence
- Frontend uses React hooks for auth state management
- Protected routes are implemented at the router level using React Router
- Duplicate email and username checks prevent registration conflicts
- `getCurrentUser()` is called after login to restore full user context

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Authenticate user, return JWT |
| GET | `/auth/me` | Get current authenticated user |

## Validation

- TypeScript: Passed
- Build: Passed

## Folder Structure Added

```
backend/
├── core/
│   ├── security.py
│   └── jwt.py
├── models/
│   └── user.py
├── repositories/
│   └── user_repository.py
├── schemas/
│   └── user.py
├── services/
│   └── auth_service.py
└── api/
    └── auth.py

frontend/src/
├── hooks/
│   └── useAuth.ts
├── pages/
│   └── Login.tsx
├── routes/
│   ├── ProtectedRoute.tsx
│   └── index.tsx
└── services/
    └── authService.ts
```

## Known Limitations

- No email verification flow
- No password reset functionality
- No role-based access control (RBAC) in API routes
- JWT refresh tokens not implemented
- Frontend does not validate JWT expiry proactively
- No rate limiting on authentication endpoints
- Registration and login forms are basic without client-side validation beyond required fields

## Next Sprint

Sprint 6 – User Management & Roles
