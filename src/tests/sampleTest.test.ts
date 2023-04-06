//Sample Testing file for Jest Tests

import { add } from "./testFunction";

test("sample test", () => {
  const testCases = [
    {
      value1: 1,
      value2: 2,
      expected: 3,
    },
    {
      value1: 1,
      value2: 0,
      expected: 1,
    },
    {
      value1: 100,
      value2: 25,
      expected: 125,
    },
  ];
  const testReturns = testCases.map((testCase) =>
    add(testCase.value1, testCase.value2)
  );
  for (let i = 0; i < testCases.length; i++) {
    expect(testReturns[i]).toBe(testCases[i].expected);
  }
});
