import { AnimationTriggerMetadata, trigger, transition, style, animate } from "@angular/animations";

export function getFadeInAnimation(time: number = 300): AnimationTriggerMetadata {
    return trigger('fadeInOut', [
        transition(':enter', [   // :enter is alias to 'void => *'
            style({ opacity: 0 }),
            animate(time, style({ opacity: 1 }))
        ]),
        transition(':leave', [   // :leave is alias to '* => void'
            animate(time, style({ opacity: 0 }))
        ])
    ]);
}