export const selectLastChar = ($el: HTMLElement) => {
  $el.focus();
  document.execCommand('selectAll', false);
  const selection = document.getSelection();

  if (selection) {
    selection.collapseToEnd();
  }
};
