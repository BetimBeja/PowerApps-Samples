import resource from "raw-loader!!../../../TableGrid/TableGrid/strings/TableGrid.1033.resx";
import { generateGetFromResource } from "../getFromResourceGenerator";
export { TableGrid } from "../../../TableGrid/TableGrid";
export type { IInputs, IOutputs } from "../../../TableGrid/TableGrid/generated/ManifestTypes";

export const getFromResource = generateGetFromResource(resource);
