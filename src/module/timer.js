export function timer() {

    const valueTimer = document.querySelector('.time-timer');
    const startButton = document.querySelector('.start-timer');
    const stopButton = document.querySelector('.stop-timer');
    const hourTimer = document.querySelector('.timer-hour');
    const minutTimer = document.querySelector('.timer-minute');
    const secondTimer = document.querySelector('.timer-seconds');
    let millisecondsTime = convertMinutToMilliseconds( valueTimer.value );
    let timerInterval = null;
      

    valueTimer.addEventListener('change', (e) => {
        valueTimer.value = e.target.value;
        millisecondsTime = convertMinutToMilliseconds( valueTimer.value );
        setTime(
            hourTimer,
            minutTimer,
            secondTimer,
            convertMinutToMilliseconds( valueTimer.value )
        );
    }); 

    setTime(
        hourTimer,
        minutTimer,
        secondTimer,
        millisecondsTime
    );

    startButton.addEventListener('click', (e) => {

        timerInterval = setInterval(function() {
            
            millisecondsTime -= 1000;

            setTime(
                hourTimer,
                minutTimer,
                secondTimer,
                millisecondsTime
            );

            if( !millisecondsTime ) {

                clearInterval( timerInterval );
                stopButton.disabled = true;
                stopButton.classList.add('disabled-stop-button');
                stopButton.classList.remove("enabled-stop-button");
                millisecondsTime = convertMinutToMilliseconds( valueTimer.value );

                const sound = new Howl({
                    src: ['./sound/timeend.mp3'],
                });
                sound.play();
                
            }

        }, 1000);

        stopButton.disabled = false;
        stopButton.classList.remove('disabled-stop-button');
        stopButton.classList.add("enabled-stop-button");

    })

    stopButton.addEventListener('click', (e) => {

        clearInterval(timerInterval);
        stopButton.disabled = true;
        stopButton.classList.add('disabled-stop-button');
        stopButton.classList.remove("enabled-stop-button");

    })

}

function setTime(domHour, domMinute, domSecond, valueTime) {
    
    const seconds = parseInt(( valueTime / 1000 ) % 60 );
    const minutes = parseInt(( valueTime / ( 1000 * 60 )) % 60 );
    const hours = parseInt(( valueTime / ( 1000 * 60 * 60 )) % 24 );

    domHour.innerText = addPrefixNull( hours );
    domMinute.innerText = addPrefixNull( minutes );
    domSecond.innerText = addPrefixNull( seconds );

}

function addPrefixNull(number) {

    if( number < 10 ) {
        return '0' + number;
    }
    return number;

}

function convertMinutToMilliseconds(minute) {
    return minute * 60000;
}