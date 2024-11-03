import { VoltageType } from "../../model/VoltageType";
import { EncodingType } from "../../model/EncodingType";

export default function getBitsVoltage(
  bits: string[],
  encodingType: EncodingType,
  startVoltage: VoltageType.HighToLow | VoltageType.LowToHigh
): VoltageType[] {
  const voltages: VoltageType[] = [];

  const toggleVoltage = (current: VoltageType): VoltageType =>
    current === VoltageType.High ? VoltageType.Low : VoltageType.High;

  switch (encodingType) {
    case EncodingType.Nrzl:
      bits.forEach((bit) =>
        voltages.push(bit === "1" ? VoltageType.High : VoltageType.Low)
      );
      break;

    case EncodingType.Nrzi:
      let nrziVoltage = VoltageType.Low;
      bits.forEach((bit) => {
        if (bit === "1") {
          nrziVoltage = toggleVoltage(nrziVoltage);
        }
        voltages.push(nrziVoltage);
      });
      break;

    case EncodingType.BipolarAMI:
      let amiVoltage = VoltageType.Low;
      bits.forEach((bit) => {
        if (bit === "1") {
          amiVoltage = toggleVoltage(amiVoltage);
          voltages.push(amiVoltage);
        } else {
          voltages.push(VoltageType.Zero);
        }
      });
      break;

    case EncodingType.Pseudoternary:
      let pseudoVoltage = VoltageType.Low;
      bits.forEach((bit) => {
        if (bit === "0") {
          pseudoVoltage = toggleVoltage(pseudoVoltage);
          voltages.push(pseudoVoltage);
        } else {
          voltages.push(VoltageType.Zero);
        }
      });
      break;

    case EncodingType.Manchester:
      bits.forEach((bit) =>
        voltages.push(
          bit === "1" ? VoltageType.LowToHigh : VoltageType.HighToLow
        )
      );
      break;

    case EncodingType.DifferentialManchester:
      let diffVoltage = startVoltage;
      bits.forEach((bit) => {
        if (bit === "1") {
          diffVoltage =
            diffVoltage === VoltageType.HighToLow
              ? VoltageType.LowToHigh
              : VoltageType.HighToLow;
        }
        voltages.push(diffVoltage);
      });
      break;
  }

  return voltages;
}
