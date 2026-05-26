import React from "react";
import { createComponent, type EventName } from "@lit/react";

import { CustomEventsIDs, type StepChangeDetail } from "./constants";
import { SimpleTourGuide } from "./simple-tour-guide";

export { SimpleTourGuide };

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
