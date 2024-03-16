import resource from "raw-loader!!../../../TableControl/TableControl/strings/TableControl.1033.resx";
import { generateGetFromResource } from "../getFromResourceGenerator";
export { TableControl } from "../../../TableControl/TableControl";
export type { IInputs, IOutputs } from "../../../TableControl/TableControl/generated/ManifestTypes";

export const getFromResource = generateGetFromResource(resource);
