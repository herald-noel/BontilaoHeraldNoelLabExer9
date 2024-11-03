export default class BorderBuilder {
  private strings: string[];
  private color = "black";
  private borderWidth = "4";

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
    return this.addClass(`border-t-${this.color} border-t-${this.borderWidth}`);
  }

  addRight(): this {
    return this.addClass(`border-r-${this.color} border-r-${this.borderWidth}`);
  }

  addBottom(): this {
    return this.addClass(`border-b-${this.color} border-b-${this.borderWidth}`);
  }

  addLeft(): this {
    return this.addClass(`border-l-${this.color} border-l-${this.borderWidth}`);
  }

  build(): string {
    return this.strings.join(" ");
  }
}
