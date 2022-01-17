export const handleHistoryOrder = (regex: string, history: String[]) => {
  history.push(regex);
  if (history.length > 1) {
    for (let i = history.length - 1; i > 0; i--) {
      history[i] = history[i - 1];
    }
    history[0] = regex;
  }
  if (history.length > 2) {
    history.splice(3);
  }
};
