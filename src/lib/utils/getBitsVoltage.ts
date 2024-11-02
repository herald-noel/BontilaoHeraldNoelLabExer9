import { VoltageType } from "../../types/VoltageType";
import { EncodingType } from "../../types/EncodingType";

export default function getBitsVoltage(
  bits: string[],
  encodingType: EncodingType
): Array<VoltageType> {
  const voltages: Array<VoltageType> = [];

  switch (encodingType) {
    case EncodingType.Nrzl:
      bits.forEach((element) => {
        element === "1"
          ? voltages.push(VoltageType.High)
          : voltages.push(VoltageType.Low);
      });
      break;

    case EncodingType.Nrzi:
      let previousVoltage = VoltageType.Low;
      bits.forEach((element) => {
        if (element === "1") {
          if (previousVoltage === VoltageType.Low) {
            voltages.push(VoltageType.High);
            previousVoltage = VoltageType.High;
          } else {
            voltages.push(VoltageType.Low);
            previousVoltage = VoltageType.Low;
          }
        } else {
          voltages.push(previousVoltage);
        }
      });
      break;

    case EncodingType.BipolarAMI:
      let previousBinaryOne = VoltageType.Low;
      bits.forEach((element) => {
        if (element === "1") {
          if (previousBinaryOne === VoltageType.Low) {
            voltages.push(VoltageType.High);
            previousBinaryOne = VoltageType.High;
          } else {
            voltages.push(VoltageType.Low);
            previousBinaryOne = VoltageType.Low;
          }
        } else {
          voltages.push(VoltageType.Zero);
        }
      });
      break;

    case EncodingType.Pseudoternary:
      let previousBinaryZero = VoltageType.Low;
      bits.forEach((element) => {
        if (element === "0") {
          if (previousBinaryZero === VoltageType.Low) {
            voltages.push(VoltageType.High);
            previousBinaryZero = VoltageType.High;
          } else {
            voltages.push(VoltageType.Low);
            previousBinaryZero = VoltageType.Low;
          }
        } else {
          voltages.push(VoltageType.Zero);
        }
      });
      break;

    case EncodingType.Manchester:
      bits.forEach((element) => {
        element === "1"
          ? voltages.push(VoltageType.LowToHigh)
          : voltages.push(VoltageType.HighToLow);
      });
      break;
  }

  console.log("the length is", voltages.length);
  return voltages;
}
