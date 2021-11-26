// @ts-nocheck
/* eslint-disable no-undef */
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     */
    function (Controller) {
        return Controller.extend("egb.sapui5.controller.Base", {
            onInit: function () {

            },

            onShowRequests: function (oEvent) {
                const $tableRequests = this.getView().byId("tableRequests");
                $tableRequests.destroyItems();
                const pressedItem = oEvent.getSource();
                const oContext = pressedItem.getBindingContext("northwind");
                //const sPath = oContext.getPath();
                const objectContext = oContext.getObject();
                const employeeID = objectContext.EmployeeID;

                // armar lista de solicitudes para el empleado seleccionado
                let reqData = this.getView().getModel("jsonSolicitudesModel").getData().solicitudes;
                // FilterOperator
                let reqFiltered = [];
                reqFiltered = reqData.filter((elem) => {
                    return elem.empleadoId === employeeID;
                });
                let aCuentas = reqFiltered[0].cuentas;

                // armar tabla
                let requestItems = [];
                for (let i in aCuentas) {
                    requestItems.push(new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Label({ text: aCuentas[i].numero }),
                            new sap.m.Label({ text: aCuentas[i].nombre })
                        ]
                    }));
                };

                let newTable = new sap.m.Table({
                    width: "auto",
                    columns: [
                        new sap.m.Column({ header: new sap.m.Label({ text: "{i18n>requestNumber}" }) }),
                        new sap.m.Column({ header: new sap.m.Label({ text: "{i18n>requestName}" }) })
                    ],
                    items: requestItems
                });

                $tableRequests.addItem(newTable);
            }
        });
    })