import * as vscode from "vscode";
import * as utils from "./utils";

export function activate(context: vscode.ExtensionContext) {
  console.log("TDD Extension is now active!");

  vscode.window.onDidChangeActiveTextEditor(async (data) => {
    if (data) {
      const { uri: file } = data.document;

      const suite = utils.getTestSuite(file);
      if (suite) {
        const testfile = suite.getTestFile(file);
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

  vscode.workspace.onWillRenameFiles(
    async ({ files }) =>
      await Promise.all(
        files.map(async ({ newUri, oldUri }) => {
          const suite = utils.getTestSuite(oldUri);
          if (suite) {
            const oldtest = suite.getTestFile(oldUri);
            const newtest = suite.getTestFile(newUri);

            return utils.renameFile(oldtest, newtest);
          }
        })
      )
  );

  vscode.workspace.onWillDeleteFiles(
    async ({ files }) =>
      await Promise.all(
        files.map(async (file) => {
          const suite = utils.getTestSuite(file);
          if (suite) {
            const testfile = suite.getTestFile(file);

            return utils.deleteFile(testfile);
          }
        })
      )
  );
}

export function deactivate() {}
