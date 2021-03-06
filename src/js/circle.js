
/*globals document, ol3turf, turf */

//==================================================
// circle control
//--------------------------------------------------
(function (ol3turf) {

    "use strict";

    // Control name
    var name = "circle";

    /**
     * Create circle
     * @private
     */
    var action = function (control) {

        // Define control ids
        var idCancel = ol3turf.utils.getName([name, "cancel"], control.prefix);
        var idForm = ol3turf.utils.getName([name, "form"], control.prefix);
        var idOk = ol3turf.utils.getName([name, "ok"], control.prefix);
        var idRadius = ol3turf.utils.getName([name, "radius"], control.prefix);
        var idSteps = ol3turf.utils.getName([name, "steps"], control.prefix);
        var idUnits = ol3turf.utils.getName([name, "units"], control.prefix);

        function onOK() {
            try {

                // Gather center point
                var collection = ol3turf.utils.getCollection(control, 1, 1);
                var points = ol3turf.utils.getPoints(collection, 1, 1);
                var center = points[0];

                // Gather form inputs
                var radius = ol3turf.utils.getFormNumber(idRadius, "radius");
                var steps = ol3turf.utils.getFormNumber(idSteps, "steps");
                var units = ol3turf.utils.getFormString(idUnits, "units");

                // Collect polygons
                var output = turf.circle(center, radius, steps, units);

                // Remove form and display results
                control.showForm();
                var inputs = {
                    center: center,
                    radius: radius,
                    steps: steps,
                    units: units
                };
                control.toolbar.ol3turf.handler.callback(name, output, inputs);

            } catch (e) {
                control.showMessage(e);
            }
        }

        function onCancel() {
            control.showForm();
        }

        var controls = [
            ol3turf.utils.getControlNumber(idRadius, "Radius", "Radius of the circle", "0", "any", "0"),
            ol3turf.utils.getControlNumber(idSteps, "Steps", "Number of steps around circle", "3", "1", "3"),
            ol3turf.utils.getControlSelect(idUnits, "Units", ol3turf.utils.getOptionsUnits()),
            ol3turf.utils.getControlInput(idOk, onOK, "", "OK"),
            ol3turf.utils.getControlInput(idCancel, onCancel, "", "Cancel")
        ];

        control.showForm(controls, idForm);

    };

    ol3turf.controls[name] = {
        /*
         * Create control then attach custom action and it's parent toolbar
         * @param toolbar Parent toolbar
         * @param prefix Selector prefix.
         */
        create: function (toolbar, prefix) {
            var title = "Create circle";
            var control = ol3turf.Control.create(toolbar, prefix, name, title, action);
            return control;
        }
    };

    return ol3turf;

}(ol3turf || {}));
