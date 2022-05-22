import { Interaction, InteractionResponse } from "discord.js";

import { Event } from "../../core/structures/Event";
import { Placeholder } from "../../core/client/Placeholder";

class InteractionCreate extends Event {
  constructor() {
    super({
      name: "interactionCreate",
    });
  }
  execute(
    client: Placeholder,
    interaction: Interaction
  ): Promise<InteractionResponse> | void {
    if (
      interaction.isChatInputCommand() ||
      interaction.isContextMenuCommand()
    ) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        return interaction.reply({
          content: "Cette commande n'existe pas !",
          ephemeral: true,
        });
      }
      command.execute(client, interaction);
    } else if (interaction.isButton()) {
      const button = client.buttons.get(interaction.customId);
      button?.execute(client, interaction);
    }
  }
}

module.exports = InteractionCreate;
