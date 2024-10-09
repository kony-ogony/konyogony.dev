import { useState } from 'react';

export const useHeadings = () => {
    const [headings, setHeadings] = useState<({ text: string; level: number } | null)[]>([]);

    return {
        headings,
        setHeadings,
    };
};
