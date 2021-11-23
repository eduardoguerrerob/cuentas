// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     */
    function (Controller) {

        return Controller.extend("egb.sapui5.controller.Base", {


            onShowRequests: function (oEvent) {
                const $tableRequests = this.getView().byId("tableRequests");
                $tableRequests.destroyItems();
                // obtener el registro seleccionado
                const pressedItem = oEvent.getSource();
                const oContext = pressedItem.getBindingContext("northwind");
                const sPath = oContext.getPath();
                const objectContext = oContext.getObject();
                // indice 
                //const idx = parseInt(sPath.replace("/Employees(","").replace(")",""));
                // ID del empleado
                const employeeID = objectContext.EmployeeID;

                // armar lista de solicitudes del regisro seleccionado
                let requestsItems = [];
                let reqData = this.getView().getModel("jsonSolicitudeModel").getData().solicitudes;
                // filtrar las solicitudes del empleado
                let aFilters = [];
                //aFilters.push(new Filter("empleadoId", FilterOperator.EQ, employeeID));
                let reqFiltered = [];
                reqFiltered = reqData.filter((elem) => {
                    return elem.empleadoId === employeeID;
                });
                let aCuentas = reqFiltered[0].cuentas;

                if (aCuentas.length > 0) {
                    for (let i in aCuentas) {
                        requestsItems.push(new sap.m.ColumnListItem({
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
                        items: requestsItems
                    }).addStyleClass("sapUiSmallMargin");

                    $tableRequests.addItem(newTable);
                }
                else {
                    let newText = new sap.m.Text({ text: "{i18n>noRequests}" });
                    $tableRequests.addItem(newText);
                }
            }
        });

    })