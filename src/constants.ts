interface StepChangeDetail {
  isFirstStep: boolean;
  isLastStep: boolean;
  stepIndex: number;
}

const CLOSE_BUTTON_ID = "close-button";
const STEP_BACK_BUTTON_ID = "step-back-button";
const STEP_NEXT_BUTTON_ID = "step-next-button";
const OVERLAY_ELEM_ID = "tour-guides-overlay";
const ROOT_CONTAINER_ID = "root-container";
const DEFAULT_STEP_CONTENT_HEIGHT = "170px";
const DEFAULT_STEP_CONTENT_WIDTH = "288px";
const DEFAULT_OVERLAY_FILL_COLOR = "rgba(0,0,0,0.3)";

const ComponentExposedAttributes = {
  IS_ENABLED: "is-enabled",
  DISABLE_CLOSE_ON_OUTSIDE_CLICK: "disable-close-on-outside-click",
  STEP_CONTENT_HEIGHT: "step-content-height",
  STEP_CONTENT_WIDTH: "step-content-width",
  HIDE_HEADER: "hide-header",
  ALLOW_OUTSIDE_INTERACTION: "allow-outside-interaction",
  DONE_LABEL: "done-label",
  OVERLAY_FILL_COLOR: "overlay-fill-color",
  DONT_HIDE_BACK_BUTTON_ON_FIRST_STEP: "dont-hide-back-button-on-first-step",
};
const CustomEventsIDs = {
  ON_CLOSE: "simple-tour-guide:on-close",
  ON_DONE: "simple-tour-guide:on-done",
  ON_STEP_CHANGE: "simple-tour-guide:on-step-change",
};

export {
  CLOSE_BUTTON_ID,
  STEP_BACK_BUTTON_ID,
  STEP_NEXT_BUTTON_ID,
  OVERLAY_ELEM_ID,
  ROOT_CONTAINER_ID,
  ComponentExposedAttributes,
  CustomEventsIDs,
  DEFAULT_STEP_CONTENT_HEIGHT,
  DEFAULT_STEP_CONTENT_WIDTH,
  DEFAULT_OVERLAY_FILL_COLOR,
  type StepChangeDetail,
};
