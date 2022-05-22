import {
  ApplicationCommandType,
  ContextMenuCommandInteraction,
  InteractionResponse,
} from "discord.js";
import { Placeholder } from "../../core/client/Placeholder";
import { ContextMenu } from "../../core/structures/ContextMenu";

class ProfileCommand extends ContextMenu {
  constructor() {
    super({
      name: "profile",
      type: ApplicationCommandType.User,
    });
  }
  async execute(
    _: Placeholder,
    interaction: ContextMenuCommandInteraction
  ): Promise<InteractionResponse> {
    const member = await interaction.guild?.members.fetch(interaction.targetId);
    return interaction.reply({
      content: `Profile of ${member?.user.tag}`,
      ephemeral: true,
    });
  }
}

module.exports = ProfileCommand;
