(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode('.cdx-nested-list{margin:0;padding:0;outline:none;counter-reset:item;list-style:none}.cdx-nested-list__item{line-height:1.6em;display:flex;margin:2px 0}.cdx-nested-list__item [contenteditable]{outline:none}.cdx-nested-list__item-body{flex-grow:2}.cdx-nested-list__item-content,.cdx-nested-list__item-children{flex-basis:100%}.cdx-nested-list__item-content{word-break:break-word;white-space:pre-wrap}.cdx-nested-list__item:before{counter-increment:item;margin-right:5px;white-space:nowrap}.cdx-nested-list--numbered>.cdx-nested-list__item:before{content:counters(item,".") ". "}.cdx-nested-list--unordered>.cdx-nested-list__item:before{content:"•"}.cdx-nested-list--circled>.cdx-nested-list__item:before{content:"○"}.cdx-nested-list--squared>.cdx-nested-list__item:before{content:"■"}.cdx-nested-list--stared>.cdx-nested-list__item:before{content:"★"}.cdx-nested-list--dashed>.cdx-nested-list__item:before{content:"-"}.cdx-nested-list--arrowed>.cdx-nested-list__item:before{content:"→"}.cdx-nested-list__settings{display:flex}.cdx-nested-list__settings .cdx-settings-button{width:50%}[data-item-name=normal] .ce-popover-item__icon,[data-item-name=compact] .ce-popover-item__icon{width:1px;overflow:hidden;opacity:0}')),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
function d(c) {
  return c.nodeType === Node.ELEMENT_NODE;
}
function u(c, t = null, e) {
  const n = document.createElement(c);
  Array.isArray(t) ? n.classList.add(...t) : t && n.classList.add(t);
  for (const i in e)
    n[i] = e[i];
  return n;
}
function f(c) {
  const t = u("div");
  return t.appendChild(c), t.innerHTML;
}
function w(c) {
  let t;
  return c.nodeType !== Node.ELEMENT_NODE ? t = c.textContent : (t = c.innerHTML, t = t.replaceAll("<br>", "")), (t == null ? void 0 : t.trim().length) === 0;
}
class h {
  /**
   * Store internal properties
   */
  constructor() {
    this.savedFakeCaret = void 0;
  }
  /**
   * Saves caret position using hidden <span>
   *
   * @returns {void}
   */
  save() {
    const t = h.range, e = u("span");
    e.hidden = !0, t && (t.insertNode(e), this.savedFakeCaret = e);
  }
  /**
   * Restores the caret position saved by the save() method
   *
   * @returns {void}
   */
  restore() {
    if (!this.savedFakeCaret)
      return;
    const t = window.getSelection();
    if (!t)
      return;
    const e = new Range();
    e.setStartAfter(this.savedFakeCaret), e.setEndAfter(this.savedFakeCaret), t.removeAllRanges(), t.addRange(e), setTimeout(() => {
      var n;
      (n = this.savedFakeCaret) == null || n.remove();
    }, 150);
  }
  /**
   * Returns the first range
   *
   * @returns {Range|null}
   */
  static get range() {
    const t = window.getSelection();
    return t && t.rangeCount ? t.getRangeAt(0) : null;
  }
  /**
   * Extract content fragment from Caret position to the end of contenteditable element
   *
   * @returns {DocumentFragment|void}
   */
  static extractFragmentFromCaretPositionTillTheEnd() {
    const t = window.getSelection();
    if (!t || !t.rangeCount)
      return;
    const e = t.getRangeAt(0);
    let n = e.startContainer;
    if (n.nodeType !== Node.ELEMENT_NODE) {
      if (!n.parentNode)
        return;
      n = n.parentNode;
    }
    if (!d(n))
      return;
    const i = n.closest("[contenteditable]");
    if (!i)
      return;
    e.deleteContents();
    const r = e.cloneRange();
    return r.selectNodeContents(i), r.setStart(e.endContainer, e.endOffset), r.extractContents();
  }
  /**
   * Set focus to contenteditable or native input element
   *
   * @param {HTMLElement} element - element where to set focus
   * @param {boolean} atStart - where to set focus: at the start or at the end
   * @returns {void}
   */
  static focus(t, e = !0) {
    const n = document.createRange(), i = window.getSelection();
    i && (n.selectNodeContents(t), n.collapse(e), i.removeAllRanges(), i.addRange(n));
  }
  /**
   * Check if the caret placed at the start of the contenteditable element
   *
   * @returns {boolean}
   */
  static isAtStart() {
    const t = window.getSelection();
    if (!t || t.focusOffset > 0)
      return !1;
    const e = t.focusNode;
    return !e || !d(e) ? !1 : h.getHigherLevelSiblings(e, "left").every((r) => w(r));
  }
  /**
   * Get all first-level (first child of [contenteditabel]) siblings from passed node
   * Then you can check it for emptiness
   *
   * @example
   * <div contenteditable>
   * <p></p>                            |
   * <p></p>                            | left first-level siblings
   * <p></p>                            |
   * <blockquote><a><b>adaddad</b><a><blockquote>       <-- passed node for example <b>
   * <p></p>                            |
   * <p></p>                            | right first-level siblings
   * <p></p>                            |
   * </div>
   * @param {HTMLElement} from - element from which siblings should be searched
   * @param {'left' | 'right'} direction - direction of search
   * @returns {HTMLElement[]}
   */
  static getHigherLevelSiblings(t, e = "left") {
    let n = t;
    const i = [];
    for (; n.parentNode && n.parentNode.contentEditable !== "true"; )
      n = n.parentNode;
    const r = e === "left" ? "previousSibling" : "nextSibling";
    for (; n[r]; )
      n = n[r], i.push(n);
    return i;
  }
}
const C = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><line x1="9" x2="19" y1="7" y2="7" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="9" x2="19" y1="12" y2="12" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="9" x2="19" y1="17" y2="17" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5.00001 17H4.99002"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5.00001 12H4.99002"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5.00001 7H4.99002"/></svg>', v = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.6303 7.09091V18H11.3239V9.28018H11.2599L8.76172 10.8462V8.80078L11.4624 7.09091H13.6303Z" fill="currentColor"/>
</svg>`, y = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5653 15.7955C11.8778 15.7955 11.25 15.6278 10.6818 15.2926C10.1136 14.9517 9.65909 14.4972 9.31818 13.929C8.98295 13.3608 8.81534 12.733 8.81534 12.0455C8.81534 11.3523 8.98295 10.7244 9.31818 10.1619C9.65909 9.59375 10.1136 9.14205 10.6818 8.80682C11.25 8.46591 11.8778 8.29545 12.5653 8.29545C13.2585 8.29545 13.8864 8.46591 14.4489 8.80682C15.017 9.14205 15.4688 9.59375 15.804 10.1619C16.1449 10.7244 16.3153 11.3523 16.3153 12.0455C16.3153 12.733 16.1449 13.3608 15.804 13.929C15.4688 14.4972 15.017 14.9517 14.4489 15.2926C13.8864 15.6278 13.2585 15.7955 12.5653 15.7955Z" fill="currentColor"/>
</svg>`, L = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4_6)">
<path d="M12.5739 16.1136C12.0578 16.1136 11.5724 16.0166 11.1179 15.8224C10.6657 15.6283 10.2668 15.3596 9.92116 15.0163C9.57789 14.6707 9.308 14.2718 9.11151 13.8196C8.91738 13.3674 8.8215 12.8821 8.82386 12.3636C8.82623 11.8452 8.92448 11.3598 9.11861 10.9077C9.3151 10.4555 9.58499 10.0578 9.92827 9.71449C10.2715 9.36884 10.6693 9.09896 11.1214 8.90483C11.5736 8.7107 12.0578 8.61364 12.5739 8.61364C13.0923 8.61364 13.5777 8.7107 14.0298 8.90483C14.4844 9.09896 14.8821 9.36884 15.223 9.71449C15.5663 10.0578 15.835 10.4555 16.0291 10.9077C16.2232 11.3598 16.3215 11.8452 16.3239 12.3636C16.3262 12.8821 16.2304 13.3674 16.0362 13.8196C15.8421 14.2718 15.5734 14.6707 15.2301 15.0163C14.8868 15.3596 14.4879 15.6283 14.0334 15.8224C13.5788 16.0166 13.0923 16.1136 12.5739 16.1136ZM12.5739 14.9311C12.9313 14.9311 13.2652 14.8648 13.5753 14.7322C13.8878 14.5997 14.1612 14.4162 14.3956 14.1818C14.63 13.9451 14.8134 13.6728 14.946 13.3651C15.0786 13.0549 15.1437 12.7223 15.1413 12.3672C15.1413 12.0097 15.0739 11.6759 14.9389 11.3658C14.8063 11.0533 14.6229 10.7798 14.3885 10.5455C14.1541 10.3111 13.8819 10.1276 13.5717 9.99503C13.2616 9.86245 12.929 9.79616 12.5739 9.79616C12.2211 9.79616 11.8897 9.86245 11.5795 9.99503C11.2718 10.1276 10.9995 10.3123 10.7628 10.549C10.5284 10.7834 10.3438 11.0568 10.2088 11.3693C10.0739 11.6795 10.0064 12.0121 10.0064 12.3672C10.004 12.7199 10.0691 13.0514 10.2017 13.3615C10.3366 13.6693 10.5213 13.9415 10.7557 14.1783C10.9924 14.4126 11.2659 14.5973 11.576 14.7322C11.8861 14.8648 12.2188 14.9311 12.5739 14.9311Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_4_6">
<rect width="24" height="24" fill="white" transform="translate(0.5)"/>
</clipPath>
</defs>
</svg>`, k = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4_9)">
<path d="M8.9375 16V8.72727H16.2102V16H8.9375Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_4_9">
<rect width="24" height="24" fill="white" transform="translate(0.5)"/>
</clipPath>
</defs>
</svg>`, b = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4_12)">
<path d="M12.7273 14.1321L10.0426 16.071L11.1009 12.9176L8.40909 10.9716H11.7045L12.7273 7.81818L13.75 10.9716H17.0455L14.3537 12.9176L15.4119 16.071L12.7273 14.1321Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_4_12">
<rect width="24" height="24" fill="white" transform="translate(0.5)"/>
</clipPath>
</defs>
</svg>`, x = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5_15)">
<path d="M15.0043 10.8267V13.2273H8.37074V10.8267H15.0043Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_5_15">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`, I = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5_18)">
<path d="M12.4766 16.4375L11.5703 15.5391L13.9492 13.1602H8.375V11.8398H13.9492L11.5703 9.46484L12.4766 8.5625L16.4141 12.5L12.4766 16.4375Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_5_18">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`, N = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 9.91718L11.8586 5.05858C11.9367 4.98048 12.0633 4.98048 12.1414 5.05858L17 9.91718" stroke="black" stroke-width="2" stroke-linecap="round"/>
<path d="M17 14L12.1414 18.8586C12.0633 18.9367 11.9367 18.9367 11.8586 18.8586L7 14" stroke="black" stroke-width="2" stroke-linecap="round"/>
</svg>`;
class m {
  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Allow to use native Enter behaviour
   *
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return !0;
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {ToolboxConfig}
   */
  static get toolbox() {
    return {
      icon: C,
      title: "List"
    };
  }
  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {object} params - tool constructor options
   * @param {ListData} params.data - previously saved data
   * @param {object} params.config - user config for Tool
   * @param {object} params.api - Editor.js API
   * @param {boolean} params.readOnly - read-only mode flag
   */
  constructor({ data: t, config: e, api: n, readOnly: i }) {
    var s;
    this.nodes = {
      wrapper: null
    }, this.api = n, this.readOnly = i, this.config = e, this.defaultListStyle = ((s = this.config) == null ? void 0 : s.defaultStyle) === "numbered" ? "numbered" : "unordered";
    const r = {
      style: this.defaultListStyle,
      spacing: "normal",
      items: []
    };
    this.data = t && Object.keys(t).length ? t : r, this.caret = new h();
  }
  /**
   * Returns list tag with items
   *
   * @returns {Element}
   * @public
   */
  render() {
    return this.nodes.wrapper = this.makeListWrapper(this.data.style, [
      this.CSS.baseBlock
    ]), this.data.items.length ? this.appendItems(this.data.items, this.nodes.wrapper) : this.appendItems(
      [
        {
          content: "",
          items: []
        }
      ],
      this.nodes.wrapper
    ), this.readOnly || this.nodes.wrapper.addEventListener(
      "keydown",
      (t) => {
        switch (t.key) {
          case "Enter":
            this.enterPressed(t);
            break;
          case "Backspace":
            this.backspace(t);
            break;
          case "Tab":
            t.shiftKey ? this.shiftTab(t) : this.addTab(t);
            break;
        }
      },
      !1
    ), this.nodes.wrapper;
  }
  /**
   * Creates Block Tune allowing to change the list style
   *
   * @public
   * @returns {Array}
   */
  renderSettings() {
    const t = [
      {
        name: "unordered",
        title: this.api.i18n.t("Unordered"),
        icon: y
      },
      {
        name: "numbered",
        title: this.api.i18n.t("Numbered"),
        icon: v
      },
      {
        name: "circled",
        title: this.api.i18n.t("Circled"),
        icon: L
      },
      {
        name: "squared",
        title: this.api.i18n.t("Squared"),
        icon: k
      },
      {
        name: "stared",
        title: this.api.i18n.t("Stared"),
        icon: b
      },
      {
        name: "dashed",
        title: this.api.i18n.t("Dashed"),
        icon: x
      },
      {
        name: "arrowed",
        title: this.api.i18n.t("Arrowed"),
        icon: I
      }
    ], e = [
      {
        name: "normal",
        title: this.api.i18n.t("Normal"),
        icon: null
      },
      {
        name: "compact",
        title: this.api.i18n.t("Compact"),
        icon: null
      }
    ];
    return [
      {
        name: "style",
        title: this.api.i18n.t("Style"),
        icon: C,
        children: {
          items: t.map((n) => ({
            name: n.name,
            icon: n.icon,
            title: n.title,
            isActive: this.data.style === n.name,
            closeOnActivate: !0,
            onActivate: () => {
              this.listStyle = n.name;
            }
          }))
        }
      },
      {
        name: "spacing",
        title: this.api.i18n.t("Spacing"),
        icon: N,
        children: {
          items: e.map((n) => ({
            name: n.name,
            icon: n.icon,
            title: n.title,
            isActive: this.data.spacing === n.name,
            closeOnActivate: !0,
            onActivate: () => {
              this.data.spacing = n.name;
            }
          }))
        }
      }
    ];
  }
  /**
   * On paste sanitzation config. Allow only tags that are allowed in the Tool.
   *
   * @returns {PasteConfig} - paste config.
   */
  static get pasteConfig() {
    return {
      tags: ["OL", "UL", "LI"]
    };
  }
  /**
   * On paste callback that is fired from Editor.
   *
   * @param {PasteEvent} event - event with pasted data
   */
  onPaste(t) {
    const e = t.detail.data;
    this.data = this.pasteHandler(e);
    const n = this.nodes.wrapper;
    n && n.parentNode && n.parentNode.replaceChild(this.render(), n);
  }
  /**
   * Handle UL, OL and LI tags paste and returns List data
   *
   * @param {HTMLUListElement|HTMLOListElement|HTMLLIElement} element
   * @returns {ListData}
   */
  pasteHandler(t) {
    const { tagName: e } = t;
    let n = "unordered", i;
    switch (e) {
      case "OL":
        n = "numbered", i = "ol";
        break;
      case "UL":
      case "LI":
        n = "unordered", i = "ul";
    }
    const r = {
      style: n,
      spacing: "normal",
      items: []
    }, s = (l) => Array.from(l.querySelectorAll(":scope > li")).map((o) => {
      var g;
      const a = o.querySelector(`:scope > ${i}`), S = a ? s(a) : [];
      return {
        content: ((g = o == null ? void 0 : o.firstChild) == null ? void 0 : g.textContent) || "",
        items: S
      };
    });
    return r.items = s(t), r;
  }
  /**
   * Renders children list
   *
   * @param {ListItem[]} items - items data to append
   * @param {Element} parentItem - where to append
   * @returns {void}
   */
  appendItems(t, e) {
    t.forEach((n) => {
      const i = this.createItem(n.content, n.items);
      e.appendChild(i);
    });
  }
  /**
   * Renders the single item
   *
   * @param {string} content - item content to render
   * @param {ListItem[]} [items] - children
   * @returns {Element}
   */
  createItem(t, e = []) {
    const n = u("li", this.CSS.item), i = u("div", this.CSS.itemBody), r = u("div", this.CSS.itemContent, {
      innerHTML: t,
      contentEditable: (!this.readOnly).toString()
    });
    return i.appendChild(r), n.appendChild(i), e && e.length > 0 && this.addChildrenList(n, e), n;
  }
  /**
   * Extracts tool's data from the DOM
   *
   * @returns {ListData}
   */
  save() {
    const t = (e) => Array.from(
      e.querySelectorAll(`:scope > .${this.CSS.item}`)
    ).map((i) => {
      const r = i.querySelector(`.${this.CSS.itemChildren}`), s = this.getItemContent(i), l = r ? t(r) : [];
      return {
        content: s,
        items: l
      };
    });
    return {
      style: this.data.style,
      spacing: this.data.spacing,
      items: this.nodes.wrapper ? t(this.nodes.wrapper) : []
    };
  }
  /**
   * Append children list to passed item
   *
   * @param {Element} parentItem - item that should contain passed sub-items
   * @param {ListItem[]} items - sub items to append
   */
  addChildrenList(t, e) {
    const n = t.querySelector(`.${this.CSS.itemBody}`), i = this.makeListWrapper(void 0, [
      this.CSS.itemChildren
    ]);
    this.appendItems(e, i), n && n.appendChild(i);
  }
  /**
   * Creates main <ul> or <ol> tag depended on style
   *
   * @param {string} [style] - 'ordered' or 'unordered'
   * @param {string[]} [classes] - additional classes to append
   * @returns {HTMLOListElement|HTMLUListElement}
   */
  makeListWrapper(t = this.listStyle, e = []) {
    const n = t === "numbered" ? "ol" : "ul", i = `${this.CSS.wrapperType}${t}`;
    return e.push(i), u(n, [this.CSS.wrapper, ...e]);
  }
  /**
   * Styles
   *
   * @returns {NestedListCssClasses} - CSS classes names by keys
   * @private
   */
  get CSS() {
    return {
      baseBlock: this.api.styles.block,
      wrapper: "cdx-nested-list",
      wrapperType: "cdx-nested-list--",
      item: "cdx-nested-list__item",
      itemBody: "cdx-nested-list__item-body",
      itemContent: "cdx-nested-list__item-content",
      itemChildren: "cdx-nested-list__item-children",
      settingsWrapper: "cdx-nested-list__settings",
      settingsButton: this.api.styles.settingsButton,
      settingsButtonActive: this.api.styles.settingsButtonActive
    };
  }
  /**
   * Get list style name
   *
   * @returns {string}
   */
  get listStyle() {
    return this.data.style || this.defaultListStyle;
  }
  /**
   * Set list style
   *
   * @param {ListDataStyle} style - new style to set
   */
  set listStyle(t) {
    if (!this.nodes || !this.nodes.wrapper)
      return;
    const e = Array.from(
      this.nodes.wrapper.querySelectorAll(`.${this.CSS.wrapper}`)
    );
    e.push(this.nodes.wrapper), e.forEach((n) => {
      const i = [
        "unordered",
        "numbered",
        "circled",
        "squared",
        "stared",
        "dashed",
        "arrowed"
      ];
      for (const r of i)
        n.classList.remove(`${this.CSS.wrapperType}${r}`);
      n.classList.add(`${this.CSS.wrapperType}${t}`);
    }), this.data.style = t;
  }
  /**
   * Returns current List item by the caret position
   *
   * @returns {Element}
   */
  get currentItem() {
    const t = window.getSelection();
    if (!t)
      return null;
    let e = t.anchorNode;
    return !e || (d(e) || (e = e.parentNode), !e) || !d(e) ? null : e.closest(`.${this.CSS.item}`);
  }
  /**
   * Handles Enter keypress
   *
   * @param {KeyboardEvent} event - keydown
   * @returns {void}
   */
  enterPressed(t) {
    const e = this.currentItem;
    if (t.stopPropagation(), t.preventDefault(), t.isComposing)
      return;
    const n = e ? this.getItemContent(e).trim().length === 0 : !0, i = (e == null ? void 0 : e.parentNode) === this.nodes.wrapper, r = (e == null ? void 0 : e.nextElementSibling) === null;
    if (i && r && n) {
      this.getOutOfList();
      return;
    } else if (r && n) {
      this.unshiftItem();
      return;
    }
    const s = h.extractFragmentFromCaretPositionTillTheEnd();
    if (!s)
      return;
    const l = f(s), p = e == null ? void 0 : e.querySelector(
      `.${this.CSS.itemChildren}`
    ), o = this.createItem(l, void 0);
    p && Array.from(p.querySelectorAll(`.${this.CSS.item}`)).length > 0 ? p.prepend(o) : e == null || e.after(o), this.focusItem(o);
  }
  /**
   * Decrease indentation of the current item
   *
   * @returns {void}
   */
  unshiftItem() {
    const t = this.currentItem;
    if (!t || !t.parentNode || !d(t.parentNode))
      return;
    const e = t.parentNode.closest(`.${this.CSS.item}`);
    if (!e)
      return;
    this.caret.save(), e.after(t), this.caret.restore();
    const n = e.querySelector(
      `.${this.CSS.itemChildren}`
    );
    if (!n)
      return;
    n.children.length === 0 && n.remove();
  }
  /**
   * Return the item content
   *
   * @param {Element} item - item wrapper (<li>)
   * @returns {string}
   */
  getItemContent(t) {
    const e = t.querySelector(`.${this.CSS.itemContent}`);
    return !e || w(e) ? "" : e.innerHTML;
  }
  /**
   * Sets focus to the item's content
   *
   * @param {Element} item - item (<li>) to select
   * @param {boolean} atStart - where to set focus: at the start or at the end
   * @returns {void}
   */
  focusItem(t, e = !0) {
    const n = t.querySelector(
      `.${this.CSS.itemContent}`
    );
    n && h.focus(n, e);
  }
  /**
   * Get out from List Tool by Enter on the empty last item
   *
   * @returns {void}
   */
  getOutOfList() {
    var t;
    (t = this.currentItem) == null || t.remove(), this.api.blocks.insert(), this.api.caret.setToBlock(this.api.blocks.getCurrentBlockIndex());
  }
  /**
   * Handle backspace
   *
   * @param {KeyboardEvent} event - keydown
   */
  backspace(t) {
    if (!h.isAtStart())
      return;
    t.preventDefault();
    const e = this.currentItem;
    if (!e)
      return;
    const n = e.previousSibling;
    if (!e.parentNode || !d(e.parentNode))
      return;
    const i = e.parentNode.closest(`.${this.CSS.item}`);
    if (!n && !i || n && !d(n))
      return;
    t.stopPropagation();
    let r;
    if (n) {
      const a = n.querySelectorAll(
        `.${this.CSS.item}`
      );
      r = Array.from(a).pop() || n;
    } else
      r = i;
    const s = h.extractFragmentFromCaretPositionTillTheEnd();
    if (!s)
      return;
    const l = f(s);
    if (!r)
      return;
    const p = r.querySelector(
      `.${this.CSS.itemContent}`
    );
    if (!p)
      return;
    h.focus(p, !1), this.caret.save(), p.insertAdjacentHTML("beforeend", l);
    let o = e.querySelectorAll(
      `.${this.CSS.itemChildren} > .${this.CSS.item}`
    );
    o = Array.from(o), o = o.filter((a) => !a.parentNode || !d(a.parentNode) ? !1 : a.parentNode.closest(`.${this.CSS.item}`) === e), o.reverse().forEach((a) => {
      n ? r.after(a) : e.after(a);
    }), e.remove(), this.caret.restore();
  }
  /**
   * Add indentation to current item
   *
   * @param {KeyboardEvent} event - keydown
   */
  addTab(t) {
    t.stopPropagation(), t.preventDefault();
    const e = this.currentItem;
    if (!e)
      return;
    const n = e.previousSibling;
    if (!n || !d(n) || !n)
      return;
    const r = n.querySelector(
      `.${this.CSS.itemChildren}`
    );
    if (this.caret.save(), r)
      r.appendChild(e);
    else {
      const s = this.makeListWrapper(void 0, [
        this.CSS.itemChildren
      ]), l = n.querySelector(`.${this.CSS.itemBody}`);
      s.appendChild(e), l == null || l.appendChild(s);
    }
    this.caret.restore();
  }
  /**
   * Reduce indentation for current item
   *
   * @param {KeyboardEvent} event - keydown
   * @returns {void}
   */
  shiftTab(t) {
    t.stopPropagation(), t.preventDefault(), this.unshiftItem();
  }
  /**
   * Convert from list to text for conversionConfig
   *
   * @param {ListData} data
   * @returns {string}
   */
  static joinRecursive(t) {
    return t.items.map((e) => `${e.content} ${m.joinRecursive(e)}`).join("");
  }
  /**
   * Convert from text to list with import and export list to text
   */
  static get conversionConfig() {
    return {
      export: (t) => m.joinRecursive(t),
      import: (t) => ({
        items: [
          {
            content: t,
            items: []
          }
        ],
        spacing: "normal",
        style: "unordered"
      })
    };
  }
}
export {
  m as default
};
