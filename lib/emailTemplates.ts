export interface BookingData {
  inviteeName: string;
  inviteeEmail: string;
  eventTypeName: string;
  startTime: string;
  endTime: string;
  timezone: string;
  cancelUrl: string;
  rescheduleUrl: string;
}

function formatDate(iso: string, timezone: string, locale: string) {
  const d = new Date(iso);
  return d.toLocaleString(locale === "fr" ? "fr-CA" : "en-CA", {
    timeZone: timezone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

const BASE = `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body{margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
    .wrap{max-width:560px;margin:32px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
    .header{background:#0f172a;padding:32px 40px;text-align:center}
    .header img{height:44px;width:auto}
    .body{padding:40px}
    .badge{display:inline-block;background:#eff6ff;color:#1d4ed8;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 12px;border-radius:999px;margin-bottom:16px}
    h1{margin:0 0 8px;font-size:22px;font-weight:900;color:#0f172a;line-height:1.3}
    .sub{color:#64748b;font-size:14px;margin:0 0 28px;line-height:1.6}
    .card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px 24px;margin-bottom:24px}
    .row{display:flex;gap:8px;align-items:flex-start;padding:6px 0;border-bottom:1px solid #f1f5f9}
    .row:last-child{border-bottom:none}
    .label{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;min-width:90px;padding-top:1px}
    .value{font-size:14px;color:#0f172a;font-weight:600;flex:1}
    .divider{height:1px;background:#f1f5f9;margin:24px 0}
    .btn{display:inline-block;padding:12px 24px;border-radius:10px;font-size:13px;font-weight:700;text-decoration:none;margin-right:8px;margin-bottom:8px}
    .btn-primary{background:#0f172a;color:#ffffff}
    .btn-outline{background:#ffffff;color:#0f172a;border:1.5px solid #e2e8f0}
    .accent{color:#2563eb}
    .footer{background:#f8fafc;padding:24px 40px;text-align:center;border-top:1px solid #f1f5f9}
    .footer p{margin:0;font-size:12px;color:#94a3b8;line-height:1.7}
    .footer a{color:#64748b;text-decoration:none}
  </style>
`;

export function studioNotificationEmail(data: BookingData): { subject: string; html: string } {
  const dateStr = formatDate(data.startTime, data.timezone, "fr");
  const endStr = formatDate(data.endTime, data.timezone, "fr");

  const subject = `[Réservation] ${data.inviteeName} – ${data.eventTypeName}`;

  const html = `<!DOCTYPE html><html><head>${BASE}</head><body>
  <div class="wrap">
    <div class="header">
      <img src="https://multirecstudio.vercel.app/Logo-white.png" alt="Multi Rec Studio" />
    </div>
    <div class="body">
      <div class="badge">Nouvelle réservation</div>
      <h1>Une session vient d'être confirmée</h1>
      <p class="sub">Voici les détails de la réservation reçue via le site web.</p>

      <div class="card">
        <div class="row">
          <span class="label">Client</span>
          <span class="value">${data.inviteeName}</span>
        </div>
        <div class="row">
          <span class="label">Courriel</span>
          <span class="value"><a href="mailto:${data.inviteeEmail}" class="accent">${data.inviteeEmail}</a></span>
        </div>
        <div class="row">
          <span class="label">Studio</span>
          <span class="value">${data.eventTypeName}</span>
        </div>
        <div class="row">
          <span class="label">Début</span>
          <span class="value">${dateStr}</span>
        </div>
        <div class="row">
          <span class="label">Fin</span>
          <span class="value">${endStr}</span>
        </div>
        <div class="row">
          <span class="label">Fuseau</span>
          <span class="value">${data.timezone}</span>
        </div>
      </div>

      <p style="font-size:13px;color:#64748b;margin:0 0 16px">Actions rapides :</p>
      <a href="${data.cancelUrl}" class="btn btn-outline">Annuler</a>
      <a href="${data.rescheduleUrl}" class="btn btn-outline">Reprogrammer</a>
    </div>
    <div class="footer">
      <p>Multi Rec Studio · Laval, Québec<br>
      <a href="mailto:multirecstudio1@gmail.com">multirecstudio1@gmail.com</a> · Ouvert 7j/7 · 10h–22h</p>
    </div>
  </div>
</body></html>`;

  return { subject, html };
}

export function clientConfirmationEmail(data: BookingData): { subject: string; html: string } {
  const dateStr = formatDate(data.startTime, data.timezone, "fr");

  const subject = `Réservation confirmée – Multi Rec Studio`;

  const html = `<!DOCTYPE html><html><head>${BASE}</head><body>
  <div class="wrap">
    <div class="header">
      <img src="https://multirecstudio.vercel.app/Logo-white.png" alt="Multi Rec Studio" />
    </div>
    <div class="body">
      <div class="badge">Réservation confirmée ✓</div>
      <h1>On vous attend, ${data.inviteeName} !</h1>
      <p class="sub">Votre session au Multi Rec Studio est confirmée. Voici un récapitulatif de votre réservation.</p>

      <div class="card">
        <div class="row">
          <span class="label">Studio</span>
          <span class="value">${data.eventTypeName}</span>
        </div>
        <div class="row">
          <span class="label">Date</span>
          <span class="value">${dateStr}</span>
        </div>
        <div class="row">
          <span class="label">Adresse</span>
          <span class="value">Multi Rec Studio · Laval, Québec</span>
        </div>
      </div>

      <div class="divider"></div>

      <p style="font-size:14px;font-weight:700;color:#0f172a;margin:0 0 8px">Ce qu'il faut apporter</p>
      <p style="font-size:13px;color:#64748b;margin:0 0 20px;line-height:1.7">
        Rien. Présentez-vous simplement à l'heure prévue. Tout le matériel est sur place.<br>
        Stationnement gratuit disponible.
      </p>

      <div class="divider"></div>

      <p style="font-size:13px;color:#64748b;margin:0 0 16px">Besoin de modifier votre réservation ?</p>
      <a href="${data.rescheduleUrl}" class="btn btn-primary">Reprogrammer</a>
      <a href="${data.cancelUrl}" class="btn btn-outline">Annuler</a>
    </div>
    <div class="footer">
      <p>Multi Rec Studio · Laval, Québec<br>
      <a href="mailto:multirecstudio1@gmail.com">multirecstudio1@gmail.com</a> · Ouvert 7j/7 · 10h–22h</p>
      <p style="margin-top:8px;font-size:11px">
        Vous recevez cet email car vous avez réservé une session via notre site web.
      </p>
    </div>
  </div>
</body></html>`;

  return { subject, html };
}
