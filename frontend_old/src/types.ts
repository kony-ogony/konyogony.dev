export interface FileInfo {
    name: string;
    folder: string;
    path: string;
    gitPath: string;
    visible?: boolean;
    fallback?: boolean;
}

export interface FileInfoUser {
    path: string;
    visible?: boolean;
    fallback?: boolean;
}

export interface WikiConfig {
    structure: FileInfoUser[];
    scrollToTriggerButton: number;
}

export interface Route {
    path: string;
    element: JSX.Element;
    protected?: boolean;
}
