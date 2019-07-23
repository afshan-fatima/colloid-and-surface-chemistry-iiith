var model={

    instruction1: 'Click on the Beaker to pour Water into it...',
    instruction2: 'Click on the FeCl<sub>3</sub> Powder to add it to the beaker containing water..',
    instruction3: 'Click on the Glass Rod to stir the FeCl<sub>3</sub> Solution....',
    instruction4: 'Click on the Conical Flask containing water, to Place it on the Magnetic Stirrer/Heater',
    instruction5: 'Click on the Magnetic Bead to drop it into the Flask....',
    instruction6: 'Switch on the Heater of the Magnetic Stirrer & Heater ...',
    instruction7: 'Switch on the Stirrer of the Magnetic Stirrer & Heater ...',
    instruction8: 'Wait till the water starts boiling...',
    instruction9: 'Now that the water gas started boiling,Switch off the heater.....',
    instruction10: 'Click on the pipette to take 10ml conc. FeCl<sub>3</sub> from the beaker..... ',
    instruction11: 'Click on the pipette again to add the FeCl<sub>3</sub> taken from the beaker, to the hot water in conical flask, drop by drop......',
    instruction12: 'The colloid is thus obtained......',
    images: [' maroon_flask.png', ' rotate_bead.gif'],
    flaskimages: [' flask1.png', ' flask2.png', ' flask3.png', ' flask4.png',
    ' flask5.png', ' flask6.png', ' flask7.png',' flask8.png',' flask9.png',
    ' flask10.png', ' flask11.png',' flask12.png', ' flask13.png',' flask14.png',
    ' flask15.png',' flask16.png', ' flask17.png',' flask18.png',' flask19.png',
    ' flask20.png',' flask21.png',' flask22.png', ' flask23.png', ' flask24.png',
    ' flask25.png',' flask26.png', ' empty_flask.png']
}

var view={

    /* Click counts on elements. Here the clickcount represents the number of clicks on element. On specific
    click, specific instructions are executed. Initial click will be considered as zero and then so on the
    click count is incremented to execute the instructions as per the count of the click on elements. */
    heaterClkcount:0,
    pipetteClkcount:0,
    flaskClkcount:0,

    // loadPage: Calls method to load html page in a div
    loadPage: function (id, htmlpage) {
        document.getElementById(id).innerHTML='<object type="text/html" data='+htmlpage+' ></object>';
    },

    // animatePadding: Calls method to decrease the height of an element.
    animatePadding: function(id, paddingTop) {
        $("#"+id).animate({
            paddingTop: paddingTop+'%'
        }, {
            duration: 500,
            easing: "linear"
        });
    },

    // animateHeight: Calls method to increase the height of an element.
    animateHeight: function(id, height) {
        $("#"+id).animate({
            height: height+'%'
        }, {
            duration: 500,
            easing: "linear"
        });
    },

    // animateElements: Calls method to move the elements from one point to another.
    animateElements: function(id, top, left) {
        $("#"+id).animate({
            top: top+'%',
            left: left+'%'
        }, {
            duration: 1000,
            easing: "linear"
        });
    },

    // changeImages: Calls method to change image of an element for every few seconds.
    changeImages: function(id) {
            var i = 0,
            image = document.getElementById(id);
            setInterval( function () {
                        if (i >= model.flaskimages.length) {
                            return;
                        }
                        image.src = model.flaskimages[i];
                        i++;
            },50);
    },

    // changeOpacity: Calls method to change the opacity[to ligthen/darken] of an element.
    changeOpacity: function(id, value) {
            document.getElementById(id).style.opacity = value;
    },

    // rotateElements: Calls method to make the elements rotate.
    rotateElements: function(id, deg) {
        // Code for Safari
        document.getElementById(id).style.WebkitTransform = 'rotate('+deg+'deg)';
        // Code for IE9
        document.getElementById(id).style.msTransform = 'rotate('+deg+'deg)';
        // Standard syntax
        document.getElementById(id).style.transform = 'rotate('+deg+'deg)';
    },

    // addClickEvent: Calls method to add EventListener for an element in other methods.
    addClickEvent: function(id, method){
        var element = document.getElementById(id);
        element.addEventListener('click', method, false);
    },

    // removeClickEvent: Calls method to disable click event for an element in other methods.
    removeClickEvent: function(id){
        document.getElementById(id).style.pointerEvents = 'none';
    },

    // enableClickEvent: Calls method to enable click event for an element in other methods.
    enableClickEvent: function(id){
        document.getElementById(id).style.pointerEvents = 'auto';
    },

    // setInnerHtml: Calls method to set innerText to a element.
    setInnerHTML: function (id, innerHTML) {
        document.getElementById(id).innerHTML = innerHTML;
    },

    // showElements: Calls method to make the hidden elements visible.
    showElements: function(id){
        document.getElementById(id).style.visibility = 'visible';
    },

    // hideElements: Calls method to make the elements hidden.
    hideElements: function(id){
        document.getElementById(id).style.visibility = 'hidden';
    },

    // replaceElements: Calls method to replace the elements.
    replaceElements: function(id, image){
        document.getElementById(id).src = image;
    },

    // activateEvents: Calls method to add EventListener to elements.
    activateEvents: function() {
        this.addClickEvent('reset', function() { view.resetPage(); });
        this.addClickEvent('beaker', function() { view.moveBeaker(); });
        this.addClickEvent('powder', function() { view.addPowder(); });
        this.addClickEvent('glassrod', function() { view.moveGlassrod(); });
        this.addClickEvent('conical_flask', function() { view.moveFlask(); });
        this.addClickEvent('magnetic_bead', function() { view.moveBead(); });
        this.addClickEvent('heater_btn', function() { view.turnHeater(); });
        this.addClickEvent('stirrer_btn', function() { view.turnStirrer(); });
        this.addClickEvent('pipette', function() { view.movePipette(); });
        this.addClickEvent('solution_name2', function() { view.showSolution(); });
    },

    // init: Calls method to set the instructions when, the page loads.
    init: function() {
        this.setInnerHTML('instruction', model.instruction1);
    },

    // resetPage: Calls method to reset the page.
    resetPage: function(){
        location.reload();
    },

    /* moveBeaker: Calls method to move the beaker on to the table.
    Here the flask moves upwards and pours the solution into the beaker and then the flask moves to the left.
    Then a powder image with an arrow is made visible */
    moveBeaker: function() {
        this.removeClickEvent('beaker');
        this.hideElements('arrow_beaker');
        this.animateElements('beaker', '+=88', '+=22');
        setTimeout(function(){
                view.showElements('instructiontag');
                view.animateElements('instructiontag', '+=0', '+=5');
        }, 1000);

        setTimeout(function(){
                view.showElements('flask');
                view.changeImages('flask');
        }, 2000);

        setTimeout(function(){
                view.showElements('grey_solution');
                view.animateHeight('grey_solution', '15');
                view.hideElements('instructiontag');
        }, 3000);

        setTimeout(function(){
                view.showElements('watertag');
                view.animateElements('watertag', '-=20', '+=0');
                view.rotateElements('flask', '-80');
                view.animateElements('flask', '+=0', '-=60');
        }, 4000);

        setTimeout(function(){
                view.hideElements('watertag');
                view.showElements('arrow_powder');
                view.showElements('powder');
                view.setInnerHTML('instruction', model.instruction2);
        }, 5500);
    },

    /* addPowder: Calls method to add fecl3 powder into the beaker. Here when,the powder image is clicked,
    arrow is made hidden and the spoon with a solution adds powder into the beaker containing solution and
    gets hidden.Then a stirrer with an arrow is made visible. */
    addPowder: function() {
        this.removeClickEvent('powder');
        this.hideElements('arrow_powder');
        this.showElements('instructiontag1');
        this.showElements('spoon');
        this.showElements('red_powder');
        this.animateElements('instructiontag1', '+=0', '-=5');

        setTimeout(function(){
                view.rotateElements('spoon', '-20');
                view.animateElements('red_powder', '+=35', '+=0');
        },1500);

        setTimeout(function(){
                view.showElements('red_solution');
                view.hideElements('powder');
                view.hideElements('instructiontag1');
                view.hideElements('spoon');
                view.hideElements('red_powder');
        }, 2500);

        setTimeout(function(){
                view.showElements('arrow_glassrod');
                view.showElements('glassrod');
                view.setInnerHTML('instruction', model.instruction3);
        }, 3000);
    },

    /* moveGlassrod: Calls method to stir the solution in the beaker. Here when, the glassrod is clicked it is
    replaced with a 'glassrod stirring image' and a arrow is made hidden. After a few seconds the 'glass rod
    stirring image' gets hidden and beaker moves to the left. Then an arrow with a conical_flask is made visible.*/
    moveGlassrod: function(){
        this.hideElements('arrow_glassrod');
        this.hideElements('glassrod');
        this.showElements('stir_sol');

        setTimeout(function(){
                view.hideElements('stir_sol');
                view.animateElements('beaker', '+=0', '-=12');
                view.animateElements('grey_solution', '+=0', '-=12');
                view.animateElements('red_solution', '+=0', '-=12');
        }, 4000);

        setTimeout(function(){
                view.showElements('solution_name1');
                view.showElements('arrow_flask');
                view.showElements('conical_flask');
                view.setInnerHTML('instruction', model.instruction4);
        }, 5000);
    },

    /* moveFlask: For the first click, calls this method to move the flask on to the stirrer & Heater instrument.
    Then an arrow with magnetic bead image is made visible.
    For the second click colloid of solution is shown. */
    moveFlask: function() {
        if(this.flaskClkcount == 0){
                this.removeClickEvent('conical_flask');
                this.hideElements('arrow_flask');
                this.animateElements('conical_flask', '+=53', '+=0');
                setTimeout(function(){
                        view.showElements('arrow_bead');
                        view.showElements('magnetic_bead');
                        view.setInnerHTML('instruction', model.instruction5);
                }, 2000);
                this.flaskClkcount++;
        }
        else if(this.flaskClkcount == 1){
                this.showSolution();
        }

    },

    /* moveBead: Calls method to move the magnetic bead into the conical_flask. Then an heater arrow is made
    visible. */
    moveBead: function() {
        this.removeClickEvent('magnetic_bead');
        this.hideElements('arrow_bead');
        this.animateElements('magnetic_bead', '+=80', '+=0');
        setTimeout(function(){
                    view.changeOpacity('magnetic_bead', '0.4');
        }, 800);

        setTimeout(function(){
                    view.showElements('heater_btn');
                    view.showElements('arrow_heater');
                    view.setInnerHTML('instruction', model.instruction6);
        }, 2000);
    },

    /*turnHeater:
    Calls this method to switch on the heater button.
    For the first click, stirrer arrow and power button is made visible.
    On second click heater arrow and water boiling image are made hidden. Then the beaker moves to the right
    and an arrow with pipette is made visible. */
    turnHeater: function() {
        if(this.heaterClkcount == 0){
            this.hideElements('heater_btn');
            this.hideElements('arrow_heater');
            this.showElements('arrow_stirrer');
            this.showElements('stirrer_btn');
            this.showElements('power_btn');
            this.setInnerHTML('instruction', model.instruction7);
            this.heaterClkcount++;
        }
        else if(this.heaterClkcount == 1){
            this.hideElements('heater_btn');
            this.hideElements('arrow_heater');
            this.hideElements('water_boil');
            this.hideElements('power_btn');
            this.animateElements('beaker', '+=0', '+=12');
            this.animateElements('grey_solution', '+=0', '+=12');
            this.animateElements('red_solution', '+=0', '+=12');
            this.animateElements('solution_name1', '+=0', '+=10');
            setTimeout(function(){
                    view.showElements('arrow_pipette');
                    view.showElements('pipette');
                    view.setInnerHTML('instruction', model.instruction10);
            }, 1000);
            this.heaterClkcount++;
        }
    },

    /* turnStirrer: Calls method to switch on the stirrer button.On click, magnetic bead is replaced with a
    rotating magnetic bead. Then after few seconds water boiling image, arrow with an heater button is made
    visible. */
    turnStirrer: function() {
        this.hideElements('stirrer_btn');
        this.hideElements('arrow_stirrer');
        this.replaceElements('magnetic_bead', model.images[1]);
        this.setInnerHTML('instruction', model.instruction8);
        setTimeout(function(){
                view.showElements('water_boil');
                view.showElements('arrow_heater');
                view.showElements('heater_btn');
                view.setInnerHTML('instruction', model.instruction9);
        }, 2000);
    },

    /* movePipette:
    For the first click, pipette moves down into the beaker. Then the solution in the beaker gets decreased
    and the pipette moves upwards and pipette arrow is made visible.
    For the second click, pipette moves towards right and arrow, drop image is made visible.
    For the third click, drop moves down into the flask and the flask gets replaced. Then a solution name 2 is
    made visible. */
    movePipette: function() {
        if(this.pipetteClkcount == 0){
                this.removeClickEvent('pipette');
                this.hideElements('arrow_pipette');
                this.animateElements('pipette', '+=90', '-=4');
                setTimeout(function(){
                        view.animatePadding('red_solution', '+=1');
                }, 2000);

                setTimeout(function(){
                        view.animateElements('pipette', '-=90', '+=8');
                }, 3500);

                setTimeout(function(){
                        view.showElements('arrow_pipette1');
                        view.setInnerHTML('instruction', model.instruction11);
                        view.enableClickEvent('pipette');
                        view.pipetteClkcount++;
                }, 5000);
        }
        else if(this.pipetteClkcount == 1){
                this.removeClickEvent('pipette');
                this.hideElements('arrow_pipette1');
                this.animateElements('pipette', '+=0', '+=17');
                setTimeout(function(){
                        view.showElements('arrow_pipette2');
                        view.showElements('drop');
                        view.enableClickEvent('pipette');
                        view.pipetteClkcount++;
                }, 1500);
        }
        else if(this.pipetteClkcount == 2){
                this.removeClickEvent('pipette');
                this.animateElements('drop', '+=40', '+=0');
                this.showElements('solution_name2');
                this.enableClickEvent('conical_flask');
                setTimeout(function(){
                        view.hideElements('drop');
                        view.hideElements('arrow_pipette2');
                        view.replaceElements('conical_flask', model.images[0]);
                        view.setInnerHTML('instruction', model.instruction12);
                        view.pipetteClkcount++;
                }, 1200);
        }
    },

    // showSolution: On clicking, the flask/solution_name2 colloid of solution is shown.
    showSolution: function() {
            this.removeClickEvent('solution_name2');
            this.removeClickEvent('conical_flask');
            this.showElements('micro_analysis');
            setTimeout(function(){
                        view.loadPage('final_solution', model.htmlpages[0]);
                        view.setInnerHTML('instruction', model.instruction13);
            }, 200);
    }

}

// onload function: Call init method on window onload.
window.onload=function() {
    view.init();
    view.activateEvents();
}