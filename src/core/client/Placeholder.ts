import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";

import { Database } from "../database/Database";
import { Command } from "../structures/Command";
import { Logger } from "../../utils/Logger";
import { ContextMenu } from "../structures/ContextMenu";
import { Button } from "../structures/Button";

export class Placeholder extends Client {
  commands: Collection<string, Command | ContextMenu>;
  buttons: Collection<string, Button>;
  database: Database;
  logger: Logger;
  constructor() {
    super({
      intents: 513,
    });
    this.commands = new Collection<string, Command>();
    this.buttons = new Collection<string, Button>();
    this.database = new Database();
    this.logger = new Logger();
  }

  private loadCommands = () => {
    const folders = readdirSync("./dist/commands");
    for (const folder of folders) {
      const files = readdirSync(`./dist/commands/${folder}`).filter((file) =>
        file.endsWith(".js")
      );
      for (const file of files) {
        const command: Command | ContextMenu =
          new (require(`${process.cwd()}/dist/commands/${folder}/${file}`))();
        this.commands.set(command.getCommandName(), command);
        this.logger.info(`command loaded : ${command.getCommandName()}`);
      }
    }
  };

  private loadEvents = () => {
    const folders = readdirSync("./dist/events");
    for (const folder of folders) {
      const files = readdirSync(`./dist/events/${folder}`).filter((file) =>
        file.endsWith(".js")
      );
      for (const file of files) {
        const event =
          new (require(`${process.cwd()}/dist/events/${folder}/${file}`))();
        if (event.once) {
          this.once(event.name, (...args) => event.execute(this, ...args));
        } else {
          this.on(event.name, (...args) => event.execute(this, ...args));
        }
        this.logger.info(`Event loaded : ${event.name}`);
      }
    }
  };

  private loadButtons = () => {
    const folders = readdirSync("./dist/buttons");
    for (const folder of folders) {
      const files = readdirSync(`./dist/events/${folder}`).filter((file) =>
        file.endsWith(".js")
      );
      for (const file of files) {
        const button: Button =
          new (require(`${process.cwd()}/dist/buttons/${folder}/${file}`))();
        this.buttons.set(button.getName(), button);
      }
    }
  };

  public async start() {
    this.database.init();
    this.loadCommands();
    this.loadButtons();
    this.loadEvents();
    this.login(process.env["TOKEN"]).then(() => {
      this.logger.info(`${this.user?.username} is connected to Discord API !`);
    });
  }
}
