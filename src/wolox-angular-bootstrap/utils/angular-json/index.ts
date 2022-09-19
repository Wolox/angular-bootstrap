import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import {
  Rule,
  SchematicContext,
  SchematicsException,
} from "@angular-devkit/schematics";
import { angularJsonConfigTest } from './constants';

export function angularJson(name: string): Rule {
  return (tree: Tree, _: SchematicContext): Tree => {
    const path = `/${name}/angular.json`;
    if (tree.exists(path)) {
      const file = tree.read(path);
      const angular = JSON.parse(file!.toString());
      const architect = angular.projects[`${name}`].architect;

      architect.test = { ...angularJsonConfigTest };
      _.logger.info(` [] ====== 👷 Update angular json file`);
      tree.overwrite(path, JSON.stringify(angular, null, 2));
      return tree;
    }
    throw new SchematicsException(`Does not exist ${path}.`);
  };
}
