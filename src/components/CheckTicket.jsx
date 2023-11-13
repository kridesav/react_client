import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import './CheckTicket.css';

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
          // First, get the current status of the ticket
          const response = await fetch(`${apiServer}/tickets/barcode/${barcode}`, {
            headers: {
              'Authorization': `Basic ${auth}`
            }
          });
          const data = await response.json();
          if (data.isChecked) {
            alert('This ticket has already been checked.');
            return;
          }
      
          // If the ticket is not checked, update it
          const updateResponse = await fetch(`${apiServer}/tickets/barcode/${barcode}/checked`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${auth}`
            },
            body: JSON.stringify({ isChecked: true }),
          });
          const updateData = await updateResponse.json();
          setTicketInfo(updateData);
          alert('The ticket has been successfully checked.');
        } catch (error) {
          console.error('Error checking ticket:', error);
        }
      };

    const renderValue = (value) => {
        if (typeof value === 'object' && value !== null) {
            return Object.entries(value).map(([key, subValue]) => {
                if (!key.toLowerCase().endsWith('id') && typeof subValue !== 'object') {
                    return <div key={key}>{`${key}: ${subValue}`}</div>;
                }
                return null;
            });
        }
        return value.toString();
    };

    return (
        <div className="check-ticket">

            {ticketInfo && (
                <table className="ticket-info">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(ticketInfo).map(([key, value]) => {
                            if (!key.toLowerCase().endsWith('id')) {
                                return (
                                    <tr key={key}>
                                        <td>{key}</td>
                                        <td>{renderValue(value)}</td>
                                    </tr>
                                );
                            }
                            return null;
                        })}
                    </tbody>
                </table>
            )}

            <input className="barcode-input" value={barcode} onChange={e => setBarcode(e.target.value)} />
            <div className="button-container">
                <button className="button" onClick={getTicketInfo}>Get Ticket Info</button>
                <button className="button" onClick={checkTicket}>Check Ticket</button>
                <button className="button" onClick={logout}>Logout</button>
            </div>
        </div>
    );
}

export default CheckTicket;