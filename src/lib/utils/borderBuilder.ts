export default class BorderBuilder {
  private strings: string[];
  private color = "black";

  constructor() {
    this.strings = [];
  }

  private addBorder(border: string): this {
    if (!this.strings.includes(border)) {
      this.strings.push(border);
    }
    return this;
  }

  addTop(): this {
    return this.addBorder(`border-t-[${this.color}]`);
  }

  addRight(): this {
    return this.addBorder(`border-r-[${this.color}]`);
  }

  addBottom(): this {
    return this.addBorder(`border-b-[${this.color}]`);
  }

  addLeft(): this {
    return this.addBorder(`border-l-[${this.color}]`);
  }

  build(): string {
    return this.strings.join(" ");
  }
}
