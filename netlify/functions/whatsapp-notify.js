/**
 * Greenwood Barbers • Automated WhatsApp Confirmation Webhook
 * Netlify Serverless Function: /.netlify/functions/whatsapp-notify
 */

exports.handler = async (event, context) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed. Use POST.' })
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const {
      bookingCode,
      guestName,
      guestPhone,
      guestEmail,
      guestNotes,
      serviceName,
      barberName,
      schedule,
      totalPrice,
      message
    } = data;

    console.log(`[Greenwood Barbers Webhook] New booking notification received: ${bookingCode} for ${guestName} (${guestPhone})`);

    const confirmationText = message || (
      `Welcome Mr. ${guestName},\n\n` +
      `Your private grooming appointment at Greenwood Barbers is officially confirmed.\n\n` +
      `• Reservation Pass: ${bookingCode}\n` +
      `• Ritual: ${serviceName}\n` +
      `• Artisan Barber: ${barberName}\n` +
      `• Schedule: ${schedule}\n` +
      `• Location: Ruko PancaTengah Blok B No. 08, Kota Baru Parahyangan\n` +
      `• Total Amount Due: ${totalPrice}\n\n` +
      `Our chair and artisan are dedicated exclusively to you. If you need any schedule adjustment, please reply to this message or telephone +62 821-2345-6789.`
    );

    // If external WhatsApp API provider is configured via environment variables
    const waApiUrl = process.env.WHATSAPP_API_URL;
    const waToken = process.env.WHATSAPP_API_TOKEN;

    let dispatchStatus = 'logged_locally';

    if (waApiUrl && waToken) {
      try {
        const response = await fetch(waApiUrl, {
          method: 'POST',
          headers: {
            'Authorization': waToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            target: guestPhone,
            message: confirmationText
          })
        });
        const resJson = await response.json();
        console.log('[Greenwood Barbers Webhook] Gateway dispatch result:', resJson);
        dispatchStatus = 'dispatched_via_gateway';
      } catch (gatewayErr) {
        console.error('[Greenwood Barbers Webhook] Gateway dispatch error:', gatewayErr);
        dispatchStatus = 'gateway_error_fallback';
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        bookingCode,
        status: dispatchStatus,
        guestPhone,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('[Greenwood Barbers Webhook] Handler error:', error);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
