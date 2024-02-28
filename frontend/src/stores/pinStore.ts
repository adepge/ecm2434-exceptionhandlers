import { create } from "zustand";

// Placeholder imports
const image1 =
  "https://cdn.discordapp.com/attachments/1204728741230809098/1207497297022160978/1000016508.JPG?ex=65dfdc7d&is=65cd677d&hm=295b9625886c4e12ea212d291878bb71d37e22a31d71e5757546d0a4a0a1bdb4&";
const image2 =
  "https://cdn.discordapp.com/attachments/1204728741230809098/1207497297961943050/1000015958.JPG?ex=65dfdc7e&is=65cd677e&hm=6413142376bf1efe664ef897cd70325b1f5f2d03e9d177ab4b9c541a5fb1de59&";
const image3 =
  "https://cdn.discordapp.com/attachments/1204728741230809098/1207497298116874311/1000016354.JPG?ex=65dfdc7e&is=65cd677e&hm=e497673ab0de533871fc5fb4bb6e702ce4fbaa856f99461dc3abf555c6f0d510&";

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