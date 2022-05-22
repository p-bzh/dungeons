import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  CommandInteraction,
  EmbedBuilder,
  InteractionResponse,
} from "discord.js";
import { Placeholder } from "../../core/client/Placeholder";
import { Command } from "../../core/structures/Command";

class HelpCommand extends Command {
  constructor() {
    super({
      name: "help",
      description: "Help about commands.",
      type: ApplicationCommandType.ChatInput,
      options: [
        {
          name: "command_name",
          description: "Name of the command.",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }
  execute(
    client: Placeholder,
    interaction: CommandInteraction
  ): Promise<InteractionResponse> {
    const commandName = interaction.options.get("command_name")
      ?.value as string;
    if (commandName) {
      if (!client.commands.has(commandName)) {
        interaction.reply({ content: "Command not found !", ephemeral: true });
      }
      const command = client.commands.get(commandName) as Command;
      const commandInfosEmbed = new EmbedBuilder()
        .setTitle(`${command?.getCommandName()}`)
        .setColor([127, 0, 127])
        .setDescription(`${command?.getDescription()}`);

      const commandOptions = command?.getOptions();
      if (commandOptions) {
        commandInfosEmbed.addFields([
          {
            name: "List of options",
            value:
              "You can use `/help command_name:<name of the command>` for more information",
          },
        ]);
        commandOptions.forEach((option) => {
          commandInfosEmbed.addFields([
            {
              name: `${option.name}`,
              value: `${option.description} (${option.type})`,
            },
          ]);
        });
      }

      return interaction.reply({
        embeds: [commandInfosEmbed],
        ephemeral: true,
      });
    } else {
      return interaction.reply({
        content: "Hello World",
        ephemeral: true,
      });
    }
  }
}

module.exports = HelpCommand;
