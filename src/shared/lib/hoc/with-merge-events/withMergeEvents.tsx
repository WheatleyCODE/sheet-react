import { ComponentType, memo } from 'react';

export interface IMergeEvents<E> {
  onMouseDown?: (e: React.MouseEvent<E>) => void;
  onMouseUp?: (e: React.MouseEvent<E>) => void;
  onMouseMove?: (e: React.MouseEvent<E>) => void;
  onClick?: (e: React.MouseEvent<E>) => void;
  onChange?: (e: React.ChangeEvent<E>) => void;
}

export interface IWithMergeEventsProps<E> {
  events: IMergeEvents<E>[];
}

export const withMergeEvents = <E extends Element, Props extends object>(Component: ComponentType<Props>) => {
  return memo((props: Props & IWithMergeEventsProps<E>) => {
    const { events } = props;

    const eventCallbacks: { [key: string]: ((e: unknown) => void)[] } = {};

    for (const event of events) {
      Object.keys(event).forEach((key) => {
        if (!eventCallbacks[key]) {
          eventCallbacks[key] = [];
        }

        eventCallbacks[key].push(event[key]);
      });
    }

    const eventHandlers: { [key: string]: (e: unknown) => void } = {};

    Object.keys(eventCallbacks).forEach((key) => {
      eventHandlers[key] = (event: unknown) => {
        eventCallbacks[key].forEach((fn) => fn(event));
      };
    });

    return <Component {...props} {...eventHandlers} />;
  });
};
