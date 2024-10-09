import { WikiConfig } from '@/types';

export const wikiConfig: WikiConfig = {
    structure: [
        {
            path: 'about',
            fallback: true,
            visible: true,
        },
        {
            path: 'behind-the-scenes/commit-guidelines',
        },
        {
            path: 'behind-the-scenes/custom-wiki',
        },
        {
            path: 'all-about-arch/installing-arch',
        },
    ],
    scrollToTriggerButton: 500,
} as const;

// This could be done in a much better way but the I wouldbe just overcomplicating stuff.
