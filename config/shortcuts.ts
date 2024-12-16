interface Shortcut {
  label: string;
  key: string;
}

export const ShortcutsMap: Map<string, Shortcut> = new Map([
  ["SIDEBAR", { label: "Toggle sidebar", key: "b" }],
  ["QUICK_CHAT", { label: "Toggle Quick Chat", key: "c" }],
]);
