import { ClientEvents, InteractionResponse } from "discord.js";

export abstract class Event {
  name: keyof ClientEvents;
  once?: boolean;
  abstract execute(
    ...args: any[]
  ): void | Promise<void> | Promise<InteractionResponse>;
  constructor(data: { name: keyof ClientEvents; once?: boolean }) {
    this.name = data.name;
    this.once = data.once || false;
  }
}
