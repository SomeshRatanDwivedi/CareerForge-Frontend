export const toLabel = (key: string) =>
  key
    .replace(/([A-Z])/g, ' $1')   // split camelCase
    .replace(/^./, s => s.toUpperCase());