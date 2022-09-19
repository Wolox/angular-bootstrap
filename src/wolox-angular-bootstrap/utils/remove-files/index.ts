import { Rule, Tree, SchematicContext } from "@angular-devkit/schematics";

const karmaFilesPaths = [
  "./karma.conf.js"
];

export function removeKarma(name: string): Rule {
  return (tree: Tree, _: SchematicContext): Tree => {
    karmaFilesPaths.forEach((file) => {
      const path = `/${name}/${file}`;
      if (tree.exists(path)) {
        tree.delete(path);
      }
    });

    _.logger.info(` [] ====== 🗑️ Remove karma configuration`);
    return tree;
  };
}
