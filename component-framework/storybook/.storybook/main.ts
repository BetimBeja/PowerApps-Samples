import type { StorybookConfig } from "@storybook/html-webpack5";
import path  from 'path';
import webpack from "webpack";

const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-babel",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/html-webpack5",
    options: {},
  },
  staticDirs: ['./public'],
  webpackFinal: async (config) => {
    config.devtool = false;
    if (config.resolve) {
      config.resolve.fallback = config.resolve.fallback || {};
      config.resolve.fallback["fs"] = false;
      config.resolve.alias = config.resolve.alias || {};
      config.resolve.alias['react'] = path.resolve('./node_modules/react');
      config.resolve.alias['react-dom'] = path.resolve('./node_modules/react-dom');
    }

    if (config.module && config.module.rules)
      config.module.rules.forEach((rule) => {
        if (rule && rule["test"] && "a.tsx".match(rule["test"])) {
          //console.log(rule.use);
          rule["use"] = [
            {
              loader: "esbuild-loader",
              options: {
                loader: "tsx",
                // Or 'ts' if you don't need tsx
                target: "es2015",
              },
            },
          ];
        }
      });

    if (config.plugins)
      config.plugins.push(
        new webpack.SourceMapDevToolPlugin({
          append: "\n//# sourceMappingURL=[url]",
          fileContext: "./",
          filename: "[file].map",
        })
      );
    return config;
  },
};
export default config;
