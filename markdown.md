

***

### **Product Requirements Document (PRD)**  
**Product Name:** QR‑Based Vehicle Parking Location System  
**Version:** 1.0  
**Date:** 06‑Apr‑2026  
**Prepared by :** Saurabh Kothule

***

## 1. Overview

The **QR‑Based Vehicle Parking Location System (QRPark)** is a mobile‑first solution that helps users locate their parked vehicles in crowded venues such as religious sites, festivals, stadiums, malls, airports, and event grounds. The system uses **QR‑coded tags** placed at each parking spot, linked to a precise GPS coordinate. When a user scans the QR code via the QRPark mobile app/web , the system records the vehicle’s location and allows the user to retrieve it later with navigation support.

***

## 2. Problem Statement

In crowded venues (e.g., Kumbh Mela, big temples, football matches, exhibitions), users:

- Forget the exact parking spot among similar‑looking rows.
- Waste time walking through the lot.
- searching vehicle at night becomes more difficult 
- Experience stress and fatigue, especially when in a hurry or with children/elderly companions.

A simple, low‑cost, and scalable solution is needed to **remember where the vehicle is parked** and **guide the user back to it**.

***

## 3. Goals and Objectives

### Primary goals

- Enable users to **record their parked vehicle’s exact location** via QR scan.
- Allow users to **retrieve the location on a map** and get **turn‑by‑turn navigation** back to the vehicle.
- Reduce time and stress associated with finding parked vehicles.

### Success metrics (KPIs)

- Average time to locate a parked vehicle reduced by ≥ 50%.
- ≥ 80% app retention after first parking use.
- ≥ 4‑star user rating on app stores.
- ≥ 70% scan‑success rate of QR codes under normal lighting.

***

## 4. Target Users

- Pilgrims / visitors at **religious sites** (e.g., Siddhivinayak, Lalbagh, Kumbh Mela grounds).
- Attendees of **large events** (stadiums, exhibitions, concerts).
- Passengers at **airports, railway stations, and bus terminals**.
- Shoppers in **large malls and market complexes**.

User personas:
- **Busy commuter** (uses app once or occasionally).
- **Event‑goer** (uses app during big events).
- **Organizer / parking‑lot manager** (administers QR tags and parking layout).

***

## 5. Targeted Places

- Religious festivals and gatherings (e.g., Kumbh Mela).
- Major temples and religious complexes (e.g., Siddhivinayak, Lalbagh area landmarks).
- Stadiums, exhibition centers, and amusement parks.
- Airports, railway stations, and bus terminals.
- Large shopping malls and market areas.

***

## 6. Solution Architecture

### 6.1 High‑level components

1. **QR Tag System**  
   - Waterproof / durable QR stickers or laminated tags placed at each parking spot .
   - Each QR encodes a **unique identifier** plus **latitude and longitude** (or links to a backend record that stores the coordinate after scanning qr ).

2. **Mobile App (iOS & Android)**  
   - Native or cross‑platform (e.g., Flutter / React Native).
   - QR scanner integrated (camera + decoding library).
   - Maps and routing tied to a map SDK (Google Maps / Mapbox).

3. **Backend Server**  
   - REST‑style API (Node.js, Django, or similar).
   - User accounts or device‑based sessions (optional).
   - Database storing:
     - QR ID → location mapping.
     - User session → vehicle type, vehicle number (optional), parking time.
   - Optional admin dashboard for parking‑lot managers.

4. **Mapping & Navigation**  
   - Map SDK integration (Google Maps, Mapbox, or similar).
   - Route‑calculation service for “walk‑to‑car” directions.

5. **Benificial for parking providers as well**
    -They track live statisics about parking occupied or free slots for parking
    -work as monthly revenue calculation digital general (A digital book that holds all sells and purchases)

5. **Admin Web Portal**  
   - View parking layout and QR‑tag distribution.
   - Monitor active parking sessions.
   - Export basic analytics (e.g., peak parking hours).

***

## 7. Features and Requirements

### 7.1 Core User Features

| Feature | Description |
| --- | --- |
| **QR scan & location storage** | User scans QR immediately after parking; app stores GPS location tied to that QR spot and user session. |
| **Vehicle info entry** | User can optionally enter vehicle type, number plate, and color. |
| **Map view of parked vehicle** | On opening the app later, the user sees a map with the parked vehicle’s location pin. |
| **Navigation to vehicle** | One‑tap “Navigate to vehicle” button that opens in‑app directions (walking) or launches Google Maps / Apple Maps. |
| **Multiple parking sessions** | For power users, store last N parking sessions (e.g., 3–5) to avoid confusion across trips. |

### 7.2 Parking‑Lot Manager Features

| Feature | Description |
| --- | --- |
| **QR tag generation panel** | Admin dashboard generates QR IDs and assigns them to coordinates on a map / grid. |
| **Parking layout management** | Define parking zones (e.g., VIP, general, two‑wheeler, four‑wheeler) and map QR tags to zones. |
| **Basic analytics** | View number of scans per zone, peak hours, and approximate parking‑lot occupancy trends. |
| **QR health check** | Display list of QR codes which have not been scanned for a long period (possible misplacement or damage). |

### 7.3 Optional Features

| Feature | Description |
| --- | --- |
| **Push notifications** | Send location reminder or event alerts (e.g., “Event starting in 10 minutes”) to app users. |
| **Parking fee integration** | Link parking‑fee payment (UPI / card) to QR‑based entry/exit. |
| **Multi‑language support** | UI in Hindi, English, Marathi, and other local languages. |
| **Offline mode** | Cache last parked location for retrieval even when network is weak. |

***

## 8. Use Cases

### 8.1 Use Case: Parking a Vehicle

1. User selects a parking spot in the lot.
2. User scans the **QR tag** at that spot using the QRPark app.
3. App verifies QR content and:
   - Records **latitude‑longitude** tied to this session.
   - Optionally saves **vehicle details** (type, number plate).
4. App shows a confirmation:  
   “Your vehicle is parked at [Zone A, Spot 125].”

### 8.2 Use Case: Locating the Parked Vehicle

1. User opens the QRPark app.
2. App displays:
   - Last parked location pin on map.
   - Approximate walking distance and time.
3. User taps “Navigate to vehicle”.
4. App opens in‑app walking directions or launches native maps app with turn‑by‑turn guidance.

### 8.3 Use Case: Parking‑Lot Manager Check‑in

1. Manager logs into the admin portal.
2. Views:
   - Coverage map of QR tags.
   - Heatmap of most‑used parking zones.
3. Generates new QR codes or replaces damaged tags.

***

## 9. Technical Requirements

### 9.1 Mobile App

- **Platforms**: Android (min API 24) and iOS (min iOS 14).
- **Camera / QR**: Use built‑in camera with QR decode library (e.g., ZXing, ML Kit, or platform‑specific scanner).
- **Location**: Use GPS / network location with permission handling.
- **Storage**: Local caching of last parking location (even if registration is optional).
- **Maps SDK**: Google Maps API, Mapbox, or similar for rendering and routing.

### 9.2 Backend

- Language / framework: Any modern backend stack (e.g., Node.js + Express, Python/Django, or Java/Spring).
- **Persistence**:
  - Relational or No‑SQL DB for:
    - QR records (ID, lat, lng, zone, status).
    - User sessions / parking records (device ID, QR ID, vehicle info, timestamp).
- **API endpoints** (examples):
  - `POST /api/scan` – register QR scan + location.
  - `GET /api/session/latest` – get last parking record.
  - `GET /api/qr/{id}` – get QR metadata (for admin and validation).
- **Authentication** (optional):
  - Simple phone‑based or email‑based login.
  - JWT‑style tokens for secured endpoints.

### 9.3 Mapping & Navigation

- Integrate **map SDK** for:
  - Displaying map.
  - Showing user’s current location and parked vehicle pin.
  - Providing walking directions.
- Minimum features:
  - Map view (zoom/pan).
  - Blue dot for user, red pin for vehicle.
  - Route line between user and vehicle.

### 9.4 QR Tag System

- **Format**: QR code that encodes:
  - JSON or URL such as `https://qrpark.example/qr/ABCD123` wher `ABCD123` is the unique QR ID.
- **Content stored in backend**:
  - Latitude, longitude.
  - Parking zone / block.
  - Status (active, decommissioned).
- **Durability**: Laminated or sticker‑based tags resistant to rain, dust, and mild abrasion.

***

## 10. Non‑Functional Requirements

| Aspect | Requirement |
| --- | --- |
| **Performance** | QR scan + location save within ≤ 1 second on mid‑range devices. |
| **Availability** | App and backend available 99.5% during event days. |
| **Scalability** | Support ≥ 10,000 concurrent parking sessions per large event. |
| **Usability** | Simple 2‑step flow: scan QR → confirm parking. Max 3‑tap navigation. |
| **Localization** | UI in English + Hindi + Marathi (at least); text can be extended later. |
| **Offline capability** | Last parked location can be shown even without network; navigation can fall back to external map apps. |

***

## 11. Security and Data Protection

### 11.1 Data Protection

- **Encryption in transit**: HTTPS (TLS) for all API calls.
- **Encryption at rest**: Sensitive data (e.g., user IDs, vehicle numbers) encrypted in DB.
- **Data minimization**:
  - Only essential fields stored (QR ID, lat/lng, vehicle type, plate, timestamps).
  - Option to delete parking history after user‑defined duration (e.g., 7 days).

### 11.2 QR Security

- **Unique QR IDs** generated with strong randomness.
- QR IDs never contain raw user PII; instead, they point to a backend record.
- **QR validation**:
  - When scanned, app checks:
    - QR ID exists.
    - QR is in active status.
- Consider short‑lived QR rotation for high‑security venues (swap codes periodically).

### 11.3 Privacy

- No tracking of user beyond parking‑related metadata unless explicitly consented.
- Clear privacy policy describing:
  - What data is collected.
  - How long it is stored.
  - How it is used (no third‑party ad tracking).

***

## 12. Future Enhancements

| Enhancement | Description |
| --- | --- |
| **Payment integration** | Link parking fee payment to QR‑based entry/exit; allow UPI, card, or wallet. |
| **Slot pre‑booking** | Users can book a parking slot in advance; QR code reserved for that slot. |
| **Analytics dashboard** | Advanced analytics for parking‑lot managers: occupancy, peak hours, revenue. |
| **Multi‑user / family sharing** | One user can share parked location with a contact via SMS or link. |
| **IoT‑based availability** | Add basic sensors for slot occupation; show “free” or “occupied” status on map. |
| **AR‑based guidance** | Use AR camera to show arrow‑guidance to the parking spot (more advanced). |

***

## 13. Assumptions and Constraints

| Item | Description |
| --- | --- |
| **Assumption** | Users have smartphones with camera and internet connectivity. |
| **Assumption** | Parking lots will allow placement of QR tags at spots or poles. |
| **Constraint** | Initial phase will be **un‑branded** / neutral; customization per venue can come later. |
| **Constraint** | Admin portal is a lightweight web app, not an enterprise‑scale system initially. |

***

## 14. Out of Scope (V1)

The following features are **explicitly out of scope for version 1.0**:

- Real‑time vehicle tracking (only static parking location).
- Full‑blown parking‑lot management with entry/exit gates and automatic billing.
- Multi‑tenant SaaS with deep admin roles (later versions).
- Integration with city‑wide parking‑APIs.



