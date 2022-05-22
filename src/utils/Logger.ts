export class Logger {
  format: string = "{timestamp} [{tag}] - {message}\n";
  timerFormatter: Intl.DateTimeFormat;
  constructor() {
    this.timerFormatter = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  private write = (tag: string, content: string, error = false) => {
    const timestamp = this.timerFormatter.format(Date.now());
    const stream = error ? process.stderr : process.stdout;
    const item = this.format
      .replace("{timestamp}", timestamp)
      .replace("{tag}", tag)
      .replace("{message}", content);
    stream.write(item);
  };
  // log info warn debug error
  public log(content: string) {
    this.write("LOG", content);
  }
  public info(content: string) {
    this.write("INFO", content, true);
  }
  public warn(content: string) {
    this.write("WARN", content, true);
  }
  public debug(content: string) {
    this.write("DEBUG", content, true);
  }
  public error(error: string) {
    this.write("ERROR", error, true);
  }
}
