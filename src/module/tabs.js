export function createTab( selectorControlButton, selectorContainerTab, selectorItemTab ) {

    const controlButtons = document.querySelectorAll(selectorControlButton);
    const containerTab = document.querySelector(selectorContainerTab);
    const domTabs = containerTab.querySelectorAll(selectorItemTab);

    switchingTab(
        0,
        domTabs
    );

    switchingButton( 
        0, 
        controlButtons 
    );

    [...controlButtons]
        .forEach(el => {
            el.addEventListener('click', function(event) {

                let numberButton = +event.target.dataset.buttonId;
                switchingTab(
                    numberButton,
                    domTabs
                );

                switchingButton( 
                    numberButton, 
                    controlButtons 
                );

            })
        });
}

function switchingTab( numberTab, domTabs ) {
    
    [...domTabs]
    .forEach((el, index) => {
        el.style.display = 'none';
        if(index == numberTab) el.style.display = 'block';
    });

}

function switchingButton(numberButton, domButtons) {
    
    [...domButtons].forEach(el => {
        el.classList.remove('button_tab_active');
        if(el.dataset.buttonId == numberButton) {
            el.classList.add('button_tab_active');
        }
    })

}
