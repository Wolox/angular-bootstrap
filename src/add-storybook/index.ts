import {
    Rule,
    Tree,
    SchematicContext,
    url,
    apply,
    move,
    mergeWith,
    MergeStrategy,
    chain,
} from '@angular-devkit/schematics';
import { updatePackageJsonSB } from './utils/package-json';

export function storybook({project}: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const sourceTemplatesSB = url('./files/global');
    const sourceExampleSB = url('./files/example');
    const pathRoot = `./${project}/`;
    const sourceStorybookTemplates = apply(sourceTemplatesSB, [
        move(pathRoot),
    ]);
    const sourceStorybookExamples = apply(sourceExampleSB, [
      move(`${pathRoot}/src/`),
  ]);
    const mergeSBTemplates = mergeWith(sourceStorybookTemplates, MergeStrategy.Overwrite) as Rule; 
    const mergeSBExamples = mergeWith(sourceStorybookExamples, MergeStrategy.Overwrite) as Rule; 

    const rule = chain([
      mergeSBTemplates,
      mergeSBExamples,
      updatePackageJsonSB(project)
    ]);

    return rule(tree, _context);
  };
}
