import { EventName } from '@lit/react';
import { StepChangeDetail } from './constants';
import { SimpleTourGuide } from './simple-tour-guide';
export { SimpleTourGuide };
export declare const SimpleTourGuideReact: import('@lit/react').ReactWebComponent<SimpleTourGuide, {
    onClose: string;
    onDone: string;
    onStepChange: EventName<CustomEvent<StepChangeDetail>>;
}>;
