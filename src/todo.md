Svu business logiku koju trenutno koristiš unutar komponenti prebaciti u MobX store-ove (kreiranje lokalnih mobx store-ova koji bi se inicijalizirali prilikom postavljanja komponente). {cm:2024-03-16}

Unutar aplikacije se miješa async/await i then API za manipuliranje Promise objekta. Dobra praksa je uvijek držati se jednog načina, a preporučujem korištenje async/await. {cm:2024-03-16}

Nema potrebe za držanjem podataka u lokalnom storage-u ili ponovnim iskorištavanjem starih podataka iz state-a. Iskoristi servise kako bi uvijek radio sa najsvježijim podacima. {cm:2024-03-16}

Pripazi da je aplikacija buildabilna {cm:2024-03-17}

Izbjegavaj dohvaćanje svih entiteta iz baze, limitiraj broj dohvaćenih entiteta. {cm:2024-03-17}
