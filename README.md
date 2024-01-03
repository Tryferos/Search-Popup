# Search Popup Component

[Install the package for npm here.](https://www.npmjs.com/package/@tryferos/search)

[Source code on Github.](https://github.com/Tryferos/Search-Popup)

This is a **react component** delivering a customizable **Search Popup** that you can use in your projects, which also adds **types** support using Typescript.

The project is build using **React, Typescript and Tailwindcss**. Tailwindcss is compiled into css, meaning you do not need it as a depedency.

All files are bundled into 3 seperate files for both cjs, esm and dts using the Rollup bundler. (commonjs, esmodules and declaration for ts types).

## :dart: Features

-   :white_check_mark: Typescript support
-   :white_check_mark: **FULLY** Customizable to your needs
-   :white_check_mark: Opens as a popup.
-   :white_check_mark: Animations.
-   :white_check_mark: Light/dark Mode.
-   :white_check_mark: Recent Searches.
-   :white_check_mark: Keyboard Navigation.

## :electric_plug: Installation

##

Install @tryferos/dropdown using

```bash
  npm install @tryferos/search@1.1.1
```

Remember that you need to have react and react-dom already installed

```bash
  npm install react@^18.0.1 react-dom@^18.0.1
```

This package is build using react 18, you can use with different versions of react at your own risk.

```bash
  npm install @tryferos/search@1.1.1 --force
```

Import the components

```javascript
import { SearchElement } from "@tryferos/search";
```

:speech_balloon: **Options & Types**

```typescript
    placeholder?: string;
    darkMode?: boolean;
    shadow?: boolean;
    promptSize?: string;
    sections: Array<{
        title: string;
        items: Array<{
            content: string;
            title: string;
            href: string;
            icon?: ReactElement | string; //URLS, SVG, SVG Components
        }>;
        icon?: string;
        iconSize?: 'small' | 'medium' | 'large';
    }>;
    highlight?: {
        highlight?: boolean;
        color?: string;
    };
    animation?: {
        animate?: boolean;
        duration?: 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6;
    };
    //Render a different component as a search promp to open the search popup with.
    children?: ReactNode;
    //
    showRecent?: boolean;
    openInNewTab?: boolean;
    onSearch?: (query: string) => void;
    onOpenTrigger?: (isOpen: boolean) => void;
```

## :information_source: Acknowledgements

-   [Heroicons](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
-   [Awesome README](https://github.com/matiassingers/awesome-readme)
