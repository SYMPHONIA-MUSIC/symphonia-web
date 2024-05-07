import React, {createContext, ReactNode, useContext, useState} from 'react';

export type CurrentMusicInfo = {
    musicId: string;
    title: string;
    photo: string;
    durationInSeconds: number;
    artistName: string;
    artistId: string;
}

export type MusicPlayer = {
    isPlaying: boolean;
    currentMusic: CurrentMusicInfo | null;
    prevMusicIds: string[];
    nextMusicIds: string[];
}

export interface MusicPlayerContextInterface {
    musicPlayerContext: MusicPlayer;
    playNewMusic: (currentMusic: CurrentMusicInfo, prevMusicIds: string[], nextMusicIds: string[]) => void;
    stopPlaying: () => void,
    startPlaying: () => void,
    nextMusic: () => void,
    prevMusic: () => void,
}

const defaultMusicPlayer: MusicPlayer = {
    isPlaying: false,
    currentMusic: null,
    prevMusicIds: [],
    nextMusicIds: [],
}

const defaultState: MusicPlayerContextInterface = {
    musicPlayerContext: defaultMusicPlayer,
    playNewMusic: (currentMusic: CurrentMusicInfo, prevMusicIds: string[], nextMusicIds: string[]) => {},
    stopPlaying: () => {},
    startPlaying: () => {},
    nextMusic: () => {},
    prevMusic: () => {},
}

export const MusicPlayerContext = createContext(defaultState);

type MusicPlayerProviderProps = {
    children: ReactNode;
}

export function MusicPlayerProvider({children} : MusicPlayerProviderProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMusic, setCurrentMusic] = useState<CurrentMusicInfo | null>(null);
    const [prevMusicIds, setPrevMusicIds] = useState<string[]>([]);
    const [nextMusicIds, setNextMusicIds] = useState<string[]>([]);

    const playNewMusic = (currentMusic: CurrentMusicInfo, prevMusicIds: string[], nextMusicIds: string[]) => {
        setIsPlaying(true);
        setCurrentMusic(currentMusic);
        setPrevMusicIds(prevMusicIds);
        setNextMusicIds(nextMusicIds);
    }

    const stopPlaying = () => {
        setIsPlaying(false);
    }

    const startPlaying = () => {
        setIsPlaying(true);
    }

    const nextMusic = () => {
        if (nextMusicIds.length === 0) {
            // Если список следующих песен пуст, начинаем воспроизведение текущей песни заново
            setCurrentMusic(currentMusic); // Тут можно обновить логику, если нужно начинать с начала трека
        } else {
            // В противном случае, пока оставим пустым
            // TODO: Реализовать переход к следующей песне
        }
    }

    const prevMusic = () => {
        if (prevMusicIds.length === 0) {
            // Если список предыдущих песен пуст, начинаем воспроизведение текущей песни заново
            setCurrentMusic(currentMusic); // Тут можно обновить логику, если нужно начинать с начала трека
        } else {
            // В противном случае, пока оставим пустым
            // TODO: Реализовать переход к предыдущей песне
        }
    }

    const musicPlayerContext: MusicPlayer = {
        isPlaying,
        currentMusic,
        prevMusicIds,
        nextMusicIds,
    }

    return (
        <MusicPlayerContext.Provider value={{ musicPlayerContext, playNewMusic, stopPlaying, startPlaying, nextMusic, prevMusic }}>
            {children}
        </MusicPlayerContext.Provider>
    )
}

export function useMusic() {
    return useContext(MusicPlayerContext)
}

