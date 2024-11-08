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
    borderTypes: BorderType[],
    currVoltage: VoltageType,
    nextVoltage: VoltageType | null,
    isFirstBit: boolean,
    isLastBit: boolean,
    startVoltage: VoltageType
  ): BorderBuilder[] {
    const borderBuilders: BorderBuilder[] = [];
    borderTypes.forEach((borderType, index) => {
      const renderBorder = new BorderBuilder();

      const addRightBorderRightCell = (checkEquality = false) => {
        const shouldAddRightBorder =
          index === 1 &&
          !isLastBit &&
          ((checkEquality && currVoltage === nextVoltage) ||
            (!checkEquality && currVoltage !== nextVoltage));

        if (shouldAddRightBorder) {
          renderBorder.addRight();
        }
      };

      const handleFullVoltageTransition = () => {
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
      };

      const addStartLine = () => {
        const isFirst = isFirstBit && index == 0;
        const isSameVoltage = startVoltage === currVoltage;
        if (
          isFirst &&
          isSameVoltage &&
          encodingType === EncodingType.DifferentialManchester
        ) {
          renderBorder.addLeft();
        }
      };

      switch (borderType) {
        case BorderType.TOP:
          renderBorder.addTop();
          addStartLine();
          if (index === 0 && currVoltage === VoltageType.HighToLow) {
            renderBorder.addCustomClass("border-r-0");
          }
          if (
            [EncodingType.BipolarAMI, EncodingType.Pseudoternary].includes(
              encodingType
            )
          ) {
            if (currVoltage === VoltageType.High) {
              if (index === 1) {
                renderBorder.addRight();
              } else if (!isFirstBit) {
                renderBorder.addLeft();
              }
            } else if (index === 1 && currVoltage === VoltageType.Zero) {
              renderBorder.addCustomClass("border-r-0");
            }
          }
          handleFullVoltageTransition();
          break;
        case BorderType.RIGHT:
          renderBorder.addRight();
          addStartLine();
          break;
        case BorderType.BOTTOM:
          renderBorder.addBottom();
          addStartLine();
          if (index === 0 && currVoltage === VoltageType.LowToHigh) {
            renderBorder.addCustomClass("border-r-0");
          }
          if (
            [EncodingType.BipolarAMI, EncodingType.Pseudoternary].includes(
              encodingType
            )
          ) {
            if (index === 1 && currVoltage !== VoltageType.Low) {
              renderBorder.addCustomClass("border-r-0");
            }
            if (currVoltage === VoltageType.Low) {
              index === 1 ? renderBorder.addRight() : renderBorder.addLeft();
            }
          }
          handleFullVoltageTransition();
          break;
        case BorderType.LEFT:
          renderBorder.addLeft();
          addStartLine();
          if (
            encodingType === EncodingType.Manchester ||
            encodingType === EncodingType.DifferentialManchester
          ) {
            addRightBorderRightCell(true);
          }
          break;
        case BorderType.NONE:
          addStartLine();
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
    startVoltage: VoltageType.LowToHigh | VoltageType.HighToLow,
    renderType = RenderType.Upper
  ) {
    let isFirstBit = true;
    return voltages
      .map((currVoltage, index) => {
        const isLastBit = index === voltages.length - 1;
        const nextVoltage = voltages[index + 1] ?? null;
        const borderTypes: BorderType[] = this.getBorderTypes(
          renderType,
          currVoltage
        );

        const borderBuilders = this.addBorders(
          encodingType,
          borderTypes,
          currVoltage,
          nextVoltage,
          isFirstBit,
          isLastBit,
          startVoltage
        );

        isFirstBit = false;

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
