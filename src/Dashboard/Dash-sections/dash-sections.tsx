import "./dash-sections.css";
import NewPayment, { InvoiceIcon } from "../../assets/svgs/payments/new-payment";
import { DashCardSection } from "../components/dash-card-section";

export default function DashSections() {

  return (
    <div className="dash-sections">
        <DashCardSection text="Registra facturas y genera facturas para ser compartidas con un link para terceros." title="Facturas" children={<InvoiceIcon/>} path="/dashboard/payments/add"/>
        <DashCardSection text="Registra pagos que hayan sido efectuados. Lleva el control de los pagos de tus facturas." title="Pagos" children={<NewPayment/>} path="/dashboard/invoices/add"/>
        <DashCardSection text="Registra facturas y genera facturas para ser compartidas con un link para terceros." title="Facturas" children={<InvoiceIcon/>} path="/dashboard/payments/add"/>
        <DashCardSection text="Registra pagos que hayan sido efectuados. Lleva el control de los pagos de tus facturas." title="Pagos" children={<NewPayment/>} path="/dashboard/invoices/add"/>
    </div>
  );
}
