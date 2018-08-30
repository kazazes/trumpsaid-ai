import { Response } from "express";

declare interface IAuth0PassportConfig {
  clientId: string;
  domain: string;
  redirectUri: string;
  audience: string;
  responseType: string;
  scope: string;
}

declare interface IVueResponse extends Response {
  renderVue: any;
}
