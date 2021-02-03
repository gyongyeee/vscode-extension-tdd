import * as vscode from "vscode";
import * as _ from "lodash";
import { Utils } from "vscode-uri";

const validExtensions = [".ts", ".js", ".tsx", ".jsx"];
const testNames = ["specs", "test"];

export function getFileData(file: vscode.Uri) {
  const location = Utils.dirname(file).path;
  const extension = Utils.extname(file);
  const filename = Utils.basename(file).replace(extension, "");

  const middlename = _.last(_.split(filename, "."));

  const validExtension = validExtensions.some((p) => extension === p);
  const testName = testNames.some((p) => middlename === p);

  return {
    location,
    filename,
    extension,
    middlename,
    isCode: validExtension && !testName,
    isTest: validExtension && testName,
  };
}

export function getCodeFile(file: vscode.Uri): vscode.Uri {
  const { middlename } = getFileData(file);
  return vscode.Uri.file(
    file.path.replace(`.${middlename}.`, ".").replace("/__tests__/", "/")
  );
}

export function getTestFile(file: vscode.Uri): vscode.Uri {
  const { location, filename, extension } = getFileData(file);
  return vscode.Uri.file(
    location + "/__tests__/" + filename + ".test" + extension
  );
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
