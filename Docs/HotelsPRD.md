

## 1. Hotel Profile Module (Master Data)

This section manages the static details of the property.

### 1.1 Geographic & Identity Setup

* 
**Country Input:** Mandatory dropdown or text field (e.g., Azerbaijan).


* 
**City Input:** Mandatory field to specify location (e.g., Baku, Gabala, or Qusar).


* 
**Hotel Metadata:** Fields for Name, Star Rating (e.g., 4*), and precise Address.


* 
**Contact Info:** Fields for phone numbers, emails, and website URLs.



### 1.2 Tax & Currency Configuration

* 
**Currency Selection:** Define the billing currency (AZN or USD).


* 
**VAT Management:** Toggle for 18% VAT as "Included" (e.g., Parkway Inn, Midway) or "Excluded" (e.g., Iris, Mercure).


* 
**Municipality Tax:** Input for fixed nightly fees per person, such as **1.30 AZN** or **0.77 USD**.



---

## 2. Price List Entry Module (Dynamic Input)

This module handles the highly variable seasonal rates and room categories found in your documentation.

### 2.1 Seasonality & Event Manager

* 
**Date Range Blocks:** Ability to create multiple date segments for the year 2026.


* **Season Types:**
* 
**Low/Mid/High Seasons:** Standard seasonal pricing.


* 
**Holiday/Event Blocks:** Dedicated ranges for **Novruz**, **Ramadan**, **Formula 1**, and **WUF-13**.




* 
**Weekday/Weekend Logic:** A toggle to split rates by day of the week, crucial for Saturday-specific pricing or weekday tiers.


* 
**Occupancy Percentage Tiers:** Specialized fields for hotels that change rates based on how full the property is (e.g., Up to 50%, 50-75%, Above 75%).



### 2.2 Room & Occupancy Grid

For each season block, a dynamic grid must capture:

* 
**Room Categories:** Standard, Deluxe, Superior, Junior Suite, Family Suite, and Cottages.


* 
**Occupancy Rates:** Separate columns for **Single**, **Double**, **Triple**, and **Quad** pricing.


* 
**B2B vs. Rack Rates:** Fields to distinguish between "Rack" (Public) and "Travel Agency" (B2B) rates.



### 2.3 Supplement & Child Policies

* 
**Extra Bed Fee:** A field to set the price for additional adults (ranges from **30 AZN** to **70 AZN** depending on the event).


* **Child Supplement Matrix:**
* 
**0-6 Years:** Typically free of charge.


* 
**6-12 Years:** Input for reduced supplemental fees (e.g., **10 AZN**, **20 AZN**, **30 AZN**, or **15 USD**).


* 
**12+ Years:** Usually defined as the adult rate.





---

## 3. Recommended Firebase Schema (NoSQL)

| Node | Purpose | Attributes |
| --- | --- | --- |
| `/hotels` | Identity | `name`, `country`, `city`, `stars`, `vat_included`, `muni_fee` |
| `/room_types` | Definition | `hotel_id`, `category_name`, `max_pax`, `description` |
| `/price_lists` | Rate Data | `hotel_id`, `season_name`, `start_date`, `end_date`, `is_event` |
| `/rates` | The Values | `season_id`, `room_type_id`, `single`, `double`, `triple`, `extra_bed` |

---

