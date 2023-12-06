export const navAnimation = {
    initial: {
        opacity: 0,
        x: "100%"
    },
    animate: {
        opacity: 1,
        x: "0%",
        transition: {
            when: "beforeChildren",
            staggerChildren: .2
        }
    }
}

export const staggerContainer = (staggerChildren = .1, delay = 0.5) => ({
    initial: {},
    animate: {
        transition: {
            delay,
            staggerChildren
        }
    }
})

export const letterAnimate = (duration = 0.1) => ({
    initial: {
        opacity: 0,
        y: 50
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration
        }
    }
})

export const containerShow = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 1,
            delayChildren: .5,
            staggerChildren: .3,
            ease: 'linear'
        }
    },
    exit: {
        opacity: 0
    }
}

export const containerTranslate = (initial = {x: 0, y: 0}, animate = {x: 0, y: 0}, duration) => {
    return {
        initial,
        animate: {
            x: animate.x,
            y: animate.y,
            transition: {
                duration,
                delayChildren: .5,
                staggerChildren: .3
            }
        },
        exit: {
            opacity: 0
        }
    }
}

export const itemTranslate = (initial = {x: 0, y: 0}, animate = {x: 0, y: 0}, duration) => {
    return {
        initial: {
            x: initial.x,
            y: initial.y
        },
        animate: {
           x: animate.x, 
           y: animate.y,
            transition: {
                duration
            }
        }
    }
}

export const itemShow = (duration) => {
    return {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1,
            transition: {
                duration
            }
        }
    }
}

export const borderAnimate = {
    initial: {
      borderRadius: '8px'
    },
    animate: {
      borderRadius: '20px'
    },
    transition: {
      duration: .5
    }
  }

export const scaleAnimate = {
    initial: {
      scale: 1
    },
    animate: {
      scale: 1.2
    },
    transition: {
      duration: .5
    }
  }