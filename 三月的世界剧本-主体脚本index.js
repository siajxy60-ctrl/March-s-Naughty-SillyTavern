(() => {
  const SCRIPT_TITLE = "⚝︎三月的世界剧本";
  const ROOT_ID = "march-world-root";
  const BTN_ID = "march-world-menu-item";
  const BASE = "https://cdn.jsdelivr.net/gh/siajxy60-ctrl/March-s-Naughty-SillyTavern@cdn";
  const PAGE = `${BASE}/ui/panel.html?v=20260226b`;

  if (window.__MARCH_WORLD_INIT__) return;
  window.__MARCH_WORLD_INIT__ = true;

  function closePanel() { document.getElementById(ROOT_ID)?.remove(); }
  function openPanel() {
    closePanel();
    const root = document.createElement("div");
    root.id = ROOT_ID;
    root.style.cssText = "position:fixed;inset:0;z-index:10050;background:rgba(0,0,0,.25);display:flex;justify-content:center;align-items:flex-start;padding-top:56px;";
    root.innerHTML = `<iframe src="${PAGE}" style="width:min(96vw,640px);height:min(92vh,860px);border:0;"></iframe>`;
    root.addEventListener("click", (e) => { if (e.target === root) closePanel(); });
    document.body.appendChild(root);
  }

  function mountEntry() {
    document.getElementById(BTN_ID)?.remove();
    replaceScriptButtons([]);

    const menu = $("#extensionsMenu");
    if (menu.length) {
      const item = $(`<div id="${BTN_ID}" class="extension_container interactable" tabindex="0"><div class="list-group-item flex-container flexGap5 interactable"><div class="fa-fw fa-solid fa-scroll"></div><span>${SCRIPT_TITLE}</span></div></div>`);
      item.on("click", openPanel);
      menu.append(item);
      return;
    }
    replaceScriptButtons([{ name: SCRIPT_TITLE, visible: true }]);
  }

  window.addEventListener("message", (ev) => { if (ev.data?.type === "MARCH_CLOSE") closePanel(); });
  eventOn(getButtonEvent(SCRIPT_TITLE), openPanel);
  eventOn(tavern_events.CHAT_CHANGED, mountEntry);
  mountEntry();
  toastr?.success?.("三月的世界剧本已加载");
  console.info("三月的世界剧本（分离版）已加载");
})();
