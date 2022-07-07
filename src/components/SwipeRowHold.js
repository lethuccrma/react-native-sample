/**
 * @Author Daniel Merrill
 * @Post https://medium.com/async-la/swipe-to-delete-with-reanimated-react-native-gesture-handler-bd7d66085aee
 * @Modifier ThucLT
 */

import React, { useRef } from 'react';
import {
  gestureHandlerRootHOC,
  PanGestureHandler,
  State as GestureState,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const {
  event,
  cond,
  Value,
  block,
  set,
  eq,
  not,
  clockRunning,
  and,
  startClock,
  stopClock,
  spring,
  lessThan,
  add,
  Clock,
} = Animated;

const SwipeRowHold = gestureHandlerRootHOC(({
  swipeThreshold, style, children,
}) => {
  const clock = useRef(new Clock());
  const gestureState = useRef(new Value(GestureState.UNDETERMINED));
  const animState = useRef({
    finished: new Value(0),
    position: new Value(0),
    velocity: new Value(0),
    time: new Value(0),
  });

  // extra position must to be added
  const extraPosition = useRef(new Value(0));
  const swipedOut = useRef(new Value(0));

  // Spring animation config
  // Determines how "springy" row is when it
  // snaps back into place after released
  const animConfig = useRef({
    toValue: new Value(0),
    damping: 20,
    mass: 0.2,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.2,
    restDisplacementThreshold: 0.2,
  });

  // Called whenever gesture state changes. (User begins/ends pan,
  // or if the gesture is cancelled/fails for some reason)
  const onHandlerStateChange = event([
    {
      nativeEvent: ({ state, translationX }) => block([
        // Update our animated value that tracks gesture state
        set(gestureState.current, state),
        // Spring row back into place when user lifts their finger before reaching threshold
        cond(
          and(eq(state, GestureState.END), not(clockRunning(clock.current))),
          startClock(clock.current),
        ),

        // already swipe out
        cond(
          and(
            eq(state, GestureState.END),
            lessThan(translationX, swipeThreshold),
            not(swipedOut.current),
          ),
          [
            set(animConfig.current.toValue, swipeThreshold),
            set(swipedOut.current, 1),
            set(extraPosition.current, swipeThreshold),
          ],
        ),

        // already close
        cond(
          and(
            eq(state, GestureState.END),
            lessThan(0, translationX),
            swipedOut.current,
          ),
          [
            set(animConfig.current.toValue, 0),
            set(swipedOut.current, 0),
            set(extraPosition.current, 0),
          ],
        ),
      ]),
    },
  ]);

  const onPanEvent = event([
    {
      nativeEvent: ({ translationX }) => block([
        cond(eq(gestureState.current, GestureState.ACTIVE), [
          // Update our translate animated value as the user pans
          set(animState.current.position, add(translationX, extraPosition.current)),
        ]),
      ]),
    },
  ]);

  return (
    <PanGestureHandler
      minDist={20}
      onGestureEvent={onPanEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={[
          {
            transform: [{ translateX: animState.current.position }],
          },
          style || {},
        ]}
      >
        <Animated.Code>
          {() => block([
            // If the clock is running, increment position in next tick by calling spring()
            cond(clockRunning(clock.current), [
              spring(clock.current, animState.current, animConfig.current),
              // Stop and reset clock when spring is complete
              cond(animState.current.finished, [
                stopClock(clock.current),
                set(animState.current.finished, 0),
              ]),
            ]),
          ])}
        </Animated.Code>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
});

export default SwipeRowHold;
