import { useEffect, useState } from "react";
import "./css/EmailMarketing.css";
import useNotify from '../hooks/useToast';

const EmailMarketing = ({ onClose, subscribedEmails }) => {
    const [recipients, setRecipients] = useState(subscribedEmails.join(", "));
    const [subject, setSubject] = useState("Oferta Especial para Ti!");
    const [offerLink, setOfferLink] = useState("");
    const notify = useNotify();

    const handleSendEmail = async () => {
        const recipientList = recipients.split(",").map(email => email.trim());

        if (!recipientList.length || !subject || !offerLink) {
            notify('Por favor, completa todos los campos.', 'error');
            return;
        }

        // Validar si el enlace tiene formato de URL
        const urlPattern = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/.*)?$/;
        if (!urlPattern.test(offerLink)) {
            notify('Ingresa un enlace válido.', 'error');
            return;
        }

        const emailData = {
            recipients: recipientList,
            subject,
            template: "offer-template", // Nombre de la plantilla en el backend (sin .hbs)
            variables: { offer_link: offerLink },
        };

        try {
            const response = await fetch("http://localhost:4000/descuento/send-mass-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(emailData),
            });

            const result = await response.json();
            if (response.ok) {
                notify('Emails enviados con éxito!', 'success');
                setRecipients("");
                setOfferLink("");
            } else {
                notify(`Error: ${result.message || "No se pudieron enviar los correos."}`);
            }
        } catch (error) {
            console.error("Error:", error);
            notify('Hubo un problema enviando los correos.', 'error');
        }
    };

    useEffect(() => {
        setRecipients(subscribedEmails.join(", ")); 
    }, [subscribedEmails]);

    return (
        <div className="email-marketing">
            <div className="close-modal-mkt" onClick={onClose}>&times;</div>
            <h5>Enviar Email Masivo</h5>
            <label className="label-mkt">Destinatarios (separados por coma):</label>
            <textarea
                className="textarea-mkt"
                rows="3"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                placeholder="ejemplo1@gmail.com, ejemplo2@gmail.com"
            />

            <label className="label-mkt">Asunto:</label>
            <input className="input-mkt" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />

            <label className="label-mkt">Enlace de la oferta:</label>
            <input className="input-mkt" type="text" value={offerLink} onChange={(e) => setOfferLink(e.target.value)} />

            <button className="btn-mkt" onClick={handleSendEmail}>Enviar Emails</button>
        </div>
    );
};

export default EmailMarketing;
