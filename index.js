// expect function that returns an object with a toBe method
// => example expect(sum(10,20)).toBe(30)

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`)
      }
    },
  }
}

// test function that takes in a string(test description) and a callback(test assertions)
//passed and failed arguments will be partially applied by the counter function below

function testCb(string, cb, numTests) {
  console.log("_____________________________________")

  try {
    numTests.passed += 1
    cb()
    console.log(numTests.passed + " tests have passed")
    console.log(`✅  ${string} has passed.`)
  }
  catch (e) {
    numTests.failed += 1
    console.log(numTests.failed + " tests have failed")
    console.log(`❌  ${string} has failed.`)
    console.error(e.message)
  }
  console.log("_____________________________________")
}


// function that returns a test function but also tracks the number of passed and failed tests
// The returned function calls the testCb function above and uses closure to close over `passed` and `failed`.

function counter() {
  let numTests = {passed:0,failed:0}
  return (string,cb) => {
    testCb(string,cb,numTests)
  }
}


// functions to test
const sum = (a,b) => a + b
const divide = (a,b)=> a/b
const subtract = (a, b) => a + b

// Testing code

const test = counter()

test("testing sum function which adds two numbers", () => {
  const result = sum(3, 7)
  const expected = 10
  expect(result).toBe(expected)
})

test("testing divide function which divides two numbers", () => {
  const result = divide(10, 5)
  const expected = 2
  expect(result).toBe(expected)
})

test("testing subtract function which subtracts two numbers", () => {
  const result = subtract(7, 3)
  const expected = 4
  expect(result).toBe(expected)
})
