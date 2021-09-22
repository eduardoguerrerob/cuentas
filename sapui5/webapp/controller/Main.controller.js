// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, JSONModel, Filter, FilterOperator) {
        "use strict";

        function onInit() {
            // vista
            let oView = this.getView();
            //modelo paises
            let jsonPaisesModel = new JSONModel();
            jsonPaisesModel.loadData("./localService/paises.json", false);
            oView.setModel(jsonPaisesModel, "paisesModel");
            //modelo de cuentas
            let jsonSolicitudeModel = new JSONModel();
            jsonSolicitudeModel.loadData("./localService/solicitudes.json", false);
            oView.setModel(jsonCuentasModel, "jsonSolicitudeModel");
        };

        function onFilter(){
            let paises = this.getView().getModel("paisesModel").getData();
            let aFilter = [];
            if(paises.paisSeleccionado !== "" && paises.paisSeleccionado !== undefined){
                aFilter.push(new Filter("Country", FilterOperator.EQ, paises.paisSeleccionado));
            }
            let $tableEmp = this.getView().byId("tableEmp");
            let oBinding = $tableEmp.getBinding("items");
            oBinding.filter(aFilter);
        };

        function onShowRequests(){

        };

        var Main = Controller.extend("egb.sapui5.controller.Main", {});

        Main.prototype.onInit = onInit;
        Main.prototype.onFilter = onFilter;
        Main.prototype.onShowRequests = onShowRequests;
        return Main;
    });
