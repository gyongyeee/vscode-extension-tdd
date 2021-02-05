import * as assert from "assert";
import * as vscode from "vscode";

import Jest from "../../suites/jest";

suite("Jest Env Test Suite", () => {
  const jest = new Jest();

  test("regular matcher", () => {
    const validFiles: vscode.Uri[] = [
      vscode.Uri.file("/c/code/project/index.js"),
      vscode.Uri.file("/c/code/project/data/model.ts"),
      vscode.Uri.file("/c/code/project/views/Home.jsx"),
      vscode.Uri.file("/c/code/project/components/Navbar.tsx"),
    ];

    const validFilesTests: vscode.Uri[] = [
      vscode.Uri.file("/c/code/project/__tests__/index.test.js"),
      vscode.Uri.file("/c/code/project/data/__tests__/model.test.ts"),
      vscode.Uri.file("/c/code/project/views/__tests__/Home.test.jsx"),
      vscode.Uri.file("/c/code/project/components/__tests__/Navbar.test.tsx"),
    ];

    const invalidFiles: vscode.Uri[] = [
      vscode.Uri.file("/c/code/project/Makefile"),
      vscode.Uri.file("/c/code/project/.gitignore"),
      vscode.Uri.file("/c/code/project/package.json"),
      vscode.Uri.file("/c/code/project/data/README.md"),
      vscode.Uri.file("/c/code/project/data/views/Home.spec.tsx"),
      vscode.Uri.file("/c/code/project/data/views/Home.test.tsx"),
      vscode.Uri.file("/c/code/project/components/__mocks__/axios.ts"),
      vscode.Uri.file("/c/code/project/components/__tests__/docker.ts"),
      vscode.Uri.file(
        "/c/code/project/components/__tests__/finder/destination.ts"
      ),
    ];

    validFiles.forEach((file) =>
      assert.strictEqual(jest.isCodeFile(file), true)
    );

    invalidFiles.forEach((file) =>
      assert.strictEqual(jest.isCodeFile(file), false)
    );

    validFiles.forEach((file, i) =>
      assert.strictEqual(jest.getTestFile(file).path, validFilesTests[i].path)
    );
  });
});
