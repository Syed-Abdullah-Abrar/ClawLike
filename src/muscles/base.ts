export interface MuscleDefinition {
  name: string;
  description: string;
  parameters: object;
}

export abstract class ClawMuscle {
  abstract definition: MuscleDefinition;
  abstract run(args: any): Promise<any>;
}
