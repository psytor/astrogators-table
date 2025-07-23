export interface Workflow {
  name: string;
  description: string;
  [key: string]: any; // Allows for other properties like "dot_1-4", "dot_5", etc.
}

export interface Workflows {
  [key: string]: Workflow;
}
