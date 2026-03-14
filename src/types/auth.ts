export const ERole = {
    CUSTOMER: 'CUSTOMER',
    SELLER: 'SELLER',
    ADMIN: 'ADMIN'
} as const;

export type ERole = typeof ERole[keyof typeof ERole];

// Login
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    userRole: ERole;
    csrfToken: string;
}

//Logout