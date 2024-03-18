import { create } from "zustand";

type adminStore = {
    isAdmin: boolean;
    setAdmin: (admin: boolean) => void;
}

export const useAdminStore = create<adminStore>((set) => ({
    isAdmin: false,
    setAdmin: (admin) => set({isAdmin: admin})
}));