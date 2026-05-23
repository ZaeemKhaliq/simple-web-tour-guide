import React from "react";

import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  query,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import { createComponent, type EventName } from "@lit/react";

import {
  CLOSE_BUTTON_ID,
  STEP_BACK_BUTTON_ID,
  STEP_NEXT_BUTTON_ID,
  OVERLAY_ELEM_ID,
  ROOT_CONTAINER_ID,
  ComponentExposedAttributes,
  CustomEventsIDs,
  type StepChangeDetail,
  DEFAULT_STEP_CONTENT_HEIGHT,
  DEFAULT_STEP_CONTENT_WIDTH,
  DEFAULT_OVERLAY_FILL_COLOR,
} from "./constants";

@customElement("simple-tour-guide")
export class SimpleTourGuide extends LitElement {
  private _internals = this.attachInternals();

  @property({ type: Boolean, attribute: ComponentExposedAttributes.IS_ENABLED })
  isEnabled?: boolean = false;

  @property({
    type: Boolean,
    attribute: ComponentExposedAttributes.DISABLE_CLOSE_ON_OUTSIDE_CLICK,
  })
  disableCloseOnOutsideClick?: boolean = false;

  @property({
    type: String,
    attribute: ComponentExposedAttributes.STEP_CONTENT_HEIGHT,
  })
  stepContentHeight?: string = DEFAULT_STEP_CONTENT_HEIGHT;

  @property({
    type: String,
    attribute: ComponentExposedAttributes.STEP_CONTENT_WIDTH,
  })
  stepContentWidth?: string = DEFAULT_STEP_CONTENT_WIDTH;

  @property({
    type: Boolean,
    attribute: ComponentExposedAttributes.HIDE_HEADER,
  })
  hideHeader?: boolean = false;

  @property({
    type: Boolean,
    attribute: ComponentExposedAttributes.ALLOW_OUTSIDE_INTERACTION,
  })
  allowOutsideInteraction?: boolean = false;

  @property({ type: String, attribute: ComponentExposedAttributes.DONE_LABEL })
  doneLabel?: string = "Done";

  @property({
    type: String,
    attribute: ComponentExposedAttributes.OVERLAY_FILL_COLOR,
  })
  overlayFillColor?: string = DEFAULT_OVERLAY_FILL_COLOR;

  @property({
    type: Boolean,
    attribute: ComponentExposedAttributes.DONT_HIDE_BACK_BUTTON_ON_FIRST_STEP,
  })
  dontHideBackButtonOnFirstStep?: boolean = false;

  @state()
  protected _tourGuideActiveStepIndex: number = -1;

  @state()
  protected _stepHeading: string = "";

  @queryAssignedElements({ slot: "step-content" })
  _stepContentElements!: Array<HTMLElement>;

  @query(`#${ROOT_CONTAINER_ID}`)
  _rootContainerElem!: HTMLElement | null;

  @query(`slot[name="${CLOSE_BUTTON_ID}"]`)
  _closeButtonElem!: HTMLElement | null;

  @query(`slot[name="${STEP_NEXT_BUTTON_ID}"]`)
  _stepNextButtonElem!: HTMLElement | null;

  @query(`slot[name="${STEP_BACK_BUTTON_ID}"]`)
  _stepBackButtonElem!: HTMLElement | null;

  @state()
  protected _overlayElem!: HTMLElement | SVGElement | null;

  @state()
  protected _activeStepAnchorElem: HTMLElement | null = null;

  @state()
  protected _queuedElemForMoveHighlightMask: HTMLElement | null = null;

  @state()
  protected _isClosing: boolean = false;

  constructor() {
    super();

    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._onScrollEnd = this._onScrollEnd.bind(this);
    this._handleScroll = this._handleScroll.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
    this._handleWindowResize = this._handleWindowResize.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener("resize", this._handleWindowResize);
    window.addEventListener("scroll", this._handleScroll);
    window.addEventListener("scrollend", this._onScrollEnd);
    window.addEventListener("keydown", this._handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener("resize", this._handleWindowResize);
    window.removeEventListener("scroll", this._handleScroll);
    window.removeEventListener("scrollend", this._onScrollEnd);
    window.removeEventListener("keydown", this._handleKeydown);
  }

  async attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null,
  ) {
    super.attributeChangedCallback(name, _old, value);

    if (name === ComponentExposedAttributes.IS_ENABLED) {
      // if (this.isEnabled) {
      //   await this.updateComplete;
      //   this._setupUI();
      // } else {
      //   this._closeTourGuide();
      // }
    }

    if (name === ComponentExposedAttributes.DISABLE_CLOSE_ON_OUTSIDE_CLICK) {
      // if (this._overlayElem) {
      //   this._overlayElem.removeEventListener(
      //     "click",
      //     this._handleOverlayClick,
      //   );
      // }
    }

    if (name === ComponentExposedAttributes.ALLOW_OUTSIDE_INTERACTION) {
      // if (this._overlayElem) {
      //   this._overlayElem.style.pointerEvents = "initial";
      // }
    }
  }

  protected willUpdate(_changedProperties: PropertyValues): void {
    const isStepContentWidthUpdated =
      _changedProperties.has("stepContentWidth");
    const isStepContentHeightUpdated =
      _changedProperties.has("stepContentHeight");
    const isOverlayFillColorUpdated =
      _changedProperties.has("overlayFillColor");

    if (isStepContentWidthUpdated && this.stepContentWidth == null) {
      this.stepContentWidth = DEFAULT_STEP_CONTENT_WIDTH;
    }

    if (isStepContentHeightUpdated && this.stepContentHeight == null) {
      this.stepContentHeight = DEFAULT_STEP_CONTENT_HEIGHT;
    }

    if (isOverlayFillColorUpdated && this.overlayFillColor == null) {
      this.overlayFillColor = DEFAULT_OVERLAY_FILL_COLOR;
    }
  }

  protected updated(_changedProperties: PropertyValues): void {
    // console.log("%cupdated called:", "background-color:pink;", {
    //   _changedProperties,
    // });

    const handleTourGuideActiveStepIndexChange = () => {
      const isUpdated = _changedProperties.has("_tourGuideActiveStepIndex");
      if (!isUpdated) {
        return;
      }

      const isFirstStep = this._tourGuideActiveStepIndex === 0;
      const isLastStep =
        this._tourGuideActiveStepIndex ===
        this._stepContentElements?.length - 1;

      this._emitCustomEvent({
        name: CustomEventsIDs.ON_STEP_CHANGE,
        detail: {
          isFirstStep,
          isLastStep,
          stepIndex: this._tourGuideActiveStepIndex,
        },
      });

      if (isLastStep) {
        this._internals.states.add("on-last-step");
      } else {
        this._internals.states.delete("on-last-step");
      }

      if (isFirstStep) {
        this._internals.states.add("on-first-step");
      } else {
        this._internals.states.delete("on-first-step");
      }

      const hideAllOtherStepsAndShowActiveStepContentOnly = () => {
        this._stepContentElements?.forEach((element, elementIndex) => {
          const isActiveElement =
            elementIndex === this._tourGuideActiveStepIndex;

          element.hidden = !isActiveElement;
        });
      };
      hideAllOtherStepsAndShowActiveStepContentOnly();

      const activeStepElement =
        this._stepContentElements?.[this._tourGuideActiveStepIndex];
      if (!activeStepElement) {
        return;
      }

      const activeStepAnchorElemSelectorValue = activeStepElement.dataset
        .anchorElement as string;
      const activeStepAnchorElem = document.querySelector(
        activeStepAnchorElemSelectorValue,
      ) as HTMLElement | null;

      if (!activeStepAnchorElem) {
        // Close whole tour guide if anchor element for even one step is not found, since it disrupts the flow.
        this._emitCloseTourGuideEvent();

        return;
      }

      this._activeStepAnchorElem = activeStepAnchorElem;

      const stepHeading = activeStepElement.dataset.stepHeading || "";
      this._stepHeading = stepHeading;

      this._moveHighlightMaskToElement(activeStepAnchorElem);

      const TOUR_GUIDE_ANCHOR_NAME = `--tour-guide-anchor-${this._tourGuideActiveStepIndex}`;
      activeStepAnchorElem.style.anchorName = TOUR_GUIDE_ANCHOR_NAME;

      this.style.width = "auto";
      this.style.height = "auto";
      this.style.position = "absolute";
      this.style.positionAnchor = TOUR_GUIDE_ANCHOR_NAME;
      this.style.top = `calc(anchor(end) + 0.125rem)`;
      this.style.left = `anchor(left)`;
      this.style.positionTryFallbacks = "flip-block, flip-inline";
      this.style.transition = "all 0.2s ease";
    };
    handleTourGuideActiveStepIndexChange();

    const handleIsEnabledUpdated = () => {
      const isUpdated = _changedProperties.has("isEnabled");
      if (!isUpdated) {
        return;
      }

      if (this.isEnabled) {
        this._isClosing = false;
        this._setupUI();
      } else {
        this._isClosing = true;
      }
    };
    handleIsEnabledUpdated();

    const handleIsClosingUpdated = () => {
      const isUpdated = _changedProperties.has("_isClosing");
      if (!isUpdated || !this._isClosing) {
        return;
      }

      const rootContainer = this._rootContainerElem;
      if (!rootContainer) {
        this._closeTourGuide();
        this._isClosing = false;
        return;
      }

      rootContainer.addEventListener(
        "animationend",
        (event: AnimationEvent) => {
          if (event.animationName !== "tour-guide-exit") return;
          this._closeTourGuide();
          this._isClosing = false;
        },
        { once: true },
      );
    };
    handleIsClosingUpdated();

    const handleIsDisableCloseOnOutsideClickUpdated = () => {
      const isUpdated = _changedProperties.has("disableCloseOnOutsideClick");
      if (!isUpdated) {
        return;
      }

      if (this._overlayElem) {
        if (!this.disableCloseOnOutsideClick) {
          this._overlayElem.removeEventListener(
            "click",
            this._handleOverlayClick,
          );
          this._overlayElem.addEventListener("click", this._handleOverlayClick);
        } else {
          this._overlayElem.removeEventListener(
            "click",
            this._handleOverlayClick,
          );
        }
      }
    };
    handleIsDisableCloseOnOutsideClickUpdated();

    const handleAllowOutsideInteractionUpdated = () => {
      const isUpdated = _changedProperties.has("allowOutsideInteraction");
      if (!isUpdated) {
        return;
      }

      if (this._overlayElem) {
        if (this.allowOutsideInteraction) {
          this._overlayElem.style.pointerEvents = "none";
        } else {
          this._overlayElem.style.pointerEvents = "initial";
        }
      }
    };
    handleAllowOutsideInteractionUpdated();
  }

  private _emitCustomEvent({
    name,
    detail,
  }: {
    name: string;
    detail?: object;
  }) {
    this.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true,
        composed: true,
        detail,
      }),
    );
  }

  private _emitCloseTourGuideEvent() {
    this._emitCustomEvent({ name: CustomEventsIDs.ON_CLOSE });
  }

  private _setupUI() {
    // console.log("%csetupUI called:", "background-color:orange;");

    if (!this._stepContentElements?.length) {
      this._emitCloseTourGuideEvent();

      return;
    }

    this._tourGuideActiveStepIndex = 0;
    this._stepHeading = "Step Heading";

    this._insertOverlayInMainDocument();
    this?._rootContainerElem?.focus?.();
  }

  private _closeTourGuide() {
    if (this._overlayElem) {
      this._overlayElem.removeEventListener("click", this._handleOverlayClick);
      this._overlayElem?.parentNode?.removeChild?.(this._overlayElem);
    }

    this._tourGuideActiveStepIndex = -1;
    this._activeStepAnchorElem = null;
    this._queuedElemForMoveHighlightMask = null;
  }

  private _handleNextButtonClick() {
    const isLastStep =
      this._tourGuideActiveStepIndex === this._stepContentElements?.length - 1;

    if (isLastStep) {
      this._emitCustomEvent({ name: CustomEventsIDs.ON_DONE });

      return;
    }

    this._tourGuideActiveStepIndex = Math.min(
      this._tourGuideActiveStepIndex + 1,
      this._stepContentElements?.length - 1,
    );
  }

  private _handleBackButtonClick() {
    this._tourGuideActiveStepIndex = Math.max(
      this._tourGuideActiveStepIndex - 1,
      0,
    );
  }

  private _handleCloseButtonClick() {
    this._emitCloseTourGuideEvent();
  }

  private _handleOverlayClick() {
    this._emitCloseTourGuideEvent();
  }

  private _insertOverlayInMainDocument() {
    const overlayElem = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    this._overlayElem = overlayElem as SVGElement;
    overlayElem.id = OVERLAY_ELEM_ID;
    overlayElem.style.position = "fixed";
    overlayElem.style.inset = "0px";
    overlayElem.style.width = "100%";
    overlayElem.style.height = "100%";
    overlayElem.style.zIndex = "9999999";
    if (this.allowOutsideInteraction) {
      overlayElem.style.pointerEvents = "none";
    }

    const activeStepElem =
      this._stepContentElements?.[this._tourGuideActiveStepIndex];
    if (!activeStepElem) {
      return;
    }

    const activeStepAnchorElemSelectorValue = activeStepElem.dataset
      .anchorElement as string;
    const activeStepAnchorElem = document.querySelector(
      activeStepAnchorElemSelectorValue,
    ) as HTMLElement | null;

    if (!activeStepAnchorElem) {
      this._emitCloseTourGuideEvent();

      return;
    }

    this._activeStepAnchorElem = activeStepAnchorElem;
    this._moveHighlightMaskToElement(activeStepAnchorElem);

    if (!this.disableCloseOnOutsideClick) {
      overlayElem.removeEventListener("click", this._handleOverlayClick);
      overlayElem.addEventListener("click", this._handleOverlayClick);
    } else {
      overlayElem.removeEventListener("click", this._handleOverlayClick);
    }

    const bodyElem = document.body;
    bodyElem.insertBefore(overlayElem, bodyElem.firstChild);
  }

  private _moveHighlightMaskToElement(element: HTMLElement) {
    const isElementOutsideOfTheCurrentViewport =
      element?.offsetTop < window.scrollY ||
      element?.offsetTop > window.innerHeight + window.scrollY;

    if (typeof element.scrollIntoView === "function") {
      element.scrollIntoView({ behavior: "smooth", block: "center" });

      if (isElementOutsideOfTheCurrentViewport) {
        this._queuedElemForMoveHighlightMask = element;

        // return;
      }
    }

    this._insertHighlightMaskElementOnPage(element);
  }

  private _insertHighlightMaskElementOnPage(element: HTMLElement) {
    if (!this._overlayElem) {
      return;
    }

    const activeStepAnchorElemBoundingClientRect =
      element.getBoundingClientRect();

    const yValue = Math.max(0, activeStepAnchorElemBoundingClientRect.top);

    this._overlayElem.innerHTML = `
          <defs>
            <mask id="cutout">
              <rect width="100%" height="100%" fill="white"/>
              <rect 
                x="${activeStepAnchorElemBoundingClientRect.left}" y="${yValue}" 
                width="${activeStepAnchorElemBoundingClientRect.width}" height="${activeStepAnchorElemBoundingClientRect.height}" 
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

  private _handleKeydown(event: KeyboardEvent) {
    const isEscPressed = event?.key === "Escape";

    if (isEscPressed) {
      this._emitCloseTourGuideEvent();
    }
  }

  private _handleBulletClick({
    stepElementIndex,
  }: {
    stepElementIndex: number;
  }) {
    this._tourGuideActiveStepIndex = stepElementIndex;
  }

  private _onScrollEnd() {
    if (this._queuedElemForMoveHighlightMask) {
      this._moveHighlightMaskToElement(this._queuedElemForMoveHighlightMask);
      this._queuedElemForMoveHighlightMask = null;
    }
  }

  private _handleScroll() {
    const hideHighlightedMaskAreaIfActiveStepAnchorElementIsOutsideOfCurrentViewport =
      () => {
        if (this._activeStepAnchorElem) {
          const isElementOutsideOfTheCurrentViewport =
            this._activeStepAnchorElem?.clientHeight +
              this._activeStepAnchorElem?.offsetTop <
              window.scrollY ||
            this._activeStepAnchorElem?.offsetTop >
              window.innerHeight + window.scrollY;

          if (isElementOutsideOfTheCurrentViewport) {
            const contentForShowingOnlyBackdrop = `
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

            if (this._overlayElem) {
              this._overlayElem.innerHTML = contentForShowingOnlyBackdrop;
            }
          } else {
            this._insertHighlightMaskElementOnPage(this._activeStepAnchorElem);
          }
        }
      };
    hideHighlightedMaskAreaIfActiveStepAnchorElementIsOutsideOfCurrentViewport();
  }

  private _handleWindowResize() {
    if (this._activeStepAnchorElem) {
      this._moveHighlightMaskToElement(this._activeStepAnchorElem);
    }
  }

  render() {
    if (!this.isEnabled && !this._isClosing) {
      return null;
    }

    const isFirstStep = this._tourGuideActiveStepIndex === 0;
    const isLastStep =
      this._tourGuideActiveStepIndex === this._stepContentElements?.length - 1;

    return html`
      <style>
        ::slotted([slot="step-content"]) {
          overflow-y: auto;
          height: ${unsafeCSS(this.stepContentHeight)};
          max-height: ${unsafeCSS(this.stepContentHeight)};
          width: ${unsafeCSS(this.stepContentWidth)};
        }

        #tour-guide-step-heading {
          font-weight: 700;
          font-size: 1.125rem;
          max-width: calc(${unsafeCSS(this.stepContentWidth)} - 3rem);
          color: #000000;
        }
      </style>

      <div
        id=${ROOT_CONTAINER_ID}
        class=${this._isClosing ? "closing" : ""}
        tabindex="0"
        part=${ROOT_CONTAINER_ID}
      >
        <slot name="header">
          ${this.hideHeader
            ? ""
            : html`
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

          <div id="step-bullets-container">
            ${this._stepContentElements?.map((_element, elementIndex) => {
              const isActiveElement =
                elementIndex === this._tourGuideActiveStepIndex;

              return html`
                <button
                  class="step-bullet step-bullet-${elementIndex}${isActiveElement
                    ? " step-bullet--active"
                    : ""}"
                  @click=${() => {
                    this._handleBulletClick({ stepElementIndex: elementIndex });
                  }}
                ></button>
              `;
            })}
          </div>
        </main>

        <footer part="footer">
          <slot
            name=${STEP_BACK_BUTTON_ID}
            @click=${this._handleBackButtonClick}
          >
            ${isFirstStep && !this.dontHideBackButtonOnFirstStep
              ? null
              : html`
                  <button id=${STEP_BACK_BUTTON_ID} part=${STEP_BACK_BUTTON_ID}>
                    Back
                  </button>
                `}
          </slot>
          <slot
            name=${STEP_NEXT_BUTTON_ID}
            @click=${this._handleNextButtonClick}
          >
            <button id=${STEP_NEXT_BUTTON_ID} part=${STEP_NEXT_BUTTON_ID}>
              ${isLastStep ? this.doneLabel || "Done" : "Next"}
            </button>
          </slot>
        </footer>
      </div>
    `;
  }

  static styles = css`
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

declare global {
  interface HTMLElementTagNameMap {
    "simple-tour-guide": SimpleTourGuide;
  }
}

export const SimpleTourGuideReact = createComponent({
  tagName: "simple-tour-guide",
  elementClass: SimpleTourGuide,
  react: React,
  events: {
    onClose: CustomEventsIDs.ON_CLOSE,
    onDone: CustomEventsIDs.ON_DONE,
    onStepChange: CustomEventsIDs.ON_STEP_CHANGE as EventName<
      CustomEvent<StepChangeDetail>
    >,
  },
});
