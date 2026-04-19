import { TerminalPlugin } from "../plugins/terminal/index.js";
import { FilesystemPlugin } from "../plugins/filesystem/index.js";
import { ClawPlugin, ClawMuscle } from "../shared/base.js";

/**
 * The Registrar manages all active plugins and their muscles.
 */
export class ClawRegistrar {
  private plugins: ClawPlugin[] = [];
  private muscleMap: Map<string, ClawMuscle> = new Map();

  constructor() {
    // EXPLICIT REGISTRATION
    this.register(new TerminalPlugin());
    this.register(new FilesystemPlugin());
  }

  private register(plugin: ClawPlugin) {
    this.plugins.push(plugin);
    for (const muscle of plugin.muscles) {
      if (this.muscleMap.has(muscle.definition.name)) {
        console.warn(`[Registrar] Warning: Muscle name collision for "${muscle.definition.name}". Overwriting...`);
      }
      this.muscleMap.set(muscle.definition.name, muscle);
    }
    console.log(`[Registrar] Registered Plugin: ${plugin.name} (${plugin.muscles.length} muscles)`);
  }

  getAllPlugins(): ClawPlugin[] {
    return this.plugins;
  }

  getMuscle(name: string): ClawMuscle | undefined {
    return this.muscleMap.get(name);
  }

  /**
   * Generates a combined system prompt fragment from all registered plugins.
   */
  getCombinedSystemPrompt(): string {
    return this.plugins
      .map(p => `### ${p.name} Plugin\n${p.description}\n${p.getSystemPromptFragment?.() || ""}`)
      .join("\n\n");
  }

  /**
   * Returns a JSON-serializable list of all muscle definitions for the LLM.
   */
  getToolDefinitions(): any[] {
    const definitions: any[] = [];
    for (const muscle of this.muscleMap.values()) {
      definitions.push(muscle.definition);
    }
    return definitions;
  }
}
