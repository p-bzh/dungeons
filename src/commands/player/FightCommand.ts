import { ButtonBuilder } from "@discordjs/builders";
import {
  InteractionResponse,
  CommandInteraction,
  ActionRowData,
  ActionRowComponentData,
  ComponentType,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";
import { Placeholder } from "../../core/client/Placeholder";
import { Command } from "../../core/structures/Command";

class FightCommand extends Command {
  constructor() {
    super({
      name: "fight",
      description: "Fight enemies in current.",
    });
  }

  execute(
    _: Placeholder,
    interaction: CommandInteraction
  ): Promise<InteractionResponse> {
    const row = new ActionRowBuilder().addComponents([
      new ButtonBuilder()
        .setCustomId("primary")
        .setLabel("Primary")
        .setStyle(ButtonStyle.Primary),
    ]);

    return interaction.reply({ components: [row] });
  }
}

module.exports = FightCommand;
