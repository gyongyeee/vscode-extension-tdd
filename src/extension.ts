import * as vscode from "vscode";
import * as utils from "./utils";

export function activate(context: vscode.ExtensionContext) {
  console.log("TDD Extension is now active!");

  vscode.window.onDidChangeActiveTextEditor(async (data) => {
    if (data) {
      const { uri: file } = data.document;

      if (utils.getFileData(file).isCode) {
        const testfile = utils.getTestFile(file);
        await utils.createFile(testfile);

        vscode.window.showTextDocument(testfile, {
          viewColumn: vscode.ViewColumn.Two,
          preserveFocus: true,
        });

        if (data.viewColumn === vscode.ViewColumn.Two) {
          vscode.window.showTextDocument(file, {
            viewColumn: vscode.ViewColumn.One,
            preserveFocus: true,
          });
        }
      }
    }
  });

  vscode.workspace.onWillRenameFiles(async ({ files }) => {
    await Promise.all(
      files.map(async ({ newUri, oldUri }) => {
        if (utils.getFileData(oldUri).isCode) {
          const oldtest = utils.getTestFile(oldUri);
          const newtest = utils.getTestFile(newUri);

          return utils.renameFile(oldtest, newtest);
        }
      })
    );
  });
}

export function deactivate() {}
