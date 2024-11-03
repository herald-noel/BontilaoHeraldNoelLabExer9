import { BorderType } from "../../model/BorderType";
import { VoltageType } from "../../model/VoltageType";
import BorderBuilder from "./borderBuilder";

enum RenderType {
  Upper,
  Lower,
}

export default class EncodedTable {
  static RenderType = RenderType;

  static borderLookUp: Record<VoltageType, BorderType[][]> = {
    [VoltageType.Low]: [
      Array(2).fill(BorderType.NONE),
      Array(2).fill(BorderType.BOTTOM),
    ],
    [VoltageType.High]: [
      Array(2).fill(BorderType.TOP),
      Array(2).fill(BorderType.NONE),
    ],
    [VoltageType.Zero]: [
      Array(2).fill(BorderType.BOTTOM),
      Array(2).fill(BorderType.TOP),
    ],
    [VoltageType.LowToHigh]: [
      [BorderType.RIGHT, BorderType.TOP],
      [BorderType.BOTTOM, BorderType.LEFT],
    ],
    [VoltageType.HighToLow]: [
      [BorderType.TOP, BorderType.LEFT],
      [BorderType.RIGHT, BorderType.BOTTOM],
    ],
  };

  static commonCellClasses = "p-[32px] border";

  static getBorderTypes(
    renderType: RenderType,
    voltage: VoltageType
  ): BorderType[] {
    if (renderType === RenderType.Upper) {
      return this.borderLookUp[voltage][0];
    }
    return this.borderLookUp[voltage][1];
  }

  static addBorders(borderTypes: BorderType[]): BorderBuilder[] {
    const borderBuilders: BorderBuilder[] = [];
    borderTypes.forEach((borderType, index) => {
      const renderBorder = new BorderBuilder();
      switch (borderType) {
        case BorderType.TOP:
          renderBorder.addTop();
          if (index === 0 && VoltageType.HighToLow) {
            renderBorder.addCustomClass("border-r-0");
          }
          break;
        case BorderType.RIGHT:
          renderBorder.addRight();
          break;
        case BorderType.BOTTOM:
          renderBorder.addBottom();
          if (index === 0 && VoltageType.HighToLow) {
            renderBorder.addCustomClass("border-r-0");
          }
          break;
        case BorderType.LEFT:
          renderBorder.addLeft();
          break;
      }
      borderBuilders.push(renderBorder);
    });
    return borderBuilders;
  }

  static render(voltages: Array<VoltageType>, renderType = RenderType.Upper) {
    return voltages
      .map((voltage) => {
        const borderTypes: BorderType[] = this.getBorderTypes(
          renderType,
          voltage
        );
        const borderBuilders = this.addBorders(borderTypes);

        return `
          <td class="${
            this.commonCellClasses
          } ${borderBuilders[0].build()}"></td>
          <td class="${
            this.commonCellClasses
          } ${borderBuilders[1].build()}"></td>
        `;
      })
      .join("");
  }
}
