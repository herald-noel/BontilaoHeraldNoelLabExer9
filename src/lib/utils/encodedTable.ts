import { BorderType } from "../../model/BorderType";
import { VoltageType } from "../../model/VoltageType";
import BorderBuilder from "./borderBuilder";
import { EncodingType } from "../../model/EncodingType";

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

  static addBorders(
    encodingType: EncodingType,
    renderType: RenderType,
    borderTypes: BorderType[],
    currVoltage: VoltageType,
    nextVoltage: VoltageType | null,
    previousAltBorderX: BorderType
  ): BorderBuilder[] {
    const borderBuilders: BorderBuilder[] = [];
    borderTypes.forEach((borderType, index) => {
      const renderBorder = new BorderBuilder();

      const addRightBorderRightCell = (checkEquality = false) => {
        const shouldAddRightBorder =
          index === 1 &&
          ((checkEquality && currVoltage === nextVoltage) ||
            (!checkEquality && currVoltage !== nextVoltage));

        if (shouldAddRightBorder) {
          renderBorder.addRight();
        }
      };

      switch (borderType) {
        case BorderType.TOP:
          renderBorder.addTop();
          if (
            encodingType === EncodingType.BipolarAMI ||
            encodingType === EncodingType.Pseudoternary
          ) {
            if (currVoltage === VoltageType.High) {
              if (index === 1) renderBorder.addRight();
              else renderBorder.addLeft();
            }
            if (index === 1 && currVoltage === VoltageType.Zero) {
              renderBorder.addCustomClass("border-r-0");
            }
          }
          if (index === 0 && currVoltage === VoltageType.HighToLow) {
            renderBorder.addCustomClass("border-r-0");
          }
          if (
            encodingType === EncodingType.Nrzl ||
            encodingType === EncodingType.Nrzi
          ) {
            addRightBorderRightCell();
          } else if (
            encodingType === EncodingType.Manchester ||
            encodingType === EncodingType.DifferentialManchester
          ) {
            addRightBorderRightCell(true);
          }
          break;
        case BorderType.RIGHT:
          renderBorder.addRight();
          break;
        case BorderType.BOTTOM:
          renderBorder.addBottom();
          if (index === 0 && currVoltage === VoltageType.LowToHigh) {
            renderBorder.addCustomClass("border-r-0");
          }
          if (
            encodingType === EncodingType.Nrzl ||
            encodingType === EncodingType.Nrzi
          ) {
            addRightBorderRightCell();
          } else if (
            encodingType === EncodingType.Manchester ||
            encodingType === EncodingType.DifferentialManchester
          ) {
            addRightBorderRightCell(true);
          }
          if (
            encodingType === EncodingType.BipolarAMI ||
            encodingType === EncodingType.Pseudoternary
          ) {
            if (index === 1 && currVoltage !== VoltageType.Low)
              renderBorder.addCustomClass("border-r-0");

            if (currVoltage === VoltageType.Low) {
              if (index === 1) renderBorder.addRight();
              else renderBorder.addLeft();
            }
          }
          break;
        case BorderType.LEFT:
          renderBorder.addLeft();
          if (
            encodingType === EncodingType.Manchester ||
            encodingType === EncodingType.DifferentialManchester
          ) {
            addRightBorderRightCell(true);
          }
          break;
        case BorderType.NONE:
          if (
            encodingType === EncodingType.Nrzl ||
            encodingType === EncodingType.Nrzi
          ) {
            addRightBorderRightCell();
          }
          if (
            index === 1 &&
            (encodingType === EncodingType.BipolarAMI ||
              encodingType === EncodingType.Pseudoternary)
          )
            renderBorder.addCustomClass("border-r-0");
          break;
      }
      borderBuilders.push(renderBorder);
    });
    return borderBuilders;
  }

  static render(
    encodingType: EncodingType,
    voltages: Array<VoltageType>,
    renderType = RenderType.Upper
  ) {
    let previousAltBorderX = BorderType.BOTTOM;
    return voltages
      .map((currVoltage, index) => {
        const nextVoltage = voltages[index + 1] ?? null;
        const borderTypes: BorderType[] = this.getBorderTypes(
          renderType,
          currVoltage
        );

        const toggleBorderX = (border: BorderType) => {
          return border === BorderType.BOTTOM
            ? BorderType.TOP
            : BorderType.BOTTOM;
        };

        const borderBuilders = this.addBorders(
          encodingType,
          renderType,
          borderTypes,
          currVoltage,
          nextVoltage,
          previousAltBorderX
        );

        if (
          encodingType === EncodingType.BipolarAMI &&
          currVoltage === VoltageType.High
        ) {
          previousAltBorderX = toggleBorderX(previousAltBorderX);
        }

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
