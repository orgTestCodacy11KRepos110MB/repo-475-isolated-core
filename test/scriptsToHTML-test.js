import expect from 'expect'
import scriptsToHTML from '../src/utils/scriptsToHTML'

describe('scriptsToHTML', () => {
  it('converts a scripts object into an HTML string', () => {
    const scripts = [
      'string.js',
      Object.create({ foo: 'bar' }, { src: { value: 'test.js', enumerable: true } }),
      { src: 'async.js', async: true },
    ]
    const result = scriptsToHTML(scripts, 'test(this.src)')
    const expectedResult = `
      <script src="string.js" onerror="test(this.src)"></script>
      <script src="test.js" onerror="test(this.src)"></script>
      <script src="async.js" async="true" onerror="test(this.src)"></script>
    `.replace(/\n\s*/g, '')
    expect(result).toBe(expectedResult)
  })
})