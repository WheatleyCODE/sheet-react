import { RefObject, useEffect } from 'react';

export type EventTypes = 'click' | 'contextmenu';

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void,
  eventTypes: EventTypes[] = ['click'],
  refOut?: RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    const fn = (event: MouseEvent) => {
      const el = ref?.current;

      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    if (refOut) {
      const cur = refOut.current;

      if (!cur) return;

      eventTypes.forEach((event) => {
        cur.addEventListener(event, fn);
      });

      return () => {
        eventTypes.forEach((event) => {
          cur.addEventListener(event, fn);
        });
      };
    }

    eventTypes.forEach((event) => {
      document.body.addEventListener(event, fn);
    });

    return () => {
      eventTypes.forEach((event) => {
        document.body.removeEventListener(event, fn);
      });
    };
  }, [eventTypes, handler, ref, refOut]);
};
