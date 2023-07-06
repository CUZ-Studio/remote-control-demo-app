import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function prepareForSerialization(obj: any) {
  return _.mapValues(obj, (val) => (typeof val === undefined ? null : val));
}
