/// <reference types="vite/client" />

declare module "*.pl?raw" {
  const content: string;
  export default content;
}
