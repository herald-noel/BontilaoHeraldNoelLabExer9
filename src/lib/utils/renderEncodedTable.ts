import { BorderType } from "../../types/BorderType";

export default class RenderEncodedTable {
  static data = [
    {
      bit: 1,
      borders: [BorderType.TOP, ...new Array(3).fill(BorderType.NONE)],
    },
  ];
  static commonCellClasses = "p-[32px] border";

  static nonReturnToZeroLevel(bits: string[]) {
    return bits
      .map((bit) => {
        const additionalClasses = bit === "1" ? "border-t-black" : "";
        return `
          <td class="${this.commonCellClasses} ${additionalClasses}"></td>
          <td class="${this.commonCellClasses} ${additionalClasses}"></td>
        `;
      })
      .join("");
  }
}
