# Lancer sans bundle
- `sass --watch assets/sass:assets/css`
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
- Supprimer le dossier `dist`
- Lancer `npm run build`

