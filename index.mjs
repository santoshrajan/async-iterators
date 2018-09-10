
export function eventIterator (elem, type) {
  let resolve
  const callback = obj => resolve(obj)
  const producer = (async function* () {
    for (;;) {
      yield await new Promise(r => resolve = r)
    }
  })()
  if (elem.addEventListener) {
    elem.addEventListener(type, callback)
    return producer
  }
  if (elem.on) {
    elem.on(type, callback)
    return producer
  }
}

export async function runIterator(iterator, fn) {
  for await (const n of iterator) fn(n)
}

export async function* mapIterator (iterator, fn) {
  for await (const e of iterator) yield fn(e)
}

export function mergeIterators (...iterators) {
  let resolve
  const callback = obj => resolve(obj)
  const producer = (async function* () {
    for (;;) {
      yield await new Promise(r => resolve = r)
    }
  })()
  for (const iterator of iterators) {
    runIterator(iterator, callback)
  }
  return producer
}

export function domEventIterator (elem, type) {
  if (typeof elem === 'string') elem = document.querySelector(elem)
  return eventIterator(elem, type)
}

export function clickIterator (elem)  { return domEventIterator(elem, 'click')}



