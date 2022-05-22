import { APIButtonComponent } from "discord-api-types/v10";
import {
  ButtonComponentData,
  Interaction,
  InteractionButtonComponentData,
  InteractionResponse,
  ButtonBuilder,
} from "discord.js";
import { Placeholder } from "../client/Placeholder";

export abstract class Button {
  data: ButtonComponentData;
  readonly name: string;
  constructor(name: string, data: ButtonComponentData) {
    this.name = name;
    this.data = data;
  }
  abstract execute(
    client: Placeholder,
    interaction: Interaction
  ): Promise<InteractionResponse>;

  public getName = () => {
    return this.name;
  };

  public getCustomId = () => {
    return (this.data as InteractionButtonComponentData).customId;
  };

  public createComponent = () => {
    return ButtonBuilder.from(this.data as APIButtonComponent);
  };
}
