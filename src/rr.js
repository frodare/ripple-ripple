import './rr.css';

const ELEMENT_CLASS = 'ripple-ripple';

const getElementsByClass = (className, root = document) => [].slice.call(root.getElementsByClassName(className));

const insertRippleElement = wrapper => {
	const rippleElement = document.createElement('span');
	rippleElement.className = ELEMENT_CLASS;
	wrapper.insertBefore(rippleElement, wrapper.firstChild);
	return rippleElement;
};

const positionRippleElement = (wrapper, rippleElement, pageX, pageY) => {
	const posX = wrapper.offsetLeft,
		posY = wrapper.offsetTop;

	let buttonWidth = wrapper.offsetWidth,
		buttonHeight =  wrapper.offsetHeight;


	if(buttonWidth >= buttonHeight) {
		buttonHeight = buttonWidth;
	} else {
		buttonWidth = buttonHeight; 
	}

	const x = pageX - posX - buttonWidth / 2;
	const y = pageY - posY - buttonHeight / 2;

	rippleElement.style.width = buttonWidth + 'px';
	rippleElement.style.height = buttonHeight + 'px';
	rippleElement.style.top = y + 'px';
	rippleElement.style.left = x + 'px';

	return rippleElement;
};

const removeRippleElementAfterAnimation = rippleElement => {
	rippleElement.addEventListener('animationend', () => rippleElement.remove());
};

const setupSingleRipple = (wrapper, pageX, pageY) => {
	const rippleElement = insertRippleElement(wrapper);
	positionRippleElement(wrapper, rippleElement, pageX, pageY);
	removeRippleElementAfterAnimation(rippleElement);
	return rippleElement;
};

const startRipple = (wrapper, pageX, pageY) => {
	const e1 = setupSingleRipple(wrapper, pageX, pageY);
	const e2 = setupSingleRipple(wrapper, pageX, pageY);

	e1.style.webkitAnimationPlayState = 'running';

	setTimeout(() => e2.style.webkitAnimationPlayState = 'running', 150);

	return () => {
		e1.className += ' ' + 'ripple-ripple-fade';
		e2.className += ' ' + 'ripple-ripple-fade';
	};
};

const attachRippleRipple = wrapper => {
	wrapper.addEventListener('click', ev => {
		const done = startRipple(wrapper, ev.pageX, ev.pageY);
		setTimeout(done, 2000);
	});
};

getElementsByClass('enable-ripple-ripple').forEach(attachRippleRipple);
