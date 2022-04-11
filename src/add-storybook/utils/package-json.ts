import { Rule, SchematicContext, SchematicsException, Tree } from "@angular-devkit/schematics";
import { scripts, dependencies} from './constants';

export function updatePackageJsonSB(name: string): Rule {
    return (tree: Tree, _context: SchematicContext): Tree => {
        const path = `./${name}/package.json`;
        if (tree.exists(path)) {
            const file = tree.read(path);
            const json = JSON.parse(file!.toString());

            // Update scripts
            json.scripts = {
                ...json.scripts,
                ...scripts
            };

            // Add new dependencies
            json.devDependencies = { ...json.devDependencies, ...dependencies };

            tree.overwrite(path, JSON.stringify(json, null, 2));
            _context.logger.info(`
All @angular-storybook dependencies have been successfully installed 📦️ ✨
Please see https://storybook.js.org/docs/angular/get-started/introduction for how to add Storybooks to your project.
            `);
            return tree;
        }
        throw new SchematicsException(`Does not exist ${path}.`);
    };
}
