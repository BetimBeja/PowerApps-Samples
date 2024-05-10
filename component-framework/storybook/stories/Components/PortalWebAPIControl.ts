import resource from "raw-loader!!../../../../portals/PortalWebAPIControl/PortalWebAPIControl/strings/PortalWebAPIControl.1033.resx";
import { generateGetFromResource } from "../getFromResourceGenerator";
export { PortalWebAPIControl } from "../../../../portals/PortalWebAPIControl/PortalWebAPIControl";
export type { IInputs, IOutputs } from "../../../../portals/PortalWebAPIControl/PortalWebAPIControl/generated/ManifestTypes";

export const getFromResource = generateGetFromResource(resource);
