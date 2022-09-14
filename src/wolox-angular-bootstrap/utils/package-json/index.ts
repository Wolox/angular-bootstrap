import {
  Rule,
  Tree,
  SchematicContext,
  SchematicsException,
  chain,
} from '@angular-devkit/schematics';
import {
  dependencies,
  devDependencies,
  staticDependencies,
  removeDependencies,
} from './constants';
import { get } from 'https';

import { concat, Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

export interface NodePackage {
  name: string;
  version: string;
}

export function removePackages(name: string): Rule {
  return (tree: Tree, _context: SchematicContext): Tree => {
    const path = `/${name}/package.json`;
    const json = readJsonFile(tree, path);

    if (json) {
      // Update scripts
      json.scripts = {
        ...json.scripts,
        test: 'jest',
      };

      // Add static dependencies
      json.dependencies = { ...json.dependencies, ...staticDependencies };

      // Add new devDependencies
      json.devDependencies = { ...json.devDependencies, ...devDependencies };

      // Remove dependencies
      removeDependencies.forEach(
        (dependency: string) => delete json.devDependencies[dependency]
      );

      tree.overwrite(path, JSON.stringify(json, null, 2));
      return tree;
    }
    throw new SchematicsException(`Does not exist ${path}.`);
  };
}

export function updatePackageJson(name: string): Rule {
  return chain([removePackages(name), addPackages(name)]);
}

function addPackages(name: string): Rule {
  const path = `/${name}/package.json`;
  return (tree: Tree, context: SchematicContext): Observable<Tree> => {
    const newDependencies = of(...dependencies).pipe(
      concatMap((packageName: any) => getLatestNodeVersion(packageName)),
      map((packageFromRegistry: NodePackage) => {
        const { name, version } = packageFromRegistry;
        context.logger.debug(`Adding ${name}:${version} to Dev Dependencies`);
        addPackageJsonDependency(tree, name, version, path);
        return tree;
      })
    );
    return concat(newDependencies);
  };
}

/**
 * Attempt to retrieve the latest package version from NPM
 * Return an optional "latest" version in case of error
 * @param packageName
 */
export function getLatestNodeVersion(
  packageName: string
): Promise<NodePackage> {
  const DEFAULT_VERSION = 'latest';

  return new Promise((resolve) => {
    return get(`https://registry.npmjs.org/${packageName}`, (res) => {
      let rawData = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(rawData);
          const version = (response && response['dist-tags']) || {};

          resolve(buildPackage(packageName, version.latest));
        } catch (e) {
          resolve(buildPackage(packageName));
        }
      });
    }).on('error', () => resolve(buildPackage(packageName)));
  });

  function buildPackage(
    name: string,
    version: string = DEFAULT_VERSION
  ): NodePackage {
    return { name, version };
  }
}

function readJsonFile(tree: Tree, path: string) {
  if (tree.exists(path)) {
    const file = tree.read(path);
    return JSON.parse(file!.toString());
  }
  return null;
}

function addPackageJsonDependency(
  tree: Tree,
  name: string,
  version: string,
  path: string
) {
  const json = readJsonFile(tree, path);
  if (json) {
    json.dependencies = { ...json.dependencies, [name]: `^${version}` };
  }
  tree.overwrite(path, JSON.stringify(json, null, 2));
  return tree;
}
