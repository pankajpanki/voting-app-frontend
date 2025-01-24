import { useCallback, useRef, useState } from "react";

// Define the types for the hook's parameters and options
type UseLongPressOptions = {
	shouldPreventDefault?: boolean;
	delay?: number;
};

const useLongPress = (
  onLongPress: (event: React.TouchEvent | React.MouseEvent) => void, 
  onClick: (event: React.TouchEvent | React.MouseEvent) => void, 
  { shouldPreventDefault = true, delay = 300 }: UseLongPressOptions = {}
) => {
	const [longPressTriggered, setLongPressTriggered] = useState(false);
	const timeout = useRef<NodeJS.Timeout | null>(null); // Timeout reference
	const target = useRef<HTMLElement | null>(null); // Target reference

    // Start long press detection
    const start = useCallback((event: React.TouchEvent | React.MouseEvent) => {
		if (shouldPreventDefault && event.target) {
			// Cast event.target to HTMLElement to satisfy addEventListener's type expectations
			const targetElement = event.target as HTMLElement;
			targetElement.addEventListener("touchend", preventDefault, {
			  passive: false
			});
			target.current = targetElement;
		}
		  
		timeout.current = setTimeout(() => {
			onLongPress(event);
			setLongPressTriggered(true);
		}, delay);
    }, [onLongPress, delay, shouldPreventDefault]);

	// Clear timeout and trigger click if necessary
    const clear = useCallback((event: React.TouchEvent | React.MouseEvent, shouldTriggerClick = true) => {
		if (timeout.current) {
			clearTimeout(timeout.current);
		}
		shouldTriggerClick && !longPressTriggered && onClick(event);
		setLongPressTriggered(false);
		  
		if (shouldPreventDefault && target.current) {
			// Ensure correct removal of the event listener
			target.current.removeEventListener("touchend", preventDefault);
		}
    }, [shouldPreventDefault, onClick, longPressTriggered]);

    return {
		onMouseDown: (e: React.MouseEvent) => start(e),
		onTouchStart: (e: React.TouchEvent) => start(e),
		onMouseUp: (e: React.MouseEvent) => clear(e),
		onMouseLeave: (e: React.MouseEvent) => clear(e, false),
		onTouchEnd: (e: React.TouchEvent) => clear(e)
    };
};

// Helper function to check if the event is a TouchEvent
const isTouchEvent = (event: Event): event is TouchEvent => {
	return "touches" in event;
};

// Prevent default touch event behavior if necessary
const preventDefault = (event: Event) => {
	// Ensure the event is a TouchEvent
	if (!isTouchEvent(event)) return;  // Narrowing the type to TouchEvent

	if (event.touches.length < 2 && event.preventDefault) {
		event.preventDefault();
	}
};

export default useLongPress;