import * as vscode from "vscode";
import * as utils from "./utils";

export function activate(context: vscode.ExtensionContext) {
  console.log("TDD Extension is now active!");

  vscode.window.onDidChangeActiveTextEditor(async (data) => {
    if (data) {
      const { uri } = data.document;
      const { isCode } = utils.getFileData(uri);

      if (isCode) {
        const file = utils.getTestFile(uri);
        await utils.createFile(file);

        vscode.window.showTextDocument(file, {
          viewColumn: vscode.ViewColumn.Two,
          preserveFocus: true,
        });

        if (data.viewColumn === vscode.ViewColumn.Two) {
          vscode.window.showTextDocument(uri, {
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
        const { isCode } = utils.getFileData(oldUri);
        if (isCode) {
          const oldtest = utils.getTestFile(oldUri);
          const newtest = utils.getTestFile(newUri);

          return utils.renameFile(oldtest, newtest);
        }
      })
    );
  });

  // vscode.workspace.onWillDeleteFiles(async ({ files }) => {
  //   await Promise.all(
  //     files.map(async (file) => {
  //       if (utils.isCodeFile(file)) {
  //         const testfile = utils.getTestFile(file);

  //         await utils.deleteFile(testfile, wsedit);
  //       }
  //     })
  //   );
  // });
}

export function deactivate() {}
