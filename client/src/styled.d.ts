import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    button: {
      bgColor: string;
      hoverColor: string;
    };
  }
}
