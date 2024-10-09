import typogrophy from '@tailwindcss/typography';
import svgToDataUri from 'mini-svg-data-uri';
import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
// import colors from 'tailwindcss/colors';
import { default as flattenColorPalette } from 'tailwindcss/lib/util/flattenColorPalette';

export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx,md}'],
    theme: {
        animation: {
            shimmer: 'shimmer 2s linear infinite',
            spotlight: 'spotlight 2s ease .75s 1 forwards',
        },
        keyframes: {
            spotlight: {
                '0%': {
                    opacity: '0%',
                    transform: 'translate(-72%, -62%) scale(0.5)',
                },
                '100%': {
                    opacity: '100%',
                    transform: 'translate(-50%,-40%) scale(1)',
                },
            },
            shimmer: {
                from: {
                    backgroundPosition: '0 0',
                },
                to: {
                    backgroundPosition: '-200% 0',
                },
            },
        },
        extend: {
            animation: {
                'spin-slow': 'spin-slow 3s linear infinite',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            colors: {},
        },
    },
    plugins: [animate, addVariablesForColors, grid, typogrophy],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
    let allColors = flattenColorPalette(theme('colors'));
    let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

    addBase({
        ':root': newVars,
    });
}

function grid({ matchUtilities, theme }: any) {
    matchUtilities(
        {
            'bg-grid': (value: any) => ({
                backgroundImage: `url("${svgToDataUri(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
                )}")`,
            }),
            'bg-grid-small': (value: any) => ({
                backgroundImage: `url("${svgToDataUri(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
                )}")`,
            }),
            'bg-dot': (value: any) => ({
                backgroundImage: `url("${svgToDataUri(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
                )}")`,
            }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' },
    );
}
