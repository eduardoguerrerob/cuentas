// @ts-nocheck
sap.ui.define([
     //"sap/ui/core/mvc/Controller",
     "egb/sapui5/controller/Base.controller",
     "sap/ui/core/routing/History",
     "sap/ui/model/json/JSONModel"
],
/**
 * 
 * @param {typeof sap.ui.core.mvc.Controller} Controller 
 * @param {typeof sap.ui.core.sap.ui.core.routing.History} History 
 * @param {typeof sap.ui.model.json.JSONModel} JSONModel
 */
function(Base, History, JSONModel){

    function _onMatched(oEvent){
        const employeeID = oEvent.getParameter("arguments").employeeID;
        this.getView().bindElement({
            path: "/Employees(" + employeeID + ")",
            model: "northwind"
        });
    };

    return Base.extend("egb.sapui5.controller.Details",{
        onInit: function(){
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteDetails").attachPatternMatched(_onMatched, this);
            //modelo de cuentas
            let jsonSolicitudeModel = new JSONModel();
            jsonSolicitudeModel.loadData("./localService/solicitudes.json", false);
            this.getView().setModel(jsonSolicitudeModel, "jsonSolicitudeModel");
        },

        onBack: function(oEvent){
            const oHistory = History.getInstance();
            const sPrevious = oHistory.getPreviousHash();
            if(sPrevious !== undefined){
                window.history.go(-1);
            }
            else{
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteMain");
            }
        }
        // onShowRequests: function(oEvent) {
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
        // }
    });
})