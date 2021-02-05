import * as vscode from "vscode";
import * as _ from "lodash";
import TestSuite from "./interface";

export function getTestSuite(
  file: vscode.Uri,
  ...suites: TestSuite[]
): TestSuite | null {
  for (const suite of suites) {
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
