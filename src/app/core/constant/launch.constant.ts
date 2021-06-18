export type LaunchPlatformType =
  | "AMAZON"
  | "WALMART"
  | "TARGET"
  | "JET"
  | "STAPLES"
  | "PETCO"
  | "EBAY"
  | "other";

export type LaunchPlatformOption = Readonly<{
  title: string;
  type: LaunchPlatformType;
  disabled: boolean;
}>;

export const launchPlanformOptionList: LaunchPlatformOption[] = [
  { title: "AMAZON", type: "AMAZON", disabled: false },
  { title: "WALMART", type: "WALMART", disabled: true },
  { title: "TARGET", type: "TARGET", disabled: true },
  { title: "JET", type: "JET", disabled: true },
  { title: "STAPLES", type: "STAPLES", disabled: true },
  { title: "PETCO", type: "PETCO", disabled: true },
  { title: "EBAY", type: "EBAY", disabled: true },
  { title: "OTHER (please specify)", type: "other", disabled: true },
];
