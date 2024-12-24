
class TrieNode {
  isWord: boolean
  constructor() {
    this.isWord = false
  }
}
export class Trie {
  root: TrieNode
  constructor() {
    this.root = new TrieNode()
  }

  private setKey(word: string) {
    let node = this.root
    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      if (!node[char]) {
        node[char] = new TrieNode()
      }
      node = node[char]
    }
    node.isWord = true
  }

  insert(words: string | string[]) {
    if (Array.isArray(words)) {
      words.forEach(word => this.setKey(word))
    } else {
      this.setKey(words)
    }
  }

  search(word: string) {
    let node = this.root
    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      if (!node[char]) {
        return false
      }
      node = node[char]
    }
    return node.isWord
  }

  startsWith(prefix: string) {
    let node = this.root
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i]
      if (!node[char]) {
        return false
      }
      node = node[char]
    }
    return true
  }
}
 const trie: any = new Trie()
  const keys = ['sendAddressName1', '住', 'e11住啊a手']
  trie.insert(keys)
const highLight = (str: string) => {
  const result = []
  // 遍历指针
  let start = 0
  // 匹配指针
  let index = 0
  let node = trie.root
  let newStr = ''

  while (start < str.length) {
    index = start
    if (node[str[index]]) {
      let matchedIndex = null
      while (index < str.length && node[str[index]]) {
        node = node[str[index]]
        index++
        if (node.isWord) {
          matchedIndex = index
        }
      }
      if (matchedIndex) {
        const pre = [...(result[result.length - 1] ?? [])]
        let curRange = []
        // 如果上一个匹配的结束位置大于当前匹配的开始位置，则合并
        if (pre && pre[1] > start) {
          curRange = [pre[1], matchedIndex]
        } else {
          curRange = [start, matchedIndex]
        }
        result.push(curRange)
      }
      node = trie.root
    }
    start++
  }
  if (result.length === 0) {
    return str
  } else {
    result.forEach((item, index, arr) => {
      const [start, end] = item
      const nextStart = arr[index + 1]?.[0] ?? str.length
      const prevEnd = arr[index - 1]?.[1] ?? 0
      newStr +=
        str.slice(prevEnd, start) +
        `<span style="color: red">${str.slice(start, end)}</span>` +
        str.slice(end, nextStart)
    })
  }
  return newStr
}
const gStr = Array.from({ length: 10000 }, () => 'sendAddressName1住啊a手动阀').join('')
const str = highLight(gStr)
