import { Event } from "../../core/structures/Event";
import { Placeholder } from "../../core/client/Placeholder";
import { TextChannel, time } from "discord.js";

class Ready extends Event {
  constructor() {
    super({
      name: "ready",
      once: true,
    });
  }
  async execute(client: Placeholder): Promise<void> {
    const timestamp = time(new Date(), "R");
    const devGuild = client.guilds.cache.get("959484116645081149");
    devGuild!.commands.set(client.commands.map((command) => command.getData()));
    const logs = devGuild!.channels.cache.find(
      (channel) => channel.id === "976593944471306311"
    ) as TextChannel;
    logs.send({ content: `${client.user?.tag} is ready ! (${timestamp})` });
  }
}

module.exports = Ready;
