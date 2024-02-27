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
    date: string;
    open: boolean;
}

type pinStore = {
    pins: Pin[];
    setPins: (pins: Pin[]) => void;
    addPin: (pin: Pin) => void;
    removePin: (id: number) => void;
}

export const usePinStore = create<pinStore>((set) => ({
    pins: [
        {
          id: 1,
          position: { lat: 50.735224, lng: -3.536504 },
          caption: "This is what I strive for",
          image: image1,
          date: "2024-02-15T16:53:21",
          open: false,
        },
        {
          id: 2,
          position: { lat: 50.73515821650297, lng: -3.5374750416490075 },
          caption: "Caption 2",
          image: image2,
          date: "2024-02-14T15:23:02",
          open: false,
        },
        {
          id: 3,
          position: { lat: 50.73570670084978, lng: -3.532460585178674 },
          caption: "Caption 3",
          image: image3,
          date: "2024-02-13T09:58:33",
          open: false,
        },
        {
          id: 4,
          position: { lat: 50.73788280412368, lng: -3.530794042942085 },
          caption: "Caption 4",
          image: image3,
          date: "2024-02-13T07:25:41",
          open: false,
        },
        {
          id: 5,
          position: { lat: 50.736341371401544, lng: -3.5391262256961586 },
          caption: "Caption 4",
          image: image3,
          date: "2024-02-13T07:25:41",
          open: false,
        },
        {
          id: 6,
          position: { lat: 50.738038832528616, lng: -3.5306508139149866 },
          caption: "Caption 4",
          image: image3,
          date: "2024-02-13T07:25:41",
          open: false,
        },
        {
          id: 7,
          position: { lat: 50.73782485058377, lng: -3.530022719410907 },
          caption: "Caption 4",
          image: image3,
          date: "2024-02-13T07:25:41",
          open: false,
        },
      ],
    setPins: (pins) => set({pins}),
    addPin: (pin) => set((state) => ({pins: [...state.pins, pin]})),
    removePin: (id) => set((state) => ({pins: state.pins.filter((pin) => pin.id !== id)}))
}));