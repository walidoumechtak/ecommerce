## Run Locally

Clone the project

```bash
  git clone https://github.com/walidoumechtak/ecommerce.git
```

Go to the project directory

```bash
  cd ecommerce
```

Install dependencies

```bash
  npm install

  or 

  npm install react-material-ui-carousel --save --legacy-peer-deps
```

Start the server

```bash
  npm start
```

The server should now be running. You can access the application by opening a web browser and entering the following URL:

```bash
  http://localhost:3000
```


## Layout Approach & Responsiveness

**Layout Approach:** I used a card-based design with Bootstrap's flexbox utilities to create a clean, structured layout. The card uses `d-flex flex-column` to ensure consistent height across all cards, with the description section set to `flex-grow-1` so the price and buttons always align at the bottom regardless of content length.

**Responsiveness Considerations:** The component leverages Bootstrap's responsive grid system (col-md-4, col-sm-6, col-xs-8) to display 3 cards on desktop, 2 on tablets, and 1 on mobile. For mobile devices, I added custom CSS to stack the action buttons vertically instead of side-by-side, and included hover effects that work well on both touch and non-touch devices.
