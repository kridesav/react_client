import React, { useState } from 'react';
import { useAuth } from './AuthContext';

function CheckTicket() {
    const [barcode, setBarcode] = useState('');
    const [ticketInfo, setTicketInfo] = useState(null);
    const { auth, apiServer, logout } = useAuth();

    const getTicketInfo = async () => {
        try {
            const response = await fetch(`${apiServer}/tickets/barcode/${barcode}`, {
                headers: {
                    'Authorization': `Basic ${auth}`
                }
            });
            const data = await response.json();
            setTicketInfo(data);
        } catch (error) {
            console.error('Error fetching ticket info:', error);
        }
    };

    const checkTicket = async () => {
        try {
            const response = await fetch(`${apiServer}/tickets/barcode/${barcode}/checked`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${auth}`
                },
                body: JSON.stringify({ isChecked: true }),
            });
            const data = await response.json();
            setTicketInfo(data);
        } catch (error) {
            console.error('Error checking ticket:', error);
        }
    };

    return (
        <div>
            <input value={barcode} onChange={e => setBarcode(e.target.value)} />
            <button onClick={getTicketInfo}>Get Ticket Info</button>
            <button onClick={checkTicket}>Check Ticket</button>
            <button onClick={logout}>Logout</button>
            {ticketInfo && <div>{JSON.stringify(ticketInfo)}</div>}
        </div>
    );
}

export default CheckTicket;