# Digit_one
Instalare și configurare
Asigurați-vă că aveți Node.js și MongoDB instalate pe sistemul dvs.

Clonați repository-ul:

bash
Copy code
git clone 
Instalați dependințele:

bash
Copy code
cd digit_one
npm install
Configurați variabilele de mediu. Copiați .env.example în .env și completați variabilele corespunzătoare:

bash
Copy code
MONGO_URI=mongodb://localhost:27017/digit_one
SECRET_KEY=cheia_dvs_secreta
Rulați proiectul:

arduino
Copy code
npm run dev
Partea de "Inventar & Stoc"
În această secțiune, veți putea efectua următoarele operațiuni CRUD:

CRUD Dinamic pentru Super-Inventar -> Inventar
În acest modul, puteți crea, citi, actualiza și șterge categorii superioare pentru inventar.
CRUD Principal
Adăugați un nume de inventar și un tip de cantitate (ex: kg, litri, bucăți etc.)
CRUD Secundar
Adăugarea elementelor propriu-zise în inventar. De exemplu, dacă aveți un inventar pentru "Produse alimentare", puteți adăuga elemente precum "Pâine", "Lapte" etc.
Totaluri
Afișarea cantităților curente și valorilor financiare pentru fiecare element din inventar, calculat la prețul de intrare.
Filtre
Filtre pentru sortarea listelor de inventar după data, cantitate, și nume în ordine ascendentă sau descendentă.
Opțiune pentru căutare în listă după nume.
CRUD pentru Item-uri de Inventar (e.g. Porumb, Măsline, Motorină etc.)
Aceasta este o funcție CRUD specială ce permite adăugarea de item-uri în inventar.
De asemenea, veți avea opțiunea de a aplica restricții pe CRUD-ul principal în funcție de item-urile adăugate.
Pentru a folosi aceste funcționalități, asigurați-vă că ați urmat pașii de instalare și configurare de mai sus.
