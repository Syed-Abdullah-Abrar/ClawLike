import { test } from "node:test";
import assert from "node:assert";
import path from "node:path";
import fs from "node:fs/promises";
import { ReadFileMuscle, WriteFileMuscle, ListDirectoryMuscle, DeleteFileMuscle } from "../../src/muscles/file/file_ops";

const TEST_FILE_PATH = "tests/test_temp.txt";
const PROJECT_ROOT = process.cwd();

test("File Operations Muscles", async (t) => {
  // Setup: Ensure tests directory exists
  await fs.mkdir("tests", { recursive: true });

  await t.test("WriteFileMuscle creates a file within sandbox", async () => {
    const muscle = new WriteFileMuscle();
    const result = await muscle.run({
      path: TEST_FILE_PATH,
      content: "Hello, ClawLike!"
    });

    assert.ok(result.includes("successfully"), "File should be written successfully");
    const content = await fs.readFile(path.join(PROJECT_ROOT, TEST_FILE_PATH), "utf-8");
    assert.strictEqual(content, "Hello, ClawLike!");
  });

  await t.test("ReadFileMuscle reads file content within sandbox", async () => {
    const muscle = new ReadFileMuscle();
    const result = await muscle.run({ path: TEST_FILE_PATH });
    assert.strictEqual(result, "Hello, ClawLike!");
  });

  await t.test("ListDirectoryMuscle lists files in a directory", async () => {
    const muscle = new ListDirectoryMuscle();
    const result = await muscle.run({ path: "tests" });
    assert.ok(Array.isArray(result), "Result should be an array");
    assert.ok(result.includes("test_temp.txt"), "Should contain the temporary test file");
  });

  await t.test("DeleteFileMuscle removes the file", async () => {
    const muscle = new DeleteFileMuscle();
    const result = await muscle.run({ path: TEST_FILE_PATH });
    assert.ok(result.includes("successfully deleted"), "File should be deleted successfully");
    
    try {
      await fs.access(TEST_FILE_PATH);
      assert.fail("File should not exist after deletion");
    } catch (e) {
      assert.ok(true, "File is correctly deleted");
    }
  });

  await t.test("Sandboxing: WriteFileMuscle denies access outside project root", async () => {
    const muscle = new WriteFileMuscle();
    const result = await muscle.run({ path: "../outside.txt", content: "hack" });
    assert.ok(result.includes("Access denied"), "Should return access denied error message");
  });
});
