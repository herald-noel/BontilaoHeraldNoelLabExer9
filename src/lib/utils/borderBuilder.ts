export default class BorderBuilder {
  private strings: string[];
  private color = "black";

  constructor() {
    this.strings = [];
  }

  private addClass(border: string): this {
    if (!this.strings.includes(border)) {
      this.strings.push(border);
    }
    return this;
  }

  addCustomClass(value: string): this {
    return this.addClass(value);
  }

  addTop(): this {
    return this.addClass(`border-t-[${this.color}]`);
  }

  addRight(): this {
    return this.addClass(`border-r-[${this.color}]`);
  }

  addBottom(): this {
    return this.addClass(`border-b-[${this.color}]`);
  }

  addLeft(): this {
    return this.addClass(`border-l-[${this.color}]`);
  }

  build(): string {
    return this.strings.join(" ");
  }
}
