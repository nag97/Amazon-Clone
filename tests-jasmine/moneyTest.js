// describe() is a test suite block in Jest that helps you group related tests together. Think of it like a folder that contains multiple test cases.
// 🔹 Purpose:
// To organize your test cases.
// To give a common name/context to a group of tests.
// Makes your test output more readable and structured.

// it() defines a single test case inside a describe() block.
// It answers the question: "What should this function/code do?"
// 🔹Purpose:
// To write individual test scenarios.
// Each it checks one specific behavior or condition.

import {formatCurrency} from '../scripts/utils/money.js';

describe('test suite : formatCurrency', () => {
  it('converts cents into dollars',()=>{
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with zero',() =>{
    expect(formatCurrency(0)).toEqual('0.00')
  });

  it('rounds up the nearest cent',() =>{
    expect(formatCurrency(2000.5)).toEqual('20.01')
  });
});