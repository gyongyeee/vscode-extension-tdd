import * as vscode from "vscode";

export interface Matcher {
  fileMatch: string[];
  ignoreMatch: string[];
  test(file: vscode.Uri): vscode.Uri;
}

export default interface TestSuite {
  isSet(): boolean;

  isCodeFile(file: vscode.Uri): boolean;

  getTestFile(file: vscode.Uri): vscode.Uri;
}
