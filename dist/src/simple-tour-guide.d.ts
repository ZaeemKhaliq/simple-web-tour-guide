import { LitElement, PropertyValues } from 'lit';
import { EventName } from '@lit/react';
import { StepChangeDetail } from './constants';
export declare class SimpleTourGuide extends LitElement {
    private _internals;
    isEnabled?: boolean;
    disableCloseOnOutsideClick?: boolean;
    stepContentHeight?: string;
    stepContentWidth?: string;
    hideHeader?: boolean;
    allowOutsideInteraction?: boolean;
    doneLabel?: string;
    overlayFillColor?: string;
    dontHideBackButtonOnFirstStep?: boolean;
    protected _tourGuideActiveStepIndex: number;
    protected _stepHeading: string;
    _stepContentElements: Array<HTMLElement>;
    _rootContainerElem: HTMLElement | null;
    _closeButtonElem: HTMLElement | null;
    _stepNextButtonElem: HTMLElement | null;
    _stepBackButtonElem: HTMLElement | null;
    protected _overlayElem: HTMLElement | SVGElement | null;
    protected _activeStepAnchorElem: HTMLElement | null;
    protected _queuedElemForMoveHighlightMask: HTMLElement | null;
    protected _isClosing: boolean;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, _old: string | null, value: string | null): Promise<void>;
    protected willUpdate(_changedProperties: PropertyValues): void;
    protected updated(_changedProperties: PropertyValues): void;
    private _emitCustomEvent;
    private _emitCloseTourGuideEvent;
    private _setupUI;
    private _closeTourGuide;
    private _handleNextButtonClick;
    private _handleBackButtonClick;
    private _handleCloseButtonClick;
    private _handleOverlayClick;
    private _insertOverlayInMainDocument;
    private _moveHighlightMaskToElement;
    private _insertHighlightMaskElementOnPage;
    private _handleKeydown;
    private _handleBulletClick;
    private _onScrollEnd;
    private _handleScroll;
    private _handleWindowResize;
    render(): import('lit-html').TemplateResult<1> | null;
    static styles: import('lit').CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "simple-tour-guide": SimpleTourGuide;
    }
}
export declare const SimpleTourGuideReact: import('@lit/react').ReactWebComponent<SimpleTourGuide, {
    onClose: string;
    onDone: string;
    onStepChange: EventName<CustomEvent<StepChangeDetail>>;
}>;
