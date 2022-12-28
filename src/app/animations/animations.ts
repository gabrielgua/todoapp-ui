import { animate, state, style, transition, trigger } from "@angular/animations";

export const FadeLeftToRight = [
    trigger('fadeLeftToRight', [
        state('true', style([{transform: 'translateX(0)'}])),
        transition('* => true', [
          style({transform: 'translateX(-30px)'}),
          animate('200ms ease-out', style({transform: 'translateX(0)'}))
        ]),
    ])
]

export const FinishedBorder = [
    trigger('finishedBorder', [
        state('true', 
          style({
            color: 'var(--success)'
          })
        ),
      ]),
]

export const FadeInFromBottom = [
    trigger('fadeInFromBottom', [
        state('true', style({})),
        transition(':enter', [
          style({transform: 'translateY(30px)'}),
          animate('200ms ease-out', style({transform: 'translateY(0)'}))
        ])
      ])
]

export const FadeOut = [
  trigger('fadeOut', [
    state('true', style({})),
    transition(':enter', [
      style({opacity: 1}),
      animate(200)
    ]),
    
  ])
]

  

  