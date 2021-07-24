# Lancer sans bundle
- `sass --watch src/assets/sass:src/assets/css`
- `open index.html`

# Ajout bundle
- `npm init`
- `npm i parcel --sav-dev`

Update sur script dans `package.json` : 
```
"scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel build src/index.html"
  },
  ```

**Attention à CORS** : dans le back : 
Pour le moment, toutes les origines autorisée grâce à *
```
app.use(
  cors({
    origin: ["http://localhost:1234", "null"],
  })
);
```

## Build de dev :
- Lancer `npm run dev`

## Build de prod : 
- Lancer `npm run build`

