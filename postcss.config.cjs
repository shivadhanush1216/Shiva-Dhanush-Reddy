// CommonJS PostCSS config for Tailwind under a "type": "module" project.
// Using .cjs ensures Vite/PostCSS loaders treat this as CJS where needed.
module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};
