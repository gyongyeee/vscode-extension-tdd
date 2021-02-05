import * as vscode from "vscode";
import * as _ from "lodash";
import Jest from "./envs/jest";
import TestSuite from "./interface";

const validExtensions = [".ts", ".js", ".tsx", ".jsx"];
const testNames = ["specs", "test"];
const testLocations = ["__tests__", "__mocks__"];

const _testSuites = [new Jest()];

export function getTestSuite(file: vscode.Uri): TestSuite | null {
  for (const suite of _testSuites) {
    if (suite.isCodeFile(file)) {
      return suite;
    }
  }
  return null;
}

export function createFile(file: vscode.Uri) {
  const wsedit = new vscode.WorkspaceEdit();
  wsedit.createFile(file, { ignoreIfExists: true, overwrite: false });
  return vscode.workspace.applyEdit(wsedit);
}

export function renameFile(oldUri: vscode.Uri, newUri: vscode.Uri) {
  const wsedit = new vscode.WorkspaceEdit();
  wsedit.renameFile(oldUri, newUri, { overwrite: true });
  return vscode.workspace.applyEdit(wsedit);
}

export function deleteFile(file: vscode.Uri) {
  const wsedit = new vscode.WorkspaceEdit();
  wsedit.deleteFile(file, { ignoreIfNotExists: true });
  return vscode.workspace.applyEdit(wsedit);
}
