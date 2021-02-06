import * as vscode from "vscode";
import * as utils from "./utils";
import testSuites from "./suites";

export function activate(context: vscode.ExtensionContext) {
  const suites = () => testSuites.filter((s) => s.isSet(context));

  const testSide = () => vscode.ViewColumn.Two;
  const codeSide = () =>
    testSide() === vscode.ViewColumn.Two
      ? vscode.ViewColumn.One
      : vscode.ViewColumn.Two;

  vscode.window.onDidChangeActiveTextEditor(async (data) => {
    if (data) {
      const { uri: file } = data.document;

      const suite = utils.getTestSuite(file, ...suites());
      if (suite) {
        const testfile = suite.testFileUri(file);
        await utils.createFile(testfile);

        const testColumn = testSide();
        const codeColumn = codeSide();

        vscode.window.showTextDocument(testfile, {
          viewColumn: testColumn,
          preserveFocus: true,
        });

        if (data.viewColumn === testColumn) {
          vscode.window.showTextDocument(file, {
            viewColumn: codeColumn,
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
          const suite = utils.getTestSuite(oldUri, ...suites());
          if (suite) {
            const oldtest = suite.testFileUri(oldUri);
            const newtest = suite.testFileUri(newUri);

            return utils.renameFile(oldtest, newtest);
          }
        })
      )
  );

  vscode.workspace.onWillDeleteFiles(
    async ({ files }) =>
      await Promise.all(
        files.map(async (file) => {
          const suite = utils.getTestSuite(file, ...suites());
          if (suite) {
            const testfile = suite.testFileUri(file);

            return utils.deleteFile(testfile);
          }
        })
      )
  );
}

export function deactivate() {}
