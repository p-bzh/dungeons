import { ChatInputApplicationCommandData } from "discord.js";
import { BaseInteraction } from "./BaseInteraction";

export abstract class Command extends BaseInteraction {
  public getDescription = () => {
    return (this.data as ChatInputApplicationCommandData).description;
  };
  public getOptions = () => {
    return (this.data as ChatInputApplicationCommandData).options?.map(
      (option) => {
        return {
          name: option.name,
          description: option.description,
          type: option.type,
        };
      }
    );
  };
}
