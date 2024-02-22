import {useState} from 'react';
import {useGetPaymentsQuery, useDeletePaymentByIdMutation} from '../store/endpoints/paymentsEndpoints';

const PaymentsTable = () => {
    const {data, isLoading, error} = useGetPaymentsQuery();
    const [deletePaymentById] = useDeletePaymentByIdMutation();

    // Assuming payments are directly available in the data object
    const payments = data?.payments || [];
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPayments = payments.filter(payment =>
        payment.id.includes(searchTerm) ||
        payment.userId.includes(searchTerm) ||
        payment.amount.toString().includes(searchTerm)
    );

    const handleDeletePayment = async (paymentId: string) => {
        if (window.confirm(`Are you sure you want to delete this payment?`)) {
            await deletePaymentById(paymentId).unwrap()
                .then(() => {
                    // Optionally, show success message or refresh data
                })
                .catch((error) => console.error('Delete failed:', error));
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.toString()}</div>;

    return (
        <div>
            <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Amount</th>
                    <th>User ID</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredPayments.map((payment) => (
                    <tr key={payment.id}>
                        <td>{payment.id}</td>
                        <td>${payment.amount.toFixed(2)}</td>
                        <td>{payment.userId}</td>
                        <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                        <td>
                            <button onClick={() => handleDeletePayment(payment.id)} className="deleteButton">❌</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentsTable;
