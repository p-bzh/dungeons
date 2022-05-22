import {
  ApplicationCommandType,
  CommandInteraction,
  EmbedBuilder,
  InteractionResponse,
  time,
} from "discord.js";
import { Placeholder } from "../../core/client/Placeholder";
import { Command } from "../../core/structures/Command";

class Ping extends Command {
  constructor() {
    super({
      name: "ping",
      description: "Send latency information.",
      type: ApplicationCommandType.ChatInput,
    });
  }
  execute(
    client: Placeholder,
    interaction: CommandInteraction
  ): Promise<InteractionResponse> {
    const relativeUptime = time(new Date(client.readyTimestamp!), "R");
    const pingEmbed = new EmbedBuilder()
      .setTitle("Latency information")
      .addFields([
        { name: "Bot latency", value: `${client.ws.ping}ms`, inline: true },
        {
          name: "Bot uptime",
          value: `${relativeUptime}`,
          inline: true,
        },
      ]);
    return interaction.reply({ embeds: [pingEmbed] });
  }
}

module.exports = Ping;
