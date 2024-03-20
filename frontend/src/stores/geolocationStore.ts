import { create } from "zustand";

type Position = {
    lat: number;
    lng: number;
}

type positionStore = {
    position: Position;
    setPosition: (lat: number, lng: number) => void;
}

type geoTagStore = {
    geoTag: string;
    setGeoTag: (tag: string) => void;
}

export const usePositionStore = create<positionStore>((set) => ({
    position: {lat: 0, lng: 0},
    setPosition: (lat, lng) => set({position: {lat, lng}})
}));

export const useGeoTagStore = create<geoTagStore>((set) => ({
    geoTag: "Unknown Location",
    setGeoTag: (tag) => set({geoTag: tag})
}));

export const useLastPositionStore = create<positionStore>((set) => ({
    position: {lat: 0, lng: 0},
    setPosition: (lat, lng) => set({position: {lat, lng}})
}));