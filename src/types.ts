export enum ButtonShape {
  CIRCLE = "circle",
  RECTANGLE = "rectangle",
}

export enum Page {
  HOME = "/",
  PLAY = "/play",
}

export enum REMOTE_CONTROL_API_ACCESS_TYPE {
  READ_ACCESS = "READ_ACCESS",
  WRITE_ACCESS = "WRITE_ACCESS",
  WRITE_TRANSACTION_ACCESS = "WRITE_TRANSACTION_ACCESS",
}

export type Status = "idle" | "loading" | "failed";

export type API_METHOD = "PUT" | "POST" | "DELETE" | "READ";
export interface SingleRequestForLock {
  objectPath: string;
  propertyName: string;
  access: REMOTE_CONTROL_API_ACCESS_TYPE.READ_ACCESS;
}
