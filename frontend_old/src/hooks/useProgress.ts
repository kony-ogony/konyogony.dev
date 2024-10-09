import { create } from 'zustand';

export interface ProgressStore {
    continuous: boolean;
    progress?: number;

    startContinuous: () => void;
    setProgress: (progress?: number) => void;
    setComplete: () => void;
}

const useProgress = create<ProgressStore>((set) => ({
    continuous: false,
    progress: undefined,

    startContinuous: () => set({ continuous: true }),
    setProgress: (progress) => set({ progress }),
    setComplete: () =>
        set((state) => ({
            progress: state.progress ? 100 : state.progress,
            continuous: false,
        })),
}));

export default useProgress;
