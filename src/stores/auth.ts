import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthState {
    isAuthenticated: boolean;
    user: {
        id: number;
        nombre: string;
    } | null;
    login: (userData: any) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            login: (userData: any) => {
                set((state) => ({
                    ...state,
                    isAuthenticated: true,
                    user: {
                        id: userData.usuario.id,
                        nombre: userData.usuario.nombre
                    },
                }));
            },
            logout: () => {
                set((state) => ({ ...state, user: null, isAuthenticated: false }));
            },
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
