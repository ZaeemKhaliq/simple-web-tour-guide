import e from "react";
import { createComponent as t } from "@lit/react";
import { LitElement as n, css as r, html as i, unsafeCSS as a } from "lit";
import { customElement as o, property as s, query as c, queryAssignedElements as l, state as u } from "lit/decorators.js";
//#region src/constants.ts
var d = "close-button", f = "step-back-button", p = "step-next-button", m = "tour-guides-overlay", h = "root-container", g = "170px", _ = "288px", v = "rgba(0,0,0,0.3)", y = {
	IS_ENABLED: "is-enabled",
	DISABLE_CLOSE_ON_OUTSIDE_CLICK: "disable-close-on-outside-click",
	STEP_CONTENT_HEIGHT: "step-content-height",
	STEP_CONTENT_WIDTH: "step-content-width",
	HIDE_HEADER: "hide-header",
	ALLOW_OUTSIDE_INTERACTION: "allow-outside-interaction",
	DONE_LABEL: "done-label",
	OVERLAY_FILL_COLOR: "overlay-fill-color",
	DONT_HIDE_BACK_BUTTON_ON_FIRST_STEP: "dont-hide-back-button-on-first-step",
	HIDE_BULLETS: "hide-bullets"
}, b = {
	ON_CLOSE: "simple-tour-guide:on-close",
	ON_DONE: "simple-tour-guide:on-done",
	ON_STEP_CHANGE: "simple-tour-guide:on-step-change"
};
//#endregion
//#region \0@oxc-project+runtime@0.132.0/helpers/decorate.js
function x(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/simple-tour-guide.ts
var S = class extends n {
	constructor() {
		super(), this._internals = this.attachInternals(), this.isEnabled = !1, this.disableCloseOnOutsideClick = !1, this.stepContentHeight = g, this.stepContentWidth = _, this.hideHeader = !1, this.allowOutsideInteraction = !1, this.doneLabel = "Done", this.overlayFillColor = v, this.dontHideBackButtonOnFirstStep = !1, this.hideBullets = !1, this._tourGuideActiveStepIndex = -1, this._stepHeading = "", this._activeStepAnchorElem = null, this._queuedElemForMoveHighlightMask = null, this._isClosing = !1, this._handleOverlayClick = this._handleOverlayClick.bind(this), this._onScrollEnd = this._onScrollEnd.bind(this), this._handleScroll = this._handleScroll.bind(this), this._handleKeydown = this._handleKeydown.bind(this), this._handleWindowResize = this._handleWindowResize.bind(this);
	}
	connectedCallback() {
		super.connectedCallback(), window.addEventListener("resize", this._handleWindowResize), window.addEventListener("scroll", this._handleScroll), window.addEventListener("scrollend", this._onScrollEnd), window.addEventListener("keydown", this._handleKeydown);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), window.removeEventListener("resize", this._handleWindowResize), window.removeEventListener("scroll", this._handleScroll), window.removeEventListener("scrollend", this._onScrollEnd), window.removeEventListener("keydown", this._handleKeydown);
	}
	async attributeChangedCallback(e, t, n) {
		super.attributeChangedCallback(e, t, n), y.IS_ENABLED, y.DISABLE_CLOSE_ON_OUTSIDE_CLICK, y.ALLOW_OUTSIDE_INTERACTION;
	}
	willUpdate(e) {
		let t = e.has("stepContentWidth"), n = e.has("stepContentHeight"), r = e.has("overlayFillColor");
		t && this.stepContentWidth == null && (this.stepContentWidth = _), n && this.stepContentHeight == null && (this.stepContentHeight = g), r && this.overlayFillColor == null && (this.overlayFillColor = v);
	}
	updated(e) {
		(() => {
			if (!e.has("_tourGuideActiveStepIndex")) return;
			let t = this._tourGuideActiveStepIndex === 0, n = this._tourGuideActiveStepIndex === this._stepContentElements?.length - 1;
			this._emitCustomEvent({
				name: b.ON_STEP_CHANGE,
				detail: {
					isFirstStep: t,
					isLastStep: n,
					stepIndex: this._tourGuideActiveStepIndex
				}
			}), n ? this._internals.states.add("on-last-step") : this._internals.states.delete("on-last-step"), t ? this._internals.states.add("on-first-step") : this._internals.states.delete("on-first-step"), this._stepContentElements?.forEach((e, t) => {
				e.hidden = t !== this._tourGuideActiveStepIndex;
			});
			let r = this._stepContentElements?.[this._tourGuideActiveStepIndex];
			if (!r) return;
			let i = r.dataset.anchorElement, a = document.querySelector(i);
			if (!a) {
				this._emitCloseTourGuideEvent();
				return;
			}
			this._activeStepAnchorElem = a;
			let o = r.dataset.stepHeading || "";
			this._stepHeading = o, this._moveHighlightMaskToElement(a);
			let s = `--tour-guide-anchor-${this._tourGuideActiveStepIndex}`;
			a.style.anchorName = s, this.style.width = "auto", this.style.height = "auto", this.style.position = "absolute", this.style.positionAnchor = s, this.style.top = "calc(anchor(end) + 0.125rem)", this.style.left = "anchor(left)", this.style.positionTryFallbacks = "flip-block, flip-inline", this.style.transition = "all 0.2s ease";
		})(), e.has("isEnabled") && (this.isEnabled ? (this._isClosing = !1, this._setupUI()) : this._isClosing = !0), (() => {
			if (!e.has("_isClosing") || !this._isClosing) return;
			let t = this._rootContainerElem;
			if (!t) {
				this._closeTourGuide(), this._isClosing = !1;
				return;
			}
			t.addEventListener("animationend", (e) => {
				e.animationName === "tour-guide-exit" && (this._closeTourGuide(), this._isClosing = !1);
			}, { once: !0 });
		})(), e.has("disableCloseOnOutsideClick") && this._overlayElem && (this.disableCloseOnOutsideClick ? this._overlayElem.removeEventListener("click", this._handleOverlayClick) : (this._overlayElem.removeEventListener("click", this._handleOverlayClick), this._overlayElem.addEventListener("click", this._handleOverlayClick))), e.has("allowOutsideInteraction") && this._overlayElem && (this.allowOutsideInteraction ? this._overlayElem.style.pointerEvents = "none" : this._overlayElem.style.pointerEvents = "initial"), (() => {
			let e = this.shadowRoot?.querySelectorAll("[data-slot-target=\"step-bullet\"]") || [], t = this._stepBulletSlottedElements?.[0];
			t && e?.forEach((e) => {
				e.classList.remove("step-bullet"), e.innerHTML = "", e.appendChild(t.cloneNode(!0));
			});
		})();
	}
	_emitCustomEvent({ name: e, detail: t }) {
		this.dispatchEvent(new CustomEvent(e, {
			bubbles: !0,
			composed: !0,
			detail: t
		}));
	}
	_emitCloseTourGuideEvent() {
		this._emitCustomEvent({ name: b.ON_CLOSE });
	}
	_setupUI() {
		if (!this._stepContentElements?.length) {
			this._emitCloseTourGuideEvent();
			return;
		}
		this._tourGuideActiveStepIndex = 0, this._stepHeading = "Step Heading", this._insertOverlayInMainDocument(), this?._rootContainerElem?.focus?.();
	}
	_closeTourGuide() {
		this._overlayElem && (this._overlayElem.removeEventListener("click", this._handleOverlayClick), this._overlayElem?.parentNode?.removeChild?.(this._overlayElem)), this._tourGuideActiveStepIndex = -1, this._activeStepAnchorElem = null, this._queuedElemForMoveHighlightMask = null;
	}
	_handleNextButtonClick() {
		if (this._tourGuideActiveStepIndex === this._stepContentElements?.length - 1) {
			this._emitCustomEvent({ name: b.ON_DONE });
			return;
		}
		this._tourGuideActiveStepIndex = Math.min(this._tourGuideActiveStepIndex + 1, this._stepContentElements?.length - 1);
	}
	_handleBackButtonClick() {
		this._tourGuideActiveStepIndex = Math.max(this._tourGuideActiveStepIndex - 1, 0);
	}
	_handleCloseButtonClick() {
		this._emitCloseTourGuideEvent();
	}
	_handleOverlayClick() {
		this._emitCloseTourGuideEvent();
	}
	_insertOverlayInMainDocument() {
		let e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this._overlayElem = e, e.id = m, e.style.position = "fixed", e.style.inset = "0px", e.style.width = "100%", e.style.height = "100%", e.style.zIndex = "9999999", this.allowOutsideInteraction && (e.style.pointerEvents = "none");
		let t = this._stepContentElements?.[this._tourGuideActiveStepIndex];
		if (!t) return;
		let n = t.dataset.anchorElement, r = document.querySelector(n);
		if (!r) {
			this._emitCloseTourGuideEvent();
			return;
		}
		this._activeStepAnchorElem = r, this._moveHighlightMaskToElement(r), this.disableCloseOnOutsideClick ? e.removeEventListener("click", this._handleOverlayClick) : (e.removeEventListener("click", this._handleOverlayClick), e.addEventListener("click", this._handleOverlayClick));
		let i = document.body;
		i.insertBefore(e, i.firstChild);
	}
	_moveHighlightMaskToElement(e) {
		let t = e?.offsetTop < window.scrollY || e?.offsetTop > window.innerHeight + window.scrollY;
		typeof e.scrollIntoView == "function" && (e.scrollIntoView({
			behavior: "smooth",
			block: "center"
		}), t && (this._queuedElemForMoveHighlightMask = e)), this._insertHighlightMaskElementOnPage(e);
	}
	_insertHighlightMaskElementOnPage(e) {
		if (!this._overlayElem) return;
		let t = e.getBoundingClientRect(), n = Math.max(0, t.top);
		this._overlayElem.innerHTML = `
          <defs>
            <mask id="cutout">
              <rect width="100%" height="100%" fill="white"/>
              <rect 
                x="${t.left}" y="${n}" 
                width="${t.width}" height="${t.height}" 
                rx="6"
                fill="black"/>
            </mask>
          </defs>
          <rect 
            width="100%" height="100%" 
            fill=${this.overlayFillColor} 
            mask="url(#cutout)"/>
        `;
	}
	_handleKeydown(e) {
		e?.key === "Escape" && this._emitCloseTourGuideEvent();
	}
	_handleBulletClick({ stepElementIndex: e }) {
		this._tourGuideActiveStepIndex = e;
	}
	_onScrollEnd() {
		this._queuedElemForMoveHighlightMask &&= (this._moveHighlightMaskToElement(this._queuedElemForMoveHighlightMask), null);
	}
	_handleScroll() {
		(() => {
			if (this._activeStepAnchorElem) if (this._activeStepAnchorElem?.clientHeight + this._activeStepAnchorElem?.offsetTop < window.scrollY || this._activeStepAnchorElem?.offsetTop > window.innerHeight + window.scrollY) {
				let e = `
              <defs>
                <mask id="cutout">
                  <rect width="100%" height="100%" fill="white"/>
                </mask>
              </defs>
              <rect 
                width="100%" height="100%" 
                fill=${this.overlayFillColor}
                mask="url(#cutout)"/>
            `;
				this._overlayElem && (this._overlayElem.innerHTML = e);
			} else this._insertHighlightMaskElementOnPage(this._activeStepAnchorElem);
		})();
	}
	_handleWindowResize() {
		this._activeStepAnchorElem && this._moveHighlightMaskToElement(this._activeStepAnchorElem);
	}
	render() {
		if (!this.isEnabled && !this._isClosing) return null;
		let e = +(this._tourGuideActiveStepIndex === 0), t = this._tourGuideActiveStepIndex === 0, n = this._tourGuideActiveStepIndex === this._stepContentElements?.length - 1;
		return i`
      <style>
        ::slotted([slot="step-content"]) {
          overflow-y: auto;
          height: ${a(this.stepContentHeight)};
          max-height: ${a(this.stepContentHeight)};
          width: ${a(this.stepContentWidth)};
        }

        #tour-guide-step-heading {
          font-weight: 700;
          font-size: 1.125rem;
          max-width: calc(${a(this.stepContentWidth)} - 3rem);
          color: #000000;
        }
      </style>

      <div
        id=${h}
        class=${this._isClosing ? "closing" : ""}
        tabindex="0"
        part=${h}
      >
        <slot name="header">
          ${this.hideHeader ? "" : i`
                <header part="header">
                  <p id="tour-guide-step-heading" part="step-heading">
                    ${this._stepHeading}
                  </p>
                </header>
              `}
        </slot>

        <slot name="close-button">
          <button
            id="close-button"
            part="close-button"
            @click=${this._handleCloseButtonClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
              />
            </svg>
          </button>
        </slot>

        <main id="tour-guide-main" part="content-main">
          <slot name="step-content"></slot>

          ${this.hideBullets ? null : i`
                <div id="step-bullets-container">
                  ${this._stepContentElements?.map((t, n) => {
			let r = n === this._tourGuideActiveStepIndex;
			return r ? i`
                        <slot
                          name="step-bullet-active"
                          @click=${() => {
				this._handleBulletClick({ stepElementIndex: n });
			}}
                        >
                          <button
                            class="step-bullet step-bullet--active step-bullet-${n}"
                          ></button>
                        </slot>
                      ` : n === e ? i`
                        <slot
                          name="step-bullet"
                          @click=${() => {
				this._handleBulletClick({ stepElementIndex: n });
			}}
                        >
                          <button
                            class="step-bullet step-bullet-${n}${r ? " step-bullet--active" : ""}"
                          ></button>
                        </slot>
                      ` : i`
                      <div
                        data-slot-target="step-bullet"
                        class="step-bullet step-bullet-${n}"
                        @click=${() => {
				this._handleBulletClick({ stepElementIndex: n });
			}}
                      ></div>
                    `;
		})}
                </div>
              `}
        </main>

        <footer part="footer">
          <slot
            name=${f}
            @click=${this._handleBackButtonClick}
          >
            ${t && !this.dontHideBackButtonOnFirstStep ? null : i`
                  <button id=${f} part=${f}>
                    Back
                  </button>
                `}
          </slot>
          <slot
            name=${p}
            @click=${this._handleNextButtonClick}
          >
            <button id=${p} part=${p}>
              ${n ? this.doneLabel || "Done" : "Next"}
            </button>
          </slot>
        </footer>
      </div>
    `;
	}
	static {
		this.styles = r`
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :host {
      --step-buttons-bg-color: #f4f4f4;
      --step-buttons-color: #000000;
      display: flex;
      z-index: 99999999;
      height: 0px;
      width: 0px;
    }

    slot[name="step-description"] {
      font-size: 1.125rem;
      font-family: sans-serif;
    }

    @keyframes tour-guide-enter {
      from {
        opacity: 0;
        transform: translateY(-6px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes tour-guide-exit {
      from {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      to {
        opacity: 0;
        transform: translateY(-6px) scale(0.97);
      }
    }

    #root-container {
      border: 1px solid silver !important;
      border-radius: 0.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #ffffff;
      border: none;
      position: relative;
      height: max-content;
      animation: tour-guide-enter 0.5s ease forwards;
    }
    #root-container.closing {
      animation: tour-guide-exit 0.2s ease forwards;
    }
    #root-container::before {
      position: absolute;
      content: "";
    }

    header {
      border-bottom: 1px solid silver;
      padding: 0px 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      height: 3.125rem;
    }

    #close-button {
      background: transparent;
      border-radius: 100%;
      height: 2rem;
      width: 2rem;
      cursor: pointer;
      border: none;
      transition: all 0.15s ease;
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      z-index: 999999;
      font-weight: 700;
      padding: 4px;
    }
    #close-button:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    #tour-guide-main {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    #step-bullets-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.25rem;
      margin-top: auto;
      padding-block: 12px 20px;
    }

    .step-bullet {
      background: #ccc;
      border: none;
      border-radius: 10px;
      padding: 0px;
      height: 6px;
      width: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .step-bullet--active,
    .step-bullet:hover {
      width: 15px;
      background: #999;
    }

    footer {
      border-top: 1px solid silver;
      padding: 12px 8px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }

    #step-back-button,
    #step-next-button {
      display: flex;
      justify-content: center;
      padding: 8px 16px;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: all 0.15s ease;
      border: none;
      font-size: 1rem;
      font-weight: 400;
      font-family: sans-serif;
      color: var(--step-buttons-color);
      background: var(--step-buttons-bg-color);
      border: 1px solid #bdbdbd;
    }

    #step-back-button {
    }
    #step-back-button:hover {
      background: hsl(from var(--step-buttons-bg-color) h s calc(l - 5));
    }

    #step-next-button {
      margin-left: auto;
    }
    #step-next-button:hover {
      background: hsl(from var(--step-buttons-bg-color) h s calc(l - 5));
    }
  `;
	}
};
x([s({
	type: Boolean,
	attribute: y.IS_ENABLED
})], S.prototype, "isEnabled", void 0), x([s({
	type: Boolean,
	attribute: y.DISABLE_CLOSE_ON_OUTSIDE_CLICK
})], S.prototype, "disableCloseOnOutsideClick", void 0), x([s({
	type: String,
	attribute: y.STEP_CONTENT_HEIGHT
})], S.prototype, "stepContentHeight", void 0), x([s({
	type: String,
	attribute: y.STEP_CONTENT_WIDTH
})], S.prototype, "stepContentWidth", void 0), x([s({
	type: Boolean,
	attribute: y.HIDE_HEADER
})], S.prototype, "hideHeader", void 0), x([s({
	type: Boolean,
	attribute: y.ALLOW_OUTSIDE_INTERACTION
})], S.prototype, "allowOutsideInteraction", void 0), x([s({
	type: String,
	attribute: y.DONE_LABEL
})], S.prototype, "doneLabel", void 0), x([s({
	type: String,
	attribute: y.OVERLAY_FILL_COLOR
})], S.prototype, "overlayFillColor", void 0), x([s({
	type: Boolean,
	attribute: y.DONT_HIDE_BACK_BUTTON_ON_FIRST_STEP
})], S.prototype, "dontHideBackButtonOnFirstStep", void 0), x([s({
	type: Boolean,
	attribute: y.HIDE_BULLETS
})], S.prototype, "hideBullets", void 0), x([u()], S.prototype, "_tourGuideActiveStepIndex", void 0), x([u()], S.prototype, "_stepHeading", void 0), x([l({ slot: "step-content" })], S.prototype, "_stepContentElements", void 0), x([l({ slot: "step-bullet" })], S.prototype, "_stepBulletSlottedElements", void 0), x([c(`#${h}`)], S.prototype, "_rootContainerElem", void 0), x([c(`slot[name="${d}"]`)], S.prototype, "_closeButtonElem", void 0), x([c(`slot[name="${p}"]`)], S.prototype, "_stepNextButtonElem", void 0), x([c(`slot[name="${f}"]`)], S.prototype, "_stepBackButtonElem", void 0), x([u()], S.prototype, "_overlayElem", void 0), x([u()], S.prototype, "_activeStepAnchorElem", void 0), x([u()], S.prototype, "_queuedElemForMoveHighlightMask", void 0), x([u()], S.prototype, "_isClosing", void 0), S = x([o("simple-tour-guide")], S);
//#endregion
//#region src/index.ts
var C = t({
	tagName: "simple-tour-guide",
	elementClass: S,
	react: e,
	events: {
		onClose: b.ON_CLOSE,
		onDone: b.ON_DONE,
		onStepChange: b.ON_STEP_CHANGE
	}
});
//#endregion
export { S as SimpleTourGuide, C as SimpleTourGuideReact };
