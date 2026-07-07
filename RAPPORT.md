# Rapport de projet — Multi Rec Studio

**Projet :** Site web vitrine et système de réservation en ligne  
**Client :** Multi Rec Studio — Studio d'enregistrement et podcast  
**Localisation :** Laval, Québec, Canada  
**Date de livraison :** Juillet 2026  
**Dépôt GitHub :** github.com/hackelh/multi-rec-studio  
**URL de production :** multirecstudio.com / multi-rec-studio.vercel.app  

---

## 1. Présentation du projet

Multi Rec Studio est un studio d'enregistrement et de podcast situé à Laval, Québec, ouvert 7 jours sur 7 de 10h à 22h. Le projet consiste en la conception et le développement complet d'un site web professionnel bilingue (français/anglais) permettant à l'entreprise de se présenter en ligne, d'afficher ses services et tarifs, et de recevoir des réservations directement depuis le site.

---

## 2. Objectifs

- Créer une présence en ligne professionnelle et moderne pour le studio
- Permettre aux clients de réserver un créneau directement en ligne selon le type de studio souhaité
- Automatiser les confirmations de réservation par email, côté studio et côté client
- Offrir une expérience bilingue (FR/EN) cohérente sur toutes les pages
- Déployer le site en production sur un nom de domaine personnalisé

---

## 3. Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| Next.js | 16.2.7 | Framework React (App Router, Turbopack) |
| React | 19.2.4 | Interface utilisateur |
| TypeScript | 5.x | Typage statique |
| Tailwind CSS | 4.x | Styles utilitaires |
| Nodemailer | 9.x | Envoi d'emails via SMTP Gmail |
| Calendly API v2 | - | Système de réservation en ligne |
| Vercel | - | Hébergement et déploiement continu |
| OVH | - | Registrar du nom de domaine |

---

## 4. Architecture du projet

```
multi-rec-studio/
├── app/
│   ├── layout.tsx              # Layout global, LanguageProvider
│   ├── page.tsx                # Page principale (one-page)
│   ├── reservation/
│   │   └── page.tsx            # Page de réservation dédiée
│   └── api/
│       ├── contact/route.ts    # API : formulaire de contact → email
│       └── webhooks/
│           ├── calendly/route.ts   # Webhook Calendly → emails auto
│           └── register/route.ts  # Utilitaire : enregistrement webhook
├── components/
│   ├── Header.tsx              # Navigation + bouton Réserver
│   ├── Hero.tsx                # Section d'accueil
│   ├── Services.tsx            # Présentation des studios
│   ├── Pricing.tsx             # Tarifs + calendrier Calendly intégré
│   ├── About.tsx               # À propos + formulaire de contact
│   ├── Footer.tsx              # Pied de page
│   ├── FloatingCTA.tsx         # Bouton flottant de réservation
│   └── Reservation.tsx         # Sélecteur de studio + embed Calendly
├── contexts/
│   └── LanguageContext.tsx     # Gestion de la langue (FR/EN + localStorage)
└── lib/
    ├── translations.ts         # Toutes les traductions FR/EN
    └── emailTemplates.ts       # Templates HTML des emails
```

---

## 5. Fonctionnalités développées

### 5.1 Site one-page responsive

Le site principal est une page unique (`/`) découpée en sections : Hero, Services, Tarifs, Contact. La navigation dans le header pointe vers chaque ancre. Le design est entièrement responsive (mobile, tablette, desktop) grâce à Tailwind CSS.

### 5.2 Bilinguisme FR/EN

Un contexte React (`LanguageContext`) gère la langue active dans toute l'application. Le choix de langue est persisté dans le `localStorage` du navigateur, ce qui garantit que la langue choisie est conservée même en naviguant entre les pages (`/` et `/reservation`) ou en rechargeant la page. Toutes les chaînes de caractères sont centralisées dans `lib/translations.ts`.

### 5.3 Page de réservation dédiée (`/reservation`)

Une page séparée permet au client de :
1. Choisir son type de studio parmi trois options (Studio Antique, Studio Détente, Studio Pro) via des cartes visuelles avec photo et ambiance
2. Voir s'afficher le calendrier Calendly correspondant au studio sélectionné, directement intégré dans la page (embed inline)

Chaque studio dispose de son propre event type Calendly (créneaux d'1 heure), configuré via des variables d'environnement distinctes (`NEXT_PUBLIC_CALENDLY_URL_ANTIQUE`, `_DETENTE`, `_PRO`). La locale du calendrier (fr/en) est injectée dynamiquement selon la langue active.

### 5.4 Formulaire de contact avec envoi d'email réel

Le formulaire de la section Contact envoie une requête POST vers `/api/contact`. L'API utilise Nodemailer avec le service Gmail (authentification via App Password) pour transmettre le message à `multirecstudio1@gmail.com`. Les champs requis sont : nom, email, sujet, message.

### 5.5 Emails automatiques à chaque réservation

Un webhook Calendly est enregistré sur le compte du studio et pointe vers `/api/webhooks/calendly`. À chaque nouvelle réservation (`invitee.created`), deux emails HTML brandés sont envoyés en parallèle :

- **Email studio** : notification avec nom du client, studio réservé, date/heure, timezone
- **Email client** : confirmation avec les mêmes informations + liens pour annuler ou reprogrammer

Les emails utilisent un design inline cohérent avec la charte graphique du studio (en-tête sombre, mise en page carte, boutons).

### 5.6 Déploiement sur Vercel

Le projet est déployé en continu sur Vercel. Chaque push sur la branche `main` du dépôt GitHub déclenche automatiquement un nouveau déploiement. Les variables d'environnement sensibles (credentials Gmail, token Calendly) sont stockées côté Vercel et ne sont jamais commises dans le dépôt.

### 5.7 Nom de domaine personnalisé

Le domaine `multirecstudio.com` (acheté sur OVH) est configuré pour pointer vers Vercel via un enregistrement DNS de type A (`76.76.21.21`) et un CNAME pour le sous-domaine `www`. Vercel gère automatiquement le certificat SSL (HTTPS).

---

## 6. Référencement naturel (SEO)

Le site intègre une stratégie SEO complète pour maximiser sa visibilité sur les moteurs de recherche.

### 6.1 Métadonnées

- **Titre dynamique** avec template (`%s | Multi Rec Studio`) pour chaque page
- **Meta description** optimisée pour l'intent de recherche local
- **Mots-clés** ciblés : "studio podcast Laval", "studio enregistrement Québec", etc.
- **URL canonique** déclarée pour éviter le contenu dupliqué
- **Métadonnées spécifiques** sur `/reservation` (titre et description propres à la page)

### 6.2 Open Graph & réseaux sociaux

- **Image Open Graph** générée dynamiquement (`1200×630 px`) avec le nom du studio, la localisation et les services — s'affiche automatiquement quand un lien est partagé sur WhatsApp, Facebook, LinkedIn, iMessage
- **Twitter Card** de type `summary_large_image`
- Locale `fr_CA` déclarée

### 6.3 Indexation

- **`robots.txt`** : autorise l'indexation complète du site et pointe vers le sitemap
- **`sitemap.xml`** : liste les deux pages (`/` et `/reservation`) avec priorité et fréquence de mise à jour

### 6.4 Données structurées (JSON-LD)

Schema `LocalBusiness` injecté dans le `<head>` de toutes les pages :
- Nom, description, email, ville, région, pays
- Coordonnées géographiques (Laval, QC)
- Horaires d'ouverture : lundi–dimanche, 10h–22h
- Fourchette de prix

Ces données permettent à Google d'afficher des informations enrichies dans les résultats de recherche (Knowledge Panel, Google Maps).

### 6.5 Icônes et PWA

- **Favicon** : logo sur fond sombre, format PNG 512×512
- **Apple Touch Icon** : pour l'ajout en raccourci sur iOS

---

## 7. Sécurité

- Les secrets (mot de passe Gmail, token Calendly) sont stockés dans `.env.local`, fichier exclu du dépôt git via `.gitignore`
- Sur Vercel, les variables d'environnement sont chiffrées et injectées au moment du build/runtime
- Aucune donnée sensible n'apparaît dans le code source versionné
- Les API routes Next.js valident les champs requis avant tout traitement

---

## 8. Déploiement et infrastructure

| Composant | Service | Détail |
|---|---|---|
| Hébergement | Vercel | Déploiement continu via GitHub |
| Domaine | OVH → Vercel | A record : `76.76.21.21` |
| SSL/HTTPS | Let's Encrypt via Vercel | Automatique |
| Emails | Gmail SMTP | App Password, Nodemailer |
| Réservations | Calendly API v2 | 3 event types (1h), webhook actif |
| URL production | multirecstudio.com | Propagation DNS confirmée |

---

## 9. Points en attente (actions côté client)

| Action | Responsable | Statut |
|---|---|---|
| Mettre à jour les horaires Calendly (10h-22h, 7j/7) | Client | A faire |
| Changer l'intervalle Calendly de 30 min à 60 min | Client | A faire |
| Ajouter le CNAME `www` dans la Zone DNS OVH | Client | A faire |

---

## 10. Résultat

Le site est en production sur `multirecstudio.com`, bilingue (FR/EN), connecté à un système de réservation en ligne avec confirmation automatique par email. Le référencement est optimisé avec données structurées, sitemap, OG image et métadonnées complètes. La base technique est solide et extensible : ajout de nouveaux studios, nouvelles langues ou nouvelles sections ne nécessite que des modifications localisées dans `translations.ts` et `components/`.
