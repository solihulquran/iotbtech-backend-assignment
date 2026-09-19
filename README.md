# iotbtech-backend-assignment1
# IOTBTECH Backend Assignment (Classes 31 to 33)

A Products Inventory project in three phases:
- **Phase A:** scripts that make a CSV of 10,000 products and add up the money per category using streams.
- **Phase B:** an Express API in three layers (routes, controller, service) with full CRUD.
- **Phase C:** middleware for logging (Winston), an API key check, a 404 handler and an error handler.

## How to run
```bash
cd mini-project
npm install
npx tsx scripts/generate.ts
npx tsx scripts/aggregate.ts
npm run dev
```

The API runs on `http://localhost:3000/api/products`. POST, PUT and DELETE need the header `x-api-key`.

## One-line takeaway per class
- **Class 31:** A stream reads a file a little at a time, so memory stays small even when the file is huge.
- **Class 32:** Routes, controller and service each have one job, so I know exactly which file to change.
- **Class 33:** Middleware runs in order, so the order I register it in decides how my app behaves.