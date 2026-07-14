# KOOLEYES – Eyewear E-commerce Website

KoolEyes is a front-end e-commerce website concept for an eyewear (sunglasses) brand, built as a university course project for **Information System Analysis & Design**. The project covers the full analysis-to-implementation cycle: business/requirement analysis, system design, UI/UX design in Figma, and front-end development.

## Team

| No. | Name | Student ID | Responsibilities |
|---|---|---|---|
| 1 | Nguyễn Phan Diệu Linh | K234010091 | Report writing, business flow diagrams, Figma UI design, front-end development, presentation slides |
| 2 | Trần Phương Khanh | K244060778 | Report content, business flow diagrams, Figma UI design, front-end development, presentation slides |
| 3 | Huỳnh Tuyết Mẫn | K244060787 | Report writing, business flow diagrams, Figma UI design, front-end development & UI synchronization, presentation slides |
| 4 | Ngô Thị Phương Thảo | K244060803 | Report writing, business flow diagrams, Figma UI design, front-end development, presentation slides |
| 5 | Trương Thị Thùy Trinh | K244060813 | Report writing, database analysis & design, Figma UI design, front-end development, presentation slides |

## Project Overview

KoolEyes aims to build a digital sales channel for an eyewear brand, allowing customers to browse, try on (virtually), and purchase products online, while giving the business an organized way to manage products, orders, and customer interactions.

**Scope includes:** product catalog & lookbook browsing, virtual try-on page, shopping cart & checkout flow, user account management (login/register, password recovery, order history, order tracking), wishlist, and a contact/about section.

## System Analysis & Design

The project was developed following a structured system analysis approach before implementation.

Artifacts include:

- Business Requirement Analysis
- Functional Requirement Specification
- Sitemap
- Use Case Diagram
- BPMN Process Diagrams
- BPMN Virtual Try-On Flow
- Context Diagram
- Level 0 Data Flow Diagram
- Entity Relationship Diagram (ERD)
- Wireframes & UI Mockups (Figma)
## Tech Stack

- **HTML5 & CSS3** – page structure and styling
- **Bootstrap** – responsive layout and UI components
- **JavaScript (Vanilla JS)** – interactivity, cart logic, product rendering
- **Figma** – UI/UX mockups and design system

## Project Structure

```
Mã nguồn website/ProjectFinal/Project/
├── pages/                  # All website pages
│   ├── homepage.html
│   ├── shop.html
│   ├── product-detail.html
│   ├── cart.html
│   ├── checkout.html
│   ├── login_register.html
│   ├── forget_pw.html / recovery.html / reset_pw.html
│   ├── account_detail.html
│   ├── order_history.html / order_success.html / tracking_order.html
│   ├── wishlist.html
│   ├── lookbook_cus.html / lookbook_guest.html
│   ├── virtual-try-on.html
│   ├── recommend.html
│   ├── about.html
│   └── contact.html
├── assets/
│   ├── css/                # Stylesheets (Bootstrap + custom styles)
│   ├── js/                 # cart.js, shop.js, product-detail.js, site-cart.js
│   ├── data/                # product.js – product data source
│   └── images/               # Product photos, banners, and UI assets
```

## Key Features

- **Product catalog** across multiple collections (KoolEyes Veggie, Edge, Pocket, and more), with color variants
- **Shopping cart** with add/remove items, quantity, and color selection, persisted via `localStorage`
- **Checkout flow** from cart to order confirmation
- **Account management**: login/register, password recovery, order history & tracking, wishlist
- **Virtual try-on** and **lookbook** pages for a richer shopping experience

Live Demo
[🔗 View Live Demo] (https://demo-alpha-eight-hmki9k3qsx.vercel.app?_vercel_share=LDAjEBVWsX6FKjnAtAOfIQsDYYn72CGy)
## How to Run Locally

This is a static front-end project — no build step required.

1. Clone or download the repository.
2. Open `pages/lookbook_cus.html` in a browser, or
3. Serve the `Project/` folder with a local server (e.g. VS Code **Live Server** extension) for correct relative-path loading of assets.

