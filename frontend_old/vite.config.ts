import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react-swc';
import remarkGfm from 'remark-gfm';
import { defineConfig } from 'vite';
import oxlintPlugin from 'vite-plugin-oxlint';

export default defineConfig(() => ({
    server: {
        host: '0.0.0.0',
    },
    plugins: [
        mdx({
            providerImportSource: '@mdx-js/react',
            remarkPlugins: [remarkGfm],
        }),
        react(),
        oxlintPlugin({
            path: 'src',
        }),
    ],
    resolve: {
        alias: { '@': '/src' },
    },
    optimizeDeps: {
        include: ['react/jsx-runtime'],
    },
}));
