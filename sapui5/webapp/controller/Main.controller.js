// @ts-nocheck
sap.ui.define([
    //"sap/ui/core/mvc/Controller",
    "egb/sapui5/controller/Base.controller",
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
    function (Base, JSONModel, Filter, FilterOperator) {
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
            oView.setModel(jsonSolicitudeModel, "jsonSolicitudeModel");
        };

        function onFilter() {
            let paises = this.getView().getModel("paisesModel").getData();
            let aFilter = [];
            if (paises.paisSeleccionado !== "" && paises.paisSeleccionado !== undefined) {
                aFilter.push(new Filter("Country", FilterOperator.EQ, paises.paisSeleccionado));
            }
            let $tableEmp = this.getView().byId("tableEmp");
            let oBinding = $tableEmp.getBinding("items");
            oBinding.filter(aFilter);
        };

        // function onShowRequests(oEvent) {
        //     const $tableRequests = this.getView().byId("tableRequests");
        //     $tableRequests.destroyItems();
        //     // obtener el registro seleccionado
        //     const pressedItem = oEvent.getSource();
        //     const oContext = pressedItem.getBindingContext("northwind");
        //     const sPath = oContext.getPath();
        //     const objectContext = oContext.getObject();
        //     // indice 
        //     //const idx = parseInt(sPath.replace("/Employees(","").replace(")",""));
        //     // ID del empleado
        //     const employeeID = objectContext.EmployeeID;

        //     // armar lista de solicitudes del regisro seleccionado
        //     let requestsItems = [];
        //     let reqData = this.getView().getModel("jsonSolicitudeModel").getData().solicitudes;
        //     // filtrar las solicitudes del empleado
        //     let aFilters = [];
        //     //aFilters.push(new Filter("empleadoId", FilterOperator.EQ, employeeID));
        //     let reqFiltered = [];
        //     reqFiltered = reqData.filter((elem) => {
        //         return elem.empleadoId === employeeID;
        //     });
        //     let aCuentas = reqFiltered[0].cuentas;

        //     if (aCuentas.length > 0) {
        //         for (let i in aCuentas) {
        //             requestsItems.push(new sap.m.ColumnListItem({
        //                 cells: [
        //                     new sap.m.Label({ text: aCuentas[i].numero }),
        //                     new sap.m.Label({ text: aCuentas[i].nombre })
        //                 ]
        //             }));
        //         };
        //         let newTable = new sap.m.Table({
        //             width: "auto",
        //             columns: [
        //                 new sap.m.Column({ header: new sap.m.Label({ text: "{i18n>requestNumber}" }) }),
        //                 new sap.m.Column({ header: new sap.m.Label({ text: "{i18n>requestName}" }) })
        //             ],
        //             items: requestsItems
        //         }).addStyleClass("sapUiSmallMargin");

        //         $tableRequests.addItem(newTable);
        //     }
        //     else {
        //         let newText = new sap.m.Text({text: "{i18n>noRequests}"});
        //         $tableRequests.addItem(newText);
        //     }

        // };

        function toDetails(oEvent){
            const employeeID = oEvent.getSource().getBindingContext("northwind").getObject().EmployeeID;
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteDetails",{
                employeeID: employeeID
            });
        };

        //var Main = Controller.extend("egb.sapui5.controller.Main", {});
        var Main = Base.extend("egb.sapui5.controller.Main", {});

        Main.prototype.onInit = onInit;
        Main.prototype.onFilter = onFilter;
        //Main.prototype.onShowRequests = onShowRequests;
        Main.prototype.toDetails = toDetails;
        return Main;
    });
