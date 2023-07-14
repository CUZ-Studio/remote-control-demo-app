export enum ControlPanelEvent {
  MOVE_LEFT = "move-left",
  MOVE_RIGHT = "move-right",
  JUMP = "jump",
  FIRE = "fire",
}

export enum TimeSchedule {
  COUNTDOWN = "countdown",
  GAMING = "gaming",
  RESTTIME = "resttime",
}

export enum Page {
  HOME = "/",
  SELECT_MODEL = "/select-model",
  CUSTOMIZE_DESIGN = "/customize-design",
  NAME_YOUR_ROBOT = "/name-your-robot",
  START_YOUR_JOURNEY = "/start-your-journey",
  WAITING_ROOM = "/waiting-room",
  GOING_TO_HANGAR = "/going-to-hangar",
  VERIFY = "/verify",
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

export enum RobotMotion {
  IDLE = "idle",
  ACTION = "Action",
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

export enum Swit_Developer_User_ID {
  GODA = "230601014915056C9is",
  GUNI = "230601014947964vEW6",
  SAM = "210625025348065GqTl",
}

export enum Slack_Developer_User_ID {
  GODA = "U05FLKVPZMF",
  GUNI = "U05F81CPXRQ",
  SAM = "U03QK3Q34G6",
}

export interface PinNumberError {
  message: PinNumberErrorMessage | undefined;
  type: PinNumberErrorType | undefined;
}

export enum PinNumberErrorType {
  WRONG_NUMBER = "wrongNumber",
  PREVIOUS_NUMBER = "previousNumber",
}

export enum PinNumberErrorMessage {
  WRONG_NUMBER = "틀린 코드입니다. 30초 후에 다시 시도하세요.",
  PREVIOUS_NUMBER = "이전코드를 선택하셨습니다. 다시 선택해주세요.",
}

export enum HeaderType {
  WITH_LOGOUT = "withLogout",
  WITH_PROFILE = "withProfile",
}
