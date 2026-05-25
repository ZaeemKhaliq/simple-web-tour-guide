interface StepChangeDetail {
    isFirstStep: boolean;
    isLastStep: boolean;
    stepIndex: number;
}
declare const CLOSE_BUTTON_ID = "close-button";
declare const STEP_BACK_BUTTON_ID = "step-back-button";
declare const STEP_NEXT_BUTTON_ID = "step-next-button";
declare const OVERLAY_ELEM_ID = "tour-guides-overlay";
declare const ROOT_CONTAINER_ID = "root-container";
declare const DEFAULT_STEP_CONTENT_HEIGHT = "170px";
declare const DEFAULT_STEP_CONTENT_WIDTH = "288px";
declare const DEFAULT_OVERLAY_FILL_COLOR = "rgba(0,0,0,0.3)";
declare const ComponentExposedAttributes: {
    IS_ENABLED: string;
    DISABLE_CLOSE_ON_OUTSIDE_CLICK: string;
    STEP_CONTENT_HEIGHT: string;
    STEP_CONTENT_WIDTH: string;
    HIDE_HEADER: string;
    ALLOW_OUTSIDE_INTERACTION: string;
    DONE_LABEL: string;
    OVERLAY_FILL_COLOR: string;
    DONT_HIDE_BACK_BUTTON_ON_FIRST_STEP: string;
};
declare const CustomEventsIDs: {
    ON_CLOSE: string;
    ON_DONE: string;
    ON_STEP_CHANGE: string;
};
export { CLOSE_BUTTON_ID, STEP_BACK_BUTTON_ID, STEP_NEXT_BUTTON_ID, OVERLAY_ELEM_ID, ROOT_CONTAINER_ID, ComponentExposedAttributes, CustomEventsIDs, DEFAULT_STEP_CONTENT_HEIGHT, DEFAULT_STEP_CONTENT_WIDTH, DEFAULT_OVERLAY_FILL_COLOR, type StepChangeDetail, };
