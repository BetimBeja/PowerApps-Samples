import resource from "raw-loader!!../../../WebAPIControl/WebAPIControl/strings/WebAPIControl.1033.resx";
import { generateGetFromResource } from "../getFromResourceGenerator";
export { WebAPIControl } from "../../../WebAPIControl/WebAPIControl";
export type { IInputs, IOutputs } from "../../../WebAPIControl/WebAPIControl/generated/ManifestTypes";

export const getFromResource = generateGetFromResource(resource);
