import { useGlobalState } from "../../store/useGlobalState"

interface PaymentDetailCardProps {
    type: string
    amount: number
}

export default function PaymentDetailCard ({ type, amount }: PaymentDetailCardProps) {
    const { isDarkMode } = useGlobalState()

    return (
        <div className={`details`}>
            <div className="details-cn">
                <div>
                    <p>Tipo</p>
                    <p>{type}</p>
                </div>

                <div>
                    <p>Monto</p>
                    <p>$ {amount}</p>
                </div>
            </div>
      </div>
    )
}