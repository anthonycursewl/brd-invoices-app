interface PaymentDetailsProps {
    payments: any;
}

import PaymentDetailCard from "./payment-detail-card";

export default function PaymentDetails({ payments }: PaymentDetailsProps) {
  return (
    <div className="payments-list">
        {
            payments?.map((payment: any, index: number) => (
                <PaymentDetailCard key={index} type={payment.type} amount={payment.amount}/>
            ))
        }
    </div>
  );
}
