import * as vscode from "vscode";

/**
 * @interface TestSuite represents an environment with a specific test engine.
 * @author Amaury Diaz
 * */
export default interface TestSuite {
  /**
   * Returns if the suite is present in the given workspace context.
   *
   * @param context the given vs extension context.
   */
  isSet(context: vscode.ExtensionContext): boolean;

  /**
   * Returns if the file is a testeable file to keep track on.
   *
   * @param file a file to check
   */
  isCodeFile(file: vscode.Uri): boolean;

  /**
   * Returns the URI that a test file should have for the given file.
   *
   * @param file a file to generate test file.
   */
  testFileUri(file: vscode.Uri): vscode.Uri;
}
