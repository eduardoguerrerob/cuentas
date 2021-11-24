// @ts-nocheck
sap.ui.define([
    //"sap/ui/core/mvc/Controller",
    "egb/sapui5/controller/Base.controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.ui.core.sap.ui.core.routing.History} History 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.core.Fragment} Fragment
     */
    function (Base, History, JSONModel, Fragment) {

        function _onMatched(oEvent) {
            const employeeID = oEvent.getParameter("arguments").employeeID;
            this.getView().bindElement({
                path: "/Employees(" + employeeID + ")",
                model: "northwind"
            });
        };

        return Base.extend("egb.sapui5.controller.Details", {
            onInit: function () {
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteDetails").attachPatternMatched(_onMatched, this);
                //modelo de cuentas
                let jsonSolicitudeModel = new JSONModel();
                jsonSolicitudeModel.loadData("./localService/solicitudes.json", false);
                this.getView().setModel(jsonSolicitudeModel, "jsonSolicitudeModel");
            },

            onBeforeRendering: function () {
                alert("onBeforeRendering")
                const $tableRequests = this.getView().byId("tableRequests");
                $tableRequests.destroyItems();
            },

            onBack: function (oEvent) {

                const $tableRequests = this.getView().byId("tableRequests");
                $tableRequests.destroyItems();

                const oHistory = History.getInstance();
                const sPrevious = oHistory.getPreviousHash();
                if (sPrevious !== undefined) {
                    window.history.go(-1);
                }
                else {
                    const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteMain");
                }
            },

            onCreateRequests: function() {
                if(!this.byId("newRequestDialog")){
                    const oView = this.getView();
                    Fragment.load({
                        id: oView.getId(),
                        name: "egb.sapui5.fragment.NewRequestDialog",
                        controller: this
                    }).then(function(oDialog){
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                }
                else{
                    this.byId("newRequestDialog").open();
                }
            },

            onCloseNewReqDialog: function(){
                this.byId("newRequestDialog").close();
            }
            
        });
    })