import { test } from "node:test";
import assert from "node:assert";
import { ShellMuscle } from "../../src/muscles/core/shell_ops";

test("Shell Operations Muscles", async (t) => {
  await t.test("ShellMuscle executes a basic command", async () => {
    const muscle = new ShellMuscle();
    const result = await muscle.run({ command: "echo 'hello, ClawLike'" });
    assert.ok(result.includes("hello, ClawLike"));
  });

  await t.test("ShellMuscle is restricted to project root", async () => {
    const muscle = new ShellMuscle();
    const result = await muscle.run({ command: "pwd" });
    // This confirms the current directory is always ClawLike
    assert.ok(result.trim().endsWith("ClawLike"), `Should be inside ClawLike, but got: ${result}`);
  });
});
