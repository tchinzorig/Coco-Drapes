/**
 * Form-to-email transport. FormSubmit.co relays a JSON POST to our inbox
 * as a table-formatted email — no backend or account needed.
 *
 * NOTE: the first-ever submission triggers an activation email to the
 * address below; forwarding starts once that link is clicked. To change
 * the destination, update QUOTE_INBOX (and re-activate the new address).
 */
const QUOTE_INBOX = 'oscar@shadeservice.com';
const ENDPOINT = `https://formsubmit.co/ajax/${QUOTE_INBOX}`;

export async function sendFormEmail(subject, fields) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: subject,
      _template: 'table',
      ...fields,
    }),
  });
  if (!res.ok) throw new Error(`Submission failed (${res.status})`);
  const data = await res.json().catch(() => ({}));
  if (String(data.success) === 'false') {
    throw new Error(data.message || 'Submission failed');
  }
  return data;
}
