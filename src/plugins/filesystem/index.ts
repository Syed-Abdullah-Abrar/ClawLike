import { ClawPlugin } from "../../shared/base.js";
import { 
  ReadFileMuscle, 
  WriteFileMuscle, 
  ListDirectoryMuscle, 
  DeleteFileMuscle, 
  SearchFileMuscle 
} from "./muscles/file_ops.js";

export class FilesystemPlugin implements ClawPlugin {
  name = "Filesystem";
  description = "Provides access to read, write, and search files within the project sandbox.";
  muscles = [
    new ReadFileMuscle(),
    new WriteFileMuscle(),
    new ListDirectoryMuscle(),
    new DeleteFileMuscle(),
    new SearchFileMuscle()
  ];

  getSystemPromptFragment() {
    return `
      - Use read_file to view file contents.
      - Use write_file to save changes or create new files.
      - Use search_file to find specific text or patterns in the codebase.
    `;
  }
}
