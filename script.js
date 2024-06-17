const styles = {
    success: 'background: #28a745; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    starting: 'background: #8640ff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    error: 'background: #dc3545; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    info: 'background: #007bff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
};
const logPrefix = '%c[WigwamDrum Bot] ';

const originalLog = console.log;
console.log = function () {
    if (typeof arguments[0] === 'string' && arguments[0].includes('[WigwamDrum Bot]')) {
        originalLog.apply(console, arguments);
    }
};

console.error = console.warn = console.info = console.debug = () => { };

console.clear();
console.log(`${logPrefix}Starting`, styles.starting);
console.log(`${logPrefix}Create by t.me/kenvnit - Phạm Quang Vũ`, styles.starting);

function createEvent(type, target, options) {
    const event = new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        view: window,
        detail: 1,
        pointerId: 1,
        width: 1,
        height: 1,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        pointerType: 'touch',
        isPrimary: true,
        //...options
    });
    target.dispatchEvent(event);
}

function getCoords(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    return {
        clientX: x,
        clientY: y,
        screenX: window.screenX + x,
        screenY: window.screenY + y
    };
}

const randomDelay = (min, max) => Math.random() * (max - min) + min;
const randomOffset = range => Math.random() * range * 2 - range;
const randomPressure = () => Math.random() * 0.5 + 0.5;

function clickElement(target) {
    const { clientX, clientY, screenX, screenY } = getCoords(target);
    const options = {
        clientX: clientX + randomOffset(5),
        clientY: clientY + randomOffset(5),
        screenX: screenX + randomOffset(5),
        screenY: screenY + randomOffset(5),
        pressure: randomPressure()
    };
    ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(type => createEvent(type, target, options));
}


let isGamePaused = false;

function toggleGamePause() {
    isGamePaused = !isGamePaused;
    pauseButton.textContent = isGamePaused ? 'Resume' : 'Pause';
}

const pauseButton = document.createElement('button');
pauseButton.textContent = 'Pause';
Object.assign(pauseButton.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '9999',
    padding: '4px 8px',
    backgroundColor: '#5d5abd',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer'
});
pauseButton.onclick = toggleGamePause;
document.body.appendChild(pauseButton);

let totalPoints = 0;

function autoClick() {
    if (!isGamePaused) {
        try {
			
			const tapClaimContainer = document.querySelector('#Tap_claimContainer');
			if(tapClaimContainer)
			{
				setTimeout(autoClick, randomDelay(1000, 3000));
				return;
			}
			
			const tapBtnContainer = document.querySelector('#tapBtnContainer');
			if(tapBtnContainer)
			{
				const tapButton = document.querySelector('#tapBtnContainer .Tap_tapButton__qn80R');
				if(tapButton)
				{
					clickElement(tapButton);
					setTimeout(autoClick, randomDelay(50, 150));
					return;
				}
			}
			
			setTimeout(autoClick, randomDelay(50, 150));
			return;
			
        } catch (error) {
            // Do not log the error to avoid cluttering the console
			console.log(`${logPrefix}${error.message}`, styles.error);
        }
    }
	else
	{
		setTimeout(autoClick, randomDelay(50, 150));
	}
}

autoClick();
