import { ForEachCallback, MapCallback, Predicate } from '../interface';

export class IterMethods<T> {
  iterable: Iterable<T>;

  constructor(iterable: Iterable<T>) {
    this.iterable = iterable;
  }

  *[Symbol.iterator]() {
    yield* this.iterable;
  }

  filter(pred: Predicate<T>) {
    const { iterable } = this;

    const newIterable = (function* () {
      for (const el of iterable) {
        if (pred(el)) {
          yield el;
        }
      }
    })();

    return new IterMethods(newIterable);
  }

  map<N>(fn: MapCallback<T, N>) {
    const { iterable } = this;

    const newIterable = (function* () {
      for (const el of iterable) {
        yield fn(el);
      }
    })();

    return new IterMethods(newIterable);
  }

  forEach(fn: ForEachCallback<T>) {
    const { iterable } = this;

    const newIterable = (function* () {
      for (const el of iterable) {
        yield fn(el);
      }
    })();

    return new IterMethods(newIterable);
  }

  take(num: number) {
    const { iterable } = this;

    const newIterable = (function* () {
      if (num <= 0) return;

      for (const el of iterable) {
        if (num <= 0) return;

        num--;
        yield el;
      }
    })();

    return new IterMethods(newIterable);
  }

  enumerate() {
    const { iterable } = this;

    const newIterable = (function* () {
      let i = 0;

      for (const el of iterable) {
        yield [el, i];
        i++;
      }
    })();

    return new IterMethods(newIterable);
  }
}
