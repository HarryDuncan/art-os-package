export const dispatchInteractionEvent = (eventName, data) => {
    const e = new CustomEvent(eventName, { detail: data });
    document.dispatchEvent(e);
};
