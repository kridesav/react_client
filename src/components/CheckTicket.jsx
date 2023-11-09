import React, { useState } from 'react';

function CheckTicket() {
    const [barcode, setBarcode] = useState('');
    const [ticketInfo, setTicketInfo] = useState(null);

    const getTicketInfo = async () => {
        const response = await fetch(`/tickets/barcode/${barcode}`);
        const data = await response.json();
        setTicketInfo(data);
    };

    const checkTicket = async () => {
        const response = await fetch(`/tickets/barcode/${barcode}/checked`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isChecked: true }),
        });
        const data = await response.json();
        setTicketInfo(data);
    };

    return (
        <div>
            <input value={barcode} onChange={e => setBarcode(e.target.value)} />
            <button onClick={getTicketInfo}>Get Ticket Info</button>
            <button onClick={checkTicket}>Check Ticket</button>
            {ticketInfo && <div>{JSON.stringify(ticketInfo)}</div>}
        </div>
    );
}

export default CheckTicket;