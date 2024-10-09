import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UseOpenedFoldersStore {
    openedFolders: { [key: string]: boolean };
    toggleFolder: (folderName: string) => void;
    isFolderOpen: (folderName: string) => boolean;
}

export const useOpenedFolders = create(
    persist<UseOpenedFoldersStore>(
        (set, get) => ({
            openedFolders: {},
            toggleFolder: (folderName) => {
                set((prev) => ({
                    openedFolders: {
                        ...prev.openedFolders,
                        [folderName]: !prev.openedFolders[folderName],
                    },
                }));
            },
            isFolderOpen: (folderName) => {
                return !!get().openedFolders[folderName];
            },
        }),
        {
            name: 'openedFolders',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
