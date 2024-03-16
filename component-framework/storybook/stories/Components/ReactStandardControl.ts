import resource from "raw-loader!!../../../ReactStandardControl/ReactStandardControl/strings/ReactStandardControl.1033.resx";
import { generateGetFromResource } from "../getFromResourceGenerator";
export { ReactStandardControl } from "../../../ReactStandardControl/ReactStandardControl";
export type { IInputs, IOutputs } from "../../../ReactStandardControl/ReactStandardControl/generated/ManifestTypes";

export const getFromResource = generateGetFromResource(resource);
