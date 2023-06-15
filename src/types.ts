export enum ButtonShape {
  CIRCLE = "circle",
  RECTANGLE = "rectangle",
}

export enum Page {
  HOME = "/",
  SELECT_MODEL = "/select-model",
  CUSTOMIZE_DESIGN = "/customize-design",
  NAME_YOUR_ROBOT = "/name-your-robot",
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

export enum RobotModelType {
  SMART_DRONE = "SmartDrone",
  PROBE = "Probe",
  PENGUIN = "Penguin",
}

export enum RobotColor {
  YELLOW = "Yellow",
  BLUE = "Blue",
  WHITE = "White",
  GREEN = "Green",
  BLACK = "Black",
  RED = "Red",
}

export interface KaKaoLoginUser {
  about_me: string;
  address: string;
  created_at: string;
  current_location: string;
  display_name: string;
  email: string;
  last_sign_in_at: string;
  modified_at: string;
  name: {
    given_name: string;
    family_name: string;
    formatted: string;
  };
  photos: string[];
  preferred_username: string;
  profile_url: string;
  project_id: string;
  uid: string;
}
