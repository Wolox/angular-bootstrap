import {
  Rule,
  Tree,
  SchematicContext,
  url,
  apply,
  move,
  mergeWith,
} from '@angular-devkit/schematics';

export function replaceFavicon(name: string): Rule {
  return (tree: Tree, _: SchematicContext) => {
    const path = `/${name}/src`;
    const file = `${path}/favicon.ico`;
    if (tree.exists(file)) {
      tree.delete(file);
    }
    _.logger.info(` [] ====== 💄 Replace favicon`);
    return mergeWith(
      apply(url('./utils/replace-files/favicon/files'), [move(path)])
    );
  };
}
