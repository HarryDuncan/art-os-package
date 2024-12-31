export const dispatchInteractionEvent = (eventName: string, data?: unknown) => {
  const e = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(e);
};
