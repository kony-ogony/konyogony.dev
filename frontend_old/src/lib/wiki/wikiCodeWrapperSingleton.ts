import { BundledLanguage, BundledTheme, createHighlighter, HighlighterGeneric } from 'shiki';

export class wikiCodeWrapperSingleton {
    private static instancePromise: Promise<HighlighterGeneric<BundledLanguage, BundledTheme>> | null = null;

    private static createInstance = () => {
        wikiCodeWrapperSingleton.instancePromise = createHighlighter({
            themes: ['github-dark-dimmed'],
            langs: ['ts', 'tsx', 'jsx', 'rs', 'html', 'mdx', 'bash', 'sh', 'js', 'css'],
        })
            .then((instance) => {
                return instance;
            })
            .catch((e) => {
                console.error('Error creating highlighter instance:', e);
                wikiCodeWrapperSingleton.instancePromise = null;
                throw e;
            });

        return wikiCodeWrapperSingleton.instancePromise;
    };

    private constructor() {}

    public static getInstance = async () => {
        if (!wikiCodeWrapperSingleton.instancePromise) {
            await wikiCodeWrapperSingleton.createInstance();
        }
        return wikiCodeWrapperSingleton.instancePromise;
    };
}

// I can change this later to be a hook, but for now it's fine
