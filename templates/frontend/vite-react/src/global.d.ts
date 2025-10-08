// SVG modules
declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
  export { ReactComponent };
}

// CSS modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// Regular CSS
declare module "*.css";

// Untyped local modules (if needed)
declare module "@/config";
declare module "@/wallets/web3modal";
declare module "@/components/navigation";