import { Rule, Tree, SchematicContext, SchematicsException } from "@angular-devkit/schematics";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import { dependencies, removeDependencies } from './constants';

export function updatePackageJson(name: string): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    context.addTask(new NodePackageInstallTask());
    const path = `/${name}/package.json`;
    if (tree.exists(path)) {
      const file = tree.read(path);
      const json = JSON.parse(file!.toString());
      
      // Update scripts
      json.scripts = {
        ...json.scripts,
        test: "jest",
      };
  
      // Add pre-commit
      json.husky = {
        hooks: {
          "pre-commit":
            'pretty-quick --staged --pattern "apps/**/**/*.{ts,scss,html}"',
        },
      };

      // Add jest configuration
      // json.jest = jestPackage;

      // Add new dependencies
      json.dependencies = { ...json.dependencies, ...dependencies };

      // Remove dependencies
      removeDependencies.forEach((dependency: string) => delete json.devDependencies[dependency])

      tree.overwrite(path, JSON.stringify(json, null, 2));
      return tree;
    }
    throw new SchematicsException(`Does not exist ${path}.`);
  };
}
