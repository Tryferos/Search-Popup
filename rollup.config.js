import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import terser from "@rollup/plugin-terser";
import svgr from "@svgr/rollup";

import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";

process.env.NODE_ENV = "production";

export default [
    {
        input: "./src/components/index.ts",
        output: [
            {
                file: "dist/index.cjs",
                format: "cjs",
            },
            {
                file: "dist/index.mjs",
                format: "es",
            },
        ],
        plugins: [
            postcss({
                plugins: [tailwindcss("./tailwind.config.js"), autoprefixer()],
                minimize: true,
                inject: {
                    insertAt: "top",
                },
            }),
            babel({
                babelHelpers: "bundled",
                extensions: [".js", ".jsx", ".ts", ".tsx", ".svg"],
                presets: ["@babel/preset-react"],
                exclude: "node_modules/**",
            }),
            resolve(),
            external(),
            typescript(),
            svgr({ babel: true }),
            terser(),
        ],
    },
    {
        //TYPESCRIPT
        input: "./src/components/index.ts",
        output: [
            {
                file: "dist/index.d.ts",
                format: "es",
            },
        ],
        external: ["react", "react-dom", /\.css$/],
        plugins: [
            babel({
                babelHelpers: "bundled",
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                presets: ["@babel/preset-react", "@babel/preset-typescript"],
                exclude: "node_modules/**",
            }),
            resolve(),
            external(),
            dts(),
        ],
    },
];
