# Ayesha Herbal Powder — E-Commerce Website

A complete, production-quality e-commerce website for **Ayesha Herbal Powder**, built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** (build tool)
- **Tailwind CSS v4** (styling)
- **React Router v7** (routing)
- **Lucide React** (icons)
- **localStorage** (cart persistence)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

The dev server runs at **http://localhost:5173**

---

## Configuration Files

### 1. Update Business Details

Edit `src/config/business.ts`:

```ts
export const businessConfig = {
  whatsappNumber: '919999999999',  // Replace with your number (country code + number, no spaces)
  email: 'contact@ayeshaherbal.com',
  phone: '+91 99999 99999',
  address: 'Your Business Address...',
  // ...
};
```

### 2. Update Product Price

Edit `src/data/products.ts` — find the product object and update:

```ts
price: 299,    // Selling price
mrp: 399,      // Original price (for discount display)
discount: 25,  // Discount percentage (for badge display)

variants: [
  { id: '100g', label: '100g', price: 299, mrp: 399, stock: 50 },
  { id: '200g', label: '200g', price: 549, mrp: 699, stock: 30 },
],
```

### 3. Add Real Product Images

1. Place your Ayesha product images in `public/images/`:
   - `public/images/ayesha-product-1.jpg`
   - `public/images/ayesha-product-2.jpg`

2. (Optional) Add ingredient images in `public/images/ingredients/`:
   - `amla.jpg`, `hibiscus.jpg`, `fenugreek.jpg`, `bhringraj.jpg`, `shikakai.jpg`, `neem.jpg`

3. Update the `images` array in `src/data/products.ts` if you use different filenames.

### 4. Change WhatsApp Number

In `src/config/business.ts`:

```ts
whatsappNumber: '919876543210',  // Format: country code + number (no + or spaces)
whatsappDefaultMessage: 'Hello Ayesha Herbal Powder, ...',
```

### 5. Add Payment Credentials Later

In `src/config/business.ts`:

```ts
paymentEnabled: true,           // Set to true when ready
razorpayKeyId: 'rzp_live_xxx',  // Your Razorpay Key ID
stripePublishableKey: 'pk_live_xxx',  // Or Stripe key
```

Then integrate the Razorpay/Stripe SDK in `src/pages/CheckoutPage/CheckoutPage.tsx` at the marked payment integration point.

### 6. Add More Products

In `src/data/products.ts`, append a new product object to the `products` array following the same schema. All pages (Shop, Search, ProductCard) will pick it up automatically.

---

## Pages

| Route | Page |
|-------|------|
| `/` | Home (Hero, Trust bar, Featured product, Ingredients, Benefits, How to Use) |
| `/shop` | Product catalogue with search and category filter |
| `/product/:slug` | Product details with gallery, tabs, variants, quantity |
| `/ingredients` | Ingredients showcase |
| `/about` | Brand story and values |
| `/contact` | Contact form + contact details |
| `/cart` | Shopping cart with quantity management |
| `/checkout` | Checkout with customer info + payment selection |
| `/order-confirmation` | Order success with summary |

---

## Features

- Sticky header with responsive hamburger menu
- Live cart item count badge
- Header search with URL query params
- Cart persistence via `localStorage`
- Variant (pack size) selection on product page
- Quantity selector throughout
- Form validation on checkout and contact pages
- WhatsApp floating button (bottom-right)
- Tabbed product detail (Description, Ingredients, Benefits, How to Use, FAQ)
- Discount badge and savings calculation
- Free shipping threshold indicator
- Order confirmation stored in localStorage
- Demo payment mode (clearly labelled when payment gateway not configured)
- Fully responsive — mobile, tablet, desktop

---

## Folder Structure

```
src/
  components/       Reusable UI components
  pages/            Route-level page components
  context/          CartContext (global cart state)
  data/             products.ts — product data source
  types/            TypeScript interfaces
  utils/            formatPrice, generateOrderId, etc.
  config/           business.ts — business settings
public/
  images/           Product and ingredient images (add yours here)
  favicon.svg
```

---

## Next Steps (Production)

1. **Add real product images** — replace the placeholder paths
2. **Set your WhatsApp number** in `src/config/business.ts`
3. **Update price and weight** in `src/data/products.ts`
4. **Integrate Razorpay or Stripe** in CheckoutPage
5. **Connect a backend** — replace `src/data/products.ts` static data with API calls to Supabase / Firebase / Node.js
6. **Deploy** — run `npm run build` and deploy `dist/` to Vercel, Netlify, or any static host
