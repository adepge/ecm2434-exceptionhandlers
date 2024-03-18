import { create } from "zustand";

type Pin = {
    id: number;
    position: { lat: number; lng: number };
    caption: string;
    image: string;
    datetime: string;
    open: boolean;
    collected: boolean;
}

type pinStore = {
    pins: Pin[];
    setPins: (pins: Pin[]) => void;
    addPin: (pin: Pin) => void;
    removePin: (id: number) => void;
}

type pinId = {
    pinIds: number[];
}

export const usePinStore = create<pinStore>((set) => ({
    pins: [],
    setPins: (pins) => set({pins: pins.map(pin => ({...pin, collected: false}))}),
    addPin: (pin) => set((state) => ({pins: [...state.pins, pin]})),
    removePin: (id) => set((state) => ({pins: state.pins.filter((pin) => pin.id !== id)}))
}));

export const useCollectedPinStore = create<pinId>((set) => ({
    pinIds: [],
    setPinIds: (pinIds: number[]) => set({pinIds: pinIds}),
    addPinId: (id: number) => set((state) => ({pinIds: [...state.pinIds, id]})),
}));