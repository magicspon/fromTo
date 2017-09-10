import fromTo from '../src/main'

test('fromTo: expect fromTo to be a defined ', () => {
	expect(fromTo()).toBeDefined()
})

test('fromTo: expect fromTo to end on 100 ', () => {
	const options = {
    start: 0,
    end: 100
  }
  return fromTo(options).then((data) => expect(data).toBe(100))
})

test('fromTo: expect value to update to 100 ', () => {
	const options = {
    start: 0,
    end: 100
  }
  let value = 0
  return fromTo(options, (v) => value = v).then(() => expect(value).toBe(100))
})