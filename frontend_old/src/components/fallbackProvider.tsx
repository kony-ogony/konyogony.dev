import React, { createContext, useCallback, useMemo, useState } from 'react';

export const FallbackContext = createContext<{ update: (element: React.ReactNode) => void }>({
    update: () => {},
});

const FallbackProvider = ({ children }: React.PropsWithChildren) => {
    const renderChildren = useMemo(() => children, [children]);
    const [fallback, setFallback] = useState<React.ReactNode>();
    const update = useCallback((element: React.ReactNode) => {
        setFallback(() => element);
    }, []);

    return (
        <FallbackContext.Provider value={{ update }}>
            <React.Suspense fallback={fallback}>{renderChildren}</React.Suspense>
        </FallbackContext.Provider>
    );
};

export default FallbackProvider;
