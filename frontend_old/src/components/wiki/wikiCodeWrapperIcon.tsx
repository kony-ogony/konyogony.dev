import {
    SiHtml5,
    SiJavascript,
    SiMdx,
    SiReact,
    SiRust,
    SiTailwindcss,
    SiTypescript,
} from '@vertisanpro/react-icons/si';
import { VscJson, VscSymbolFile, VscTerminal } from '@vertisanpro/react-icons/vsc';

interface WikiCodeWrapperIconProps {
    language: string;
}

interface WikiCodeWrapperIconReturn {
    icon: JSX.Element;
    lang: string;
}

export const wikiCodeWrapperIcon = ({ language }: WikiCodeWrapperIconProps): WikiCodeWrapperIconReturn => {
    switch (language) {
        case 'ts':
            return { icon: <SiTypescript />, lang: 'Typescript' };
        case 'jsx':
        case 'tsx':
            return { icon: <SiReact />, lang: 'React' };
        case 'js':
            return { icon: <SiJavascript />, lang: 'Javascript' };
        case 'rs':
            return { icon: <SiRust />, lang: 'Rust' };
        case 'html':
            return { icon: <SiHtml5 />, lang: 'HTML' };
        case 'mdx':
            return { icon: <SiMdx />, lang: 'MDX' };
        case 'css':
            return { icon: <SiTailwindcss />, lang: 'Tailwind' };
        case 'json':
            return { icon: <VscJson />, lang: 'JSON' };
        case 'bash':
        case 'sh':
            return { icon: <VscTerminal />, lang: 'Terminal' };
        default:
            return { icon: <VscSymbolFile />, lang: 'File' };
    }
};
