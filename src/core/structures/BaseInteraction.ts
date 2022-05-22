import type {
  ApplicationCommandData,
  Interaction,
  InteractionResponse,
} from "discord.js";
import { Placeholder } from "../client/Placeholder";

export abstract class BaseInteraction {
  data: ApplicationCommandData;
  constructor(data: ApplicationCommandData) {
    this.data = data;
  }
  abstract execute(
    client: Placeholder,
    interaction: Interaction
  ): Promise<InteractionResponse>;

  public getData = () => {
    return this.data;
  };

  public getCommandName = () => {
    return this.data.name;
  };
}
