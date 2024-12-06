declare namespace IslandCopyNamespace {
    export interface IIslandCopyScss {
      islandCopyContainer: string;
      islandRow: string;
      islandRowLabel: string;
      invert: string;
      noInvert: string;
      valueSubTextContainer: string;
      valueContainer: string;
      subTextContainer: string;
    }
  }

declare const IslandCopyScssModule: IslandCopyNamespace.IIslandCopyScss & {
    /** WARNING: Only available when "css-loader" is used without "style-loader" or "mini-css-extract-plugin" */
    locals: IslandCopyNamespace.IIslandCopyScss;
  };

  export = IslandCopyScssModule;
