import * as vscode from "vscode";
import { Utils } from "vscode-uri";
import * as _ from "lodash";

import TestSuite from "../interface";

/**
 * @class Jest representing facebooks jest test environment.
 * @author Amaury Diaz
 */
export default class Jest implements TestSuite {
  /**
   * @protected File extensions that matches for a testeable file.
   */
  protected allowedExtensions = [".ts", ".js", ".tsx", ".jsx"];

  /**
   * @protected Substrings indicating that the file is already a test file and it doesn't need to be testeable.
   */
  protected testNameIndicator = [".test.", ".spec."];

  /**
   * @protected Folders that contains either test files or non testeable files.
   */
  protected excludeIndicator = ["__tests__", "__mocks__", "node_modules"];

  isSet(context: vscode.ExtensionContext): boolean {
    // TODO: Needs proper implementation...
    return true;
  }

  isCodeFile(file: vscode.Uri): boolean {
    // TODO: Add smart cached files...
    const extension = Utils.extname(file);
    if (!_.includes(this.allowedExtensions, extension)) {
      return false;
    }

    const filename = Utils.basename(file);
    if (_.some(this.testNameIndicator, (p) => filename.includes(p))) {
      return false;
    }

    const location = Utils.dirname(file);
    if (_.some(this.excludeIndicator, (p) => location.path.includes(p))) {
      return false;
    }

    return true;
  }

  testFileUri(file: vscode.Uri): vscode.Uri {
    const extension = Utils.extname(file);
    const filename = Utils.basename(file);
    const location = Utils.dirname(file).path;

    return vscode.Uri.file(
      location +
        "/__tests__/" +
        filename.replace(extension, ".test" + extension)
    );
  }
}
