export const symbolGenerator = (): { [prop: string]: symbol } => {
  return new Proxy(
    {},
    {
      get(target, prop, receiver) {
        if (prop in target) {
          return Reflect.get(target, prop, receiver);
        }

        Reflect.set(target, prop, Symbol(String(prop)));
        return Reflect.get(target, prop, receiver);
      },
    }
  );
};
