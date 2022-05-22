import {
  InteractionResponse,
  ButtonStyle,
  ComponentType,
  CommandInteraction,
} from "discord.js";
import { Placeholder } from "../core/client/Placeholder";
import { Button } from "../core/structures/Button";

class StartAdventureButton extends Button {
  constructor() {
    super("start-adventure", {
      customId: `start-adventure-${Date.now()}`,
      style: ButtonStyle.Success,
      type: ComponentType.Button,
    });
  }
  execute(
    _: Placeholder,
    interaction: CommandInteraction
  ): Promise<InteractionResponse> {
    return interaction.reply({
      content: "Welcome to the Dungeon !",
      ephemeral: true,
    });
  }
}

module.exports = StartAdventureButton;
