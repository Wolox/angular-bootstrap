import { SchematicsException, Tree } from "@angular-devkit/schematics";
import { join, Path, parseJson, JsonParseMode } from "@angular-devkit/core";
import { WorkspaceSchema } from "@angular-devkit/core/src/experimental/workspace";

export function getProjectName(tree: Tree): string {
  const workspace = getWorkspace(tree);
  const projectName = workspace.defaultProject;
  if (!projectName) {
    throw new SchematicsException("Can't access to project name");
  }
  return projectName;
}

export function getSourcePath(tree: Tree, options: any): String {
  const workspace = getWorkspace(tree);
  const projectName = options.project || workspace.defaultProject;
  if (!projectName) {
    throw new SchematicsException('Option "project" is required.');
  }

  const project = workspace.projects[projectName];

  if (project.projectType !== "application") {
    throw new SchematicsException(
      `Add Cypress requires a project type of "application".`
    );
  }

  const sourcePath = join(project.root as Path, "src");
  return sourcePath;
}

export function getWorkspace(host: Tree): WorkspaceSchema {
  const path = getWorkspacePath(host);
  const configBuffer = host.read(path);
  if (configBuffer === null) {
    throw new SchematicsException(`Could not find (${path})`);
  }
  const content = configBuffer.toString();

  return (parseJson(content, JsonParseMode.Loose) as {}) as WorkspaceSchema;
}

export function getWorkspacePath(host: Tree): string {
  const possibleFiles = [
    "/angular.json",
    "/.angular.json",
    "/angular-cli.json",
  ];
  const path = possibleFiles.filter((path) => host.exists(path))[0];

  return path;
}
