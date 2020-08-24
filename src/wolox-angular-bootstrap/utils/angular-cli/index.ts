import { Rule, externalSchematic } from "@angular-devkit/schematics";
import { options } from "./constants";

export function schematicAngularCLI(name: string): Rule {
  return externalSchematic("@schematics/angular", "ng-new", {
    name,
    directory: name,
    ...options,
  });
}
