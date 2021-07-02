import {
  TCustomPropObjectTypes,
  TSystemRuleCategory,
  TSystemRuleActions,
  TSystemRuleContext,
} from "../interfaces";

export type TTimeZones =
  | "Pacific/Honolulu"
  | "America/Anchorage"
  | "America/Los_Angeles"
  | "America/Denver"
  | "America/Mazatlan"
  | "America/Phoenix"
  | "America/Belize"
  | "America/Chicago"
  | "America/Mexico_City"
  | "America/Regina"
  | "America/Bogota"
  | "America/Indianapolis"
  | "America/New_York"
  | "America/Caracas"
  | "America/Halifax"
  | "America/St_Johns"
  | "America/Buenos_Aires"
  | "America/Godthab"
  | "America/Santiago"
  | "America/Sao_Paulo"
  | "Atlantic/South_Georgia"
  | "Atlantic/Azores"
  | "Atlantic/Cape_Verde"
  | "UTC"
  | "Atlantic/Reykjavik"
  | "Africa/Casablanca"
  | "Europe/Dublin"
  | "Europe/Belgrade"
  | "Europe/Paris"
  | "Europe/Warsaw"
  | "Africa/Cairo"
  | "Africa/Harare"
  | "Asia/Jerusalem"
  | "Europe/Athens"
  | "Europe/Bucharest"
  | "Europe/Helsinki"
  | "Africa/Nairobi"
  | "Asia/Baghdad"
  | "Asia/Kuwait"
  | "Europe/Minsk"
  | "Europe/Moscow"
  | "Asia/Tehran"
  | "Asia/Baku"
  | "Asia/Muscat"
  | "Asia/Kabul"
  | "Asia/Karachi"
  | "Asia/Yekaterinburg"
  | "Asia/Calcutta"
  | "Asia/Colombo"
  | "Asia/Katmandu"
  | "Asia/Almaty"
  | "Asia/Dhaka"
  | "Asia/Rangoon"
  | "Asia/Bangkok"
  | "Asia/Krasnoyarsk"
  | "Asia/Hong_Kong"
  | "Asia/Irkutsk"
  | "Asia/Kuala_Lumpur"
  | "Asia/Taipei"
  | "Australia/Perth"
  | "Asia/Seoul"
  | "Asia/Tokyo"
  | "Asia/Yakutsk"
  | "Australia/Adelaide"
  | "Australia/Darwin"
  | "Asia/Vladivostok"
  | "Australia/Brisbane"
  | "Australia/Hobart"
  | "Australia/Sydney"
  | "Pacific/Guam"
  | "Pacific/Noumea"
  | "Pacific/Auckland"
  | "Pacific/Fiji"
  | "Pacific/Apia"
  | "Pacific/Tongatapu";

export type TDaysOfMonth =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

export type TDaysOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type TRepeatOptions =
  | "Once"
  | "Minute"
  | "Hourly"
  | "Daily"
  | "Weekly"
  | "Monthly";

export interface IUserUpdate {
  id: string;
  tags?: string[];
  customProperties?: string[];
  name?: string;
  roles?: string[];
}

export interface IUserCreate {
  userId: string;
  userDirectory: string;
  name?: string;
  roles?: string[];
}

export interface ICustomPropertyCreate {
  name: string;
  description?: string;
  choiceValues?: string[];
  objectTypes?: TCustomPropObjectTypes[];
  valueType?: string;
}

export interface ICustomPropertyUpdate extends ICustomPropertyCreate {
  id: string;
}

export interface IAppUpdate {
  id: string;
  name?: string;
  description?: string;
  tags?: string[];
  customProperties?: string[];
  owner?: string;
  stream?: string;
}

export interface IStreamCreate {
  name: string;
  tags?: string[];
  customProperties?: string[];
  owner?: string;
}

export interface IStreamUpdate {
  id: string;
  name?: string;
  tags?: string[];
  customProperties?: string[];
  owner?: string;
}

export interface IContentLibraryUpdate {
  id: string;
  tags?: string[];
  customProperties?: string[];
  owner?: string;
}

export interface IExtensionUpdate {
  id: string;
  tags?: string[];
  customProperties?: string[];
  owner?: string;
}

export interface IExtensionImport {
  file: Buffer;
  password?: string;
}

export interface ISystemRuleCreate {
  name: string;
  category: TSystemRuleCategory;
  rule: string;
  resourceFilter: string;
  context?: TSystemRuleContext;
  actions: TSystemRuleActions[];
  comment?: string;
  disabled?: boolean;
  tags?: string[];
  customProperties?: string[];
}

export interface ISystemRuleUpdate {
  id: string;
  name?: string;
  category?: TSystemRuleCategory;
  rule?: string;
  resourceFilter?: string;
  context?: TSystemRuleContext;
  actions?: TSystemRuleActions[];
  comment?: string;
  disabled?: boolean;
  tags?: string[];
  customProperties?: string[];
}

export interface ITaskCreate {
  name: string;
  appId: string;
  tags?: string[];
  customProperties?: string[];
}

export interface ITaskCreateTriggerComposite {
  taskId: string;
  triggerName: string;
  eventTaskId: string;
  state: "success" | "fail";
}

export interface ITaskCreateTriggerSchema {
  reloadTaskId: string;
  name: string;
  repeat?: TRepeatOptions;
  repeatEvery?: number;
  startDate?: string;
  expirationDate?: string;
  daysOfWeek?: TDaysOfWeek;
  daysOfMonth?: TDaysOfMonth;
  timeZone?: TTimeZones;
  daylightSavingTime?: boolean;
}

interface ITableColumnBase {
  columnType: string;
  definition: string;
  name?: string;
}

interface ITableColumn {
  columnType: string;
  definition: string;
  name?: string;
  list?: ITableColumnBase[];
}

export interface ITableCreate {
  type: string;
  columns: ITableColumn[];
  filter?: string;
  skip?: number;
  take?: number;
  sortColumn?: string;
  orderAscending?: boolean;
}
